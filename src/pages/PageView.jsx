import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSection from "../components/UI/HeaderSection";
import Footer from "../components/Footer";
import API from "../services/api";

function getFileType(url) {
  const cleanUrl = url.split("?")[0];
  const extension = cleanUrl.split(".").pop().toLowerCase();
  if (extension === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) return "image";
  return "unknown";
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const isAttendancePage = (slug) =>
  slug === "students-attendance" || slug === "teachers-attendance";

// ── Date Range Filter ────────────────────────────────────────────────────────

const DateRangeFilter = ({ filterFrom, filterTo, onChange, onClear, total, filtered }) => (
  <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Filter by date
    </div>

    <div className="flex items-center gap-2 flex-wrap">
      <label className="flex items-center gap-1.5 text-xs text-gray-500">
        From
        <input
          type="date"
          value={filterFrom}
          onChange={(e) => onChange("from", e.target.value)}
          className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003a6a]/20 focus:border-[#003a6a]"
        />
      </label>
      <label className="flex items-center gap-1.5 text-xs text-gray-500">
        To
        <input
          type="date"
          value={filterTo}
          onChange={(e) => onChange("to", e.target.value)}
          className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003a6a]/20 focus:border-[#003a6a]"
        />
      </label>
    </div>

    {(filterFrom || filterTo) && (
      <button
        onClick={onClear}
        className="text-xs text-red-400 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Clear
      </button>
    )}

    <span className="ml-auto text-[11px] text-gray-400 font-mono">
      {filtered} / {total} record{total !== 1 ? "s" : ""}
    </span>
  </div>
);

// ── PDF Card ─────────────────────────────────────────────────────────────────

const PdfCard = ({ item, isActive, onClick }) => (
  <button
    onClick={() => onClick(item)}
    className={`w-full text-left rounded-xl border px-4 py-3 flex items-start gap-3 transition-all ${
      isActive
        ? "border-[#003a6a] bg-[#003a6a]/5 shadow-sm"
        : "border-gray-200 bg-white hover:border-[#003a6a]/40 hover:bg-gray-50"
    }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${isActive ? "bg-[#003a6a]" : "bg-[#ff5421]/10"}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#ff5421"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="13" y2="17"/>
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold truncate ${isActive ? "text-[#003a6a]" : "text-gray-700"}`}>
        {item.title}
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5">
        {formatDate(item.dateRange.start)} → {formatDate(item.dateRange.end)}
      </p>
    </div>
    {isActive && (
      <span className="text-[10px] font-bold bg-[#003a6a] text-white px-2 py-0.5 rounded-full shrink-0 mt-1">
        Viewing
      </span>
    )}
  </button>
);

// ── PDF Viewer ────────────────────────────────────────────────────────────────

const PdfViewer = ({ item }) => {
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(item.fileUrl)}&embedded=true`;

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#ff5421]/10 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5421" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="13" y2="17"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#003a6a] truncate">{item.title}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {formatDate(item.dateRange.start)} – {formatDate(item.dateRange.end)}
          </p>
        </div>
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-[#003a6a] border border-[#003a6a]/20 px-3 py-1.5 rounded-lg hover:bg-[#003a6a]/5 transition-colors shrink-0"
        >
          Open ↗
        </a>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ minHeight: "70vh" }}>
        <iframe
          src={viewerUrl}
          title={item.title}
          className="w-full h-full"
          style={{ border: "none", minHeight: "70vh", display: "block" }}
        />
      </div>
    </div>
  );
};

// ── Static PDF Page ───────────────────────────────────────────────────────────

const StaticPdfPage = ({ page }) => (
  <div className="p-6 flex flex-col gap-3 min-h-0">
    <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
      <div className="w-9 h-9 rounded-xl bg-[#ff5421]/10 flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff5421" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="13" y2="17"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#003a6a] truncate">{page.label}</p>
        <p className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">{page.pdfUrl}</p>
      </div>
      <span className="text-[10px] font-bold bg-[#003a6a]/8 text-[#003a6a] px-2.5 py-1 rounded-full shrink-0">PDF</span>
    </div>
    <div className="min-h-screen flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {getFileType(page.pdfUrl) === "pdf" ? (
        <iframe
          src={`${page.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          title={page.label}
          className="w-full h-full"
          style={{ border: "none", minHeight: "100vh", display: "block" }}
        />
      ) : (
        <img src={page.pdfUrl} alt={page.label} className="w-full" />
      )}
    </div>
  </div>
);

// ── Attendance Page ───────────────────────────────────────────────────────────

const AttendancePage = ({ page }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    API.get("/pdfs", { params: { category: page.category } })
      .then((response) => {
        const sorted = [...response.data].sort(
          (a, b) => new Date(b.dateRange.end) - new Date(a.dateRange.end)
        );
        setAttendanceData(sorted);
        setSelectedItem(sorted[0] ?? null);
      })
      .catch(() => setError("Failed to load attendance records."))
      .finally(() => setLoading(false));
  }, [page.category]);

  const filteredData = useMemo(() => {
    return attendanceData.filter((item) => {
      const start = new Date(item.dateRange.start);
      const end = new Date(item.dateRange.end);
      if (filterFrom && end < new Date(filterFrom)) return false;
      if (filterTo && start > new Date(filterTo + "T23:59:59")) return false;
      return true;
    });
  }, [attendanceData, filterFrom, filterTo]);

  // If selected item is filtered out, auto-select first visible
  useEffect(() => {
    if (selectedItem && !filteredData.find((i) => i._id === selectedItem._id)) {
      setSelectedItem(filteredData[0] ?? null);
    }
  }, [filteredData]);

  const handleFilterChange = (key, value) => {
    if (key === "from") setFilterFrom(value);
    else setFilterTo(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#003a6a]/20 border-t-[#003a6a] rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading records…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <DateRangeFilter
        filterFrom={filterFrom}
        filterTo={filterTo}
        onChange={handleFilterChange}
        onClear={() => { setFilterFrom(""); setFilterTo(""); }}
        total={attendanceData.length}
        filtered={filteredData.length}
      />

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-400">No records in this range</p>
          <button onClick={() => { setFilterFrom(""); setFilterTo(""); }} className="text-xs text-[#003a6a] underline mt-2">Clear filter</button>
        </div>
      ) : (
        <div className="flex gap-4 items-start">
          {/* Sidebar list */}
          <div className="w-72 shrink-0 flex flex-col gap-2 max-h-[80vh] overflow-y-auto pr-1">
            {filteredData.map((item) => (
              <PdfCard
                key={item._id}
                item={item}
                isActive={selectedItem?._id === item._id}
                onClick={setSelectedItem}
              />
            ))}
          </div>

          {/* Viewer */}
          <div className="flex-1 min-w-0">
            {selectedItem ? (
              <PdfViewer item={selectedItem} />
            ) : (
              <div className="flex items-center justify-center h-64 text-sm text-gray-400">
                Select a record to preview
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main PageView ─────────────────────────────────────────────────────────────

const PageView = ({ pageMap }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const page = pageMap[slug];

  if (!page) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
        <p className="text-lg font-bold text-gray-400 mb-2">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-bold text-[#003a6a] underline mt-2"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <>
      <HeaderSection />
      <main className="min-h-screen max-w-7xl mx-auto">
        {isAttendancePage(slug) ? (
          <AttendancePage page={page} />
        ) : page.pdfUrl ? (
          <StaticPdfPage page={page} />
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default PageView;