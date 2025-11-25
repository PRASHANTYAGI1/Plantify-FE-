import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "../api/userapi";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProfileCard = () => setShowProfileCard(!showProfileCard);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (user) {
      getUserProfile()
        .then((res) => {
          if (res.data.success) setProfileData(res.data.user);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!profileData.name || !profileData.phone) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile({
        name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        postalCode: profileData.postalCode,
        shopName: profileData.shopName,
        gstNumber: profileData.gstNumber,
        businessType: profileData.businessType,
      });
      const res = await getUserProfile();
      if (res.data.success) setUser(res.data.user);
      toast.success("Profile updated successfully");
      setShowUpdateForm(false);
      setShowProfileCard(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await uploadProfileImage(formData);
      if (res.data.success) {
        setProfileData(res.data.user);
        setUser(res.data.user);
        toast.success("Profile image updated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  // Dynamic Nav Items
  let displayedNavItems = [];
  if (user) {
    const role = user.role?.toLowerCase();
    if (role === "seller") {
      displayedNavItems = [
        { name: "Add Product", path: "/seller/add-product" },
        { name: "My Products", path: "/seller/my-products" },
        { name: "About", path: "/about" },
        { name: "Orders", path: "/seller/orders" },
      ];
    } else if (role === "buyer") {
      displayedNavItems = [
        // { name: "Home", path: "/" },
        { name: "Shop Products", path: "/products" },
        // { name: "Crops & Fertilizers", path: "/crops-fertilizers" },
        // { name: "Seeds & Tools", path: "/seeds-tools" },
        { name: "Disease Detection", path: "/disease-detection" },
        { name: "Your Cart", path: "/wishlist" },
        { name: "About", path: "/about" },
      ];
    } else {
      displayedNavItems = [
        // { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];
    }
  } else {
    displayedNavItems = [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ];
  }
  const tohome = () => navigate("/");

  return (
    <>
      <Toaster position="top-right" />
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 onClick={tohome} className="text-black font-extrabold text-3xl tracking-tight cursor-pointer">
              Plantify
            </h1>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
            {displayedNavItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.1, color: "#16a34a" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to={item.path} className="relative group">
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleProfileCard}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <FaUserCircle className="h-8 w-8 text-gray-600" />
                  <span className="hidden md:block">{user.name}</span>
                </button>

                {/* Profile Card */}
               {/* Profile Card */}
<AnimatePresence>
  {showProfileCard && profileData && !showUpdateForm && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-200 right-0 mt-2 w-80 bg-white shadow-xl rounded-xl border border-gray-200  p-6 flex flex-col items-center gap-4"
    >
      {/* Profile Image */}
      <img
        src={profileData.profileImage || "/default-avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-green-600"
      />

      {/* User Info */}
      <div className="text-center">
        <h2 className="font-bold text-lg">{profileData.name}</h2>
        <p className="text-gray-500 text-sm">{profileData.email}</p>
        <p className="text-gray-400 text-xs capitalize">{profileData.role}</p>
      </div>

      {/* Upload Profile Image */}
      <label className="cursor-pointer">
        <span className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-medium">
          Update Profile Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Edit Profile Button */}
      <button
        onClick={() => {
          setShowProfileCard(false);
          setShowUpdateForm(true);
        }}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
      >
        Edit Profile
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Logout
      </button>
    </motion.div>
  )}
</AnimatePresence>


                {/* Update Form */}
                <AnimatePresence>
                  {showUpdateForm && profileData && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-xl border border-gray-200 z-50 p-6"
                    >
                      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

                      <div className="space-y-3">
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          placeholder="Full Name"
                          className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          disabled
                          className="w-full border px-3 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={profileData.phone || ""}
                          onChange={handleProfileChange}
                          placeholder="Phone Number"
                          className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                          type="text"
                          name="address"
                          value={profileData.address || ""}
                          onChange={handleProfileChange}
                          placeholder="Address"
                          className="w-full border px-3 py-2 rounded-lg"
                        />
                        <input
                          type="text"
                          name="postalCode"
                          value={profileData.postalCode || ""}
                          onChange={handleProfileChange}
                          placeholder="Postal Code"
                          className="w-full border px-3 py-2 rounded-lg"
                        />

                        {profileData.role === "seller" && (
                          <>
                            <input
                              type="text"
                              name="shopName"
                              value={profileData.shopName || ""}
                              onChange={handleProfileChange}
                              placeholder="Shop Name"
                              className="w-full border px-3 py-2 rounded-lg"
                            />
                            <input
                              type="text"
                              name="gstNumber"
                              value={profileData.gstNumber || ""}
                              onChange={handleProfileChange}
                              placeholder="GST Number"
                              className="w-full border px-3 py-2 rounded-lg"
                            />
                            <select
                              name="businessType"
                              value={profileData.businessType || "other"}
                              onChange={handleProfileChange}
                              className="w-full border px-3 py-2 rounded-lg"
                            >
                              <option value="individual">Individual</option>
                              <option value="partnership">Partnership</option>
                              <option value="company">Company</option>
                              <option value="other">Other</option>
                            </select>
                          </>
                        )}
                      </div>

                      <div className="mt-5 flex justify-between gap-3">
                        <button
                          onClick={handleProfileUpdate}
                          className={`flex-1 py-2 rounded-lg text-white ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-500"
                          }`}
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Save Changes"}
                        </button>
                        <button
                          onClick={() => {
                            setShowUpdateForm(false);
                            setShowProfileCard(true);
                          }}
                          className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-200 transition"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white flex flex-col px-6 py-4 space-y-3 shadow-lg"
            >
              {displayedNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block text-gray-700 font-medium py-2 hover:text-green-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
