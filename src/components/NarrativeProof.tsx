import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    initial: "M",
    initialColor: "hsl(var(--primary))",
    name: "Maria",
    location: "Pembroke Pines, FL",
    grade: "C",
    gradeColor: "hsl(var(--brand-amber))",
    narrative: [
      "She got three quotes. They all looked similar — professional letterhead, detailed line items. She uploaded the highest one to WindowMan before calling the contractor back.",
      "The scan flagged the window brand as unspecified — meaning the contractor could legally install any brand at any quality level.",
      "She called back and asked one question. The contractor revised the quote.",
    ],
    result: "Contractor revised quote after one phone call.",
    flag: "Red flag caught: Unspecified window brand",
  },
  {
    initial: "D",
    initialColor: "hsl(var(--brand-amber))",
    name: "David",
    location: "Coral Springs, FL",
    grade: "D",
    gradeColor: "hsl(var(--brand-ruby))",
    narrative: [
      "His quote was $17,400. He uploaded it because he wasn't sure the price was right — not because he suspected anything specific.",
      "The scan put his quote at 26% above fair market for Broward County.",
      "He didn't negotiate. He walked away and found a contractor whose quote came in $5,200 lower for the exact same scope of work.",
    ],
    result: "Found a contractor $5,200 lower for the same scope.",
    flag: "Red flag caught: 26% above Broward County benchmark",
  },
];

const NarrativeProof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background border-t border-white/5">
      <div ref={ref} className="mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "hsl(var(--primary))", letterSpacing: "0.1em", marginBottom: 16 }}>
            REAL RESULTS FROM FLORIDA HOMEOWNERS
          </p>
          <h2 className="text-foreground" style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
            What happens when you know the truth.
          </h2>
          <p className="text-muted-foreground mb-12" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>
            These aren't reviews. These are outcomes.
          </p>
        </motion.div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-7"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: `${story.initialColor}15` }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: story.initialColor }}>
                      {story.initial}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>{story.name}</p>
                    <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{story.location}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: `${story.gradeColor}15`, border: `2px solid ${story.gradeColor}` }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, fontWeight: 700, color: story.gradeColor }}>
                      {story.grade}
                    </span>
                  </div>
                  <p className="text-muted-foreground/60 mt-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}>Before scan</p>
                </div>
              </div>

              {/* Narrative */}
              <div style={{ marginTop: 20 }}>
                {story.narrative.map((p, j) => (
                  <p key={j} className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, marginTop: j > 0 ? 12 : 0 }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Result */}
              <div className="flex items-center gap-3 rounded-lg mt-5" style={{ background: "hsl(var(--brand-lime) / 0.08)", padding: "16px 20px" }}>
                <span style={{ color: "hsl(var(--brand-lime))", fontSize: 20 }}>✓</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(var(--brand-lime))", fontWeight: 600 }}>{story.result}</p>
              </div>

              {/* Flag Tag */}
              <div style={{ marginTop: 12 }}>
                <span
                  style={{
                    display: "inline-flex",
                    background: "hsl(var(--brand-ruby) / 0.1)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "hsl(var(--brand-ruby))",
                    fontWeight: 600,
                  }}
                >
                  {story.flag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rotation Indicator */}
        <div className="hidden md:flex flex-col items-center mt-8 gap-2">
          <div className="flex gap-2">
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "hsl(var(--primary))", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "inline-block" }} />
          </div>
          <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
            2 of thousands of homeowners who found red flags this year.
          </p>
        </div>

        {/* Transition Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12 glass-card rounded-2xl p-8"
        >
          <h3 className="text-foreground" style={{ fontFamily: "'Jost', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Your quote is either priced fairly or it isn't.
          </h3>
          <p className="text-muted-foreground italic mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18 }}>
            Right now, the contractor knows which one. You don't.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("truth-gate")}
            className="mt-6 bg-primary text-primary-foreground font-bold rounded-lg transition-shadow hover:shadow-[0_0_24px_hsl(var(--brand-cyan)/0.4)]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              padding: "16px 32px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Show Me My Grade →
          </motion.button>
          <p className="text-muted-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            The scan takes 60 seconds. What you find out could change what you pay.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NarrativeProof;
