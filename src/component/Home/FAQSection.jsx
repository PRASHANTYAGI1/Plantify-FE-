import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faqs = [
  {
    id: 1,
    question: "How does the AI disease detection work?",
    answer: "Upload a clear image of your plant or crop, and our AI system analyzes it for diseases, providing instant results with recommended remedies.",
  },
  {
    id: 2,
    question: "Can I trust the AI recommendations?",
    answer: "Yes! Our AI model is trained on thousands of plant disease datasets for high accuracy and reliability.",
  },
  {
    id: 3,
    question: "Do you deliver gardening products to home and farms?",
    answer: "Absolutely! We provide nationwide delivery for all our plant products, fertilizers, sprays, and tools.",
  },
  {
    id: 4,
    question: "Is there a guide for home gardeners?",
    answer: "Yes! Each product comes with clear instructions, and we provide tips and tutorials to help your garden thrive.",
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="border rounded-xl p-5 shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: faq.id * 0.1 }}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                {openId === faq.id ? (
                  <AiOutlineMinus size={20} />
                ) : (
                  <AiOutlinePlus size={20} />
                )}
              </div>
              {openId === faq.id && (
                <motion.p
                  className="text-gray-700 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
