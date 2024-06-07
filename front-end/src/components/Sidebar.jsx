import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar bg-gray-800 h-screen w-52 fixed top-0 left-0">
      <ul className="mt-10">
        <li className="mb-4">
          <Link
            to="/supplier"
            className={`flex gap-4 items-center pl-5 py-1 hover:bg-slate-200 hover:text-black ${
              location.pathname === "/supplier"
                ? "bg-slate-200 text-black"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 6v10a2 2 0 002 2h10a2 2 0 002-2V12l3-6H3zm2 2l1.82 3.64M12 4v16M7 2v6M17 2v6"
              />
            </svg>
            Supplier
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/barang"
            className={`flex gap-4 items-center pl-5 py-1 hover:bg-slate-200 hover:text-black ${
              location.pathname === "/barang"
                ? "bg-slate-200 text-black"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mb-1"
              fill="none"
              viewBox="0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
            Barang
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/transaksi"
            className={`flex gap-4 items-center pl-5 py-1 hover:bg-slate-200 hover:text-black ${
              location.pathname === "/transaksi"
                ? "bg-slate-200 text-black"
                : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 6L9 17l-5-5"
              />
            </svg>
            Transaksi
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
