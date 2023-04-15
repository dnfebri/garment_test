<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

include __DIR__.'/api/auth.php';
include __DIR__.'/api/user.php';
include __DIR__.'/api/role.php';
include __DIR__.'/api/category.php';

Route::get("init", function ()
{
    return [
        'data' => "oke",
        'links' => [
            'self' => 'link-value',
        ],
    ];
});