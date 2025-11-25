import React, { useState } from "react";
import { placeOrder as placeOrderAPI } from "./../api/OrderApis";

const BuyNowModal = ({ product, onClose, user }) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Please enter a shipping address");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: [{ productId: product._id, quantity: 1 }],
        shippingAddress,
        paymentMethod,
        totalAmount: product.price,
      };

      const res = await placeOrderAPI(orderData);
      alert(res.data.message || "Order placed successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 font-semibold mb-4">₹{product.price}</p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Shipping Address</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="3"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Payment Method</label>
          <select
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition-colors"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default BuyNowModal;
