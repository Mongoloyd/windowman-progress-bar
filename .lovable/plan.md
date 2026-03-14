

## Problem

The "Upload yours to unlock →" and "Upload My Real Quote — It's Free →" CTA buttons inside the InteractiveDemoScan *do* fire — they call `handleCtaClick` → `onScanClick` → `triggerTruthGate('demo_scan')`, which smooth-scrolls to the `#truth-gate` section just below. But because the demo scan section sits directly above the truth-gate form, the scroll distance is minimal and barely noticeable. It feels like nothing happened.

## Fix

Make `handleCtaClick` scroll **and** visually highlight the truth-gate section so the user clearly sees where to act. Two changes:

### 1. Add a brief highlight pulse to TruthGateFlow on scroll-to

In `TruthGateFlow.tsx`, accept an optional `highlight` prop. When true, apply a 1-second ring/glow animation to the form card, then reset.

### 2. Wire the highlight from Index.tsx

Add a `truthGateHighlight` state in Index. Set it to `true` inside `triggerTruthGate()`, and pass it to `<TruthGateFlow highlight={truthGateHighlight} />`. TruthGateFlow resets it after the animation completes.

### Files Changed

- **`src/pages/Index.tsx`** — Add `truthGateHighlight` state, set it in `triggerTruthGate`, pass as prop to TruthGateFlow, add a reset callback.
- **`src/components/TruthGateFlow.tsx`** — Accept `highlight` prop, apply a temporary `ring-2 ring-gold shadow-lg shadow-gold/20` class with a 1.5s timeout removal to the main form container when `highlight` flips to true.

This keeps the existing scroll behavior but adds a clear visual signal that draws the eye to the form.

