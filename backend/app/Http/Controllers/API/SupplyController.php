<?php

namespace App\Http\Controllers\API;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SupplyController extends Controller
{
    public function index()
    {
        try {
            $suppliers = Supplier::all();
            return response()->json($suppliers);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menampilkan data: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $supplier = Supplier::find($id);
            if (!$supplier) {
                return response()->json(['error' => 'Supplier tidak ditemukan'], 404);
            }

            return response()->json(['supplier' => $supplier], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengambil data: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'nama_supplier' => 'required|string|max:255',
                'alamat' => 'required|string',
                'telepon' => 'required|numeric|digits_between:1,15'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $supplier = Supplier::create([
                'nama_supplier' => $request->input('nama_supplier'),
                'alamat' => $request->input('alamat'),
                'telepon' => $request->input('telepon'),
            ]);

            if ($supplier) return response()->json(['supplier' => $supplier], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menyimpan data: ' . $e->getMessage()], 500);
        }
    }



    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama_supplier' => 'required|string|max:255',
                'alamat' => 'required|string',
                'telepon' => 'required|numeric|digits_between:1,15'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $supplier = Supplier::find($id);
            if (!$supplier) {
                return response()->json(['error' => 'Supplier tidak ditemukan'], 404);
            }

            $supplier->update([
                'nama_supplier' => $request->input('nama_supplier'),
                'alamat' => $request->input('alamat'),
                'telepon' => $request->input('telepon'),
            ]);

            return response()->json(['supplier' => $supplier], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal memperbarui data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $supplier = Supplier::find($id);
            if (!$supplier) {
                return response()->json(['error' => 'Supplier tidak ditemukan'], 404);
            }

            $supplier->delete();
            return response()->json(['message' => 'Supplier berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus data: ' . $e->getMessage()], 500);
        }
    }
}
