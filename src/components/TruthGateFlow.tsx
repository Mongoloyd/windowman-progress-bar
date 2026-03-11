import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stepConfig = [
  {
    question: "How many windows are in your project?",
    sub: "We use this to calibrate the market comparison.",
    key: "windowCount",
    options: ["1–5 windows", "6–10 windows", "11–20 windows", "20+ windows"],
  },
  {
    question: "What type of project is this?",
    sub: "This helps the AI focus on the right benchmarks for your scope.",
    key: "projectType",
    options: ["Full home replacement", "Partial replacement", "New construction", "Single room / addition"],
  },
  {
    question: "Which Florida county is the project in?",
    sub: "We have pricing benchmarks for every major Florida county.",
    key: "county",
    options: ["Miami-Dade", "Broward", "Palm Beach", "Other Florida county"],
  },
  {
    question: "What's your approximate quote total?",
    sub: "This is how we calculate your dollar overage against fair market.",
    key: "quoteRange",
    options: ["Under $10,000", "$10,000–$20,000", "$20,000–$35,000", "$35,000+"],
  },
];

const eyebrowLabels = [
  "STEP 1 OF 4 · CONFIGURE YOUR SCAN",
  "STEP 2 OF 4 · CONFIGURE YOUR SCAN",
  "STEP 3 OF 4 · CONFIGURE YOUR SCAN",
  "STEP 4 OF 4 · CONFIGURE YOUR SCAN",
  "STEP 4 OF 4 · SCAN CONFIGURED",
];

type Answers = {
  windowCount: string;
  projectType: string;
  county: string;
  quoteRange: string;
  firstName: string;
  email: string;
  phone: string;
};

type TransitionState = "idle" | "loading" | "estimate" | "done";

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

const OptionButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="transition-all duration-150"
    style={{
      background: selected ? "hsl(var(--primary) / 0.1)" : "hsl(var(--card))",
      border: `1.5px solid ${selected ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 10,
      padding: "18px 16px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15,
      fontWeight: 600,
      color: selected ? "hsl(var(--primary))" : "hsl(var(--foreground))",
      textAlign: "center",
      cursor: "pointer",
      boxShadow: selected ? "0 0 0 3px hsl(var(--primary) / 0.15)" : "none",
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "hsl(185 100% 50%)";
        e.currentTarget.style.background = "hsl(185 100% 50% / 0.08)";
        e.currentTarget.style.color = "hsl(185 100% 50%)";
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "hsl(0 0% 6%)";
        e.currentTarget.style.color = "hsl(0 0% 96%)";
      }
    }}
  >
    {label}
  </button>
);

const Spinner = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="animate-spin" style={{ color: "hsl(var(--primary))" }}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
    <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const TruthGateFlow = ({ onLeadCaptured, onStepChange }: { onLeadCaptured?: () => void; onStepChange?: (step: number, county: string) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    windowCount: "",
    projectType: "",
    county: "",
    quoteRange: "",
    firstName: "",
    email: "",
    phone: "",
  });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [transitionState, setTransitionState] = useState<TransitionState>("idle");

  const selectedCounty = answers.county || "your county";
  const selectedRange = answers.quoteRange || "your";

  const handleOptionClick = useCallback(
    (key: string, value: string) => {
      setSelectedOption(value);
      const newAnswers = { ...answers, [key]: value };
      setAnswers((prev) => ({ ...prev, [key]: value }));

      if (currentStep < 4) {
        setTimeout(() => {
          setSelectedOption("");
          setCurrentStep((s) => {
            const next = s + 1;
            onStepChange?.(next - 1, newAnswers.county || "your county");
            return next;
          });
        }, 300);
      } else {
        setTimeout(() => {
          setTransitionState("loading");
          setTimeout(() => {
            setTransitionState("estimate");
            setTimeout(() => {
              setTransitionState("done");
              setCurrentStep(5);
            }, 1500);
          }, 500);
        }, 400);
      }
    },
    [currentStep]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ event: "wm_lead_captured", ...answers });
    onLeadCaptured?.();
  };

  const progressWidth = currentStep <= 4 ? `${currentStep * 25}%` : "100%";

  const renderStepContent = () => {
    if (transitionState === "loading") {
      return (
        <motion.div
          key="loading"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center justify-center py-12 gap-4"
        >
          <Spinner />
          <p className="text-primary" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15 }}>
            Configuring your analysis...
          </p>
        </motion.div>
      );
    }

    if (transitionState === "estimate") {
      return (
        <motion.div
          key="estimate"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <div className="glass-card rounded-lg p-5">
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "hsl(var(--primary))", letterSpacing: "0.1em" }}>
              BASED ON YOUR ANSWERS
            </p>
            <p className="text-foreground font-bold mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>
              Quotes in {selectedCounty} in the {selectedRange} range...
            </p>
            <p className="text-muted-foreground mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
              ...score between C and D on average. 67% contain at least one red flag.
            </p>
            <p className="text-muted-foreground/70 italic mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
              Your actual grade requires your quote. But you're in a high-risk range.
            </p>
          </div>
        </motion.div>
      );
    }

    if (currentStep >= 1 && currentStep <= 4) {
      const cfg = stepConfig[currentStep - 1];
      return (
        <motion.div
          key={`step-${currentStep}`}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <h2
            className="text-foreground"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(26px, 4vw, 32px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            {cfg.question}
          </h2>
          <p className="text-muted-foreground mb-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            {cfg.sub}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {cfg.options.map((opt) => (
              <OptionButton
                key={opt}
                label={opt}
                selected={selectedOption === opt}
                onClick={() => handleOptionClick(cfg.key, opt)}
              />
            ))}
          </div>
        </motion.div>
      );
    }

    // Step 5 — Lead Gate
    return (
      <motion.div
        key="lead-gate"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25 }}
      >
        <div
          className="inline-flex items-center mb-5"
          style={{
            background: "hsl(var(--brand-lime) / 0.1)",
            border: "1px solid hsl(var(--brand-lime))",
            borderRadius: 6,
            padding: "4px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "hsl(var(--brand-lime))",
          }}
        >
          ✓ Your scan is configured
        </div>

        <h2
          className="text-foreground"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(28px, 4vw, 34px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          See What's In Your Quote.
        </h2>
        <p className="text-muted-foreground mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>
          Enter your details to run the scan.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label style={labelStyle}>FIRST NAME</label>
            <input
              type="text"
              placeholder="Your first name"
              value={answers.firstName}
              onChange={(e) => setAnswers((p) => ({ ...p, firstName: e.target.value }))}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label style={labelStyle}>
              EMAIL ADDRESS <span className="text-muted-foreground/60" style={{ fontWeight: 400 }}>(your grade report is sent here)</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={answers.email}
              onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div>
            <label style={labelStyle}>
              MOBILE NUMBER <span className="text-muted-foreground/60" style={{ fontWeight: 400 }}>(one-time code to unlock your report)</span>
            </label>
            <input
              type="tel"
              placeholder="(555) 000-0000"
              value={answers.phone}
              onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              height: 54,
              background: "hsl(var(--brand-lime))",
              color: "hsl(var(--primary-foreground))",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 10,
              border: "none",
              boxShadow: "0 4px 16px hsl(var(--brand-lime) / 0.35)",
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            Show Me My Grade →
          </motion.button>
        </form>

        <p className="text-muted-foreground/60 text-center mt-3.5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.8 }}>
          No contractor will be contacted without your permission.
          <br />
          No sales calls. Your report is yours — we just help you read it.
        </p>

        <div
          className="flex items-center gap-2 mt-3 glass-card rounded-lg"
          style={{ padding: "10px 14px" }}
        >
          <span
            className="animate-pulse-dot"
            style={{
              width: 8,
              height: 8,
              backgroundColor: "hsl(var(--brand-lime))",
              borderRadius: "50%",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            14 homeowners in {selectedCounty} found red flags today
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="truth-gate" className="bg-background">
      <div className="mx-auto max-w-2xl px-4 md:px-8 py-16 md:py-24">
        {/* Eyebrow + Progress */}
        <p
          className="text-center mb-3"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: "hsl(var(--primary))",
            letterSpacing: "0.1em",
          }}
        >
          {eyebrowLabels[Math.min(currentStep - 1, 4)]}
        </p>
        <div className="w-full h-1 bg-white/5 rounded-sm mb-8">
          <motion.div
            className="h-1 bg-primary rounded-sm"
            animate={{ width: progressWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Step Card */}
        <div
          className="glass-card rounded-2xl overflow-hidden"
          style={{
            padding: "clamp(32px, 5vw, 40px)",
            minHeight: 280,
          }}
        >
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Shared styles
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 10,
  color: "hsl(220 5% 64%)",
  letterSpacing: "0.08em",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1.5px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: "0 16px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  color: "hsl(0 0% 96%)",
  background: "hsl(0 0% 6%)",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "hsl(185 100% 50%)";
  e.currentTarget.style.boxShadow = "0 0 0 3px hsl(185 100% 50% / 0.12)";
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  e.currentTarget.style.boxShadow = "none";
};

export default TruthGateFlow;
