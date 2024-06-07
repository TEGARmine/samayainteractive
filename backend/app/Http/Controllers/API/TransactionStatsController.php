<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

class TransactionStatsController extends Controller
{
    public function addTransactionStats(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total_transaksi' => 'required|integer',
            'nilai_transaksi' => 'required|numeric',
            'status_transaksi' => 'required|string|in:success,failed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        Redis::incrby('total_transaksi', (int) $validated['total_transaksi']);
        Redis::incrbyfloat('total_nilai_transaksi', (float) $validated['nilai_transaksi']);

        Redis::hincrby('transaksi_per_status', $validated['status_transaksi'], (int) $validated['total_transaksi']);

        return response()->json([
            'message' => 'Statistik transaksi berhasil ditambahkan',
        ], 201);
    }

    public function getTransactionStats()
    {
        $totalTransaksi = Redis::get('total_transaksi');
        $totalNilaiTransaksi = Redis::get('total_nilai_transaksi');
        $transaksiPerStatus = Redis::hgetall('transaksi_per_status');

        return response()->json([
            'total_transaksi' => $totalTransaksi,
            'total_nilai_transaksi' => $totalNilaiTransaksi,
            'transaksi_per_status' => $transaksiPerStatus,
        ]);
    }

    public function updateTransactionStats(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total_transaksi' => 'integer',
            'nilai_transaksi' => 'numeric',
            'status_transaksi' => 'string|in:success,failed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $totalTransaksi = Redis::get('total_transaksi');
        $totalNilaiTransaksi = Redis::get('total_nilai_transaksi');

        if (isset($validated['total_transaksi'])) {
            // Hitung selisih transaksi baru dengan transaksi lama
            $selisihTransaksi = (int) $validated['total_transaksi'] - $totalTransaksi;

            // Update nilai total transaksi
            Redis::incrby('total_transaksi', $selisihTransaksi);
        }

        if (isset($validated['nilai_transaksi'])) {
            // Hitung selisih nilai transaksi baru dengan nilai transaksi lama
            $selisihNilaiTransaksi = (float) $validated['nilai_transaksi'] - $totalNilaiTransaksi;

            // Update nilai total nilai transaksi
            Redis::incrbyfloat('total_nilai_transaksi', $selisihNilaiTransaksi);
        }

        if (isset($validated['status_transaksi'])) {
            // Increment atau decrement transaksi per status berdasarkan perubahan status
            if ($validated['status_transaksi'] === 'success') {
                Redis::hincrby('transaksi_per_status', 'success', $selisihTransaksi ?? 0);
                Redis::hincrby('transaksi_per_status', 'failed', 0);
            } elseif ($validated['status_transaksi'] === 'failed') {
                Redis::hincrby('transaksi_per_status', 'failed', $selisihTransaksi ?? 0);
                Redis::hincrby('transaksi_per_status', 'success', 0);
            }
        }

        return response()->json([
            'message' => 'Statistik transaksi berhasil diperbarui',
        ], 200);
    }
}
