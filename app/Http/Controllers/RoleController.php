<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function getAll()
    {
        $role = Role::all();
        return response()->json([
            'message' => 'Data Role',
            'data' => $role
        ], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        try {
            $role = Role::create([
                'name' => $request['name'],
            ]);
            return response()->json([
                'message' => 'pendaftaran berhasil',
                'data' => $role
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 401);
        }

    }
}
