<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SdContract extends Model
{
    protected $table="standard_contract";

    public function template(){
        return $this->belongsTo(Template::class, 'templateId');
    }

    public function pdfUrl(){
        return $this->hasMany(PdfUrl::class, 'contractId');
    }

    public function fields(){
        return $this->hasMany(SdContractField::class, 'sdContractId');
    }

    public function CreatedBy(){
        return $this->belongsTo(User::class, 'createdBy');
    }
}

