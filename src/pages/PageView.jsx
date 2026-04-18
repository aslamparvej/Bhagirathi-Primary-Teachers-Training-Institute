import React from "react";
import { useParams } from "react-router-dom";

import HeaderSection from "../components/UI/HeaderSection";
import Footer from "../components/Footer";

function getFileType(url) {
  const cleanUrl = url.split('?')[0]; // remove query params
  const extension = cleanUrl.split('.').pop().toLowerCase();

  if (extension === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) return "image";

  return "unknown";
}

const PageView = ({ pageMap }) => {
  const { slug } = useParams();

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
        {page.pdfUrl && (
          <div className="flex-1 p-6 flex flex-col gap-3 min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#ff5421]/10 flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#003a6a] truncate">
                  {page.label}
                </p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">
                  {page.pdfUrl}
                </p>
              </div>
              <span className="text-[10px] font-bold bg-[#003a6a]/8 text-[#003a6a] px-2.5 py-1 rounded-full shrink-0">
                PDF
              </span>
            </div>
            <div
              className="min-h-screen flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {getFileType(page.pdfUrl) == "pdf" ? (
                 <iframe
                src={`${page.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title={page.label}
                className="w-full h-full"
                style={{ border: "none", minHeight: "100vh", display: "block" }}
              />
              ) : (
                <img src={page.pdfUrl} alt={page.label}/>
              )}
             
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PageView;
