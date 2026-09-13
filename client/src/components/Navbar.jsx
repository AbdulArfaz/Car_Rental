import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "sonner";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user,input, setInput, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSearchSubmit = () => {
  if (location.pathname !== "/cars") {
    navigate("/cars");
  }
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSearchSubmit();
  }
};

  return (
    <header className="sticky top-0 z-50 w-full py-3 px-4 sm:px-6 flex justify-center">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={`w-full max-w-7xl h-16 px-6 flex items-center 
      justify-between rounded-full transition-all duration-300 ${
        isHome
          ? "bg-light/90 border border-borderColor/60 shadow-lg"
          : "bg-white/90 border border-borderColor/60 shadow-lg"
      } backdrop-blur-md`}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 460,
              damping: 17,
            }}
            src={assets.firefly}
            alt="Logo"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </NavLink>

        <div
          className={`
  absolute top-full left-4 right-4 sm:left-auto sm:right-6 z-40 sm:w-80 bg-white/95 backdrop-blur-xl
  shadow-2xl p-6 rounded-3xl flex flex-col justify-between
  transition-transform duration-300 ease-in-out
  md:static md:top-auto md:right-auto md:left-auto md:h-auto md:w-auto md:bg-gray-100/80
  md:border md:border-borderColor/50 md:shadow-inner md:p-1.5 md:flex-row md:items-center
  md:rounded-full md:gap-1
  ${open ? "scale-100 opacity-150 translate-y-0" : "scale-95 opacity-0 pointer-events-none md:pointer-events-auto translate-y-2"} md:translate-y-0 md:scale-100 md:opacity-100
`}
        >
          <div className="flex items-center justify-between md:hidden pb-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-lg">Menu</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-1 mt-4 md:mt-0">
            {menuLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-center 
                ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div
            className="flex items-center gap-2 bg-white/80 border border-gray-200 md:border-none 
          rounded-full px-3.5 py-1.5 my-3 md:my-0 shadow-xs md:shadow-none"
          >
            <input
              type="text"
              placeholder="Search..."
              value={input}
              onChange={(e)=> {
                setInput(e.target.value);
              }}
              onkeydown={handleKeyDown}
              className="bg-transparent text-sm outline-hidden w-full md:w-28 xl:w-36 text-gray-700 
              placeholder-gray-400"
            />
            <img
              src={assets.search_icon}
              alt="search"
              onClick={handleSearchSubmit}
              className="w-4 h-4 opacity-50"
            />
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 md:hidden">
            <button
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className="w-full py-2.5 rounded-full text-sm font-medium text-gray-700
               bg-gray-50 border border-borderColor text-center"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="w-full py-2.5 rounded-full text-sm font-medium text-white bg-linear-to-r
               from-primary via-blue-600 to-indigo-600 shadow-md shadow-primary/25 text-center"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="px-4 py-2 rounded-full text-sm font-medium text-gray-700
             hover:text-primary transition-colors"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="px-6 py-2.5 rounded-full text-sm font-medium 
            text-white bg-linear-to-r from-primary via-blue-600 to-indigo-600 hover:opacity-95 
            shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02]"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-hidden transition-colors z-50"
          aria-label="Toggle Menu"
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6 h-6"
          />
        </button>
      </motion.nav>
    </header>
  );
};

export default Navbar;
