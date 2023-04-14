<?php

use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::get('/roles', [RoleController::class, 'getAll']);
Route::post('/roles', [RoleController::class, 'create']);