<?php

namespace App\Http\Controllers\Language;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Language;
use App\Models\Template;
use App\Traits\base64DecodeFile;

class LanguageController extends Controller
{
    use base64DecodeFile;

    public function index()
    {
        return Language::orderBy('id','DESC')->paginate(25);
    }

    public function store(Request $request)
    {
        $language = new Language();
        $name = $request->input('name');
        $code = $request->input('code');
        $language->name = $name;
        $language->code = $code;
        $language->flag = $this->base64DecodeFile($request->input('flag'),$name,'flag',$code);
        $language->save();
        return response()->json($language);
    }

    public function show($id)
    {
        return Language::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $language = Language::findOrFail($id);
        $name = $request->input('name');
        $code = $request->input('code');
        $language->name = $name;
        $language->code = $code;
        $language->flag = $this->base64DecodeFile($request->input('flag'),$name,'flag',$code);
        $language->save();

        return $language;
    }

    public function destroy($id)
    {
        $language = Language::findOrFail($id);
        $language->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function listByTemplate($id)
    {
        $template = Template::findOrFail($id);
        $langIdFromContent =  $template->contents()->pluck('langId')->toArray();
        return Language::whereIn('id', $langIdFromContent)->get();
    }
}
