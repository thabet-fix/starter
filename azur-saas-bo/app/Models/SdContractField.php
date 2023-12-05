<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SdContractField extends Model
{
    protected $table="sd_contract_fields";
    protected $fillable = ['field', 'value'];

    public function sdContract(){
        return $this->belongsTo(SdContract::class, 'sdContractId');
    }
}
