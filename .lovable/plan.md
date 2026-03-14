

## Plan: Wire Primary Conversion Path

### Problem
Five bottom-page components have "Scan My Quote" buttons that call `document.getElementById("truth-gate")?.scrollIntoView()` directly. This breaks in two scenarios:
1. **User is in Flow B** — TruthGateFlow (with `id="truth-gate"`) is not rendered
2. **Grade already revealed** — The entire pre-grade section is hidden, so `#truth-gate` doesn't exist

### Solution

**1. Create `triggerTruthGate(source)` in `Index.tsx`**

A single function that handles all edge cases:
- If `gradeRevealed` is true, reset it (plus `fileUploaded`, `contractorMatchVisible`)
- If `flowMode !== 'A'`, switch to Flow A
- Use a `useEffect` watching `flowMode` to scroll to `#truth-gate` after React renders Flow A (avoids race conditions with `setTimeout`)
- Log `{ event: 'wm_truth_gate_triggered', source }` via `console.log` (no external analytics)

**2. Add `onScanClick` prop to 5 components**

Each component gets an `onScanClick: () => void` prop. Replace the local `scrollTo("truth-gate")` call with `onScanClick()`.

| Component | Current behavior | Change |
|-----------|-----------------|--------|
| `ClosingManifesto.tsx` | Local `scrollTo("truth-gate")` on line 112 | Accept & call `onScanClick` prop |
| `IndustryTruth.tsx` | Local `scrollTo("truth-gate")` on line 223 | Accept & call `onScanClick` prop |
| `ProcessSteps.tsx` | Local `scrollTo("truth-gate")` on line 138 | Accept & call `onScanClick` prop |
| `NarrativeProof.tsx` | Local `scrollTo("truth-gate")` on line 258 | Accept & call `onScanClick` prop |
| `InteractiveDemoScan.tsx` | `getElementById("truth-gate")` on line 362 | Accept & call `onScanClick` prop |

**3. Wire `onUploadQuote` in `AuditHero`**

The existing `onUploadQuote` callback (line 126-132 in Index.tsx) already handles the PowerTool→Flow A transition. Replace its body with `triggerTruthGate('power_tool_demo')`.

**4. Pass props in `Index.tsx`**

```text
<InteractiveDemoScan onScanClick={() => triggerTruthGate('demo_scan')} />
<IndustryTruth onScanClick={() => triggerTruthGate('industry_truth')} />
<ProcessSteps onScanClick={() => triggerTruthGate('process_steps')} />
<NarrativeProof onScanClick={() => triggerTruthGate('narrative_proof')} />
<ClosingManifesto onScanClick={() => triggerTruthGate('closing_manifesto')} />
```

**5. Scroll-after-render via `useEffect`**

Add a `pendingScroll` ref. When `triggerTruthGate` fires, set `pendingScroll.current = true`. A `useEffect` depending on `flowMode` and `gradeRevealed` checks if `pendingScroll` is true, finds `#truth-gate`, scrolls to it, and resets the ref.

### Files Modified
- `src/pages/Index.tsx` — Add `triggerTruthGate`, `useEffect` for scroll, pass `onScanClick` to 5 components, update `onUploadQuote`
- `src/components/ClosingManifesto.tsx` — Add `onScanClick` prop, replace local scroll
- `src/components/IndustryTruth.tsx` — Add `onScanClick` prop, replace local scroll
- `src/components/ProcessSteps.tsx` — Add `onScanClick` prop, replace local scroll
- `src/components/NarrativeProof.tsx` — Add `onScanClick` prop, replace local scroll
- `src/components/InteractiveDemoScan.tsx` — Add `onScanClick` prop, replace local scroll

