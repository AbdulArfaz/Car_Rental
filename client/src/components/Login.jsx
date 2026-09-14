import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const Login = () => {

const {setShowLogin, axios, setToken, navigate, fetchUser} = useAppContext()

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const payload = state === "register" ? { name, email, password} : { email, password }
      const {data} = await axios.post(`/api/users/${state}`, payload)
      if (data.success) {
        toast.success("Login successful! Now you can list cars")
        setShowLogin(false)
        navigate('/')
        fetchUser()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center text-sm text-slate-700 bg-black/50 backdrop-blur-sm px-4"
      onClick={() => setShowLogin(false)}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-linear-to-tr from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] border border-cyan-300 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span className="bg-cyan-950 text-cyan-200 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
              User
            </span>
            {state === "login" ? "Login" : "Sign Up"}
          </p>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-cyan-950 font-bold hover:text-red-500 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {state === "register" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-950">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Your Name"
              required
              className="bg-white/80 border border-cyan-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-950">
            Email Address
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your Email"
            required
            className="bg-white/80 border border-cyan-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-950">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your Password"
            required
            className="bg-white/80 border border-cyan-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
          />
        </div>

        <div className="text-center text-xs sm:text-sm mt-1">
          {state === "register" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-cyan-950 font-extrabold cursor-pointer hover:underline ml-1"
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-cyan-950 font-extrabold cursor-pointer hover:underline ml-1"
                onClick={() => setState("register")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-50 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all active:scale-[0.98] mt-2"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
