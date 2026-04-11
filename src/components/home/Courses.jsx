import React from "react";

const Courses = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">
            Programmes
          </span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2">
            Our Courses
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            NCTE-recognised programmes designed to shape compassionate, skilled
            and reflective educators.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* B.Ed */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-[#003a6a] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black opacity-5 select-none leading-none">
                B
              </div>
              <span className="bg-[#ff5421] text-white text-xs px-3 py-1 rounded-full font-bold uppercase mb-4 inline-block">
                2-Year Programme
              </span>
              <h3 className="text-3xl font-black mb-2">B.Ed</h3>
              <p className="text-blue-200 text-sm">Bachelor of Education</p>
            </div>
            <div className="p-8 bg-gray-50">
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                {[
                  "Recognised by NCTE (ERC)",
                  "Affiliated to WBUTTEPA",
                  "For Secondary & Senior Secondary Teaching",
                  "Semesterised Programme with 4 Semesters",
                  "Internship in School Integration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#ff5421] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-[#003a6a] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#002a52] transition-all">
                  Fee Structure
                </button>
                <button className="border-2 border-[#003a6a] text-[#003a6a] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#003a6a] hover:text-white transition-all">
                  Annual Intake
                </button>
              </div>
            </div>
          </div>

          {/* D.El.Ed */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
            <div className="bg-[#ff5421] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black opacity-10 select-none leading-none">
                D
              </div>
              <span className="bg-[#003a6a] text-white text-xs px-3 py-1 rounded-full font-bold uppercase mb-4 inline-block">
                2-Year Programme
              </span>
              <h3 className="text-3xl font-black mb-2">D.El.Ed</h3>
              <p className="text-orange-100 text-sm">
                Diploma in Elementary Education
              </p>
            </div>
            <div className="p-8 bg-gray-50">
              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                {[
                  "Recognised by NCTE (ERC)",
                  "Affiliated to WBBPE",
                  "For Elementary Stage Teaching (Class I–VIII)",
                  "Semesterised Programme with 4 Semesters",
                  "Internship & Practicum Included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#ff5421] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-[#ff5421] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e04418] transition-all">
                  Fee Structure
                </button>
                <button className="border-2 border-[#ff5421] text-[#ff5421] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#ff5421] hover:text-white transition-all">
                  Annual Intake
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
