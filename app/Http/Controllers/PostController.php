<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function getAll()
    {
        $post = Post::where('is_delete', 0)
            ->where('title','LIKE','%'.request()['search'].'%')
            ->where('category_id','LIKE','%'.request()['category'].'%')
            ->orderBy('id', 'DESC')
            ->get();
        return response()->json([
            'message' => 'Data Post All',
            'data' => $post
        ], 200);
    }

    public function getById($uuid)
    {
        $post = Post::where('uuid', $uuid)->first();
        if (!$post) {
            return response()->json(['error' => 'Post Not found'], 404);
        }
        $notes = Notes::where('post_id', $post->id)->orderBy('id', 'DESC')->get();
        return response()->json([
            'message' => 'Data Post By ID',
            'data' => $post,
            'notes' => $notes
        ], 200);
    }

    public function create(Request $request)
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'subtitle' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'description_note' => 'required',
            'file_pdf' => 'required|mimes:pdf|max:512',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }

        // Proses file pdf
        $fileName = Str::slug($request['title']) . '.' . $request->file('file_pdf')->extension();
        $saveFile = $request->file('file_pdf')
            ->storeAs('pdf', $fileName, ['disk' => 'public']);
        $json = (object) [
            'file_pdf' => Storage::url($saveFile)
        ];

        try {
            $post = Post::create([
                'uuid' => Str::uuid(),
                'title' => $request['title'],
                'subtitle' => $request['subtitle'],
                'description' => $request['description'],
                'user_id' => auth()->user()->id,
                'category_id' => $request['category_id'],
                'json' => json_encode($json),
            ]);
            $note = Notes::create([
                'post_id' => $post->id,
                'user_id' => auth()->user()->id,
                'action' => "Create",
                'description' => $request['description_note']
            ]);
            return response()->json([
                'message' => 'Crate Post successfully',
                'data' => $post,
                'note' => $note
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 400);
        }
        // return response()->json([
        //     'message' => "file Upload success", 
        //     "file_name" => $fileName,
        //     "save_file" => Storage::url($saveFile),
        //     "json" => json_encode($json)
        // ], 201);
    }

    public function update(Request $request, $uuid)
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'subtitle' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'description_note' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        $post = Post::where('uuid', $uuid)->first();
        if (!$post) {
            return response()->json(['error' => 'Post Not found'], 404);
        }
        $json = json_decode($post->json);
        if ($request->file('file_pdf')) {
            $validator = Validator::make($request->all(), [
                'file_pdf' => 'required|mimes:pdf|max:512',
            ]);
    
            if ($validator->fails()) {
                return response()->json($validator->messages(), 400);
            }
            // Proses file pdf
            $fileName = Str::slug($request['title']) . '.' . $request->file('file_pdf')->extension();
            $saveFile = $request->file('file_pdf')
                ->storeAs('pdf', $fileName, ['disk' => 'public']);
            $json->file_pdf = Storage::url($saveFile);
        }
        try {
            Post::where('id', $post->id)
                ->update([
                    'title' => $request['title'],
                    'subtitle' => $request['subtitle'],
                    'description' => $request['description'],
                    'category_id' => $request['category_id'],
                    'json' => json_encode($json),
                ]);
            $note = Notes::create([
                'post_id' => $post->id,
                'user_id' => auth()->user()->id,
                'action' => "Update",
                'description' => $request['description_note']
            ]);
            return response()->json([
                'message' => 'Update Post successfully',
                'note' => $note
            ], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 400);
        }
    }

    public function destroy($uuid)
    {
        if (!auth()->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $post = Post::where('uuid', $uuid)->first();
        if (!$post) {
            return response()->json(['error' => 'Post Not found'], 404);
        }
        try {
            Post::where('id', $post->id)
                ->update([
                    'is_delete' => true,
                ]);
            $note = Notes::create([
                'post_id' => $post->id,
                'user_id' => auth()->user()->id,
                'action' => "Delete",
                'description' => 'Delete Post ' . $uuid . ' by ' . auth()->user()->name
            ]);
            return response()->json([
                'message' => 'Post Successfully Deleted',
                'note' => $note
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 400);
        }
    }
}
