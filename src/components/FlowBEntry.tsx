import { motion } from "framer-motion";

import "@fontsource/dm-mono/500.css";

const outcomes = [
  {
    icon: "✓",
    iconColor: "hsl(var(--brand-lime))",
    title: "Walk in knowing the fair price",
    sub: "Before they quote you a single number",
  },
  {
    icon: "📋",
    iconColor: "hsl(var(--brand-amber))",
    title: "Know the 5 questions to ask",
    sub: "The questions contractors hope you never think to ask",
  },
  {
    icon: "🔔",
    iconColor: "hsl(var(--primary))",
    title: "Get a reminder to scan your quote",
    sub: "We'll text you the moment you need to upload it",
  },
];

const timelineSteps = [
  {
    num: "1",
    numColor: "hsl(var(--primary))",
    badgeColor: "hsl(var(--primary))",
    badgeText: "HAPPENING NOW",
    title: "Build your fair-market baseline",
    copy: "3 quick questions. We generate your county-specific price benchmark.",
    preview: "price",
  },
  {
    num: "2",
    numColor: "hsl(var(--brand-amber))",
    badgeColor: "hsl(var(--brand-amber))",
    badgeText: "WHEN YOU HAVE YOUR QUOTE",
    title: "Upload it for your full AI audit",
    copy: "The baseline becomes your benchmark. Your quote gets graded against it instantly.",
    preview: "grade",
  },
  {
    num: "3",
    numColor: "hsl(var(--brand-lime))",
    badgeColor: "hsl(var(--brand-lime))",
    badgeText: "BEFORE YOU SIGN",
    title: "Know exactly what to negotiate",
    copy: "Red flags. Dollar delta. Negotiation script. Everything you need to walk away with a fair deal.",
    preview: null,
  },
];

interface FlowBEntryProps {
  onContinueToTool: () => void;
  onSwitchToFlowA: () => void;
}

const FlowBEntry = ({ onContinueToTool, onSwitchToFlowA }: FlowBEntryProps) => {
  return (
    <div id="flow-b">
      {/* SECTION 1 — REFRAME HERO */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              background: "hsl(var(--brand-lime) / 0.08)",
              border: "1px solid hsl(var(--brand-lime))",
              borderRadius: 6,
              padding: "5px 14px",
            }}
          >
            <span style={{ color: "hsl(var(--brand-lime))", fontSize: 14 }}>★</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "hsl(var(--brand-lime))",
              }}
            >
              YOU'RE EARLY — THAT'S THE BEST POSITION TO BE IN
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-foreground"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(42px, 5.5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            You don't have a quote yet.
            <br />
            <span style={{ color: "hsl(var(--brand-lime))" }}>
              That means you still have all the power.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(19px, 2vw, 21px)",
              lineHeight: 1.75,
              marginBottom: 12,
              maxWidth: 640,
            }}
          >
            Contractors walk in knowing the market price.
            <br />
            Most homeowners don't. WindowMan fixes that.
          </p>

          {/* Explanation */}
          <p
            className="text-muted-foreground"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 580,
            }}
          >
            In 4 minutes, we'll generate your county-specific fair-market baseline.
            So when the contractor opens their briefcase, you already know the number
            they're hoping you don't.
          </p>

          {/* Three Outcomes */}
          <div className="flex flex-col md:flex-row gap-5 mb-10" style={{ maxWidth: 680 }}>
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `${item.iconColor}15`,
                  }}
                >
                  <span style={{ fontSize: 16, color: item.iconColor }}>{item.icon}</span>
                </div>
                <div>
                  <p className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700 }}>
                    {item.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinueToTool}
            className="bg-brand-lime text-primary-foreground font-bold rounded-lg"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              padding: "16px 36px",
              border: "none",
              boxShadow: "0 4px 16px hsl(var(--brand-lime) / 0.35)",
              cursor: "pointer",
            }}
          >
            Build My Baseline — It's Free →
          </motion.button>

          {/* Switch back */}
          <p className="text-muted-foreground mt-3.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            Actually, I do have a quote —{" "}
            <button
              onClick={onSwitchToFlowA}
              className="text-primary underline hover:text-primary/80"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                padding: 0,
              }}
            >
              scan it instead →
            </button>
          </p>
        </div>
      </section>

      {/* SECTION 2 — EXPERIENCE PREVIEW */}
      <section className="bg-background border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
          <p
            className="text-center mb-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: "hsl(var(--primary))",
              letterSpacing: "0.1em",
            }}
          >
            WHAT FLOW B GIVES YOU
          </p>

          <h2
            className="text-center text-foreground"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(30px, 4vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 48,
            }}
          >
            The contractor will arrive with information.
            <br className="hidden md:block" /> Now you will too.
          </h2>

          {/* Timeline */}
          <div className="relative">
            <div
              className="hidden md:block absolute"
              style={{ top: 20, left: "16.6%", right: "16.6%", height: 2, background: "rgba(255,255,255,0.05)" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
              <div
                className="md:hidden absolute"
                style={{ left: 19, top: 40, bottom: 40, width: 2, background: "rgba(255,255,255,0.05)" }}
              />

              {timelineSteps.map((step, i) => (
                <div key={i} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                  <div
                    className="shrink-0 flex items-center justify-center relative z-10 bg-card"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: `2px solid ${step.numColor}`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: step.numColor,
                    }}
                  >
                    {step.num}
                  </div>

                  <div className="md:mt-4 md:text-center">
                    <span
                      className="inline-block mb-2"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        fontWeight: 500,
                        background: `${step.badgeColor}15`,
                        color: step.badgeColor,
                        padding: "3px 10px",
                        borderRadius: 999,
                      }}
                    >
                      {step.badgeText}
                    </span>

                    <p className="text-foreground mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700 }}>
                      {step.title}
                    </p>

                    <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6 }}>
                      {step.copy}
                    </p>

                    {step.preview === "price" && (
                      <div className="relative mt-3 md:mx-auto glass-card rounded-lg" style={{ padding: "12px 14px", maxWidth: 280 }}>
                        <p className="text-muted-foreground mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
                          FAIR MARKET RANGE · BROWARD CO.
                        </p>
                        <p
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 18,
                            fontWeight: 700,
                            color: "hsl(var(--primary))",
                            filter: "blur(5px)",
                            userSelect: "none",
                          }}
                        >
                          $12,400 – $14,800
                        </p>
                        <p
                          className="absolute inset-0 flex items-center justify-center text-muted-foreground italic"
                          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, paddingTop: 16 }}
                        >
                          Unlock after step 3
                        </p>
                      </div>
                    )}

                    {step.preview === "grade" && (
                      <div className="relative mt-3 md:mx-auto glass-card rounded-lg" style={{ padding: "12px 14px", maxWidth: 280 }}>
                        <p
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: 40,
                            fontWeight: 800,
                            color: "hsl(var(--brand-amber))",
                            filter: "blur(5px)",
                            userSelect: "none",
                            lineHeight: 1,
                            textAlign: "center",
                          }}
                        >
                          C
                        </p>
                        <p
                          className="absolute inset-0 flex items-center justify-center text-muted-foreground italic"
                          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}
                        >
                          Your grade waits here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transition line */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground italic" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>
              Most contractors budget on the assumption you won't check.
              <br className="hidden md:block" /> You're about to become the exception.
            </p>
            <p className="text-muted-foreground/60 mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              4,127 Florida homeowners did this before their last window project.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlowBEntry;
