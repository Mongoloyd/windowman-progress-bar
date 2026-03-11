import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Wrench, BarChart3, Check, Scale, ArrowRight, ArrowDown } from "lucide-react";

const listItems = [
  "Free AI analysis of your quote",
  "Red flags explained in plain English",
  "Fair-market price for your county",
  "A negotiation script for your situation",
  <>
    An introduction to a vetted contractor who will beat your price
    <span className="text-muted-foreground/60"> — only if you want it</span>
  </>,
];

const MarketMakerManifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 16 } as const,
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  });

  return (
    <section className="bg-background border-t border-white/5">
      <div ref={ref} className="mx-auto px-4 md:px-8 py-20 md:py-28" style={{ maxWidth: 1080 }}>
        {/* Decorative line */}
        <motion.div
          {...fade(0)}
          className="mx-auto"
          style={{ width: 48, height: 1, background: "hsl(var(--primary) / 0.4)", marginBottom: 24 }}
        />

        {/* Eyebrow */}
        <motion.p
          {...fade(0)}
          className="text-center"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: "hsl(var(--primary))",
            letterSpacing: "0.12em",
            marginBottom: 20,
          }}
        >
          HOW WINDOWMAN ACTUALLY WORKS
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fade(0.05)}
          className="text-center mx-auto text-foreground"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(36px, 5vw, 46px)",
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 680,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          We keep both sides honest.
        </motion.h2>

        {/* Sub */}
        <motion.p
          {...fade(0.1)}
          className="text-center mx-auto text-muted-foreground"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 56,
          }}
        >
          Most services profit from information asymmetry.
          <br />
          WindowMan profits from eliminating it.
        </motion.p>

        {/* Flow Diagram */}
        <motion.div
          {...fade(0.15)}
          className="mx-auto flex flex-col md:flex-row items-center justify-between"
          style={{ maxWidth: 700, marginBottom: 56 }}
        >
          {/* Node 1 — You */}
          <div className="flex flex-col items-center" style={{ minWidth: 110 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "hsl(var(--brand-lime) / 0.1)",
                border: "2px solid hsl(var(--brand-lime) / 0.35)",
              }}
            >
              <Home size={32} color="hsl(142 71% 45%)" />
            </div>
            <span className="text-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>You</span>
            <span className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>Florida homeowner</span>
          </div>

          {/* Arrow 1 */}
          <div className="flex flex-col items-center py-3 md:py-0 md:flex-1 md:px-3">
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "hsl(var(--primary))", marginBottom: 4, textAlign: "center" }}>
              quote + intent
            </span>
            <ArrowRight size={32} color="hsl(185 100% 50%)" className="hidden md:block" />
            <ArrowDown size={24} color="hsl(185 100% 50%)" className="md:hidden" />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "hsl(var(--brand-lime))", marginTop: 4, textAlign: "center" }}>
              free analysis + better price
            </span>
          </div>

          {/* Node 2 — WindowMan */}
          <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "hsl(var(--primary) / 0.08)",
                border: "2px solid hsl(var(--primary) / 0.4)",
                boxShadow: "0 0 24px hsl(var(--primary) / 0.15)",
              }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 900, color: "hsl(var(--primary))" }}>WM</span>
            </div>
            <span className="text-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>WindowMan</span>
            <span className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>The market maker</span>
          </div>

          {/* Arrow 2 */}
          <div className="flex flex-col items-center py-3 md:py-0 md:flex-1 md:px-3">
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "hsl(var(--primary))", marginBottom: 4, textAlign: "center" }}>
              warm lead + intel
            </span>
            <ArrowRight size={32} color="hsl(185 100% 50%)" className="hidden md:block" />
            <ArrowDown size={24} color="hsl(185 100% 50%)" className="md:hidden" />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "hsl(var(--brand-lime))", marginTop: 4, textAlign: "center" }}>
              % of closed sales only
            </span>
          </div>

          {/* Node 3 — Contractor */}
          <div className="flex flex-col items-center" style={{ minWidth: 110 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "hsl(var(--primary) / 0.08)",
                border: "2px solid hsl(var(--primary) / 0.3)",
              }}
            >
              <Wrench size={32} color="hsl(185 100% 50%)" />
            </div>
            <span className="text-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>The Contractor</span>
            <span className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>Vetted. Fair-priced.</span>
          </div>
        </motion.div>

        {/* Three Explanation Blocks */}
        <motion.div {...fade(0.25)} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Block 1 */}
          <div className="glass-card rounded-xl" style={{ padding: "26px 22px", borderColor: "hsl(var(--brand-lime) / 0.15)" }}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "hsl(var(--brand-lime) / 0.1)", border: "1px solid hsl(var(--brand-lime) / 0.25)" }}>
                <Check size={16} color="hsl(142 71% 45%)" strokeWidth={3} />
              </div>
              <span className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>What you get — free</span>
            </div>
            <div className="mt-3">
              {listItems.map((item, i) => (
                <div key={i} className="flex gap-2 items-start text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 2.0 }}>
                  <span style={{ color: "hsl(var(--brand-lime))", flexShrink: 0 }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground/40 italic border-t border-white/5 mt-3.5 pt-3" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
              No charge. No catch. We earn nothing if you don't use our contractor.
            </p>
          </div>

          {/* Block 2 */}
          <div className="glass-card rounded-xl" style={{ padding: "26px 22px", borderColor: "hsl(var(--brand-amber) / 0.15)" }}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "hsl(var(--brand-amber) / 0.1)", border: "1px solid hsl(var(--brand-amber) / 0.25)" }}>
                <Scale size={16} color="hsl(38 92% 50%)" strokeWidth={2.5} />
              </div>
              <span className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>How we make money</span>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.9 }}>
              WindowMan earns a percentage of the sale — only when you choose to work with one of our contractors and your project is completed.
              <br /><br />
              We never charge homeowners. We never charge for the scan. We get paid when you get a better deal than you would have gotten without us.
              <br /><br />
              That's the only model that keeps us honest about the analysis.
            </p>
            <p className="text-muted-foreground/40 italic border-t border-white/5 mt-3.5 pt-3" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
              If your current quote is already fair, we'll tell you that too. Your trust is worth more to us than one referral.
            </p>
          </div>

          {/* Block 3 */}
          <div className="glass-card rounded-xl" style={{ padding: "26px 22px", borderColor: "hsl(var(--primary) / 0.15)" }}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)" }}>
                <BarChart3 size={16} color="hsl(185 100% 50%)" strokeWidth={2.5} />
              </div>
              <span className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>Why contractors work with us</span>
            </div>
            <p className="text-muted-foreground mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.9 }}>
              Every homeowner we introduce already understands fair-market pricing. They've seen the red flags in competing quotes. They know what to look for in a contract.
              <br /><br />
              Our contractors don't walk into cold pitches. They walk into conversations that are already halfway won — with a homeowner who trusts the process and wants a fair deal.
            </p>
            <p className="text-muted-foreground/40 italic border-t border-white/5 mt-3.5 pt-3" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
              We work with a limited number of contractors per county to protect the quality of every introduction.
            </p>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          {...fade(0.35)}
          className="mx-auto text-center mt-12 glass-card rounded-xl"
          style={{ padding: "32px 24px", maxWidth: 600 }}
        >
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 22, color: "hsl(var(--primary))", fontWeight: 700 }}>
            "The industry profits from you not knowing."
          </p>
          <p className="text-foreground mt-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: 22, fontWeight: 400 }}>
            We profit from making sure you do.
          </p>
          <p className="text-muted-foreground mt-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            That's why the scan is free. That's why the report is yours.
            <br />
            That's why we show you the math.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketMakerManifesto;
