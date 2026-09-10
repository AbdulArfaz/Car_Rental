import React from "react";

const NewsLetter = () => {
  return (
    <>
      <div className="bg-linear-to-r from-gray-800 via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto bg-[#111827] rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Get Special Car Rental Offers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              Subscribe and start making the most of every journey with
              exclusive discounts and updates across Assam.
            </p>
          </div>

          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="grow">
                <label htmlFor="hero-input" className="sr-only">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="hero-input"
                  name="hero-input"
                  className="w-full px-4 py-3 text-sm text-white bg-[#1f2937] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 text-sm font-semibold text-gray-900 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-md transition-all duration-200 shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
