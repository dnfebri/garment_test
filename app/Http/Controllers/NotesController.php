<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    
    public function getAll()
    {
        $notes = Notes::all();
        return response()->json([
            'message' => 'Data Notes All',
            'data' => $notes
        ], 200);
    }

    public function getById($id)
    {
        # code...
    }

    public function create(Request $request)
    {
        # code...
    }

    public function update(Request $request, $id)
    {
        # code...
    }

    public function destroy(Request $request, $id)
    {
        # code...
    }
}
