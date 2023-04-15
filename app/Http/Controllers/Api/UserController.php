<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
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
        $dataRole = Role::all();
        return response()->json([
            'message' => '',
            'dataRole' => $dataRole,
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
        // $user = User::where('id', $key)->join('role_users', 'users.id', '=', 'role_users.user_id')->orderBy('users.id', 'desc')->first();
        $user = User::where('id', $key)->first();
        if (!$user) {
            return response()->json(['error' => 'User Not found'], 401);
        }
        $roleUser = RoleUser::where('user_id', $user->id)->first();
        if ($roleUser) {
            $user->role_id = $roleUser->role_id;
        } else {
            $user->role_id = 0;
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
        $password = $user->password;
        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        $roleUser = RoleUser::where('user_id', $user->id)->first();
        if ($roleUser) {
            try {
                RoleUser::where('id', $roleUser->id)
                ->update([
                'role_id' => $request['role_id'],
            ]);
            } catch (\Throwable $th) {
                return response()->json(['message' => $th], 401);
            }
        } else {
            try {
                RoleUser::create([
                'user_id' => $user->id,
                'role_id' => $request['role_id'],
            ]);
            } catch (\Throwable $th) {
                return response()->json(['message' => $th], 401);
            }
        }
        if ($request['password']) {
            $password = Hash::make($request['password']);
            $validator = Validator::make($request->all(), [
                'password' => 'required|confirmed|min:3',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->messages(), 400);
            }
            $password = Hash::make($request['password']);
        }
        try {
            User::where('id', $user->id)
                ->update([
                'name' => $request['name'],
                'email' => $request['email'],
                'is_active' => $request['is_active'] ?? $user->is_active,
                'password' => $password
            ]);
            return response()->json([
                'message' => 'User successfully updated',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 401);
        }
    }
}
