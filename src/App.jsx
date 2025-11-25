import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// 🏠 Public Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";

// 🛍️ Seller Pages
import AddProduct from "./pages/Seller/AddProduct";
import SellerProduct from "./pages/Seller/SellerProduct";
import SellerOrders from "./pages/Seller/SellerOrders";

// 🛒 Buyer Pages
import ProductsPage from "./pages/Buyer/Products";
import CartPage from "./pages/Buyer/Cart";
import DiseaseDetectionPage from "./pages/Buyer/DiseaseDetection";

// 🔐 Auth Context
import { AuthContext } from "./context/AuthContext";

// -----------------------------
// PrivateRoute Component
// -----------------------------
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // or a spinner

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

// -----------------------------
// App Component
// -----------------------------
function App() {
  return (
    // 👇 Flex column layout for sticky footer behavior
    <div className="flex flex-col min-h-screen">
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main content area expands when content is small */}
      <main className="flex-grow">
        <Routes>
          {/* -----------------------------
              Public Routes
          ------------------------------ */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* -----------------------------
              Seller Routes
          ------------------------------ */}
          <Route
            path="/seller/add-product"
            element={
              <PrivateRoute role="seller">
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller/my-products"
            element={
              <PrivateRoute role="seller">
                <SellerProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller/orders"
            element={
              <PrivateRoute role="seller">
                <SellerOrders />
              </PrivateRoute>
            }
          />

          {/* -----------------------------
              Buyer Routes
          ------------------------------ */}
          <Route
            path="/products"
            element={
              <PrivateRoute role="buyer">
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute role="buyer">
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/disease-detection"
            element={
              <PrivateRoute role="buyer">
                <DiseaseDetectionPage />
              </PrivateRoute>
            }
          />

          {/* -----------------------------
              Catch-all route
          ------------------------------ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default App;
