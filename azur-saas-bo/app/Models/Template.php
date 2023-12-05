<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    //
    protected $fillable = ['name', 'content', 'langId'];

    public function standardContract() {
        return $this->hasMany(SdContract::class, 'templateId');
    }

    public function user(){
        return $this->belongsTo(User::class, 'employerId');
    }

    public function contents() {
        return $this->hasMany(TemplateContent::class, 'templateId');
    }

}

