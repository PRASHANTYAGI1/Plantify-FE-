import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/users";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Automatically add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => axiosInstance.post("/register", data);
export const loginUser = (data) => axiosInstance.post("/login", data);
export const logoutUser = () => axiosInstance.post("/logout");

// User profile
export const getUserProfile = () => axiosInstance.get("/profile")

// Update profile details
export const updateUserProfile = (data) => axiosInstance.put("/profile", data);

// Update profile image
export const uploadProfileImage = (formData) =>
  axiosInstance.put("/profile/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
