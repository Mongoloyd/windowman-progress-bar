# Dev Mode Toggle for StickyRecoveryBar

## `src/pages/Index.tsx`

- Add `const IS_DEV_MODE = true;` at the top of the `Index` component (line ~39)
- Change line 89-90 to: `const showRecoveryBar = IS_DEV_MODE || (scrolledPast70 && !anyLeadCaptured && timeOnPage && !recoveryBarDismissed && !gradeRevealed && !flowBComplete);`
- Pass `isDevMode={IS_DEV_MODE}` prop to `<StickyRecoveryBar />`

## `src/components/StickyRecoveryBar.tsx`

- Add `isDevMode?: boolean` to the props interface
- Accept `isDevMode = false` in destructured props
- In `handleDemoCta`: wrap `localStorage.setItem` and `onDismiss()` in `if (!isDevMode)`
- In `handleClose`: wrap `localStorage.setItem` and `onDismiss()` in `if (!isDevMode)`
- Remove the early return on line 125 (`if (flowMode === 'B' && quoteWatcherSet) return null`) — wrap it in `if (!isDevMode)` instead

All smart logic stays intact. Flip `IS_DEV_MODE` to `false` for production behavior.  
TypeScript

```
// SET TO FALSE BEFORE DEPLOYING TO PRODUCTION
const IS_DEV_MODE = true; 
```