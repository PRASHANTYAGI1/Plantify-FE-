import React from "react";
import { motion } from "framer-motion";
import { ArrowDownward } from "@mui/icons-material";
import Features from "../component/Home/Features";
import HowItWorks from "../component/Home/HowItWorks";
import Products from "../component/Home/Products";
import Testimonials from "../component/Home/Testimonials";
import Gardening from "../component/Home/Gardening";
import Newsletter from "../component/Home/Blog _Newsletter";
import CTASection from "../component/Home/CTA";
import FAQSection from "../component/Home/FAQSection";
import Footer from "../component/Footer";

const floatingCards = [
  {
    id: 1,
    text: "Plants produce oxygen and purify the air — breathe easier and live healthier!",
  },
  {
    id: 2,
    text: "Clean air matters! Plants absorb pollutants and help maintain a fresh environment.",
  },
  {
    id: 3,
    text: "Support biodiversity: Plants provide food and shelter for countless species.",
  },
  {
    id: 4,
    text: "Improve mental health: Being around greenery reduces stress and boosts happiness.",
  },
];

const Home = () => {
  return (
    <>
      <div className="relative w-full min-h-screen bg-white overflow-hidden pt-24 lg:pt-32 ">

        {/* Hero Section */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-20">

          {/* Left Side */}
          <motion.div
            className="flex flex-col items-center lg:items-start justify-center gap-4 lg:w-5/12 z-20 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug sm:leading-snug md:leading-snug lg:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
              Healthy Plants, <span className="font-extrabold">Thriving Gardens</span>
              <br />
              <span className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl">All in One Place</span>
            </h1>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mt-3">
              Discover a world of plant products for gardeners and farmers alike. Detect plant diseases instantly and get precise remedies. Grow healthier plants, enhance your harvest, and bring life to your green space effortlessly!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center lg:justify-start w-full">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all text-xs sm:text-sm md:text-base"
              >
                Shop Plant Products
              </motion.a>
              <motion.a
                href="/disease-detection"
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-900 font-semibold rounded-xl shadow-md hover:bg-gray-50 transition-all text-xs sm:text-sm md:text-base"
              >
                Detect Plant Diseases
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 sm:h-72 md:h-80 lg:h-[500px] flex justify-center items-center mt-8 lg:mt-0"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="plantHero (2).png"
              alt="Green Plant"
              className="w-full h-[125%] object-cover rounded-2xl drop-shadow-2xl"
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {floatingCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8, y: -10, rotate: -5 + index * 5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                whileHover={{
                  scale: 1.1,
                  zIndex: 50,
                  rotate: 0,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transition: { duration: 0.3 },
                }}
                transition={{
                  duration: 0.8 + index * 0.2,
                  delay: 0.5 + index * 0.2,
                  type: "spring",
                  stiffness: 120,
                }}
                className="hidden lg:block absolute w-52 sm:w-60 p-4 bg-white/30 border border-white/10 text-gray-900 font-semibold cursor-pointer shadow-lg backdrop-blur-[5px] rounded-lg"
                style={{
                  top: `${15 + index * 12}%`,
                  left: `${10 + index * 18}%`,
                  transform: "skewX(-15deg)",
                }}
              >
                <div style={{ transform: "skewX(15deg)" }}>{card.text}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-12">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-900 cursor-pointer"
          >
            <ArrowDownward className="w-8 h-8 animate-bounce" />
          </motion.div>
        </div>

      </div>

      {/* Other Sections */}
      <Features />
      <HowItWorks />
      <Products />
      <Gardening />
      <Testimonials />
      <Newsletter />
      <CTASection />
      <FAQSection />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
