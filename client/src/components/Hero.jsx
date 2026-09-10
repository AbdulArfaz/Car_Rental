import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickup, setPickup] = useState();

  return (
    <div className="relative bg-slate-900 text-slate-100 min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          <div className="space-y-4">
            <span className="text-amber-400 font-medium tracking-widest uppercase text-xs sm:text-sm bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
              Elite Fleet
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Experience Ultimate{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">
                Luxury on Wheels
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl">
              Indulge in world-class performance and unmatched prestige. Choose
              your destination and drive the extraordinary today.
            </p>
          </div>

          <form className="w-full bg-slate-800/90 backdrop-blur-md border border-slate-700/80 p-4 sm:p-6 rounded-2xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Pickup Location
              </label>
              <select
                required
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition"
              >
                <option value="" disabled>
                  Select Location
                </option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="pickup-date"
                className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Pick-up Date
              </label>
              <input
                type="date"
                id="pickup-date"
                min={new Date().toISOString().split("T")[0]}
                required
                style={{ colorScheme: "dark" }}
                className="bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition cursor-pointer"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="return-date"
                className="text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Return Date
              </label>
              <input
                type="date"
                id="return-date"
                required
                style={{ colorScheme: "dark" }}
                className="bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 transition cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold rounded-xl px-4 py-2.5 flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <span>Search Cars</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
          <img
            src={assets.main_car}
            alt="Luxury Car"
            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
