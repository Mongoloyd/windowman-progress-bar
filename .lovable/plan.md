

# Portal-Based Demo Takeover + Exit Button

## Problem
`DemoScanPage` renders inline within the Hero grid, so it's visually trapped inside the layout. It needs to take over the entire viewport.

## Changes

### `src/components/PowerToolDemo.tsx` — 4 edits

**1. Add `createPortal` import (line 8)**
Add `createPortal` from `react-dom` to imports.

**2. Rewrite `PowerToolFlow` orchestrator (lines 1609–1662)**
- Add `useEffect` that sets `document.body.style.overflow = "hidden"` when state is not `"idle"`, and resets on cleanup.
- Keep the button/badge/footer in normal document flow.
- Portal the `LeadModal` to `document.body` (instead of inline render).
- Portal the `DemoScanPage` to `document.body` inside a `position: fixed; inset: 0; zIndex: 9999; overflowY: auto` wrapper with the Inter font family and dark background.
- Pass `onClose` (which resets state to `"idle"`) through to `DemoScanPage`.

**3. Update `DemoScanPage` signature (line 1544)**
Add `onClose` to its props and pass it through to `DemoReport` at line 1602.

**4. Add Exit button to `DemoReport` banner (lines 1097–1120)**
- Accept `onClose` prop in `DemoReport` signature (line 1072).
- Replace the banner inner content with a flex container: left side has the existing demo text + upload link, right side has an "Exit Demo ✕" button that calls `onClose`.
- Change `textAlign: "center"` to remove it (the flex layout handles alignment).

### Constants reference
- `T.bg` = the dark background color (already defined as a `T` alias from `DS.colors` around line 96–100 — need to verify the alias name).

