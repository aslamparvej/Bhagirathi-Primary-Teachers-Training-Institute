import { useRef, useState } from "react";
import AttendanceRangePicker from "../../components/UI/AttendanceRangePicker";
import PDFTable from "../../components/admin/PDFTable";
import {
  differenceInCalendarDays,
  isWeekend,
  startOfWeek,
  endOfWeek,
} from "date-fns";


const CATEGORIES = ["Student Attendance", "Teacher Attendance"];

const CATEGORY_STYLE = {
  Attendance: "bg-green-50 text-green-700 border-green-200",
};

const MOCK_UPLOADS = [];

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
    category: CATEGORIES[0],
    dateRange: "",
  });
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [uploads, setUploads] = useState(MOCK_UPLOADS);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const isValid = file && form.title.trim() && form.category && form.dateRange.trim();

  // Handle date range selection with restrictions: no weekends, max 5 days, within same week
  const handleSelect = (ranges) => {
    let { startDate, endDate } = ranges.selection;

    // Prevent weekend selection
    if (isWeekend(startDate) || isWeekend(endDate)) {
      return;
    }

    // Restrict within same week (Mon–Fri)
    const weekStart = startOfWeek(startDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(startDate, { weekStartsOn: 1 });

    if (endDate > weekEnd) {
      endDate = weekEnd;
    }

    // Max 5 days limit
    const diff = differenceInCalendarDays(endDate, startDate);

    if (diff > 4) {
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 4);
    }

    setRange([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);

    setForm((prev) => ({ ...prev, dateRange: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` }));
  };

   // Handle form submission and simulate upload process
  const handleUpload = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Simulate upload process
    setStatus("uploading");


    console.log("Uploading:", {
      file,
      title: form.title,
      category: form.category,
      dateRange: form.dateRange,
    });
  };

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

              {/* Date Range */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Academic / Date Range{" "}
                  <span className="text-[#ff5421]">*</span>
                </label>
                <AttendanceRangePicker range={range} setRange={setRange} handleSelect={handleSelect} />
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
        <PDFTable uploads={uploads} CATEGORIES={CATEGORIES} />
      </div>
    </div>
  );
};

export default Upload;
