<?php

namespace App\Http\Middleware;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Support\Facades\Cache;

use Closure;

class ValidatePageToken
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            $pageToken = $request->input('pageToken');
            $key = $request->input('pageId');
            $cachedPageToken = Cache::get($key);
            if ($cachedPageToken ===  $pageToken && !empty($cachedPageToken ) && !empty($pageToken ))
            {
                return $next($request);
            }
            return response('Unauthorized! Token page has been expired', 401);

        }
        return $next($request);

    }
}
