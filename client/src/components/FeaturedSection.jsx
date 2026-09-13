import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import CarCard from "./CarCard";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const { cars, fetchCars } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchCars) {
      fetchCars();
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <motion.div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        <Title
          title="Featured Vehicles"
          subTitle="Drive the extraordinary. Choose from out curated fleet of elite vehicles."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {cars?.slice(0, 8).map((car) => (
            <motion.div
              key={car._id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/cars");
              scrollTo(0, 0);
            }}
            className="group flex items-center space-x-3 bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-400 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Explore all Cars</span>
            <img
              src={assets.arrow_icon}
              alt="arrow"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform filter invert"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedSection;
