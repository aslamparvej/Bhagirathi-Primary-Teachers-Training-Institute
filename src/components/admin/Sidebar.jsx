import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const SIDEBAR_LINKS = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "📄", label: "Upload Attendance PDF", id: "uploads" },
];

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <aside
      className={`${sidebarOpen ? "w-56" : "w-16"} bg-[#003a6a] flex flex-col transition-all duration-300 shrink-0`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-3 border-b border-white/10 ${!sidebarOpen && "justify-center"}`}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        {sidebarOpen && (
          <div>
            <div className="text-white text-sm font-bold leading-tight">
              BPTTI
            </div>
            <div className="text-[#f59b18] text-[0.7rem] uppercase tracking-widest">
              Admin Portal
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => (
            <Link
            to={`/admin/${link.id}`}
              key={link.id}
              onClick={() => setActive(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all
                  ${
                    active === link.id
                      ? "bg-white/15 border-r-2 border-[#f59b18] text-white"
                      : "text-blue-200/70 hover:bg-white/8 hover:text-white"
                  }
                  ${!sidebarOpen && "justify-center px-0"}
                `}
            >
              <span className="text-base shrink-0">{link.icon}</span>
              {sidebarOpen && (
                <span className="text-xs font-medium">{link.label}</span>
              )}
            </Link>
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
  );
};

export default Sidebar;
