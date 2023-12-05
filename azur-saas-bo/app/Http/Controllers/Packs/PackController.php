<?php

namespace App\Http\Controllers\Packs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pack;
use App\Models\User;
use App\Models\Order;
use Carbon\Carbon;

class PackController extends Controller
{
    public function index()
    {
        return Pack::orderBy('price','ASC')->paginate(25);
    }

    public function store(Request $request)
    {
        $Pack = new Pack();
        $Pack->name = $request->input('name');
        $Pack->description = $request->input('description');
        $Pack->price = $request->input('price');
        $Pack->contractNb = $request->input('contractNb');
        $Pack->optionAi = $request->input('optionAi');
        $Pack->period = $request->input('period');
        $Pack->quotaAi = $request->input('quotaAi');
        $Pack->stripeId = $request->input('stripeId');
        $Pack->save();
        return response()->json($Pack);
    }

    public function show($id)
    {
        return Pack::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $Pack = Pack::findOrFail($id);
        $Pack->name = $request->input('name');
        $Pack->description = $request->input('description');
        $Pack->price = $request->input('price');
        $Pack->contractNb = $request->input('contractNb');
        $Pack->optionAi = $request->input('optionAi');
        $Pack->period = $request->input('period');
        $Pack->quotaAi = $request->input('quotaAi');
        $Pack->stripeId = $request->input('stripeId');
        $Pack->save();

        return $Pack;
    }

    public function destroy($id)
    {
        $Pack = Pack::findOrFail($id);
        $Pack->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function userPackDetails(Request $request , $userId){
        if (empty($userId)) {
            $user = auth()->user();
        }else $user = User::find($userId);
        $packDetails = Order::packDetailsPaid($user->id);
        $isExpired = false;
        $isExpiredTime = false;
        $isExpiredContract = false;
        // check if pack is expired due to expired date
        if (!empty($packDetails->expiredIn)) {
            $today = Carbon::today();
            $expiredDate = Carbon::parse($packDetails->expiredIn)->addDay();
            $today->gt($expiredDate) ? $isExpiredTime = true : $isExpiredTime = false;
        }
        // check if pack is expired due to contract number
        if (!empty($packDetails->contractNb)) {
            $allowedContractNbr = $packDetails->contractNb;
            $nbrContractCreated = $user->contractNbCreated;
            $nbrContractCreated >= $allowedContractNbr ? $isExpiredContract = true : $isExpiredContract = false;
        }
        if($isExpiredTime || $isExpiredContract){
            $isExpired = true;
        }
        $packDetails->isExpired = $isExpired;
        return $packDetails;
    }

}
