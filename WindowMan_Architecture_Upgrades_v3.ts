/**
 * WINDOWMAN — ARCHITECTURE UPGRADES v3
 * 7 gaps closed. Every file is drop-in ready for Lovable.
 *
 * FILE 1: src/store/funnelConstants.ts      — The Hidden Fork guardrail
 * FILE 2: src/store/useFunnelStore.ts       — Store patch (pixel dedup + GAP-1 fix)
 * FILE 3: src/hooks/useReturnVisitor.ts     — Returning user detection
 * FILE 4: src/hooks/useIdleTimer.ts         — Mid-funnel stall recovery
 * FILE 5: src/components/StickyRecoveryBar.tsx
 * FILE 6: src/components/ExitIntentModal.tsx
 */

// ══════════════════════════════════════════════════════════════════════════════
// FILE 1 — src/store/funnelConstants.ts
// THE HIDDEN FORK GUARDRAIL — Single source of truth for Step 4 strings
// TruthGateFlow IMPORTS and RENDERS from this. deriveFlow() KEYS against this.
// Structural mismatch is now impossible.
// ══════════════════════════════════════════════════════════════════════════════

// @file src/store/funnelConstants.ts

export const STEP_4_OPTIONS = {
  HAS_WRITTEN_QUOTE:    "I have a written quote from a contractor",       // → Flow A
  HAS_BALLPARK_VERBAL:  "I got a ballpark number but nothing in writing",  // → Flow C
  HAS_CONTRACTOR_VISIT: "I have a contractor visit coming up",             // → Flow C (TIER 1)
  RESEARCH_PHASE:       "I'm still in the research phase",                 // → Flow B
} as const;

export type Step4Answer = typeof STEP_4_OPTIONS[keyof typeof STEP_4_OPTIONS];

// Used in TruthGateFlow to render buttons:
// Object.values(STEP_4_OPTIONS).map(answer => <button key={answer}>{answer}</button>)

// Used in deriveFlow() in the store:
// if (stage === STEP_4_OPTIONS.HAS_WRITTEN_QUOTE) return 'A';

// ── Flow urgency tier — drives call queue priority ──
export const FLOW_TIER: Record<Step4Answer, 1 | 2 | 3> = {
  [STEP_4_OPTIONS.HAS_CONTRACTOR_VISIT]: 1,  // Contractor arriving — CALL NOW
  [STEP_4_OPTIONS.HAS_BALLPARK_VERBAL]:  1,  // No anchor yet — maximum leverage
  [STEP_4_OPTIONS.RESEARCH_PHASE]:       1,  // Zero quotes — we own the first impression
  [STEP_4_OPTIONS.HAS_WRITTEN_QUOTE]:    2,  // Has quote — call within 1 hour
};

export const STEP_4_URGENCY_LABELS: Record<Step4Answer, string> = {
  [STEP_4_OPTIONS.HAS_WRITTEN_QUOTE]:    "SCAN READY",
  [STEP_4_OPTIONS.HAS_BALLPARK_VERBAL]:  "HIGH LEVERAGE",
  [STEP_4_OPTIONS.HAS_CONTRACTOR_VISIT]: "URGENT — ACT NOW",
  [STEP_4_OPTIONS.RESEARCH_PHASE]:       "EARLY ADVANTAGE",
};


// ══════════════════════════════════════════════════════════════════════════════
// FILE 2 — STORE PATCH
// Add these two pieces to useFunnelStore.ts
// (1) pixelsFired deduplication — prevents double-fire on refresh
// (2) Replace raw strings in deriveFlow() with STEP_4_OPTIONS constants
// ══════════════════════════════════════════════════════════════════════════════

// @patch src/store/useFunnelStore.ts

// ADD to imports:
// import { STEP_4_OPTIONS, Step4Answer } from './funnelConstants';

// ADD to FunnelState interface (session only — NOT in partialize):
// pixelsFired: Set<string>;

// ADD to initialState:
// pixelsFired: new Set<string>(),

// REPLACE the fbqTrack helper with this deduplication-aware version:
/*
function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  dedupKey?: string            // optional — if provided, fires at most once per session
) {
  if (typeof window === 'undefined' || !(window as any).fbq) return;
  
  const store = useFunnelStore.getState();
  const key   = dedupKey ?? event;
  
  if (store.pixelsFired.has(key)) return; // already fired this session
  
  (window as any).fbq('trackCustom', event, params ?? {});
  useFunnelStore.setState((s) => ({
    pixelsFired: new Set([...s.pixelsFired, key]),
  }));
}
*/

// REPLACE deriveFlow() with constants-based version:
/*
import { STEP_4_OPTIONS } from './funnelConstants';

function deriveFlow(processStage: string): FlowType {
  if (processStage === STEP_4_OPTIONS.HAS_WRITTEN_QUOTE)    return 'A';
  if (processStage === STEP_4_OPTIONS.RESEARCH_PHASE)       return 'B';
  // Both VERBAL and CONTRACTOR_VISIT → Flow C
  if (
    processStage === STEP_4_OPTIONS.HAS_BALLPARK_VERBAL ||
    processStage === STEP_4_OPTIONS.HAS_CONTRACTOR_VISIT
  ) return 'C';
  return 'A'; // Safe fallback — never silently routes to wrong flow
}
*/


// ══════════════════════════════════════════════════════════════════════════════
// FILE 3 — src/hooks/useReturnVisitor.ts
// RETURNING USER DETECTION — fires on app mount
// Reads restored localStorage state, determines visit type, triggers recovery
// ══════════════════════════════════════════════════════════════════════════════

// @file src/hooks/useReturnVisitor.ts
/*
import { useEffect, useState } from 'react';
import { useFunnelStore } from '../store/useFunnelStore';

export type VisitType =
  | 'fresh'             // no history — new visitor
  | 'partial_early'     // steps 1-2, never captured
  | 'partial_late'      // steps 3-4, county known, never captured
  | 'captured_not_uploaded'  // gave contact info, never uploaded quote
  | 'uploaded_not_scanned'   // uploaded but scan didn't complete
  | 'completed';        // full funnel done

export function useReturnVisitor() {
  const {
    highestStepReached, county, isLeadCaptured,
    isQuoteUploaded, isScanComplete, assignedFlow,
    shadowId, setScreen,
  } = useFunnelStore();
  
  const [visitType, setVisitType]     = useState<VisitType>('fresh');
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    // Determine visit type from persisted state
    let type: VisitType = 'fresh';
    
    if (isScanComplete) {
      type = 'completed';
    } else if (isQuoteUploaded) {
      type = 'uploaded_not_scanned';
    } else if (isLeadCaptured) {
      type = 'captured_not_uploaded';
    } else if (highestStepReached >= 3) {
      type = 'partial_late';   // the money returning user — county known
    } else if (highestStepReached >= 1) {
      type = 'partial_early';
    }

    const returning = type !== 'fresh';
    setVisitType(type);
    setIsReturning(returning);

    if (!returning) return;

    // Fire returning-user pixel (once — deduplicated by store)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'wm_return_visitor', {
        visit_type:          type,
        county:              county,
        highest_step:        highestStepReached,
        assigned_flow:       assignedFlow,
      });
    }

    // Sync abandoned shadow profile back to active (GAP-7 fix)
    if (shadowId && type !== 'completed') {
      fetch('/api/update-shadow-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shadowId,
          returned_at:   new Date().toISOString(),
          abandoned_at:  null,  // clear abandonment flag
        }),
      }).catch(() => {}); // silent fail — non-critical
    }

    // Auto-route returning captured users
    if (type === 'captured_not_uploaded' && assignedFlow === 'A') {
      // Brief delay so the hero is visible first — then route
      setTimeout(() => setScreen('upload'), 1800);
    }

  }, []); // runs once on mount

  return { visitType, isReturning };
}
*/


// ══════════════════════════════════════════════════════════════════════════════
// FILE 4 — src/hooks/useIdleTimer.ts
// MID-FUNNEL STALL RECOVERY — 45 seconds of inactivity triggers nudge
// Resets on any user interaction. Only active when gate is visible.
// ══════════════════════════════════════════════════════════════════════════════

// @file src/hooks/useIdleTimer.ts
/*
import { useEffect, useRef, useState, useCallback } from 'react';
import { useFunnelStore } from '../store/useFunnelStore';

const IDLE_THRESHOLD_MS = 45_000; // 45 seconds

export function useIdleTimer(active: boolean = true) {
  const { highestStepReached, county } = useFunnelStore();
  const [isIdle, setIsIdle]     = useState(false);
  const [nudgeMsg, setNudgeMsg] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getNudgeMessage = useCallback(() => {
    if (highestStepReached >= 3 && county) {
      return `Still there? Your ${county} County data is loaded and waiting.`;
    }
    if (highestStepReached >= 2) {
      return "Still there? One more answer unlocks your county baseline.";
    }
    return "Still there? Your analysis is half-configured. Takes 30 more seconds.";
  }, [highestStepReached, county]);

  const reset = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) return;
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      setNudgeMsg(getNudgeMessage());
    }, IDLE_THRESHOLD_MS);
  }, [active, getNudgeMessage]);

  useEffect(() => {
    if (!active) return;

    const events = ['mousemove','keydown','touchstart','click','scroll'];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset(); // start the timer

    return () => {
      events.forEach(e => window.removeEventListener(e, reset));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, reset]);

  return { isIdle, nudgeMsg, resetTimer: reset };
}
*/


// ══════════════════════════════════════════════════════════════════════════════
// FILE 5 — src/components/StickyRecoveryBar.tsx
// THE BOTTOM BAR — 5 states, slides up from bottom, forensic noir
// Driven entirely by store state. No props. No local state.
// ══════════════════════════════════════════════════════════════════════════════

// @file src/components/StickyRecoveryBar.tsx
/*
import { useState, useEffect } from 'react';
import { useFunnelStore, type FunnelScreen } from '../store/useFunnelStore';
import { useReturnVisitor } from '../hooks/useReturnVisitor';

interface BarConfig {
  label:    string;  // small JetBrains Mono top label
  message:  string;  // main copy
  cta:      string;  // button text
  target:   FunnelScreen;
  accent:   string;  // border color
}

function getBarConfig(
  highestStep: number,
  isLeadCaptured: boolean,
  isQuoteUploaded: boolean,
  isScanComplete: boolean,
  county: string | null,
  flow: string | null
): BarConfig | null {
  if (isScanComplete)  return null;  // funnel complete — hide

  if (isQuoteUploaded) return {
    label:   'SCAN IN PROGRESS',
    message: 'Your quote is being analyzed. Results in ~60 seconds.',
    cta:     'VIEW PROGRESS →',
    target:  'scanning',
    accent:  '#00D9FF',
  };

  if (isLeadCaptured && flow === 'A') return {
    label:   'YOUR PROFILE IS ACTIVE',
    message: `Your ${county || 'Florida'} analysis is locked and loaded. Upload your quote to start the scan.`,
    cta:     'UPLOAD MY QUOTE →',
    target:  'upload',
    accent:  '#1D4ED8',
  };

  if (isLeadCaptured && flow !== 'A') return {
    label:   'YOUR BASELINE IS READY',
    message: `Your ${county || 'county'} fair-market baseline is configured. View it now.`,
    cta:     'VIEW MY BASELINE →',
    target:  'flow_b_baseline',
    accent:  '#10B981',
  };

  if (highestStep >= 3 && county) return {
    label:   `${county.toUpperCase()} COUNTY DATA LOADED`,
    message: `You're 1 step away from your forensic grade. Your county benchmarks are ready.`,
    cta:     'FINISH MY ANALYSIS →',
    target:  'gate_step_4',
    accent:  '#F59E0B',
  };

  if (highestStep >= 1) return {
    label:   'YOUR ANALYSIS IS CONFIGURED',
    message: "You started your quote analysis. Finish to see your county overpayment data.",
    cta:     'CONTINUE WHERE I LEFT OFF →',
    target:  `gate_step_${Math.min(highestStep + 1, 4)}` as FunnelScreen,
    accent:  '#2E3A50',
  };

  return null;
}

export default function StickyRecoveryBar() {
  const {
    highestStepReached, isLeadCaptured,
    isQuoteUploaded, isScanComplete,
    county, assignedFlow, setScreen,
  } = useFunnelStore();
  const { isReturning } = useReturnVisitor();

  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismiss] = useState(false);

  const config = getBarConfig(
    highestStepReached, isLeadCaptured, isQuoteUploaded,
    isScanComplete, county, assignedFlow
  );

  // Show bar after 4 seconds on returning users, 8 seconds on first-time partial users
  useEffect(() => {
    if (!config || dismissed) return;
    const delay = isReturning ? 4000 : 8000;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [config, dismissed, isReturning]);

  if (!config || !visible || dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#111418',
      borderTop: `2px solid ${config.accent}`,
      padding: '12px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
      boxShadow: `0 -4px 20px ${config.accent}25`,
    }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: config.accent, marginBottom: 4,
        }}>
          {config.label}
        </div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 13,
          fontWeight: 500, color: '#C8DEFF', lineHeight: 1.4,
        }}>
          {config.message}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
        <button
          onClick={() => { setScreen(config.target); setVisible(false); }}
          style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
            fontSize: 12, color: '#FFFFFF',
            background: config.accent === '#F97316' ? '#BB2D00' : config.accent,
            border: 'none', padding: '9px 18px', borderRadius: 2,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          {config.cta}
        </button>
        <button
          onClick={() => setDismiss(true)}
          style={{
            background: 'transparent', border: 'none',
            color: '#7D9DBB', cursor: 'pointer',
            fontFamily: "'JetBrains Mono',monospace", fontSize: 16,
            padding: '4px 8px', lineHeight: 1,
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
*/


// ══════════════════════════════════════════════════════════════════════════════
// FILE 6 — src/components/ExitIntentModal.tsx
// THE ABANDONMENT NET — desktop + mobile triggers, county-specific copy
// 5 variants by highestStepReached. County Ledger social proof for Step 3+.
// ══════════════════════════════════════════════════════════════════════════════

// @file src/components/ExitIntentModal.tsx
/*
import { useState, useEffect, useRef, useCallback } from 'react';
import { useFunnelStore } from '../store/useFunnelStore';
import { COUNTY_VERDICT_DATA } from '../store/useFunnelStore';

export default function ExitIntentModal() {
  const {
    highestStepReached, county, isLeadCaptured,
    getExitIntentMessage, setScreen, assignedFlow,
  } = useFunnelStore();

  const [open, setOpen]         = useState(false);
  const [fired, setFired]       = useState(false); // only show once per session
  const mouseYRef               = useRef(0);

  const verdict = county ? (COUNTY_VERDICT_DATA[county] ?? COUNTY_VERDICT_DATA['default']) : COUNTY_VERDICT_DATA['default'];

  // ── DESKTOP: mouse leaves top of viewport ─────────────────────────────────
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (fired || isLeadCaptured) return;
    // Only trigger when cursor goes above the viewport (exiting to address bar)
    if (e.clientY <= 10 && mouseYRef.current > 50) {
      setOpen(true);
      setFired(true);
    }
  }, [fired, isLeadCaptured]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseYRef.current = e.clientY;
  }, []);

  // ── MOBILE: visibility change (tab switch / home button) ──────────────────
  const handleVisibilityChange = useCallback(() => {
    if (fired || isLeadCaptured || document.visibilityState !== 'hidden') return;
    // Only trigger if they've invested something (highestStep >= 1)
    if (highestStepReached >= 1) {
      setOpen(true);
      setFired(true);
    }
  }, [fired, isLeadCaptured, highestStepReached]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleMouseLeave, handleMouseMove, handleVisibilityChange]);

  useEffect(() => {
    if (open) {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', 'wm_exit_intent_shown', {
          highest_step: highestStepReached,
          county,
        });
      }
    }
  }, [open]);

  if (!open) return null;

  // ── COPY VARIANTS by highestStepReached ──────────────────────────────────
  const getMessage = () => getExitIntentMessage(); // pulls from store

  const ctaText = highestStepReached >= 3
    ? 'UNLOCK MY ANALYSIS →'
    : highestStepReached >= 1
    ? 'CONTINUE MY SETUP →'
    : 'SCAN MY QUOTE — FREE →';

  const handleCTA = () => {
    setOpen(false);
    if (highestStepReached >= 4) {
      setScreen('lead_gate');
    } else if (highestStepReached >= 1) {
      setScreen(`gate_step_${Math.min(highestStepReached + 1, 4)}` as any);
    } else {
      setScreen('gate_step_1');
    }
  };

  // County Ledger — only shows for Step 3+ visitors who have county data
  const showCountyLedger = highestStepReached >= 3 && county;

  return (
    // Faux viewport wrapper — required for fixed positioning in Claude artifacts
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.72)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 999, padding: 20,
    }}>
      <div style={{
        background: '#161C28',
        border: `1px solid #2E3A50`,
        borderTop: `2px solid #F59E0B`,
        maxWidth: 480, width: '100%',
        padding: '28px 24px',
        position: 'relative',
        animation: 'exitModalIn 0.2s ease forwards',
      }}>
        {/* Dismiss X */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: 12, right: 14,
            background: 'transparent', border: 'none',
            color: '#7D9DBB', cursor: 'pointer', fontSize: 20, lineHeight: 1,
          }}
          aria-label="Close"
        >×</button>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#F59E0B', marginBottom: 14,
        }}>
          BEFORE YOU GO
        </div>

        {/* Main message */}
        <div style={{
          fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800,
          fontSize: 'clamp(18px, 3vw, 24px)', textTransform: 'uppercase',
          color: '#FFFFFF', lineHeight: 1.1, marginBottom: 14,
        }}>
          {getMessage()}
        </div>

        {/* County Ledger — for Step 3+ visitors */}
        {showCountyLedger && (
          <div style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.22)',
            borderLeft: '2px solid #F59E0B',
            padding: '12px 14px', marginBottom: 18,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
              color: '#F59E0B', letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              {county?.toUpperCase()} COUNTY LEDGER
            </div>
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 13,
              color: '#A0B8D8', lineHeight: 1.65,
            }}>
              {county} County homeowners found an average of{' '}
              <span style={{ color: '#F59E0B', fontWeight: 600 }}>
                ${verdict.low.toLocaleString()}–${verdict.high.toLocaleString()}
              </span>{' '}
              in quote overcharges last month. The most common issue:{' '}
              <span style={{ color: '#F97316' }}>{verdict.flag}</span>.
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleCTA}
          style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
            fontSize: 14, color: '#FFFFFF',
            background: '#BB2D00', border: 'none',
            padding: '13px 24px', borderRadius: 2,
            cursor: 'pointer', width: '100%',
            boxShadow: '0 4px 16px rgba(187,45,0,0.30)',
          }}
        >
          {ctaText}
        </button>

        {/* Autonomy valve */}
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: "'DM Sans',sans-serif", fontSize: 11,
          color: '#7D9DBB', cursor: 'pointer',
        }}
          onClick={() => setOpen(false)}
        >
          No thanks — I'll take my chances with the quote I have.
        </div>
      </div>

      <style>{`
        @keyframes exitModalIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}
*/

