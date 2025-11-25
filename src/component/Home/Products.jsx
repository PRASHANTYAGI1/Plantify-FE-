import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    price: "₹350",
    img: "https://www.ugaoo.com/cdn/shop/articles/fertilizers_ac91d1b9-bb7f-4513-baf9-e1057b395eb7.jpg?v=1711519887",
  },
  {
    id: 2,
    name: "Herb Seeds Pack",
    price: "₹120",
    img: "https://www.urbanplant.in/cdn/shop/files/husstleFreewebp_5d92e72f-750c-4f60-b66f-db1b4d01fb44.webp?v=1747220378&width=2000",
  },
  {
    id: 3,
    name: "Spray Bottle",
    price: "₹250",
    img: "https://www.jiomart.com/images/product/original/rvyy15vkz0/millensium-pressure-spray-pump-2l-gardening-water-pump-sprayer-plant-water-sprayer-for-home-garden-shower-for-house-plants-spray-bottles-for-garden-plants-and-lawn-herbicides-pesticides-fertilizers-plant-watering-can-product-images-orvyy15vkz0-p600092358-4-202304030541.jpg?im=Resize=(420,420)",
  },
  {
    id: 4,
    name: "Gardening Gloves",
    price: "₹180",
    img: "https://www.yourorganicproducts.com/wp-content/uploads/2018/03/61ubsXBPUaL._SL1280_.jpg",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-green-700 font-bold mt-1">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
