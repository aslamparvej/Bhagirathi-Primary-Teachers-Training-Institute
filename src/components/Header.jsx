import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white border-b-4 border-[#f59b18] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <div className="w-22 h-22 rounded-full bg-[#003a6a] flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-lg">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#003a6a] tracking-tight leading-tight">
            Bhagirathi Primary Teachers Training Institute
          </h1>
          <p className="text-[#ff5421] font-bold text-sm tracking-widest uppercase mt-0.5">
            D.El.Ed &amp; B.Ed College
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            Affiliated to NCTE &amp; WBUTTEPA · Est. 2013
          </p>
        </div>
        <div className="ml-auto hidden md:flex gap-3">
          <a
            href="#admissions"
            className="bg-[#ff5421] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#e04418] transition-all shadow hover:shadow-md"
          >
            Apply Now
          </a>
          <a
            href="#contact"
            className="border-2 border-[#003a6a] text-[#003a6a] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#003a6a] hover:text-white transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
