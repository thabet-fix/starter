<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\PageLink;
use Carbon\Carbon;

class SendContractLinkController extends Controller
{
    public function SendContractLinkByMail(Request $request)
    {
        $key = Str::random(32); // Generate a 32-character random string
        $token = Str::uuid()->toString();
        $expiration = Carbon::now()->addMinutes(60*24);
        Cache::add($key, $token, $expiration); // Cache the token for 1 hour
        $templateId = $request->input('templateId');
        $templateName = $request->input('templateName');
        $pageLink = env('FRONT_APP_URL').'app/standard-contract-'.$templateId.'?pageToken='.$token.'&pageId='.$key.'&createdBy='.auth()->user()->id;
        // mail data
        $clientEmail = $request->input('clientEmail');
        // $contractType = $request->input('pageName');
        $mailData = array($pageLink , $clientEmail , $templateName);
        Mail::to($clientEmail)->send(new PageLink($mailData));
        return response()->json($pageLink);
    }
}
