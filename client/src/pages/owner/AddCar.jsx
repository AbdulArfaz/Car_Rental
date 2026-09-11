import React, { useState } from "react";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] border border-cyan-300 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            List a New Vehicle
          </h2>
          <p className="text-sm text-cyan-950 opacity-90 mt-1">
            Fill in the specifications, pricing, and upload a clear picture to
            add your car to the rental inventory.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex flex-col items-center justify-center p-6 bg-white/60 border-2 border-dashed border-cyan-400 rounded-2xl shadow-sm hover:bg-white/80 transition-all">
            <label
              htmlFor="car-image"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_icon}
                alt=""
                className="w-20 h-20 object-cover rounded-xl shadow-md"
              />
              <input
                type="file"
                id="car-image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <span className="text-sm font-bold text-slate-800">
                Upload a picture of your car
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g Nissan, Toyota, Audi..."
                required
                value={car.brand}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Model
              </label>
              <input
                type="text"
                placeholder="e.g X5, E-class, M4..."
                required
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Year
              </label>
              <input
                type="number"
                placeholder="2025"
                required
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Daily Price({currency})
              </label>
              <input
                type="number"
                placeholder="1000"
                required
                value={car.pricePerDay}
                onChange={(e) =>
                  setCar({ ...car, pricePerDay: e.target.value })
                }
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Category
              </label>
              <select
                onChange={(e) => setCar({ ...car, category: e.target.value })}
                value={car.category}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              >
                <option value="">Select a Category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Transmission
              </label>
              <select
                onChange={(e) =>
                  setCar({ ...car, transmission: e.target.value })
                }
                value={car.transmission}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              >
                <option value="">Select a Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Fuel Type
              </label>
              <select
                onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                value={car.fuel_type}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              >
                <option value="">Select a Fuel Type</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Seating Capacity
              </label>
              <input
                type="number"
                placeholder="4"
                required
                value={car.seating_capacity}
                onChange={(e) =>
                  setCar({ ...car, seating_capacity: e.target.value })
                }
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
                Location
              </label>
              <select
                onChange={(e) => setCar({ ...car, location: e.target.value })}
                value={car.location}
                className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
              >
                <option value="">Select a Location</option>
                <option value="Tezpur">Tezpur</option>
                <option value="Jorhat">Jorhat</option>
                <option value="Guwahahti">Guwahahti</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Nogaon">Nogaon</option>
                <option value="Dhubri">Dhubri</option>
                <option value="Tinsukiya">Tinsukiya</option>
                <option value="Morigoan">Morigoan</option>
                <option value="Dhemaji">Dhemaji</option>
                <option value="Sivsagar">Sivsagar</option>
                <option value="BiswanAth">BiswanAth</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="e.g A luxurious SUV with a spacious interior and powerful engine"
              required
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
              className="bg-white/90 border border-cyan-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 shadow-sm"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <img
                src={assets.tick_icon}
                alt=""
                className="w-5 h-5 brightness-0 invert"
              />
              Add Car to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
