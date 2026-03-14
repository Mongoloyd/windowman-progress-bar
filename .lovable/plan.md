

## Assessment: Yes, This Is a Real Conversion Leak

Your analysis is correct. The ProcessSteps section builds intent ("here's what you'll learn") but only offers one high-friction exit ("upload a document now"). Users in a learning mindset who don't have a quote ready hit a dead end. The PowerToolDemo already exists and is wired in the hero — but it's invisible from every other CTA point on the page.

However, I'd refine the approach. You don't need Flow C here. Flow C is for verbal-quote users with upcoming appointments — a different persona. What you actually need is a **PowerTool trigger** that works from any section, not just the hero.

---

## What I'd Do Differently

**Don't wire Flow C into ProcessSteps.** Flow C is about leverage and appointment prep — wrong context for a "see how it works" moment. Instead, reuse the existing PowerTool demo trigger that already works in the hero.

The fix is simpler than creating a new flow:

### 1. Add `onDemoClick` prop to ProcessSteps

Pass a callback from Index.tsx that triggers the PowerTool (same as the hero's demo button). This keeps the centralized trigger pattern.

### 2. Add a secondary CTA button in ProcessSteps

Below the existing "Scan My Quote" button, add a cyan outline button: **"See the AI in Action — No Upload Needed"**. Style it as an outline variant matching the hero's PowerTool button visual language (cyan border, cyan text).

### 3. Wire it in Index.tsx

```
<ProcessSteps
  onScanClick={() => triggerTruthGate('process_steps')}
  onDemoClick={() => {
    setPowerToolTriggered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
/>
```

### 4. Apply the same pattern to other bottom-page sections

`IndustryTruth`, `NarrativeProof`, `ClosingManifesto`, and `MarketMakerManifesto` all have the same single-CTA problem. Each gets an `onDemoClick` prop and a secondary button.

---

## Changes

**`src/components/ProcessSteps.tsx`** — Add `onDemoClick` prop. Add a second button (cyan outline) below the gold CTA. Wire it to `onDemoClick`.

**`src/components/IndustryTruth.tsx`** — Same pattern: add `onDemoClick` prop and secondary CTA.

**`src/components/NarrativeProof.tsx`** — Same pattern.

**`src/components/ClosingManifesto.tsx`** — Same pattern.

**`src/components/MarketMakerManifesto.tsx`** — Same pattern.

**`src/pages/Index.tsx`** — Pass `onDemoClick` to all five components, triggering `setPowerToolTriggered(true)` + scroll to top.

---

## Why This Is Better Than Wiring Flow C

- Flow C is for a specific persona (verbal quote, upcoming appointment). Mixing it into educational sections dilutes its purpose.
- The PowerTool already exists, is lazy-loaded, and handles its own state. No new components needed.
- One prop addition per section, one handler in Index.tsx. Minimal code surface.
- Every educational section gets a low-friction escape hatch without changing the page architecture.

