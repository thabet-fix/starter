<?php

namespace App\Http\Controllers\Payments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Stripe;
use Stripe\Subscription;
use Stripe\Customer;
use Stripe\Event;
use App\Models\Order;
use App\Models\User;
use App\Models\Pack;
use Carbon\Carbon;
use Stripe\Checkout\Session;

class StripeSubscriptionController extends Controller
{
    
    public function subscription(Request $request)
    {
        $packStripeId = $request->input('packStripeId');
        $email = $request->input('email');
        $name = $request->input('name');
        $token = $request->input('token');

        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

            // Rechercher un client existant par e-mail
            $existingCustomers = Customer::all(['email' => $email]);
            $customer = null;

            if (count($existingCustomers->data) > 0) {
                // Utiliser le client existant
                $customer = $existingCustomers->data[0];
            } else {
                // Créer un nouveau client
                $customer = Customer::create([
                    'email' => $email,
                    'name' => $name,
                    'source' => $token['id'],
                ]);
            }

            $lineItems = [[
                'quantity' => 1,
                'price' => $packStripeId,
            ]];

            $subscription = Subscription::create([
                'customer' => $customer->id,
                'items' => $lineItems
            ]);

            $this->createOrder($subscription, $packStripeId);

            return response()->json($subscription);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    // public function subscription(Request $request){
    //     $user = auth()->user();
        

    //     $packStripeId = $request->input('packStripeId');
    //     $email = $request->input('email');
    //     Stripe::setApiKey(env('STRIPE_SECRET'));

    //     $session = Session::create([
    //         'payment_method_types' => ['card'],
    //         'line_items' => [[
    //             'price' => $packStripeId,
    //             'quantity' => 1,
    //         ]],
    //         'mode' => 'subscription',
    //         'success_url' => 'https://example.com/success',
    //         'cancel_url' => 'https://example.com/cancel',
    //         'email' => $user->email,
    //     ]);
    //     return response()->json(['url' => $session->url]);
    // }

    private function createOrder($subscription, $packStripeId)
    {
        $order = new Order();
        $pack = Pack::where('stripeId', $packStripeId)->first();
        $order->status = 'paid';
        $order->price = $pack->price;
        $order->packId = $pack->id;
        $order->contractNb = $pack->contractNb;
        $order->optionAi = $pack->optionAi;
        $order->subscriptionId = $subscription->id;
        !empty($pack->period) ? $order->expiredIn =  Carbon::createFromTimestamp($subscription->current_period_end)->toDateString($subscription->current_period_end) : $order->expiredIn = null;
        $order->userId = auth()->user()->id;
        $order->save();
        User::where('id', $order->userId)->update(['packId' => $order->packId, 'contractNbCreated' => null]);
    }

    public function cancelSubscription(Request $request)
    {
        $user = auth()->user();

        // Get the packId where price equal 0
        // $pack = Pack::where(['price' => 0])->first();

        // Set your Stripe secret key
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Get the subscription ID
        $subscription = Order::where(['userId' => $user->id, 'status' => 'paid'])->latest('created_at')->first();

        try {
            // Retrieve the subscription from Stripe
            $subscriptionStripe = \Stripe\Subscription::retrieve($subscription->subscriptionId);

            // Cancel the subscription
            $subscriptionStripe->cancel();

            // set subscription as canceled in app
            $subscription->status = "canceled";
            // $subscription->packId = $pack->id;
            // User::where('id', auth()->user()->id)->update(['packId'=> $pack->id]);


            $subscription->save();

            // Handle the success response
            return response()->json(['message' => 'Subscription canceled successfully']);
        } catch (ApiErrorException $e) {
            // Handle API error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reccurentSubscriptionPayment(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET'); // Get this from your .env file or config
        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);

            // Handle the event type
            switch ($event->type) {
                case 'invoice.payment_succeeded':
                    $amount = $event->data->object->amount_paid;
                    // Process the amount paid here
                    break;

                    // Add more cases for other event types you want to handle

                default:
                    // Unexpected event type
                    break;
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
