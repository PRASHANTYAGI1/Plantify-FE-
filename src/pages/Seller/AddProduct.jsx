import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createProduct } from "../../api/Productapi";

const AddProductMerged = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const defaultHero = "hero1.png";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    images.forEach((img) => formData.append("images", img));

    // CALL API
    const { data } = await createProduct(formData); // Axios returns `data` directly

    setToast({
      open: true,
      message: data.message || "Product created successfully!",
      severity: "success",
    });

    // Clear form
    setForm({ name: "", category: "", price: "", stock: "", description: "" });
    setImages([]);
    setPreview([]);
  } catch (error) {
    setToast({
      open: true,
      message: error.response?.data?.message || error.message || "Failed to create product.",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};



  const handleCloseToast = () => setToast({ ...toast, open: false });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{ maxWidth: 1400, margin: "0 auto", px: { xs: 2, md: 4 } }}
      >
       {/* Left Column - Hero Image */}
<Grid
  item
  xs={12}
  md={6}
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // vertically center
  }}
>
  <motion.img
    src="/image (1).png"
    alt="Hero"
    style={{
      width: "80%",
      maxWidth: 400,
      borderRadius: 20,
      objectFit: "cover",
      display: "block",
      margin: "0 auto",
    }}
    animate={{
      y: [0, -20, 0, 20, 0], // move up and down
      scale: [1, 1.05, 1, 1.05, 1], // 3D-like scale effect
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</Grid>


        {/* Right Column - Form */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 550, mx: "auto" }}>
            <Typography
              variant="h3"
              sx={{ mb: 1, fontWeight: 700, color: "#111" }}
            >
              Add Your Product 🌿
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Share your fresh, organic, and sustainable products with the
              world.
            </Typography>

            <Stack direction="row" spacing={1.2} mb={3} flexWrap="wrap">
              {["Fresh", "Organic", "Eco-Friendly", "Locally Sourced"].map(
                (tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    sx={{
                      borderRadius: "20px",
                      fontWeight: 500,
                      color: "#2e7d32",
                      borderColor: "#2e7d32",
                      fontSize: "0.85rem",
                    }}
                  />
                )
              )}
            </Stack>

            <Paper
              elevation={6}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.95)",
                maxHeight: "70vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              {isSubmitting && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>

                  {/* Category Dropdown */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        displayEmpty
                        sx={{
                          "& .MuiSelect-select": {
                            color: form.category
                              ? "inherit"
                              : "rgba(0,0,0,0.4)", // light color for placeholder
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Category
                        </MenuItem>
                        {[
                          "fertilizer",
                          "seed",
                          "plant",
                          "tool",
                          "accessory",
                        ].map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Stock"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{
                        py: 1.2,
                        textTransform: "none",
                        borderRadius: "12px",
                        borderColor: "#2e7d32",
                        color: "#2e7d32",
                        "&:hover": { background: "#2e7d32", color: "#fff" },
                      }}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Images
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {preview.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt="preview"
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                          }}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      fullWidth
                      sx={{
                        py: 1.4,
                        borderRadius: "12px",
                        background: "#2e7d32",
                        "&:hover": { background: "#1b5e20" },
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductMerged;
