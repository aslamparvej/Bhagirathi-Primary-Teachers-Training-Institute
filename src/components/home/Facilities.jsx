import React from "react";

const FACILITIES = [
  { icon: "📖", title: "Library", desc: "Well-stocked library with thousands of reference books, journals and digital resources for research and study." },
  { icon: "💻", title: "ICT Lab", desc: "Modern computer lab with high-speed internet, enabling technology-integrated learning for future educators." },
  { icon: "🎨", title: "Art & Craft", desc: "Dedicated space for creative arts, enabling student-teachers to integrate arts education in classrooms." },
  { icon: "⚽", title: "Physical Education", desc: "Spacious grounds and sports facilities that promote health, teamwork and physical development." },
  { icon: "🏫", title: "Smart Classrooms", desc: "Digitally equipped classrooms with projectors and interactive boards for modern pedagogy." },
  { icon: "🌿", title: "Green Campus", desc: "Eco-friendly campus adjacent to NH-34, near Nimtita Railway Station, ensuring easy accessibility." },
];

const Facilities = () => {
  return (
    <section id="facilities" className="py-20 bg-[#003a6a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#f59b18] font-black text-xs uppercase tracking-widest">
            Infrastructure
          </span>
          <h2 className="text-4xl font-black mt-2">Campus Facilities</h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">
            A well-equipped campus designed to support holistic learning and
            development.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 hover:border-[#f59b18]/60 hover:bg-white/10 rounded-2xl p-6 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {f.icon}
              </div>
              <h3 className="text-lg font-black mb-2 group-hover:text-[#f59b18] transition-colors">
                {f.title}
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
