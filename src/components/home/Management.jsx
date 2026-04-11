import React from "react";

const members = [
  { name: "Secretary", title: "Institute Secretary", initials: "S" },
  { name: "Principal", title: "Head of Institution", initials: "P" },
  { name: "Administrator", title: "Academic Administrator", initials: "A" },
  { name: "Coordinator", title: "B.Ed Programme Coordinator", initials: "C" },
];

const Management = () => {
  return (
    <section id="management" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">
            Leadership
          </span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2">
            Management &amp; Faculty
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our dedicated team of experienced educators and administrators
            committed to quality teacher education.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m) => (
            <div
              key={m.name}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:border-[#003a6a] hover:shadow-lg transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-[#003a6a] text-white text-2xl font-black flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff5421] transition-colors shadow-lg">
                {m.initials}
              </div>
              <h4 className="font-black text-[#003a6a]">{m.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{m.title}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border-2 border-[#003a6a] text-[#003a6a] px-8 py-3 rounded-xl font-bold hover:bg-[#003a6a] hover:text-white transition-all">
            View All Staff →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Management;
