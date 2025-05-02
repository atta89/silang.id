<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [App\Http\Controllers\AuthController::class, 'me'])->middleware('auth:sanctum');
});

Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum']], function () {
    Route::get('/', [App\Http\Controllers\UserController::class, 'index']);
    Route::get('/{user}', [App\Http\Controllers\UserController::class, 'show']);
    Route::post('/', [App\Http\Controllers\UserController::class, 'store']);
    Route::put('/{user}', [App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/{user}', [App\Http\Controllers\UserController::class, 'destroy']);
});
