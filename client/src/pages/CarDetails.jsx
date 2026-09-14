import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { CarData } from "../assets/assets.js";
import Loader from "../components/Loader.jsx";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });
        toast.success(data.message || "Car booked Successfully!");
        navigate("/my-bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cannot Book The Car, Try Again"
      );
    }
  };

  useEffect(() => {
    if (cars && cars.length > 0) {
      setCar(cars.find((car) => car._id === id));
    }
  }, [cars, id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const sideCardVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return car ? (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-6"
      >
        <motion.div variants={fadeUpVariants}>
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] hover:bg-gray-800 text-gray-300 rounded-xl border border-gray-700 transition-all cursor-pointer shadow-sm"
          >
            <img
              src={assets.arrow_icon}
              alt=""
              className="rotate-180 filter invert w-4 h-4"
            />
            Back to all Cars
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              variants={fadeUpVariants}
              className="overflow-hidden rounded-2xl bg-[#111827] border border-gray-800 shadow-xl"
            >
              <img
                src={car.image}
                alt=""
                className="w-full h-65 sm:h-80 object-contain"
              />
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {car.brand} {car.model}
                </h1>
                <p className="text-amber-400 font-medium text-sm sm:text-base mt-1">
                  {car.category} . {car.year}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800">
                {[
                  {
                    icon: assets.users_icon,
                    text: `${car.seating_capacity} Seats`,
                  },
                  { icon: assets.fuel_icon, text: `${car.fuel_type}` },
                  { icon: assets.car_icon, text: `${car.transmission}` },
                  { icon: assets.location_icon, text: `${car.location}` },
                ].map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-3 bg-[#1f2937]/50 p-3 rounded-xl border border-gray-800"
                  >
                    <img
                      src={icon}
                      alt=""
                      className="w-4 h-4 filter invert opacity-80 shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {car.phone && (
              <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Owner Contact
                  </p>
                  <p className="text-white font-bold text-base mt-0.5">
                    {car.phone}
                  </p>
                </div>
                <a
                  href={`tel:${car.phone}`}
                  className="bg-amber-500 text-slate-950 px-3.5 py-2 rounded-xl font-semibold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call
                </a>
              </div>
            )}

            <motion.div
              variants={fadeUpVariants}
              className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-3"
            >
              <h2 className="text-lg font-bold text-white">Description</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {car.description}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4"
            >
              <h2 className="text-lg font-bold text-white">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Panoramic sunroof",
                  "Wireless Smartphone Charger",
                  "All Wheel Drive(AWD)",
                  "Leather uphoistery",
                ].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 text-sm text-gray-300 bg-[#1f2937]/40 px-3.5 py-2.5 rounded-xl border border-gray-800"
                  >
                    <img
                      src={assets.check_icon}
                      alt=""
                      className="w-4 h-4 filter invert shrink-0"
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={sideCardVariants}
            className="lg:col-span-1 sticky top-24"
          >
            <div className="bg-[#111827] p-6 sm:p-7 rounded-2xl border border-gray-800 shadow-2xl space-y-6">
              <div className="pt-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pb-4 border-b border-gray-800">
                    <p className="text-3xl font-extrabold text-white">
                      ₹{car.pricePerDay}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        per day
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="pickup-date"
                      className="block text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      required
                      id="pickup-date"
                      value={pickupDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        const newPickup = e.target.value;
                        setPickupDate(newPickup);
                        if (returnDate && returnDate < newPickup) {
                          setReturnDate("");
                        }
                      }}
                      style={{ colorScheme: "dark" }}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400 transition cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="return-date"
                      className="block text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      Return Date
                    </label>
                    <input
                      type="date"
                      required
                      id="return-date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      style={{ colorScheme: "dark" }}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400 transition cursor-pointer"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="w-full mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    Book Now
                  </motion.button>

                  <p className="text-center text-xs text-gray-500 pt-1">
                    No credit card required to reserve
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
