import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#003a6a] text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-[#f59b18] font-black text-xs uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="text-4xl font-black mt-2 mb-6">Contact Us</h2>
          <div className="space-y-5">
            {[
              {
                icon: "📍",
                label: "Address",
                val: "Jiaganj, Murshidabad, West Bengal — 742122 ",
              },
              { icon: "📞", label: "Phone", val: "+91-9434529777" },
              { icon: "✉️", label: "Email", val: "bhagirathiptti@gmail.com" },
              {
                icon: "🚂",
                label: "Nearest Station",
                val: "Jiaganj Railway Station",
              },
              { icon: "🛣️", label: "Highway", val: "Adjacent to NH-34" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 items-start bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[#f59b18] text-xs font-black uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-white/90 text-sm mt-0.5">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick contact form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-black mb-6">Send a Message</h3>
          <div className="space-y-4">
            {[
              { placeholder: "Your Full Name", type: "text" },
              { placeholder: "Email Address", type: "email" },
              { placeholder: "Phone Number", type: "tel" },
            ].map((f) => (
              <input
                key={f.placeholder}
                type={f.type}
                placeholder={f.placeholder}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#f59b18] transition-colors text-sm"
              />
            ))}
            <textarea
              placeholder="Your Message or Query"
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#f59b18] transition-colors text-sm resize-none"
            />
            <button className="w-full bg-[#ff5421] hover:bg-[#e04418] text-white py-3.5 rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl">
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
