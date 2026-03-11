

# Fix: forwardRef for UrgencyBadge and TrustFooter

## The Problem

Framer Motion's `<motion.div>` passes a `ref` to child components for animation tracking (measuring size, position, layout animations). When you pass a function component as a child that doesn't accept refs, React logs the warning: **"Function components cannot be given refs."** The animations still work visually, but ref-dependent features (layout animations, `useInView`, exit animations) silently break.

## The Fix

Convert both `UrgencyBadge` and `TrustFooter` from plain function components to `React.forwardRef` components. This is a 2-line structural change per component:

1. `function UrgencyBadge()` → `const UrgencyBadge = React.forwardRef<HTMLDivElement>((props, ref) => ...)`
2. Add `ref={ref}` to each component's outermost `<div>`.
3. Same for `TrustFooter`.

## How It Works After

When Framer Motion wraps or animates these components, it attaches a ref to measure the DOM node. With `forwardRef`, the ref reaches the actual `<div>`, so:
- Layout animations measure correctly
- Exit animations (`AnimatePresence`) can read the element before unmount
- `useInView` tracking works if applied
- The console warnings disappear

No visual or behavioral change — just proper React/Framer Motion integration.

## Files Changed

| File | Change |
|------|--------|
| `src/components/PowerToolDemo.tsx` (lines 39-70, 75-93) | Wrap both components with `React.forwardRef`, add `ref={ref}` to root divs |

