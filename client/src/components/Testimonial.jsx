import React from "react";
import Title from "./Title";
import { motion } from "motion/react";

const Testimonial = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <div className="overflow-hidden bg-[#0b0f19]">
        <div className="relative max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl w-3/4 lg:w-1/2 mb-6 sm:mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
              Trusted by drivers and travelers across Assam
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants} className="flex h-auto">
              <div className="flex flex-col bg-[#111827] border border-gray-800 rounded-xl">
                <div className="flex-auto p-4 md:p-6">
                  <p className="text-base italic md:text-lg text-gray-300">
                    " Renting a car for our family road trip across Assam was
                    completely seamless. The vehicle was spotless, picked up
                    right on time, and the mileage policy was very fair. Will
                    definitely use them again! "
                  </p>
                </div>
                <div className="p-4 bg-[#1f2937] rounded-b-xl md:px-7">
                  <div className="flex items-center gap-x-3">
                    <div className="shrink-0">
                      <img
                        className="size-8 sm:size-11.5 rounded-full"
                        src="https://m.media-amazon.com/images/M/MV5BZTgwYjcwMGEtNmM2ZC00YjE2LThkMzgtMWJmODIxNzI4OGYyXkEyXkFqcGc@._V1_.jpg"
                        alt="kaleen bhaiya"
                      />
                    </div>
                    <div className="grow">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        Akhandnand Tripathi
                      </p>
                      <p className="text-xs text-gray-400">
                        Road Trip Enthusiast | Family Traveler
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex h-auto">
              <div className="flex flex-col bg-[#111827] border border-gray-800 rounded-xl">
                <div className="flex-auto p-4 md:p-6">
                  <p className="text-base italic md:text-lg text-gray-300">
                    " As someone who travels constantly for business meetings
                    around Guwahati, having a reliable car waiting is a
                    lifesaver. Their booking app and customer support are
                    top-notch. "
                  </p>
                </div>
                <div className="p-4 bg-[#1f2937] rounded-b-xl md:px-7">
                  <div className="flex items-center gap-x-3">
                    <div className="shrink-0">
                      <img
                        className="size-8 sm:size-11.5 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2HAinoOxbUIw2CJDBwYoDw374GwknBP-DGwvqx6bYA-kKo0ejAY7Oho&s=10"
                        alt="Guddu pandit"
                      />
                    </div>
                    <div className="grow">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        Guddu Bhaiya
                      </p>
                      <p className="text-xs text-gray-400">
                        Senior Director of Operations | Frequent Flyer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex h-auto">
              <div className="flex flex-col bg-[#111827] border border-gray-800 rounded-xl">
                <div className="flex-auto p-4 md:p-6">
                  <p className="text-base italic md:text-lg text-gray-300">
                    " Transparent pricing with zero hidden fees at the counter.
                    The luxury car I rented drove like a dream through the
                    scenic routes. Hands down the best car rental experience! "
                  </p>
                </div>
                <div className="p-4 bg-[#1f2937] rounded-b-xl md:px-7">
                  <div className="flex items-center gap-x-3">
                    <div className="shrink-0">
                      <img
                        className="size-8 sm:size-11.5 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVhomJpQzoF_9qRuuk2-5Dn4HzrXNm1k6EAUKsLP_kTUGVqCUljkJyhE&s=10"
                        alt="Bablu pandit"
                      />
                    </div>
                    <div className="grow">
                      <p className="text-sm sm:text-base font-semibold text-white">
                        Bablu Bhaiya
                      </p>
                      <p className="text-xs text-gray-400">
                        Entrepreneur | Happy Customer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={statsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-20 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8"
          >
            <motion.div variants={statVariants}>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400">
                On-time pickup rate
              </h3>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-amber-500">
                99.95%
              </p>
              <p className="mt-1 text-gray-400">across all local stations</p>
            </motion.div>

            <motion.div variants={statVariants}>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400">
                Vehicles in fleet
              </h3>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-amber-500">
                20+
              </p>
              <p className="mt-1 text-gray-400">ready to book today</p>
            </motion.div>

            <motion.div variants={statVariants}>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-400">
                Happy drivers
              </h3>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-amber-500">
                85%
              </p>
              <p className="mt-1 text-gray-400">choose us repeatedly</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
