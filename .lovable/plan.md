

## Problem

The `InteractiveDemoScan` hover-to-pause (`onMouseEnter` / `onMouseLeave`) freezes the entire phase cycle the moment the cursor enters the card. Users watching the demo on desktop inevitably hover over it, causing it to appear stuck after one scan. The CTA buttons added inside the card made this worse because they invite cursor interaction.

## Fix

Replace the binary pause-on-hover with a smarter approach: **pause only during the "hook" phase** (where CTAs live), but let doc/scan/reveal phases always auto-advance regardless of hover. This way the scanning animation always loops visually, but gives users time to read and click when results appear.

### Changes — `src/components/InteractiveDemoScan.tsx`

1. **Remove `onMouseEnter` / `onMouseLeave` / `onTouchStart` / `onTouchEnd`** from the container div (lines 272-275). Remove `handlePause` and `handleResume` callbacks and `paused` state.

2. **Extend the "hook" phase duration** from 4500ms to 6000ms to give users more reading time since we're no longer pausing on hover.

3. **Remove the `if (paused) return;` guard** from the phase machine effect (line 221), so phases always advance.

This preserves the auto-cycling loop through all 3 samples while keeping the hook phase long enough for users to read and click the CTA.

