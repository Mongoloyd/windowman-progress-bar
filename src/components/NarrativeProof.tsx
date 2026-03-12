import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    initial: "M",
    initialBg: "#E8F7FB",
    initialColor: "#0099BB",
    name: "Maria",
    location: "Pembroke Pines, FL",
    grade: "C",
    gradeColor: "#F97316",
    gradeBg: "#FEF2F2",
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
    initialBg: "#FDF3E3",
    initialColor: "#C8952A",
    name: "David",
    location: "Coral Springs, FL",
    grade: "D",
    gradeColor: "#DC2626",
    gradeBg: "#FEF2F2",
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
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div ref={ref} className="mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#0099BB", letterSpacing: "0.1em", marginBottom: 16 }}>
            REAL RESULTS FROM FLORIDA HOMEOWNERS
          </p>
          <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(32px, 5vw, 42px)", color: "#0F1F35", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
            What happens when you know the truth.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#6B7280", marginBottom: 48 }}>
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
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E5E7EB",
                borderRadius: 16,
                padding: "32px 28px",
                boxShadow: "0 4px 20px rgba(15, 31, 53, 0.07)",
              }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: story.initialBg }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: story.initialColor }}>
                      {story.initial}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "#0F1F35" }}>{story.name}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B7280" }}>{story.location}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: story.gradeBg, border: `2px solid ${story.gradeColor}` }}
                  >
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 700, color: story.gradeColor }}>
                      {story.grade}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#9CA3AF", marginTop: 4 }}>Before scan</p>
                </div>
              </div>

              {/* Narrative */}
              <div style={{ marginTop: 20 }}>
                {story.narrative.map((p, j) => (
                  <p key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#374151", lineHeight: 1.8, marginTop: j > 0 ? 12 : 0 }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Result */}
              <div className="flex items-center gap-3" style={{ background: "#ECFDF5", borderRadius: 10, padding: "16px 20px", marginTop: 20 }}>
                <span style={{ color: "#059669", fontSize: 20 }}>✓</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#065F46", fontWeight: 600 }}>{story.result}</p>
              </div>

              {/* Flag Tag */}
              <div style={{ marginTop: 12 }}>
                <span
                  style={{
                    display: "inline-flex",
                    background: "#FEF2F2",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#DC2626",
                    fontWeight: 600,
                  }}
                >
                  {story.flag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rotation Indicator — desktop only */}
        <div className="hidden md:flex flex-col items-center mt-8 gap-2">
          <div className="flex gap-2">
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0F1F35", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#D1D5DB", display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9CA3AF" }}>
            2 of thousands of homeowners who found red flags this year.
          </p>
        </div>

        {/* Transition Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
          style={{ backgroundColor: "#F9FAFB", borderRadius: 16, padding: 32 }}
        >
          <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: 24, color: "#0F1F35", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Your quote is either priced fairly or it isn't.
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#374151", fontStyle: "italic", marginTop: 12 }}>
            Right now, the contractor knows which one. You don't.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("truth-gate")}
            style={{
              marginTop: 24,
              background: "#C8952A",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "16px 32px",
              borderRadius: 10,
              border: "none",
              boxShadow: "0 4px 14px rgba(200, 149, 42, 0.35)",
              cursor: "pointer",
            }}
          >
            Show Me My Grade →
          </motion.button>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9CA3AF", marginTop: 12 }}>
            The scan takes 60 seconds. What you find out could change what you pay.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NarrativeProof;
