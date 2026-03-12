

# Add Demo CTA + Scroll-Aware Opacity to StickyRecoveryBar

## Changes

### 1. `src/components/StickyRecoveryBar.tsx`

**New props:**
- `onDemoCTAClick?: () => void` — triggers PowerTool
- `leadCaptured?: boolean` — hides demo button when lead already captured

**Cyan demo button** added next to the existing gold CTA:
- Cyan background (`#00B8D4` or similar from our cyan tokens) to match the InteractiveDemoScan visual identity
- Same size/padding as the gold button for equal weight
- Copy: `"View AI Scan Demo"` at steps 0, swaps to `"See What Your Grade Looks Like"` at steps 1+
- Hidden when `leadCaptured === true`
- Clicking it fires `onDemoCTAClick` and auto-dismisses the bar

**Status text update:** Add `"View a demo scan and learn how to spot a bad deal"` as an additional line in the `getStatusCopy` rotation — specifically as the `line2` subtitle when `stepsCompleted === 0`.

**Scroll-aware opacity:** Add a scroll direction listener inside the component:
- Track `scrollY` and compare to previous value
- Scrolling down → animate opacity to `0.25` over ~300ms
- Scroll stops (debounce ~150ms) or scrolling up → animate opacity back to `1.0`
- Uses framer-motion's `animate` on the outer container for smooth transitions
- Does not affect layout or position — only visual opacity

### 2. `src/pages/Index.tsx`

Wire the new props on `<StickyRecoveryBar>`:
- `onDemoCTAClick={() => { setPowerToolTriggered(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}`
- `leadCaptured={leadCaptured}`

### File summary

| File | Change |
|------|--------|
| `src/components/StickyRecoveryBar.tsx` | Add cyan demo CTA, contextual copy swap, scroll-direction opacity logic, auto-dismiss on demo click, hide demo when lead captured |
| `src/pages/Index.tsx` | Pass `onDemoCTAClick` and `leadCaptured` props to StickyRecoveryBar |

