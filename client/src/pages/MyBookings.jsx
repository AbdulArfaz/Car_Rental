import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
 
 const { axios, user, currency } = useAppContext()

  const [bookings, setBookings] = useState([]);
  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
       setBookings(data.data) 
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
       <div className="min-h-screen bg-linear-to-br from-[#0b0f19] via-[#111827] to-[#1f2937] text-white px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="max-w-6xl mx-auto space-y-10">
      
        <div className="space-y-3 pt-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            My Bookings
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            View and manage your active and past vehicle reservations.
          </p>
        </div>

   
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div 
                key={booking._id || index}
                className="bg-[#111827]/80 backdrop-blur-md rounded-2xl border border-gray-800 shadow-xl p-6 flex flex-col xl:flex-row gap-6 xl:items-center justify-between transition-all hover:border-gray-700"
              >
                
                
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shrink-0 shadow-md">
                    <img src={booking.car.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                        Booking #{index + 1}
                      </p>
                      <p className={`px-3 py-0.5 text-xs rounded-full font-medium ${
                        booking.status.toLowerCase() === "confirmed" 
                          ? "bg-green-400/10 text-green-400 border border-green-500/20" 
                          : "bg-red-400/10 text-red-400 border border-red-500/20"
                      }`}>
                        {booking.status}
                      </p>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {booking.car.brand} {booking.car.model}
                    </h3>

                    <p className="text-xs sm:text-sm text-amber-400 font-medium">
                      {booking.car.year} &bull; {booking.car.category} &bull; {booking.car.location}
                    </p>
                  </div>
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:items-center gap-4 pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-800">
                  
                  <div className="flex items-center gap-3 bg-[#1f2937]/50 px-4 py-3 rounded-xl border border-gray-800/80">
                    <img src={assets.calendar_icon_colored} alt="" className="w-5 h-5 shrink-0" />
                    <div className="text-xs">
                      <p className="text-gray-400 font-medium">Rental Period</p>
                      <p className="text-white font-semibold mt-0.5">
                        {booking.pickupDate.split("T")[0]} &rarr; {booking.returnDate.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#1f2937]/50 px-4 py-3 rounded-xl border border-gray-800/80">
                    <img src={assets.location_icon_colored} alt="" className="w-5 h-5 shrink-0" />
                    <div className="text-xs">
                      <p className="text-gray-400 font-medium">Pickup Location</p>
                      <p className="text-white font-semibold mt-0.5">{booking.car.location}</p>
                    </div>
                  </div>

                </div>

            
                <div className="flex xl:flex-col items-center xl:items-end justify-between pt-4 xl:pt-0 border-t xl:border-t-0 border-gray-800 gap-1">
                  <div>
                    <p className="text-xs text-gray-400 font-medium xl:text-right">Total Price</p>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                      {currency}{booking.price}
                    </h1>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Booked on {booking.createdAt.split("T")[0]}
                  </p>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-[#111827]/40 rounded-2xl border border-gray-800">
              <p className="text-gray-400 text-sm">No bookings found.</p>
            </div>
          )}
        </div>

      </div>
    </div>

  );
};

export default MyBookings;
