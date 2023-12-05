<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Stripe;
use Stripe\Subscription;
use Stripe\Invoice;
use Stripe\Customer;
use Stripe\PaymentMethod;
use Stripe\PaymentIntent;
use Stripe\Token;
use App\Models\Order;
use App\Models\User;
use App\Models\Pack;
use Carbon\Carbon;
use Stripe\BillingPortal\Session;

class StripeBillingController extends Controller
{
    public function getBillingPortal()
    { //Link integration
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $user = auth()->user();

        if (!empty($user->cuctomerId)) {
            $session = Session::create([
                'customer' => $user->cuctomerId,
                'return_url' => env('FRONT_APP_URL_FROM_STRIPE'),
            ]);
            return response()->json(['url' => $session->url]);
        } else {
            return response()->json(false);
        }
    }
    public function getBillingDetails()
    { // Code integration

        $user = auth()->user();
        $subscriptionId = null;

        $order = Order::where(['userId' => $user->id])
            ->where(function ($query) {
                $query->where('status', 'paid')
                    ->orWhere('status', 'canceled');
            })
            ->whereDate('expiredIn', '>', Carbon::now()) // Add this line for the expiry condition
            ->latest('created_at')->first();
        //return $order;
        if (!empty($order->packId)) {
            $pack = Pack::find($order->packId);
            $subscriptionId = $order->subscriptionId;
        }



        if (empty($subscriptionId)) {
            /** Test if the client has paid an ancien order */
            $oldPaid = false;
            $orderPaid = Order::where(['userId' => $user->id])
                ->where(function ($query) {
                    $query->where('status', 'canceled');
                })
                //->whereDate('expiredIn', '<', Carbon::now()) // Add this line for the expiry condition
                ->latest('created_at')->first();

            if (!empty($orderPaid)) {
                $oldPaid = true;
                $subscriptionId = $orderPaid->subscriptionId;
            }
        }


        if (!empty($subscriptionId) || $oldPaid) {
            try {
                Stripe::setApiKey(env('STRIPE_SECRET'));
                $subscription = Subscription::retrieve($subscriptionId);
                // get last invoice
                $latest_invoice_id = $subscription->latest_invoice;

                $latest_invoice = Invoice::retrieve($latest_invoice_id);

                // get customer details
                $customer = Customer::retrieve($latest_invoice->customer);
                // get card details
                $paymentMethodId = $customer->default_source;
                $paymentMethod = PaymentMethod::retrieve($paymentMethodId);
                $cardLast4 = $paymentMethod->card->last4;
                $cardBrand = $paymentMethod->card->brand;
                $exp_month = $paymentMethod->card->exp_month;
                $exp_year = $paymentMethod->card->exp_year;



                $allSubscriptionIds = Order::where('userId', $user->id)
                    ->where(function ($query) {
                        $query->where('status', 'paid')
                            ->orWhere('status', 'canceled');
                    })
                    ->whereNotNull('subscriptionId')
                    ->distinct('subscriptionId')
                    ->latest('created_at')
                    ->pluck('subscriptionId')
                    ->toArray();
                $paymentHistory = []; // Pour stocker l'historique complet des paiements

                foreach ($allSubscriptionIds as $subscriptionId) {
                    try {
                        // Récupérez l'objet d'abonnement
                        $subscription = Subscription::retrieve($subscriptionId);

                        // Récupérez toutes les factures associées à cet abonnement
                        $invoices = \Stripe\Invoice::all([
                            'subscription' => $subscriptionId,
                        ]);

                        // Récupérez tous les PaymentIntents associés à ce client
                        $paymentIntents = PaymentIntent::all([
                            'customer' => $subscription->customer,
                        ]);

                        foreach ($paymentIntents->data as $paymentIntent) {
                            $data = array(
                                "created" => Carbon::createFromTimestamp($paymentIntent->created)->toDateString(),
                                "amount" => $paymentIntent->amount / 100 . ' ' . $paymentIntent->currency,
                                "status" => $paymentIntent->status,
                            );

                            // Ajoutez les liens des factures associées à ce paiement
                            $data['invoice_links'] = [];
                            foreach ($invoices->data as $invoice) {
                                if ($invoice->payment_intent == $paymentIntent->id) {
                                    $data['invoice_links'][] = $invoice->invoice_pdf;
                                }
                            }

                            $paymentHistory[] = $data;
                        }
                    } catch (\Stripe\Exception\ApiErrorException $e) {
                        // Gérez les erreurs comme vous le souhaitez
                    }
                }

                $SubscriptionCanceledAt = !empty($subscription->canceled_at) ? Carbon::createFromTimestamp($subscription->canceled_at)->toDateString() : null;
                return response()->json([
                    'pdfInvoice' => $latest_invoice->invoice_pdf,
                    'costumerEmail' => $latest_invoice->customer_email,
                    'costumerName' => $latest_invoice->customer_name,
                    'packName' => !empty($pack->name) ? $pack->name : 'Expired',
                    'packPrice' => !empty($pack->price) ? $pack->price : 0,
                    'SubscriptionExpireIn' => Carbon::createFromTimestamp($subscription->current_period_end)->toDateString(),
                    'SubscriptionCanceledAt' => $SubscriptionCanceledAt,
                    'paymentIntents' => $paymentHistory,
                    'card' => array(
                        'cardLast4' => $cardLast4,
                        'cardBrand' => $cardBrand,
                        'exp_month' => $exp_month,
                        'exp_year' => $exp_year
                    )
                ]);
            } catch (\Stripe\Exception\ApiErrorException $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json(false);
        }
    }
}
