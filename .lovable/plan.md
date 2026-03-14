## Plan: Redesign PowerTool CTA as Co-Dominant Cyan Button

### What Changes

**Goal:** Three clear CTAs in the hero — "Scan My Quote" (gold, primary), "Watch AI Demo" (cyan, co-dominant), and "Getting Quotes Soon" (ghost, tertiary). The demo button should be as visually dominant as the scan button but a different color, making it obvious this is a parallel entry point.

### 1. Redesign `PowerToolButton` in `PowerToolDemo.tsx` (lines 305–441)

Replace the dark navy feature card with a **solid cyan button** that matches the scan button's size and weight:

- **Background:** Solid `#0891B2` (cyan-600) — no gradient, no navy, no glow
- **Size:** Same padding as "Scan My Quote" (`16px 32px`), same border-radius (10px)
- **Shadow:** `0 4px 14px rgba(8,145,178,0.35)` — colored shadow matching the gold button's shadow treatment
- **Hover:** `scale(1.02)` + slightly deeper cyan
- Remove all: CRT scanlines, glow stripe, trust strip footer, icon box, arrow
- Keep it as a simple `<button>`, not a card

**Copy:**

- Main: **SEE THE AI IN ACTION** (bold, white, 16px — same as scan button)
- Sub-line below the button (not inside): `No upload needed • Watch a live scan in 30 seconds` (12px gray, same treatment as Flow B sub-text)

**Icons:**

- `Sparkles` icon (from lucide-react) to the left of text, inline
- Small `Play` circle on the right side of the button text

### 2. Restructure Hero CTA Layout in `AuditHero.tsx` (lines 153–236)

Reorganize the three CTAs into a clear visual hierarchy:

```text
┌──────────────────────────────────────────────┐
│ [████ Scan My Quote — It's Free ████]  GOLD  │  ← Row 1
│ [████ ✨ See the AI in Action ▶ ████]  CYAN  │  ← Row 1 (md: side-by-side)
│                                              │
│ [ Getting Quotes Soon? We Can Arm You → ]    │  ← Row 2, ghost/outline
│   Generate your fair-market baseline...      │
└──────────────────────────────────────────────┘
```

  


- On mobile: All three stack vertically (gold → cyan → ghost)
- On desktop: Gold and Cyan sit side-by-side in row 1, ghost button below
- Move the PowerTool button **out of the right column** and **into the left column CTA area** as a peer button
- Remove the `PowerToolFlow` lazy-loaded section from the right column's bottom area (it will now live inline in the CTA group)

### 3. PowerToolButton Becomes a Simple Trigger

The `PowerToolButton` component shrinks from a 130-line card to a ~30-line styled button. It keeps:

- `onClick` handler (opens the portal demo)
- Hover state for scale animation
- The Sparkles + Play icons

Everything else (CRT texture, glow stripe, trust strip, icon box) is removed.

### Files Modified

- `src/components/PowerToolDemo.tsx` — Rewrite `PowerToolButton` (lines 305–441)
- `src/components/AuditHero.tsx` — Move PowerTool CTA into the left column CTA group, remove it from right column bottom