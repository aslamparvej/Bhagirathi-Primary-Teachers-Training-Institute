import { useState } from "react";

const PDFTable = ({ uploads, CATEGORIES }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  const filtered = uploads.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dateRange.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#003a6a]">
                Uploaded Documents
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {filtered.length} document{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>
            <span className="text-xs font-bold text-white bg-[#003a6a] px-3 py-1 rounded-full">
              {uploads.length} Total
            </span>
          </div>

          {/* Search + filter */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-40">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title or date range…"
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003a6a] transition-colors"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003a6a] transition-colors cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PDF rows */}
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-3 opacity-30">📄</div>
              <p className="text-sm font-semibold text-gray-400">
                No documents found
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Try a different search or category
              </p>
            </div>
          ) : (
            filtered.map((pdf) => (
              <div
                key={pdf._id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors group"
              >
                {/* PDF icon */}
                <div className="w-10 h-10 rounded-xl bg-[#ff5421]/10 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff5421"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="13" y2="17" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {pdf.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_STYLE[pdf.category] || CATEGORY_STYLE.General}`}
                    >
                      {pdf.category}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      📅 {formatDate(pdf.date)}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                      {pdf.dateRange}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={pdf.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#003a6a]/8 hover:bg-[#003a6a]/15 flex items-center justify-center transition-colors"
                    title="View PDF"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#003a6a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setDeleteId(pdf._id)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    title="Delete PDF"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFTable;
