import React from "react";
import { motion } from "framer-motion";
// If you want to avoid react-icons, you can use inline SVGs or images

const features = [
  {
    id: 1,
    title: "Quality Plant Products",
    desc: "All essential plants, seeds, fertilizers, and tools for home & farm gardening.",
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Disease Detection",
    desc: "Instantly detect plant diseases and get accurate remedies with AI-powered tools.",
    icon: (
      <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-3a1 1 0 10-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Gardening Tips",
    desc: "Expert guidance to grow healthy plants, improve yields, and maintain thriving gardens.",
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12h2v2H9v-2zm0-8h2v6H9V4zm-7 9h2v2H2v-2zm14 0h2v2h-2v-2zm-7 7h2v2h-2v-2z" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Why Choose Healthify?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
