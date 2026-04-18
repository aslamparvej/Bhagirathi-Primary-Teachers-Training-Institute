import React, { useState, useEffect, useRef } from "react";
import NavLink from "./UI/NavLink";

// Nav links data structure
const NAV_LINKS = [
  {
    label: "Society",
    children: [
      {
        label: "Registration Certificate",
        slug: "registration-certificate",
        pdfUrl: "/pdfs/registration-certificate.pdf",
      },
      { label: "By Law", slug: "by-law", pdfUrl: "/pdfs/by-law.pdf" },
      {
        label: "Members",
        slug: "members",
        pdfUrl: "/pdfs/society-members.pdf",
      },
      {
        label: "Society Pan Card",
        slug: "society-pan-card",
        pdfUrl: "/pdfs/society-pan-card.pdf",
      },
    ],
  },
  { label: "Secretary", slug: "secretary", pdfUrl: "/pdfs/secretary.pdf" },
  {
    label: "About",
    children: [
      {
        label: "General Information",
        slug: "general-information",
        pdfUrl: "/pdfs/general-information.pdf",
      },
      {
        label: "Infrastructure",
        slug: "infrastructure",
        pdfUrl: "/pdfs/infrastructure.pdf",
      },
      {
        label: "Land Documents",
        slug: "land-documents",
        pdfUrl: "/pdfs/land-documents.pdf",
      },
      {
        label: "Building Documents",
        slug: "building-documents",
        pdfUrl: "/pdfs/building-documents.pdf",
      },
      {
        label: "Building Plan",
        slug: "building-plan",
        pdfUrl: "/pdfs/building-plan.pdf",
      },
      { label: "Photo Gallery", slug: "photo-gallery", pdfUrl: null },
    ],
  },
  {
    label: "Courses",
    children: [
      {
        label: "NCTE Order (D.El.Ed)",
        slug: "ncte-order-ded",
        pdfUrl: "/pdfs/ncte-order-ded.pdf",
      },
      {
        label: "Affiliation (D.El.Ed)",
        slug: "affiliation-ded",
        pdfUrl: "/pdfs/affiliation-ded.pdf",
      },
      {
        label: "Fee Structure (D.El.Ed)",
        slug: "fee-structure-ded",
        pdfUrl: "/pdfs/fee-structure-ded.pdf",
      },
      {
        label: "Annual Intake (D.El.Ed)",
        slug: "annual-intake-ded",
        pdfUrl: "/pdfs/annual-intake-ded.pdf",
      },
      {
        label: "NCTE Order (B.Ed)",
        slug: "ncte-order-bed",
        pdfUrl: "/pdfs/ncte-order-bed.pdf",
      },
      {
        label: "Affiliation (B.Ed)",
        slug: "affiliation-bed",
        pdfUrl: "/pdfs/affiliation-bed.pdf",
      },
      {
        label: "Fee Structure (B.Ed)",
        slug: "fee-structure-bed",
        pdfUrl: "/pdfs/fee-structure-bed.pdf",
      },
      {
        label: "Annual Intake (B.Ed)",
        slug: "annual-intake-bed",
        pdfUrl: "/pdfs/annual-intake-bed.pdf",
      },
      {
        label: "Academic Calendar",
        slug: "academic-calendar",
        pdfUrl: "/pdfs/academic-calendar.pdf",
      },
    ],
  },
  {
    label: "Staff",
    children: [
      {
        label: "Teaching Staff B.Ed",
        slug: "teaching-staff-bed",
        pdfUrl: "/pdfs/teaching-staff-bed.pdf",
      },
      {
        label: "Teaching Staff D.El.Ed",
        slug: "teaching-staff-ded",
        pdfUrl: "/pdfs/teaching-staff-ded.pdf",
      },
      {
        label: "Non-Teaching Staff B.Ed",
        slug: "non-teaching-staff-bed",
        pdfUrl: "/pdfs/non-teaching-staff-bed.pdf",
      },
      {
        label: "Non-Teaching Staff D.El.Ed",
        slug: "non-teaching-staff-ded",
        pdfUrl: "/pdfs/non-teaching-staff-ded.pdf",
      },
      {
        label: "Faculty Documents",
        slug: "faculty-documents",
        pdfUrl: "/pdfs/faculty-documents.pdf",
      },
      {
        label: "Weekly Attendance",
        slug: "staff-weekly-attendance",
        pdfUrl: "/pdfs/staff-weekly-attendance.pdf",
      },
    ],
  },
  {
    label: "Weekly Attendance",
    children: [
      { label: "Students Attendance", slug: "students-attendance", type: "attendance", apiKey: "students" },
      { label: "Teachers Attendance", slug: "teachers-attendance", type: "attendance", apiKey: "teachers" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Library",              slug: "library",              pdfUrl: "/pdfs/library.pdf" },
      { label: "ICT Lab",              slug: "ict-lab",              pdfUrl: "/pdfs/ict-lab.pdf" },
      { label: "Art & Craft",          slug: "art-craft",            pdfUrl: "/pdfs/art-craft.pdf" },
      { label: "Curriculum",           slug: "curriculum",           pdfUrl: "/pdfs/curriculum.pdf" },
      { label: "Physical Education",   slug: "physical-education",   pdfUrl: "/pdfs/physical-education.pdf" },
      { label: "Mandatory Disclosure", slug: "mandatory-disclosure", pdfUrl: "/pdfs/mandatory-disclosure.pdf" },
   
    ],
  },
  { label: "Contact Us", slug: "/#contact-us", pdfUrl: null },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
