<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['quotaAi', 'contractNb', 'packId', 'status', 'expiredIn', 'price', 'userId', 'subscriptionId', 'id', 'sessionId', 'created_at', 'updated_at', 'optionAi'];

    public function employer(){
        return $this->belongsTo(User::class, 'userId');
    }

    public function pack(){
        return $this->belongsTo(Pack::class, 'packId');
    }

    public static function packDetails($employerId)
    {
        return self::with('pack')->where(['userId' => $employerId ])
                    ->latest('created_at')
                    ->first();
    }
    
    public static function packDetailsPaid($employerId)
    {
        return self::with('pack')->where(['userId' => $employerId, 'status' => 'paid' ])
                    ->latest('created_at')
                    ->first();
    }
}
