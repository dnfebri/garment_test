<?php

use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::get('/roles', [RoleController::class, 'getAll']);
Route::get('/roles/{id}', [RoleController::class, 'getById']);
Route::post('/roles', [RoleController::class, 'create']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);