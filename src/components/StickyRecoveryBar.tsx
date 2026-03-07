import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyRecoveryBarProps {
  stepsCompleted: number;
  county: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const getStatusCopy = (steps: number) => {
  switch (steps) {
    case 0: return { line1: "Your scan is ready to configure.", line2: "Takes 60 seconds. Free." };
    case 1: return { line1: "You answered 1 of 4 questions.", line2: "Takes less than a minute to finish." };
    case 2: return { line1: "You're halfway through your scan.", line2: "Takes less than a minute to finish." };
    case 3: return { line1: "One question left before your grade.", line2: "Your analysis is waiting." };
    default: return { line1: "Your scan is configured — enter your details.", line2: "Your analysis is waiting." };
  }
};

const getCtaText = (steps: number) => {
  if (steps === 0) return "Start My Scan →";
  if (steps >= 4) return "Unlock My Grade →";
  return "Continue My Scan →";
};

const StickyRecoveryBar = ({ stepsCompleted, county, isVisible, onDismiss }: StickyRecoveryBarProps) => {
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      if (stepsCompleted > 0) setIsUrgent(true);
    }, 150000); // 3 minutes after bar appears
    return () => clearTimeout(timer);
  }, [isVisible, stepsCompleted]);

  const handleCta = () => {
    document.getElementById("truth-gate")?.scrollIntoView({ behavior: "smooth" });
    console.log({ event: "wm_recovery_bar_clicked", stepsCompleted });
  };

  const handleClose = () => {
    localStorage.setItem("wm_recovery_bar_dismissed", "true");
    console.log({ event: "wm_recovery_bar_dismissed", stepsCompleted });
    onDismiss();
  };

  const { line1, line2 } = getStatusCopy(stepsCompleted);
  const urgentLine1 = isUrgent ? "Your configured scan expires in 24 hours." : line1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 8000,
            background: "#FFFFFF",
            borderTop: `2px solid ${isUrgent ? "#DC2626" : "#C8952A"}`,
            boxShadow: "0 -4px 24px rgba(15, 31, 53, 0.14)",
          }}
          className="px-5 py-3.5 sm:px-8 sm:py-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap relative">
            {/* Left — Status */}
            <div className="flex items-center gap-3.5">
              {/* Progress dots */}
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: i < stepsCompleted ? "#C8952A" : "#E5E7EB",
                      border: i < stepsCompleted ? "none" : "1.5px solid #D1D5DB",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </div>

              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#0F1F35" }}>
                  {urgentLine1}
                </p>
                <p
                  className="hidden sm:block"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6B7280" }}
                >
                  {line2}
                </p>
              </div>
            </div>

            {/* Center — Mini progress bar (desktop) */}
            <div className="hidden md:block" style={{ width: 160, height: 4, background: "#E5E7EB", borderRadius: 2 }}>
              <motion.div
                style={{ height: "100%", background: "#C8952A", borderRadius: 2 }}
                animate={{ width: `${(stepsCompleted / 4) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>

            {/* Right — CTA + Close */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCta}
                style={{
                  background: "#C8952A",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "10px 22px",
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 2px 10px rgba(200,149,42,0.3)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {getCtaText(stepsCompleted)}
              </button>

              <button
                onClick={handleClose}
                style={{
                  background: "transparent",
                  border: "none",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9CA3AF",
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F3F4F6";
                  e.currentTarget.style.color = "#374151";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9CA3AF";
                }}
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyRecoveryBar;
