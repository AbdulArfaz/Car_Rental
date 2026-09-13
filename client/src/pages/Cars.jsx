import React, { useEffect, useState } from "react";
import { assets, CarData } from "../assets/assets.js";
import CarCard from "../components/CarCard.jsx";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "sonner";

const Cars = () => {

 const [searchParams] = useSearchParams()
 const pickupLocation = searchParams.get('pickupLocation')
 const pickupDate = searchParams.get('pickupDate')
 const returnDate = searchParams.get('returnDate')
 const {cars, axios} = useAppContext()
 const [input, setInput] = useState("");

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])


  const displayCars = isSearchData 
  ? filteredCars 
  : cars.filter((car) => {
      if (!input) return true;
      const brand = car?.brand?.toLowerCase() || '';
      const model = car?.model?.toLowerCase() || '';
      const category = car?.category?.toLowerCase() || '';
      const searchTerm = input.toLowerCase();

      return brand.includes(searchTerm) || model.includes(searchTerm) || category.includes(searchTerm);
    });

  const searchCarAvailability = async ()=>{
    const{ data } = await axios.post('/api/booking/check-availability',{
      location: pickupLocation,
      pickupDate,
      returnDate
      })
    if (data.success) {
      setFilteredCars(data.data)
      if(data.data.length === 0){
        toast('No cars Available')
      }
      return null
    }
  }
  useEffect(()=>{
     isSearchData && searchCarAvailability()
  },[])

  

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Featured Vehicles
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Drive the extraordinary. Choose from our curated fleet of elite
            vehicles.
          </p>

          <div className="flex items-center bg-[#1f2937]/80 backdrop-blur-md border border-gray-700/80 rounded-2xl px-4 py-3.5 shadow-2xl transition-all focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20">
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
            <img
              src={assets.filter_icon}
              alt="filter"
              className="w-5 h-5 filter invert opacity-60 ml-3 cursor-pointer hover:opacity-100 transition shrink-0"
            />
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            Showing{" "}
            <span className="text-amber-400 font-bold">{displayCars.length}</span>{" "}
            Cars
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCars.map((car, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
