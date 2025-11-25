import React, { useState } from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 5 Fertilizers for Healthy Plants",
    desc: "Discover the most effective fertilizers for indoor and outdoor plants.",
    img: "https://www.ugaoo.com/cdn/shop/articles/shutterstock_301313486_c23c20b1-42b5-466e-bbcc-429666d58989.jpg?v=1742818250",
    link: "/blog/fertilizers",
  },
  {
    id: 2,
    title: "How to Prevent Common Plant Diseases",
    desc: "Tips and tricks to keep your plants disease-free all year round.",
    img: "https://rootsraja.in/cdn/shop/articles/5-Common-Plant-Diseases-Blog-Image.png?v=1748513272",
    link: "/blog/plant-diseases",
  },
  {
    id: 3,
    title: "Organic Gardening: A Beginner's Guide",
    desc: "Learn how to start organic gardening at home and stay eco-friendly.",
    img: "https://gilmour.com/wp-content/uploads/2019/10/Simple-Guide-to-Organic-Gardening.jpg",
    link: "/blog/organic-gardening",
  },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Stay Updated with Gardening Tips
        </h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={blog.link}
              className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-gray-700 mt-2">{blog.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Newsletter Form */}
        <div className="bg-gray-100 rounded-2xl p-8 text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-700 mb-6">
            Get the latest gardening tips, plant products updates, and disease remedies directly in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 flex-1"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
