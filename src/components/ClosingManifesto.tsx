import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const checks = [
  "No account required to receive your grade",
  "Scans are private — your contractor never knows",
  "Built by Florida homeowners who got tired of not knowing",
  "Used by 4,127+ Florida homeowners this year",
];

const ClosingManifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ background: "linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(215 50% 8%) 100%)" }}>
      <div ref={ref} className="mx-auto max-w-4xl px-4 md:px-8 py-24 md:py-32 text-center">
        {/* Opening line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-muted-foreground uppercase tracking-[0.15em] mb-10"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: 13 }}
        >
          WHY WINDOWMAN EXISTS
        </motion.p>

        {/* Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-foreground"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.5,
            marginBottom: 24,
          }}
        >
          The industry built a system where you need their expertise to understand their quote.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(28px, 4vw, 36px)",
            color: "hsl(var(--primary))",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.5,
          }}
        >
          We built a system where you don't.
        </motion.p>

        {/* Trust Checks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="grid grid-cols-2 gap-4 mx-auto mt-12"
          style={{ maxWidth: 560 }}
        >
          {checks.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-2.5 text-left"
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "hsl(var(--brand-lime) / 0.1)",
                }}
              >
                <span className="animate-pulse-glow" style={{ color: "hsl(var(--brand-lime))", fontSize: 12, fontWeight: 700 }}>✓</span>
              </div>
              <span className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-14"
        >
          <p className="text-muted-foreground mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>
            Your contract already contains the truth. We'll show it to you.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("truth-gate")}
            className="relative overflow-hidden bg-primary text-primary-foreground font-bold rounded-xl"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
              padding: "18px 48px",
              border: "none",
              cursor: "pointer",
              backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "scan-line-shimmer 3s ease-in-out infinite",
              backgroundColor: "hsl(var(--primary))",
            }}
          >
            Scan My Quote →
          </motion.button>

          <p className="text-muted-foreground/60 italic mt-3.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            Or explore a{" "}
            <button
              onClick={() => console.log({ event: "wm_sample_report_clicked" })}
              className="text-muted-foreground underline hover:text-foreground"
              style={{ fontFamily: "inherit", fontSize: "inherit", background: "none", border: "none", cursor: "pointer", fontStyle: "italic" }}
            >
              sample report
            </button>{" "}
            first — you're free to choose.
          </p>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-white/5 mt-14 pt-10">
          <div className="flex justify-center items-center gap-6 flex-wrap text-muted-foreground/40" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
            <span>© 2025 WindowMan.pro</span>
            <span>·</span>
            <button
              onClick={() => console.log("privacy")}
              className="hover:underline hover:text-muted-foreground"
              style={{ fontFamily: "inherit", fontSize: "inherit", color: "inherit", background: "none", border: "none", cursor: "pointer" }}
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => console.log("terms")}
              className="hover:underline hover:text-muted-foreground"
              style={{ fontFamily: "inherit", fontSize: "inherit", color: "inherit", background: "none", border: "none", cursor: "pointer" }}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingManifesto;
