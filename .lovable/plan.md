

# What You Want

You want the AI scanner demo to look like a **dedicated hardware screen** — not a floating card with shadows. A thick, permanent border frames the entire component. Inside that frame, padding creates a "gutter" so the cyan laser line never touches the outer border. The result: the scan animation lives inside a visible bezel, like a monitor or scanner device.

# Implementation Plan

## File: `src/components/InteractiveDemoScan.tsx`

### 1. Outer Container — Permanent 5px Frame
Change line 258 from the current `border-[1.5px] border-border` to a **`border-[5px] border-cyan/30 rounded-2xl`** (muted cyan bezel). Drop the shadow — the border IS the visual anchor now.

### 2. MockDocument Inner Area — Padded Safe Zone
The MockDocument div (line 106) already has `p-6` and `overflow-hidden`. The laser line currently uses `absolute left-0 right-0` with top sweeping from `-10%` to `110%`, which makes it bleed to the edges of this container.

**Fix the laser sweep (lines 151-155):**
- Change from `left-0 right-0` to `left-6 right-6` (matching the p-6 padding) so the line sits inside the content zone.
- Clamp the top animation from `top: "0%"` to `top: "100%"` instead of `-10%` to `110%`, so it stays within bounds vertically.

The blue tint overlay (line 147) stays `inset-0` — that's fine, it's just a color wash.

### 3. Results View (Reveal/Hook Phases)
No changes needed — these phases don't have the scan line, and they already use proper padding from the outer container's `p-6 md:p-8`.

### Visual Result
```text
┌─────────────────────────────┐  ← 5px muted cyan border (permanent)
│                             │
│   ┌─────────────────────┐   │  ← inner content area
│   │  ═══════════════    │   │  ← cyan laser sweeps HERE
│   │  document content   │   │
│   │  skeleton lines     │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

Two classes change, one animation range tweak. The frame is always visible regardless of phase.

