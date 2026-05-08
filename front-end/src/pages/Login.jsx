import { useState } from "react";
import axios from "axios";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline
} from "react-icons/io5";
import loginImage from "../assets/login.jpg";

export default function Login() {
  console.log("LOGIN UPDATED");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 📷 LEFT SIDE */}
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img src={loginImage} alt="login" className="h-full w-full object-cover" />
      </div>

      {/* 🔐 RIGHT SIDE */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">PrimeFlow</h2>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">
              <span></span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-[#00171f] focus:border-transparent outline-none transition"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 p-3 pl-10 pr-12 rounded-xl focus:ring-2 focus:ring-[#00171f] focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#00171f] focus:ring-[#00171f]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#00171f] font-semibold hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-3.5 rounded-xl font-bold hover:bg-[#002a3a] transform transition active:scale-[0.98] shadow-lg shadow-black/10"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm mt-8 text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-[#00171f] font-bold hover:underline">Sign up for free</a>
          </p>
        </div>
      </div>
    </div>
  );
}