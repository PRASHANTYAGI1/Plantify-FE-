import axios from "axios";

// ✅ Base URL for order-related endpoints
const BASE_URL = "https://plantify-backend.onrender.com/api/v1/orders";

// ✅ Create Axios instance for orders
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Automatically attach token for authenticated routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -----------------------------------------------------
 📦 ORDER API — connects frontend with backend routes
------------------------------------------------------ */

// 1️⃣ Place a new order (buyer only)
export const placeOrder = (orderData) => axiosInstance.post("/", orderData);

// 2️⃣ Get all orders for the logged-in buyer
export const getBuyerOrders = () => axiosInstance.get("/my-orders");

// 3️⃣ Get orders for logged-in seller (their sold items)
export const getSellerOrders = () => axiosInstance.get("/seller-orders");

// 4️⃣ Update item status for seller (e.g., Shipped / Delivered)
export const updateOrderItemStatus = (orderId, itemId, status) =>
  axiosInstance.put(`/${orderId}/item/${itemId}/status`, { status });

// 5️⃣ Get a single order by ID (buyer or seller)
export const getOrderById = (orderId) => axiosInstance.get(`/${orderId}`);

// 6️⃣ Admin: Get all orders
export const getAllOrdersAdmin = () => axiosInstance.get("/admin/all");

// 7️⃣ Delete an order by ID (buyer only)
export const deleteOrderByBuyer = (orderId) => axiosInstance.delete(`/remove/${orderId}`);
