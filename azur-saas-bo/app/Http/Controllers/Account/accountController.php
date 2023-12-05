<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ConfirmAccount;
use App\Models\Company;
use App\Models\Pack;
use App\Models\Order;
use Carbon\Carbon;

class accountController extends Controller
{
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $user = auth()->user();
        return response()->json($user);
    }
    /**
     * update User profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $this->validate(
            $request,
            [
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users,email,'.$user->id,
            ]
        );

        if ($request->filled('email')) {
            $user->email = $request->input('email');
        }
        if ($request->filled('firstName')) {
            $user->firstName = $request->input('firstName');
        }
        if ($request->filled('lastName')) {
            $user->lastName = $request->input('lastName');
        }
        if ($request->filled('phoneNumber')) {
            $user->phoneNumber = $request->input('phoneNumber');
        }
        if ($request->filled('langKey')) {
            $user->langKey = $request->input('langKey');
        }
        // if ($request->file('logo')) {
        //     if (!empty($user->logo)) {
        //         $this->deleteFileFromS3($user->logo);
        //     }
        //     $logo = file_get_contents($request->file('logo'));
        //     $logoName = $request->file('logo')->getClientOriginalName();
        //     $user->logo = $this->uploadFileToS3($logo,$logoName,'logos');
        // }
        $user->save();


        return  response()->json($user);
    }

    /**
     * Create new user and send emailto confirm signup.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUser(Request $request)
    {
        $this->validate(
            $request,
            [
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
                'denomination' => 'required|unique:companies',
                'password' => "required",
            ]
        );
        $pack = Pack::where('price', "0.00")->first();
        $user = new User();
        $user->email = $request->input('email');
        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->password = Hash::make($request->input('password'));
        $user->phoneNumber = $request->input('phoneNumber');
        $user->langKey = $request->input('langKey');
        $user->activated = false;
        $user->isAdmin = false;
        $user->packId = $pack->id;

        // send user an email to activate his account
        if ($user->save()) {
            $company = new Company();
            $company->employerId = $user->id;
            $company->denomination = $request->input('denomination');
            $company->save();
        }

        // create order for pack purchase
        $order = new Order();
        $order->status = 'paid';
        $order->price = $pack->price;
        $order->packId = $pack->id;
        $order->contractNb = $pack->contractNb;
        $order->optionAi = $pack->optionAi;
        $order->quotaAi = $pack->quotaAi;
        !empty($pack->period) ? $order->expiredIn = Carbon::now()->addDays($pack->period)->format('Y-m-d') : $order->expiredIn = null;
        $order->userId = $user->id;
        $order->save();
        // send mail to confirm account and activate it
        Mail::to($request->input('email'))->send(new ConfirmAccount(array($user->id)));
        return  response()->json($user);
    }

    /**
     * activate user account via link sent in mail.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function firstAccountActivation(Request $request, $key)
    {
        $user = User::find($key);
        if ($user->created_at->format('Y-m-d H:i:s') === $user->updated_at->format('Y-m-d H:i:s')) {
            $user->activated = true;
            $user->save();
            return response()->json('success');
        }
        return response()->json('user has been activated before', 428);
    }

    public function changePassword(Request $request)
    {
        $user = auth()->user();
        $password = $request->input('newPassword');
        if (filled($request->input('newPassword'))) {
            if (!empty($user->wpId)) {
                $this->resetWpPassword($user->wpId, $password);
            }
            $user->password = Hash::make($password);
            $user->save();
        }

        return response()->json('Password has been saved !!');
    }
}
