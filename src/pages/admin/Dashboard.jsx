import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Students", value: "487", change: "+12 this session", icon: "🎓", color: "bg-[#003a6a]", text: "text-white" },
  { label: "B.Ed Enrolled", value: "264", change: "Session 2023–25", icon: "📘", color: "bg-[#ff5421]", text: "text-white" },
  { label: "D.El.Ed Enrolled", value: "223", change: "Session 2023–25", icon: "📗", color: "bg-[#f59b18]", text: "text-[#003a6a]" },
  { label: "Total Faculty", value: "28", change: "Teaching + Non-teaching", icon: "👨‍🏫", color: "bg-white border border-gray-200", text: "text-[#003a6a]" },
];

const RECENT_ADMISSIONS = [
  { name: "Priya Sharma", course: "B.Ed", roll: "BED2025001", date: "10 Apr 2025", status: "Confirmed" },
  { name: "Rahul Mondal", course: "D.El.Ed", roll: "DED2025042", date: "09 Apr 2025", status: "Pending" },
  { name: "Anjali Das", course: "B.Ed", roll: "BED2025002", date: "09 Apr 2025", status: "Confirmed" },
  { name: "Sourav Islam", course: "D.El.Ed", roll: "DED2025043", date: "08 Apr 2025", status: "Confirmed" },
  { name: "Meera Roy", course: "B.Ed", roll: "BED2025003", date: "07 Apr 2025", status: "Review" },
];

const NOTICES = [
  { title: "B.Ed 2nd Semester Academic Calendar Released", date: "08 Apr 2025", type: "Academic" },
  { title: "Admission portal closes on 30 April 2025", date: "07 Apr 2025", type: "Admission" },
  { title: "Faculty meeting scheduled — 15 Apr 2025", date: "06 Apr 2025", type: "Staff" },
  { title: "International Seminar on Education & Global Peace", date: "01 Apr 2025", type: "Event" },
  { title: "Biometric attendance report — March 2025 uploaded", date: "31 Mar 2025", type: "Admin" },
];

const SIDEBAR_LINKS = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "📄", label: "Add Attendance PDF", id: "add-pdf"},
];

const ATTENDANCE_DATA = [
  { month: "Oct", bed: 88, ded: 84 },
  { month: "Nov", bed: 91, ded: 87 },
  { month: "Dec", bed: 76, ded: 79 },
  { month: "Jan", bed: 85, ded: 82 },
  { month: "Feb", bed: 93, ded: 90 },
  { month: "Mar", bed: 89, ded: 86 },
];

const STATUS_COLOR = {
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Review: "bg-blue-50 text-blue-700 border-blue-200",
};

const NOTICE_COLOR = {
  Academic: "bg-[#003a6a]/10 text-[#003a6a]",
  Admission: "bg-[#ff5421]/10 text-[#ff5421]",
  Staff: "bg-purple-100 text-purple-700",
  Event: "bg-[#f59b18]/15 text-[#7a5300]",
  Admin: "bg-gray-100 text-gray-600",
};

// ── Bar chart (pure CSS) ─────────────────────────────────────────
function AttendanceChart() {
  const max = 100;
  return (
    <div>
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-3 h-3 rounded-sm bg-[#003a6a] inline-block" /> B.Ed
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-3 h-3 rounded-sm bg-[#f59b18] inline-block" /> D.El.Ed
        </div>
      </div>
      <div className="flex items-end gap-3 h-36">
        {ATTENDANCE_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-1 items-end" style={{ height: "112px" }}>
              <div
                className="flex-1 bg-[#003a6a] rounded-t-md transition-all"
                style={{ height: `${(d.bed / max) * 112}px` }}
                title={`B.Ed: ${d.bed}%`}
              />
              <div
                className="flex-1 bg-[#f59b18] rounded-t-md transition-all"
                style={{ height: `${(d.ded / max) * 112}px` }}
                title={`D.El.Ed: ${d.ded}%`}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut chart (SVG) ─────────────────────────────────────────────
function EnrollmentDonut() {
  const bed = 264, ded = 223, total = bed + ded;
  const r = 48, cx = 60, cy = 60;
  const circ = 2 * Math.PI * r;
  const bedArc = (bed / total) * circ;
  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth="14" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="#f59b18" strokeWidth="14"
          strokeDasharray={`${circ - bedArc} ${bedArc}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
        />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="#003a6a" strokeWidth="14"
          strokeDasharray={`${bedArc} ${circ - bedArc}`}
          strokeDashoffset={circ * 0.25 + (circ - bedArc)}
          strokeLinecap="round"
        />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#003a6a">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#888">Total</text>
      </svg>
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#003a6a] inline-block" />
            <span className="text-xs font-semibold text-gray-700">B.Ed</span>
          </div>
          <div className="text-xl font-black text-[#003a6a]">{bed}</div>
          <div className="text-[10px] text-gray-400">{Math.round(bed/total*100)}% of total</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59b18] inline-block" />
            <span className="text-xs font-semibold text-gray-700">D.El.Ed</span>
          </div>
          <div className="text-xl font-black text-[#f59b18]">{ded}</div>
          <div className="text-[10px] text-gray-400">{Math.round(ded/total*100)}% of total</div>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Lora:wght@600;700&display=swap');
        * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
        h1,h2,h3,h4 { font-family: 'Lora', serif; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>

      <div className="flex h-screen bg-[#f4f6fb] overflow-hidden text-gray-800">

        {/* ── Sidebar ── */}
        <aside
          className={`${sidebarOpen ? "w-56" : "w-16"} bg-[#003a6a] flex flex-col transition-all duration-300 shrink-0`}
        >
          {/* Logo */}
          <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${!sidebarOpen && "justify-center"}`}>
            <div className="w-9 h-9 rounded-full bg-[#f59b18] flex items-center justify-center text-[#003a6a] font-black text-base shrink-0">
              A
            </div>
            {sidebarOpen && (
              <div>
                <div className="text-white text-xs font-bold leading-tight">AMTTI</div>
                <div className="text-[#f59b18] text-[9px] uppercase tracking-widest">Admin Portal</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {SIDEBAR_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => setActive(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all
                  ${active === link.id
                    ? "bg-white/15 border-r-2 border-[#f59b18] text-white"
                    : "text-blue-200/70 hover:bg-white/8 hover:text-white"
                  }
                  ${!sidebarOpen && "justify-center px-0"}
                `}
              >
                <span className="text-base shrink-0">{link.icon}</span>
                {sidebarOpen && <span className="text-xs font-medium">{link.label}</span>}
              </button>
            ))}
          </nav>

          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center gap-2 px-4 py-4 border-t border-white/10 text-blue-200/60 hover:text-white transition-colors text-xs ${!sidebarOpen && "justify-center"}`}
          >
            <span>{sidebarOpen ? "◀" : "▶"}</span>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </aside>

        {/* ── Main area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Topbar */}
          <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-lg font-bold text-[#003a6a]">Dashboard</h1>
              <p className="text-xs text-gray-400 mt-0.5">Saturday, 11 April 2025</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search students, faculty…"
                  className="text-xs pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-52 focus:outline-none focus:border-[#003a6a] transition-colors"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              </div>

              {/* Notification bell */}
              <button className="relative w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#003a6a] transition-colors">
                <span className="text-sm">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff5421] rounded-full" />
              </button>

              {/* Admin avatar */}
              <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-[#003a6a] flex items-center justify-center text-white text-xs font-black">
                  AD
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-gray-800">Administrator</div>
                  <div className="text-[10px] text-gray-400">Super Admin</div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">

            {/* Welcome banner */}
            <div className="bg-[#003a6a] rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#ff5421]/15 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute right-20 bottom-0 w-28 h-28 bg-[#f59b18]/10 rounded-full translate-y-1/2 pointer-events-none" />
              <div className="relative">
                <p className="text-blue-200 text-xs mb-1">Good morning 👋</p>
                <h2 className="text-white text-xl font-bold mb-1">Welcome back, Administrator</h2>
                <p className="text-blue-200/70 text-xs">
                  A.M. Teachers' Training Institute · Murshidabad, WB
                </p>
              </div>
              <div className="relative hidden md:flex gap-4">
                {[
                  { label: "Pending Admissions", val: "14", color: "bg-[#ff5421]" },
                  { label: "Today's Attendance", val: "91%", color: "bg-[#f59b18]" },
                ].map((b) => (
                  <div key={b.label} className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center">
                    <div className={`text-xl font-black text-white`}>{b.val}</div>
                    <div className="text-blue-200/70 text-[10px] mt-0.5">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {STATS.map((s) => (
                <div key={s.label} className={`${s.color} rounded-2xl p-5 shadow-sm`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.text === "text-white" ? "bg-white/15 text-white/80" : "bg-[#003a6a]/10 text-[#003a6a]/70"}`}>
                      ↑ Active
                    </span>
                  </div>
                  <div className={`text-3xl font-black ${s.text}`}>{s.value}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${s.text}`}>{s.label}</div>
                  <div className={`text-[10px] mt-1 ${s.text === "text-white" ? "opacity-60" : "opacity-50"}`}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid lg:grid-cols-3 gap-4 mb-6">
              {/* Attendance bar chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-bold text-[#003a6a]">Monthly Attendance</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Oct 2024 – Mar 2025</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg">2024–25</span>
                </div>
                <AttendanceChart />
              </div>

              {/* Enrollment donut */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-5">
                  <h3 className="text-sm font-bold text-[#003a6a]">Enrollment Split</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Current session</p>
                </div>
                <EnrollmentDonut />
                <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                  <div className="text-xs text-gray-400">Annual Intake Capacity</div>
                  <div className="text-sm font-bold text-[#003a6a] mt-0.5">B.Ed: 50 &nbsp;·&nbsp; D.El.Ed: 50</div>
                </div>
              </div>
            </div>

            {/* Tables row */}
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Recent admissions */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-[#003a6a]">Recent Admissions</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Latest student registrations</p>
                  </div>
                  <button className="text-xs text-[#ff5421] font-semibold hover:underline">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Name", "Course", "Roll No.", "Date", "Status"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_ADMISSIONS.map((s, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#003a6a]/10 flex items-center justify-center text-[#003a6a] text-[10px] font-black shrink-0">
                                {s.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium text-gray-800 whitespace-nowrap">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.course === "B.Ed" ? "bg-[#003a6a]/10 text-[#003a6a]" : "bg-[#f59b18]/15 text-[#7a5300]"}`}>
                              {s.course}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 font-mono text-[10px]">{s.roll}</td>
                          <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{s.date}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLOR[s.status]}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notices */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-bold text-[#003a6a]">Latest Notices</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Recent announcements</p>
                  </div>
                  <button className="text-xs text-[#ff5421] font-semibold hover:underline">Post new →</button>
                </div>
                <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
                  {NOTICES.map((n, i) => (
                    <div key={i} className="px-5 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${NOTICE_COLOR[n.type]}`}>
                          {n.type}
                        </span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">{n.date}</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-snug font-medium">{n.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick actions row */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "➕", label: "Add Student", color: "hover:border-[#003a6a] hover:bg-[#003a6a]/5" },
                { icon: "📋", label: "New Admission", color: "hover:border-[#ff5421] hover:bg-[#ff5421]/5" },
                { icon: "📢", label: "Post Notice", color: "hover:border-[#f59b18] hover:bg-[#f59b18]/5" },
                { icon: "📊", label: "Generate Report", color: "hover:border-[#003a6a] hover:bg-[#003a6a]/5" },
              ].map((a) => (
                <button
                  key={a.label}
                  className={`bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3 text-sm font-semibold text-gray-700 transition-all ${a.color}`}
                >
                  <span className="text-lg">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
