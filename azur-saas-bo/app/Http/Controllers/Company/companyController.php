<?php
namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Traits\base64DecodeFile;
use Illuminate\Http\Request;

class companyController extends Controller
{
    use base64DecodeFile;

    public function changeStatus(Request $request, $id)
    {
        $company = Company::find($id);
        $company->activated = !$company->activated;
        $company->save();
        return response()->json($company);
    }

    public function index()
    {
        return Company::orderBy('id', 'DESC')->paginate(25);
    }

    public function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'denomination' => 'required|unique:companies'
            ]
        );
        $company = new Company();
        $company->idEmployer = $request->input('employerId');
        $company->denomination = $request->input('denomination');
        $company->presidentName = $request->input('presidentName');
        $company->siret = $request->input('siret');
        $company->siren = $request->input('siren');
        $company->activated = $request->input('activated');
        $company->adresse = $request->input('adresse');
        $company->postalCode = $request->input('postalCode');
        $company->logo = $this->base64DecodeFile($request->input('logo'), $request->input('denomination'), 'logos');
        // $language->code = $code;
        // $language->flag = $this->base64DecodeFile($request->input('flag'), $name, 'flag', $code);
        $company->save();
        return response()->json($company);
    }

    public function show($id)
    {
        return Company::findOrFail($id);
    }

    public function showByEmployer(Request $request)
    {
        return Company::where('employerId', auth()->user()->id)->first();
    }

    public function update(Request $request)
    {
        $company = Company::where('employerId', auth()->user()->id)->first();
        $this->validate(
            $request,
            [
                'denomination' => 'required|unique:companies,denomination,'.$company->id,
            ]
        );
        $company->denomination = $request->input('denomination');
        $company->presidentName = $request->input('presidentName');
        $company->siret = $request->input('siret');
        $company->siren = $request->input('siren');
        $company->adresse = $request->input('adresse');
        $company->postalCode = $request->input('postalCode');
        if ($request->filled('logo')) {
            $company->logo = $this->base64DecodeFile($request->input('logo'), $request->input('denomination'), 'logos');
        }
        $company->save();

        return $company;
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
