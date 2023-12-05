<?php

namespace App\Http\Controllers\OpenAi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AiContext;

class AiContextController extends Controller
{
    public function index()
    {
        return AiContext::with('Fields')->orderBy('id','DESC')->paginate(25);
    }

    public function store(Request $request)
    {
        // return $request->input('contextFlields');
        $context = new AiContext();
        $context->name = $request->input('name');
        $context->context = $request->input('context');
        $context->save();
        if (!empty($request->input('contextFlields'))) {
            foreach ($request->input('contextFlields') as $field) {
                $context->fields()->create($field);
            }
        }
        return response()->json($context);
    }

    public function show($id)
    {
        return AiContext::with('Fields')->where('id',$id)->first();
    }

    public function update(Request $request, $id)
    {
        $context = AiContext::findOrFail($id);
        $context->name = $request->input('name');
        $context->context = $request->input('context');
        $context->save();
        $context->fields()->delete();
        if (!empty($request->input('contextFlields'))) {
            foreach ($request->input('contextFlields') as $field) {
                $context->fields()->create($field);
            }
        }

        return response()->json($context);
    }

    public function destroy($id)
    {
        $context = AiContext::findOrFail($id);
        $context->fields()->delete();
        $context->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
