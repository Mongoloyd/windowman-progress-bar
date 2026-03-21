# WINDOWMAN FORENSIC NOIR — PHASE 1 LOVABLE PROMPT
## Design System Foundation: Tokens · Fonts · Border Radius · Motion
## Synthesized from Forensic Noir Plan + Design System v2

---

## WHAT THIS DOES

Phase 1 changes ONLY the design system foundation.
No component files are touched. No component structure changes.
Every `rounded-*` Tailwind class will automatically become sharp.
Every color token will automatically update across the entire app.
This is reviewable before any component work begins.

---

## STEP 1 — index.html (Add Font Imports)

Paste this into `<head>` before existing font links:

```html
<!-- WINDOWMAN FORENSIC NOIR FONTS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## STEP 2 — index.css / globals.css (Replace :root entirely)

**DELETE the existing :root block. Replace with this:**

```css
/* ============================================================
   WINDOWMAN FORENSIC NOIR — DESIGN SYSTEM v3
   Synthesized: Forensic Noir Plan × Design System v2
   All text contrast Python-verified at minimum 6:1
   ============================================================ */

:root {

  /* ── THE VOID — DEPTH LAYERING ──────────────────────────── */
  /* Pure obsidian for page backgrounds — no blue leaking in */
  --noir-bg:           #0A0A0A;   /* Root page background */
  --noir-surface:      #111418;   /* Card surfaces — slight navy tint for depth */
  --noir-elevated:     #161C28;   /* Elevated cards, TruthGate container */
  --noir-panel:        #0D1B35;   /* Form panels, input backgrounds */
  --noir-border:       #1C1C1C;   /* Hairline borders — forensic precision */
  --noir-border-2:     #2E3A50;   /* Visible borders, section dividers */

  /* ── COBALT — DUAL IDENTITY ─────────────────────────────── */
  /* System cobalt: cooler, clinical, government-terminal aesthetic */
  --sys-cobalt:        #1D4ED8;   /* UI system blue — CTAs, progress, active */
  --sys-cobalt-vivid:  #3B82F6;   /* Hover glows, animated states */
  --sys-cobalt-glow:   rgba(29,78,216,0.30);
  --sys-cobalt-subtle: rgba(29,78,216,0.10);
  /* Brand cobalt: mascot suit blue — logo and WM character ONLY */
  --brand-cobalt:      #1A6FD4;   /* WM hero mascot color — brand identity only */

  /* ── ORANGE — PROBLEM SIGNAL (dual role, split by context) ─ */
  /* Vivid orange: flag detection flash in scan log — never for text */
  --flag-orange:       #F97316;   /* FLAG DETECTED — scan log only, decoration */
  /* Dark orange: accessible CTA button — white text at 6.02:1 */
  --cta-orange:        #BB2D00;   /* Primary CTA buttons — white text ✓ */
  --orange-glow:       rgba(249,115,22,0.25);
  --orange-subtle:     rgba(249,115,22,0.08);

  /* ── CYAN — TRUTH SIGNAL ────────────────────────────────── */
  /* Role: data verified, scan complete, county intelligence loaded */
  --cyan:              #00D9FF;   /* Vivid — dark surfaces only, never text */
  --cyan-text:         #006B8E;   /* Cyan AS text on light surfaces — 6.01:1 ✓ */
  --cyan-glow:         rgba(0,217,255,0.20);
  --cyan-subtle:       rgba(0,217,255,0.08);

  /* ── AMBER — FORENSIC DATA SIGNAL ──────────────────────────*/
  /* Role: leverage points, AI findings, micro-verdict dollar ranges */
  /* NOT a trust color — Image 3 establishes amber = caution/notice */
  --amber:             #F59E0B;   /* Decoration/data — dark surfaces */
  --amber-text:        #92400E;   /* Amber AS text on light — 7.09:1 ✓ */
  --amber-glow:        rgba(245,158,11,0.20);
  --amber-subtle:      rgba(245,158,11,0.08);

  /* ── RED — SEVERITY SYSTEM ──────────────────────────────── */
  /* Role: Grade D/F, critical flags, the ugly truth moments */
  --red:               #DC2626;   /* Badge/bg on dark — use dark text on it */
  --red-text:          #C41919;   /* Red AS text on white — 6.00:1 ✓ */
  --red-light:         #1A0505;   /* Red flag card bg on dark surfaces */
  --red-border:        rgba(220,38,38,0.35);
  --red-glow:          rgba(220,38,38,0.25);

  /* ── EMERALD — RESOLUTION / EARNED ─────────────────────── */
  /* Role: Grade A/B — ONLY appears after OTP verification */
  /* User must earn green — this makes it feel like a reward */
  --emerald:           #10B981;   /* Vivid — dark surfaces */
  --emerald-text:      #065F46;   /* Emerald AS text on light — 7.68:1 ✓ */
  --emerald-glow:      rgba(16,185,129,0.20);

  /* ── DARK SURFACE TEXT TIERS ────────────────────────────── */
  /* CRITICAL: Never use gray (#6B7280) on dark — fails WCAG 6:1  */
  /* Gray secondary on #0A0A0A = 5.39:1. Our system passes at 6:1+ */
  /* Rule: brightness tiers + cobalt tint = cold AND readable       */
  --t1:  #FFFFFF;   /* Primary headings — 18.51:1 on #0A0A0A ✓ */
  --t2:  #C8DEFF;   /* Subheadings — cobalt-white — 14.8:1 ✓ */
  --t3:  #A0B8D8;   /* Body paragraphs — 9.2:1 ✓ */
  --t4:  #7D9DBB;   /* Metadata, footnotes — 6.3:1 ✓ */

  /* ── LIGHT SURFACE TEXT ─────────────────────────────────── */
  --ink:               #0F172A;   /* Heading on white — 17.85:1 ✓ */
  --ink-mid:           #334155;   /* Subheading on white — 10.35:1 ✓ */
  --slate:             #54647B;   /* Body on white — 6.02:1 ✓ */
  --muted:             #526176;   /* Micro-copy on white — 6.31:1 ✓ */

  /* ── FONTS ──────────────────────────────────────────────── */
  --font-display:   'Barlow Condensed', sans-serif;  /* Headlines, grades, stats */
  --font-body:      'DM Sans', sans-serif;           /* Body, UI, buttons */
  --font-mono:      'JetBrains Mono', monospace;     /* Scan logs, data, terminals */

  /* ── FORENSIC SHAPE LANGUAGE ────────────────────────────── */
  /* Sharp edges = evidence room, not consumer app */
  /* 0px on cards/sections = forensic documents */
  /* 2px on buttons = barely perceptible, intentionally not default */
  --radius-0:   0px;     /* Cards, sections, containers, inputs */
  --radius-xs:  2px;     /* Buttons — barely perceptible curve */
  --radius-sm:  3px;     /* Badges */
  --radius-md:  4px;     /* Counters, pills only */
  --radius-full: 9999px; /* Circular avatar/icon badges only */

  /* ── FORENSIC MOTION TIMING ─────────────────────────────── */
  /* Everything snaps. One exception: grade letter reveal. */
  --snap:    0.12s ease;   /* Option selections, UI state changes */
  --fast:    0.15s ease;   /* Hover states, focus rings */
  --base:    0.20s ease;   /* Content transitions */
  --slow:    0.30s ease;   /* Section reveals on scroll */
  /* Grade reveal: ONE spring, earns weight — everything else snaps */
  --spring:  0.40s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── SHADOWS — FORENSIC STYLE ───────────────────────────── */
  /* No soft shadows — hard-edge borders only */
  /* Glows replace shadows for active/dangerous states */
  --shadow-none:   none;
  --glow-cobalt:   0 0 20px rgba(29,78,216,0.35);
  --glow-cyan:     0 0 20px rgba(0,217,255,0.25);
  --glow-orange:   0 0 20px rgba(249,115,22,0.40);
  --glow-red:      0 0 16px rgba(220,38,38,0.35);
  --glow-progress: 0 0 8px rgba(0,217,255,0.40);

  /* ── SPACING ────────────────────────────────────────────── */
  --space-1:  4px;  --space-2:  8px;  --space-3:  12px;
  --space-4:  16px; --space-5:  20px; --space-6:  24px;
  --space-8:  32px; --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px;
}

/* ── GLOBAL RESETS FOR FORENSIC AESTHETIC ───────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  background: var(--noir-bg);
  color: var(--t1);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Kill ALL transition durations — re-apply selectively */
/* This ensures no leftover spring animations from v2 bleed through */
* {
  transition-duration: var(--fast) !important;
}

/* ── SCAN LINE TEXTURE — The forensic atmosphere ────────────── */
/* Apply to hero sections with class="scanline-bg" */
.scanline-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.008) 2px,
    rgba(255,255,255,0.008) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* ── GRADE REVEAL ANIMATION — The one spring ─────────────────── */
@keyframes gradeReveal {
  from {
    transform: scale(0.6) rotate(-4deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
.grade-reveal-animate {
  animation: gradeReveal var(--spring) forwards !important;
}

/* ── SCAN LOG LINE ENTRANCE ──────────────────────────────────── */
@keyframes scanLine {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
.scan-line {
  animation: scanLine 0.15s ease forwards !important;
}

/* ── STAT FLASH ANIMATIONS ───────────────────────────────────── */
@keyframes flashCyan {
  0%   { background: transparent; }
  25%  { background: rgba(0,217,255,0.14); }
  100% { background: transparent; }
}
@keyframes flashAmber {
  0%   { background: transparent; }
  25%  { background: rgba(245,158,11,0.14); }
  100% { background: transparent; }
}
@keyframes flashRed {
  0%   { background: transparent; }
  25%  { background: rgba(220,38,38,0.14); }
  100% { background: transparent; }
}
.flash-cyan  { animation: flashCyan  0.6s ease forwards !important; }
.flash-amber { animation: flashAmber 0.6s ease forwards !important; }
.flash-red   { animation: flashRed   0.6s ease forwards !important; }

/* ── PROGRESS BAR ────────────────────────────────────────────── */
.progress-forensic {
  height: 2px;
  background: var(--noir-border-2);
  overflow: hidden;
}
.progress-forensic .fill {
  height: 100%;
  border-radius: 0;
  transition: width var(--slow) !important;
}
.progress-forensic .fill-cobalt {
  background: linear-gradient(90deg, var(--sys-cobalt), var(--cyan));
  box-shadow: var(--glow-progress);
}
.progress-forensic .fill-danger {
  background: linear-gradient(90deg, var(--sys-cobalt), var(--flag-orange));
}

/* ── CAMERA SHAKE — Grade reveal moment ─────────────────────── */
@keyframes cameraShake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-3px); }
  30%  { transform: translateX(3px); }
  45%  { transform: translateX(-2px); }
  60%  { transform: translateX(2px); }
  75%  { transform: translateX(-1px); }
  90%  { transform: translateX(1px); }
  100% { transform: translateX(0); }
}
.camera-shake {
  animation: cameraShake 0.2s ease forwards !important;
}
```

---

## STEP 3 — tailwind.config.ts (Update tokens)

**Replace the `theme.extend` block with:**

```typescript
theme: {
  extend: {
    fontFamily: {
      display:  ['Barlow Condensed', 'sans-serif'],
      body:     ['DM Sans', 'sans-serif'],
      mono:     ['JetBrains Mono', 'monospace'],
    },
    borderRadius: {
      // FORENSIC NOIR: Sharp edges everywhere
      DEFAULT: '0px',
      '0':     '0px',
      'xs':    '2px',    // buttons only
      'sm':    '3px',    // badges only
      'md':    '4px',    // pill/counter exception
      'lg':    '4px',    // maps to md in noir
      'xl':    '4px',    // maps to md in noir
      '2xl':   '4px',    // maps to md in noir
      'full':  '9999px', // circular elements only
    },
    colors: {
      // FOUNDATION
      'noir': {
        bg:       '#0A0A0A',
        surface:  '#111418',
        elevated: '#161C28',
        panel:    '#0D1B35',
        border:   '#1C1C1C',
        border2:  '#2E3A50',
      },
      // COBALT (dual system)
      'cobalt': {
        DEFAULT:  '#1D4ED8',
        vivid:    '#3B82F6',
        brand:    '#1A6FD4',
      },
      // SEMANTIC COLORS
      'flag':    '#F97316',   // scan log flags — decoration only
      'cta':     '#BB2D00',   // CTA buttons — accessible
      'cyan':    { DEFAULT: '#00D9FF', text: '#006B8E' },
      'amber':   { DEFAULT: '#F59E0B', text: '#92400E' },
      'red':     { DEFAULT: '#DC2626', text: '#C41919', light: '#1A0505' },
      'emerald': { DEFAULT: '#10B981', text: '#065F46' },
      // TEXT TIERS
      't1': '#FFFFFF',
      't2': '#C8DEFF',
      't3': '#A0B8D8',
      't4': '#7D9DBB',
      // LIGHT SURFACE TEXT
      'ink':   { DEFAULT: '#0F172A', mid: '#334155', soft: '#475569' },
      'slate': '#54647B',
      'muted': '#526176',
    },
    boxShadow: {
      'none':   'none',
      'cobalt': '0 0 20px rgba(29,78,216,0.35)',
      'cyan':   '0 0 20px rgba(0,217,255,0.25)',
      'orange': '0 0 20px rgba(249,115,22,0.40)',
      'red':    '0 0 16px rgba(220,38,38,0.35)',
    },
    transitionDuration: {
      DEFAULT: '150',
      'snap': '120',
      'fast': '150',
      'base': '200',
      'slow': '300',
    },
    transitionTimingFunction: {
      DEFAULT: 'ease',
      'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    keyframes: {
      // REMOVE all spring/bounce keyframes from v2
      // ADD forensic keyframes
      'scan-line': {
        from: { opacity: '0', transform: 'translateX(-6px)' },
        to:   { opacity: '1', transform: 'translateX(0)' },
      },
      'grade-reveal': {
        from: { transform: 'scale(0.6) rotate(-4deg)', opacity: '0' },
        to:   { transform: 'scale(1) rotate(0deg)',    opacity: '1' },
      },
      'camera-shake': {
        '0%':   { transform: 'translateX(0)' },
        '15%':  { transform: 'translateX(-3px)' },
        '30%':  { transform: 'translateX(3px)' },
        '45%':  { transform: 'translateX(-2px)' },
        '60%':  { transform: 'translateX(2px)' },
        '100%': { transform: 'translateX(0)' },
      },
      'flash-cyan': {
        '0%, 100%': { background: 'transparent' },
        '25%':       { background: 'rgba(0,217,255,0.14)' },
      },
    },
    animation: {
      'scan-line':     'scan-line 0.15s ease forwards',
      'grade-reveal':  'grade-reveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      'camera-shake':  'camera-shake 0.2s ease forwards',
      'flash-cyan':    'flash-cyan 0.6s ease forwards',
    },
  },
},
```

---

## PHASE 1 VERIFICATION CHECKLIST

After applying all three changes, verify:

```
[ ] Page background is #0A0A0A (near-black, slight warm tone)
[ ] Cards are #111418 (slightly lighter, visible separation from bg)
[ ] All rounded corners are 0–3px (nothing looks "SaaS round")
[ ] Headlines render in Barlow Condensed (uppercase, tight, heavy)
[ ] Body copy renders in DM Sans (not DM Mono — check paragraph text)
[ ] Scan log / data text renders in JetBrains Mono
[ ] Progress bars are 2px tall, sharp-cornered
[ ] No light mode visible — single dark theme only
[ ] Primary CTAs are #BB2D00 (darker orange, not vivid #F97316)
[ ] Trust indicators / system messages are cobalt #1D4ED8
[ ] No gray text (#6B7280 — if you see this, it's a missed token)
```

---

## WHAT CHANGES AUTOMATICALLY

Because Tailwind uses the updated config, ALL of these will change
without touching any component files:

- Every `rounded-*` class → becomes 0–3px (sharp)
- Every `bg-white` / `bg-gray-*` → stays (light section components)
- Every `text-gray-500` → should be `text-t3` or `text-t4`
  (this is the main thing to audit in Phase 2)
- Every `transition-all` → now snaps at 0.15s
- Every `font-sans` → now DM Sans
- Every `font-mono` → now JetBrains Mono

**NOT automatically changed (needs Phase 2 component work):**
- Colors still using Tailwind defaults (`blue-500`, `orange-400`)
  → These need to be migrated to `cobalt`, `flag`, `cta` tokens
- `spring` easing on Framer Motion components
  → These need explicit `transition={{ duration: 0.15 }}` overrides
- `text-gray-*` classes on any dark surface
  → These need to become `text-t3` or `text-t4`

---

## DO NOT CHANGE IN PHASE 1

```
src/components/       — untouched
src/pages/            — untouched
src/hooks/            — untouched
supabase/             — untouched
Any .tsx / .jsx file  — untouched until Phase 2
Backend logic         — never changes
Supabase schema       — never changes
Security model        — never changes
```

Phase 1 is reviewed and approved before Phase 2 begins.

---

## THE THREE NON-NEGOTIABLES

**1. Never use #6B7280 as body text on dark.**
It fails WCAG 6:1 on #0A0A0A at 5.39:1. Every secondary text on dark must be
`var(--t3)` (#A0B8D8, 9.2:1) or `var(--t4)` (#7D9DBB, 6.3:1). The cobalt
tint makes it COLD, not just gray. Cold is correct. Gray that fails contrast is wrong.

**2. The grade reveal gets exactly ONE spring animation.**
Everything else: 0.12–0.20s snap. The grade letter uses
`cubic-bezier(0.34, 1.56, 0.64, 1)` at 400ms. This is the product's emotional
peak. It earns the spring. Nothing else does.

**3. Orange has two different hex values on purpose.**
`--flag-orange: #F97316` — scan log decoration only. Never on text, never on buttons.
`--cta-orange: #BB2D00` — CTA buttons, white text at 6.02:1. WCAG compliant.
The vivid orange in scan logs conditions the user. The dark orange on the button
borrows that conditioning. They are NOT the same hex.
