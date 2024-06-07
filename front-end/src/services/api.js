import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSuppliers = async () => {
  try {
    const response = await api.get("/suppliers");
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};

export const getSupplierById = async (id) => {
  try {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching supplier:", error);
    throw error;
  }
};

export const createSupplier = async (supplier) => {
  try {
    const response = await api.post("/suppliers", supplier);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
};

export const updateSupplier = async (id, supplier) => {
  try {
    const response = await api.put(`/suppliers/${id}`, supplier);
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    await api.delete(`/suppliers/${id}`);
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
};

export const getBarang = async () => {
  try {
    const response = await api.get("/barangs");
    return response.data;
  } catch (error) {
    console.error("Error fetching barangs:", error);
    throw error;
  }
};

export const getBarangById = async (id) => {
  try {
    const response = await api.get(`/barangs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching barang:", error);
    throw error;
  }
};

export const createBarang = async (barang) => {
  try {
    const response = await api.post("/barangs", barang);
    return response.data;
  } catch (error) {
    console.error("Error creating barang:", error);
    throw error;
  }
};

export const updateBarang = async (id, barang) => {
  try {
    const response = await api.put(`/barangs/${id}`, barang);
    return response.data;
  } catch (error) {
    console.error("Error updating barang:", error);
    throw error;
  }
};

export const deleteBarang = async (id) => {
  try {
    await api.delete(`/barangs/${id}`);
  } catch (error) {
    console.error("Error deleting barangs:", error);
    throw error;
  }
};

export const getTransaksi = async () => {
  try {
    const response = await api.get("/transaksi");
    return response.data;
  } catch (error) {
    console.error("Error fetching transaksis:", error);
    throw error;
  }
};

export const getTransaksiById = async (id) => {
  try {
    const response = await api.get(`/transaksi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaksi:", error);
    throw error;
  }
};

export const createTransaksi = async (transaksi) => {
  try {
    const response = await api.post("/transaksi", transaksi);
    return response.data;
  } catch (error) {
    console.error("Error creating transaksi:", error);
    throw error;
  }
};

export const updateTransaksi = async (id, transaksi) => {
  try {
    const response = await api.put(`/transaksi/${id}`, transaksi);
    return response.data;
  } catch (error) {
    console.error("Error updating transaksi:", error);
    throw error;
  }
};

export const deleteTransaksi = async (id) => {
  try {
    const response = await api.delete(`/transaksi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaksi:", error);
    throw error;
  }
};

export default api;
