import React from "react";

const NEWS_ITEMS = [
  "B.Ed. Admission 2025 (Session: 2025–2027) — Applications Open Now",
  "D.El.Ed. Admission 2025 (Session: 2025–2027) — Apply Before Last Date",
  "International Seminar on Education & Global Peace — Brochure Available",
  "Academic Calendar for B.Ed. 2nd Semester (Session 2024–2026) Released",
  "National Education Day 2024 — Celebration at Institute Campus",
  "Revised Schedule for B.Ed. Admission 2024 — Check Notice Board",
];

const IMPORTANT_LINKS = [
  { name: "NCTE India", url: "http://ncte-india.org/ncte_new/" },
  { name: "WBBPE", url: "http://www.wbbpe.org" },
  { name: "WBUTTEPA", url: "http://www.wbuttepa.ac.in" },
  { name: "Vidya Lakshmi", url: "https://www.vidyalakshmi.co.in" },
];

const News = () => {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Latest News */}
        <div className="md:col-span-2">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">
            Updates
          </span>
          <h2 className="text-3xl font-black text-[#003a6a] mt-2 mb-6">
            Latest News
          </h2>
          <div className="space-y-3">
            {NEWS_ITEMS.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-[#003a6a] hover:shadow-md transition-all group"
              >
                <span className="bg-[#003a6a] text-white text-xs font-black px-2 py-1 rounded shrink-0 group-hover:bg-[#ff5421] transition-colors">
                  0{i + 1}
                </span>
                <span className="text-gray-700 text-sm font-medium group-hover:text-[#003a6a] transition-colors leading-snug">
                  {item}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Important Links + Notice */}
        <div className="space-y-6">
          <div>
            <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">
              Quick Access
            </span>
            <h3 className="text-2xl font-black text-[#003a6a] mt-2 mb-4">
              Important Links
            </h3>
            <div className="space-y-2">
              {IMPORTANT_LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-[#f59b18] hover:shadow-md transition-all text-sm font-bold text-[#003a6a]"
                >
                  <span className="text-[#f59b18]">🔗</span>
                  {l.name}
                  <span className="ml-auto text-gray-400 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Notice box */}
          <div className="bg-[#ff5421] text-white rounded-2xl p-6">
            <h3 className="font-black text-lg mb-2">📢 Admission Notice</h3>
            <p className="text-sm text-orange-100 leading-relaxed mb-4">
              B.Ed and D.El.Ed Admissions for the session 2025–2027 are opening
              soon. Check WBUTTEPA and WBBPE official portals for merit list
              updates.
            </p>
            <button className="bg-white text-[#ff5421] font-black text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-all">
              View Notification →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
