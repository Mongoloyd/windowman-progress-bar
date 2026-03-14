

## Fix: Hero CTA Scroll Race Condition

### Problem
The `useEffect` on line 114 fires immediately when `flowMode`/`gradeRevealed` change, but the `#truth-gate` element may not have painted yet (especially when transitioning from Flow B or resetting `gradeRevealed`). The scroll either misses or lands short.

### Fix — `src/pages/Index.tsx`, lines 113-122

Replace the current useEffect with a double-`requestAnimationFrame` wrapper. This ensures React commits the DOM update **and** the browser completes layout/paint before scrolling:

```typescript
// ── Scroll to truth-gate after render ──
useEffect(() => {
  if (pendingScrollRef.current && flowMode === 'A' && !gradeRevealed) {
    // Double rAF: first fires after React commit, second after browser paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("truth-gate");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          pendingScrollRef.current = false;
        }
      });
    });
  }
}, [flowMode, gradeRevealed]);
```

### Why double `requestAnimationFrame`?
- A single `rAF` runs *before* the browser paints (after layout).  
- A double `rAF` guarantees the first frame has fully painted, so the element's position is final.  
- This is more reliable than `setTimeout(fn, 50)` because it's synced to the actual render cycle rather than an arbitrary delay.

### No other files changed.

