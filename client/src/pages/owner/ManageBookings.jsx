import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const ManageBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner", {
        withCredentials: true,
      });
      if (data.success) {
        setBookings(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cannot get bookings data");
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/change-status",
        { bookingId, status },
        { withCredentials: true }
      );
      if (data.success) {
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cannot get bookings data");
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-6xl mx-auto bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] border
       border-cyan-300 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900"
      >
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manage Bookings & Reservations
          </h2>
          <p className="text-sm text-cyan-950 opacity-90 mt-1">
            Review active rental requests, monitor scheduling timelines, and
            manage customer approvals seamlessly.
          </p>
        </div>

        <div className="overflow-x-auto bg-white/60 border border-cyan-200 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cyan-200 bg-white/40">
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950 whitespace-nowrap">
                  Car
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950 whitespace-nowrap">
                  Date Range
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950 whitespace-nowrap">
                  Total
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950 whitespace-nowrap">
                  Payment
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-100">
              {bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-white/50 transition-all">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.car?.image || assets.carIcon}
                        alt=""
                        className="w-14 h-14 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-slate-900 text-sm">
                          {booking.car?.brand} {booking.car?.model}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                    {booking.pickupDate.split("T")[0]} to{" "}
                    {booking.returnDate.split("T")[0]}
                  </td>

                  <td className="py-4 px-4 text-sm font-semibold text-slate-900">
                    {currency}
                    {booking.price}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold shadow-sm">
                      Offline
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {booking.status === "pending" ? (
                      <select
                        onChange={(e) =>
                          changeBookingStatus(booking._id, e.target.value)
                        }
                        value={booking.status}
                        className="bg-white border border-cyan-300 rounded-xl px-3 py-1.5 text-sm font-medium 
                         whitespace-nowrapfocus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
