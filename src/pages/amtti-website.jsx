import { useState, useEffect, useRef } from "react";

const cssVars = `
  :root {
    --primary: #1a3a5c;
    --primary-light: #1e4d7b;
    --accent: #e8a020;
    --accent-light: #f5c150;
    --surface: #f4f7fb;
    --card: #ffffff;
    --text-primary: #0e1e2e;
    --text-secondary: #4a6080;
    --text-muted: #8a9bb0;
    --border: #dce6f0;
    --hero-bg: #0e1e2e;
    --gradient-1: linear-gradient(135deg, #1a3a5c 0%, #0e1e2e 100%);
    --gradient-accent: linear-gradient(135deg, #e8a020 0%, #f5c150 100%);
    --shadow-sm: 0 1px 4px rgba(14,30,46,0.08);
    --shadow-md: 0 4px 20px rgba(14,30,46,0.12);
    --shadow-lg: 0 12px 48px rgba(14,30,46,0.18);
    --radius: 14px;
    --radius-sm: 8px;
  }
`;

const newsItems = [
  { id: 1, title: "B.Ed. Admission 2023 (Session: 2023–2025) Coming Soon", date: "Oct 2023", tag: "Admission" },
  { id: 2, title: "D.El.Ed. Admission 2023 (Session: 2023–2025) Coming Soon", date: "Oct 2023", tag: "Admission" },
  { id: 3, title: "Academic Calendar for B.Ed. 2nd Semester (Session 2022–2024)", date: "Aug 2023", tag: "Academic" },
  { id: 4, title: "Academic Calendar for B.Ed. 4th Semester (Session 2021–2023)", date: "May 2023", tag: "Academic" },
  { id: 5, title: "International Seminar on Education & Global Peace — Brochure Available", date: "Mar 2023", tag: "Event" },
  { id: 6, title: "Revised Schedule for B.Ed. Admission 2022 (Session 2022–2024)", date: "Jul 2022", tag: "Admission" },
];

const importantLinks = [
  { name: "NCTE", url: "http://ncte-india.org/ncte_new/", desc: "National Council for Teacher Education" },
  { name: "WBBPE", url: "http://www.wbbpe.org", desc: "West Bengal Board of Primary Education" },
  { name: "WBUTTEPA", url: "http://www.wbuttepa.ac.in", desc: "WB University of Teachers Training" },
  { name: "ERC-NCTE", url: "http://www.ercncte.org/", desc: "Eastern Regional Committee, NCTE" },
  { name: "WBSED", url: "http://www.wbsed.gov.in", desc: "WB School Education Dept." },
  { name: "VIDYALAKSHMI", url: "https://www.vidyalakshmi.co.in/Students/", desc: "Education Loan Portal" },
  { name: "AISHE", url: "http://aishe.nic.in/aishe/home", desc: "All India Survey on Higher Education" },
  { name: "QCI", url: "http://www.qcin.org/index.php", desc: "Quality Council of India" },
];

const navItems = [
  { label: "Society", sub: ["Registration Certificate", "By Law", "Member", "Society Pan Card"] },
  { label: "Management", sub: [] },
  { label: "About", sub: ["General Information", "Campus & Infrastructure", "Land Documents", "Building Documents", "Photo Gallery"] },
  { label: "Course", sub: ["NCTE Order (D.El.Ed)", "Affiliation (D.El.Ed)", "Fee Structure (D.El.Ed)", "NCTE Order (B.Ed)", "Affiliation (B.Ed)", "Fee Structure (B.Ed)", "Academic Calendar"] },
  { label: "Staff", sub: ["Teaching Staff B.Ed", "Teaching Staff D.El.Ed", "Non-Teaching Staff", "Faculty Documents", "Weekly Attendance"] },
  { label: "Students", sub: ["B.Ed Students", "D.El.Ed Students", "Weekly Attendance"] },
  { label: "Fund", sub: ["Endowment Fund", "Reserve Fund", "Audit Report", "Balance Sheet"] },
  { label: "Resources", sub: ["Mandatory Disclosure", "Library", "ICT", "Art & Craft", "Curriculum"] },
  { label: "Contact", sub: [] },
];

const tagColors = {
  Admission: { bg: "#fff4e0", text: "#b87a00", border: "#f5c150" },
  Academic: { bg: "#e8f0fb", text: "#1a3a5c", border: "#9bb8d8" },
  Event: { bg: "#edfaf3", text: "#1a6640", border: "#6fcf9f" },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(14,30,46,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      transition: "all 0.4s ease",
    }}>
      {/* Top bar */}
      <div style={{ background: "var(--accent)", padding: "6px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#0e1e2e", fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>📍 Sajurmore, Dafahat, Murshidabad, WB — PIN 742224</span>
        <div style={{ display: "flex", gap: 16 }}>
          <span>☎ Enquiries Welcome</span>
          <a href="#" style={{ color: "#0e1e2e", fontWeight: 700, textDecoration: "none" }}>🔐 Login</a>
        </div>
      </div>

      <div style={{ padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%", background: "var(--gradient-accent)",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#0e1e2e",
            boxShadow: "0 0 0 3px rgba(232,160,32,0.3)"
          }}>AM</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "0.01em", lineHeight: 1.2 }}>
              A.M. Teachers' Training Institute
            </div>
            <div style={{ fontSize: 11, color: "var(--accent-light)", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
              D.El.Ed & B.Ed COLLEGE
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navItems.map((item) => (
            <div key={item.label} style={{ position: "relative" }}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}>
              <button style={{
                background: "none", border: "none", color: active === item.label ? "var(--accent)" : "rgba(255,255,255,0.85)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
                padding: "8px 10px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3,
                transition: "color 0.2s", letterSpacing: "0.01em"
              }}>
                {item.label} {item.sub.length > 0 && <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>}
              </button>
              {item.sub.length > 0 && active === item.label && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, minWidth: 220,
                  background: "rgba(14,30,46,0.98)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: var_radius,
                  padding: "8px 0", boxShadow: "var(--shadow-lg)", zIndex: 200
                }}>
                  {item.sub.map((s) => (
                    <a key={s} href="#" style={{
                      display: "block", padding: "9px 18px", color: "rgba(255,255,255,0.8)",
                      fontSize: 13, textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s", borderLeft: "2px solid transparent",
                    }}
                      onMouseEnter={e => { e.target.style.color = "var(--accent)"; e.target.style.borderLeftColor = "var(--accent)"; e.target.style.paddingLeft = "22px"; }}
                      onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.borderLeftColor = "transparent"; e.target.style.paddingLeft = "18px"; }}>
                      {s}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hack: use string literal for the radius var in JSX
const var_radius = "var(--radius)";

function HeroSection() {
  const slides = [
    { title: "Shaping Tomorrow's Educators", sub: "Premier D.El.Ed & B.Ed Teacher Education Programme in West Bengal" },
    { title: "Nurturing Knowledge, Inspiring Change", sub: "NCTE Recognized · WBU Affiliated · Co-Education Institute" },
    { title: "Excellence in Teacher Training Since 2013", sub: "Preparing Teachers for Elementary & Secondary Stages Across WB" },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", background: "var(--hero-bg)", position: "relative",
      display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      {/* Geometric background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: -120, right: -120, width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80, width: 400, height: 400,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(30,77,123,0.4) 0%, transparent 70%)"
        }} />
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "120px 64px 80px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 28
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>
                NCTE RECOGNIZED INSTITUTION
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 900,
              color: "#fff", lineHeight: 1.12, marginBottom: 20, letterSpacing: "-0.01em",
              minHeight: 140
            }}>
              {slides[current].title}
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.7,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 40, maxWidth: 480
            }}>
              {slides[current].sub}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#about" style={{
                background: "var(--gradient-accent)", color: "#0e1e2e",
                padding: "14px 30px", borderRadius: 100, fontWeight: 700, fontSize: 14,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em",
                boxShadow: "0 4px 20px rgba(232,160,32,0.35)", transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
                Explore Courses →
              </a>
              <a href="#about" style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", padding: "14px 30px", borderRadius: 100, fontWeight: 600, fontSize: 14,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                backdropFilter: "blur(8px)", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.06)"}>
                About Institute
              </a>
            </div>

            {/* Slide dots */}
            <div style={{ display: "flex", gap: 8, marginTop: 40 }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? 28 : 8, height: 8, borderRadius: 100,
                  background: i === current ? "var(--accent)" : "rgba(255,255,255,0.25)",
                  border: "none", cursor: "pointer", transition: "all 0.3s"
                }} />
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { num: "2013", label: "Established", icon: "🏛️" },
              { num: "D.El.Ed", label: "Elementary Programme", icon: "📚" },
              { num: "B.Ed", label: "Secondary Programme", icon: "🎓" },
              { num: "WB", label: "West Bengal Affiliated", icon: "📍" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: var_radius, padding: "28px 24px", backdropFilter: "blur(8px)",
                transition: "all 0.3s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,160,32,0.08)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{stat.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: "var(--accent)", marginBottom: 4 }}>{stat.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
        <span style={{ color: "#fff", fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #fff, transparent)" }} />
      </div>
    </section>
  );
}

function AlertBanner() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #1a3a5c 0%, #1e4d7b 100%)",
      padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
      borderBottom: "2px solid var(--accent)"
    }}>
      <span style={{ background: "var(--accent)", color: "#0e1e2e", fontWeight: 800, fontSize: 11, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>
        IMPORTANT
      </span>
      <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
        International Seminar on Education & Global Peace —
      </span>
      <a href="#" style={{ color: "var(--accent-light)", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", borderBottom: "1px dashed var(--accent)" }}>
        View Brochure →
      </a>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ background: "var(--surface)", padding: "96px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Text */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 3, background: "var(--accent)", borderRadius: 2 }} />
              <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>
                ABOUT THE INSTITUTE
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, marginBottom: 24 }}>
              Building the Foundation of Quality Education
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: 15.5, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>
              A.M. Teachers' Training Institute offers a composite programme — both D.El.Ed and B.Ed — to prepare teachers for both elementary and secondary stages of West Bengal. The Institute was established in <strong>2013</strong> to impart the D.El.Ed programme, receiving recognition and affiliation in 2014.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: 15.5, fontFamily: "'DM Sans', sans-serif", marginBottom: 32 }}>
              Subsequently, recognition was obtained from ERC NCTE for additional programmes from the academic session <strong>2016–17</strong>. Conveniently located near Berhampore city, adjacent to NH-34, and close to Nimtita Railway Station. A co-educational institution managed by a registered society.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: var_radius, padding: "24px 20px", borderLeft: "3px solid var(--accent)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: "var(--primary)", marginBottom: 8 }}>Mission</div>
                <p style={{ color: "var(--text-secondary)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                  To develop knowledge and skills of pre-service teachers required to transact learning materials at elementary and secondary stages.
                </p>
              </div>
              <div style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: var_radius, padding: "24px 20px", borderLeft: "3px solid var(--primary)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: "var(--primary)", marginBottom: 8 }}>Vision</div>
                <p style={{ color: "var(--text-secondary)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                  To create teachers of tomorrow with transformative knowledge of Indian tradition, ushering in a new era of vibrant teacher education.
                </p>
              </div>
            </div>
          </div>

          {/* Right features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "🏫", title: "State-of-the-Art Campus", desc: "Modern infrastructure with dedicated labs, library, and spacious classrooms set in a serene environment." },
              { icon: "📋", title: "NCTE Recognized", desc: "Fully recognized by the National Council for Teacher Education (ERC) with proper affiliation to the State University." },
              { icon: "👥", title: "Co-Education Institute", desc: "Open to all genders, fostering an inclusive learning environment managed by a registered society." },
              { icon: "🗺️", title: "Excellent Connectivity", desc: "Adjacent to NH-34, near Nimtita Railway Station — conveniently accessible from across West Bengal." },
            ].map((f, i) => (
              <div key={i} style={{
                background: "var(--card)", border: "1px solid var(--border)", borderRadius: var_radius,
                padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start",
                transition: "all 0.25s", cursor: "default",
                boxShadow: "var(--shadow-sm)"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14.5, color: "var(--text-primary)", marginBottom: 5 }}>{f.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section style={{ background: "var(--hero-bg)", padding: "96px 64px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,77,123,0.5) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 3, background: "var(--accent)", borderRadius: 2 }} />
            <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>OUR PROGRAMMES</span>
            <div style={{ width: 40, height: 3, background: "var(--accent)", borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.15 }}>
            Programmes We Offer
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            {
              code: "D.El.Ed", full: "Diploma in Elementary Education", duration: "2 Years", intake: "50 Seats",
              desc: "Prepares teachers for Classes I–VIII. Affiliated with WBBPE and recognized by NCTE (ERC). Focuses on child psychology, pedagogy, and inclusive education.", color: "var(--accent)",
              modules: ["Child Development & Learning", "Pedagogy of Language", "Mathematics Education", "Environmental Studies", "School Internship"]
            },
            {
              code: "B.Ed", full: "Bachelor of Education", duration: "2 Years", intake: "50 Seats",
              desc: "Prepares teachers for Classes IX–XII. Recognized by ERC-NCTE from session 2016–17. Affiliated with the State University of West Bengal.", color: "#7eb8f7",
              modules: ["Childhood & Growing Up", "Learning & Teaching", "Language Across Curriculum", "Understanding Disciplines", "Engagement with Field"]
            }
          ].map((course, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: var_radius, padding: "40px 36px", position: "relative", overflow: "hidden",
              transition: "all 0.3s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${course.color}18` }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: course.color, lineHeight: 1, marginBottom: 8 }}>{course.code}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: 20 }}>{course.full}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 24 }}>{course.desc}</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                {[{ label: "Duration", val: course.duration }, { label: "Intake", val: course.intake }].map(b => (
                  <div key={b.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: var_radius, padding: "10px 18px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{b.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: course.color }}>{b.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", marginBottom: 12 }}>CORE MODULES</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {course.modules.map(m => (
                    <span key={m} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${course.color}30`, borderRadius: 100, padding: "4px 12px", fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section style={{ background: "var(--surface)", padding: "96px 64px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 3, background: "var(--accent)", borderRadius: 2 }} />
              <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>LATEST UPDATES</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15 }}>
              News & Announcements
            </h2>
          </div>
          <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--primary)", textDecoration: "none", border: "1px solid var(--border)", padding: "10px 20px", borderRadius: 100, transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "var(--primary)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--primary)"; }}>
            View All →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {newsItems.map((item) => {
            const tc = tagColors[item.tag] || tagColors.Academic;
            return (
              <a key={item.id} href="#" style={{
                background: "var(--card)", border: "1px solid var(--border)", borderRadius: var_radius,
                padding: "24px 22px", textDecoration: "none", display: "block",
                transition: "all 0.25s", boxShadow: "var(--shadow-sm)"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>{item.tag}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item.date}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.55, margin: 0 }}>{item.title}</p>
                <div style={{ marginTop: 16, fontSize: 12, color: "var(--accent)", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Read more →</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LinksSection() {
  return (
    <section style={{ background: "var(--card)", padding: "80px 64px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 3, background: "var(--accent)", borderRadius: 2 }} />
          <span style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>REGULATORY BODIES</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "var(--text-primary)", marginBottom: 36 }}>Important Links</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {importantLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: var_radius,
              padding: "20px 18px", textDecoration: "none", transition: "all 0.25s",
              display: "flex", flexDirection: "column", gap: 6
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "#fffbf0"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: "var(--primary)", letterSpacing: "0.03em" }}>{link.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{link.desc}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Visit →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--hero-bg)", color: "rgba(255,255,255,0.5)", padding: "60px 64px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 12 }}>
              A.M. Teachers' Training Institute
            </div>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", marginBottom: 18 }}>D.El.Ed & B.Ed COLLEGE</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.8, maxWidth: 320 }}>
              Sajurmore, P.O-Dafahat, P.S-Suti<br />
              Dist–Murshidabad, West Bengal<br />
              PIN–742224
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.08em", marginBottom: 18 }}>QUICK LINKS</div>
            {["About Us", "Courses", "Staff", "Students", "Resources", "Contact Us"].map(l => (
              <a key={l} href="#" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", letterSpacing: "0.08em", marginBottom: 18 }}>LIVE STATS</div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: var_radius, padding: "18px" }}>
              {[{ label: "Online Users", val: "3", icon: "🟢" }, { label: "Total Visitors", val: "5,86,727", icon: "👁️" }].map(s => (
                <div key={s.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{s.icon} {s.label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: "var(--accent)" }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>© 2026–2027 AMTTI. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Monday, 6 April 2026</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{cssVars + `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: var(--surface); }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        html { scroll-behavior: smooth; }
        a { cursor: pointer; }
        button { cursor: pointer; }
      `}</style>
      <Navbar />
      <HeroSection />
      <AlertBanner />
      <AboutSection />
      <CoursesSection />
      <NewsSection />
      <LinksSection />
      <Footer />
    </>
  );
}
