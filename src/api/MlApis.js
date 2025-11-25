import axios from "axios";

/**
 * Detect disease in a plant image
 * @param {File} plantImage - The image file selected by the user
 * @param {string} token - JWT token of logged-in user
 * @returns {Promise<Object>} - Prediction result from backend
 */
export const detectDisease = async (plantImage, token) => {
  try {
    const formData = new FormData();
    formData.append("plantImage", plantImage);

    const res = await axios.post(
      "https://plantify-backend.onrender.com/api/v1/ml/detect-disease",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // send JWT token
        },
      }
    );

    return res.data; // Full backend response
  } catch (error) {
    console.error("Error detecting disease:", error.response || error.message);
    throw error;
  }
};
