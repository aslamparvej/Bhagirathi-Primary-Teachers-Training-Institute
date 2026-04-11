import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ link, navRef }) => {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li key={link.label} className="relative group">
      <button
        onMouseEnter={() => link.children && setOpen(link.label)}
        onMouseLeave={() => setOpen(null)}
        onClick={() => setOpen(open === link.label ? null : link.label)}
        className="flex items-center gap-1 px-4 py-4 text-sm font-semibold hover:bg-[#ff5421] hover:text-white transition-colors"
      >
        {link.label}
        {link.children && <span className="text-[10px] opacity-70">▼</span>}
      </button>

      {link.children && open === link.label && (
        <div
          onMouseEnter={() => setOpen(link.label)}
          onMouseLeave={() => setOpen(null)}
          className="absolute top-full left-0 bg-white text-[#003a6a] min-w-55 shadow-2xl rounded-b-xl z-50 overflow-hidden border-t-4 border-[#ff5421]"
        >
          {link.children.map((child) => (
            <Link
              to="/login"
              key={child}
              className="block px-5 py-3 text-sm hover:bg-[#003a6a] hover:text-white transition-colors border-b border-gray-100 last:border-0"
            >
              {child}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default NavLink;
