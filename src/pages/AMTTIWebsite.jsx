import { useState, useEffect, useRef } from "react";

// ── Color tokens ──────────────────────────────────────────────────
// Navy  : #003a6a   Accent/Orange : #ff5421   Gold : #f59b18

const NAV_LINKS = [
  {
    label: "Society",
    children: [
      "Registration Certificate","By Law","Members","Society Pan Card",
    ],
  },
  { label: "Management" },
  {
    label: "About",
    children: [
      "General Information","Campus & Infrastructure","Land Documents",
      "Building Documents","Building Plan","Photo Gallery",
    ],
  },
  {
    label: "Courses",
    children: [
      "NCTE Order (D.El.Ed)","Affiliation (D.El.Ed)","Fee Structure (D.El.Ed)",
      "Internship (D.El.Ed)","Annual Intake (D.El.Ed)",
      "NCTE Order (B.Ed)","Affiliation (B.Ed)","Fee Structure (B.Ed)",
      "Internship (B.Ed)","Annual Intake (B.Ed)","Academic Calendar",
    ],
  },
  {
    label: "Staff",
    children: [
      "Teaching Staff B.Ed","Teaching Staff D.El.Ed",
      "Non-Teaching Staff B.Ed","Non-Teaching Staff D.El.Ed",
      "Faculty Documents","Weekly Attendance",
    ],
  },
  {
    label: "Students",
    children: ["B.Ed Students","D.El.Ed Students","Weekly Attendance"],
  },
  {
    label: "Resources",
    children: ["Library","ICT Lab","Art & Craft","Curriculum","Physical Education","Mandatory Disclosure"],
  },
  { label: "Contact Us" },
];

const NEWS_ITEMS = [
  "B.Ed. Admission 2025 (Session: 2025–2027) — Applications Open Now",
  "D.El.Ed. Admission 2025 (Session: 2025–2027) — Apply Before Last Date",
  "International Seminar on Education & Global Peace — Brochure Available",
  "Academic Calendar for B.Ed. 2nd Semester (Session 2024–2026) Released",
  "National Education Day 2024 — Celebration at Institute Campus",
  "Revised Schedule for B.Ed. Admission 2024 — Check Notice Board",
];

const STATS = [
  { value: "2013", label: "Established", icon: "🏛️" },
  { value: "500+", label: "Students Enrolled", icon: "🎓" },
  { value: "25+", label: "Expert Faculty", icon: "👨‍🏫" },
  { value: "2", label: "Programmes Offered", icon: "📚" },
];

const FACILITIES = [
  { icon: "📖", title: "Library", desc: "Well-stocked library with thousands of reference books, journals and digital resources for research and study." },
  { icon: "💻", title: "ICT Lab", desc: "Modern computer lab with high-speed internet, enabling technology-integrated learning for future educators." },
  { icon: "🎨", title: "Art & Craft", desc: "Dedicated space for creative arts, enabling student-teachers to integrate arts education in classrooms." },
  { icon: "⚽", title: "Physical Education", desc: "Spacious grounds and sports facilities that promote health, teamwork and physical development." },
  { icon: "🏫", title: "Smart Classrooms", desc: "Digitally equipped classrooms with projectors and interactive boards for modern pedagogy." },
  { icon: "🌿", title: "Green Campus", desc: "Eco-friendly campus adjacent to NH-34, near Nimtita Railway Station, ensuring easy accessibility." },
];

const IMPORTANT_LINKS = [
  { name: "NCTE India", url: "http://ncte-india.org/ncte_new/" },
  { name: "WBBPE", url: "http://www.wbbpe.org" },
  { name: "WBUTTEPA", url: "http://www.wbuttepa.ac.in" },
  { name: "Vidya Lakshmi", url: "https://www.vidyalakshmi.co.in" },
];

// ── Utility: counter animation ────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    if (!num) { setCount(target); return; }
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Sub-components ───────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav ref={navRef} className="bg-[#003a6a] text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop */}
        <ul className="hidden lg:flex items-center">
          {NAV_LINKS.map((link) => (
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
                  className="absolute top-full left-0 bg-white text-[#003a6a] min-w-[220px] shadow-2xl rounded-b-xl z-50 overflow-hidden border-t-4 border-[#ff5421]"
                >
                  {link.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block px-5 py-3 text-sm hover:bg-[#003a6a] hover:text-white transition-colors border-b border-gray-100 last:border-0"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <span className="font-bold text-sm">AMTTI Navigation</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-2xl">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden pb-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <button
                  onClick={() => setOpen(open === link.label ? null : link.label)}
                  className="w-full text-left px-3 py-2.5 font-semibold hover:bg-[#ff5421] rounded text-sm transition-colors"
                >
                  {link.label} {link.children && "▾"}
                </button>
                {link.children && open === link.label && (
                  <div className="pl-4 border-l-2 border-[#f59b18] ml-3 mb-2">
                    {link.children.map((c) => (
                      <a key={c} href="#" className="block py-1.5 text-xs text-blue-200 hover:text-white">
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
}

// Animated ticker
function NewsTicker() {
  return (
    <div className="bg-[#f59b18] text-[#003a6a] py-2 overflow-hidden flex items-center gap-4">
      <span className="bg-[#003a6a] text-white text-xs font-black px-4 py-1 shrink-0 uppercase tracking-widest">
        Latest News
      </span>
      <div className="overflow-hidden flex-1">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "ticker 28s linear infinite" }}
        >
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((n, i) => (
            <span key={i} className="text-sm font-semibold shrink-0">
              🔔 {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero carousel (CSS-based)
function HeroSlider() {
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

  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[active];

  return (
    <section className={`relative bg-gradient-to-br ${s.bg} text-white overflow-hidden min-h-[520px] flex items-center`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5421] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f59b18] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-[#f59b18] opacity-20 rounded-full" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0,10,20,30,40,50,60,70,80,90,100].map(v => (
            <line key={v} x1={v} y1="0" x2={v} y2="100" stroke="white" strokeWidth="0.2" />
          ))}
          {[0,10,20,30,40,50,60,70,80,90,100].map(v => (
            <line key={v} x1="0" y1={v} x2="100" y2={v} stroke="white" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        <div key={active} style={{ animation: "fadeSlideIn 0.6s ease" }}>
          <span className="inline-block bg-[#ff5421] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            {s.tag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5">
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
                    <div className="text-xs text-blue-300 uppercase tracking-wider">{item.label}</div>
                    <div className="font-bold text-sm mt-0.5">{item.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#ff5421]/20 rounded-xl p-4 border border-[#ff5421]/40">
                <div className="text-[#f59b18] text-xs font-bold uppercase tracking-wider mb-1">🔔 Important Notice</div>
                <div className="text-sm text-white/90">B.Ed & D.El.Ed Admissions for 2025–27 are now open. Contact us for details.</div>
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
}

function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#003a6a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => {
          const val = useCountUp(s.value, 1600, visible);
          return (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59b18]/50 hover:bg-white/10 transition-all">
              <div className="text-4xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black text-[#f59b18]">{val}</div>
              <div className="text-blue-200 text-sm font-medium mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">Who We Are</span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2 mb-6 leading-tight">
            About the Institute
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            A.M. Teachers' Training Institute offers composite programmes — both <strong className="text-[#003a6a]">D.El.Ed</strong> and <strong className="text-[#003a6a]">B.Ed</strong> — preparing teachers for both elementary and secondary stages of education in West Bengal.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            The institute was established in <strong>2013</strong> to impart the D.El.Ed programme, receiving recognition and affiliation in 2014. Subsequently, it was granted recognition from ERC NCTE for both programmes from the academic session 2016–17.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Situated adjacent to <strong>NH-34</strong> near Nimtita Railway Station in Murshidabad, the institute offers a highly accessible, co-educational environment with a congenial atmosphere for students and faculty alike.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#003a6a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#002a52] transition-all shadow hover:shadow-md">
              General Information →
            </button>
            <button className="bg-[#ff5421] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e04418] transition-all shadow hover:shadow-md">
              Photo Gallery →
            </button>
          </div>
        </div>

        {/* Mission / Vision cards */}
        <div className="grid gap-6">
          <div className="bg-[#003a6a] text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5421] opacity-20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="text-[#f59b18] text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-black mb-3">Our Mission</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              To develop the knowledge and skills of pre-service teachers required to transact learning materials at the elementary and secondary stages of education effectively.
            </p>
          </div>
          <div className="bg-[#f59b18] text-[#003a6a] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#003a6a] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="text-[#003a6a] text-3xl mb-3">🔭</div>
            <h3 className="text-xl font-black mb-3">Our Vision</h3>
            <p className="text-[#003a6a]/80 text-sm leading-relaxed">
              To create teachers of tomorrow with transformative knowledge of Indian tradition and usher in a new era of teacher education, making the institute a vibrant center of excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">Programmes</span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2">Our Courses</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">NCTE-recognised programmes designed to shape compassionate, skilled and reflective educators.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* B.Ed */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-[#003a6a] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black opacity-5 select-none leading-none">B</div>
              <span className="bg-[#ff5421] text-white text-xs px-3 py-1 rounded-full font-bold uppercase mb-4 inline-block">2-Year Programme</span>
              <h3 className="text-3xl font-black mb-2">B.Ed</h3>
              <p className="text-blue-200 text-sm">Bachelor of Education</p>
            </div>
            <div className="p-8 bg-gray-50">
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                {["Recognised by NCTE (ERC)","Affiliated to WBUTTEPA","For Secondary & Senior Secondary Teaching","Semesterised Programme with 4 Semesters","Internship in School Integration"].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#ff5421] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-[#003a6a] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#002a52] transition-all">
                  Fee Structure
                </button>
                <button className="border-2 border-[#003a6a] text-[#003a6a] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#003a6a] hover:text-white transition-all">
                  Annual Intake
                </button>
              </div>
            </div>
          </div>

          {/* D.El.Ed */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-[#ff5421] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black opacity-10 select-none leading-none">D</div>
              <span className="bg-[#003a6a] text-white text-xs px-3 py-1 rounded-full font-bold uppercase mb-4 inline-block">2-Year Programme</span>
              <h3 className="text-3xl font-black mb-2">D.El.Ed</h3>
              <p className="text-orange-100 text-sm">Diploma in Elementary Education</p>
            </div>
            <div className="p-8 bg-gray-50">
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                {["Recognised by NCTE (ERC)","Affiliated to WBBPE","For Elementary Stage Teaching (Class I–VIII)","Semesterised Programme with 4 Semesters","Internship & Practicum Included"].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#ff5421] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-[#ff5421] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e04418] transition-all">
                  Fee Structure
                </button>
                <button className="border-2 border-[#ff5421] text-[#ff5421] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#ff5421] hover:text-white transition-all">
                  Annual Intake
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 bg-[#003a6a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#f59b18] font-black text-xs uppercase tracking-widest">Infrastructure</span>
          <h2 className="text-4xl font-black mt-2">Campus Facilities</h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">A well-equipped campus designed to support holistic learning and development.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 hover:border-[#f59b18]/60 hover:bg-white/10 rounded-2xl p-6 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
              <h3 className="text-lg font-black mb-2 group-hover:text-[#f59b18] transition-colors">{f.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Latest News */}
        <div className="md:col-span-2">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">Updates</span>
          <h2 className="text-3xl font-black text-[#003a6a] mt-2 mb-6">Latest News</h2>
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
            <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">Quick Access</span>
            <h3 className="text-2xl font-black text-[#003a6a] mt-2 mb-4">Important Links</h3>
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
              B.Ed and D.El.Ed Admissions for the session 2025–2027 are opening soon. Check WBUTTEPA and WBBPE official portals for merit list updates.
            </p>
            <button className="bg-white text-[#ff5421] font-black text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-all">
              View Notification →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManagementSection() {
  const members = [
    { name: "Secretary", title: "Institute Secretary", initials: "S" },
    { name: "Principal", title: "Head of Institution", initials: "P" },
    { name: "Administrator", title: "Academic Administrator", initials: "A" },
    { name: "Coordinator", title: "B.Ed Programme Coordinator", initials: "C" },
  ];
  return (
    <section id="management" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">Leadership</span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2">Management &amp; Faculty</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our dedicated team of experienced educators and administrators committed to quality teacher education.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <div key={m.name} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#003a6a] hover:shadow-lg transition-all group">
              <div className="w-20 h-20 rounded-full bg-[#003a6a] text-white text-2xl font-black flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff5421] transition-colors shadow-lg">
                {m.initials}
              </div>
              <h4 className="font-black text-[#003a6a]">{m.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{m.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border-2 border-[#003a6a] text-[#003a6a] px-8 py-3 rounded-xl font-bold hover:bg-[#003a6a] hover:text-white transition-all">
            View All Staff →
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#003a6a] text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-[#f59b18] font-black text-xs uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-4xl font-black mt-2 mb-6">Contact Us</h2>
          <div className="space-y-5">
            {[
              { icon: "📍", label: "Address", val: "Sajurmore, P.O-Dafahat, P.S-Suti, Dist-Murshidabad, West Bengal — 742224" },
              { icon: "📞", label: "Phone", val: "+91-XXXX-XXXXXX" },
              { icon: "✉️", label: "Email", val: "info@amttided.org" },
              { icon: "🚂", label: "Nearest Station", val: "Nimtita Railway Station" },
              { icon: "🛣️", label: "Highway", val: "Adjacent to NH-34" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start bg-white/5 rounded-xl p-4 border border-white/10">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[#f59b18] text-xs font-black uppercase tracking-wider">{item.label}</div>
                  <div className="text-white/90 text-sm mt-0.5">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick contact form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-black mb-6">Send a Message</h3>
          <div className="space-y-4">
            {[
              { placeholder: "Your Full Name", type: "text" },
              { placeholder: "Email Address", type: "email" },
              { placeholder: "Phone Number", type: "tel" },
            ].map((f) => (
              <input
                key={f.placeholder}
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#f59b18] transition-colors text-sm"
              />
            ))}
            <textarea
              placeholder="Your Message or Query"
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#f59b18] transition-colors text-sm resize-none"
            />
            <button className="w-full bg-[#ff5421] hover:bg-[#e04418] text-white py-3.5 rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl">
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function AMTTIWebsite() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <NewsTicker />
        <HeroSlider />
        <StatsSection />
        <AboutSection />
        <CoursesSection />
        <FacilitiesSection />
        <NewsSection />
        <ManagementSection />
        <ContactSection />
      </div>
    </>
  );
}
