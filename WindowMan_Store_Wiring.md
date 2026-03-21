# WINDOWMAN — STORE WIRING GUIDE
## How every component connects to useFunnelStore

---

## LOVABLE PROMPT — Drop-in the final store

```
Create a new file at src/store/useFunnelStore.ts and replace its entire contents
with the code provided. Make sure zustand is in package.json (npm install zustand).

Then wire each component to the store as follows.
```

---

## COMPONENT WIRING MAP

### TruthGateFlow.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

// Inside the component:
const {
  windowCount, projectType, county,
  currentStep, highestStepReached,
  setWindowCount, setProjectType, setCounty,
  setQuoteRangeAndFlow, nextStep,
} = useFunnelStore();

// Step 1 option selected:
const handleStep1 = (answer: string) => {
  setWindowCount(answer);  // fires pixel + sets state
  nextStep();
};

// Step 2 option selected:
const handleStep2 = (answer: string) => {
  setProjectType(answer);
  nextStep();
};

// Step 3 ZIP entered (after county resolves):
const handleStep3 = (countyName: string, countySlug: string) => {
  setCounty(countyName, countySlug);
  nextStep();
};

// Step 4 — THE HIDDEN FORK:
// Pass the processStage text exactly as written — the store derives the flow
const handleStep4 = (processStage: string, quoteRange: string) => {
  setQuoteRangeAndFlow(quoteRange, processStage);
  // Store automatically: sets assignedFlow, advances step, fires pixel, routes screen
};
```

---

### MicroVerdictCard.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const { county, getCountyVerdict } = useFunnelStore();
const verdict = getCountyVerdict();

// Use directly:
// verdict.low  → 3800
// verdict.high → 6200
// verdict.flag → "unspecified window brands"
// county       → "Broward"

// The card renders:
// "Homes like yours in [county] typically see quote gaps of $[low]–$[high]."
// "The most common issue: [verdict.flag] — found in 71% of contracts."
```

---

### LeadGate.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const {
  county, windowCount, projectType, quoteRange, assignedFlow,
  shadowId, setShadowId, setLeadId, captureLead,
  utmSource, utmCampaign,
} = useFunnelStore();

const handleSubmit = async (firstName: string, email: string, phone: string) => {
  try {
    // 1. Call submit-lead edge function
    const res = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName, email, phone, shadowId,
        answers: { windowCount, projectType, county, quoteRange },
        utmSource, utmCampaign,
      }),
    });
    const { leadId } = await res.json();

    // 2. Update store
    setLeadId(leadId);
    captureLead(); // fires Lead + CompleteRegistration pixel events
  } catch (err) {
    console.error('Lead submission error:', err);
  }
};
```

---

### ScanTheatrics.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const { county, setScreen, completeScan } = useFunnelStore();

// Use county in the log line:
// `■ Accessing ${county?.toUpperCase() ?? 'FLORIDA'} COUNTY pricing benchmarks...`

// After white flash + 2100ms pause:
const handleScanComplete = () => {
  completeScan(); // fires wm_scan_completed pixel
  setScreen('otp');
};
```

---

### OTPGate.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const { leadId, setPhoneVerified, setScreen } = useFunnelStore();

const handleOTPSuccess = async () => {
  // Update Supabase
  await supabase.from('leads')
    .update({ phone_verified: true, phone_verified_at: new Date().toISOString() })
    .eq('id', leadId);

  // Update store — fires wm_otp_verified + Purchase pixel
  setPhoneVerified(true);

  // Navigate to grade reveal
  setScreen('grade_reveal');
};
```

---

### GradeReveal.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const {
  grade, dollarDelta, deltaDirection,
  flagCount, leverageCount, topFlag,
  pillarScores, allFlags,
  county, setScanResult,
} = useFunnelStore();

// setScanResult is called by the parent after AI analysis completes.
// GradeReveal just reads the already-populated state.
// If grade is null, show loading state.
```

---

### StickyRecoveryBar.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const {
  highestStepReached,
  isLeadCaptured,
  isQuoteUploaded,
  isScanComplete,
  county, assignedFlow,
  setScreen,
} = useFunnelStore();

// Show the bar when:
// - highestStepReached >= 1 (they started the gate)
// - AND not isScanComplete (they haven't finished)

// Bar copy logic:
const getBarCopy = () => {
  if (isScanComplete)    return null; // hide — they're done
  if (isQuoteUploaded)   return { text: 'Your quote is being analyzed. Results in ~60 seconds.', cta: 'Continue →', screen: 'scanning' };
  if (isLeadCaptured)    return { text: `Your ${county} analysis is locked and loaded. Upload your quote.`, cta: 'Upload Now →', screen: 'upload' };
  if (highestStepReached >= 3) return { text: `You're 1 step away from your ${county || 'county'} forensic baseline.`, cta: 'Finish Setup →', screen: 'gate_step_4' };
  if (highestStepReached >= 1) return { text: 'You started your analysis. Finish to see your county data.', cta: 'Continue →', screen: `gate_step_${highestStepReached + 1}` as any };
  return null;
};

const bar = getBarCopy();
if (!bar) return null; // render nothing

const handleCTAClick = () => setScreen(bar.screen as FunnelScreen);
```

---

### ExitIntentModal.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const { getExitIntentMessage, highestStepReached, isLeadCaptured, setScreen } = useFunnelStore();

// Show modal when:
// - cursor exits top of screen on desktop (mouseleave on document)
// - back button pressed on mobile (popstate event)
// - NOT if isLeadCaptured (lead is already captured — no point)

// Modal copy:
const message = getExitIntentMessage();
// Returns the exact county-specific message based on their progress

// Modal CTA:
const ctaText = highestStepReached >= 3
  ? 'UNLOCK MY ANALYSIS →'
  : highestStepReached >= 1
  ? 'CONTINUE MY SETUP →'
  : 'SCAN MY QUOTE — IT\'S FREE →';

const handleCTA = () => {
  if (highestStepReached >= 1) {
    setScreen(`gate_step_${Math.min(highestStepReached + 1, 4)}` as FunnelScreen);
  } else {
    setScreen('gate_step_1');
  }
};
```

---

### DynamicUrgencyStats.tsx

```typescript
import { useFunnelStore } from '../store/useFunnelStore';

const { county } = useFunnelStore();

// Pass as prop — the component already accepts a `county` prop
// <DynamicUrgencyStats county={county ?? undefined} />
//
// When county is truthy, strip displays: "[COUNTY] SCANS TODAY"
// When null, displays: "FL SCANS COMPLETED"
```

---

### App.tsx (updated routing)

```typescript
import { useEffect } from 'react';
import { useFunnelStore } from './store/useFunnelStore';

export default function App() {
  const { currentScreen, captureUTM } = useFunnelStore();

  // Capture UTM params once on mount
  useEffect(() => { captureUTM(); }, []);

  // Route based on currentScreen
  if (currentScreen === 'scanning')     return <ScanTheatrics />;
  if (currentScreen === 'otp')          return <OTPGate />;
  if (currentScreen === 'grade_reveal') return <><LinearHeader minimal /><GradeReveal /><Footer /></>;
  if (currentScreen === 'upload')       return <><LinearHeader minimal /><UploadZone /><Footer /></>;
  if (currentScreen === 'flow_b_baseline')  return <><LinearHeader minimal /><FlowBBaseline /><Footer /></>;
  if (currentScreen === 'flow_c_leverage')  return <><LinearHeader minimal /><FlowCLeverage /><Footer /></>;

  // Default: full marketing page
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <LinearHeader />
      <AuditHero />
      <DynamicUrgencyStats county={useFunnelStore.getState().county ?? undefined} />
      <IndustryTruth />
      <TruthGateFlow />
      <NarrativeProof />
      <ClosingManifesto />
      <Footer />
      <StickyRecoveryBar />
      <ExitIntentModal />
    </div>
  );
}
```

---

## RETURNING USER FLOW (localStorage pays off here)

When a user returns days later from a retargeting ad:

```typescript
// On app mount in App.tsx, check for returning user:
useEffect(() => {
  captureUTM();
  const state = useFunnelStore.getState();

  if (state.highestStepReached >= 3 && !state.isLeadCaptured) {
    // They got 3+ steps in but didn't convert
    // Show the Sticky Recovery Bar immediately on page load
    // Optional: auto-scroll to the Truth Gate and pre-populate their answers
    console.log('Returning partial user detected:', {
      county: state.county,
      flow:   state.assignedFlow,
      step:   state.highestStepReached,
    });
  }

  if (state.isLeadCaptured && !state.isScanComplete && state.assignedFlow === 'A') {
    // They captured but never uploaded
    // Show: "Your analysis is ready — just upload your quote"
    // Route them to upload directly
  }
}, []);
```

---

## STEP 4 EXACT ANSWER STRINGS (must match exactly for flow routing)

The `deriveFlow()` function in the store matches these EXACT strings.
Make sure TruthGateFlow passes one of these four — character-perfect:

```
"I have a written quote from a contractor"     → Flow A
"I got a ballpark number but nothing in writing" → Flow C
"I have a contractor visit coming up"           → Flow C (highest urgency)
"I'm still in the research phase"              → Flow B
```

If TruthGateFlow uses different option text, the Hidden Fork logic breaks.
Match these strings exactly, or update deriveFlow() to match whatever text you use.
