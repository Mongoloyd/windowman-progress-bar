import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ExitIntentModalProps {
  stepsCompleted: number;
  flowMode: 'A' | 'B' | 'C';
  leadCaptured: boolean;
  flowBLeadCaptured: boolean;
  county: string;
  answers: {
    windowCount: string | null;
    projectType: string | null;
    county: string | null;
    quoteStage: string | null;
    firstName: string | null;
    email: string | null;
    phone: string | null;
  };
  onClose: () => void;
  onCTAClick: () => void;
  onLeadSubmit?: (data: { email: string; phone: string }) => void;
  onReminderSet?: (data: { date: string; time: string }) => void;
}

const track = (data: Record<string, unknown>) => {
  console.log({ ...data, timestamp: new Date().toISOString() });
};

const QUESTION_LABELS: Record<string, string> = {
  windowCount: 'Window count',
  projectType: 'Project type',
  county: 'County',
  quoteStage: 'Quote stage',
};

const ExitIntentModal = ({
  stepsCompleted,
  flowMode,
  leadCaptured,
  flowBLeadCaptured,
  county,
  answers,
  onClose,
  onCTAClick,
  onLeadSubmit,
  onReminderSet,
}: ExitIntentModalProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const getVariant = useCallback(() => {
    if (flowMode === 'B' && flowBLeadCaptured) return 'D';
    if (stepsCompleted === 0) return 'A';
    if (stepsCompleted >= 4) return 'C';
    return 'B';
  }, [stepsCompleted, flowMode, flowBLeadCaptured]);

  const show = useCallback(() => {
    if (leadCaptured || sessionStorage.getItem('wm_exit_shown') === 'true') return;
    sessionStorage.setItem('wm_exit_shown', 'true');
    setOpen(true);
    track({ event: 'wm_exit_intent_triggered', stepsCompleted, flowMode });
  }, [leadCaptured, stepsCompleted, flowMode]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (e.clientY < 20) show();
    };
    const handleVisibility = () => {
      if (document.hidden) show();
    };
    document.addEventListener('mouseleave', handleMouse);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('mouseleave', handleMouse);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [show]);

  const variant = getVariant();
  const pct = Math.round((stepsCompleted / 4) * 100);

  const dismiss = () => {
    track({ event: 'wm_exit_modal_dismissed', variant });
    setOpen(false);
    onClose();
  };

  const handleCTA = () => {
    track({ event: 'wm_exit_modal_cta_clicked', variant, stepsCompleted });
    setOpen(false);
    onCTAClick();
  };

  const fields = Object.entries(QUESTION_LABELS);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9500] flex items-center justify-center"
          style={{ background: 'rgba(10,20,35,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-[92%] max-w-[520px] rounded-[20px] bg-card p-9 md:p-9"
            style={{ boxShadow: '0 24px 80px rgba(10,20,35,0.35)' }}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted border-none cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>

            {/* VARIANT A */}
            {variant === 'A' && (
              <div className="text-center">
                <span className="text-[40px] text-amber-text">?</span>
                <h2 className="font-display text-[26px] font-extrabold text-navy mt-2 leading-[1.15]">Before you go — one question.</h2>
                <p className="font-body text-[16px] text-foreground leading-[1.7] mt-3">
                  The average impact window quote in Florida is $4,800 above fair market.
                  It takes 60 seconds to find out if yours is one of them.
                </p>
                <button onClick={handleCTA} className="mt-6 w-full rounded-[10px] bg-gold py-3.5 font-body text-[16px] font-bold text-navy border-none cursor-pointer">
                  Check My Quote — It's Free
                </button>
                <p className="font-body text-[12px] text-muted-foreground mt-3 cursor-pointer" onClick={dismiss}>
                  or leave without checking — your choice.
                </p>
              </div>
            )}

            {/* VARIANT B */}
            {variant === 'B' && (
              <div>
                <div className="rounded-[10px] bg-gold-light p-3.5 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: i < stepsCompleted ? '#F59E0B' : '#E2E8F0' }} />
                        ))}
                      </div>
                      <span className="font-body text-[13px] font-semibold text-navy">{stepsCompleted} of 4 questions answered</span>
                    </div>
                    <span className="font-mono text-[13px] font-bold text-amber-text">{pct}%</span>
                  </div>
                </div>

                <h2 className="font-display text-[26px] font-extrabold text-navy text-center leading-[1.15]">You're {pct}% of the way to your grade.</h2>

                <div className="mt-4 rounded-lg bg-background p-4">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-wider">WHAT YOU'VE CONFIGURED</span>
                  <div className="mt-2 space-y-1.5">
                    {fields.map(([key, label]) => {
                      const val = answers[key as keyof typeof answers];
                      return val ? (
                        <p key={key} className="font-body text-[13px] text-emerald-text">✓ {val}</p>
                      ) : (
                        <p key={key} className="font-body text-[13px] text-muted-foreground italic">○ {label} — not yet answered</p>
                      );
                    })}
                  </div>
                </div>

                <p className="font-body text-[14px] text-foreground mt-4 text-center">
                  Everything you've entered is still here. {4 - stepsCompleted} more answer{4 - stepsCompleted !== 1 ? 's' : ''} and we can run your grade.
                </p>
                <button onClick={handleCTA} className="mt-5 w-full rounded-[10px] bg-gold py-3.5 font-body text-[16px] font-bold text-navy border-none cursor-pointer">
                  {stepsCompleted === 1 && 'Continue My Scan →'}
                  {stepsCompleted === 2 && "I'm 50% There — Finish →"}
                  {stepsCompleted === 3 && 'One Question Left →'}
                </button>
                <p className="font-body text-[12px] text-muted-foreground mt-3 text-center cursor-pointer" onClick={dismiss}>
                  or leave without your results — your choice.
                </p>
              </div>
            )}

            {/* VARIANT C */}
            {variant === 'C' && (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full"
                  style={{ border: '3px dashed #F59E0B' }}
                >
                  <span className="font-display text-[36px] font-black text-amber-text">?</span>
                </motion.div>
                <h2 className="font-display text-[26px] font-extrabold text-navy mt-4 leading-[1.15]">Your grade is configured. It just needs your email.</h2>
                <p className="font-body text-[14px] text-foreground mt-2 leading-[1.7]">
                  You've answered all 4 questions. Your analysis is ready to run. All we need is where to send your grade report.
                </p>
                <div className="mt-5 space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-body text-[14px] text-foreground outline-none focus:border-gold"
                  />
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-body text-[14px] text-foreground outline-none focus:border-gold"
                  />
                  <button
                    onClick={() => {
                      if (email) {
                        track({ event: 'wm_exit_modal_cta_clicked', variant: 'C', stepsCompleted });
                        onLeadSubmit?.({ email, phone });
                        setOpen(false);
                      }
                    }}
                    className="w-full rounded-[10px] bg-emerald py-3.5 font-body text-[16px] font-bold text-navy border-none cursor-pointer"
                  >
                    Show Me My Grade →
                  </button>
                </div>
                <p className="font-body text-[11px] text-muted-foreground mt-2">No sales calls. Report sent instantly. Unsubscribe any time.</p>
                <p className="font-body text-[12px] text-muted-foreground mt-3 cursor-pointer" onClick={dismiss}>
                  or leave without your results — your choice.
                </p>
              </div>
            )}

            {/* VARIANT D */}
            {variant === 'D' && (
              <div className="text-center">
                <h2 className="font-display text-[26px] font-extrabold text-navy leading-[1.15]">Your baseline is set. Don't let it sit unused.</h2>
                <p className="font-body text-[14px] text-foreground mt-2 leading-[1.7]">
                  You know {county} County fair market is $12,400–$14,800. Set a reminder and we'll make sure you use it when the quote arrives.
                </p>
                <div className="mt-5 flex gap-3">
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={e => setReminderDate(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-3 font-body text-[14px] text-foreground outline-none focus:border-gold"
                  />
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-3 font-body text-[14px] text-foreground outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={() => {
                    if (reminderDate) {
                      track({ event: 'wm_exit_modal_cta_clicked', variant: 'D', stepsCompleted });
                      onReminderSet?.({ date: reminderDate, time: reminderTime });
                      setOpen(false);
                    }
                  }}
                  className="mt-4 w-full rounded-[10px] bg-gold py-3.5 font-body text-[16px] font-bold text-navy border-none cursor-pointer"
                >
                  Set My Reminder →
                </button>
                <p className="font-body text-[12px] text-muted-foreground mt-3 cursor-pointer" onClick={dismiss}>
                  or leave without setting a reminder.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;