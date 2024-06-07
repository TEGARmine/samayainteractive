<?php

namespace App\Http\Controllers\API;

use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\DetailTransaksi;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        try {
            $transaksi = Transaksi::with('details.barang')->get();
            return response()->json($transaksi);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menampilkan data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $transaksi = Transaksi::with('details.barang')->find($id);

            if (!$transaksi) {
                return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
            }

            return response()->json($transaksi);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menampilkan data: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'tanggal' => 'required|date',
                'details' => 'required|array',
                'details.*.product_id' => 'required|exists:barangs,id_barang',
                'details.*.kuantitas' => 'required|integer|min:1',
                'details.*.harga_satuan' => 'numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $totalHarga = 0;

            foreach ($validatedData['details'] as $detail) {
                $barang = Barang::findOrFail($detail['product_id']);
                if ($detail['kuantitas'] > $barang->stok) {
                    return response()->json(['error' => 'Kuantitas tidak boleh melebihi stok barang.'], 422);
                }
                $totalHarga += $detail['kuantitas'] * $detail['harga_satuan'];
            }

            DB::beginTransaction();

            $transaksi = Transaksi::create([
                'tanggal' => $request->tanggal,
                'total_harga' => $totalHarga
            ]);

            foreach ($request->details as $detail) {
                $barang = Barang::findOrFail($detail['product_id']);

                $barang->stok -= $detail['kuantitas'];
                $barang->save();

                DetailTransaksi::create([
                    'transaction_id' => $transaksi->id_transaksi,
                    'product_id' => $detail['product_id'],
                    'kuantitas' => $detail['kuantitas'],
                    'harga_satuan' => $detail['harga_satuan'],
                ]);
            }

            DB::commit();

            return response()->json($transaksi->load('details'), 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Gagal membuat data: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $transaksi = Transaksi::with('details')->find($id);

            if (!$transaksi) {
                return response()->json(['message' => 'Transaksi not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'tanggal' => 'sometimes|required|date',
                'details' => 'sometimes|array',
                'details.*.product_id' => 'required_with:details|exists:barangs,id_barang',
                'details.*.kuantitas' => 'required_with:details|integer|min:1',
                'details.*.harga_satuan' => 'required_with:details|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();

            DB::beginTransaction();

            foreach ($transaksi->details as $detail) {
                $barang = Barang::findOrFail($detail->product_id);
                $barang->stok += $detail->kuantitas;
                $barang->save();
            }

            $totalHarga = 0;
            if ($request->has('details')) {
                foreach ($validatedData['details'] as $detail) {
                    $barang = Barang::findOrFail($detail['product_id']);
                    if ($detail['kuantitas'] > $barang->stok) {
                        DB::rollback();
                        return response()->json(['error' => 'Kuantitas tidak boleh melebihi stok barang.'], 422);
                    }
                    $totalHarga += $detail['kuantitas'] * $detail['harga_satuan'];
                }
            }

            $transaksi->update([
                'tanggal' => $request->tanggal,
                'total_harga' => $totalHarga
            ]);

            DetailTransaksi::where('transaction_id', $transaksi->id_transaksi)->delete();

            if ($request->has('details')) {
                foreach ($validatedData['details'] as $detail) {
                    $barang = Barang::findOrFail($detail['product_id']);
                    $barang->stok -= $detail['kuantitas'];
                    $barang->save();

                    DetailTransaksi::create([
                        'transaction_id' => $transaksi->id_transaksi,
                        'product_id' => $detail['product_id'],
                        'kuantitas' => $detail['kuantitas'],
                        'harga_satuan' => $detail['harga_satuan'],
                    ]);
                }
            }

            DB::commit();

            return response()->json($transaksi->load('details'));
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Gagal memperbarui data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $transaksi = Transaksi::find($id);

            if (!$transaksi) {
                return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
            }

            $transaksi->details()->delete();
            $transaksi->delete();

            return response()->json(['message' => 'Transaksi deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus data: ' . $e->getMessage()], 500);
        }
    }
}
