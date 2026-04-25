import { Search, BellDot } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-lg font-bold text-[#003a6a]">Dashboard</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search students, faculty…"
            className="text-xs pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-52 focus:outline-none focus:border-[#003a6a] transition-colors"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            <Search size={16} />
          </span>
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#003a6a] transition-colors">
          <span className="text-sm">
            <BellDot />
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff5421] rounded-full" />
        </button>

        {/* Admin avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#003a6a] flex items-center justify-center text-white text-xs font-black">
            AD
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-gray-800">
              Administrator
            </div>
            <div className="text-[10px] text-gray-400">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
