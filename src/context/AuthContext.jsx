import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Include token if your API requires it
      const res = await getUserProfile(token); // Make sure your API accepts token
      setUser({ ...res.data.user, token }); // Attach token to user
      localStorage.setItem(
        "user",
        JSON.stringify({ ...res.data.user, token })
      );
    } catch (err) {
      console.error("Failed to fetch user:", err);
      // Keep token in storage but mark user null
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
