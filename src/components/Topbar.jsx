import React from "react";
import { Link } from "react-router-dom";
import {MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

const Topbar = () => {
  return (
    <div className="bg-[#003a6a] text-white text-xs px-6 py-2 flex flex-wrap justify-between items-center gap-2">
      <p className="flex gap-1 opacity-80">
        <MapPinIcon size={16}/>
        <span>Jiaganj, Murshidabad, West Bengal — 742122</span>
      </p>
      <div className="flex gap-4 items-center">
        <p className="flex gap-1 opacity-80"><PhoneIcon size={16} /> <span>+91-9434529777</span></p>
        <p className="flex gap-1 opacity-80"><MailIcon size={16} /> <span>bhagirathiptti@gmail.com</span></p>
        <Link to="/login" className="bg-[#ff5421] hover:bg-[#e04418] px-3 py-1 rounded text-white font-semibold transition-all">
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
