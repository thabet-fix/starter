<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\URL;
use App\Traits\base64DecodeFile;
use App\Traits\S3UploadFile;
use App\Models\tmContract;
use Illuminate\Support\Facades\Cache;

class tmContractController extends Controller
{
    use base64DecodeFile;
    use S3UploadFile;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['createTmContract']]);
    }

    public function createTmContract(Request $request){
        $contract = new tmContract();
        $lastTmContract = tmContract::latest()->first();
        $contract->number = !empty($lastTmContract)? $lastTmContract->number+1 : 1;
        $contract->companyRepresentative = $request->input('companyRepresentative');
        $contract->companyEmail = $request->input('companyEmail');
        $contract->companyPhone = $request->input('companyPhone');
        $contract->representativeFirstName = $request->input('representativeFirstName');
        $contract->representativeLastName = $request->input('representativeLastName');
        $contract->representativeAddress = $request->input('representativeAddress');
        $contract->designation = $request->input('designation');
        $contract->manifacturer = $request->input('manifacturer');
        $contract->price = $request->input('price');
        $contract->commision = $request->input('commision');
        $contract->deliveryAddress = $request->input('deliveryAddress');
        $contract->buyerName = $request->input('buyerName');
        $contract->companyName = $request->input('companyName');
        $contract->lang = $request->input('lang');
        $contract->pdfUrlLang1 = $request->input('pdfUrlLang1');
        $contract->pdfUrlLang2 = $request->input('pdfUrlLang2');
        $contract->buyerSignature = $this->base64DecodeFile($request->input('buyerSignature'),"buyerSignature-tm",'signature',$contract->number);
        $contract->save();
         // delete token in cache if user is a guest
         $key = $request->input('pageId');
         if (!empty($key)) {
             $cachedPageToken = Cache::forget($key);
         }
        return response()->json($contract);
    }

    public function validateTmContract(Request $request , $id){
        $contract = tmContract::find($id);
        $contract->companyName = $request->input('companyName');
        $contract->companySignature = $this->base64DecodeFile($request->input('companySignature'),"companySignature",'signature',$contract->number);
        $contract->pdfUrlLang1 = $this->generateContractPdf($contract,'bg');
        $contract->pdfUrlLang2 = $this->generateContractPdf($contract, $contract->lang);
        $contract->save();
        return response()->json($contract);
    }

    public function generateContractPdf($data, $lang){
        $pdfData = [
            'number'                  => strval($data->number),
            'date'                    => $data->created_at,
            'companyRepresentative'   => $data->companyRepresentative,
            'companyEmail'            => $data->companyEmail,
            'companyPhone'            => $data->companyPhone,
            'representativeFirstName' => $data->representativeFirstName,
            'representativeLastName'  => $data->representativeLastName,
            'representativeAddress'   => $data->representativeAddress,
            'designation'             => $data->designation,
            'manifacturer'            => $data->manifacturer,
            'price'                   => $data->price,
            'commision'               => $data->commision,
            'deliveryAddress'         => $data->deliveryAddress,
            'buyerName'               => $data->buyerName,
            'buyerSignature'          => $data->buyerSignature,
            'companySignature'          => $data->companySignature,
            'companyName'             => $data->companyName,
        ];

        $pdf = Pdf::loadView('TmContract/tm-contract-'.strtolower($lang),$pdfData);
        if ($lang == "bg") {
            $pdf->set_option('defaultFont', 'DejaVu Sans');
        }
        $pdf->setPaper('a4')->set_option('isRemoteEnabled', true)->setWarnings(true);
        $pdfLink = $this->uploadFileToS3($pdf->output(),'tm-contract-'.$data->number.'-'.strtolower($lang).'.pdf','pdf');

        return $pdfLink;

    }

    public function getList(Request $request ){
        $orderBy = filled($request->input('orderBy')) ? $request->input('orderBy') : 'id';
        $order = filled($request->input('order')) ? $request->input('order') : 'DESC';
        $search = $request->input('search');

        $contractList =tmContract::where('representativeAddress', 'like', "%{$search}%")
        ->orWhereRaw("concat(representativeFirstName, ' ', representativeLastName) like '%" .$search. "%' ")
        ->orWhere('designation', 'like', "%{$search}%")
                                    ->orWhere('price', 'like', "%{$search}%")
                                    ->orderby($orderBy, $order)
                                    ->get();
        return response()->json($contractList);
    }

    public function getContract(Request $request , $id){
        $contract = tmContract::find($id);
        return response()->json($contract);
    }
}
