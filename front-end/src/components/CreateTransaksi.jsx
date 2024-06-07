import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaksi, getBarang } from "../services/api";

function CreateTransaksi() {
  const [transaksi, setTransaksi] = useState({
    tanggal: "",
    details: [],
  });
  const [barangs, setBarangs] = useState([]);
  const [hargaSatuanBarang, setHargaSatuanBarang] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...transaksi.details];
    updatedDetails[index][name] = value;

    if (name === "product_id") {
      updatedDetails[index]["harga_satuan"] = hargaSatuanBarang[value] || "";
    }

    setTransaksi((prevTransaksi) => ({
      ...prevTransaksi,
      details: updatedDetails,
    }));
  };

  const handleAddDetail = () => {
    setTransaksi((prevTransaksi) => ({
      ...prevTransaksi,
      details: [
        ...prevTransaksi.details,
        { product_id: "", kuantitas: "", harga_satuan: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaksi(transaksi);
      navigate("/transaksi");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create transaksi");
    }
  };

  useEffect(() => {
    const fetchBarangs = async () => {
      try {
        const data = await getBarang();
        setBarangs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBarangs();
  }, []);

  useEffect(() => {
    const fetchHargaSatuan = async () => {
      try {
        const hargaSatuan = {};
        for (const barang of barangs) {
          hargaSatuan[barang.id_barang] = barang.harga;
        }
        setHargaSatuanBarang(hargaSatuan);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHargaSatuan();
  }, [barangs]);

  return (
    <div>
      <h1 className="text-center mb-10 font-semibold text-3xl">
        Create Transaksi
      </h1>
      {error && <div className="error text-center text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="tanggal"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal
          </label>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            value={transaksi.tanggal}
            onChange={(e) =>
              setTransaksi({ ...transaksi, tanggal: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {transaksi.details.map((detail, index) => (
          <div key={index} className="mb-5">
            <label
              htmlFor={`product_id_${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product {index + 1}
            </label>
            <select
              id={`product_id_${index}`}
              name="product_id"
              value={detail.product_id}
              onChange={(e) => handleChange(e, index)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Pilih Barang</option>
              {barangs.map((barang) => (
                <option value={barang.id_barang} key={barang.id_barang}>
                  {barang.nama_barang}
                </option>
              ))}
            </select>
            <label
              htmlFor={`kuantitas_${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kuantitas {index + 1}
            </label>
            <input
              type="number"
              id={`kuantitas_${index}`}
              name="kuantitas"
              value={detail.kuantitas}
              onChange={(e) => handleChange(e, index)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <label
              htmlFor={`harga_satuan_${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Harga Satuan {index + 1}
            </label>
            <input
              type="number"
              id={`harga_satuan_${index}`}
              name="harga_satuan"
              value={detail.harga_satuan}
              disabled={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDetail}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Product
        </button>
        <span className="px-2"></span>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTransaksi;
