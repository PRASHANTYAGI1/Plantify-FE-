import { useState, useContext } from "react";
import { loginUser } from "../api/userapi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password modal states
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  const handleForgotSubmit = async () => {
    if (!email) return alert("Please enter your email");
    try {
      setLoading(true);
      const res = await axios.post(
        "https://plantify-backend.onrender.com/api/v1/users/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      const resetUrl = res.data.resetUrl;
      const tokenFromUrl = resetUrl.split("/reset-password/")[1];
      setToken(tokenFromUrl);
      setForgotOpen(false);
      setResetOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error requesting reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const { password, confirmPassword } = passwords;
    if (!password || !confirmPassword)
      return alert("Please fill out all fields");

    try {
      setLoading(true);
      await axios.put(
        `https://plantify-backend.onrender.com/api/v1/users/reset-password/${token}`,
        { password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully! You can now log in.");
      setResetOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI -----------------
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        backgroundColor: "#E1E1E1", // Slightly lighter than #E1E1E1
      }}
    >
      {/* -------- Left: Login Form -------- */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          p: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            background: "rgba(255, 255, 255, 0.97)",
            borderRadius: 4,
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
            p: { xs: 3, md: 5 },
            backdropFilter: "blur(12px)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.06)",
            },
          }}
        >
          {/* Brand Header */}
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            color="#2d6048"
            sx={{
              letterSpacing: 1,
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
           Plantify
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            mb={3}
          >
            Bringing nature closer to your soul 🍃
          </Typography>

          <Typography
            variant="h5"
            fontWeight="600"
            color="#355e46"
            textAlign="center"
            mb={2}
          >
            Log in to continue
          </Typography>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  background: "#f9faf9",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={form.password}
              onChange={handleChange}
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
                  borderRadius: "10px",
                  background: "#f9faf9",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: 3,
                fontWeight: "bold",
                textTransform: "none",
                background:
                  "linear-gradient(135deg, #bdeacb 0%, #a8e6b5 50%, #93e2a0 100%)",
                color: "#0f3e29",
                boxShadow: "0 6px 20px rgba(140, 200, 150, 0.25)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #a8e6b5 0%, #8edba0 100%)",
                  boxShadow: "0 8px 28px rgba(130,190,140,0.3)",
                },
              }}
              type="submit"
            >
              Log In
            </Button>
          </form>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={3}
          >
            Don’t have an account?{" "}
            <Button
              variant="text"
              color="success"
              onClick={() => navigate("/signup")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "#355e46",
                "&:hover": { color: "#2d6048" },
              }}
            >
              Sign Up
            </Button>
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            mt={1}
            sx={{
              cursor: "pointer",
              color: "#198754",
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => setForgotOpen(true)}
          >
            Forgot Password?
          </Typography>
        </Box>
      </Box>

      {/* -------- Right: Image + Quote -------- */}
      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574759878228-dc3aa05bed68?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.3)",
            borderRadius: 5,
            p: { xs: 3, md: 4 },
            textAlign: "center",
            maxWidth: 420,
            boxShadow:
              "0 12px 28px rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#064e3b"
            mb={1.5}
            sx={{ fontFamily: "'Playfair Display', serif" }}
          >
            “Let your roots find peace and your leaves chase the light.”
          </Typography>
          <Typography
            variant="body2"
            color="#064e3b"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            Every plant you nurture is a little world of calm and renewal 🌱
          </Typography>
        </Box>
      </Box>

      {/* ------------ Forgot Password Modal ------------ */}
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Enter your email to receive a password reset link.
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Cancel</Button>
          <Button
            onClick={handleForgotSubmit}
            disabled={loading}
            variant="contained"
            color="success"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------ Reset Password Modal ------------ */}
      <Dialog open={resetOpen} onClose={() => setResetOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              type="password"
              label="New Password"
              value={passwords.password}
              onChange={(e) =>
                setPasswords({ ...passwords, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              type="password"
              label="Confirm Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetOpen(false)}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            disabled={loading}
            variant="contained"
            color="success"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
