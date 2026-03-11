import { useState } from "react";
import { motion } from "framer-motion";

import "@fontsource/dm-mono/500.css";

/* ── question data ── */
const questions = [
  {
    id: 1,
    severity: "critical" as const,
    question: "Is the window brand, product line, and series specified by name in the contract?",
    label: "⚑ CRITICAL — MOST COMMONLY MISSED",
    labelColor: "hsl(var(--brand-ruby))",
    circleBorder: "hsl(var(--brand-ruby))",
    why: `"Impact windows" is not a brand. PGT WinGuard Series 500, SGT Impact Plus, or Lawson LP Impact are brands. If your contract says only "impact windows," your contractor can legally install any brand at any quality level — and charge premium prices for a budget product. This is the #1 red flag we find in Broward and Miami-Dade contracts.`,
    askLabel: "SAY EXACTLY THIS:",
    askColor: "hsl(var(--brand-ruby))",
    askBorder: "hsl(var(--brand-ruby))",
    askText: `"What specific brand, product line, and series of window will you be installing? I need that language in the contract before I sign."`,
  },
  {
    id: 2,
    severity: "critical" as const,
    question: "Does the labor warranty period match the manufacturer's product warranty?",
    label: "⚑ HIGH RISK — FINANCIAL EXPOSURE",
    labelColor: "hsl(var(--brand-ruby))",
    circleBorder: "hsl(var(--brand-ruby))",
    why: `Many contractors offer a 1-year labor warranty on windows that carry a 10-year or lifetime manufacturer warranty. When the seal fails at year 3, the manufacturer's warranty is void because of improper installation — but your labor warranty expired 2 years ago. You have no coverage. Industry standard is a minimum 3-year labor warranty for full-home replacement projects.`,
    askLabel: "SAY EXACTLY THIS:",
    askColor: "hsl(var(--brand-ruby))",
    askBorder: "hsl(var(--brand-ruby))",
    askText: `"What is your labor warranty period for this installation? And does it remain valid if I file a manufacturer warranty claim?"`,
  },
  {
    id: 3,
    severity: "important" as const,
    question: "Are permit fees listed as a separate line item, or 'included' in the total price?",
    label: "⚡ IMPORTANT — LEVERAGE POINT",
    labelColor: "hsl(var(--brand-amber))",
    circleBorder: "hsl(var(--brand-amber))",
    why: `The word "included" is one of the most expensive words in a window contract. When permit fees are "included," the contractor controls whether they actually pull a permit — and many don't. Unpermitted window installations fail home inspections at resale, void insurance claims after storm damage, and cannot be remedied without tearing out the windows and reinstalling them. Permit costs should always be a line item with a real dollar amount.`,
    askLabel: "SAY EXACTLY THIS:",
    askColor: "hsl(var(--brand-amber))",
    askBorder: "hsl(var(--brand-amber))",
    askText: `"Can you show me the permit fee as a separate line item with a dollar amount? I'd like to confirm the permit is being pulled before work begins."`,
  },
  {
    id: 4,
    severity: "important" as const,
    question: "What is the NOA (Notice of Acceptance) number for the specific windows being installed?",
    label: "⚡ IMPORTANT — LEVERAGE POINT",
    labelColor: "hsl(var(--brand-amber))",
    circleBorder: "hsl(var(--brand-amber))",
    why: `A Notice of Acceptance (NOA) is issued by Miami-Dade PHRD and certifies that a window system has passed Florida's impact standards. Every legitimate impact window has one. If your contractor cannot provide the NOA number for your specific windows, they may be installing a product that doesn't meet Florida Building Code — which creates insurance, inspection, and safety exposure. A contractor who balks at this question is a contractor worth questioning.`,
    askLabel: "SAY EXACTLY THIS:",
    askColor: "hsl(var(--brand-amber))",
    askBorder: "hsl(var(--brand-amber))",
    askText: `"What is the Miami-Dade NOA number for the windows you're installing? I'd like to verify it before we finalize the contract."`,
  },
  {
    id: 5,
    severity: "technical" as const,
    question: "Is the installation method specified — buck frame, fin, or flush installation?",
    label: "◎ TECHNICAL — QUALITY ASSURANCE",
    labelColor: "hsl(var(--primary))",
    circleBorder: "hsl(var(--primary))",
    why: `Buck vs. fin installation affects energy efficiency, water intrusion vulnerability, and long-term structural performance. It also significantly affects cost — fin installation is faster and cheaper; full frame replacement is more thorough. If the method isn't specified, you don't know what you're getting. Contractors who don't specify it are protecting their flexibility, not your home.`,
    askLabel: "SAY EXACTLY THIS:",
    askColor: "hsl(var(--primary))",
    askBorder: "hsl(var(--primary))",
    askText: `"Is this a fin installation, buck frame, or full frame replacement? Can you add the installation method to the contract language?"`,
  },
];

interface ForensicChecklistProps {
  onUploadQuote?: () => void;
  onSetReminder?: () => void;
}

const ForensicChecklist = ({ onUploadQuote, onSetReminder }: ForensicChecklistProps) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggleCheck = (id: number) => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
    const allChecked = Object.values(newChecked).filter(Boolean).length === 5;
    console.log({ event: 'wm_checklist_question_checked', questionNumber: id, allChecked });
    if (allChecked) {
      console.log({ event: 'wm_checklist_completed' });
    }
  };

  return (
    <section id="forensic-checklist" className="bg-background border-t border-white/5">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        {/* Document card */}
        <div className="relative overflow-hidden glass-card rounded-2xl">

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none" style={{ zIndex: 0 }}>
            <div style={{ transform: "rotate(-35deg)", opacity: 0.03, fontFamily: "'DM Mono', monospace", fontSize: 24, color: "hsl(var(--foreground))", whiteSpace: "nowrap", lineHeight: 2.5 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}>WINDOWMAN FORENSIC &nbsp;&nbsp;&nbsp; WINDOWMAN FORENSIC &nbsp;&nbsp;&nbsp; WINDOWMAN FORENSIC</div>
              ))}
            </div>
          </div>

          {/* Header bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ background: "hsl(var(--card))", padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="shrink-0">
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "hsl(var(--primary))", fontWeight: 700, letterSpacing: "0.15em" }}>WINDOWMAN.PRO</p>
              <p className="text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>Forensic Intelligence Division</p>
            </div>
            <div className="text-left sm:text-center flex-1">
              <p className="text-foreground font-bold" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>HOMEOWNER'S FORENSIC CHECKLIST</p>
              <p className="text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>Pre-Quote Site Visit Edition</p>
            </div>
            <div className="shrink-0">
              <div style={{ background: "hsl(var(--brand-ruby) / 0.1)", border: "1px solid hsl(var(--brand-ruby) / 0.25)", borderRadius: 6, padding: "5px 10px" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "hsl(var(--brand-ruby))", fontWeight: 700, letterSpacing: "0.08em" }}>CONFIDENTIAL</p>
              </div>
              <p className="text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9 }}>For homeowner use only</p>
            </div>
          </div>

          {/* Intro */}
          <div className="relative z-10 flex gap-4 items-start" style={{ padding: "28px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="shrink-0 hidden sm:flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 10, background: "hsl(var(--primary) / 0.1)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700 }}>
                5 Questions Contractors Hope You Never Ask
              </p>
              <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, marginTop: 6 }}>
                These questions expose the information asymmetry in every impact window sales pitch. Contractors are not obligated to volunteer this information. You must ask directly. Bring this checklist to your site visit.
              </p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "hsl(var(--brand-ruby))", fontWeight: 600, marginTop: 10 }}>
                ⚠ A contractor who cannot answer questions 1 or 4 should not receive a signed contract without further documentation.
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="relative z-10" style={{ padding: "0 28px" }}>
            {questions.map((q) => (
              <div key={q.id} style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="shrink-0 flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: "50%", background: `${q.circleBorder}15`, border: `1.5px solid ${q.circleBorder}` }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 900, color: q.circleBorder }}>{q.id}</span>
                    </div>
                    <p className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.4, paddingTop: 4 }}>
                      {q.question}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCheck(q.id)}
                    className="shrink-0 transition-all duration-150"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      border: `2px solid ${checked[q.id] ? "hsl(var(--brand-lime))" : "rgba(255,255,255,0.15)"}`,
                      background: checked[q.id] ? "hsl(var(--brand-lime))" : "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 4,
                    }}
                  >
                    {checked[q.id] && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-5" stroke="hsl(0 0% 2%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="glass-card rounded-lg mt-3" style={{ padding: "14px 16px" }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: q.labelColor, marginBottom: 8 }}>
                    {q.label}
                  </p>
                  <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7 }}>
                    {q.why}
                  </p>
                </div>

                <div className="mt-3 rounded" style={{ background: "transparent", borderLeft: `3px solid ${q.askBorder}`, padding: "10px 14px" }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: q.askColor, letterSpacing: "0.08em", marginBottom: 4 }}>
                    {q.askLabel}
                  </p>
                  <p className="text-foreground italic" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, lineHeight: 1.6 }}>
                    {q.askText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="relative z-10" style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "hsl(var(--card))" }}>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-muted-foreground" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
                {checkedCount} of 5 reviewed
              </p>
              <div className="flex-1 h-1 bg-white/5 rounded-sm overflow-hidden">
                <motion.div
                  className="h-full rounded-sm"
                  style={{ background: "hsl(var(--brand-lime))" }}
                  animate={{ width: `${(checkedCount / 5) * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {checkedCount === 0 && (
              <p className="text-muted-foreground italic" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                Check each question as you confirm it with your contractor.
              </p>
            )}
            {checkedCount > 0 && checkedCount < 5 && (
              <p className="text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                {checkedCount} items reviewed. {5 - checkedCount} remaining before signing is safe.
              </p>
            )}
            {checkedCount === 5 && (
              <>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "hsl(var(--brand-lime))" }}>
                  ✓ All 5 confirmed. You're protected. Upload your final contract for a full AI grade before you sign.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log({ event: "wm_checklist_completed_flow_b_to_a_transition" });
                    onUploadQuote?.();
                  }}
                  className="mt-3 bg-primary text-primary-foreground font-bold rounded-lg"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    padding: "14px 28px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Upload My Quote for a Full Grade →
                </motion.button>
              </>
            )}

            <button
              onClick={() => {
                window.print();
                console.log({ event: "wm_checklist_downloaded" });
              }}
              className="mt-4 glass-card rounded-lg block text-muted-foreground hover:text-foreground transition-colors"
              style={{
                padding: "12px 24px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              ⬇ Save Checklist as PDF
            </button>
          </div>
        </div>

        {/* Post-checklist bridge */}
        <div className="text-center glass-card rounded-2xl mt-8" style={{ padding: "40px 28px" }}>
          <h3 className="text-foreground" style={{ fontFamily: "'Jost', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Now set the reminder.
          </h3>
          <p className="text-muted-foreground mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
            When is your contractor visiting? We'll text you 15 minutes after they leave to help you audit the quote while it's fresh.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSetReminder}
            className="mt-5 inline-block bg-primary text-primary-foreground font-bold rounded-lg"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              padding: "14px 32px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Set My Quote Reminder →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ForensicChecklist;
