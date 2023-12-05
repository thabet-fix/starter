<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemplateContent extends Model
{
    //
    protected $table="template_content";

    public function template(){
        return $this->belongsTo(Template::class, 'templateId');
    }

    public function language(){
        return $this->belongsTo(Language::class, 'langId');
    }
}
