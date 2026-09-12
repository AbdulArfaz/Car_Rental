import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'sonner'

const Dashboard = () => {

  const {axios, isOwner, currency } = useAppContext()

const [data, setData] = useState({
  totalCars: 0,
  totalBookings: 0,
  pendingBookings: 0,
  completedBookings: 0,
  recentBookings: [],
  monthlyRevenue: 0,
})


const dashboardCards = [
    { 
      title: "Total Cars", 
      value: data.totalCars, 
      icon: assets.carIconColored,
      cardBg: "bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] text-slate-900 border-cyan-300",
      iconBg: "bg-cyan-200/60 border border-cyan-300 shadow-sm"
    },
    { 
      title: "Total Bookings", 
      value: data.totalBookings, 
      icon: assets.listIconColored,
      cardBg: "bg-linear-to-tr from-[#E1F5FE] via-[#B3E5FC] to-[#81D4FA] text-slate-900 border-sky-300",
      iconBg: "bg-sky-200/60 border border-sky-300 shadow-sm"
    },
    { 
      title: "Pending", 
      value: data.pendingBookings, 
      icon: assets.cautionIconColored,
      cardBg: "bg-linear-to-tr from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] text-slate-900 border-blue-300",
      iconBg: "bg-blue-200/60 border border-blue-300 shadow-sm"
    },
    { 
      title: "Confirmed", 
      value: data.completedBookings, 
      icon: assets.completedIconColored,
      cardBg: "bg-linear-to-tr from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD] text-slate-900 border-sky-300",
      iconBg: "bg-sky-200/60 border border-sky-300 shadow-sm"
    },
  ];


 const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      if (data.success) {
        setData(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error?.response?.data?.message || error.message)
    }
 }
  

useEffect(()=>{
  if (isOwner) {
    fetchDashboardData()
  }
},[isOwner])

  return (

  <div className="space-y-6 pb-10">
      
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard Overview & Analytics</h2>
        <p className="text-sm text-slate-400 mt-1">Your centralized hub for monitoring cars, customer bookings, real-time revenue streams, and recent activity in one place.</p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardCards.map((card, index)=>(
          <div 
            key={index} 
            className={`${card.cardBg} border p-5 rounded-2xl shadow-xl flex items-center justify-between transition-all transform hover:-translate-y-1`}
          >
            <div>
              <h1 className="text-xs font-black uppercase tracking-wider text-cyan-950 opacity-90">{card.title}</h1>
              <p className="text-3xl font-black text-slate-900 mt-1.5">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${card.icon} flex items-center justify-center p-2.5 shadow-lg`}>
              <img src={card.icon} alt='card' className="w-full h-full object-contain brightness-0 " />
            </div>
          </div>
        ))}
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
     
        <div className="lg:col-span-2 bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] border border-cyan-300 rounded-2xl p-6 shadow-xl text-slate-900">
          <h1 className="text-lg font-bold text-slate-900">Recent Booking</h1>
          <p className="text-xs text-cyan-950 opacity-90 mb-4">Latest Customer Booking</p>
          <div className="space-y-3">
            {data.recentBookings.map((booking, index)=>(
              <div key={index} className="flex items-center justify-between p-3.5 rounded-xl bg-white/90 border border-cyan-200 shadow-sm hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center p-2.5 shadow">
                    <img src={assets.listIconColored} alt='' className="w-full h-full object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{booking.car.brand} {booking.car.model}</p>
                    <p className="text-xs text-slate-600">{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-slate-900">{currency}{booking.price}</p>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold inline-block mt-0.5 capitalize border border-emerald-300">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-tr from-[#E1F5FE] via-[#B3E5FC] to-[#81D4FA] border border-sky-300 rounded-2xl p-6 shadow-xl flex flex-col justify-between text-slate-900">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Monthly Revenue</h1>
            <p className="text-xs text-sky-950 opacity-90">Revenue for Current Month</p>
          </div>
          <div className="my-6">
            <p className="text-4xl font-black text-slate-900">{currency} {data.monthlyRevenue}</p>
          </div>
          <div className="bg-white/90 border border-sky-200 rounded-xl p-4 text-xs text-slate-900 shadow-sm font-medium">
            💡 Earnings update in real-time as new vehicle reservations are validated.
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
