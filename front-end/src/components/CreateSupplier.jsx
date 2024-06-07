import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../services/api";

function CreateSupplier() {
  const [supplier, setSupplier] = useState({
    nama_supplier: "",
    alamat: "",
    telepon: "",
  });
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
      await createSupplier(supplier);
      navigate("/supplier");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create supplier");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-10 font-semibold text-3xl">
        Create Supplier
      </h1>
      {error && <div className="error text-center text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="nama"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Supplier
          </label>
          <input
            type="text"
            id="nama"
            name="nama_supplier"
            value={supplier.nama_supplier}
            onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="alamat"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Alamat
          </label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={supplier.alamat}
            onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="alamat"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="telepon"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Telepon
          </label>
          <input
            type="number"
            id="telepon"
            name="telepon"
            value={supplier.telepon}
            onChange={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="08581821412"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateSupplier;
