import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js'; 

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY 

  return (
   <div 
      onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0,0); }}
      className="group bg-slate-800/80 backdrop-blur-md border border-slate-700/80 
      rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 
      cursor-pointer flex flex-col justify-between"
    >
     
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        {car.isAvailable ? (
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs 
          font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
            Available Now
          </span>
        ) : (
          <span className="bg-rose-500/10 border border-rose-500/30 text-rose-400 
          text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
            Rented
          </span>
        )}

        <div className="bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-xl backdrop-blur-md shadow-md">
          <span className="text-amber-400 font-bold text-sm">{currency}{car.pricePerDay}</span>
          <span className="text-slate-400 text-xs"> / day</span>
        </div>
      </div>

     
      <div className="w-full h-40 sm:h-44 px-4 py-2 flex items-center justify-center">
        <img 
          src={car.image} 
          alt='car-image' 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

     
      <div className="p-5 pt-2 flex flex-col grow justify-between space-y-4">
        
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
            {car.brand} {car.model}
          </h3>
          <p className="text-slate-400 text-xs uppercase tracking-wider mt-0.5">
            {car.category} &bull; {car.year}
          </p>
        </div>

      
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
          
          <div className="flex items-center space-x-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <img src={assets.users_icon} alt='seats' className="w-4 h-4 opacity-70 filter invert" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <img src={assets.fuel_icon} alt='fuel' className="w-4 h-4 opacity-70 filter invert" />
            <span className="truncate">{car.fuel_type}</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <img src={assets.car_icon} alt='transmission' className="w-4 h-4 opacity-70 filter invert" />
            <span className="truncate">{car.transmission}</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <img src={assets.location_icon} alt='location' className="w-4 h-4 opacity-70 filter invert" />
            <span className="truncate">{car.location}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CarCard;





