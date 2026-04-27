import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRound, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnState, setBtnState] = useState("idle"); // idle | loading | error
  const navigate = useNavigate();

  const { token, login } = useAuth();

  useEffect(() => {
    if (token) {
      console.log("User already logged in, redirecting to dashboard...");
      navigate("/admin/dashboard");
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("auth/login", { username, password });

      login(res.data.token); // use context

      navigate("/admin/dashboard"); // redirect to dashboard
    } catch (error) {
      console.log("Login failed:", error);
      setBtnState("error");

      setTimeout(() => {
        setBtnState("idle");
      }, 3000);
    }
  };

  const btnStyle =
    btnState === "error"
      ? "bg-[#ff5421] cursor-not-allowed"
      : "bg-[#003a6a] hover:bg-[#002a52] active:scale-[0.98]";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Left Panel */}
        <div className="hidden md:flex bg-[#003a6a] w-100 shrink-0 flex-col justify-between p-10">
          <div>
            {/* Logo */}
            <Link to="/">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-[#f59b18] flex items-center justify-center text-[#003a6a] text-2xl font-black select-none shrink-0">
                  <img src={logo} alt="Logo" />
                </div>
                <div>
                  <h1
                    className="text-white text-base font-bold leading-snug mb-1"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Bhagirathi Primary Teachers <br /> Training Institute
                  </h1>
                  <p className="text-[#f59b18] text-[10px] uppercase tracking-widest">
                    D.El.Ed &amp; B.Ed College
                  </p>
                </div>
              </div>
            </Link>

            <div className="h-px bg-white/10 my-7" />

            <p className="text-blue-200/75 text-xs leading-relaxed">
              Restricted area. Authorised administrators only. All access is
              logged and monitored.
            </p>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#ff5421]/20 border border-[#ff5421]/40 rounded-full px-3 py-1.5 self-start">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1L6.18 3.4L9 3.82L7 5.77L7.46 8.59L5 7.28L2.54 8.59L3 5.77L1 3.82L3.82 3.4L5 1Z"
                fill="#ff5421"
              />
            </svg>
            <span className="text-[#ff5421] text-[11px] font-semibold">
              Admin Access Only
            </span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white px-10 py-12 flex flex-col justify-center">
          <h2
            className="text-3xl font-bold text-gray-900 mb-1"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm mb-9">
            Sign in to manage institute records and portal settings
          </p>

          <form onSubmit={handleLogin} noValidate>
            {/* Username */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Username
              </label>
              <div className="relative">
                <UserRound
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                  size={16}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin username"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#003a6a] focus:ring-[#003a6a]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#003a6a] focus:ring-[#003a6a]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={btnState === "loading"}
              className={`w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all ${btnStyle}`}
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-gray-400 leading-relaxed">
            Access issues? Contact the system administrator
            <br />
            or email{" "}
            <span className="text-gray-500">devcenter.in@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
