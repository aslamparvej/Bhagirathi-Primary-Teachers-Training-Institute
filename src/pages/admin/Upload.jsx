import { useRef, useState } from "react";

const CATEGORIES = [
  "General",
  "Academic",
  "Finance",
  "Legal",
  "Compliance",
  "Admission",
  "Staff",
  "Other",
];

const CATEGORY_STYLE = {
  Academic:   "bg-blue-50 text-blue-700 border-blue-200",
  Finance:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Legal:      "bg-purple-50 text-purple-700 border-purple-200",
  Compliance: "bg-amber-50 text-amber-700 border-amber-200",
  Admission:  "bg-orange-50 text-orange-700 border-orange-200",
  Staff:      "bg-gray-100 text-gray-600 border-gray-200",
  General:    "bg-gray-50 text-gray-500 border-gray-200",
  Other:      "bg-pink-50 text-pink-700 border-pink-200",
};

const MOCK_UPLOADS = [
  {
    _id: "1",
    title: "B.Ed Academic Calendar 2024–25",
    category: "Academic",
    date: "2025-03-15",
    dateRange: "2024–2025",
    fileUrl: "#",
  },
  {
    _id: "2",
    title: "D.El.Ed Fee Structure",
    category: "Finance",
    date: "2025-02-10",
    dateRange: "2025–2026",
    fileUrl: "#",
  },
  {
    _id: "3",
    title: "NCTE Recognition Order – B.Ed",
    category: "Legal",
    date: "2025-01-05",
    dateRange: "2024–2025",
    fileUrl: "#",
  },
  {
    _id: "4",
    title: "Mandatory Disclosure 2024–25",
    category: "Compliance",
    date: "2024-12-20",
    dateRange: "2024–2025",
    fileUrl: "#",
  },
];

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Drop Zone Component ───────────────────────────────────────────
function DropZone({ file, onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") onFile(f);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl py-10 px-6 cursor-pointer transition-all select-none
        ${
          dragging
            ? "border-[#003a6a] bg-[#003a6a]/5 scale-[1.01]"
            : file
              ? "border-[#ff5421]/60 bg-[#ff5421]/5"
              : "border-gray-200 bg-gray-50 hover:border-[#003a6a]/50 hover:bg-[#003a6a]/4"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files[0]) onFile(e.target.files[0]);
        }}
      />

      {file ? (
        <div className="flex flex-col items-center gap-2 text-center">
          {/* PDF icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#ff5421]/10 flex items-center justify-center mb-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff5421"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          </div>
          <p className="text-sm font-bold text-[#003a6a] max-w-xs truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-400">
            {(file.size / 1024).toFixed(1)} KB &middot; PDF
          </p>
          <span className="text-xs font-semibold text-[#ff5421] border border-[#ff5421]/30 bg-[#ff5421]/8 rounded-full px-3 py-1 mt-1">
            Click to change file
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#003a6a]/8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#003a6a"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#003a6a]">
              Drag &amp; drop your PDF here
            </p>
            <p className="text-xs text-gray-400 mt-1">
              or click to browse &middot; PDF files only &middot; max 10MB
            </p>
          </div>
          <span className="text-xs font-semibold text-[#003a6a] border border-[#003a6a]/25 bg-[#003a6a]/6 rounded-full px-4 py-1.5">
            Browse Files
          </span>
        </div>
      )}
    </div>
  );
}

const Upload = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "General",
    date: "",
    dateRange: "",
  });
  const [uploads, setUploads] = useState(MOCK_UPLOADS);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const isValid =
    file && form.title.trim() && form.date && form.dateRange.trim();

  const handleUpload = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Simulate upload process
    setStatus("uploading");
    setTimeout(() => {
      // Randomly decide if upload was successful or not (for demo)
      const success = Math.random() > 0.2;
      setStatus(success ? "success" : "error");
      if (success) {
        // Reset form after successful upload
        setFile(null);
        setForm({
          title: "",
          category: CATEGORIES[0],
          date: "",
          dateRange: "",
        });
      }
    }, 2000);
  };

  const filtered = uploads.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dateRange.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="">
        {/* ── Upload form ── */}
        <div className="">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Form header */}
            <div className="bg-[#003a6a] px-6 py-5">
              <h2 className="text-white font-bold text-base">Upload New PDF</h2>
              <p className="text-blue-200/70 text-xs mt-0.5">
                Fill all fields before uploading
              </p>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-5">
              {/* Drop zone */}
              <DropZone file={file} onFile={setFile} />

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Document Title <span className="text-[#ff5421]">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. B.Ed Academic Calendar 2025–26"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#003a6a] focus:ring-2 focus:ring-[#003a6a]/10 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#003a6a] focus:ring-2 focus:ring-[#003a6a]/10 transition-all appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Document Date <span className="text-[#ff5421]">*</span>
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#003a6a] focus:ring-2 focus:ring-[#003a6a]/10 transition-all cursor-pointer"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Academic / Date Range{" "}
                  <span className="text-[#ff5421]">*</span>
                </label>
                <input
                  type="text"
                  value={form.dateRange}
                  onChange={(e) => set("dateRange", e.target.value)}
                  placeholder="e.g. 2025–2026 or Jan–Dec 2025"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#003a6a] focus:ring-2 focus:ring-[#003a6a]/10 transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1.5 pl-1">
                  Specify the session or date range this document covers
                </p>
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#10b981" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-emerald-700">
                    PDF uploaded successfully!
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base">⚠</span>
                  <span className="text-sm font-semibold text-red-700">
                    Upload failed. Please try again.
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isValid || status === "uploading"}
                className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2
                      ${
                        isValid && status !== "uploading"
                          ? "bg-[#003a6a] text-white hover:bg-[#002a52] active:scale-[0.98] shadow-md hover:shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
              >
                {status === "uploading" ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Uploading…
                  </>
                ) : (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    Upload PDF
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        {/* ── Uploaded PDFs list ── */}
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
      </div>
    </div>
  );
};

export default Upload;
