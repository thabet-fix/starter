<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = ['name', 'code'];

    public function content(){
        return $this->hasMany(TemplateContent::class, 'langId');
    }
}
