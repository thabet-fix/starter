<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContextField extends Model
{
    protected $table = 'context_flields';
    protected $fillable = ['label', 'value'];

    public function AiContext(){
        return $this->belongsTo(ContextField::class ,'contextId');
    }
}
