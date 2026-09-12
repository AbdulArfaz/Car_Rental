import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {

  const { user } = useAppContext()
  

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <Link to="/" className="flex items-center gap-2 group ml-20">
        <img
          src={assets.mainlogo}
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-cyan-500/40 transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400">Welcome back,</p>
          <p className="text-sm font-semibold text-white tracking-tight">
            {user?.name || "Owner"}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md flex items-center justify-center text-white font-bold text-xs">
          {user?.name ? user.name.charAt(0).toUpperCase() : "O"}
        </div>
      </div>
    </header>
  );
};

export default NavbarOwner;
