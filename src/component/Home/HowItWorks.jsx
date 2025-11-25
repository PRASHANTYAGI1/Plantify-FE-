import React, { useRef } from "react";
import { motion } from "framer-motion";

const plantVideo1 = "plant.webm";
const plantVideo2 = "plant2.webm";

const steps = [
  {
    id: 1,
    title: "Upload Plant Image",
    desc: "Take a clear photo of your plant leaf or crop to get started.",
    media: plantVideo1,
  },
  {
    id: 2,
    title: "AI Detects Disease",
    desc: "Our AI-powered system instantly identifies plant diseases with high accuracy.",
    media: plantVideo2,
  },
  {
    id: 3,
    title: "Get Remedies",
    desc: "Receive precise solutions and recommendations for your plant health.",
    media: plantVideo1,
  },
  {
    id: 4,
    title: "Shop Products",
    desc: "Purchase fertilizers, sprays, and gardening tools to maintain healthy plants.",
    media: plantVideo2,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-16">
          How Plant Disease Detection Works
        </h2>

        <div className="flex flex-col gap-16">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Separate StepCard component to handle hover video play
const StepCard = ({ step, reverse }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0; // reset to start
  };

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8  ${reverse ? "md:flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Media Section */}
      <div
        className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={step.media}
          loop
          muted
          playsInline
          className="w-full h-50 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl pointer-events-none"></div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
          whileHover={{ scale: 1.05, color: "#16A34A" }}
        >
          Step {step.id}: {step.title}
        </motion.h3>
        <p className="text-gray-100 sm:text-xl text-gray-700">{step.desc}</p>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
