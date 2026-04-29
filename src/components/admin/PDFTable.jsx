import { useState } from "react";
import API from "../../services/api";
import { Calendar, Eye, Trash2 } from "lucide-react";

const CATEGORY_STYLE = {
  "Student Attendance": "bg-blue-50 text-blue-700 border-blue-200",
  "Teacher Attendance": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const PDFTable = ({ uploads, CATEGORIES }) => {
  const [items, setItems] = useState(uploads);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Sync when parent adds a new upload
  if (uploads.length !== items.length) {
    setItems(uploads);
  }

  const filtered = items.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await API.delete(`/pdfs/${deleteId}`);
      setItems((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

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
              {items.length} Total
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
                placeholder="Search by title…"
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
                key={pdf.id}
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
                    {/* Category badge */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        CATEGORY_STYLE[pdf.category] ??
                        "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {pdf.category}
                    </span>

                    {/* Date range */}
                    {pdf.dateRange?.start && (
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(pdf.dateRange.start)}
                        {pdf.dateRange.end && (
                          <> → {formatDate(pdf.dateRange.end)}</>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdf.fileUrl)}&embedded=true`}
                  width="100%"
                  height="600px"
                  title="PDF Viewer"
                /> */}

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* View PDF */}
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(pdf.fileUrl)}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#003a6a]/8 hover:bg-[#003a6a]/15 flex items-center justify-center transition-colors"
                    title="View PDF"
                  >
                   <Eye size={16} color="#003a6a" />
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => setDeleteId(pdf.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
                    title="Delete PDF"
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-80 mx-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} color="#ef4444" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 text-center">
              Delete this document?
            </h3>
            <p className="text-xs text-gray-400 text-center mt-1 mb-5">
              This will permanently remove the PDF from Cloudinary and the
              database.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFTable;
