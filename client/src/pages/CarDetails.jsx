import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { CarData } from "../assets/assets.js";
import Loader from "../components/Loader.jsx";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setCar(CarData.find((car) => car._id === id));
  }, [id]);

  return car ? (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] hover:bg-gray-800 text-gray-300 rounded-xl border border-gray-700 transition-all cursor-pointer shadow-sm"
          >
            <img
              src={assets.arrow_icon}
              alt=""
              className="rotate-180 filter invert w-4 h-4"
            />
            Back to all Cars
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-2xl bg-[#111827] border border-gray-800 shadow-xl">
              <img
                src={car.image}
                alt=""
                className="w-full h-65 sm:h-80 object-cover"
              />
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
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
                  <div
                    key={text}
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
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-3">
              <h2 className="text-lg font-bold text-white">Description</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {car.description}
              </p>
            </div>

            <div className="bg-[#111827]/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl space-y-4">
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
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-gray-300 bg-[#1f2937]/40 px-3.5 py-2.5 rounded-xl border border-gray-800"
                  >
                    <img
                      src={assets.check_icon}
                      alt=""
                      className="w-4 h-4 filter invert shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 sticky top-24">
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
                      min={new Date().toISOString().split("T")[0]}
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
                      style={{ colorScheme: "dark" }}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-400 transition cursor-pointer"
                    />
                  </div>

                  <button
                    onSubmit={handleSubmit}
                    className="w-full mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    Book Now
                  </button>

                  <p className="text-center text-xs text-gray-500 pt-1">
                    No credit card required to reserve
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
