import React from "react";
import { motion } from "framer-motion";

const tips = [
  {
    id: 1,
    title: "Watering Techniques",
    desc: "Learn the best practices for watering your plants based on type and season.",
    img: "https://www.bhg.com/thmb/25Rh-0rHp13-TLTBK9m6TUCcKOs=/3000x0/filters:no_upscale():strip_icc()/how-to-water-houseplants-5651236-02-ed50a5dc2f1c42d9874ee049e3736ede.jpg",
  },
  {
    id: 2,
    title: "Soil Preparation",
    desc: "Understand soil types, composting, and fertilization for healthy growth.",
    img: "https://blog.dutch-bulbs.com/wp-content/uploads/2023/05/A-Comprehensive-guide2.png",
  },
  {
    id: 3,
    title: "Pest Management",
    desc: "Identify common pests and use safe remedies to protect your plants.",
    img: "https://cdn.shopify.com/s/files/1/0724/4598/5057/files/hammadch13_A_gardener_closely_inspecting_a_vibrant_green_leaf_r_da684ce2-7935-4e0d-8f4a-d5dd48f1453b.webp?v=1740977753",
  },
  {
    id: 4,
    title: "Plant Pruning",
    desc: "Pruning techniques to encourage flowering and maintain plant health.",
    img: "https://cdn.shopify.com/s/files/1/0284/2450/files/bghg_480x480.jpg?v=1701691832",
  },
];

const GardeningTips = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Gardening Tips & Tricks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={tip.img}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                <p className="text-gray-700 mt-2">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GardeningTips;
