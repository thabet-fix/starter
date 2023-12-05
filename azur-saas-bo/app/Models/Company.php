<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    public function standardContract() {
        return $this->hasMany(User::class);
    }
}
