// src/api/cartApi.js
import axios from "axios";

const BASE_URL = "https://plantify-backend.onrender.com/api/v1/cart";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Automatically attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ------------------------- 🛒 Cart API Functions ------------------------- */

// 1️⃣ Add product to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await axiosInstance.post("/add", { productId, quantity });
  return res.data;
};

// 2️⃣ Get user's cart
export const getCartApi = async () => {
  const res = await axiosInstance.get("/");
  return res.data;
};

// 3️⃣ Remove product from cart
export const removeFromCartApi = async (productId) => {
  const res = await axiosInstance.delete(`/remove/${productId}`);
  return res.data;
};

// 4️⃣ Update item quantity
export const updateCartItemQuantityApi = async (productId, quantity) => {
  const res = await axiosInstance.put(`/update/${productId}`, { quantity });
  return res.data;
};
