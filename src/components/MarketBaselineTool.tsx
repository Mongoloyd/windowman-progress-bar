import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "@fontsource/dm-mono/500.css";

/* ── price lookup (mock) ── */
const priceData: Record<string, Record<string, [number, number]>> = {
  "Miami-Dade": { "1–5 windows": [5800, 7200], "6–10 windows": [10400, 12800], "11–20 windows": [18600, 22400], "20+ windows": [28000, 34000] },
  Broward:      { "1–5 windows": [5400, 6800], "6–10 windows": [9800, 12200], "11–20 windows": [17200, 21000], "20+ windows": [26000, 31500] },
  "Palm Beach": { "1–5 windows": [6200, 7600], "6–10 windows": [11200, 13600], "11–20 windows": [19800, 24000], "20+ windows": [30000, 36000] },
  Other:        { "1–5 windows": [5600, 7000], "6–10 windows": [10000, 12400], "11–20 windows": [18000, 21800], "20+ windows": [27000, 32500] },
};

const getRange = (county: string, windows: string): [number, number] => {
  const key = county === "Other Florida County" ? "Other" : county;
  return priceData[key]?.[windows] ?? [12400, 14800];
};

/* ── step config ── */
const stepLabels = ["Location", "Project Scope", "Window Type"];

const steps = [
  {
    question: "Which Florida county is your project in?",
    sub: "We have benchmark pricing data for all major Florida counties.",
    key: "county",
    options: ["Miami-Dade", "Broward", "Palm Beach", "Other Florida County"],
  },
  {
    question: "How many windows are you looking to replace?",
    sub: "Larger projects change the per-window benchmark significantly.",
    key: "windowCount",
    options: ["1–5 windows", "6–10 windows", "11–20 windows", "20+ windows"],
  },
  {
    question: "What type of windows are you replacing?",
    sub: "Impact vs. standard windows have very different market price ranges.",
    key: "windowType",
    options: ["🛡 Impact Windows (Hurricane)", "Standard Windows", "Impact + Doors", "Not sure yet"],
  },
];

type Step = 1 | 2 | 3 | "calc" | "gate" | "reveal";

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

/* ── option button (matches TruthGateFlow style but green focus) ── */
const OptionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      background: selected ? "hsl(152 82% 96%)" : "hsl(0 0% 100%)",
      border: `1.5px solid ${selected ? "hsl(160 84% 39%)" : "hsl(220 13% 91%)"}`,
      borderRadius: 10,
      padding: "18px 16px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15,
      fontWeight: 600,
      color: selected ? "hsl(160 84% 39%)" : "hsl(220 9% 30%)",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.15s ease",
      boxShadow: selected ? "0 0 0 3px hsla(160 84% 39% / 0.15)" : "none",
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "hsl(160 84% 39%)";
        e.currentTarget.style.background = "hsl(152 82% 96%)";
        e.currentTarget.style.color = "hsl(160 84% 39%)";
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "hsl(220 13% 91%)";
        e.currentTarget.style.background = "hsl(0 0% 100%)";
        e.currentTarget.style.color = "hsl(220 9% 30%)";
      }
    }}
  >
    {label}
  </button>
);

/* ── counter animation hook ── */
const useCounter = (target: number, duration: number, active: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.floor(t * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return value;
};

/* ── main component ── */
interface MarketBaselineToolProps {
  onLeadCaptured?: (answers: { county: string; windowCount: string; windowType: string }) => void;
  onBaselineRevealed?: () => void;
  onStepComplete?: (step: number, answer: string) => void;
  onChecklistClick?: () => void;
  onReminderClick?: () => void;
}

const MarketBaselineTool = ({ onLeadCaptured, onBaselineRevealed, onStepComplete, onChecklistClick, onReminderClick }: MarketBaselineToolProps) => {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState({ county: "", windowCount: "", windowType: "" });
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({ firstName: "", email: "", phone: "" });
  const [blurAmount, setBlurAmount] = useState(7);
  const [showOverlay, setShowOverlay] = useState(true);
  const calcCounterActive = step === "calc";
  const calcCount = useCounter(427, 800, calcCounterActive);

  const currentStepNum = typeof step === "number" ? step : step === "calc" ? 3 : step === "gate" ? 3 : 3;
  const progressPercent = typeof step === "number" ? ((step - 1) / 3) * 100 + "%"
    : step === "calc" ? "100%" : step === "gate" ? "100%" : "100%";

  const priceRange = getRange(answers.county, answers.windowCount);
  const countyShort = answers.county === "Other Florida County" ? "FL" : answers.county;
  const avgOverage = Math.round((priceRange[1] - priceRange[0]) * 1.6);

  const handleOptionClick = useCallback((key: string, value: string) => {
    setSelected(value);
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    const stepNum = step as number;
    console.log({ event: 'wm_flow_b_step_complete', step: stepNum, answer: value });
    onStepComplete?.(stepNum, value);

    if (stepNum < 3) {
      setTimeout(() => {
        setSelected("");
        setStep((stepNum + 1) as Step);
      }, 300);
    } else {
      // Step 3 → calculation
      setTimeout(() => {
        setStep("calc");
        setTimeout(() => setStep("gate"), 800);
      }, 400);
    }
  }, [step, answers, onStepComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      event: "wm_flow_b_lead_captured",
      county: answers.county,
      windowCount: answers.windowCount,
      windowType: answers.windowType,
    });
    onLeadCaptured?.(answers);
    // Animate reveal
    setShowOverlay(false);
    setTimeout(() => {
      const animStart = performance.now();
      const animBlur = (now: number) => {
        const t = Math.min((now - animStart) / 800, 1);
        setBlurAmount(7 * (1 - t));
        if (t < 1) requestAnimationFrame(animBlur);
        else {
          setStep("reveal");
          console.log({
            event: "wm_baseline_revealed",
            county: answers.county,
            windowCount: answers.windowCount,
            baselineLow: priceRange[0],
            baselineHigh: priceRange[1],
          });
          onBaselineRevealed?.();
        }
      };
      requestAnimationFrame(animBlur);
    }, 400);
  };

  return (
    <section id="market-baseline" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
        {/* Header */}
        <p className="text-center mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(192 100% 37%)", letterSpacing: "0.1em" }}>
          FAIR-MARKET BASELINE GENERATOR
        </p>
        <h2 className="text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 38px)", fontWeight: 700, color: "hsl(213 57% 14%)", marginBottom: 10 }}>
          Don't walk into a sales pitch unarmed.
        </h2>
        <p className="text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "hsl(220 9% 30%)", lineHeight: 1.7, marginBottom: 8 }}>
          Generate your county-specific pricing baseline so you know the fair price before they even open their briefcase.
        </p>

        {step !== "reveal" && (
          <>
            <p className="text-center" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(220 9% 46%)", marginBottom: 32 }}>
              {typeof step === "number"
                ? `Step ${step} of 3 — ${stepLabels[step - 1]}`
                : step === "calc" ? "Calculating baseline…"
                : "Step 3 of 3 — Complete"}
            </p>

            {/* Progress bar */}
            <div style={{ height: 4, background: "hsl(220 13% 91%)", borderRadius: 2, marginBottom: 32, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", background: "hsl(36 77% 47%)", borderRadius: 2 }}
                animate={{ width: progressPercent }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </>
        )}

        {/* Step Card */}
        <div style={{
          background: "hsl(0 0% 100%)",
          border: "1.5px solid hsl(220 13% 91%)",
          borderRadius: 16,
          padding: "clamp(24px, 4vw, 40px)",
          boxShadow: "0 4px 24px hsla(213 57% 14% / 0.08)",
          minHeight: 260,
          overflow: "hidden",
        }}>
          <AnimatePresence mode="wait">
            {/* Steps 1-3 */}
            {typeof step === "number" && (
              <motion.div
                key={`step-${step}`}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 32px)", fontWeight: 600, color: "hsl(213 57% 14%)", marginBottom: 8 }}>
                  {steps[step - 1].question}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(220 9% 46%)", marginBottom: 28 }}>
                  {steps[step - 1].sub}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {steps[step - 1].options.map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={selected === opt}
                      onClick={() => handleOptionClick(steps[step - 1].key, opt)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Calculation state */}
            {step === "calc" && (
              <motion.div
                key="calc"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center py-8"
                style={{ background: "hsl(192 76% 94%)", borderRadius: 12, margin: -8, padding: 40 }}
              >
                {/* Pulse icon */}
                <div className="mb-4" style={{ width: 48, height: 48, borderRadius: "50%", background: "hsl(192 100% 37%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
                    </svg>
                  </motion.div>
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "hsl(192 100% 37%)", letterSpacing: "0.05em" }}>
                  Searching {countyShort || "Florida"} County database…
                </p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, fontWeight: 700, color: "hsl(192 100% 37%)", marginTop: 8 }}>
                  {calcCount}
                </p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "hsl(192 100% 37%)", marginTop: 4 }}>
                  comparable projects found.
                </p>
              </motion.div>
            )}

            {/* Lead Gate */}
            {step === "gate" && (
              <motion.div
                key="gate"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5" style={{ background: "hsl(192 76% 94%)", border: "1px solid hsl(192 100% 37%)", borderRadius: 6, padding: "5px 14px" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "hsl(192 100% 37%)" }}>
                    ✓ BASELINE CALCULATED · {countyShort.toUpperCase()} COUNTY · 427 PROJECTS
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "hsl(213 57% 14%)", marginBottom: 4 }}>
                  Your baseline is ready.
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(220 9% 46%)", marginBottom: 24 }}>
                  Enter your details to unlock your fair-market price range and receive the Homeowner's Forensic Checklist — free.
                </p>

                {/* Blurred price preview */}
                <div className="relative overflow-hidden mb-6" style={{ background: "hsl(210 20% 98%)", borderRadius: 10, padding: "16px 20px" }}>
                  <div style={{ filter: `blur(${blurAmount}px)`, pointerEvents: "none" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(220 9% 46%)", letterSpacing: "0.1em", marginBottom: 4 }}>
                      FAIR MARKET RANGE · {countyShort.toUpperCase()} CO.
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 26, fontWeight: 900, color: "hsl(192 100% 37%)" }}>
                      ${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "hsl(220 9% 46%)", marginTop: 4 }}>
                      For {answers.windowCount} · {countyShort} County · Q1 2025
                    </p>
                  </div>

                  {showOverlay && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ background: "hsla(210 20% 98% / 0.7)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span style={{ fontSize: 20 }}>🔒</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "hsl(213 57% 14%)", marginTop: 8 }}>
                        Enter your details below to unlock
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(220 9% 46%)" }}>
                        Free · No contractor contact
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <FormField label="FIRST NAME" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} placeholder="Your first name" />
                  <FormField label='EMAIL' sublabel="(your baseline + checklist sent here)" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="your@email.com" type="email" />
                  <FormField label="MOBILE NUMBER" sublabel="(for quote reminder when you're ready)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(555) 000-0000" type="tel" />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      height: 54,
                      background: "hsl(160 84% 39%)",
                      color: "hsl(0 0% 100%)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 4px 16px hsla(160 84% 39% / 0.35)",
                      cursor: "pointer",
                      marginTop: 8,
                    }}
                  >
                    Unlock My Baseline + Checklist →
                  </motion.button>
                </form>

                <p className="text-center mt-3.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(220 9% 64%)", lineHeight: 1.8 }}>
                  You'll receive your fair-market baseline and the 5-Question Forensic Checklist instantly.
                  <br />When you have a quote, return here to scan it.
                </p>
              </motion.div>
            )}

            {/* Baseline Reveal */}
            {step === "reveal" && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <RevealedBaseline
                  county={countyShort}
                  windowCount={answers.windowCount}
                  priceRange={priceRange}
                  avgOverage={avgOverage}
                  onChecklistClick={onChecklistClick}
                  onReminderClick={onReminderClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ── form field ── */
const FormField = ({ label, sublabel, value, onChange, placeholder, type = "text" }: {
  label: string; sublabel?: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) => (
  <div>
    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(220 9% 46%)", letterSpacing: "0.08em", display: "block", marginBottom: 5 }}>
      {label} {sublabel && <span style={{ color: "hsl(220 9% 64%)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "normal" }}>{sublabel}</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      style={{
        width: "100%",
        height: 48,
        border: "1.5px solid hsl(220 13% 91%)",
        borderRadius: 8,
        padding: "0 16px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        outline: "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "hsl(160 84% 39%)";
        e.currentTarget.style.boxShadow = "0 0 0 3px hsla(160 84% 39% / 0.12)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "hsl(220 13% 91%)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  </div>
);

/* ── revealed baseline ── */
const RevealedBaseline = ({ county, windowCount, priceRange, avgOverage, onChecklistClick, onReminderClick }: {
  county: string; windowCount: string; priceRange: [number, number]; avgOverage: number;
  onChecklistClick?: () => void; onReminderClick?: () => void;
}) => {
  const [displayLow, setDisplayLow] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1000;
    const step = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayLow(Math.floor(ease * priceRange[0]));
      setDisplayHigh(Math.floor(ease * priceRange[1]));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [priceRange]);

  return (
    <div>
      {/* Revealed card */}
      <div style={{ background: "hsl(192 76% 94%)", border: "1.5px solid hsl(192 100% 37%)", borderRadius: 12, padding: "24px 20px" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(192 100% 37%)", letterSpacing: "0.1em", marginBottom: 8 }}>
          YOUR FAIR-MARKET BASELINE
        </p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 32, fontWeight: 900, color: "hsl(192 100% 37%)" }}>
          ${displayLow.toLocaleString()} – ${displayHigh.toLocaleString()}
        </p>

        <div className="flex flex-col gap-1 mt-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "hsl(220 9% 30%)" }}>
          <p>For {windowCount} in {county} County</p>
          <p>Based on 427 comparable projects · Q1 2025 data</p>
          <p style={{ fontStyle: "italic", color: "hsl(220 9% 46%)" }}>
            Any quote significantly above ${priceRange[1].toLocaleString()} should trigger a full audit.
          </p>
        </div>

        {/* Anchor line */}
        <div style={{ marginTop: 16, padding: "12px 16px", background: "hsl(0 0% 100%)", borderRadius: 8 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "hsl(0 72% 51%)" }}>
            ⚠ The average quote in {county} County comes in ${avgOverage.toLocaleString()} above this range.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(220 9% 46%)", marginTop: 4 }}>
            Now you'll know if yours does too.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            console.log({ event: "wm_checklist_opened" });
            onChecklistClick?.();
          }}
          style={{
            background: "hsl(36 77% 47%)",
            color: "hsl(0 0% 100%)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px 24px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          View My Forensic Checklist →
        </motion.button>

        <button
          onClick={onReminderClick}
          style={{
            background: "hsl(0 0% 100%)",
            border: "1.5px solid hsl(220 13% 91%)",
            color: "hsl(220 9% 30%)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: "12px 20px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Set My Quote Reminder →
        </button>
      </div>
    </div>
  );
};

export default MarketBaselineTool;
