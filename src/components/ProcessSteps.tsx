import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { num: "01", title: "Answer 4 quick questions", copy: "Window count, project type, county, and quote range. Takes 45 seconds." },
  { num: "02", title: "Enter your details", copy: "Name, email, and mobile. Your report is sent here. No password needed." },
  { num: "03", title: "Upload your quote", copy: "PDF, photo, or screenshot. Any format. We extract every line item." },
  { num: "04", title: "AI scans your quote", copy: "Our AI benchmarks your price against county averages and flags every issue." },
  { num: "05", title: "Your grade appears", copy: "A through F. A dollar delta. Every red flag. Your negotiation ammunition." },
];

const deliverables = [
  { color: "hsl(var(--primary))", icon: "◎", text: "Whether your price is above, below, or at fair market for your specific county" },
  { color: "hsl(var(--brand-ruby))", icon: "⚑", text: "Which line items are vague, missing, or potentially inflated" },
  { color: "hsl(var(--brand-amber))", icon: "◈", text: "What window brand — if any — your contractor actually specified" },
  { color: "hsl(var(--brand-lime))", icon: "◉", text: "A letter grade: A through F" },
  { color: "hsl(var(--primary))", icon: "$", text: "The specific dollar amount you're over or under market", mono: true },
];

const ProcessSteps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="bg-background border-t border-white/5">
      <div ref={ref} className="mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "hsl(var(--primary))", letterSpacing: "0.1em", marginBottom: 16 }}>
            WHAT HAPPENS WHEN YOU SCAN
          </p>
          <h2 className="text-foreground" style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 48 }}>
            Upload your quote. In under 60 seconds, you'll know:
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Animated cyan connecting line */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/5" />
          <motion.div
            className="absolute top-5 left-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--brand-amber)))" }}
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div
                  className="mx-auto flex items-center justify-center relative z-10 bg-card border border-white/10"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                >
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 700, color: "hsl(var(--primary))" }}>{step.num}</span>
                </div>
                <h3 className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, marginTop: 12 }}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
                  {step.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/5" />
          <motion.div
            className="absolute left-[19px] top-0 w-[2px]"
            style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--brand-amber)))" }}
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute -left-8 flex items-center justify-center bg-card border border-white/10"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                >
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 700, color: "hsl(var(--primary))" }}>{step.num}</span>
                </div>
                <h3 className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
                  {step.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-14"
        >
          <h3 className="text-foreground mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700 }}>
            You'll walk away knowing:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                className="flex items-start gap-3 glass-card rounded-lg p-3"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: `${d.color}20` }}
                >
                  <span style={{ fontFamily: (d as any).mono ? "'IBM Plex Mono', monospace" : "inherit", fontSize: 14, color: d.color, fontWeight: 700 }}>
                    {d.icon}
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.6 }}>
                  {d.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("truth-gate")}
            className="bg-primary text-primary-foreground font-bold rounded-lg transition-shadow hover:shadow-[0_0_24px_hsl(var(--brand-cyan)/0.4)]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              padding: "16px 32px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Scan My Quote — It's Free
          </motion.button>
          <p className="text-muted-foreground italic mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
            Most homeowners complete the entire process in under 4 minutes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
