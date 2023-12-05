<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pack;
use Illuminate\Support\Facades\Auth;

class authController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['checkToken','login', 'refresh', 'logout']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();
            if ($user) {
                return response()->json(['title' => 'vérifier votre coordonnées'], 400);

            }else{
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        }
        if (!auth()->user()->activated) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    /**
         * check if token is pxpired.
         *
         * @return \Illuminate\Http\JsonResponse
         */
        public function checkToken()
        {
            return auth()->check();
        }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $user = auth()->user();
        $packId = empty(auth()->user()->employerId) ?
                    auth()->user()->packId :
                    User::where('id',auth()->user()->employerId)->value('packId');
        $pack = Pack::find($packId);
        $user->isPremium = !empty($pack) && $pack->price != 0 ? true : false ;
        return response()->json([
            'id_token' => $token,
            'tokenType' => 'bearer',
            'user' => $user,
        ]);
    }
}

