import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#001f3f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#003a6a] border-2 border-[#f59b18] flex items-center justify-center font-black text-[#f59b18]">
              A
            </div>
            <div>
              <div className="font-black text-sm leading-tight">
                A.M. Teachers' Training
              </div>
              <div className="text-[10px] text-[#f59b18] uppercase tracking-wider">
                Institute
              </div>
            </div>
          </div>
          <p className="text-blue-200 text-xs leading-relaxed">
            NCTE recognised teacher education institution in Murshidabad, West
            Bengal offering B.Ed and D.El.Ed programmes since 2013.
          </p>
        </div>

        {[
          {
            title: "Quick Links",
            links: ["Home", "About", "Courses", "Staff", "Students", "Contact"],
          },
          {
            title: "Courses",
            links: [
              "B.Ed Programme",
              "D.El.Ed Programme",
              "Fee Structure",
              "Academic Calendar",
              "Internship",
            ],
          },
          {
            title: "Resources",
            links: [
              "Library",
              "ICT Lab",
              "Photo Gallery",
              "Mandatory Disclosure",
              "Audit Report",
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-black text-[#f59b18] text-sm uppercase tracking-wider mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-blue-200 text-xs hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-400">
        © 2025 A.M. Teachers' Training Institute · All Rights Reserved ·
        Murshidabad, West Bengal
      </div>
    </footer>
  );
};

export default Footer;
