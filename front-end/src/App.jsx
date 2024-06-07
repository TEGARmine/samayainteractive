import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Supplier from "./components/Supplier";
import CreateSupplier from "./components/CreateSupplier";
import EditSupplier from "./components/EditSupplier";
import CreateBarang from "./components/CreateBarang";
import EditBarang from "./components/EditBarang";
import Barang from "./components/Barang";
import Transaksi from "./components/Transaksi";
import CreateTransaksi from "./components/CreateTransaksi";
import EditTransaksi from "./components/EditTransaksi";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="content ml-60 mr-10 min-h-screen py-10">
        <Routes>
          <Route path="/" element={<Navigate to="/supplier" />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/create" element={<CreateSupplier />} />
          <Route path="/supplier/edit/:id" element={<EditSupplier />} />

          <Route path="/barang" element={<Barang />} />
          <Route path="/barang/create" element={<CreateBarang />} />
          <Route path="/barang/edit/:id" element={<EditBarang />} />

          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/transaksi/create" element={<CreateTransaksi />} />
          <Route path="/transaksi/edit/:id" element={<EditTransaksi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
