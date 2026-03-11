import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "doc" | "scan" | "reveal" | "hook";

const SCAN_LINES = [
  "Extracting line items...",
  "Checking county benchmarks...",
  "Scanning warranty language...",
  "Brand specification check...",
  "Calculating fair-market delta...",
];

interface ScanData {
  filename: string;
  meta: string;
  grade: string;
  gradeHsl: string;      // CSS hsl var for grade color
  gradeBgHsl: string;    // CSS hsl var for grade bg (with opacity)
  delta: number;
  flag1Label: string;
  flag1Hsl: string;
  flag1Title: string;
  flag1Desc: string;
  flag2Label: string;
  flag2Hsl: string;
  flag2Title: string;
}

const SCANS: ScanData[] = [
  {
    filename: "WindowQuote_SampleHome.pdf",
    meta: "Broward County · 14 Windows · $18,400",
    grade: "C",
    gradeHsl: "var(--brand-amber)",
    gradeBgHsl: "var(--brand-amber)",
    delta: 4200,
    flag1Label: "⚑ CRITICAL",
    flag1Hsl: "var(--destructive)",
    flag1Title: "No Window Brand Specified",
    flag1Desc: "Your contractor can install any brand at any quality level.",
    flag2Label: "⚑ WARRANTY ISSUE",
    flag2Hsl: "var(--brand-amber)",
    flag2Title: "Labor Warranty Gap",
  },
  {
    filename: "Estimate_Miami_Dade_2025.pdf",
    meta: "Miami-Dade County · 9 Windows · $12,150",
    grade: "B+",
    gradeHsl: "var(--brand-lime)",
    gradeBgHsl: "var(--brand-lime)",
    delta: 450,
    flag1Label: "⚑ TERMS ISSUE",
    flag1Hsl: "var(--brand-amber)",
    flag1Title: "Vague Payment Schedule",
    flag1Desc: "Deposit exceeds standard 10%; lacks milestone definitions.",
    flag2Label: "⚑ MISSING DETAIL",
    flag2Hsl: "var(--primary)",
    flag2Title: 'Permit Fees "TBD"',
  },
  {
    filename: "Proposal_PalmBeach_Glass.pdf",
    meta: "Palm Beach County · 22 Windows · $36,800",
    grade: "D",
    gradeHsl: "var(--destructive)",
    gradeBgHsl: "var(--destructive)",
    delta: 8500,
    flag1Label: "⚑ COMPLIANCE RISK",
    flag1Hsl: "var(--destructive)",
    flag1Title: "Missing NOA Specifications",
    flag1Desc: "No Notice of Acceptance numbers listed for hurricane compliance.",
    flag2Label: "⚑ CONTRACT RISK",
    flag2Hsl: "var(--brand-amber)",
    flag2Title: "25% Cancellation Fee",
  },
];

const track = (event: string) => {
  console.log({ event, timestamp: new Date().toISOString() });
};

/* ── Animated counter hook ─────────────────────────────────── */
function useCounter(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setVal(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ── Full-Size Mock Document Component ─────────────────────── */
const MockDocument = ({ activeScan, phase, scanText, scanProgress }: {
  activeScan: ScanData; phase: Phase; scanText: string; scanProgress: number;
}) => {
  const isScanning = phase === "scan";

  return (
    <div className="relative w-full h-full rounded-xl border border-border bg-background p-6 flex flex-col overflow-hidden shadow-inner">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
              PDF
            </span>
            <p className="font-mono text-xs font-semibold text-foreground truncate max-w-[200px] sm:max-w-[300px]">
              {activeScan.filename}
            </p>
          </div>
          <p className="font-sans text-[11px] text-muted-foreground">{activeScan.meta}</p>
        </div>
      </div>

      {/* Contract Skeletons */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-2.5 w-[85%] bg-muted rounded-full" />
        <div className="h-2.5 w-[92%] bg-muted rounded-full" />
        <div className="h-2.5 w-[78%] bg-muted rounded-full" />
        <div className="h-2.5 w-[88%] bg-muted rounded-full" />
        <div className="mt-4 border border-border rounded-md overflow-hidden">
          <div className="h-8 bg-muted/30 border-b border-border" />
          <div className="h-8 border-b border-border" />
          <div className="h-8 bg-muted/30 border-b border-border" />
          <div className="h-8" />
        </div>
        <div className="mt-4 h-2.5 w-[40%] bg-muted rounded-full" />
        <div className="h-2.5 w-[60%] bg-muted rounded-full" />
      </div>

      {/* Scanning Overlays */}
      {isScanning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/5 mix-blend-screen"
          />
          {/* Laser Sweep */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] z-10"
            style={{
              backgroundColor: "hsl(var(--primary))",
              boxShadow: "0 0 20px 4px hsl(var(--primary) / 0.4)",
            }}
          />
          {/* AI Status Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 left-6 right-6 glass-card shadow-2xl rounded-lg p-4 z-20"
            style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase animate-pulse">
                AI Engine Active
              </span>
              <span className="font-mono text-[10px] text-muted-foreground font-bold">{scanProgress}%</span>
            </div>
            <p className="font-mono text-[11px] text-foreground mb-3 h-4">{scanText}</p>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary ease-linear"
                style={{ width: `${scanProgress}%`, transitionProperty: "width", transitionDuration: "1200ms" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

/* ── Flag Card ──────────────────────────────────────────────── */
const FlagCard = ({ label, hsl, title, desc, delay, masked = false }: {
  label: string; hsl: string; title: string; desc?: string; delay: number; masked?: boolean;
}) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="mt-3 w-full rounded-md border-l-[3px] glass-card p-4 text-left"
    style={{ borderLeftColor: `hsl(${hsl})` }}
  >
    <p className="font-mono text-[10px] font-bold tracking-wider" style={{ color: `hsl(${hsl})` }}>
      {label}
    </p>
    <p className="font-sans text-[14px] font-semibold text-foreground mt-1.5">{title}</p>
    {masked ? (
      <div className="flex items-center gap-1 mt-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-[1px] bg-muted-foreground/30" />
        ))}
        <span className="font-sans text-[11px] text-muted-foreground ml-2">[unlock to read]</span>
      </div>
    ) : desc ? (
      <p className="font-sans text-[13px] text-muted-foreground mt-1">{desc}</p>
    ) : null}
  </motion.div>
);

/* ── Main component ────────────────────────────────────────── */
const InteractiveDemoScan = () => {
  const [phase, setPhase] = useState<Phase>("doc");
  const [currentScanIndex, setCurrentScanIndex] = useState(0);
  const [scanTextIndex, setScanTextIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const mountedRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const activeScan = SCANS[currentScanIndex];

  useEffect(() => {
    track("wm_demo_scan_viewed");
    return () => { mountedRef.current = false; };
  }, []);

  // Phase machine
  useEffect(() => {
    const set = (p: Phase, ms: number) => {
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) setPhase(p);
      }, ms);
    };
    if (phase === "doc") { setScanProgress(0); set("scan", 1500); }
    else if (phase === "scan") { requestAnimationFrame(() => setScanProgress(85)); set("reveal", 3500); }
    else if (phase === "reveal") { track("wm_demo_reveal_seen"); requestAnimationFrame(() => setScanProgress(100)); set("hook", 3500); }
    else if (phase === "hook") {
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) { setPhase("doc"); setCurrentScanIndex((prev) => (prev + 1) % SCANS.length); }
      }, 4500);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]);

  // Scan text cycling
  useEffect(() => {
    if (phase !== "scan") return;
    setScanTextIndex(0);
    const iv = setInterval(() => setScanTextIndex((p) => (p + 1) % SCAN_LINES.length), 1200);
    return () => clearInterval(iv);
  }, [phase]);

  const counter = useCounter(activeScan.delta, 1200, phase === "reveal" || phase === "hook");

  return (
    <section className="border-t border-b border-border bg-background py-14 px-4 md:py-20 md:px-8">
      <div className="text-center mb-9">
        <p className="font-mono text-[11px] text-primary tracking-[0.1em] mb-3">LIVE DEMO — WATCH A REAL SCAN</p>
        <h2 className="font-heading text-[28px] md:text-[34px] font-extrabold tracking-tight text-foreground mb-1.5">
          See the AI at work.
        </h2>
        <p className="font-sans text-[15px] text-muted-foreground">This runs automatically. No upload required.</p>
      </div>

      {/* FIXED HEIGHT CONTAINER */}
      <div className="mx-auto max-w-[520px] rounded-2xl border-[1.5px] border-border glass-card p-6 md:p-8 h-[480px] flex flex-col relative"
        style={{ boxShadow: "0 4px 24px hsl(var(--primary) / 0.06)" }}
      >
        <AnimatePresence mode="wait">
          {/* ── PHASES 1 & 2: Document & Scan ───────── */}
          {(phase === "doc" || phase === "scan") && (
            <motion.div
              key="document-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <MockDocument activeScan={activeScan} phase={phase} scanText={SCAN_LINES[scanTextIndex]} scanProgress={scanProgress} />
            </motion.div>
          )}

          {/* ── PHASES 3 & 4: Results & Hook ───────── */}
          {(phase === "reveal" || phase === "hook") && (
            <motion.div
              key="results-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-[2.5px]"
                  style={{
                    borderColor: `hsl(${activeScan.gradeHsl})`,
                    backgroundColor: `hsl(${activeScan.gradeBgHsl} / 0.1)`,
                    boxShadow: `0 0 16px hsl(${activeScan.gradeHsl} / 0.25)`,
                  }}
                >
                  <span className="font-heading text-[36px] font-black leading-none" style={{ color: `hsl(${activeScan.gradeHsl})` }}>
                    {activeScan.grade}
                  </span>
                </motion.div>
                <div className="text-right">
                  <p className="font-mono text-[26px] font-black" style={{ color: `hsl(${activeScan.gradeHsl})` }}>
                    +${counter.toLocaleString()}
                  </p>
                  <p className="font-sans text-[11px] text-muted-foreground mt-0.5">above fair market</p>
                </div>
              </div>

              <FlagCard label={activeScan.flag1Label} hsl={activeScan.flag1Hsl} title={activeScan.flag1Title} desc={activeScan.flag1Desc} delay={0.3} />
              <FlagCard label={activeScan.flag2Label} hsl={activeScan.flag2Hsl} title={activeScan.flag2Title} delay={0.5} masked />

              <div className="flex-1" />

              <AnimatePresence>
                {phase === "hook" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full pt-4 border-t border-border mt-4"
                  >
                    <p className="font-heading text-[15px] italic text-foreground text-center mb-3">
                      This was a sample quote. What would yours say?
                    </p>
                    <motion.button
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      onClick={() => {
                        track("wm_demo_cta_clicked");
                        document.getElementById("truth-gate")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full rounded-lg px-7 py-3 font-sans text-[14px] font-bold text-primary-foreground cursor-pointer border-none"
                      style={{
                        backgroundColor: "hsl(var(--brand-amber))",
                        boxShadow: "0 3px 14px hsl(var(--brand-amber) / 0.35)",
                      }}
                    >
                      Scan My Quote — It's Free →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveDemoScan;
