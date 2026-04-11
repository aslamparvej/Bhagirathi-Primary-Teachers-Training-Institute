import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#ff5421] font-black text-xs uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-4xl font-black text-[#003a6a] mt-2 mb-6 leading-tight">
            About the Institute
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            A.M. Teachers' Training Institute offers composite programmes — both{" "}
            <strong className="text-[#003a6a]">D.El.Ed</strong> and{" "}
            <strong className="text-[#003a6a]">B.Ed</strong> — preparing
            teachers for both elementary and secondary stages of education in
            West Bengal.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            The institute was established in <strong>2013</strong> to impart the
            D.El.Ed programme, receiving recognition and affiliation in 2014.
            Subsequently, it was granted recognition from ERC NCTE for both
            programmes from the academic session 2016–17.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Situated adjacent to <strong>NH-34</strong> near Nimtita Railway
            Station in Murshidabad, the institute offers a highly accessible,
            co-educational environment with a congenial atmosphere for students
            and faculty alike.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#003a6a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#002a52] transition-all shadow hover:shadow-md">
              General Information →
            </button>
            <button className="bg-[#ff5421] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e04418] transition-all shadow hover:shadow-md">
              Photo Gallery →
            </button>
          </div>
        </div>

        {/* Mission / Vision cards */}
        <div className="grid gap-6">
          <div className="bg-[#003a6a] text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5421] opacity-20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="text-[#f59b18] text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-black mb-3">Our Mission</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              To develop the knowledge and skills of pre-service teachers
              required to transact learning materials at the elementary and
              secondary stages of education effectively.
            </p>
          </div>
          <div className="bg-[#f59b18] text-[#003a6a] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#003a6a] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="text-[#003a6a] text-3xl mb-3">🔭</div>
            <h3 className="text-xl font-black mb-3">Our Vision</h3>
            <p className="text-[#003a6a]/80 text-sm leading-relaxed">
              To create teachers of tomorrow with transformative knowledge of
              Indian tradition and usher in a new era of teacher education,
              making the institute a vibrant center of excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
