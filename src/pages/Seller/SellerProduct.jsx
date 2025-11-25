import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  getProductsForSeller,
  deleteProduct,
  updateProduct,
} from "../../api/Productapi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProductsForSeller();
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        setError("No products found for this seller.");
      }
    } catch (err) {
      console.error("Error fetching seller products:", err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧨 Confirmation Toast before Delete
  const handleDeleteConfirmation = (productId) => {
    toast.warn(
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Are you sure you want to delete this product?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(productId)}
          >
            Yes, Delete
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
        </Box>
      </Box>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      await deleteProduct(id);
      const updatedProducts = products.filter((p) => p._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      toast.success("✅ Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("❌ Failed to delete product.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const handleOpenModal = (product) => {
    setCurrentProduct(product);
    setUpdatedData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      images: null,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        if (key === "images" && updatedData.images) {
          for (let i = 0; i < updatedData.images.length; i++) {
            formData.append("images", updatedData.images[i]);
          }
        } else {
          formData.append(key, updatedData[key]);
        }
      });

      const { data } = await updateProduct(currentProduct._id, formData);
      if (data.success) {
        const updatedProducts = products.map((p) =>
          p._id === currentProduct._id ? data.product : p
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        toast.success("✅ Product updated successfully!");
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("❌ Failed to update product.");
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "100px auto" }} />;
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 5 },
        mt: 10,
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        overflowX: "hidden", // ✅ No horizontal scrolling
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
          mb: { xs: 2, md: 4 },
        }}
      >
        🌿 My Products
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          maxWidth: 450,
          margin: "0 auto 30px auto",
          textAlign: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or category..."
          value={search}
          onChange={handleSearch}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      {/* Responsive Grid */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: "100%", margin: 0 }}
      >
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                height: 430,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 8px 18px rgba(0,0,0,0.2)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  overflow: "hidden",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    minWidth: 300,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Product Info */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#34495e",
                    mb: 1,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#27ae60",
                    mt: 1,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  ₹ {product.price}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={product.stock > 0 ? "green" : "red"}
                  sx={{ fontWeight: "500", mt: 0.5 }}
                >
                  Stock: {product.stock}
                </Typography>

                {/* Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(product)}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: 2,
                      px: 2,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteConfirmation(product._id)}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: 2,
                      px: 2,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {filteredProducts.length === 0 && (
          <Typography
            variant="h6"
            align="center"
            sx={{ width: "100%", mt: 4, color: "#555" }}
          >
            No products match your search.
          </Typography>
        )}
      </Grid>

      {/* Update Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            color: "#fff",
          }}
        >
          Update Product
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={updatedData.name}
            onChange={handleUpdateChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={updatedData.description}
            onChange={handleUpdateChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={updatedData.category}
            onChange={handleUpdateChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={updatedData.price}
            onChange={handleUpdateChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock"
            name="stock"
            type="number"
            value={updatedData.stock}
            onChange={handleUpdateChange}
            fullWidth
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setUpdatedData({ ...updatedData, images: e.target.files })
            }
            style={{ marginTop: "15px", display: "block", width: "100%" }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SellerProducts;
