import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMinutes } from "date-fns";
import "@fontsource/playfair-display/700.css";
import "@fontsource/dm-mono/500.css";

/* ── scan text cycle ── */
const scanTexts = [
  "Extracting line items...",
  "Checking county benchmarks...",
  "Scanning warranty language...",
  "Calculating fair-market delta...",
];

/* ── scan preview animation ── */
const ScanPreview = () => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [scanTextIdx, setScanTextIdx] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const runCycle = () => {
      setPhase(1);
      setScanTextIdx(0);

      t1 = setTimeout(() => {
        setPhase(2);
        let idx = 0;
        interval = setInterval(() => {
          idx = (idx + 1) % scanTexts.length;
          setScanTextIdx(idx);
        }, 500);

        t2 = setTimeout(() => {
          clearInterval(interval);
          setPhase(3);
        }, 2000);
      }, 1500);
    };

    runCycle();
    const loop = setInterval(runCycle, 5500);

    return () => {
      clearInterval(loop);
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="mx-auto relative overflow-hidden"
      style={{
        maxWidth: 480,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: "32px 28px",
        minHeight: 200,
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <span style={{ fontSize: 64, lineHeight: 1 }}>📄</span>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "hsl(220 9% 46%)", marginTop: 12 }}>
              Your quote.pdf
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(213 25% 32%)", fontStyle: "italic", marginTop: 4 }}>
              Before WindowMan
            </p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center relative"
          >
            <div className="relative">
              <span style={{ fontSize: 64, lineHeight: 1, filter: "brightness(1.1)" }}>📄</span>
              <div
                className="absolute inset-0"
                style={{ background: "hsla(192 100% 37% / 0.15)", borderRadius: 8 }}
              />
              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0"
                style={{
                  height: 2,
                  background: "linear-gradient(90deg, transparent, hsl(192 100% 37%), transparent)",
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(192 100% 37%)", letterSpacing: "0.08em", marginTop: 16, minHeight: 18 }}>
              {scanTexts[scanTextIdx]}
            </p>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-center"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "3px solid hsl(24 95% 53%)",
                  background: "hsl(33 100% 96%)",
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: "hsl(24 95% 53%)" }}>
                  C
                </span>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "hsl(0 72% 51%)" }}>
                  +$4,200
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "hsl(215 16% 57%)" }}>
                  above fair market
                </p>
              </motion.div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "hsl(160 84% 39%)", marginTop: 16 }}>
              ⚡ 2 red flags identified — negotiation leverage available
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── helper: add 15 min to time string ── */
const addFifteenMin = (time: string): string => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  const result = addMinutes(d, 15);
  return format(result, "h:mm a");
};

const formatTime12 = (time: string): string => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return format(d, "h:mm a");
};

const formatDateDisplay = (dateStr: string): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return format(d, "EEEE, MMMM d, yyyy");
};

/* ── main component ── */
interface QuoteWatcherProps {
  onSwitchToFlowA?: () => void;
  onViewChecklist?: () => void;
  onReminderSet?: (date: string, time: string) => void;
}

const QuoteWatcher = ({ onSwitchToFlowA, onViewChecklist }: QuoteWatcherProps) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  const bothFilled = appointmentDate && appointmentTime;
  const reminderTime = addFifteenMin(appointmentTime);

  const handleSubmit = () => {
    if (!bothFilled) return;
    console.log({ event: "wm_quote_watcher_set", appointmentDate, appointmentTime });
    setSubmitted(true);
  };

  return (
    <section id="quote-watcher" style={{ backgroundColor: "hsl(213 57% 14%)" }}>
      {/* Section 1 — Preview Animation */}
      <div className="mx-auto max-w-4xl px-4 pt-20 md:px-8 md:pt-28 text-center">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(215 20% 65%)", letterSpacing: "0.1em", marginBottom: 20 }}>
          WHAT HAPPENS WHEN YOU UPLOAD YOUR QUOTE
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 42px)", fontWeight: 700, color: "hsl(0 0% 100%)", marginBottom: 40 }}>
          This is what will happen to your quote once you get it.
        </h2>
        <ScanPreview />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "hsl(220 9% 46%)", fontStyle: "italic", marginTop: 16 }}>
          This is a sample. Your actual quote will generate a real grade.
        </p>
      </div>

      {/* Section 2 — Appointment Setter */}
      <div className="mx-auto max-w-4xl px-4 pb-20 md:px-8 md:pb-28" style={{ marginTop: 48 }}>
        <div className="mx-auto" style={{ maxWidth: 500, background: "hsl(0 0% 100%)", borderRadius: 16, padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 36px)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5" style={{ background: "hsl(39 90% 94%)", border: "1px solid hsl(36 77% 47%)", borderRadius: 6, padding: "5px 14px" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "hsl(36 77% 47%)" }}>
                    SET YOUR QUOTE REMINDER
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "hsl(213 57% 14%)" }}>
                  When is your contractor visiting?
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(220 9% 46%)", marginTop: 8, marginBottom: 28 }}>
                  We'll text you 15 minutes after they leave to help you audit the quote while it's fresh — before you feel pressure to decide.
                </p>

                {/* Date */}
                <div className="mb-3">
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(220 9% 46%)", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                    APPOINTMENT DATE
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={todayStr}
                    style={{
                      width: "100%", height: 48, border: "1.5px solid hsl(220 13% 91%)", borderRadius: 8, padding: "0 16px",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "hsl(213 57% 14%)", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(36 77% 47%)"; e.currentTarget.style.boxShadow = "0 0 0 3px hsla(36 77% 47% / 0.12)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(220 13% 91%)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Time */}
                <div className="mb-4">
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(220 9% 46%)", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                    APPROXIMATE APPOINTMENT TIME
                  </label>
                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    style={{
                      width: "100%", height: 48, border: "1.5px solid hsl(220 13% 91%)", borderRadius: 8, padding: "0 16px",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "hsl(213 57% 14%)", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(36 77% 47%)"; e.currentTarget.style.boxShadow = "0 0 0 3px hsla(36 77% 47% / 0.12)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(220 13% 91%)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Confirmation note */}
                <AnimatePresence>
                  {bothFilled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2.5 mb-4"
                      style={{ background: "hsl(39 90% 94%)", borderRadius: 8, padding: "12px 16px" }}
                    >
                      <span className="shrink-0" style={{ fontSize: 16, color: "hsl(36 77% 47%)" }}>🔔</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "hsl(220 9% 30%)" }}>
                        We'll send you an SMS at approximately {reminderTime} on {formatDateDisplay(appointmentDate)} with a direct link to upload your quote.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  whileHover={bothFilled ? { scale: 1.01 } : {}}
                  whileTap={bothFilled ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={!bothFilled}
                  style={{
                    width: "100%", height: 52, borderRadius: 10, border: "none",
                    background: bothFilled ? "hsl(36 77% 47%)" : "hsl(220 13% 83%)",
                    color: "hsl(0 0% 100%)",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
                    boxShadow: bothFilled ? "0 4px 16px hsla(36 77% 47% / 0.35)" : "none",
                    cursor: bothFilled ? "pointer" : "not-allowed",
                    transition: "background 0.2s, box-shadow 0.2s",
                  }}
                >
                  Set My Quote Reminder →
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Check circle */}
                <div className="mx-auto mb-5 flex items-center justify-center" style={{ width: 72, height: 72, borderRadius: "50%", background: "hsl(152 82% 96%)", border: "2px solid hsl(160 84% 39%)" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M7 14l5 5 9-9" stroke="hsl(160 84% 39%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "hsl(213 57% 14%)" }}>
                  Reminder set. We'll be there.
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "hsl(220 9% 30%)", lineHeight: 1.75, marginTop: 12 }}>
                  We'll text your mobile number on {formatDateDisplay(appointmentDate)} at {reminderTime}.
                  When you get your quote, your full audit — including your county baseline — will be ready and waiting.
                </p>

                {/* Appointment summary */}
                <div className="text-left mx-auto mt-5" style={{ background: "hsl(210 20% 98%)", border: "1px solid hsl(220 13% 91%)", borderRadius: 10, padding: "16px 18px", maxWidth: 360 }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(220 9% 46%)" }}>CONTRACTOR VISIT</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "hsl(213 57% 14%)" }}>
                    {formatDateDisplay(appointmentDate)} at {formatTime12(appointmentTime)}
                  </p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(220 9% 46%)", marginTop: 8 }}>WINDOWMAN REMINDER</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "hsl(192 100% 37%)" }}>
                    {reminderTime} — Upload ready
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onViewChecklist}
                  className="mt-6 inline-block"
                  style={{
                    background: "hsl(36 77% 47%)", color: "hsl(0 0% 100%)",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                    padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer",
                  }}
                >
                  View My Forensic Checklist →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Section 3 — Flow B Closing */}
      <div className="mx-auto max-w-3xl px-4 pb-16 md:pb-28 text-center" style={{ marginTop: 40 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, fontStyle: "italic", color: "hsl(0 0% 100%)" }}>
          Most homeowners decide whether to sign based on how the contractor made them feel.
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "hsl(36 77% 47%)", marginTop: 12 }}>
          You'll decide based on what the data says.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "hsl(215 20% 65%)", marginTop: 20 }}>
          Your baseline is set. Your checklist is ready. Your reminder is booked.
          When the quote arrives, you'll be the most informed homeowner in the room.
        </p>
        <button
          onClick={() => {
            console.log({ event: "wm_flow_b_to_a_late_switch" });
            onSwitchToFlowA?.();
          }}
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "hsl(220 9% 46%)",
            textDecoration: "underline", background: "none", border: "none", cursor: "pointer",
            marginTop: 16, display: "inline-block",
          }}
        >
          Already have a quote? Scan it now →
        </button>
      </div>
    </section>
  );
};

export default QuoteWatcher;
