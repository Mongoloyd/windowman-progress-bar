import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyRecoveryBarProps {
  stepsCompleted: number;
  county: string;
  isVisible: boolean;
  onDismiss: () => void;
  flowMode?: 'A' | 'B';
  flowBLeadCaptured?: boolean;
  quoteWatcherSet?: boolean;
}

const getStatusCopy = (steps: number, flowMode: string, flowBLeadCaptured: boolean) => {
  if (flowMode === 'B') {
    if (!flowBLeadCaptured) {
      return { line1: "Your baseline is being configured.", line2: "Takes less than a minute." };
    }
    return { line1: "Set your quote reminder to complete Flow B.", line2: "Your analysis is waiting." };
  }
  switch (steps) {
    case 0: return { line1: "Your scan is ready to configure.", line2: "Takes 60 seconds. Free." };
    case 1: return { line1: "You answered 1 of 4 questions.", line2: "Takes less than a minute to finish." };
    case 2: return { line1: "You're halfway through your scan.", line2: "Takes less than a minute to finish." };
    case 3: return { line1: "One question left before your grade.", line2: "Your analysis is waiting." };
    default: return { line1: "Your scan is configured — enter your details.", line2: "Your analysis is waiting." };
  }
};

const getCtaText = (steps: number, flowMode: string, flowBLeadCaptured: boolean) => {
  if (flowMode === 'B') {
    if (!flowBLeadCaptured) return "Continue to Baseline →";
    return "Set My Reminder →";
  }
  if (steps === 0) return "Start My Scan →";
  if (steps >= 4) return "Unlock My Grade →";
  return "Continue My Scan →";
};

const getCtaTarget = (flowMode: string, flowBLeadCaptured: boolean) => {
  if (flowMode === 'B') {
    return flowBLeadCaptured ? "quote-watcher" : "market-baseline";
  }
  return "truth-gate";
};

const StickyRecoveryBar = ({
  stepsCompleted, county, isVisible, onDismiss,
  flowMode = 'A', flowBLeadCaptured = false, quoteWatcherSet = false,
}: StickyRecoveryBarProps) => {
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      if (stepsCompleted > 0) setIsUrgent(true);
    }, 150000);
    return () => clearTimeout(timer);
  }, [isVisible, stepsCompleted]);

  const handleCta = () => {
    const target = getCtaTarget(flowMode, flowBLeadCaptured);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    console.log({ event: "wm_recovery_bar_clicked", stepsCompleted, flowMode });
  };

  const handleClose = () => {
    localStorage.setItem("wm_recovery_bar_dismissed", "true");
    console.log({ event: "wm_recovery_bar_dismissed", stepsCompleted, flowMode });
    onDismiss();
  };

  const { line1, line2 } = getStatusCopy(stepsCompleted, flowMode, flowBLeadCaptured);
  const urgentLine1 = isUrgent && flowMode === 'A' ? "Your configured scan expires in 24 hours." : line1;

  // Hide for completed Flow B
  if (flowMode === 'B' && quoteWatcherSet) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[8000] px-5 py-3.5 sm:px-8 sm:py-4 glass-card border-t"
          style={{
            borderTopColor: isUrgent && flowMode === 'A' ? "hsl(var(--destructive))" : "hsl(var(--primary))",
            borderTopWidth: 2,
            boxShadow: "0 -4px 24px hsla(0 0% 0% / 0.4)",
          }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap relative">
            {/* Left — Status */}
            <div className="flex items-center gap-3.5">
              {/* Progress dots */}
              <div className="flex items-center gap-1">
                {(flowMode === 'A' ? [0, 1, 2, 3] : [0, 1, 2]).map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full transition-colors"
                    style={{
                      background: i < stepsCompleted ? "hsl(var(--primary))" : "hsla(0 0% 100% / 0.1)",
                      border: i < stepsCompleted ? "none" : "1.5px solid hsla(0 0% 100% / 0.15)",
                    }}
                  />
                ))}
              </div>

              <div>
                <p className="text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700 }}>
                  {urgentLine1}
                </p>
                <p
                  className="hidden sm:block text-muted-foreground"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
                >
                  {line2}
                </p>
              </div>
            </div>

            {/* Center — Mini progress bar (desktop) */}
            <div className="hidden md:block" style={{ width: 160, height: 4, background: "hsla(0 0% 100% / 0.05)", borderRadius: 2 }}>
              <motion.div
                style={{ height: "100%", background: "hsl(var(--primary))", borderRadius: 2 }}
                animate={{ width: `${(stepsCompleted / (flowMode === 'A' ? 4 : 3)) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>

            {/* Right — CTA + Close */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCta}
                className="whitespace-nowrap"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "10px 22px",
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 2px 10px hsla(185 100% 50% / 0.3)",
                  cursor: "pointer",
                }}
              >
                {getCtaText(stepsCompleted, flowMode, flowBLeadCaptured)}
              </button>

              <button
                onClick={handleClose}
                className="flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
                style={{
                  background: "transparent",
                  border: "none",
                  width: 28,
                  height: 28,
                  color: "hsl(var(--muted-foreground))",
                  fontSize: 16,
                  cursor: "pointer",
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
