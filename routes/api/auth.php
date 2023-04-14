<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware('api')->prefix('auth')->group(function () {
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::post('/me', [AuthController::class, 'me']);
});