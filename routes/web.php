<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Auth::routes();
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::view('/{path?}', 'index')->where('path', '.*');
