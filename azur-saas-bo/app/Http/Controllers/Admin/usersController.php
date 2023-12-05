<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class usersController extends Controller
{
    public function accountActivation(Request $request , $id ){
        $user = User::find($id);
        $user->activated =true;
        $user->save();
        return response()->json( $user);
    }
    public function removeAccount(Request $request , $id ){
        $user = User::find($id);
        $user->delete();
        return response()->json("success");
    }
    public function usersList(Request $request){
        if(auth()->user()->isAdmin){
            $users = User::where(['isAdmin'=>false])->orderBy('id', 'DESC')->paginate(25);
        } else {
            $users = User::where(['employerId'=>auth()->user()->id])->orderBy('id', 'DESC')->paginate(25);
        }

        return response()->json( $users );
    }
    public function createManager(Request $request){
        $this->validate(
            $request,
            [
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
            ]
        );
        $manager = new User();
        $manager->firstName = $request->input('firstName');
        $manager->lastName = $request->input('lastName');
        $manager->email = $request->input('email');
        $manager->password = $request->input('password');
        $manager->employerId = auth()->user()->id;
        $manager->save();
        return response()->json( $manager );
    }
    public function getManager($id ){
        $user = User::find($id);
        return response()->json( $user );
    }
    public function updateManager(Request $request, $id)
    {
        $this->validate(
            $request,
            [
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
            ]
        );
        $manager = User::find($id);
        $manager->firstName = $request->input('firstName');
        $manager->lastName = $request->input('lastName');
        $manager->email = $request->input('email');
        $manager->phoneNumber = $request->input('phoneNumber');
        $manager->save();
        return response()->json( $manager );
    }
}
