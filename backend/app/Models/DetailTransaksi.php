<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_detail';
    protected $fillable = [
        'id_detail',
        'transaction_id',
        'product_id',
        'kuantitas',
        'harga_satuan'
    ];

    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class, 'transaction_id', 'id_transaksi');
    }

    public function barang()
    {
        return $this->belongsTo(Barang::class, 'product_id', 'id_barang');
    }
}
