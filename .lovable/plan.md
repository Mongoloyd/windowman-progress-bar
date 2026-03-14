

## Current State: The InteractiveDemoScan CTA Is Already Wired

The prompt's core request -- wiring the InteractiveDemoScan buttons to `triggerTruthGate` -- **is already done**. Here's the proof:

- **Line 191-192**: `InteractiveDemoScan` already accepts `onScanClick?: () => void`
- **Line 364-371**: The "Scan My Quote" button already calls `onScanClick()` when provided, falling back to `getElementById` only if the prop is missing
- **Index.tsx** (from previous implementation): `InteractiveDemoScan` is already passed `onScanClick={() => triggerTruthGate('demo_scan')}`

The `triggerTruthGate` function (line 100-111) already handles resetting `gradeRevealed`, switching `flowMode` to `'A'`, and the `useEffect` on line 114-122 handles the post-render scroll.

**There is no dead-end bug here.** The conversion bridge was completed in the previous implementation round.

---

## What the Prompt IS Missing (CRO / UX / UI Gaps)

These are the real opportunities the prompt overlooks:

### 1. The Hook Phase Has a 4.5-Second Timer That Auto-Destroys the CTA
The "Scan My Quote" button only appears during the `hook` phase (lines 349-377), which auto-advances after 4.5 seconds (line 230-235). If a user is reading the flags and reaches the CTA just as it disappears, they lose the conversion moment. **Fix**: Pause the auto-cycle when the user hovers or interacts with the card, or keep a persistent mini-CTA visible during reveal+hook phases.

### 2. No Interaction-Aware Pause
The demo cycles robotically through 3 scans regardless of user engagement. If someone is reading Flag 1's description, the card transitions away. **Fix**: Add `onMouseEnter`/`onTouchStart` to pause the timer, resume on leave.

### 3. The "[unlock to read]" Text Is a Dead End
Flag 2 (lines 337-342) shows redacted content with "[unlock to read]" but clicking it does nothing. This is a tease with no payoff. **Fix**: Make it clickable, wired to `onScanClick`, with micro-copy like "Upload your quote to unlock full analysis."

### 4. No "Sample" Badge Distinguishing Demo from Real
Users who later upload a real quote see the same visual language (grade circle, flags, delta). There's no clear differentiation between demo data and their real report. **Fix**: Add a persistent "SAMPLE ANALYSIS" watermark or badge during the demo to set expectations.

### 5. Mobile Viewport: 480px Fixed Height May Clip
The container is hardcoded to `h-[480px]` (line 262). On small phones (375px wide, short viewports), the hook phase with flags + CTA button may clip or require scrolling inside a non-scrollable container. **Fix**: Use `min-h-[480px] h-auto` or test on 375x667.

### 6. No Transition Animation Between Demo and Real Funnel
When `onScanClick` fires, the demo just scrolls away. There's no visual "handoff" moment. **Fix**: Add a brief "Initializing your scan..." micro-animation or a fade-out on the demo card before scrolling, reinforcing that the tool is now working on *their* data.

### 7. The CTA Copy Could Be Stronger
"Scan My Quote -- It's Free" is functional but doesn't leverage the emotional peak. The user just saw a grade of "D" with $8,500 overpayment. **Fix**: Dynamic CTA copy based on the active scan: "Is yours worse than a D? Find out free." or "Could you be overpaying $8,500+?"

---

## Recommended Implementation (If You Want to Act on These)

| Priority | Item | Impact |
|----------|------|--------|
| High | Pause auto-cycle on hover/touch | Prevents lost conversions from premature transitions |
| High | Make "[unlock to read]" clickable → `onScanClick` | Converts curiosity into action |
| Medium | Dynamic CTA copy tied to active scan data | Higher click-through from emotional resonance |
| Medium | Persistent mini-CTA during reveal phase | Doubles the conversion window |
| Low | "SAMPLE" watermark | Reduces confusion when real report loads |
| Low | Mobile height fix | Prevents clipping on small devices |

No code changes needed for the original wiring request -- it's already complete.

