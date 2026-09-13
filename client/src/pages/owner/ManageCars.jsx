import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars", {
        withCredentials: true,
      });
      if (data.success) {
        setCars(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post(
        "/api/owner/toggle-car",
        { carId },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteCar = async (carId) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) {
      return null;
    }

    try {
      const { data } = await axios.post(
        "/api/owner/delete-car",
        { carId },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] border border-cyan-300 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manage Cars
          </h2>
          <p className="text-sm text-cyan-950 opacity-90 mt-1">
            View all listed cars, update their details, or remove them from the
            inventory.
          </p>
        </div>

        <div className="overflow-x-auto bg-white/60 border border-cyan-200 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cyan-200 bg-white/40">
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950">
                  Car
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950">
                  Category
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950">
                  Price
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950">
                  Status
                </th>
                <th className="py-4 px-4 text-xs font-black uppercase tracking-wider text-cyan-950">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-100">
              {cars?.map((car, index) => (
                <tr key={car._id} className="hover:bg-white/50 transition-all">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image}
                        alt="image"
                        className="w-14 h-14 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-slate-900 text-sm">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-xs text-slate-600">
                          {car.seating_capacity} . {car.transmission}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm font-medium text-slate-800">
                    {car.category}
                  </td>

                  <td className="py-4 px-4 text-sm font-semibold text-slate-900">
                    {currency}
                    {car.pricePerDay}/day
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${car.isAvailable ? " bg-green-100 text-green-500" : " bg-red-100 text-red-500"}`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-cyan-200/90 hover:bg-cyan-300 border border-cyan-300 rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center">
                        <img
                          onClick={() => toggleAvailability(car._id)}
                          src={
                            car.isAvailable
                              ? assets.eye_close_icon
                              : assets.eye_icon
                          }
                          alt="toggle"
                          className="w-8 h-8 object-contain brightness-0"
                        />
                      </div>
                      <div className="p-3 bg-red-200/90 hover:bg-red-300 border border-red-300 rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center">
                        <img
                          onClick={() => deleteCar(car._id)}
                          src={assets.delete_icon}
                          alt="delete"
                          className="w-8 h-8 object-contain brightness-0"
                        />
                      </div>
                    </div>
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

export default ManageCars;
