import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/playfair-display/700.css";

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
    style={{
      background: selected ? "#FDF3E3" : "#FFFFFF",
      border: `1.5px solid ${selected ? "#C8952A" : "#E5E7EB"}`,
      borderRadius: 10,
      padding: "18px 16px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 15,
      fontWeight: 600,
      color: selected ? "#C8952A" : "#374151",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.15s ease",
      boxShadow: selected ? "0 0 0 3px rgba(200,149,42,0.15)" : "none",
    }}
    onMouseEnter={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "#C8952A";
        e.currentTarget.style.background = "#FDF3E3";
        e.currentTarget.style.color = "#C8952A";
      }
    }}
    onMouseLeave={(e) => {
      if (!selected) {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.background = "#FFFFFF";
        e.currentTarget.style.color = "#374151";
      }
    }}
  >
    {label}
  </button>
);

const Spinner = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="animate-spin" style={{ color: "#0099BB" }}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
    <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const TruthGateFlow = () => {
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
      setAnswers((prev) => ({ ...prev, [key]: value }));

      if (currentStep < 4) {
        setTimeout(() => {
          setSelectedOption("");
          setCurrentStep((s) => s + 1);
        }, 300);
      } else {
        // Step 4 → loading → estimate → lead gate
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
    // Loading state
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
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#0099BB" }}>
            Configuring your analysis...
          </p>
        </motion.div>
      );
    }

    // Estimate state
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
          <div style={{ background: "#E8F7FB", borderRadius: 10, padding: 20 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#0099BB", letterSpacing: "0.1em" }}>
              BASED ON YOUR ANSWERS
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#0F1F35", fontWeight: 700, marginTop: 8 }}>
              Quotes in {selectedCounty} in the {selectedRange} range...
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#374151", marginTop: 6 }}>
              ...score between C and D on average. 67% contain at least one red flag.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B7280", fontStyle: "italic", marginTop: 8 }}>
              Your actual grade requires your quote. But you're in a high-risk range.
            </p>
          </div>
        </motion.div>
      );
    }

    // Steps 1-4
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
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4vw, 32px)",
              color: "#0F1F35",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {cfg.question}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6B7280", marginBottom: 28 }}>
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
        {/* Badge */}
        <div
          className="inline-flex items-center mb-5"
          style={{
            background: "#ECFDF5",
            border: "1px solid #059669",
            borderRadius: 6,
            padding: "4px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#059669",
          }}
        >
          ✓ Your scan is configured
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 34px)",
            color: "#0F1F35",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          See What's In Your Quote.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#6B7280", marginBottom: 24 }}>
          Enter your details to run the scan.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name */}
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

          {/* Email */}
          <div>
            <label style={labelStyle}>
              EMAIL ADDRESS <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(your grade report is sent here)</span>
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

          {/* Phone */}
          <div>
            <label style={labelStyle}>
              MOBILE NUMBER <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(one-time code to unlock your report)</span>
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

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01, backgroundColor: "#047857" }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              height: 54,
              background: "#059669",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 10,
              border: "none",
              boxShadow: "0 4px 16px rgba(5, 150, 105, 0.35)",
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            Show Me My Grade →
          </motion.button>
        </form>

        {/* Micro Trust */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#9CA3AF",
            lineHeight: 1.8,
            textAlign: "center",
            marginTop: 14,
          }}
        >
          No contractor will be contacted without your permission.
          <br />
          No sales calls. Your report is yours — we just help you read it.
        </p>

        {/* Social Proof Ticker */}
        <div
          className="flex items-center gap-2"
          style={{
            marginTop: 12,
            padding: "10px 14px",
            background: "#F9FAFB",
            borderRadius: 8,
            border: "1px solid #E5E7EB",
          }}
        >
          <span
            className="animate-pulse-dot"
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#059669",
              borderRadius: "50%",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#6B7280" }}>
            14 homeowners in {selectedCounty} found red flags today
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="truth-gate" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="mx-auto max-w-2xl px-4 md:px-8 py-16 md:py-24">
        {/* Eyebrow + Progress */}
        <p
          className="text-center mb-3"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#0099BB",
            letterSpacing: "0.1em",
          }}
        >
          {eyebrowLabels[Math.min(currentStep - 1, 4)]}
        </p>
        <div style={{ width: "100%", height: 4, backgroundColor: "#E5E7EB", borderRadius: 2, marginBottom: 32 }}>
          <motion.div
            style={{ height: 4, backgroundColor: "#C8952A", borderRadius: 2 }}
            animate={{ width: progressWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Step Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #E5E7EB",
            borderRadius: 16,
            padding: "clamp(32px, 5vw, 40px)",
            boxShadow: "0 4px 24px rgba(15, 31, 53, 0.08)",
            minHeight: 280,
            overflow: "hidden",
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
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  color: "#6B7280",
  letterSpacing: "0.08em",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1.5px solid #E5E7EB",
  borderRadius: 8,
  padding: "0 16px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  color: "#0F1F35",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "#C8952A";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,149,42,0.12)";
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "#E5E7EB";
  e.currentTarget.style.boxShadow = "none";
};

export default TruthGateFlow;
