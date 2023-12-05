<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\base64DecodeFile;
use App\Models\SdContract;
use App\Models\Template;
use App\Models\Language;
use App\Models\TemplateContent;
use App\Models\PdfUrl;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\URL;
use App\Traits\S3UploadFile;
use Illuminate\Support\Facades\Cache;


class sdContractController extends Controller
{
    use base64DecodeFile;
    use S3UploadFile;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['createSdContract']]);
    }

    public function createSdContract(Request $request){
        $contract = new SdContract();
        $lastSdContract = SdContract::latest()->first();
        $contract->number = !empty($lastSdContract)? $lastSdContract->number+1 : 1;
        $contract->buyerSignature = $this->base64DecodeFile($request->input('buyerSignature'),"buyerSignature-sd",'signature',$contract->number);
        $contract->templateId = $request->input('templateId');
        $contract->lang = Language::where('id',$request->input('langId'))->value('code');
        $contract->createdBy = $request->input('createdBy');
        $contract->save();
        $fields = $request->keys();
        foreach ($fields as $key => $field) {
            if (!in_array($field , [ "pageToken","pageId", "templateId", "createdBy", "langId", "buyerSignature"])) {
                $contract->fields()->create([
                    'field' => $field,
                    'value'=> $request->input($field),
                ]);
            }
        }
        // increment contractNbCreated fields if user pack have a contract quota
        $this->incrementContractCreated($request);
        // delete token in cache if user is a guest
        $key = $request->input('pageId');
        if (!empty($key)) {
            $cachedPageToken = Cache::forget($key);
        }
        // increment contract quota

        return response()->json($contract);
    }

    private function incrementContractCreated($request){
        if (auth()->guest()) {
            $user = User::find($request->input('createdBy'));
        }else $user = auth()->user();
        // if user pack have a limite contract nbr then we increment the value of contractNbCreated
        if (!empty($user->pack()->value('contractNb'))) {
            $prevValue = $user->contractNbCreated;
            if (empty($prevValue)) {
                $newValue = 1;
            }else $newValue = $prevValue+1;
            $user->contractNbCreated  = $newValue ;
            $user->save();
            return true;
        }

    }

    public function validateSdContract(Request $request , $id){
        $contract = SdContract::with('fields')->where('id',$id)->first();
        $langId = Language::where('code',$contract->lang)->value('id');
        $contract->companySignature = $this->base64DecodeFile($request->input('companySignature'),"companySignature",'signature',$contract->number);
        $template = Template::where('id', $contract->templateId)->first();

        $pdfUrl = $this->generateContractPdf($template, $contract, $langId, $contract->lang);/* Deprecated */
        $contract->save();
        $contract->pdfUrl()->create([
            'url' => $pdfUrl,
            'langId'=> $langId
        ]);
        return response()->json($contract);
    }

    public function generateNewPdfLanguage(Request $request){
        $contractId = $request->input('contractId');
        $langId = $request->input('langId');
        $contract = SdContract::with('fields')->where('id',$contractId)->first();
        $template = Template::where('id', $contract->templateId)->first();
        
        $pdfUrl = $this->generateContractPdf($template, $contract, $langId ,Language::where('id',$langId)->value('code'));
        
        $url = PdfUrl::where(['langId'=>$langId , 'contractId'=>$contractId ] );
        if (!$url->exists()) {
            $contract->pdfUrl()->create([
                'url' => $pdfUrl,
                'langId'=> $langId
            ]);
        }else{
            $pdfUrl = $url->value('url');
        }
        return response()->json($pdfUrl);
    }

    public function generateContractPdf($template, $data, $langId, $langCode){
        $contentTemplate = TemplateContent::where(['langId'=> $langId ,'templateId'=> $data->templateId])->first();
        $datas = array();
        foreach ($data->fields as $key => $field) {
            $datas['@['.$field->field.']@'] = $field->value;
        }
        if(!empty($datas)){
            foreach ($datas as $key => $value) {
                $contentTemplate->content = str_replace($key, $value, $contentTemplate->content);
            }
        }
        

        $pdfData = [
            'number'           => strval($data->number),
            'date'             => $data->created_at,
            'companySignature' => $data->companySignature,
            'buyerSignature'   => $data->buyerSignature,
            'labelSign1'       => !empty($template->labelSign1) ? $template->labelSign1 : 'Employee\'s signature',
            'labelSign2'       => !empty($template->labelSign2) ? $template->labelSign2 : 'Employer\'s signature',
            'content'          => $contentTemplate->content,
        ];

        

        $pdf = Pdf::loadView('SdContract/sd-contract',$pdfData);
        
        if (strtolower($langCode) == "bg") {
            $pdf->set_option('defaultFont', 'DejaVu Sans');
        }
        $pdf->setPaper('a4')->set_option('isRemoteEnabled', true)->setWarnings(true);

        $pdfLink = $this->uploadFileToS3($pdf->output(),'sd-contract-'.$data->number.'-'.strtolower($langCode).'.pdf','pdf');
        return $pdfLink;

    }

    public function getList(Request $request ){
        $orderBy = filled($request->input('orderBy')) ? $request->input('orderBy') : 'id';
        $order = filled($request->input('order')) ? $request->input('order') : 'DESC';
        $search = $request->input('search');

        if(empty(auth()->user()->employerId)) //user is employer
        {

            $managersId = auth()->user()->managers()->pluck('id')->toArray();
            array_push($managersId, auth()->user()->id);
            $contractList =SdContract::with('template.contents.language','CreatedBy')
                                        ->whereIn('createdBy', $managersId)
                                        ->when($request->input('templateId') != 'all', function ($query) use ($request) {
                                            return $query->where('templateId', $request->input('templateId'));
                                        })
                                        ->orderBy($orderBy, $order)
                                        ->paginate(25);

        } else {
            $contractList =SdContract::with('template.contents.language','CreatedBy')
                                       ->when($request->input('templateId') != 'all', function ($query) use ($request) {
                                            return $query->where('templateId', $request->input('templateId'));
                                        })
                                        ->where('createdBy', auth()->user()->id)
                                        ->orderBy($orderBy, $order)
                                        ->paginate(25);
        }
        return response()->json($contractList);
    }

    public function getContract(Request $request , $id){
        $contract = SdContract::with('fields')->where('id',$id)->first();
        return response()->json($contract);
    }

}
