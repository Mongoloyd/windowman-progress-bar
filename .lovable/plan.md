

# GradeReveal — Enhanced Drop Shadow & Elevation

The reference image shows a card with a prominent, soft blue-tinted drop shadow creating a floating/elevated effect. Currently, the GradeReveal sections use flat backgrounds (`#FAFAFA`, `white`) with thin borders and no meaningful box-shadow.

## Changes (single file: `src/components/GradeReveal.tsx`)

### 1. Wrap the entire GradeReveal in an elevated container
Add an outer wrapper `div` around all sections with a heavy, layered box-shadow matching the dark forensic theme (cyan-tinted glow). This creates the "floating card" effect from the reference image.

### 2. Add elevation to individual flag cards (Section 3)
Each flag card currently has `background: "white"` with only a border. Add a soft shadow (`0 2px 12px rgba(0,0,0,0.06)`) so they feel lifted off the section background.

### 3. Add elevation to the negotiation script card (Section 4)
The script block gets a similar subtle shadow treatment.

### 4. Keep all existing behavior
Scan theatrics, animations, counter, grade circle, copy script — everything stays as-is. This is a visual-only change.

## What the shadow looks like
The outer container gets a multi-layer shadow:
- Inner: `0 4px 24px rgba(0, 242, 255, 0.08)` (cyan ambient glow)
- Outer: `0 20px 60px rgba(0, 0, 0, 0.15)` (depth)
- Border: subtle `1px solid` using a low-opacity border token

This matches the reference's elevated, glowing card aesthetic while staying consistent with the Dark Forensic design system.

