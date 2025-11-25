// src/pages/CartPage.jsx
import { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  getCartApi,
  removeFromCartApi,
  updateCartItemQuantityApi,
} from "../../api/cartapi";
import { AuthContext } from "../../context/AuthContext";

const CartPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user && !localStorage.getItem("token")) return;

    try {
      setLoading(true);
      const data = await getCartApi();

      // ✅ Your API returns cart.items
      if (data?.cart?.items?.length > 0) {
        setCartItems(data.cart.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchCart();
  }, [authLoading, user]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCartApi(productId);
      toast.success("Item removed from cart");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return toast.warning("Quantity cannot be less than 1");

    try {
      await updateCartItemQuantityApi(productId, quantity);
      toast.success("Quantity updated");
      fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  if (authLoading)
    return (
      <Typography className="text-center mt-20 text-gray-500">
        Checking user session...
      </Typography>
    );

  return (
    <section className="py-16 bg-white md:mt-18 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <Typography variant="h4" fontWeight="bold" className="mb-6">
          🛒 Your Cart
        </Typography>

        {loading ? (
          <Typography>Loading cart...</Typography>
        ) : cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <Card
                key={item.productId._id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.images?.[0]}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <Typography variant="h6">
                      {item.productId.name}
                    </Typography>
                    <Typography color="textSecondary">
                      ₹{item.productId.price}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId._id,
                        Number(e.target.value)
                      )
                    }
                    inputProps={{ min: 1 }}
                    size="small"
                    className="w-20"
                  />
                  <IconButton
                    onClick={() => handleRemove(item.productId._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </div>
              </Card>
            ))}

            {/* Total */}
            <Card className="p-4 mt-4 flex justify-between items-center bg-gray-50">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" fontWeight="bold">
                ₹{totalPrice.toFixed(2)}
              </Typography>
            </Card>

            <Button
              variant="contained"
              color="success"
              className="mt-4"
              onClick={() => toast.info("Checkout coming soon!")}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
