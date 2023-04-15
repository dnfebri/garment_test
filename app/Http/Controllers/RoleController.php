<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function getAll()
    {
        $role = Role::where('is_delete', 0)->get();
        return response()->json([
            'message' => 'Data Role',
            'data' => $role
        ], 200);
    }

    public function getById($id)
    {
        $role = Role::where('id', $id)->first();
        if (!$role) {
            return response()->json(['error' => 'Role Not found'], 404);
        }
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
                'message' => 'Crate Role successfully',
                'data' => $role
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 401);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        $role = Role::where('id', $id)->first();
        if (!$role) {
            return response()->json(['error' => 'Role Not found'], 404);
        }
        Role::where('id', $role->id)
            ->update([
                'name' => $request['name'],
            ]);
        return response()->json([
            'message' => 'Role successfully updated',
        ], 200);
    }

    public function destroy($id)
    {
        $role = Role::where('id', $id)->first();
        if (!$role) {
            return response()->json(['error' => 'Role Not found'], 404);
        }
        Role::where('id', $role->id)
            ->update([
                'is_delete' => true,
            ]);
        return response()->json([
            'message' => 'Data Role successfully Deleted',
        ], 200);
    }
}
