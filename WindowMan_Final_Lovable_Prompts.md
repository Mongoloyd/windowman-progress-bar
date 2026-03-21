# WINDOWMAN — FINAL LOVABLE PROMPTS (Step 6 + 7)
## The last 40%. 2 prompts. Feed them in order.

---

## ═══════════════════════════════════════════════════
## PROMPT 1 — Update TruthGateFlow.tsx
## ═══════════════════════════════════════════════════

```
Update src/components/TruthGateFlow.tsx with these exact changes.
This is the final wiring of the Hidden Fork guardrail, idle timer,
shadow profile creation, and UTM county pre-fill.

────────────────────────────────────────────────────────
IMPORTS TO ADD AT THE TOP
────────────────────────────────────────────────────────
import { STEP_4_OPTIONS } from '../store/funnelConstants';
import { useFunnelStore  } from '../store/useFunnelStore';
import { useIdleTimer    } from '../hooks/useIdleTimer';

Remove any existing direct fbq() or window.fbq() calls from this file.
All pixel events come from the store actions only.

────────────────────────────────────────────────────────
STORE ACTIONS USED IN THIS COMPONENT
────────────────────────────────────────────────────────
const {
  county,            // for UTM pre-fill detection
  windowCount,       // for shadow profile payload
  projectType,       // for shadow profile payload
  utmSource, utmCampaign,  // for shadow profile payload
  setWindowCount, setProjectType, setCounty,
  setQuoteRangeAndFlow, nextStep,
  setShadowId,
} = useFunnelStore();

────────────────────────────────────────────────────────
IDLE TIMER — Mount at component level (NOT inside steps)
────────────────────────────────────────────────────────
// Active when user is on any step. Deactivate when not in gate.
const gateIsActive = /* true when TruthGateFlow is mounted */ true;
const { isIdle, nudgeMsg } = useIdleTimer(gateIsActive);

IDLE NUDGE RENDER — appears above the active question when isIdle is true:
{isIdle && nudgeMsg && (
  <div style={{
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: 10,
    color: '#00D9FF',
    letterSpacing: '0.1em',
    padding: '8px 12px',
    border: '1px solid rgba(0,217,255,0.20)',
    borderRadius: 0,
    marginBottom: 12,
    opacity: 1,
    transition: 'opacity 0.20s ease',
  }}>
    {nudgeMsg}
  </div>
)}

────────────────────────────────────────────────────────
BACK NAVIGATION — Add above progress bar on Steps 2, 3, and 4 ONLY
────────────────────────────────────────────────────────
{currentStep > 1 && (
  <button
    onClick={() => setCurrentStep(s => s - 1)}
    style={{
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#7D9DBB', background: 'transparent', border: 'none',
      cursor: 'pointer', padding: '0 0 10px',
      display: 'flex', alignItems: 'center', gap: 5,
    }}
  >
    ← BACK
  </button>
)}

────────────────────────────────────────────────────────
STEP 2 COMPLETION — Shadow profile creation
────────────────────────────────────────────────────────
// After Step 2 option is selected and setProjectType() is called:
const handleStep2 = async (answer: string) => {
  setProjectType(answer);  // fires pixel via store

  // Create shadow profile — captures partial lead before email
  try {
    const sessionId = `wm_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-shadow-profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          windowCount,
          projectType: answer,
          utmSource,
          utmCampaign,
        }),
      }
    );
    const { shadowId } = await res.json();
    if (shadowId) setShadowId(shadowId);
  } catch {
    // Silent fail — never block UX for analytics
  }

  nextStep();
};

────────────────────────────────────────────────────────
STEP 3 — UTM County Pre-fill
────────────────────────────────────────────────────────
// At the START of the Step 3 render, check if county is already known:
// (This happens when utm_term was present in the URL on page load)

{currentStep === 3 && (
  county ? (
    // County already known from UTM — show confirm state
    <div>
      <div style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800,
        fontSize: 22, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: 8,
      }}>
        What is your zip code?
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
        color: '#7D9DBB', marginBottom: 16, letterSpacing: '0.1em',
      }}>
        We have pricing data for every major Florida market. Your zip unlocks county-level intelligence.
      </div>

      {/* Pre-filled county badge — one-tap confirm */}
      <div style={{
        background: 'rgba(0,217,255,0.07)', border: '1px solid rgba(0,217,255,0.25)',
        padding: '14px 16px', marginBottom: 12,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
            color: '#00D9FF', letterSpacing: '0.1em', marginBottom: 4,
          }}>
            ◈ COUNTY DETECTED FROM YOUR LOCATION
          </div>
          <div style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
            fontSize: 18, color: '#FFFFFF', textTransform: 'uppercase',
          }}>
            {county.toUpperCase()} COUNTY
          </div>
        </div>
        <button
          onClick={() => nextStep()}  // confirm and advance directly
          style={{
            fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13,
            color: '#FFFFFF', background: '#0B60C5', border: 'none',
            padding: '9px 18px', borderRadius: 2, cursor: 'pointer',
          }}
        >
          CONFIRM →
        </button>
      </div>

      {/* Option to change — small link below */}
      <div style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 12,
        color: '#1D4ED8', cursor: 'pointer', textAlign: 'center',
      }}
        onClick={() => {
          /* clear pre-filled county and show ZIP input */
          useFunnelStore.getState().setCounty('', '');
        }}
      >
        That's not my county — let me enter my zip
      </div>
    </div>
  ) : (
    // Normal Step 3 — ZIP input (existing component, no changes)
    <YourExistingStep3ZipInput />
  )
)}

────────────────────────────────────────────────────────
STEP 4 — Replace hardcoded options with STEP_4_OPTIONS const
────────────────────────────────────────────────────────
// BEFORE (delete this):
// options: ["I have a written quote...", "I got a ballpark...", ...]

// AFTER: render from the const
{Object.values(STEP_4_OPTIONS).map((answer) => (
  <button
    key={answer}
    className="opt-btn"
    onClick={() => setQuoteRangeAndFlow(quoteRange, answer)}
    style={{ /* existing option button styles */ }}
  >
    <span className="opt-dot" />
    <span>{answer}</span>
    {/* Show urgency label on hover — imported from funnelConstants */}
    <span style={{
      marginLeft: 'auto',
      fontFamily: "'JetBrains Mono',monospace", fontSize: 8,
      color: '#7D9DBB', letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>
      {STEP_4_URGENCY_LABELS[answer]}
    </span>
  </button>
))}

// Import STEP_4_URGENCY_LABELS too:
// import { STEP_4_OPTIONS, STEP_4_URGENCY_LABELS } from '../store/funnelConstants';

────────────────────────────────────────────────────────
MICRO-VERDICT CARD — 400ms delayed appearance
────────────────────────────────────────────────────────
// After Step 3 resolves (county set), show MicroVerdictCard with a 400ms delay.
// This delay makes the card feel like a system finding, not pre-cached content.

const [showVerdict, setShowVerdict] = useState(false);

// In the Step 3 completion handler (after setCounty() call):
setTimeout(() => setShowVerdict(true), 400);

// Render the card:
{showVerdict && currentStep === 4 && (
  <div style={{
    animation: 'verdictSlideIn 0.25s ease forwards',
    // opacity 0 → 1 + translateY 10px → 0
  }}>
    <MicroVerdictCard />
  </div>
)}

// Add to your <style> block or CSS:
// @keyframes verdictSlideIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to   { opacity: 1; transform: translateY(0); }
// }
```

---

## ═══════════════════════════════════════════════════
## PROMPT 2 — Final App.tsx Wiring (Step 7 Setup)
## ═══════════════════════════════════════════════════

```
Update src/App.tsx with the final global wiring.
This closes every open loop in the architecture.

────────────────────────────────────────────────────────
IMPORTS TO ADD
────────────────────────────────────────────────────────
import { useEffect, useRef, lazy, Suspense } from 'react';
import { useFunnelStore }   from './store/useFunnelStore';
import { useReturnVisitor } from './hooks/useReturnVisitor';
import StickyRecoveryBar    from './components/StickyRecoveryBar';
import ExitIntentModal      from './components/ExitIntentModal';

// LAZY LOAD heavy screens — they're never needed on initial page load
// Each lazy component only downloads when the user actually reaches that screen
const ScanTheatrics  = lazy(() => import('./components/ScanTheatrics'));
const OTPGate        = lazy(() => import('./components/OTPGate'));
const GradeReveal    = lazy(() => import('./components/GradeReveal'));
const FlowBBaseline  = lazy(() => import('./components/FlowBBaseline'));
const FlowCLeverage  = lazy(() => import('./components/FlowCLeverage'));

// Lazy loading suspense fallback — minimal, branded
const LazyFallback = () => (
  <div style={{
    minHeight: '100vh', background: '#0A0A0A',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{
      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
      fontSize: 24, color: '#1D4ED8', textTransform: 'uppercase',
      letterSpacing: '0.08em',
    }}>
      WM
    </div>
  </div>
);

────────────────────────────────────────────────────────
APP COMPONENT
────────────────────────────────────────────────────────
export default function App() {
  const { currentScreen, captureUTM, markSectionViewed } = useFunnelStore();
  const { visitType, isReturning } = useReturnVisitor();

  // Refs for IntersectionObserver section tracking
  const heroRef       = useRef<HTMLElement>(null);
  const evidenceRef   = useRef<HTMLElement>(null);
  const gateRef       = useRef<HTMLElement>(null);
  const socialRef     = useRef<HTMLElement>(null);
  const manifestoRef  = useRef<HTMLElement>(null);

  // ── MOUNT EFFECT ──────────────────────────────────────────────────────────
  useEffect(() => {
    // 1. UTM capture — must be FIRST. Resolves county from ad click before any render.
    captureUTM();

    // 2. Meta Pixel initialization
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('init', import.meta.env.VITE_FB_PIXEL_ID);
      (window as any).fbq('track', 'PageView');
    }

    // 3. IntersectionObserver — fires markSectionViewed + analytics pixel
    //    when each section becomes 40% visible. Runs once per section.
    const sections = [
      { ref: heroRef,      id: 'hero'      },
      { ref: evidenceRef,  id: 'evidence'  },
      { ref: gateRef,      id: 'gate'      },
      { ref: socialRef,    id: 'social'    },
      { ref: manifestoRef, id: 'manifesto' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionId = (entry.target as HTMLElement).dataset.section;
          if (!sectionId) return;
          markSectionViewed(sectionId);
          observer.unobserve(entry.target); // once only
        });
      },
      { threshold: 0.40 }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // ── SCROLL-TO-GATE for returning partial_late users ───────────────────────
  useEffect(() => {
    if (visitType !== 'partial_late') return;
    const timer = setTimeout(() => {
      gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1800);
    return () => clearTimeout(timer);
  }, [visitType]);

  // ── FULL-SCREEN TAKEOVER ROUTES (no nav, no recovery UI) ────────────────
  if (currentScreen === 'scanning') return (
    <Suspense fallback={<LazyFallback />}>
      <ScanTheatrics />
    </Suspense>
  );

  if (currentScreen === 'otp') return (
    <Suspense fallback={<LazyFallback />}>
      <OTPGate />
    </Suspense>
  );

  if (currentScreen === 'grade_reveal') return (
    <Suspense fallback={<LazyFallback />}>
      <LinearHeader minimal />
      <GradeReveal />
      <Footer />
    </Suspense>
  );

  if (currentScreen === 'upload') return (
    <>
      <LinearHeader minimal />
      <UploadZone />
      <Footer />
    </>
  );

  if (currentScreen === 'flow_b_baseline') return (
    <Suspense fallback={<LazyFallback />}>
      <LinearHeader minimal />
      <FlowBBaseline />
      <Footer />
    </Suspense>
  );

  if (currentScreen === 'flow_c_leverage') return (
    <Suspense fallback={<LazyFallback />}>
      <LinearHeader minimal />
      <FlowCLeverage />
      <Footer />
    </Suspense>
  );

  // ── MAIN MARKETING PAGE ──────────────────────────────────────────────────
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <LinearHeader />

      <main>
        <section ref={heroRef}      data-section="hero">
          <AuditHero />
        </section>

        <DynamicUrgencyStats county={useFunnelStore.getState().county ?? undefined} />

        <section ref={evidenceRef}  data-section="evidence">
          <IndustryTruth />
        </section>

        <section ref={gateRef}      data-section="gate">
          <TruthGateFlow />
        </section>

        <section ref={socialRef}    data-section="social">
          <NarrativeProof />
        </section>

        <section ref={manifestoRef} data-section="manifesto">
          <ClosingManifesto />
        </section>
      </main>

      <Footer />

      {/*
        GLOBAL OVERLAYS — rendered at root level, outside all routing.
        z-index stack (do not change these values):
          LinearHeader:     z-index 100
          StickyRecoveryBar: z-index 200
          ExitIntentModal:  z-index 999
        These values are defined as CSS vars in globals.css.
        Never apply z-index to any other component without explicit approval.
      */}
      <StickyRecoveryBar />
      <ExitIntentModal />
    </div>
  );
}
```

---

## STEP 7 — END-TO-END VERIFICATION CHECKLIST
## Run these in browser DevTools after Lovable finishes building.

```
TEST 1 — HIDDEN FORK (Flow routing)
  [ ] Select "I have a written quote" at Step 4 → store.assignedFlow === 'A'
  [ ] Select "contractor visit coming up" → store.assignedFlow === 'C', store.processStage exact match
  [ ] Select "research phase" → store.assignedFlow === 'B'
  [ ] Hard refresh at Step 4 → localStorage preserves county + windowCount but NOT currentStep
  VERIFY: DevTools → Application → localStorage → windowman-shadow-profile

TEST 2 — UTM COUNTY PRE-FILL
  [ ] Load page with ?utm_term=BRO in URL
  [ ] Open React DevTools → useFunnelStore → county should be "Broward"
  [ ] Navigate to TruthGateFlow Step 3 → county confirm UI shows, not ZIP input
  [ ] Click CONFIRM → jumps directly to Step 4 with county in progress badge

TEST 3 — IDLE TIMER
  [ ] Enter TruthGateFlow Step 3 → wait 45 seconds without touching anything
  [ ] Nudge message should appear above the question in cyan JetBrains Mono
  [ ] Move mouse → nudge disappears, timer resets

TEST 4 — PIXEL DEDUPLICATION
  [ ] Open DevTools → Network tab → filter by "facebook"
  [ ] Complete Step 3 (triggers wm_county_identified)
  [ ] Hard refresh page → navigate back to Step 3
  [ ] wm_county_identified should NOT appear in network requests again this session
  VERIFY: Check store state → pixelsFired Set should contain "step3_Broward" from first visit

TEST 5 — STICKY RECOVERY BAR
  [ ] Complete Steps 1-3, do NOT submit lead gate
  [ ] Hard refresh page (restores from localStorage)
  [ ] StickyBar should appear within 4 seconds with county name and "FINISH MY ANALYSIS →"
  [ ] Click CTA → should route to gate_step_4

TEST 6 — EXIT INTENT (Desktop)
  [ ] Complete Step 3 (county known)
  [ ] Move mouse rapidly to very top of viewport (above 10px y)
  [ ] Modal appears with County Ledger — shows county name + dollar range from COUNTY_VERDICT_DATA
  [ ] Modal never fires again if you dismiss and re-trigger exit (fired flag)
  [ ] Modal NEVER fires if isLeadCaptured is true

TEST 7 — EXIT INTENT (Mobile)
  [ ] In DevTools → device mode (mobile)
  [ ] Complete Step 3
  [ ] In Application tab → manually fire document.dispatchEvent(new Event('visibilitychange'))
  [ ] Simulate document.visibilityState = 'hidden' (or use mobile simulator and switch tabs)
  [ ] Modal appears

TEST 8 — SHADOW PROFILE (Supabase)
  [ ] Complete Steps 1 + 2
  [ ] Open Supabase Table Editor → shadow_profiles
  [ ] New row should appear with window_count, project_type, utm data
  [ ] Complete lead gate → leads table should have a row referencing the shadow_id
  [ ] shadow_profiles row should show converted_at timestamp

TEST 9 — PERFORMANCE (Lazy Loading)
  [ ] DevTools → Network → JS tab
  [ ] Load the page → ScanTheatrics/GradeReveal/OTPGate chunks should NOT be downloaded
  [ ] Complete the scan → ScanTheatrics chunk should download only at that moment
  [ ] Bundle size check: initial JS payload should be under 200KB gzipped

TEST 10 — SECTION ANALYTICS
  [ ] DevTools → Network → filter by "facebook"  
  [ ] Scroll page to 40%+ visibility of each section
  [ ] wm_section_viewed events should fire: hero, evidence, gate, social, manifesto
  [ ] Each fires exactly once (observer.unobserve called after first intersection)

─────────────────────────────────────────────────────────
ALL 10 TESTS PASSING = architecture is production-ready.
─────────────────────────────────────────────────────────
```
