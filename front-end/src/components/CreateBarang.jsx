import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBarang, getSuppliers } from "../services/api";

function CreateBarang() {
  const [supplier, setSupplier] = useState({
    supplier_id: "",
    nama_barang: "",
    kategori: "",
    harga: "",
    stok: "",
  });
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBarang({ ...supplier, supplier_id: selectedSupplier });
      navigate("/barang");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create barang");
    }
  };

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-10 font-semibold text-3xl">
        Create Barang
      </h1>
      {error && <div className="error text-center text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Supplier
          </label>
          <select
            value={selectedSupplier}
            id="countries"
            name="supplier_id"
            onChange={handleSupplierChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Supplier</option>
            {suppliers.map((supplier) => (
              <option value={supplier.id_supplier} key={supplier.id_supplier}>
                {supplier.nama_supplier}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="nama"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Barang
          </label>
          <input
            type="text"
            id="nama"
            name="nama_barang"
            value={supplier.nama_barang}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="kategori"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={supplier.kategori}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="Kategori A">Kategori A</option>
            <option value="Kategori B">Kategori B</option>
            <option value="Kategori C">Kategori C</option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="harga"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Harga
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={supplier.harga}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="800000"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="stok"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stok
          </label>
          <input
            type="number"
            id="stok"
            name="stok"
            value={supplier.stok}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="10"
            required
          />
        </div>
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

export default CreateBarang;
