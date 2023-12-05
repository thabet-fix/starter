<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\base64DecodeFile;
use App\Models\acContract;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\URL;
use App\Traits\S3UploadFile;
use Illuminate\Support\Facades\Cache;


class acContractController extends Controller
{
    use base64DecodeFile;
    use S3UploadFile;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['createAcContract']]);
    }

    public function createAcContract(Request $request){
        $contract = new acContract();
        $lastAcContract = acContract::latest()->first();
        $contract->number = !empty($lastAcContract)? $lastAcContract->number+1 : 1;
        $contract->name = $request->input('name');
        $contract->passportId = $request->input('passportId');
        $contract->zipCode = $request->input('zipCode');
        $contract->address = $request->input('address');
        $contract->nationality = $request->input('nationality');
        $contract->city = $request->input('city');
        $contract->phoneNumber = $request->input('phoneNumber');
        $contract->email = $request->input('email');
        $contract->bank = $request->input('bank');
        $contract->iban = $request->input('iban');
        $contract->swift = $request->input('swift');
        $contract->buyerSignature = $this->base64DecodeFile($request->input('buyerSignature'),"buyerSignature-ac",'signature',$contract->number);
        $contract->lang = $request->input('lang');
        $contract->save();
        // delete token in cache if user is a guest
        $key = $request->input('pageId');
        if (!empty($key)) {
            $cachedPageToken = Cache::forget($key);
        }
        return response()->json($contract);
    }

    public function validateAcContract(Request $request , $id){
        $contract = acContract::find($id);
        $contract->companySignature = $this->base64DecodeFile($request->input('companySignature'),"companySignature",'signature',$contract->number);
        $contract->pdfUrlLang1 = $this->generateContractPdf($contract,'bg');
        $contract->pdfUrlLang2 = $this->generateContractPdf($contract, $contract->lang);
        $contract->save();
        return response()->json($contract);
    }

    public function generateContractPdf($data, $lang){
        $pdfData = [
            'number'           => strval($data->number),
            'date'             => $data->created_at,
            'name'             => $data->name,
            'passportId'       => $data->passportId,
            'zipCode'          => $data->zipCode,
            'address'          => $data->address,
            'nationality'      => $data->nationality,
            'city'             => $data->city,
            'phoneNumber'      => $data->phoneNumber,
            'email'            => $data->email,
            'bank'             => $data->bank,
            'iban'             => $data->iban,
            'swift'            => $data->swift,
            'companySignature' => $data->companySignature,
            'buyerSignature'   => $data->buyerSignature,
        ];

        $pdf = Pdf::loadView('AcContract/ac-contract-'.strtolower($lang),$pdfData);
        if ($lang == "bg") {
            $pdf->set_option('defaultFont', 'DejaVu Sans');
        }
        $pdf->setPaper('a4')->set_option('isRemoteEnabled', true)->setWarnings(true);
        $pdfLink = $this->uploadFileToS3($pdf->output(),'ac-contract-'.$data->number.'-'.strtolower($lang).'.pdf','pdf');
        return $pdfLink;

    }

    public function getList(Request $request ){
        $orderBy = filled($request->input('orderBy')) ? $request->input('orderBy') : 'id';
        $order = filled($request->input('order')) ? $request->input('order') : 'DESC';
        $search = $request->input('search');

        $contractList =acContract::where('name', 'like', "%{$search}%")
                                    ->orWhere('phoneNumber', 'like', "%{$search}%")
                                    ->orWhere('email', 'like', "%{$search}%")
                                    ->orWhere('number', 'like', "%{$search}%")
                                    ->orderby($orderBy, $order)
                                    ->get();
        return response()->json($contractList);
    }

    public function getContract(Request $request , $id){
        $contract = acContract::find($id);
        return response()->json($contract);
    }

}
