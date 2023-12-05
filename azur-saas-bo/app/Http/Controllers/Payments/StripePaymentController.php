<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Stripe;
use Stripe\Token;
use Stripe\Checkout\Session;
use App\Models\Order;
use App\Models\User;
use App\Models\Pack;
use Carbon\Carbon;
use Stripe\Webhook;
use Stripe\Customer;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Subscription;
use Illuminate\Support\Facades\Log;

class StripePaymentController extends Controller
{
    public function subscriptionUrl(Request $request)
    {
        $user = auth()->user();
        $pack = Pack::where('id', $request->input('packId'))->first();
        $packStripeId = $pack->stripeId;

        Stripe::setApiKey(env('STRIPE_SECRET'));

        if (!env('ACTIVE_PAYMENT')) {
            /* TODO: Modifier order virtuellement */
            Order::packDetailsPaid($user->id)->update([
                'quotaAi' => $pack->quotaAi,
                'contractNb' => $pack->contractNb,
                'packId' => $pack->id,
                'status' => 'paid',
                'optionAi' => $pack->optionAi,
                'expiredIn' => Carbon::now()->addDays(15)->toDateString()
            ]);
            User::where('id', $user->id)->update([
                'packId' => $pack->id,
                'contractNbCreated' => null
            ]);
            return response()->json(['url' => env('FRONT_APP_URL') . "/app/admin/settings/payment/success"]);
        }
        // Rechercher un client existant par e-mail
        $existingCustomers = Customer::all(['email' => $user->email]);
        $customer = null;

        if (count($existingCustomers->data) > 0) {
            // Utiliser le client existant
            $customer = $existingCustomers->data[0];
        } else {
            // Créer un nouveau client
            $customer = Customer::create([
                'email' => $user->email,
                'name' => $user->name,
            ]);
        }

        $session = StripeSession::create([
            'customer' => $customer->id,
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => $packStripeId, // Utilisez l'ID du prix de votre plan d'abonnement
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => env('FRONT_APP_URL') . "/app/admin/settings/payment/success?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => env('FRONT_APP_URL') . "/app/admin/settings/payment/error",
        ]);

        $orderStatus = 'unpaid';
        $sessionId = $session->id;

        $this->createOrder($orderStatus, $sessionId, $packStripeId);


        return response()->json(['url' => $session->url]);
    }

    private function createOrder($orderStatus, $sessionId, $packStripeId)
    {
        $order = new Order();
        $pack = Pack::where('stripeId', $packStripeId)->first();
        $order->status = $orderStatus;
        $order->price = $pack->price;
        $order->packId = $pack->id;
        $order->sessionId = $sessionId;
        $order->contractNb = $pack->contractNb;
        $order->optionAi = $pack->optionAi;
        $order->userId = auth()->user()->id;
        $order->save();
        User::where('id', $order->userId)->update(['sessionId' => $sessionId]);
    }

    public function webhook(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = Webhook::constructEvent($payload, $sig_header, env('STRIPE_WEBHOOK_SECRET'));
        } catch (\UnexpectedValueException $e) {
            // Signature non valide
            http_response_code(400);
            exit();
        }
        //Log::info(json_encode($event, JSON_PRETTY_PRINT));

        if ($event->type == 'checkout.session.completed') {
            $session = $event->data->object;

            $subscription = Subscription::retrieve($session->subscription);

            $returnedPack = Pack::where('stripeId', $subscription->plan->id)->first();

            User::where('sessionId', $session->id)->update(['cuctomerId' => $session->customer, 'packId' => $returnedPack->id, 'contractNbCreated' => null]);
            Order::where('sessionId', $session->id)->update(['quotaAi' => $returnedPack->quotaAi, 'contractNb' => $returnedPack->contractNb, 'subscriptionId' => $subscription->id, 'status' => $session->payment_status, 'expiredIn' => Carbon::createFromTimestamp($subscription->current_period_end)->toDateString($subscription->current_period_end)]);
        }

        if ($event->type == 'invoice.paid') {
            $invoice = $event->data->object;

            $subscription = Subscription::retrieve($invoice->subscription);
            // Log::info(json_encode($subscription, JSON_PRETTY_PRINT));
            $returnedPack = Pack::where('stripeId', $subscription->plan->id)->first();

            Log::info(json_encode($returnedPack, JSON_PRETTY_PRINT));

            User::where('cuctomerId', $subscription->customer)->update(['packId' => $returnedPack->id, 'contractNbCreated' => null]);
            Order::where('subscriptionId', $invoice->subscription)->update(['quotaAi' => $returnedPack->quotaAi, 'contractNb' => $returnedPack->contractNb, 'packId' => $returnedPack->id, 'status' => $invoice->status, 'expiredIn' => Carbon::createFromTimestamp($invoice->period_end)->toDateString($invoice->period_end)]);
        }
    }
    public function paymentUrlToken(Request $request)
    {
        $configuration = Configuration::first();
        $price = $configuration->tokenPriceExtra;
        if (!$price) {
            return response()->json('Prix invalide!');
        }
        $sessionId = null;
        $sessionUrl = null;

        if ($price != 0) {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $lineItems = [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => 'Achat Token',
                    ],
                    'unit_amount' => floatval($price) * 100,
                ],
                'quantity' => 1,
            ]];
            $session = \Stripe\Checkout\Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => env('FRONT_APP_URL') . "/app/admin/settings/payment/success-token?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => env('FRONT_APP_URL') . "/app/admin/settings/payment/error",
            ]);
            $sessionId = $session->id;
            $sessionUrl = $session->url;


            $employerId = auth()->user()->id;
            $order = Order::where(['userId' => $employerId, 'status' => 'paid'])
                ->latest('created_at')
                ->first();
            $order->sessionId = $sessionId;
            $order->save();
        }


        return response()->json($sessionUrl);
    }

    public function successPayment(Request $request)
    {
        $sessionId = $request->input('sessionId');
        try {
            $order = Order::where('sessionId', $sessionId)->first();

            if (!$order) {
                throw new NotFoundHttpException();
            }
            if ($order->status === 'unpaid') {
                $order->status = 'paid'; // change status to paid
                $order->save();
                User::where('id', $order->userId)->update(['packId' => $order->packId, 'contractNbCreated' => null]);
            }
            return response()->json('paiement effectué avec succès');
        } catch (\Exception $e) {
            throw new NotFoundHttpException();
        }
    }

    public function successSubscription(Request $request)
    {
        $sessionId = $request->input('sessionId');

        try {
            $order = Order::where('sessionId', $sessionId)->first();
            if (!$order) {
                throw new NotFoundHttpException();
            } else {
                return response()->json('paiement effectué avec succès');
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function successPaymentToken(Request $request)
    {
        $sessionId = $request->input('sessionId');
        try {
            $order = Order::where('sessionId', $sessionId)->first();
            if (!$order) {
                return response()->json('Something went wrong !!');
            }

            $configuration = Configuration::first();
            $quota = $configuration->tokenQuotaExtra;

            if (!$quota) {
                return response()->json('Something went wrong !!');
            }
            $order->quotaAi = $quota;
            $order->save();

            return response()->json('paiement effectué avec succès');
        } catch (\Exception $e) {
            return response()->json('Something went wrong !!');
        }
    }
}
