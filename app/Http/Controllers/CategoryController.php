<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function getAll()
    {
        $categorys = Category::where('is_delete', 0)->get();
        return response()->json([
            'message' => 'Data Categorys All',
            'data' => $categorys
        ], 200);
    }

    public function getById($id)
    {
        $categorys = Category::where('id', $id)->first();
        if (!$categorys) {
            return response()->json(['error' => 'Categorys Not found'], 404);
        }
        return response()->json([
            'message' => 'Data Category By ID',
            'data' => $categorys
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
            $category = Category::create([
                'name' => $request['name'],
            ]);
            return response()->json([
                'message' => 'Crate Category successfully',
                'data' => $category
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
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
        $category = Category::where('id', $id)->first();
        if (!$category) {
            return response()->json(['error' => 'Category Not found'], 404);
        }
        Category::where('id', $category->id)
            ->update([
                'name' => $request['name'],
            ]);
        return response()->json([
            'message' => 'Category successfully updated',
        ], 200);
    }

    public function destroy($id)
    {
        $category = Category::where('id', $id)->first();
        if (!$category) {
            return response()->json(['error' => 'Category Not found'], 404);
        }
        Category::where('id', $category->id)
            ->update([
                'is_delete' => true,
            ]);
        return response()->json([
            'message' => 'Data Category successfully Deleted',
        ], 200);
    }
}
