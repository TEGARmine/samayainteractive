<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BarangController;
use App\Http\Controllers\API\SupplyController;
use App\Http\Controllers\API\TransactionController;
use App\Http\Controllers\API\TransactionStatsController;

Route::controller(SupplyController::class)->group(function () {
    Route::get('/suppliers', 'index');
    Route::get('/suppliers/{id}', 'show');
    Route::post('/suppliers', 'store');
    Route::put('/suppliers/{id}', 'update');
    Route::delete('/suppliers/{id}', 'destroy');
});

Route::controller(BarangController::class)->group(function () {
    Route::get('/barangs', 'index');
    Route::get('/barangs/{id}', 'show');
    Route::post('/barangs', 'store');
    Route::put('/barangs/{id}', 'update');
    Route::delete('/barangs/{id}', 'destroy');
});

Route::controller(TransactionController::class)->group(function () {
    Route::get('/transaksi', 'index');
    Route::get('/transaksi/{id}', 'show');
    Route::post('/transaksi', 'store');
    Route::put('/transaksi/{id}', 'update');
    Route::delete('/transaksi/{id}', 'destroy');
});


// Statistic with redis
Route::controller(TransactionStatsController::class)->group(function () {
    Route::post('/transaction-stats/create', 'addTransactionStats');
    Route::get('/transaction-stats', 'getTransactionStats');
    Route::post('/transaction-stats', 'updateTransactionStats'); // trouble saat pakai method put
});
