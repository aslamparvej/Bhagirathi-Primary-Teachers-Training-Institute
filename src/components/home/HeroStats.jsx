import React, { useState, useEffect, useRef } from "react";

const STATS = [
  { value: "2013", label: "Established", icon: "🏛️" },
  { value: "200+", label: "Students Enrolled", icon: "🎓" },
  { value: "25+", label: "Expert Faculty", icon: "👨‍🏫" },
  { value: "2", label: "Programmes Offered", icon: "📚" },
];

// ── Utility: counter animation ────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, "")) || 0;
    if (!num) {
      setCount(target);
      return;
    }
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const HeroStats = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#003a6a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => {
          const val = useCountUp(s.value, 1600, visible);
          return (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f59b18]/50 hover:bg-white/10 transition-all"
            >
              <div className="text-4xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black text-[#f59b18]">{val}</div>
              <div className="text-blue-200 text-sm font-medium mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroStats;
