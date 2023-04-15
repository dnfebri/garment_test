<?php

use App\Http\Controllers\NotesController;
use Illuminate\Support\Facades\Route;

Route::get('/notes', [NotesController::class, 'getAll']);
Route::get('/notes/{id}', [NotesController::class, 'getById']);
Route::post('/notes', [NotesController::class, 'create']);
Route::put('/notes/{id}', [NotesController::class, 'update']);
Route::delete('/notes/{id}', [NotesController::class, 'destroy']);