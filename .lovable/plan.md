

# Plan: InteractiveDemoScan Placement + ExitIntentModal Wired to PowerTool

## Why triggering the PowerTool from the exit modal is better

The TruthGateFlow quiz is a multi-step commitment. Someone already leaving won't start a 4-step form. The PowerTool demo is instant gratification — one modal form, then a full-screen animated scan that *shows* value immediately. It's a lower-friction re-engagement: "see what this does" vs "fill out this quiz." It also reuses the existing portal takeover with scroll-lock, so the exit modal naturally transitions into an immersive experience that's hard to abandon.

---

## Changes

### 1. `src/pages/Index.tsx` — Add InteractiveDemoScan + ExitIntentModal

**Import** `InteractiveDemoScan` and `ExitIntentModal`.

**Place `<InteractiveDemoScan />`** directly after `<SocialProofStrip />` (line 186), inside the `flowMode === 'A'` block, before `<TruthGateFlow>`.

**Add state** for PowerTool trigger from exit modal:
- `const [powerToolTriggered, setPowerToolTriggered] = useState(false);`

**Place `<ExitIntentModal />`** at the bottom of the JSX (before `StickyRecoveryBar`), always rendered. Wire props:
- `stepsCompleted={stepsCompleted}`
- `flowMode={flowMode as 'A' | 'B' | 'C'}` (cast since modal accepts 'C' but Index only uses 'A'|'B')
- `leadCaptured={leadCaptured}`
- `flowBLeadCaptured={flowBLeadCaptured}`
- `county={selectedCounty}`
- `answers` — map from existing state (most fields will be `null` since TruthGateFlow doesn't expose individual answers; pass nulls for now)
- `onClose={() => {}}` — no-op
- `onCTAClick` — this is the key change: instead of scrolling, it triggers the PowerTool modal

**Triggering the PowerTool from exit modal:**

The PowerTool's `openModal` function is internal to `PowerToolFlow`. To trigger it externally, we need to expose it. Two options:

**Option chosen:** Add a `triggerOpen` prop to `PowerToolFlow`. When `triggerOpen` transitions to `true`, the component calls `setState("modal")` via a `useEffect`. This avoids refs and keeps the component self-contained.

### 2. `src/components/PowerToolDemo.tsx` — Accept external trigger

Add optional prop `triggerOpen?: boolean` to `PowerToolFlow` (line 1624).

Add a `useEffect` that watches `triggerOpen` — when it becomes `true` and state is `"idle"`, call `openModal()`.

```tsx
useEffect(() => {
  if (triggerOpen && state === "idle") openModal();
}, [triggerOpen]);
```

### 3. Wiring in Index.tsx

In the `AuditHero` render, pass `triggerOpen={powerToolTriggered}` to `PowerToolFlow` (which is rendered inside `AuditHero`). 

Wait — `PowerToolFlow` is rendered inside `AuditHero`, not directly in Index. Need to check how it's passed through.

Actually, `PowerToolFlow` is imported and used inside `AuditHero.tsx`. So we need to thread the trigger through `AuditHero`.

**Revised approach:**

- Add `triggerPowerTool?: boolean` prop to `AuditHero`
- `AuditHero` passes it to `PowerToolFlow` as `triggerOpen`
- `PowerToolFlow` reacts to it via `useEffect`
- `ExitIntentModal.onCTAClick` sets `powerToolTriggered = true`
- After PowerTool closes (state returns to idle), we reset: add `onToolClose` callback to `PowerToolFlow` that resets `powerToolTriggered` to `false`

### Summary of file changes

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Import InteractiveDemoScan + ExitIntentModal. Add `powerToolTriggered` state. Place InteractiveDemoScan after SocialProofStrip. Render ExitIntentModal with props. Pass `triggerPowerTool` to AuditHero. |
| `src/components/PowerToolDemo.tsx` | Add `triggerOpen` prop + useEffect to open modal externally. Add `onToolClose` callback prop fired when state returns to idle. |
| `src/components/AuditHero.tsx` | Accept `triggerPowerTool` prop, pass through to `PowerToolFlow` as `triggerOpen`. |

