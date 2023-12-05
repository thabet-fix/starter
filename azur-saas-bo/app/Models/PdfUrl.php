<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PdfUrl extends Model
{
    protected $table="pdf_urls";
    protected $fillable = ['url', 'contractId','langId'];

    public function contract(){
        return $this->belongsTo(SdContract::class, 'contractId');
    }
}
