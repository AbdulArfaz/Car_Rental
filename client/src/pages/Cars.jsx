import React, { useEffect, useState } from "react";
import { assets, CarData } from "../assets/assets.js";
import CarCard from "../components/CarCard.jsx";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  const { cars, axios, fetchCars } = useAppContext();
  const [input, setInput] = useState("");

  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const displayCars = isSearchData
    ? filteredCars
    : cars
        .filter((car) => {
          if (!input) return true;
          const brand = car?.brand?.toLowerCase() || "";
          const model = car?.model?.toLowerCase() || "";
          const category = car?.category?.toLowerCase() || "";
          const searchTerm = input.toLowerCase();

          return (
            brand.includes(searchTerm) ||
            model.includes(searchTerm) ||
            category.includes(searchTerm)
          );
        })
        .slice(0, 20);

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.data);
      if (data.data.length === 0) {
        toast("No cars Available");
      }
      return null;
    }
  };
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else if (fetchCars) {
      fetchCars();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured Vehicles
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Drive the extraordinary. Choose from our curated fleet of elite
              vehicles.
            </p>
          </motion.div>

          <motion.div
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center bg-[#1f2937]/80 backdrop-blur-md border border-gray-700/80 rounded-2xl px-4 py-3.5 shadow-2xl transition-all focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20"
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 h-5 filter invert opacity-60 mr-3 shrink-0"
            />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search by model or features"
              className="w-full bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={assets.filter_icon}
              alt="filter"
              className="w-5 h-5 filter invert opacity-60 ml-3 cursor-pointer hover:opacity-100 transition shrink-0"
            />
          </motion.div>
        </div>

        <div className="space-y-6 pt-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-gray-400 tracking-wide uppercase"
          >
            Showing{" "}
            <span className="text-amber-400 font-bold">
              {displayCars.length}
            </span>{" "}
            Cars
          </motion.p>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayCars.map((car, index) => (
                <motion.div
                  key={car._id || index}
                  variants={cardVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
