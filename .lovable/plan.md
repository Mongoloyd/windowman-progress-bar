

# CRO-Optimized Exit Intent Modal — Revised Plan

## Summary

Implement the approved CRO changes with all three flags addressed. Single file edit: `ExitIntentModal.tsx`.

---

## Changes by Variant

### All Variants — Loss Aversion Dismiss Copy
Replace every "or leave without checking — your choice" / "or leave without your results" with **"I'll risk overpaying →"** (Variants A, B, C). Variant D keeps "or leave without setting a reminder" (no overpay framing fits there).

---

### Variant A — County Ledger with Animated Stats

**County-aware stat data:**
```text
COUNTY_STATS = {
  "Miami-Dade": { scanned: 312, overcharge: 5200, redFlags: 2.4 },
  "Broward":    { scanned: 287, overcharge: 4800, redFlags: 2.1 },
  "Palm Beach": { scanned: 241, overcharge: 5600, redFlags: 2.3 },
}

FLORIDA_FALLBACK = { scanned: 2400, overcharge: 4800, redFlags: 2.1 }
```

**Logic:** If `county` is a known key, use county stats + "in {County} County". Otherwise use `FLORIDA_FALLBACK` + "across Florida." The numbers change — not just the label.

**Copy becomes:**
> "We've analyzed **{scanned}** quotes {in County / across Florida} this year. Average overcharge: **${overcharge}**. Average red flags found: **{redFlags}**. Yours takes 60 seconds."

**Animation:** Inline `useCountUp` hook (same pattern as `SocialProofStrip.tsx`) — scanned counts up from ~80% of value, overcharge from 0, redFlags static. Three stats rendered in mono font, color-coded (gold / red / amber).

**Micro-urgency pulse:** Below stats, a small green pulsing dot + "{N} homeowners checking right now" (random 8-19, set once on mount). Subtle social proof, no countdown.

---

### Variant B — Real Elapsed Time + Sunk Cost

**Flag 2 fix:** Capture `Date.now()` in a `useRef` on component mount. When Variant B renders, compute actual elapsed seconds: `Math.max(Math.round((Date.now() - mountTime) / 1000), 10)`. Display as:

> "You've spent ~{elapsed} seconds configuring your scan. {remaining} more answer(s) and your grade is ready."

No hardcoded time claim. If elapsed < 10s, floor to 10 to avoid looking trivial.

Everything else in Variant B stays the same (progress dots, answered fields, dynamic CTA text).

---

### Variant C — Keep Spinning `?` (Flag 1 Fix)

**No checkmark.** The existing spinning dashed-circle with `?` stays exactly as-is. It creates unresolved tension — replacing it with a checkmark would signal completion and reduce urgency.

Only change: dismiss copy updated to "I'll risk overpaying →".

---

### Variant D — No Changes
Keep as-is. Dismiss copy stays "or leave without setting a reminder" (loss aversion on overpaying doesn't apply post-baseline).

---

## Trigger Map (Confirming Existing Logic)
The current `getVariant()` already implements exactly this:
```
flowMode B + flowBLeadCaptured → D
stepsCompleted === 0           → A (County Ledger)
stepsCompleted 1–3             → B (Sunk Cost)
stepsCompleted >= 4            → C (Report Ready)
```
No changes needed to variant selection logic.

---

## Technical Details

| Detail | Approach |
|---|---|
| File modified | `src/components/ExitIntentModal.tsx` only |
| `useCountUp` | Inlined in file (not extracted to shared hook) |
| Mount time ref | `useRef(Date.now())` at component top |
| Live viewer count | `useState(() => 8 + Math.floor(Math.random() * 12))` — set once, no ticking |
| County resolution | `county && county !== "your county" ? county : null` — null triggers Florida fallback |
| No new dependencies | Uses existing `framer-motion`, no new packages |

