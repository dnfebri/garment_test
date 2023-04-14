<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Route::middleware('api')->group(function () {
// });
Route::get('/users', [UserController::class, 'getAll']);
Route::get('/users/{key}', [UserController::class, 'getById']);
Route::post('/users', [UserController::class, 'create']);
Route::put('/users/{id}', [UserController::class, 'update']);