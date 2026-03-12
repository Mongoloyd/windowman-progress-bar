import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationControls } from "framer-motion";

interface StickyRecoveryBarProps {
  stepsCompleted: number;
  county: string;
  isVisible: boolean;
  onDismiss: () => void;
  flowMode?: 'A' | 'B';
  flowBLeadCaptured?: boolean;
  quoteWatcherSet?: boolean;
  onDemoCTAClick?: () => void;
  leadCaptured?: boolean;
  isDevMode?: boolean;
}

const getStatusCopy = (steps: number, flowMode: string, flowBLeadCaptured: boolean) => {
  if (flowMode === 'B') {
    if (!flowBLeadCaptured) {
      return { line1: "Your baseline is being configured.", line2: "Takes less than a minute." };
    }
    return { line1: "Set your quote reminder to complete Flow B.", line2: "Your analysis is waiting." };
  }
  switch (steps) {
    case 0: return { line1: "Your scan is ready to configure.", line2: "View a demo scan and learn how to spot a bad deal." };
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

const getDemoCtaText = (steps: number) => {
  if (steps >= 1) return "See What Your Grade Looks Like";
  return "View AI Scan Demo";
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
  onDemoCTAClick, leadCaptured = false,
}: StickyRecoveryBarProps) => {
  const [isUrgent, setIsUrgent] = useState(false);
  const controls = useAnimationControls();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-aware opacity
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current + 5;
      const isScrollingUp = currentY < lastScrollY.current - 5;
      lastScrollY.current = currentY;

      if (isScrollingDown) {
        controls.start({ opacity: 0.25 }, { duration: 0.3 });
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          controls.start({ opacity: 1 }, { duration: 0.3 });
        }, 150);
      } else if (isScrollingUp) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        controls.start({ opacity: 1 }, { duration: 0.3 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isVisible, controls]);

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

  const handleDemoCta = () => {
    console.log({ event: "wm_recovery_bar_demo_clicked", stepsCompleted, flowMode });
    onDemoCTAClick?.();
    // Auto-dismiss the bar
    localStorage.setItem("wm_recovery_bar_dismissed", "true");
    onDismiss();
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

  const showDemoButton = !leadCaptured && flowMode === 'A';

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
          }}
        >
          <motion.div
            animate={controls}
            style={{
              background: "#FFFFFF",
              borderTop: `2px solid ${isUrgent && flowMode === 'A' ? "#DC2626" : "#C8952A"}`,
              boxShadow: "0 -4px 24px rgba(15, 31, 53, 0.14)",
            }}
            className="px-5 py-3.5 sm:px-8 sm:py-4"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 relative">
              {/* Left — Status */}
              <div className="hidden sm:flex items-center gap-3.5 min-w-0">
                {/* Progress dots */}
                <div className="flex items-center gap-1">
                  {(flowMode === 'A' ? [0, 1, 2, 3] : [0, 1, 2]).map((i) => (
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
                  animate={{ width: `${(stepsCompleted / (flowMode === 'A' ? 4 : 3)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </div>

              {/* Right — CTAs + Close */}
              <div className="flex items-center gap-2.5 flex-1 sm:flex-none justify-center sm:justify-end">
                {showDemoButton && (
                  <button
                    onClick={handleDemoCta}
                    style={{
                      background: "#00B8D4",
                      color: "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      padding: "10px 16px",
                      borderRadius: 8,
                      border: "none",
                      boxShadow: "0 2px 10px rgba(0,184,212,0.3)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getDemoCtaText(stepsCompleted)}
                  </button>
                )}

                <button
                  onClick={handleCta}
                  style={{
                    background: "#C8952A",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 2px 10px rgba(200,149,42,0.3)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getCtaText(stepsCompleted, flowMode, flowBLeadCaptured)}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyRecoveryBar;
