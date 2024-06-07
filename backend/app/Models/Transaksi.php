<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_transaksi';
    protected $fillable = [
        'id_transaksi',
        'tanggal',
        'total_harga'
    ];

    public function details()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaction_id', 'id_transaksi');
    }
}
