import axios from "axios";

// ✅ Base URL for product-related endpoints
const BASE_URL = "https://plantify-backend.onrender.com/api/v1/products";

// ✅ Create Axios instance for products
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // keep cookies if used
});

// ✅ Automatically add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -----------------------------------------------------
 🛒 PRODUCT API — connects frontend with backend routes
------------------------------------------------------ */

// 1️⃣ Create a new product (seller only)
export const createProduct = (formData) =>
  axiosInstance.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Get all products (public / seller)
export const getAllProducts = () => {
  return axiosInstance.get("/"); // must return the promise
};

// ✅ Fetch products for seller (all products, token required)
export const getProductsForSeller = () => axiosInstance.get("/seller");


// 3️⃣ Get single product by ID
export const getProductById = (id) => axiosInstance.get(`/${id}`);

// 4️⃣ Update product (seller only)
export const updateProduct = (id, formData) =>
  axiosInstance.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 5️⃣ Delete product (seller only)
export const deleteProduct = (id) => axiosInstance.delete(`/${id}`);

// 6️⃣ Admin: Get all products
export const getAllProductsAdmin = () => axiosInstance.get("/admin/all");
