import { useState } from "react";
import { registerUser } from "../api/userapi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#E8E8E8",
      }}
    >
      {/* -------- Left: Form Section -------- */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9f9f9",
          p: 4,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            maxWidth: 430,
            borderRadius: 5,
            p: 5,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 12px 32px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                "0 16px 40px rgba(0,0,0,0.1), 0 6px 18px rgba(0,0,0,0.06)",
            },
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="700"
            color="#355E3B"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: 0.5,
              mb: 1,
            }}
          >
            Plantify
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            mb={4}
            sx={{
              fontSize: "0.95rem",
              letterSpacing: 0.4,
            }}
          >
            Grow your green journey 🌿 — Create your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#f9faf9",
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              label="Email Address"
              name="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#f9faf9",
                  borderRadius: "12px",
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "gray" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#f9faf9",
                  borderRadius: "12px",
                },
              }}
            />

            {/* Role + Button Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                select
                name="role"
                label="Role"
                value={form.role}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "#f9faf9",
                  },
                }}
              >
                <MenuItem value="Buyer">Buyer</MenuItem>
                <MenuItem value="Seller">Seller</MenuItem>
              </TextField>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  flex: 1,
                  py: 1.4,
                  borderRadius: "12px",
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "1rem",
                  background:
                    "linear-gradient(120deg, #bdeacb 0%, #9fe3b7 100%)",
                  color: "#0f3e29",
                  boxShadow: "0 6px 16px rgba(100,150,120,0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(120deg, #a8e6b5 0%, #8fdba2 100%)",
                    boxShadow: "0 8px 20px rgba(90,160,110,0.25)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </form>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={3}
          >
            Already have an account?{" "}
            <Button
              variant="text"
              color="success"
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#355e46",
                "&:hover": { color: "#264a36" },
              }}
            >
              Log In
            </Button>
          </Typography>
        </Paper>
      </Box>

      {/* -------- Right: Image + Quote Section -------- */}
      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1651668198424-111a35558014?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.25)",
            borderRadius: 4,
            p: 4,
            textAlign: "center",
            maxWidth: 420,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#064e3b"
            mb={1.5}
            sx={{ fontFamily: "'Playfair Display', serif" }}
          >
            “A new leaf turns when you decide to grow.”
          </Typography>
          <Typography
            variant="body2"
            color="#064e3b"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            Join Plantify — where every seed planted starts a beautiful story 🍃
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
