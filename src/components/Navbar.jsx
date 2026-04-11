import React, { useState, useEffect, useRef } from "react";

import NavLink from "./UI/NavLink";

// Nav links data structure
const NAV_LINKS = [
  {
    label: "Society",
    children: [
      "Registration Certificate",
      "By Law",
      "Members",
      "Society Pan Card",
    ],
  },
  { label: "Management" },
  {
    label: "About",
    children: [
      "General Information",
      "Campus & Infrastructure",
      "Land Documents",
      "Building Documents",
      "Building Plan",
      "Photo Gallery",
    ],
  },
  {
    label: "Courses",
    children: [
      "NCTE Order (D.El.Ed)",
      "Affiliation (D.El.Ed)",
      "Fee Structure (D.El.Ed)",
      "Internship (D.El.Ed)",
      "Annual Intake (D.El.Ed)",
      "NCTE Order (B.Ed)",
      "Affiliation (B.Ed)",
      "Fee Structure (B.Ed)",
      "Internship (B.Ed)",
      "Annual Intake (B.Ed)",
      "Academic Calendar",
    ],
  },
  {
    label: "Staff",
    children: [
      "Teaching Staff B.Ed",
      "Teaching Staff D.El.Ed",
      "Non-Teaching Staff B.Ed",
      "Non-Teaching Staff D.El.Ed",
      "Faculty Documents",
      "Weekly Attendance",
    ],
  },
  {
    label: "Students",
    children: ["B.Ed Students", "D.El.Ed Students", "Weekly Attendance"],
  },
  {
    label: "Resources",
    children: [
      "Library",
      "ICT Lab",
      "Art & Craft",
      "Curriculum",
      "Physical Education",
      "Mandatory Disclosure",
    ],
  },
  { label: "Contact Us" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  return (
    <nav
      ref={navRef}
      className="bg-[#003a6a] text-white sticky top-0 z-50 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop */}
        <ul className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} link={link} navRef={navRef} />
          ))}
        </ul>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <span className="font-bold text-sm">BPTTI Navigation</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white text-2xl"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <button
                  onClick={() =>
                    setOpen(open === link.label ? null : link.label)
                  }
                  className="w-full text-left px-3 py-2.5 font-semibold hover:bg-[#ff5421] rounded text-sm transition-colors"
                >
                  {link.label} {link.children && "▾"}
                </button>
                {link.children && open === link.label && (
                  <div className="pl-4 border-l-2 border-[#f59b18] ml-3 mb-2">
                    {link.children.map((c) => (
                      <a
                        key={c}
                        href="#"
                        className="block py-1.5 text-xs text-blue-200 hover:text-white"
                      >
                        {c}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
