<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/post', [PostController::class, 'getAll']);
Route::get('/post/{uuid}', [PostController::class, 'getById']);
Route::post('/post', [PostController::class, 'create']);
Route::post('/post/{uuid}', [PostController::class, 'update']);
Route::delete('/post/{uuid}', [PostController::class, 'destroy']);