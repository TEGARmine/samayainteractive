<?php

namespace App\Http\Controllers\API;

use App\Models\Barang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class BarangController extends Controller
{
    public function index()
    {
        try {
            $barangs = Barang::with('Supplier')->get();
            return response()->json($barangs);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menampilkan data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $barang = Barang::find($id);

            if (!$barang) {
                return response()->json(['message' => 'Barang tidak ditemukan'], 404);
            }

            return response()->json($barang);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menampilkan data: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'supplier_id' => 'required|exists:suppliers,id_supplier',
                'nama_barang' => 'required|string|max:255',
                'kategori' => 'required|string|max:255',
                'harga' => 'required|numeric',
                'stok' => 'required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $barang = Barang::create($request->all());

            return response()->json($barang, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal membuat data: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $barang = Barang::find($id);

            if (!$barang) {
                return response()->json(['message' => 'Barang tidak ditemukan'], 404);
            }

            $validator = Validator::make($request->all(), [
                'supplier_id' => 'sometimes|required|exists:suppliers,id_supplier',
                'nama_barang' => 'sometimes|required|string|max:255',
                'kategori' => 'sometimes|required|string|max:255',
                'harga' => 'sometimes|required|numeric',
                'stok' => 'sometimes|required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $barang->update($request->all());

            return response()->json($barang);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal memperbarui data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $barang = Barang::find($id);

            if (!$barang) {
                return response()->json(['message' => 'Barang tidak ditemukan'], 404);
            }

            $barang->delete();

            return response()->json(['message' => 'Barang deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus data: ' . $e->getMessage()], 500);
        }
    }
}
