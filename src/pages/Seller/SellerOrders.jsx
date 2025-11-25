// src/pages/Seller/SellerOrders.jsx
import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { getSellerOrders } from "../../api/OrderApis";
import { toast } from "react-toastify";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const res = await getSellerOrders();
      if (res.data?.success) {
        setOrders(res.data.orders || []);
      } else {
        setOrders([]);
        toast.info("No orders found for this seller.");
      }
    } catch (err) {
      console.error("Error fetching seller orders:", err);
      toast.error("Failed to fetch seller orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "100px auto" }} />;

  if (orders.length === 0)
    return (
      <Typography variant="h5" align="center" sx={{ mt: 15 }}>
        🚫 No orders yet — you’ll see them here once buyers purchase your products.
      </Typography>
    );

  return (
    <Box className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 5, fontWeight: "bold", color: "#2e7d32" }}
      >
        📦 Seller Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order._id}>
            <Card
              className="shadow-md hover:shadow-xl transition-all duration-300"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "white",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  🧾 Order ID: {order._id}
                </Typography>

                {/* Buyer Info */}
                <Typography variant="body2" color="textSecondary">
                  👤 Buyer: <b>{order.userId?.name}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📧 {order.userId?.email}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                {/* Items */}
                <Typography variant="subtitle1" fontWeight="bold">
                  🛍 Products:
                </Typography>
                {order.items?.map((item, i) => (
                  <Box
                    key={i}
                    className="flex gap-3 mt-2 p-2 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <img
                      src={item.productId?.images?.[0]}
                      alt={item.productId?.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {item.productId?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ₹{item.priceAtTime} each
                      </Typography>
                      <Chip
                        size="small"
                        label={item.itemStatus?.toUpperCase() || "PENDING"}
                        color={
                          item.itemStatus === "delivered"
                            ? "success"
                            : item.itemStatus === "cancelled"
                            ? "error"
                            : "warning"
                        }
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                {/* Order Summary */}
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🏠 <b>Address:</b> {order.shippingAddress}
                </Typography>
                <Typography variant="body2">
                  💳 <b>Payment:</b> {order.paymentMethod} (
                  {order.paymentStatus})
                </Typography>
                <Typography variant="body2">
                  📦 <b>Status:</b> {order.orderStatus}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ mt: 1, color: "#2e7d32" }}
                >
                  💰 Total: ₹{order.totalAmount}
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 1, color: "gray" }}
                >
                  📅 Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SellerOrders;
