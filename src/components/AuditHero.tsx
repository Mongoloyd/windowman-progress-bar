import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import "@fontsource/jost/800.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/700.css";
import handScannerImg from "@/assets/hand_scanner.jpg";

const PowerToolFlow = React.lazy(() => import("./PowerToolDemo"));

const flagCards = [
  {
    stripe: "hsl(0 84% 60%)",
    icon: "⚠",
    label: "No Window Brand Specified",
    labelColor: "hsl(0 84% 60%)",
    sub: "Contractor can install any quality level",
  },
  {
    stripe: "hsl(var(--brand-amber))",
    icon: "⚡",
    label: "Labor Warranty: 1 Year Only",
    labelColor: "hsl(var(--brand-amber))",
    sub: "Industry standard is 2–5 years",
  },
  {
    stripe: "hsl(var(--brand-lime))",
    icon: "✓",
    label: "Permit Cost Included",
    labelColor: "hsl(var(--brand-lime))",
    sub: "This is correctly structured",
  },
];

interface AuditHeroProps {
  onFlowBClick?: () => void;
  onUploadQuote?: () => void;
}

const AuditHero = ({ onFlowBClick, onUploadQuote }: AuditHeroProps) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1">
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.08em] text-primary"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                WINDOW QUOTE FORENSIC ANALYSIS
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-foreground mb-5"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "clamp(32px, 5vw, 54px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Don't Sign Your Window Quote Until{" "}
              <span className="text-primary">Window Man</span> Scans It.
            </h1>

            {/* Forensic subhead */}
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span
                className="text-primary font-semibold tracking-[0.06em] text-xs"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                FORENSIC-GRADE AI ANALYSIS
              </span>
            </div>

            {/* Body text */}
            <p
              className="text-muted-foreground mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(16px, 2vw, 19px)",
                lineHeight: 1.7,
              }}
            >
              Detect hidden fees, missing permits, vague scope, and warranty
              traps in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo("truth-gate")}
                className="w-full md:w-auto bg-primary text-primary-foreground font-bold py-4 px-8 rounded-lg transition-shadow hover:shadow-[0_0_24px_hsl(var(--brand-cyan)/0.4)]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                }}
              >
                Scan My Quote Free
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFlowBClick?.()}
                className="w-full md:w-auto border border-primary/40 text-primary bg-transparent font-medium py-3.5 px-6 rounded-lg transition-all hover:border-primary hover:bg-primary/5"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                }}
              >
                I'm Getting Quotes →
              </motion.button>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5 text-muted-foreground text-[13px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {["No account required", "Your contractor never knows", "Results in 60 seconds"].map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="mr-2 hidden sm:inline text-muted-foreground/40">·</span>}
                  <span className="text-brand-lime">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            {/* Hand scanner hero image — top on mobile */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[360px] md:max-w-none mb-6 md:mb-0"
            >
              <img
                src={handScannerImg}
                alt="WindowMan forensic quote scanner"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>

            {/* Floating Grade Card — desktop only */}
            <motion.div
              className="hidden md:block mt-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [-6, 0, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card border border-border rounded-2xl p-7 shadow-[0_8px_40px_hsl(var(--brand-cyan)/0.08)]"
                style={{ maxWidth: 420, width: "100%" }}
              >
                {/* Card Header */}
                <p
                  className="text-muted-foreground mb-5"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                  }}
                >
                  SAMPLE GRADE REPORT
                </p>

                {/* Grade */}
                <div className="text-center">
                  <div
                    className="text-brand-amber"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 96,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    C
                  </div>
                  <p
                    className="text-muted-foreground mt-1"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                    }}
                  >
                    GRADE C — REVIEW BEFORE SIGNING
                  </p>
                </div>

                {/* Dollar Delta */}
                <div className="bg-destructive/10 rounded-lg px-4 py-3 mt-4">
                  <p
                    className="text-destructive font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 16,
                    }}
                  >
                    $4,800 above fair market
                  </p>
                  <p
                    className="text-muted-foreground mt-0.5"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                    }}
                  >
                    Broward County benchmark · Q1 2025
                  </p>
                </div>

                {/* Flag Cards */}
                <div className="flex flex-col gap-2 mt-4">
                  {flagCards.map((flag, i) => (
                    <div
                      key={i}
                      className="flex overflow-hidden bg-card border border-border rounded-lg"
                    >
                      <div
                        className="w-[3px] shrink-0"
                        style={{ backgroundColor: flag.stripe }}
                      />
                      <div className="px-3.5 py-2.5">
                        <p
                          className="text-[13px] font-bold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: flag.labelColor,
                          }}
                        >
                          {flag.icon} {flag.label}
                        </p>
                        <p
                          className="text-muted-foreground text-[11px] mt-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {flag.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="text-center border-t border-border mt-4 pt-3.5">
                  <p className="text-muted-foreground/60 text-[12px] italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    This is a sample. Your quote will generate a real grade.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Power Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
              className="mt-8 md:mt-10 w-full flex justify-center"
            >
              <React.Suspense fallback={<div className="h-[120px]" />}>
                <PowerToolFlow onUploadQuote={onUploadQuote} />
              </React.Suspense>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditHero;
