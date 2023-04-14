<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }

        try {
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => Hash::make($request['password'])
            ]);
            return response()->json([
                'message' => 'pendaftaran berhasil',
                'data' => $user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 401);
        }

    }

    public function me()
    {
        $roleId = 0;
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $roleUser = RoleUser::where('user_id', auth()->user()->id)->first();
        if ($roleUser) {
            $roleId = $roleUser->role_id;
        }
        return response()->json([
            'user' => auth()->user(),
            'roleId' => $roleId
        ]);
    }

    public function logout()
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
