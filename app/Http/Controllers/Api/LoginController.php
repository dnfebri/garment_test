<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email',$request->email)->first();
        if (!$user) {
            return response()->json([
                "Login" => false,
                "massage" => "User Not fond",
            ], 401);
        }
        $passwordCek = Hash::check($request->password, $user->password);
        if (!$passwordCek) {
            return response()->json([
                "massage" => "passwor salah"
            ], 402);
        }
        $token = $user->createToken('token-name', ['server:update'])->plainTextToken;
            $user->remember_token = $token;
            $user->save();
            return response()->json([
                "data" => $user,
                "token" => $token
            ], 200);
    }
}
