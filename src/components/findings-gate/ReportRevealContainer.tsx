import { motion, AnimatePresence } from "framer-motion";

interface ReportRevealContainerProps {
  isLocked: boolean;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}

export function ReportRevealContainer({
  isLocked,
  children,
  overlay,
}: ReportRevealContainerProps) {
  return (
    <div className="relative min-h-screen">
      <motion.div
        initial={false}
        animate={{
          filter: isLocked ? "blur(6px)" : "blur(0px)",
          scale: isLocked ? 0.985 : 1,
          opacity: isLocked ? 0.55 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="origin-top"
      >
        <div className={isLocked ? "overflow-hidden max-h-screen" : ""}>
          {children}
        </div>
      </motion.div>

      <AnimatePresence>
        {isLocked && overlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-50"
          >
            {overlay}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed inset-0 pointer-events-none z-40 bg-[#1A6FD4]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
