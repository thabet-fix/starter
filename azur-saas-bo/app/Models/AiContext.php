<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiContext extends Model
{
    protected $table = 'ai_context';

    public function Fields(){
        return $this->hasMany(ContextField::class ,'contextId');
    }
}


