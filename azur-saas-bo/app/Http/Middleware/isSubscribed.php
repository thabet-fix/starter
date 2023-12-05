<?php

namespace App\Http\Middleware;
use Illuminate\Contracts\Auth\Factory as Auth;
use App\Models\User;
use App\Models\Order;
use Carbon\Carbon;
use Closure;

class isSubscribed
{
    /**
    * The authentication guard factory instance.
    *
    * @var \Illuminate\Contracts\Auth\Factory
    */
   protected $auth;

   /**
    * Create a new middleware instance.
    *
    * @param  \Illuminate\Contracts\Auth\Factory  $auth
    * @return void
    */
   public function __construct(Auth $auth)
   {
       $this->auth = $auth;
   }

   /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @param  string|null  $guard
    * @return mixed
    */
   public function handle($request, Closure $next, $guard = null)
   {
        if($this->auth->guard($guard)->guest() ){
            $user = User::find($request->input('createdBy'));
        }
        elseif(!empty(auth()->user()->employerId)) {
            $user = User::find(auth()->user()->employerId);
        }
        else $user = auth()->user();
        $pack = Order::packDetails($user->id);


        $isExpired = false;
        $isExpiredTime = false;
        $isExpiredContract = false;
        // check if pack is expired due to period
        if (!empty($pack->expiredIn)) {
            $today = Carbon::today();
            $expiredDate = Carbon::parse($pack->expiredIn)->addDay();
            $today->gt($expiredDate) ? $isExpiredTime = true : $isExpiredTime = false;
        }
        // check if pack is expired due to contract number
        if (!empty($pack->contractNb)) {
            $allowedContractNbr = $pack->contractNb;
            $nbrContractCreated = $user->contractNbCreated;
            $nbrContractCreated >= $allowedContractNbr ? $isExpiredContract = true : $isExpiredContract = false;
        }
        if($isExpiredTime || $isExpiredContract){
            $isExpired = true;
        }

        if ( $isExpired ) {
            return response('Unauthorized!! You are not subscribed', 402);
        }
        return $next($request);


   }
}
