import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSuppliers, deleteSupplier } from "../services/api";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center mb-10 font-semibold text-3xl">
        Management Supplier
      </h1>
      <Link to="/supplier/create">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tambah Supplier
        </button>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Supplier
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Telepon
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id_supplier}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {supplier.nama_supplier}
                </th>
                <td className="px-6 py-4">{supplier.alamat}</td>
                <td className="px-6 py-4">{supplier.telepon}</td>
                <td className="px-6 py-4">
                  <Link to={`/supplier/edit/${supplier.id_supplier}`}>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </Link>
                  <span> </span>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={async () => {
                      await deleteSupplier(supplier.id_supplier);
                      setSuppliers(await getSuppliers()); // Refresh supplier list
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Supplier;
