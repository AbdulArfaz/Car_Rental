import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const leftContentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightImageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

const Banner = () => {
  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div
            variants={leftContentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            <span className="text-amber-400 font-medium tracking-widest uppercase text-xs sm:text-sm bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
              Partner With Us
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Turn Your Luxury Car Into{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">
                Revenue
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Monetize your vehicle effortlessly by listing it on Firefly Car
              Rental.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We handle comprehensive insurance, secure payments, and verified
              drivers—so you earn passive income completely stress-free.
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              List Your Car
            </motion.button>
          </motion.div>

          <motion.div
            variants={rightImageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="absolute inset-0 bg-amber-500/5 rounded-3xl blur-2xl -z-10" />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              src={assets.banner_car_image}
              alt="Luxury Car Banner"
              className="w-full max-w-md lg:max-w-none h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
