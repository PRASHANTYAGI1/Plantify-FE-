import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Farmer",
    text: "Using Healthify, I detected leaf blight early and saved a major portion of my crops. Highly recommended!",
    img: "https://lumenor.ai/cdn-cgi/imagedelivery/F5KOmplEz0rStV2qDKhYag/80209ad9-e5f8-4529-8319-dacc0be9a100/tn",
  },
  {
    id: 2,
    name: "Sanya Verma",
    role: "Home Gardener",
    text: "The plant products are excellent and easy to use. My garden has never looked this healthy!",
    img: "https://img.freepik.com/premium-photo/happy-smiling-indian-farmer-farm-illustration-ai-generated_843560-1298.jpg",
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Farmer",
    text: "The AI disease detection is very accurate. It suggested remedies that worked perfectly.",
    img: "https://img.freepik.com/premium-photo/happy-smiling-indian-farmer-farm-illustration-ai-generated_843560-1298.jpg",

  },
   {
    id: 4,
    name: "Amit Singh",
    role: "Farmer",
    text: "The AI disease detection is very accurate. It suggested remedies that worked perfectly.",
       img: "https://lumenor.ai/cdn-cgi/imagedelivery/F5KOmplEz0rStV2qDKhYag/80209ad9-e5f8-4529-8319-dacc0be9a100/tn",
  },
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>

        {/* Smooth Scroll Container */}
        <div className="relative flex justify-center">
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory px-4 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-600 transition-all duration-300 scroll-smooth">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex-shrink-0 w-80 snap-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedTestimonial(testimonial)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 mx-auto"
                />
                <h3 className="text-lg font-semibold text-gray-900 text-center">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 text-center mb-2">{testimonial.role}</p>
                <p className="text-gray-700 text-center truncate">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Gradient Edge Fade */}
          <div className="absolute right-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
          <div className="absolute left-0 top-0 h-full w-16 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
        </div>
      </div>

      {/* Popup for full testimonial */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl max-w-md mx-4 text-center shadow-2xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedTestimonial.img}
                alt={selectedTestimonial.name}
                className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-gray-900">{selectedTestimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{selectedTestimonial.role}</p>
              <p className="text-gray-700">{selectedTestimonial.text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
