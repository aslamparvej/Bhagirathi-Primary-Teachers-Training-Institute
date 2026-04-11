import React, { useState, useEffect } from "react";

const slides = [
  {
    tag: "Admissions Open 2025–27",
    title: "Shaping the Educators of Tomorrow",
    sub: "B.Ed & D.El.Ed programmes recognised by NCTE and affiliated to WBUTTEPA",
    cta: "Apply for Admission",
    bg: "from-[#003a6a] to-[#005fa8]",
  },
  {
    tag: "NCTE Recognised",
    title: "Excellence in Teacher Education",
    sub: "Preparing skilled, compassionate and innovative teachers for elementary & secondary stages",
    cta: "Explore Courses",
    bg: "from-[#003a6a] to-[#001f3f]",
  },
  {
    tag: "Modern Campus",
    title: "A Campus Built for Learning",
    sub: "Smart classrooms, modern library, ICT lab and green surroundings — all near NH-34",
    cta: "Discover Campus",
    bg: "from-[#001f3f] to-[#003a6a]",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      5000,
    );

    return () => clearInterval(t);
  }, []);

  const s = slides[active];

  return (
    <section
      className={`relative bg-linear-to-br from-[#001f3f] to-[#003a6a]`}
      id="hero"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5421] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f59b18] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-[#f59b18] opacity-20 rounded-full" />
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
            <line
              key={v}
              x1={v}
              y1="0"
              x2={v}
              y2="100"
              stroke="white"
              strokeWidth="0.2"
            />
          ))}
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
            <line
              key={v}
              x1="0"
              y1={v}
              x2="100"
              y2={v}
              stroke="white"
              strokeWidth="0.2"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        <div key={active} style={{ animation: "fadeSlideIn 0.6s ease" }}>
          <span className="inline-block bg-[#ff5421] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            {s.tag}
          </span>
          <h2 className="text-4xl md:text-5xl text-white leading-tight mb-5">
            {s.title}
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-xl">
            {s.sub}
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#ff5421] hover:bg-[#e04418] text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {s.cta} →
            </button>
            <button className="border-2 border-white/50 hover:border-white text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
        </div>

        {/* Placeholder visual */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Courses", val: "B.Ed & D.El.Ed", icon: "📚" },
                  { label: "Affiliation", val: "NCTE / WBUTTEPA", icon: "🏅" },
                  { label: "Established", val: "2013", icon: "📅" },
                  { label: "Location", val: "Murshidabad, WB", icon: "📍" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-blue-300 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="font-bold text-sm mt-0.5 text-white">{item.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#ff5421]/20 rounded-xl p-4 border border-[#ff5421]/40">
                <div className="text-[#f59b18] text-xs font-bold uppercase tracking-wider mb-1">
                  🔔 Important Notice
                </div>
                <div className="text-sm text-white/90">
                  B.Ed & D.El.Ed Admissions for 2025–27 are now open. Contact us
                  for details.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-[#f59b18] w-8" : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
