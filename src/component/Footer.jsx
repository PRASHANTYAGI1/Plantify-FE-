import React from "react";
import { Typography, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-10 pb-6 border-t border-gray-700 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* --- About Section --- */}
        <div>
          <Typography variant="h6" className="text-white mb-3 font-semibold">
            Plantify
          </Typography>
          <Typography variant="body2" className="text-gray-400 leading-relaxed">
            Empowering farmers with smart agriculture solutions, plant disease
            detection, and sustainable e-commerce for a better future.
          </Typography>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <Typography variant="h6" className="text-white mb-6 font-semibold">
            Quick Links
          </Typography>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/products" className="hover:text-green-400 transition">Products</a></li>
            <li><a href="/disease-detection" className="hover:text-green-400 transition">Disease Detection</a></li>
            <li><a href="/contact" className="hover:text-green-400 transition mb-4">Contact Us</a></li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <Typography variant="h6" className="text-white mb-3 font-semibold">
            Contact Us
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            📍Plantify HQ, India
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            📞 +91 98765 43210
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            ✉️ support@example.com
          </Typography>
        </div>

        {/* --- Social Links --- */}
        <div>
          <Typography variant="h6" className="text-white mb-3 font-semibold">
            Follow Us
          </Typography>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <Facebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <Instagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
              <Twitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <LinkedIn />
            </a>
            <a href="mailto:support@agrosmart.com" className="hover:text-green-400">
              <Email />
            </a>
          </div>
        </div>
      </div>

      <Divider className="my-6 bg-gray-700 mt-6" />

      {/* --- Bottom Credit Line --- */}
      <div className="text-center text-gray-400 text-sm mt-3 ">
        <p>
          © {new Date().getFullYear()} Plantify. All rights reserved.
        </p>
        <p className="mt-2 text-green-800 font-semibold">
          Designed and Developed by Prashant and Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
