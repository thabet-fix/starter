<?php

namespace App\Http\Middleware;

use Closure;

class CheckResourceOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $model
     * @param  string  $ownerColumn
     * @return mixed
     */
    public function handle($request, Closure $next, $model, $ownerColumn = 'employerId', $secondOwnerColumn = 'id')
    {
        $modelClass = "App\\Models\\" . $model;
        $resource = $modelClass::findOrFail($request->id);
        
        if(empty($resource->{$ownerColumn}) && $model == 'User'){ 
            $ownerColumn = $secondOwnerColumn;
        }
        if (($resource->{$ownerColumn} !== auth()->id()) && ($resource->{$ownerColumn} !== auth()->user()->employerId)) {
            return response()->json(['message' => 'Unauthorized: You can only access resources that you own'], 403);
        }

        return $next($request);
    }
}
