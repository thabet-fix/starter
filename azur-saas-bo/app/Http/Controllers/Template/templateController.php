<?php
namespace App\Http\Controllers\Template;

use App\Http\Controllers\Controller;
use App\Models\Template;
use App\Models\TemplateContent;
use App\Models\SdContract;
use App\Models\PdfUrl;
use Illuminate\Http\Request;

class templateController extends Controller
{
    public function __construct()
    {
        $this->middleware('isEmployer', ['except' => ['show']]);
    }
    public function index()
    {
        $employerId = empty(auth()->user()->employerId) ? auth()->user()->id : auth()->user()->employerId;
        return Template::with('contents.language')
                        ->where('employerId', $employerId)
                        ->paginate(25);
    }

    public function store(Request $request)
    {
        $template = new Template();
        $template->name = $request->input('name');
        $template->employerId = empty(auth()->user()->employerId) ? auth()->user()->id : auth()->user()->employerId;
        $template->save();

        return response()->json($template);
    }

    public function show($id)
    {
        return Template::with('contents.language')->where('id', $id)->first();
    }

    public function update(Request $request, $id)
    {
        $template = Template::findOrFail($id);
        // check content matching
        $basicContent = $template->contents()->first();
        if (!empty($basicContent)) {
            $newContent = $request->input('content');
            $pattern = '/@\[(.*?)\]@/';
            preg_match_all($pattern, $basicContent->content, $basicFields); // return all field between @[]@ in the first content
            preg_match_all($pattern, $newContent, $newFields); // return all field between @[]@ in the new content passed in request
            $missedFields1 = array_diff($basicFields[1] , $newFields[1]); // check if newContent has missing fields
            $missedFields2 = array_diff($newFields[1] , $basicFields[1]); // check if newContent has extra fields
            $fileds = "";
            if(count($missedFields1) !== 0 || count($missedFields2) !== 0){
                foreach ($missedFields1 as $field) {
                    $fileds .= ' @[' . $field . ']@ ,';
                }
                foreach ($missedFields2 as $field) {
                    $fileds .= ' @[' . $field . ']@ ,';
                }
                //return response()->json($fileds,422);
            }
        }

        // update process when content are matching
        $template->name = $request->input('name');
        $template->labelSign1 = $request->input('labelSign1');
        $template->labelSign2 = $request->input('labelSign2');
        $template->save();
        if ($request->input('isNewContent')) {
            $templateContent = new TemplateContent();
            $templateContent->content = $request->input('content');
            $templateContent->langId = $request->input('langId');
            $templateContent->templateId = $template->id;
            $templateContent->save();
        } else {
            $template->contents()
                ->where('templateId', $id)
                ->where('langId', $request->input('langId'))
                ->update(['content' => $request->input('content')]);
        }
        return response()->json($template);
    }

    public function destroyTemplate($id)
    {
        $template = Template::findOrFail($id);

        $template->contents()->delete();
        $standardContracts = $template->standardContract;
        // return $standardContract;
        foreach ($standardContracts as $standardContract) {
            $standardContract->pdfUrl()->delete();
            $standardContract->delete();
        }

        $template->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function destroyContent(Request $request, $id)
    {
        $template = Template::findOrFail($id);
        $template->contents()
            ->where('templateId', $id)
            ->where('langId', $request->input('langId'))
            ->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
