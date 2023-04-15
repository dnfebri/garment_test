<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('/category', [CategoryController::class, 'getAll']);
Route::get('/category/{id}', [CategoryController::class, 'getById']);
Route::post('/category', [CategoryController::class, 'create']);
Route::put('/category/{id}', [CategoryController::class, 'update']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);