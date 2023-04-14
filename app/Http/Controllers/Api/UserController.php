<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getAll()
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $roleUser = RoleUser::where('user_id', auth()->user()->id)->first();
        if ($roleUser['role_id'] !== 1) {
            return response()->json(['error' => 'Not Access'], 402);
        }
        $user = new User();
        $data = $user->getUsersRole();
        return response()->json([
            'message' => '',
            'data' => $data
        ], 200);
    }

    public function getById($key)
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $roleUser = RoleUser::where('user_id', auth()->user()->id)->first();
        if ($roleUser['role_id'] !== 1) {
            return response()->json(['error' => 'Not Access'], 402);
        }
        $user = User::where('id', $key)->first();
        if (!$user) {
            return response()->json(['error' => 'User Not found'], 401);
        }
        return response()->json([
            'message' => '',
            'data' => $user
        ], 200);
    }

    public function create(Request $request)
    {   
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $roleUser = RoleUser::where('user_id', auth()->user()->id)->first();
        if ($roleUser['role_id'] !== 1) {
            return response()->json(['error' => 'Not Access'], 402);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages());
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

    public function update(Request $request, $id)
    {   
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $roleUser = RoleUser::where('user_id', auth()->user()->id)->first();
        if ($roleUser['role_id'] !== 1) {
            return response()->json(['error' => 'Not Access'], 402);
        }
        $user = User::where('id', $id)->first();
        if (!$user) {
            return response()->json(['error' => 'User Not found'], 401);
        }

        try {
            User::where('id', $user->id)
                ->update([
                'name' => $request['name'],
                'email' => $request['email']
                // 'password' => Hash::make($request['password'])
            ]);
            return response()->json([
                'message' => 'pendaftaran berhasil',
                'data' => $user
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 401);
        }
    }
}
