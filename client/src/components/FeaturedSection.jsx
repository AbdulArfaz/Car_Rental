import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import CarCard from './CarCard';
import { dummyCarData } from '../assets/assets.js'; 
import { assets } from '../assets/assets.js';

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
     
        <Title 
          title="Featured Vehicles" 
          subTitle="Drive the extraordinary. Choose from out curated fleet of elite vehicles." 
          align="center" 
        />

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyCarData.slice(0, 4).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

      
        <div className="flex justify-center pt-4">
          <button 
            onClick={() => { navigate('/cars'); scrollTo(0,0); }}
            className="group flex items-center space-x-3 bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-400 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Explore all Cars</span>
            <img 
              src={assets.arrow_icon} 
              alt='arrow' 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform filter invert" 
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default FeaturedSection;










