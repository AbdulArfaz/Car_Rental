import React from "react";
import { motion } from "motion/react";

const NewsLetter = () => {

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

  return (
    <>
      <div className="bg-linear-to-r from-gray-800 via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <motion.div
        variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        className="max-w-4xl mx-auto bg-[#111827] rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-800">
          <motion.div variants={itemVariants} className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Get Special Car Rental Offers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              Subscribe and start making the most of every journey with
              exclusive discounts and updates across Assam.
            </p>
          </motion.div>

          <motion.form variants={itemVariants} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="grow">
                <label htmlFor="hero-input" className="sr-only">
                  Enter your email
                </label>
                <motion.input
                whileFocus={{scale: 1.01}}
                  type="email"
                  id="hero-input"
                  name="hero-input"
                  className="w-full px-4 py-3 text-sm text-white bg-[#1f2937] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <motion.button
              whileHover={{scale: 1.04}}
              whileTap={{scale: 0.96}}
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 text-sm font-semibold text-gray-900 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-md transition-all duration-200 shrink-0 cursor-pointer"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
};

export default NewsLetter;
