import React, { useState } from "react";
import {
  adminMenuLinks,
  assets,
  menuLinks,
} from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const Sidebar = () => {
  const {user, axios, fetchUser} = useAppContext()
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
   try {
        const formData = new FormData()
        formData.append('image', image)
        const { data } = await axios.post('/api/owner/update-image', formData)
        if (data.success) {
          fetchUser()
          toast.success(data.message)
          setImage('')
        } else {
          toast.error(data.message)
        }
   } catch (error) {
     toast.error(error?.response?.data?.message || error.message)
   }
  };

  return (
    <aside className="min-h-screen w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 shadow-xl">
      <div className="p-6 flex flex-col items-center border-b border-slate-800/60 bg-linear-to-r from-slate-800/40 to-transparent">
        <div className="relative group cursor-pointer mb-3">
          <label htmlFor="image" className="cursor-pointer block relative">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.image ||
                    assets.users_icon
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-cyan-500/40 shadow-md group-hover:opacity-90 transition"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <img
                src={assets.edit_icon}
                alt="edit"
                className="w-5 h-5 filter invert"
              />
            </div>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <p className="font-semibold text-white tracking-wide text-sm mb-1">
          {user?.name || "Admin Owner"}
        </p>

        {image && (
          <button
            onClick={updateImage}
            className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-medium rounded-full shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
          >
            <img
              src={assets.check_icon}
              alt="save"
              className="w-3.5 h-3.5 filter invert"
            />
            Save Photo
          </button>
        )}
      </div>

      <div className="flex-1 py-4 px-3 space-y-1.5">
        {adminMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-linear-to-r from-cyan-500/15 via-blue-500/10 to-transparent text-cyan-400 shadow-sm border border-cyan-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt="icon"
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? "brightness-125" : "opacity-75"
                }`}
              />
              <span className="truncate">{link.name}</span>

              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-linear-to-b from-cyan-400 to-blue-500 rounded-l-full shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
              )}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
