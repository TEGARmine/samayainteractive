import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTransaksi, getTransaksi } from "../services/api";

function Transaksi() {
  const [transaksis, setTransaksis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaksis = async () => {
      try {
        const data = await getTransaksi();
        setTransaksis(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksis();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-10 font-semibold text-3xl">
        Management Transaksi
      </h1>
      <Link to="/transaksi/create">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tambah Transaksi
        </button>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tanggal Transaksi
              </th>
              <th scope="col" className="px-6 py-3">
                Total Harga Keseluruhan
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Kuantitas
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Satuan
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transaksis.map((transaksi, transaksiIndex) => (
              <React.Fragment key={transaksi.id_transaksi}>
                {transaksi.details.map((detail, detailIndex) => (
                  <tr
                    key={detailIndex}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {detailIndex === 0 && (
                      <>
                        <td
                          style={{ verticalAlign: "top" }}
                          className="px-6 py-4"
                          rowSpan={transaksi.details.length}
                        >
                          {transaksi.tanggal}
                        </td>
                        <td
                          style={{ verticalAlign: "top" }}
                          className="px-6 py-4"
                          rowSpan={transaksi.details.length}
                        >
                          {transaksi.total_harga}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4">{detail.barang.nama_barang}</td>
                    <td className="px-6 py-4">{detail.kuantitas}</td>
                    <td className="px-6 py-4">{detail.harga_satuan}</td>
                    {detailIndex === 0 && (
                      <td
                        className="px-6 py-4"
                        rowSpan={transaksi.details.length}
                        style={{ verticalAlign: "top" }}
                      >
                        <Link to={`/transaksi/edit/${transaksi.id_transaksi}`}>
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                          </button>
                        </Link>
                        <span> </span>
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={async () => {
                            await deleteTransaksi(transaksi.id_transaksi);
                            setTransaksis(await getTransaksi());
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaksi;
