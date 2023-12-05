<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;

class configurationController extends Controller
{
    public function store(Request $request)
    {
        $configuration = new Configuration();
        $configuration->tokenQuotaExtra = $request->input('tokenQuotaExtra');
        $configuration->tokenPriceExtra = $request->input('tokenPriceExtra');
        $configuration->save();
        return response()->json($configuration);
    }

    public function show()
    {
        return Configuration::first();
    }

    public function update(Request $request)
    {
        $configuration = Configuration::first();

        if ($configuration === null) {
            return $this->store($request);
        }
        
        $configuration->tokenQuotaExtra = $request->input('tokenQuotaExtra');
        $configuration->tokenPriceExtra = $request->input('tokenPriceExtra');
        $configuration->save();

        return $configuration;
    }
}
