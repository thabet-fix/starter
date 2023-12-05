<?php

namespace App\Http\Controllers\OpenAi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Orhanerday\OpenAi\OpenAi;
use App\Models\AiContext;
use App\Models\Order;

class openAiController extends Controller
{
    public function index(Request $request)
    {
        $open_ai = new OpenAi(env('OPEN_AI_API_KEY'));

        $fields = $request->input('fields');
        $implodedFields = is_array($fields) ? implode(", ", $fields) : $fields;
        $context = AiContext::where('id', $request->input('contextId'))->value('context');
        $prompt = $request->input('contentToGenerate') .' avec les règles suivantes :
        utilisant le dictionnaire suivant à remplir: ' .$implodedFields. 'et le context est' . $context;
         $employerId = auth()->user()->id;
        $order = Order::where(['userId' => $employerId, 'status' => 'paid'])
            ->latest('created_at')
            ->first();

        $complete = $open_ai->completion([
            // 'model' => 'gpt-4',
            'model' => 'text-davinci-003',
            
            'prompt' => $prompt,
            'temperature' => 0.9,
            'max_tokens' => 1600,
            'frequency_penalty' => 0,
            'presence_penalty' => 0.6,
        ]);
        $data = json_decode($complete, true);
        $usedToken = $data['usage']['total_tokens'];
        $restToken = $order->quotaAi - $usedToken;

        $order->quotaAi = $restToken;
        $order->save();

        return response()->json(['result' => $data['choices'][0]['text']]);
    }
}
