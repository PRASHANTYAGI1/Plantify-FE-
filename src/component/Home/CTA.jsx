import React from "react";
import { motion } from "framer-motion";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          Detect Plant Diseases Instantly & Shop With Ease
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
          Upload your plant images, get AI-powered disease detection, and discover tailored remedies. Explore our premium gardening products to keep your plants thriving.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.a
            href="/disease-detection"
            whileHover={{ scale: 1.05, translateY: -3 }}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-green-600 rounded-xl shadow-lg hover:bg-green-700 transition-all font-semibold text-lg"
          >
            <AiOutlineSearch size={24} />
            Detect Diseases
          </motion.a>

          <motion.a
            href="/products"
            whileHover={{ scale: 1.05, translateY: -3 }}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl shadow-md hover:bg-gray-100 transition-all font-semibold text-lg"
          >
            <AiOutlineShoppingCart size={24} />
            Shop Products
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
