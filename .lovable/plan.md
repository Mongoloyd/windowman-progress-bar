

## Problem

The "Second Opinion Scan" `+ Add` button (line 128-136 in `EvidenceLocker.tsx`) tries to scroll to `#truth-gate`, but post-reveal that element is conditionally hidden. The button logs an event and does nothing visible.

## Fix

Wire it the same way every other post-reveal CTA works: accept an `onSecondScan` callback prop, call it on click, and pass `triggerTruthGate('second_opinion_scan')` from Index.tsx.

### EvidenceLocker.tsx
- Add `onSecondScan?: () => void` to the props interface
- Replace the inline `onClick` on the `+ Add` button to call `onSecondScan?.()`

### Index.tsx
- Pass `onSecondScan={() => triggerTruthGate('second_opinion_scan')}` to `<EvidenceLocker>`

This reuses the existing `triggerTruthGate` which resets `gradeRevealed`, switches to Flow A, and scrolls to `#truth-gate` after render -- exactly the right behavior for "scan another quote."

