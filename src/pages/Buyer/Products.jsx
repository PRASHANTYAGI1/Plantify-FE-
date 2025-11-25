import React, { useEffect, useState, useContext } from "react";
import { getAllProducts } from "../../api/ProductApi";
import { addToCart as addToCartAPI } from "../../api/cartApi";
import { getBuyerOrders, deleteOrderByBuyer } from "../../api/OrderApis";
import { AuthContext } from "../../context/AuthContext";
import BuyNowModal from "../../component/Buyer/BuyNowModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data.products || []);
      } catch (err) {
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await getBuyerOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.info("Please login first!");
      return;
    }
    try {
      await addToCartAPI(productId, 1); // Pass productId and quantity separately
      toast.success("Product added to cart!");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add product to cart"
      );
    }
  };

  const handleCancelOrder = async (productId) => {
    const order = orders.find((o) =>
      o.items.some(
        (i) =>
          i.productId?._id?.toString() === productId ||
          i.productId?.toString() === productId
      )
    );
    if (!order) return;
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await deleteOrderByBuyer(order._id);
      toast.success("Order cancelled successfully!");
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const isProductOrdered = (productId) =>
    orders.some((order) =>
      order.items.some(
        (item) =>
          item.productId?._id?.toString() === productId ||
          item.productId?.toString() === productId
      )
    );

  if (loading)
    return (
      <p className="text-center mt-12 text-gray-600 text-lg">
        Loading products...
      </p>
    );

  return (
    <div className="px-4 md:px-16 pt-18 md:pt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
        Explore Our Products
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover high-quality products hand-picked for you. Add to cart or buy
        directly. Manage your orders seamlessly with one click cancellation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const ordered = isProductOrdered(product._id);
          return (
            <div
              key={product._id}
              className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-48 w-full object-contain p-4 bg-gray-50"
              />
              <div className="px-5 pb-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm flex-1">
                  {product.description}
                </p>
                <p className="text-green-700 font-semibold mt-2 text-lg">
                  ₹{product.price}
                </p>
                <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                <p className="text-gray-500 text-sm">
                  Seller: {product.sellerId ? product.sellerId.name : "Admin"}
                </p>
                <p className="text-yellow-600 text-sm">
                  Rating: {product.averageRating || 0} ⭐
                </p>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.stock === 0}
                    className={`flex-1 font-semibold py-2 rounded-lg transition-all duration-200 ${
                      product.stock === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-green-100 hover:bg-green-200 text-green-800"
                    }`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>

                  {ordered ? (
                    <button
                      onClick={() => handleCancelOrder(product._id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-all duration-200"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-2 rounded-lg transition-all duration-200"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          user={user}
        />
      )}

      {/* Ending Section */}
      <section className="mt-16 bg-gray-50 rounded-xl p-8 text-center shadow-inner">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to Shop?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join thousands of happy buyers and enjoy seamless shopping experience.
          Add to cart or buy directly and track your orders with ease.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Explore Products
        </button>
      </section>
    </div>
  );
};

export default ProductsPage;
