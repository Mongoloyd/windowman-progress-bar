# WINDOWMAN.PRO — COMPLETE LOVABLE BUILD PROMPT
## Full Homepage + Post-Scan + Recovery + Admin · Production-Ready
## Updated with Final Copy, Revised Architecture, Three-Flow System

---

> **HOW TO USE THIS DOCUMENT**
> Feed each COMPONENT BLOCK to Lovable as a separate prompt, in sequence.
> Start with GLOBAL SETUP first — this establishes design tokens, fonts, and
> App.jsx state that every subsequent component depends on.
> Then build C-01 through C-17 in order.
> Each block is self-contained. Each references only what came before it.
> Do not skip blocks. Do not reorder.

---

> **WHAT THIS BUILD CONTAINS**
>
> GLOBAL SETUP → Design system, fonts, tokens, App.jsx state
>
> HOMEPAGE (Light theme, mobile-first):
> C-01 → LinearHeader
> C-02 → AuditHero (revised — "Don't sign blind")
> C-03 → InteractiveDemoScan (NEW — self-running pre-experience)
> C-04 → SocialProofStrip
> C-05 → TruthGateFlow (revised — diagnostic labels, Micro-Verdict, Step 4 fork)
> C-06 → FlowBEntry + MarketBaselineTool (no-quote path)
> C-07 → FlowCEntry (verbal/appointment path)
> C-08 → IndustryTruth
> C-09 → MarketMakerManifesto (NEW — transparency + business model)
> C-10 → WhyWindowManGetsBetterPrices (NEW — arbitrage explanation)
> C-11 → ProcessSteps
> C-12 → NarrativeProof
> C-13 → ClosingManifesto
>
> POST-SCAN (appears after upload + OTP):
> C-14 → GradeReveal (updated flag copy + revised CTA)
> C-15 → ContractorMatch (revised — single introduction model)
> C-16 → EvidenceLocker (two states: Flow A post-scan + Flow B pre-scan)
>
> RECOVERY SYSTEMS:
> C-17 → StickyRecoveryBar (flow-aware)
> C-18 → ExitIntentModal (4 variants)
>
> DISTRIBUTION + OPERATIONS:
> C-19 → SharedReportPage (/report/:reportId route)
> C-20 → AdminDashboard (/admin — call queue primary view)
>
> ROUTING UPDATE → Final App.jsx wiring

---

# ════════════════════════════════════════════════════════
# GLOBAL SETUP
# Design System · Fonts · Tokens · State Architecture
# Send this FIRST before any component
# ════════════════════════════════════════════════════════

```
Set up the complete WindowMan.pro design system.

// ─── THIS BUILD IS WIRED TO YOUR EXISTING globals.css ─────────────────────
// The colors and fonts below match --color-* and --font-* variables already
// defined in your Lovable project. Do not override with hardcoded values.

Install dependencies:
  npm install framer-motion react-router-dom

Add to your existing globals.css @import block (or index.html <head>):
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">

Create src/tokens/design.js:
// ─── VALUES MATCH YOUR globals.css CSS VARIABLES ──────────────────────────

export const COLORS = {
  // ── Semantic roles — LOCKED, never deviate ───────────────────────────────
  navy:        '#0F1419',   // --color-navy        · headings, authority backgrounds
  navyLight:   '#1A2332',   // --color-navy-light   · nav header on dark sections
  navyLighter: '#243044',   // --color-navy-lighter · secondary dark backgrounds
  gold:        '#F59E0B',   // --color-amber        · ONE primary CTA per viewport
  cyan:        '#00D9FF',   // --color-cyan         · data, AI output, Flow B accents
  primary:     '#0891B2',   // --primary            · teal: links, supporting UI
  royal:       '#0066CC',   // --color-royal        · secondary action / trust badges
  emerald:     '#10B981',   // --color-emerald      · final conversion (max 2/page)
  crimson:     '#EF4444',   // --color-danger       · red flags, urgent signals only
  amber:       '#D97706',   // warning amber — kept darker than CTA to preserve hierarchy
  slate:       '#0F172A',   // --foreground         · body copy
  gray:        '#64748B',   // --muted-foreground   · secondary copy
  lightGray:   '#94A3B8',   // slate-400            · micro-text, notes
  white:       '#FFFFFF',   // page background
  offWhite:    '#FAFBFC',   // --background         · section alternating background
  border:      '#E2E8F0',   // --border             · dividers
  navyDeep:    '#0F1419',   // admin terminal background
  navyMid:     '#1A2332',   // admin header
  // ── Tinted backgrounds ────────────────────────────────────────────────────
  goldLight:   '#FFFBEB',   // amber-50 tint
  cyanLight:   '#E0F8FF',   // cyan-50 tint
  greenLight:  '#D1FAE5',   // emerald-100 tint
  redLight:    '#FEF2F2',   // danger-50 tint
  amberLight:  '#FFFBEB',   // warning amber tint
  navyTint:    'rgba(15,20,25,0.04)',
}

export const FONTS = {
  display: "'Poppins', sans-serif",       // --font-display · ALL headings h1–h6
  body:    "'Inter', sans-serif",          // --font-body    · body copy, UI labels
  mono:    "'JetBrains Mono', monospace",  // --font-mono    · eyebrows, data, code
}

// ─── UTILITY CLASSES — already in your globals.css, use these everywhere ──
//
//  .glass-card          → bg rgba(255,255,255,0.8) + blur(16px) + border + shadow
//                         Use on ALL card containers instead of manual bg+border+shadow
//
//  .glow-cyan           → box-shadow 0 0 20px rgba(0,217,255,0.15)
//  .glow-cyan-strong    → box-shadow 0 0 30px rgba(0,217,255,0.3)
//  .text-glow-cyan      → text-shadow cyan glow — use on large data readouts
//
//  .animate-scan-line   → 8s scanLine loop — use in C-03 document scan overlay
//  .animate-pulse-border→ pulsing cyan border — use on active/open-loop elements
//  .animate-shimmer     → shimmer sweep — use in C-03 progress bar during scan
//  .animate-fade-in-up  → fadeInUp 0.6s — use for flag card reveals in C-14
//  .animate-breathe     → breathe 3s — use for social proof pulse dot in C-01
//  .animate-check-spin  → 1.5s spin — use in scan theatrics spinner C-14

// ─── FONT CHANGE NOTES (Poppins replaces Poppins) ────────────────
//
// ① HEADING WEIGHT: Poppins sans-serif reads lighter at large sizes than
//   Playfair serif. For H1 equivalents, use font-weight: 800 on anything ≥ 36px.
//
// ② LINE HEIGHT: All components use line-height: 1.15 for display headings
//   (not 1.12 — Poppins geometry needs ~3% more vertical room than old serif).
//
// ③ ITALIC TREATMENT: Manifesto/testimonial italic lines use
//   font-weight: 300 + font-style: italic for Poppins. This gives softness
//   without heavy geometric weight. Looks intentionally editorial.
//
// ④ LETTER SPACING: Keep -0.02em on headlines ≥ 40px. Poppins benefits.
//   Keep 0.1em on JetBrains Mono eyebrow labels. Unchanged.

export const GRADE = {
  A: { color: '#10B981', bg: '#D1FAE5', label: 'COMPETITIVELY PRICED' },
  B: { color: '#00D9FF', bg: '#E0F8FF', label: 'SLIGHTLY ABOVE MARKET' },
  C: { color: '#F97316', bg: '#FFF7ED', label: 'OVERPRICED · REVIEW BEFORE SIGNING' },
  D: { color: '#EF4444', bg: '#FEF2F2', label: 'SIGNIFICANTLY OVERPRICED' },
  F: { color: '#7C3AED', bg: '#F5F3FF', label: 'HIGH RISK · DO NOT SIGN WITHOUT REVIEW' },
}

Create src/App.jsx with this complete state structure:

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SharedReportPage from './pages/SharedReportPage'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/report/:reportId" element={<SharedReportPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

Create src/pages/HomePage.jsx with this state:

// FLOW STATE
const [flowMode, setFlowMode] = useState('A')
// 'A' = has written quote  'B' = no quote yet  'C' = verbal/appointment

// TRUTH GATE STATE (Flow A + C)
const [currentStep, setCurrentStep] = useState(1)
const [stepsCompleted, setStepsCompleted] = useState(0)
const [answers, setAnswers] = useState({
  windowCount: null,
  projectType: null,
  county: null,
  quoteStage: null,     // Step 4 — what replaces quoteRange
  firstName: null,
  email: null,
  phone: null,
})

// FLOW B STATE
const [flowBAnswers, setFlowBAnswers] = useState({
  county: null,
  windowCount: null,
  windowType: null,
  appointmentDate: null,
  appointmentTime: null,
})

// CONVERSION STATE
const [leadCaptured, setLeadCaptured] = useState(false)
const [flowBLeadCaptured, setFlowBLeadCaptured] = useState(false)
const [phoneVerified, setPhoneVerified] = useState(false)
const [fileUploaded, setFileUploaded] = useState(false)
const [scanComplete, setScanComplete] = useState(false)
const [gradeRevealed, setGradeRevealed] = useState(false)
const [contractorMatchVisible, setContractorMatchVisible] = useState(false)
const [quoteWatcherSet, setQuoteWatcherSet] = useState(false)
const [baselineRevealed, setBaselineRevealed] = useState(false)

// RECOVERY STATE
const [exitIntentTriggered, setExitIntentTriggered] = useState(false)
const [exitIntentShown, setExitIntentShown] = useState(false)

// MOCK AUDIT RESULT (replace with real AI output in production)
const mockAuditResult = {
  grade: 'C',
  dollarDelta: 4800,
  county: answers.county || 'Broward',
  fairPriceLow: 12600,
  fairPriceHigh: 14200,
  sampleSize: 847,
  firstName: answers.firstName || 'Maria',
  flags: [
    { type: 'red',   label: 'No Window Brand Specified',
      detail: 'Your contractor can legally install any brand at any quality level.' },
    { type: 'amber', label: 'Labor Warranty: 1 Year Only',
      detail: 'Industry standard for full home replacement is a minimum 3-year labor warranty.' },
    { type: 'amber', label: 'Deposit Requirement: 50%',
      detail: "Florida\'s licensed contractor standard is a maximum 10% deposit before work begins." },
    { type: 'green', label: 'Permit Included',
      detail: 'A permit fee line item is present. Confirm the dollar amount before signing.' },
  ]
}

// ANALYTICS — fire all events here
const track = (event, props = {}) => {
  console.log({ event, ...props, timestamp: new Date().toISOString() })
  // Replace with GTM dataLayer.push() or Segment analytics.track() in production
}

GLOBAL TAILWIND CONFIG (tailwind.config.js):
  fontFamily: {
    display: ["'Poppins'",        'sans-serif'],
    body:    ["'Inter'",           'sans-serif'],
    mono:    ["'JetBrains Mono'",  'monospace'],
  }
  // globals.css already exposes --font-display, --font-body, --font-mono as
  // CSS variables. The Tailwind config adds font-display, font-body, font-mono
  // utility classes so both systems work together.
```

---

# ════════════════════════════════════════════════════════
# C-01: LINEAR HEADER
# <LinearHeader />
# ════════════════════════════════════════════════════════

```
Build a React component called <LinearHeader />.

RULE: This header has NO navigation links. Ever. The only elements are the
logo and a social proof pill. Any nav link = a leak from the funnel.

LAYOUT:
  Position: sticky, top: 0, z-index: 1000
  Background: white
  Border-bottom: 1px solid #E2E8F0
  Box-shadow: 0 1px 12px rgba(15,20,25,0.07)
  Padding: 0 20px mobile, 0 32px desktop
  Height: 60px mobile, 68px desktop
  Display: flex, align-items: center, justify-content: space-between

LOGO (left):
  "WINDOW" — font-family Poppins, 20px mobile 22px desktop,
              font-weight 900, color #0F1419, letter-spacing -0.02em
  "MAN"    — same font, color #F59E0B
  ".PRO"   — JetBrains Mono, 12px, color #94A3B8, letter-spacing 0.05em,
              vertical-align: super, margin-left: 2px

SOCIAL PROOF PILL (right):
  Display: flex, align-items: center, gap: 8px
  Background: #FAFBFC
  Border: 1px solid #E2E8F0
  Border-radius: 999px
  Padding: 6px 14px

  Pulsing green dot:
    Width: 7px, height: 7px, border-radius: 50%
    Background: #10B981
    Animation: pulse 2s infinite
    @keyframes pulse: scale 1→1.4→1, opacity 1→0.6→1

  Text: JetBrains Mono 11px color #0F172A font-weight 500:
    "4,127 scans completed this month"

  On mobile (< 480px): pill text shortens to "4,127 scans this month"

COMPONENT PROPS: none
EMITS: nothing
ANALYTICS: none (passive element)
```

---

# ════════════════════════════════════════════════════════
# C-02: AUDIT HERO
# <AuditHero />
# Revised — "Don't sign blind" architecture
# ════════════════════════════════════════════════════════

```
Build a React component called <AuditHero />.

PURPOSE: Establish the threat frame and get the first click.
One dominant message. One primary CTA. Zero distractions.

PROPS:
  onFlowAClick: function (scroll to TruthGate, Flow A)
  onFlowBClick: function (set flowMode='B', scroll to FlowBEntry)
  flowMode: string ('A' | 'B' | 'C')

When flowMode !== 'A': hero fades to opacity 0.15, pointer-events none.
(It stays in DOM so user can "switch back" — only the FlowB/C entries show.)

LAYOUT:
  Background: white
  Padding: pt-16 pb-20 px-4 mobile, pt-24 pb-28 px-8 desktop
  Max-width: max-w-6xl mx-auto

DESKTOP: two-column grid (grid-cols-5)
  Left: col-span-3 (copy)
  Right: col-span-2 (grade preview card — desktop only)
MOBILE: single column, grade preview hidden

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEFT COLUMN — COPY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EYEBROW BADGE:
  Display: inline-flex, align-items: center, gap: 8px
  Background: #FFFBEB, border: 1px solid #F59E0B, border-radius: 6px
  Padding: 5px 14px, margin-bottom: 24px
  JetBrains Mono 10px font-weight 700 color #F59E0B letter-spacing 0.1em:
  "FOR FLORIDA HOMEOWNERS WITH IMPACT WINDOW QUOTES"

H1 HEADLINE:
  Font: Poppins, 44px mobile, 58px desktop
  Font-weight: 700, color: #0F1419, line-height: 1.12
  Margin-bottom: 22px

  EXACT TEXT:
  "Don't sign a window contract you haven't checked."

  IMPORTANT: No "Smart homeowners" prefix. No identity flattery.
  This is a directive that presupposes checking is the obvious action.

SUBHEADLINE:
  Font: Inter, 18px mobile, 20px desktop
  Color: #0F172A, line-height: 1.75, margin-bottom: 32px
  Max-width: 560px

  EXACT TEXT:
  "Upload any impact window quote and our AI scans it for hidden fees,
   missing protections, and overpriced scope — before you commit to anything."

PRIMARY CTA:
  Display: inline-block
  Background: #F59E0B, color: white
  Font: Inter 17px font-weight 700
  Padding: 16px 36px, border-radius: 10px
  Border: none, cursor: pointer
  Box-shadow: 0 4px 20px rgba(245,158,11,0.35)
  Letter-spacing: 0.01em

  EXACT TEXT: "Scan My Quote — It\'s Free →"

  Framer Motion: whileHover scale 1.02, whileTap scale 0.98
  Transition: spring, stiffness 400, damping 30

  On click: onFlowAClick()
  track({ event: 'wm_hero_flow_a_click' })

TRUST NOTE (below primary CTA):
  Display: flex, align-items: center, gap: 6px
  Margin-top: 12px
  Inter 13px color #64748B:
  "No account required · No contractor contact · Results in 60 seconds"

FLOW B MICRO-LINK (below trust note):
  Margin-top: 18px
  Inter 13px color #94A3B8:
  "Getting quotes soon? "
  Link span: color #00D9FF, underline, cursor pointer:
  "We can arm you first →"

  Below link (new line):
  Inter 12px color #94A3B8 italic:
  "Generate your fair-market baseline before the contractor arrives"

  On click: onFlowBClick()
  track({ event: 'wm_hero_flow_b_click' })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RIGHT COLUMN — GRADE PREVIEW CARD
(Desktop only — hidden on mobile)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CARD:
  Background: white
  Border: 1.5px solid #E2E8F0
  Border-radius: 16px
  Padding: 28px 24px
  Box-shadow: 0 8px 40px rgba(15,20,25,0.10)
  Max-width: 300px
  Margin-left: auto

  Framer Motion: initial opacity 0 x 20, animate opacity 1 x 0
  Transition: delay 0.3s, duration 0.5s

CARD HEADER:
  JetBrains Mono 10px color #94A3B8 letter-spacing 0.12em:
  "SAMPLE ANALYSIS · BROWARD COUNTY"
  Margin-bottom: 20px

GRADE CIRCLE (centered):
  Width: 96px, height: 96px, border-radius: 50%
  Border: 3px solid #F97316, background: #FFF7ED
  Margin: 0 auto 16px
  Display: flex, align-items: center, justify-content: center
  Inside: "C" — Poppins 54px font-weight 900 color #F97316

DELTA LINE:
  Text-align: center, margin-bottom: 16px
  JetBrains Mono 22px font-weight 900 color #EF4444: "+$4,200"
  Inter 12px color #64748B: "above fair market"

MINI FLAG (just one):
  Background: #FEF2F2, border-radius: 8px, padding: 10px 12px
  Display: flex, align-items: flex-start, gap: 8px
  "⚑" in #EF4444, 12px
  Inter 13px font-weight 600 color #0F1419:
  "No Window Brand Specified"
  Inter 12px color #64748B margin-top 2px:
  "Most commonly missed issue"

CARD FOOTER:
  Margin-top: 16px, padding-top: 14px
  Border-top: 1px solid #F3F4F6
  JetBrains Mono 10px color #94A3B8 text-center:
  "Your quote generates a real grade"
```

---

# ════════════════════════════════════════════════════════
# C-03: INTERACTIVE DEMO SCAN
# <InteractiveDemoScan />
# NEW — The Pre-Experience Engine
# ════════════════════════════════════════════════════════

```
Build a React component called <InteractiveDemoScan />.

PURPOSE: A self-running 7-second animation loop that lets every visitor
experience the scan process before they commit to anything. This converts
the abstract concept of "AI audit" into a felt, visceral preview.

THE KEY PSYCHOLOGICAL DESIGN:
The demo is intentionally INCOMPLETE. It shows one red flag fully,
one red flag partially (category visible, content masked), and a hint
of a third. This is Information Scarcity (Cialdini) + Zeigarnik Effect.
The visitor cannot close the cognitive file. They need to know what theirs says.

DO NOT show a static screenshot. DO NOT show a full polished result.
Show enough to create tension. Stop before closure.

LAYOUT:
  Background: #FAFBFC
  Border-top: 1px solid #E2E8F0
  Border-bottom: 1px solid #E2E8F0
  Padding: py-14 px-4 mobile, py-20 px-8 desktop

SECTION HEADER (centered, above animation):
  JetBrains Mono 11px #00D9FF letter-spacing 0.1em margin-bottom 12px:
  "LIVE DEMO — WATCH A REAL SCAN"
  Poppins 28px mobile 34px desktop color #0F1419 font-weight 700 margin-bottom 6px:
  "See the AI at work."
  Inter 15px color #64748B:
  "This runs automatically. No upload required."
  Margin-bottom: 36px

ANIMATION CONTAINER:
  Max-width: 520px, mx-auto
  Background: white
  Border: 1.5px solid #E2E8F0
  Border-radius: 16px
  Padding: 28px 24px
  Box-shadow: 0 4px 24px rgba(15,20,25,0.08)
  Min-height: 280px, display flex flex-col align-items center

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATION STATE MACHINE
Use useState for phase: 'doc' | 'scan' | 'reveal' | 'hook'
Use useEffect to advance phases on timers.
Loop: after 'hook' phase holds for 3s, reset to 'doc' and restart.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1 — 'doc' (1.5s):
  AnimatePresence key="doc"
  Framer Motion: opacity 0→1, y 10→0, duration 0.4s

  Document thumbnail (CSS-only, no image):
    Width: 80px, height: 100px
    Background: white, border: 1.5px solid #E2E8F0, border-radius: 4px
    Box-shadow: 2px 3px 8px rgba(0,0,0,0.08)
    Margin: 0 auto 16px

    Inside: 4 horizontal lines (simulating text lines):
      Each: height 6px, background #E2E8F0, border-radius: 3px
      Widths: 90%, 75%, 90%, 60%
      Gap: 8px, margin-top: 12px

    Top corner: small "PDF" tag — JetBrains Mono 7px background #E0F8FF
      color #00D9FF border-radius 3px padding 2px 5px

  Below thumbnail:
  JetBrains Mono 12px color #0F172A font-weight 500:
  "WindowQuote_SampleHome.pdf"
  Inter 11px color #94A3B8 margin-top 4px:
  "Broward County · 14 Windows · $18,400"
  Inter 11px color #C4C9D4 margin-top 2px italic:
  "Before WindowMan"

PHASE 2 — 'scan' (1.5s, with cycling terminal text):
  AnimatePresence key="scan"

  Document thumbnail with cyan scan overlay:
    Position: relative, same thumbnail as Phase 1
    Overlay: position absolute inset-0, rgba(0,217,255,0.08),
             border: 1.5px solid rgba(0,217,255,0.3), border-radius: 4px

    Scan line (CSS animation):
      Position: absolute, left 0 right 0, height 2px
      Background: linear-gradient(90deg, transparent, #00D9FF, transparent)
      Animation: scanMove 0.8s ease-in-out infinite
      @keyframes scanMove: top 0%→100%→0%

  Below thumbnail — terminal text cycling:
    Use useEffect with setInterval 500ms cycling through:
    Array: [
      'Extracting line items...',
      'Checking Broward County benchmarks...',
      'Scanning warranty language...',
      'Brand specification check...',
      'Calculating fair-market delta...',
    ]
    Display: JetBrains Mono 11px color #00D9FF letter-spacing 0.04em
    Fade each string in/out: opacity 0→1→0, duration 0.4s

  Progress bar (below text):
    Width: 100% of container, height: 3px, background: #E2E8F0, border-radius: 2px, margin-top 12px
    Fill: background #00D9FF, border-radius: 2px
    Animate width: 0→85% during scan phase (CSS transition 1.4s linear)
    DO NOT fill to 100% — pause at 85% → transition to reveal

PHASE 3 — 'reveal' (2.5s — the Intentionally Incomplete reveal):
  AnimatePresence key="reveal"
  Framer Motion: opacity 0→1, duration 0.5s

  TOP ROW (flex, justify-between, align-items center, margin-bottom 16px):

    GRADE CIRCLE:
      Width: 64px, height: 64px, border-radius: 50%
      Border: 2.5px solid #F97316, background: #FFF7ED
      Display flex center
      Framer Motion: initial scale 0, animate scale 1
      Spring: stiffness 500, damping 30, delay 0.1s
      Inside: "C" Poppins 36px font-weight 900 color #F97316

    DELTA (right of circle):
      JetBrains Mono 26px font-weight 900 color #EF4444:
      Animated counter: $0 → +$4,200 over 1.2s
      Inter 11px color #64748B margin-top 2px: "above fair market"

  PROGRESS BAR: width fills to 99% (CSS transition from 85%)
  Then PAUSES at 99% for exactly 1 second. Nothing changes.
  This pause is intentional — it is the Zeigarnik cliffhanger.

  FLAG 1 — FULLY VISIBLE (Framer Motion: y 10→0, opacity 0→1, delay 0.3s):
    Background: #FEF2F2, border-left: 3px solid #EF4444
    Border-radius: 6px, padding: 10px 12px, margin-top: 12px

    Row: flex, align-items: flex-start, gap: 8px
    "⚑ CRITICAL" — JetBrains Mono 10px color #EF4444 font-weight 700
    Inter 13px font-weight 600 color #0F1419:
    "No Window Brand Specified"
    Inter 12px color #64748B margin-top 2px:
    "Your contractor can install any brand at any quality level."

  FLAG 2 — CATEGORY VISIBLE, DETAIL MASKED (delay 0.5s):
    Same container, background #FFFBEB, border-left color #F59E0B

    Row:
    "⚑ WARRANTY ISSUE" — JetBrains Mono 10px color #D97706 font-weight 700
    Inter 13px font-weight 600 color #0F1419:
    "Labor Warranty Gap"

    Detail line: MASKED — render as a bar of CSS blocks:
    Display: flex, gap: 2px, margin-top: 4px
    Twelve blocks: 8px × 8px, background: #D1D5DB, border-radius: 1px
    After the blocks: Inter 11px color #94A3B8: "[unlock to read]"

  FADED LINE (delay 0.7s):
    Inter 12px color #94A3B8 italic margin-top 10px text-center:
    "+ 1 more issue found in the full report"

PHASE 4 — 'hook' (holds for 3s before loop restart):
  Same as Phase 3 but add below the flags:

  DIVIDER: 1px solid #E2E8F0, margin 16px 0

  HOOK LINE: Poppins 16px font-style italic color #0F1419 text-center:
  "This was a sample quote. What would yours say?"

  PULSE CTA BUTTON:
    Background: #F59E0B, color white
    Inter 14px font-weight 700, padding 11px 28px, border-radius: 8px
    Box-shadow: 0 3px 14px rgba(245,158,11,0.35)
    Framer Motion: animate scale [1, 1.03, 1], transition repeat Infinity duration 2s
    Full-width within container, margin-top: 12px
    Text: "Scan My Quote — It\'s Free →"
    On click: scroll to #truth-gate
    track({ event: 'wm_demo_cta_clicked' })

ANALYTICS:
  On mount: track({ event: 'wm_demo_scan_viewed' })
  On phase 'reveal' entry: track({ event: 'wm_demo_reveal_seen' })
  On hook CTA click: track({ event: 'wm_demo_cta_clicked' })
```

---

# ════════════════════════════════════════════════════════
# C-04: SOCIAL PROOF STRIP
# <SocialProofStrip />
# ════════════════════════════════════════════════════════

```
Build a React component called <SocialProofStrip />.

LAYOUT:
  Background: #0F1419
  Padding: py-10 px-4 mobile, py-12 px-8 desktop

INNER: max-w-4xl mx-auto
  Display: flex, flex-col gap-6 on mobile
  Display: flex, flex-row justify-between on desktop

LIVE SIGNAL (mobile: hidden, desktop: left-aligned):
  Display: flex, align-items: center, gap: 8px
  Green pulse dot (same as header)
  JetBrains Mono 11px color #94A3B8: "LIVE · Updated in real time"

THREE COUNTERS (flex row, justify-around, gap 24px):

  Each counter:
    Text-align: center

    VALUE:
      Font: JetBrains Mono, 36px mobile 42px desktop
      Font-weight: 900, color: white
      Use Intersection Observer to trigger count-up animation
      when counter enters viewport (fires once)
      Counter 1: count from 0 → 4,127 over 1.5s (format with comma)
      Counter 2: animate from $0 → $4,800 over 1.2s
      Counter 3: animate from 0% → 99.3% over 1.2s

    LABEL:
      Font: Inter 13px, color: #94A3B8
      Counter 1: "Florida homeowners scanned this month"
      Counter 2: "average overage found"
      Counter 3: "scans completed in under 60 seconds"

ANALYTICS: track({ event: 'wm_proof_strip_viewed' }) on first viewport entry
```

---

# ════════════════════════════════════════════════════════
# C-05: TRUTH GATE FLOW
# <TruthGateFlow />
# REVISED — Diagnostic Labels + Micro-Verdict + Step 4 Fork
# ════════════════════════════════════════════════════════

```
Build a React component called <TruthGateFlow />.
id="truth-gate"

PURPOSE: The primary conversion engine for Flow A (written quote) and
the segmentation point for Flow B and Flow C. Steps 1–3 are completely
quote-agnostic — every visitor can answer them regardless of their status.
The fork lives only at Step 4. By that point, 3 micro-commitments are done,
Zeigarnik is fully open, and the "I don't have a quote yet" option feels
like a natural answer to a question, not an admission they're on the wrong page.

PROPS:
  onFlowALeadCaptured: function(answers)
  onFlowBSelected: function()
  onFlowCSelected: function(stage)
  onStepComplete: function(stepNumber)
  answers: object
  setAnswers: function

FLOW ARCHITECTURE:
  State machine: step = 1 | 2 | 3 | 'microverdict' | 4 | 'gate' | 'upload'
  Auto-advance: every button click → next step, NO "Next" button ever
  Delay between step transition: 300ms (feels snappy, not instant)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTAINER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Padding: py-20 px-4 mobile, py-28 px-8 desktop
Max-width: max-w-2xl mx-auto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIAGNOSTIC PROGRESSION LABEL
(appears above step counter — updates each step)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Labels by step:
  Step 1: "BUILDING YOUR PROJECT PROFILE"
  Step 2: "CALIBRATING SCOPE PARAMETERS"
  Step 3: "LOADING COUNTY BENCHMARKS"
  Step 4: "IDENTIFYING QUOTE STAGE"

Style: JetBrains Mono 10px color #00D9FF letter-spacing 0.12em text-center
Framer Motion: key changes with step → opacity 0→1, y -4→0, duration 0.3s
Margin-bottom: 6px

STEP COUNTER BELOW LABEL:
  JetBrains Mono 11px color #94A3B8 text-center margin-bottom 20px:
  "Step [n] of 4"

PROGRESS BAR:
  Width: 100%, height: 4px, background: #E2E8F0, border-radius: 2px
  Fill: #F59E0B, border-radius: 2px
  Width: 25% → 50% → 75% → 100% per step
  CSS transition: width 0.4s ease

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP CARD (shared styling)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Border: 1.5px solid #E2E8F0
Border-radius: 16px
Padding: 32px 24px mobile, 40px 36px desktop
Box-shadow: 0 4px 24px rgba(15,20,25,0.08)
Min-height: 280px

Framer Motion AnimatePresence mode="wait":
  Each step slides in from x: 30, opacity 0 → x: 0, opacity 1
  Exits to x: -20, opacity 0
  Duration: 0.3s, ease: easeOut

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPTION BUTTON GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Display: grid, grid-cols-2, gap: 12px
(Single column on mobile for step 4 options — they're longer)

Each button:
  Background: white
  Border: 1.5px solid #E2E8F0
  Border-radius: 10px
  Padding: 16px 14px
  Text-align: left
  Font: Inter 15px font-weight 600 color #0F1419
  Cursor: pointer, transition: all 0.15s

  Hover: border-color #F59E0B, background #FFFBEB
         box-shadow: 0 2px 12px rgba(245,158,11,0.15)

  Selected (before advance): border-color #F59E0B, background #FFFBEB,
  show a small gold checkmark in the top-right corner of the button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — WINDOW COUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: Poppins 28px mobile 34px desktop font-weight 700 color #0F1419:
"How many windows are you replacing?"

Sub-copy: Inter 14px color #64748B margin-top 6px margin-bottom 28px:
"This determines which pricing benchmark we apply to your project."

Options (2×2 grid):
  "1–5 windows"   "6–10 windows"
  "11–20 windows" "20+ windows"

On click: setAnswers({ ...answers, windowCount: value })
          onStepComplete(1), advance to step 2 after 300ms
track({ event: 'wm_step_complete', step: 1, answer: value })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — PROJECT TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: "What type of project is this?"

Sub-copy: "Full replacements and single-room additions have different risk profiles."

Options (2×2 grid):
  "Full home replacement"    "Partial replacement"
  "Single room or addition"  "New construction"

On click: advance to step 3
track({ event: 'wm_step_complete', step: 2, answer: value })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — COUNTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: "Which county is your project in?"

Sub-copy: "We have benchmark pricing data for every major Florida county."

Options (2×2 grid):
  "Miami-Dade"           "Broward"
  "Palm Beach"           "Other Florida County"

On click: advance to 'microverdict' state
track({ event: 'wm_step_complete', step: 3, answer: value })
track({ event: 'wm_zeigarnik_threshold' }) ← HIGH PRIORITY EVENT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MICRO-VERDICT CARD
(appears after Step 3, before Step 4 — its own state in the machine)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is not a step. It is a calculated "finding" delivered between steps.
It must feel like the machine is already working — not like a form.

CARD (same container as step cards):
  AnimatePresence: slides in same as steps

  TOP LABEL: JetBrains Mono 10px #00D9FF letter-spacing 0.12em margin-bottom 14px:
  "BASED ON YOUR ANSWERS SO FAR"

  FINDING LINE: Inter 17px font-weight 700 color #0F1419 line-height 1.5:
  "Homes like yours in [answers.county] typically see
   quote gaps of $3,800–$6,200."

  FREQUENCY STAT (the critical number — treated as a data point, not marketing):
  Margin-top: 14px
  Background: #FEF2F2, border-radius: 8px, padding: 14px 16px
  Border-left: 3px solid #EF4444

  Inter 14px color #0F1419 line-height 1.7:
  "The most common issue in this county and scope: "
  Inter 14px font-weight 700 color #EF4444:
  "unspecified window brands "
  Inter 14px color #0F1419:
  "— found in "
  Inter 14px font-weight 700 color #EF4444:
  "71% of contracts we\'ve analyzed."

  IMPLICATION LINE:
  Margin-top: 14px
  Inter 14px color #0F172A line-height 1.7 italic:
  "When brands aren\'t specified, you can\'t verify you\'re getting
   the product quality you were verbally sold."

  CONTINUE BUTTON:
  Background: #F59E0B, color white
  Inter 15px font-weight 700, padding 13px 28px, border-radius: 8px
  Full-width, margin-top: 24px
  Text: "Continue →"
  On click: advance to step 4
  track({ event: 'wm_microverdict_seen', county: answers.county })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — PROCESS STAGE FORK
(The Hidden Segmenter — single column layout for longer option text)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: Poppins 28px font-weight 700:
"Where are you in the process?"

Sub-copy: Inter 14px #64748B:
"This determines which analysis tools we run."

Options (single column, stacked, gap: 10px):
  Full-width buttons, padding: 18px 20px

  OPTION 1 (→ Flow A):
    Left: Inter 16px font-weight 700 color #0F1419:
    "I have a written quote from a contractor"
    Right: small badge — background #D1FAE5 color #10B981 JetBrains Mono 10px:
    "SCAN READY"

  OPTION 2 (→ Flow C):
    Left: Inter 16px font-weight 700:
    "I got a ballpark number but nothing in writing"
    Right: badge background #FFFBEB color #F59E0B: "HIGH LEVERAGE"

  OPTION 3 (→ Flow C, highest urgency):
    Left: Inter 16px font-weight 700:
    "I have a contractor visit coming up"
    Right: badge background #FFFBEB color #F59E0B: "ACT NOW"

  OPTION 4 (→ Flow B):
    Left: Inter 16px font-weight 700 color #0F172A:
    "I\'m still in the research phase"
    Right: badge background #E0F8FF color #00D9FF: "WE\'LL ARM YOU"

On click:
  Option 1: setAnswers({...answers, quoteStage: 'written'}), advance to 'gate'
            track({ event: 'wm_step_complete', step: 4, flow: 'A' })

  Option 2: setAnswers({...answers, quoteStage: 'verbal'})
            onFlowCSelected('verbal')
            track({ event: 'wm_step_complete', step: 4, flow: 'C', stage: 'verbal' })

  Option 3: setAnswers({...answers, quoteStage: 'appointment'})
            onFlowCSelected('appointment')
            track({ event: 'wm_step_complete', step: 4, flow: 'C', stage: 'appointment' })

  Option 4: onFlowBSelected()
            track({ event: 'wm_step_complete', step: 4, flow: 'B' })

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEAD GATE (Flow A — after Option 1 at Step 4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROGRESS BADGE (top of card):
  Background: #E0F8FF, border: 1px solid #00D9FF, border-radius: 6px
  Padding: 5px 14px, display inline-block margin-bottom 20px
  JetBrains Mono 10px color #00D9FF font-weight 700 letter-spacing 0.1em:
  "YOUR PROFILE IS CONFIGURED · [COUNTY] COUNTY · [SCOPE]"

HEADING: Poppins 26px font-weight 700 color #0F1419:
"Where should we send your grade report?"

SUB: Inter 14px color #64748B margin-top 6px margin-bottom 24px:
"Your analysis is running. Enter your details to receive the full results."

FORM FIELDS (stacked, gap: 12px):

  Field 1 — First Name:
    Label: JetBrains Mono 10px #64748B letter-spacing 0.08em: "FIRST NAME"
    Input: full-width, height 48px, border 1.5px solid #E2E8F0,
    border-radius 8px, padding 0 16px, Inter 15px color #0F1419
    Placeholder: "Your first name"
    Focus: border-color #F59E0B, box-shadow 0 0 0 3px rgba(245,158,11,0.12)

  Field 2 — Email:
    Label: JetBrains Mono 10px #64748B: "EMAIL"
    Subtext in label: Inter 10px color #94A3B8: "(your grade report is sent here)"
    Placeholder: "your@email.com"

  Field 3 — Mobile:
    Label: "MOBILE NUMBER"
    Subtext: "(for OTP verification — one code, then done)"
    Placeholder: "(555) 000-0000"

SUBMIT BUTTON:
  Background: #10B981, color white (EMERALD — the final conversion color)
  Inter 16px font-weight 700, height 52px, border-radius 10px, full-width
  Text: "Continue to Upload →"
  On click: setLeadCaptured(true), onFlowALeadCaptured(answers)
  track({ event: 'wm_lead_captured', county, windowCount, projectType, quoteStage })

PRIVACY NOTE: Inter 12px color #94A3B8 text-center margin-top 12px:
"No sales calls. No spam. Unsubscribe any time."

AUTONOMY LINE: Inter 12px color #94A3B8 text-center margin-top 6px:
"Or skip for now and explore a sample report."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OTP GATE (appears after form submit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADING: Poppins 24px font-weight 700: "Verify your number."
SUB: Inter 14px color #64748B:
"We sent a 6-digit code to [phone]. Enter it below."
SUBTEXT: Inter 13px color #0F172A italic: "Your results are waiting."

6-INPUT ROW: flex, gap: 8px, justify-center, margin: 24px 0
  Each input: 48px × 56px, border 2px solid #E2E8F0, border-radius 8px
  JetBrains Mono 22px font-weight 700 text-center color #0F1419
  Focus: border-color #F59E0B
  Auto-advance on each digit entered
  Auto-submit when 6th digit entered

RESEND: Inter 13px color #00D9FF underline cursor-pointer margin-top 12px:
"Didn\'t get it? Resend code"

SECURITY NOTE: Inter 12px color #94A3B8 italic:
"This keeps your report secure and your phone private."

On complete: setPhoneVerified(true)
track({ event: 'wm_phone_verified' })
Scroll to UploadZone

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPLOAD ZONE
(hidden until phoneVerified === true)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AnimatePresence: fades in after phone verify
Background: #FAFBFC, border: 1.5px solid #E2E8F0, border-radius: 16px, padding: 32px

EYEBROW: JetBrains Mono 10px #10B981 letter-spacing 0.1em:
"STEP 2 OF 2 — UPLOAD YOUR QUOTE"

HEADING: Poppins 26px font-weight 700:
"Upload your quote for your AI analysis."

SUB: Inter 14px color #64748B margin-top 6px margin-bottom 24px:
"PDF or image. Any format from any Florida contractor."

DROP ZONE:
  Border: 2px dashed #F59E0B, border-radius: 12px
  Padding: 40px 20px, text-align: center
  Background: white, cursor: pointer
  On drag-over: background #FFFBEB, border-style: solid

  ICON: upload arrow SVG, 32px, color #F59E0B, margin-bottom 12px

  PRIMARY: Inter 15px font-weight 600 color #0F172A:
  "Drag your quote here, or click to browse"
  SUB: Inter 13px color #94A3B8 margin-top 6px:
  "PDF · JPG · PNG · Up to 10MB"

FILE SELECTED STATE (replaces drop zone content):
  Icon: ✓ checkmark, 24px, color #10B981
  Inter 15px font-weight 600 color #10B981: "✓ [filename] · Ready to analyze"

SCAN CTA:
  Background: #10B981, color white
  Inter 16px font-weight 700, height 52px, border-radius 10px, full-width
  Disabled (no file): background #D1D5DB, pointer-events none
  Enabled: "Start My AI Scan →"
  On click: setFileUploaded(true), begin ScanTheatrics
  track({ event: 'wm_quote_uploaded' })

PRIVACY NOTE: Inter 12px color #94A3B8 text-center margin-top 12px:
"Your document is encrypted and never shared with contractors without your permission."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RETURNING USER RECOGNITION BANNER
(shows at top of TruthGate if localStorage contains flow B county/baseline data)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check on mount: if localStorage has 'wm_flow_b_county' and 'wm_baseline_captured':

Background: #FFFBEB, border: 1.5px solid #F59E0B, border-radius: 10px
Padding: 16px 20px, margin-bottom: 20px
Display: flex, align-items: center, gap: 14px

Icon: 🔔 or bell SVG, 24px, color #F59E0B, flex-shrink 0

Content:
Inter 15px font-weight 700 color #0F1419:
"Welcome back — your baseline is loaded."
Inter 13px color #0F172A margin-top 4px:
"County: [stored county] · [stored windowCount] windows · Fair market: [stored range]"
Inter 13px color #64748B margin-top 4px:
"Upload your quote and we\'ll grade it against your baseline."

Pre-fill: county answer from localStorage on Step 3 load
Pre-fill: windowCount answer from localStorage on Step 1 load

Close: small × button (Inter 16px color #94A3B8), on click: dismiss banner
```

---

# ════════════════════════════════════════════════════════
# C-06: FLOW B ENTRY + MARKET BASELINE TOOL
# <FlowBEntry /> + <MarketBaselineTool />
# Triggered when user selects "I'm still in the research phase" at Step 4
# ════════════════════════════════════════════════════════

```
Build two React components: <FlowBEntry /> and <MarketBaselineTool />.
They render in sequence, both visible when flowMode === 'B'.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW B ENTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

id="flow-b-entry"
Background: white
Padding: pt-14 pb-16 px-4 mobile, pt-20 pb-24 px-8 desktop
Max-width: max-w-5xl mx-auto

Framer Motion: initial opacity 0 y 20, animate opacity 1 y 0
Transition: duration 0.4s, delay 0.1s

TOP BADGE:
  Background: #D1FAE5, border: 1px solid #10B981, border-radius: 6px
  Display: inline-flex, align-items: center, gap: 8px, padding: 5px 14px, margin-bottom: 20px
  "★" in #10B981, 14px
  JetBrains Mono 11px font-weight 700 color #10B981 letter-spacing 0.08em:
  "YOU\'RE EARLY — THAT\'S THE BEST POSITION TO BE IN"

HEADLINE (two lines, different colors):
  Line 1: Poppins 42px mobile 56px desktop font-weight 700 color #0F1419:
  "You don\'t have a quote yet."
  Line 2: same size, color: #10B981 font-weight 700:
  "That means you still have all the power."

SUB: Inter 19px color #0F172A line-height 1.75 max-width 620px margin-top 14px:
"Contractors walk in knowing the market price. Most homeowners don\'t.
 WindowMan fixes that."

EXPLANATION: Inter 15px color #64748B line-height 1.7 max-width 560px margin-top 10px margin-bottom 32px:
"In 4 minutes, we\'ll generate your county-specific fair-market baseline.
 So when the contractor opens their briefcase, you already know the number
 they\'re hoping you don\'t."

THREE OUTCOMES STRIP:
  Flex col mobile, flex row desktop, gap 20px, max-width 680px, margin-bottom 36px
  Each: flex, align-items flex-start, gap 12px
  Icon circle: 36px, border-radius 50%
  1: bg #D1FAE5, icon ✓ #10B981 — "Walk in knowing the fair price" / "Before they quote you a single number"
  2: bg #FFFBEB, icon 📋 #F59E0B — "Know the 5 questions to ask" / "The questions contractors hope you never think to ask"
  3: bg #E0F8FF, icon 🔔 #00D9FF — "Get a reminder to scan your quote" / "We\'ll text you the moment you need to upload it"

PRIMARY CTA:
  Background: #10B981, color white
  Inter 17px font-weight 700, padding 16px 36px, border-radius 10px
  Box-shadow: 0 4px 16px rgba(16,185,129,0.35)
  Text: "Build My Baseline — It\'s Free →"
  On click: smooth scroll to #market-baseline
  track({ event: 'wm_flow_b_entry_cta_clicked' })

SWITCH BACK LINK:
  Inter 13px color #94A3B8 margin-top 14px:
  "Actually, I do have a quote — "
  Span: color #00D9FF underline cursor-pointer: "scan it instead →"
  On click: setFlowMode('A'), scroll to #truth-gate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MARKET BASELINE TOOL
(3-step tool identical in UX to TruthGateFlow but 3 steps, emerald accent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

id="market-baseline"
Background: white, padding py-16 px-4 mobile py-24 px-8 desktop
Max-width max-w-2xl mx-auto

EYEBROW: JetBrains Mono 11px #10B981 letter-spacing 0.1em text-center: "FAIR-MARKET BASELINE GENERATOR"
HEADLINE: Poppins 32px font-weight 700 color #0F1419 text-center: "Don\'t walk into a sales pitch unarmed."
SUB: Inter 16px #0F172A text-center: "Generate your county-specific pricing baseline before the contractor arrives."

STEP COUNTER: JetBrains Mono 11px #64748B text-center: "Step [n] of 3 — [Location | Project Scope | Window Type]"
PROGRESS BAR: 33% → 66% → 100%, fill color #10B981 (emerald, not gold — visual signal of different journey)

STEP 1: "Which Florida county is your project in?" — Miami-Dade, Broward, Palm Beach, Other Florida County
STEP 2: "How many windows are you looking to replace?" — 1–5, 6–10, 11–20, 20+
STEP 3: "What type of windows are you replacing?" — Impact Windows (Hurricane), Standard Windows, Impact + Doors, Not sure yet
Auto-advance on click, same mechanic as TruthGateFlow

CALCULATING STATE (0.8s after Step 3):
  Background: #D1FAE5, border: 1px solid rgba(16,185,129,0.3), border-radius 12px
  Spinning circle animation (CSS): border 3px solid #E2E8F0, border-top-color #10B981, border-radius 50%, 32px × 32px
  animation: spin 1s linear infinite
  Text cycling:
    "Searching [county] County database..."
    "427 comparable projects found."
    "Calculating fair-market range..."
  Number: count from 350 → 427, JetBrains Mono 24px bold #10B981

BASELINE LEAD GATE:
  Badge: JetBrains Mono 10px #10B981: "✓ BASELINE CALCULATED · [COUNTY] COUNTY · 427 PROJECTS"
  Heading: "Your baseline is ready."
  Sub: "Enter your details to unlock your fair-market price range and receive the Homeowner\'s Forensic Checklist — free."

  BLURRED PRICE PREVIEW:
    Background: #FAFBFC, border-radius 10px, padding 16px 20px, margin-bottom 24px, position relative overflow hidden
    Bottom layer (blurred): filter blur(7px) pointer-events none
      Label: JetBrains Mono 10px #64748B: "FAIR MARKET RANGE · [COUNTY] CO."
      Price: JetBrains Mono 26px font-weight 900 color #00D9FF: "$12,400 – $14,800"
      Sub: Inter 13px #64748B: "For [windowCount] impact windows · [county] · Q1 2025"
    Overlay layer (absolute inset): background rgba(249,250,251,0.75)
      Center content: 🔒 icon + Inter 14px font-weight 600 #0F1419: "Enter your details below to unlock"
      Inter 12px color #64748B margin-top 4px: "Free · No contractor contact"

  FORM: firstName, email (with subtext "baseline + checklist sent here"), mobile (subtext "for quote reminder")
  Focus: border-color #10B981, box-shadow rgba(16,185,129,0.12)

  SUBMIT: background #10B981, full-width, height 52px:
  "Unlock My Baseline + Checklist →"
  On click: setFlowBLeadCaptured(true), setFlowBAnswers({...})
  track({ event: 'wm_flow_b_lead_captured', county, windowCount, windowType })

  BELOW SUBMIT: Inter 12px #94A3B8 text-center:
  "You\'ll receive your fair-market baseline and the 5-Question Forensic Checklist instantly.
   When you have a quote, return here to scan it."

BASELINE REVEAL (after form submit — blur lifts):
  Animation: overlay fades out (0.4s), then filter blur(7px)→blur(0) (0.8s easeOut)
  Price numbers count up from $0 to final values

  REVEALED CARD:
    Background: #E0F8FF, border: 1.5px solid #00D9FF, border-radius: 12px, padding: 24px
    Badge: JetBrains Mono 10px #00D9FF: "YOUR FAIR-MARKET BASELINE"
    Price: JetBrains Mono 32px font-weight 900 color #00D9FF: "$12,400 – $14,800"
    Context: "For [windowCount] impact windows in [county] County"
    "Based on 427 comparable projects · Q1 2025 data"
    Italic: "Any quote significantly above $14,800 should trigger a full audit."

    ANCHOR LINE:
    Background: white, border-radius 8px, padding 12px 16px, margin-top 16px
    Inter 14px font-weight 600 color #EF4444:
    "⚠ The average quote in [county] County comes in $4,800 above this range."
    Inter 12px color #64748B margin-top 4px:
    "Now you\'ll know if yours does too."

  TWO ACTIONS:
    Button 1 (gold): "View My Forensic Checklist →" → scroll to ForensicChecklist
    Button 2 (border): "Set My Quote Reminder →" → scroll to QuoteWatcher
```

---

# ════════════════════════════════════════════════════════
# C-07: FLOW C ENTRY
# <FlowCEntry />
# Triggered by Step 4 options 2 or 3 (verbal/appointment)
# ════════════════════════════════════════════════════════

```
Build a React component called <FlowCEntry />.

PROPS: quoteStage: 'verbal' | 'appointment'

PURPOSE: Flow C is the highest-urgency pre-conversion state.
These users have either a verbal number or an appointment booked.
The lever is TEMPORAL LOSS AVERSION — their leverage isn't just
gone when they sign, it's actively shrinking right now.

The moment this user's contractor puts a number on paper, the price
anchor is set. Before that happens, WindowMan can shape the number.

id="flow-c-entry"
Background: white
Padding: pt-14 pb-16 px-4 mobile, pt-20 pb-24 px-8 desktop
Max-width: max-w-4xl mx-auto

Framer Motion: opacity 0→1, y 20→0, duration 0.4s

TOP BADGE:
  Background: #FFFBEB, border: 1px solid #F59E0B, border-radius: 6px
  Padding: 5px 14px, display inline-flex, gap 8px
  "⚡" in #F59E0B
  JetBrains Mono 11px font-weight 700 color #F59E0B letter-spacing 0.08em:
  quoteStage === 'appointment'
    ? "CONTRACTOR VISIT APPROACHING — ACT NOW"
    : "YOU HAVE A NUMBER — LET\'S USE IT"

HEADLINE:
  Line 1: Poppins 42px mobile 54px desktop font-weight 700 color #0F1419:
  quoteStage === 'appointment' ? "You have a visit coming up." : "You have a number."
  Line 2: same size, color #F59E0B font-weight 700:
  "It\'s not in writing yet. That means you still have leverage."

SUB: Inter 17px color #0F172A line-height 1.75 max-width 580px margin-top 14px:
"The moment a contractor puts it on paper, the anchor is set.
 Right now, you can still change the number before the contract arrives."

URGENCY LINE:
  Margin-top: 16px, margin-bottom: 32px
  Background: #FEF2F2, border-left: 3px solid #EF4444, border-radius: 6px
  Padding: 12px 16px
  Inter 15px font-weight 600 color #EF4444:
  "Your leverage isn\'t just gone when you sign. It\'s actively shrinking right now."

THREE OUTCOMES:
  Same structure as FlowBEntry but with different copy:
  1: bg #D1FAE5, ✓ — "Know whether your number is fair" / "Before it becomes the floor in a contract"
  2: bg #FFFBEB, 📋 — "Get the 5 questions to ask before anything is signed" / "The questions that change what ends up in writing"
  3: bg #E0F8FF, 🔔 — "Set a reminder for when the contract arrives" / "So you review it the moment it\'s in your hands"

PRIMARY CTA:
  Background: #F59E0B, color white (GOLD — this is a conversion moment, not a consolation path)
  Inter 17px font-weight 700, padding 16px 36px, border-radius 10px
  Text: "Lock In My Leverage →"
  On click: scroll to #market-baseline (Flow C uses same baseline tool as Flow B)
  track({ event: 'wm_flow_c_entry_cta_clicked', quoteStage })

SWITCH LINK:
  Inter 13px color #94A3B8 margin-top 14px:
  "I do have a written quote — "
  Span: color #00D9FF underline cursor-pointer: "scan it instead →"
  On click: setFlowMode('A'), scroll to #truth-gate
```

---

# ════════════════════════════════════════════════════════
# C-08: INDUSTRY TRUTH
# <IndustryTruth />
# ════════════════════════════════════════════════════════

```
Build a React component called <IndustryTruth />.

LAYOUT:
  Background: white
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Eyebrow: JetBrains Mono 11px #EF4444 letter-spacing 0.1em text-center:
  "WHAT MOST HOMEOWNERS DON\'T KNOW"

  Heading: Poppins 36px mobile 46px desktop color #0F1419
  font-weight 700 text-center max-width 640px mx-auto margin-bottom 16px:
  "The impact window industry has no pricing transparency standard."

  Sub: Inter 17px color #0F172A text-center line-height 1.7
  max-width 560px mx-auto margin-bottom 56px:
  "Contractors are not required to specify brands, justify pricing, or
   standardize warranty terms. That information gap is not accidental."

THREE EDUCATION BLOCKS:
  Grid: grid-cols-1 mobile, grid-cols-3 desktop, gap: 24px

  BLOCK 1 — THE BRAND TRAP:
    Background: #FEF2F2, border: 1px solid rgba(239,68,68,0.2), border-radius: 14px, padding: 28px
    Badge: JetBrains Mono 10px color #EF4444 font-weight 700: "⚑ THE BRAND TRAP"
    Heading: Inter 18px font-weight 700 color #0F1419 margin-top 10px:
    "Unspecified Brands"
    Body: Inter 14px color #0F172A line-height 1.8 margin-top 10px:
    'When your contract says "impact windows" without naming a brand, product
     line, or series, your contractor can legally install any product at any
     quality level — and charge you for premium. This is the most common red
     flag we find.'

  BLOCK 2 — THE WARRANTY GAP:
    Background: #FFFBEB, border: 1px solid rgba(245,158,11,0.2), border-radius: 14px, padding: 28px
    Badge: JetBrains Mono 10px color #D97706: "⚡ THE WARRANTY GAP"
    Heading: "Mismatched Warranty Language"
    Body: "A manufacturer may cover a window for 10 years. But if the labor
           warranty is 1 year and something fails at year 3, both warranties
           may be void. Industry standard is a minimum 3-year labor warranty
           on full home replacements."

  BLOCK 3 — THE "INCLUDED" TRAP:
    Background: #FFFBEB, border: 1px solid rgba(245,158,11,0.2), border-radius: 14px, padding: 28px
    Badge: JetBrains Mono 10px color #D97706: "⚡ THE \"INCLUDED\" TRAP"
    Heading: "Hidden Permit Fees"
    Body: 'When permit fees are "included" in the total price, the contractor
           controls whether they actually pull one. Unpermitted installations
           fail home inspections, void insurance claims, and require complete
           reinstallation to remedy.'

DARK STATEMENT BLOCK:
  Background: #0F1419, border-radius: 14px, padding: 32px, margin-top: 40px
  Text-align: center
  Poppins 22px color white font-style italic:
  "Most homeowners assume the quote reflects the market rate."
  Poppins 22px color #F59E0B font-weight 700 margin-top 8px:
  "(It usually doesn\'t.)"

TRANSITION BLOCK:
  Margin-top: 40px, text-align: center
  Inter 16px color #0F172A: "Does any of this make you want to check your quote?"
  Margin-top: 20px, flex, justify-center, gap: 12px, flex-wrap: wrap:
    Gold button: "Yes — Scan My Quote →" → scroll to #truth-gate
    Border button: "Show me what a grade looks like first →" → scroll to ScanTheatrics or demo
```

---

# ════════════════════════════════════════════════════════
# C-09: MARKET MAKER MANIFESTO
# <MarketMakerManifesto />
# NEW — The Transparency + Trust Section
# Insert AFTER IndustryTruth, BEFORE ProcessSteps
# ════════════════════════════════════════════════════════

```
Build a React component called <MarketMakerManifesto />.

PURPOSE: Answers "what\'s the catch?" before the question forms.
The Pratfall Effect: companies willing to explain their business model
openly signal they have nothing to hide. This destroys the #1 conversion
killer — unspoken suspicion — before it forms.

The homeowner reads this and thinks: "They explained exactly how they
make money. If they were trying to trick me, they wouldn\'t do that."

LAYOUT:
  Background: #0F1419
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Horizontal decorative line: 48px wide, 1px, rgba(245,158,11,0.4), centered, margin-bottom 24px

  Eyebrow: JetBrains Mono 11px #00D9FF letter-spacing 0.12em text-center margin-bottom 20px:
  "HOW WINDOWMAN ACTUALLY WORKS"

  Headline: Poppins 36px mobile 46px desktop color white font-weight 700
  text-center line-height 1.2 max-width 680px mx-auto margin-bottom 16px:
  "We keep both sides honest."

  Sub: Inter 18px color #94A3B8 text-center line-height 1.7
  max-width 560px mx-auto margin-bottom 56px:
  "Most services profit from information asymmetry.
   WindowMan profits from eliminating it."

THREE-PARTY FLOW DIAGRAM:
  Max-width: 700px, mx-auto, margin-bottom: 56px
  Flex items-center justify-between on desktop
  Flex-col items-center gap-8 on mobile

  NODE 1 — YOU:
    Circle: 80px × 80px, border-radius 50%
    Background: rgba(16,185,129,0.12), border: 2px solid rgba(16,185,129,0.35)
    Inside: home icon SVG 32px color #10B981
    Label: Inter 15px font-weight 700 color white margin-top 12px text-center: "You"
    Sub: Inter 12px color #64748B text-center: "Florida homeowner"

  ARROW 1 (→ desktop, ↓ mobile):
    Color: #F59E0B, 32px
    Above: JetBrains Mono 10px #F59E0B: "quote + intent"
    Below: JetBrains Mono 10px #10B981: "free analysis + better price"

  NODE 2 — WINDOWMAN (center, larger):
    Circle: 96px × 96px
    Background: rgba(245,158,11,0.12), border: 2px solid rgba(245,158,11,0.5)
    Box-shadow: 0 0 24px rgba(245,158,11,0.15)
    Inside: "WM" JetBrains Mono 22px font-weight 900 color #F59E0B centered
    Label: "WindowMan"
    Sub: "The market maker"

  ARROW 2:
    Above: JetBrains Mono 10px #F59E0B: "warm lead + quote intel"
    Below: JetBrains Mono 10px #10B981: "% of closed sales only"

  NODE 3 — CONTRACTOR:
    Circle: 80px × 80px
    Background: rgba(0,217,255,0.12), border: 2px solid rgba(0,217,255,0.35)
    Inside: wrench icon SVG 32px color #00D9FF
    Label: "The Contractor"
    Sub: "Vetted. Fair-priced."

THREE EXPLANATION BLOCKS:
  Grid: grid-cols-1 mobile, grid-cols-3 desktop, gap: 20px

  BLOCK 1 — WHAT YOU GET:
    Background: rgba(16,185,129,0.07), border: 1px solid rgba(16,185,129,0.18)
    Border-radius: 12px, padding: 26px 22px
    Icon row: circle 36px bg rgba(16,185,129,0.15) → "✓" #10B981 center
    Heading: Inter 16px font-weight 700 color white: "What you get — free"
    List (Inter 13px color #D1D5DB line-height 2.0, each item flex gap-8 align-start):
      "→" in #10B981 + text:
      "→ Free AI analysis of your quote"
      "→ Red flags explained in plain English"
      "→ Fair-market price for your county"
      "→ A negotiation script built for your situation"
      "→ An introduction to a vetted contractor who will beat your price — only if you want it"
    Footnote: JetBrains Mono 11px #405060 italic border-top 1px solid rgba(255,255,255,0.06)
    margin-top 14px padding-top 12px:
    "We earn nothing if you don\'t use our contractor."

  BLOCK 2 — HOW WE MAKE MONEY:
    Background: rgba(245,158,11,0.07), border: 1px solid rgba(245,158,11,0.18)
    Icon: ⚖ scales SVG color #F59E0B
    Heading: "How we make money"
    Body (Inter 13px color #D1D5DB line-height 1.9):
    Para 1: "WindowMan earns a percentage of the sale — only when you choose to
     work with one of our contractors and your project is completed."
    Para 2: "We never charge homeowners. We never charge for the scan.
     We get paid when you get a better deal than you would have gotten without us."
    Para 3 (font-weight 600): "That\'s the only model that keeps us honest about the analysis."
    Footnote: "If your current quote is already fair, we\'ll tell you that too.
    Your trust is worth more to us than one referral."

  BLOCK 3 — WHY CONTRACTORS WORK WITH US:
    Background: rgba(0,217,255,0.07), border: 1px solid rgba(0,217,255,0.18)
    Icon: chart SVG color #00D9FF
    Heading: "Why contractors work with us"
    Body:
    Para 1: "Every homeowner we introduce already understands fair-market pricing.
     They\'ve seen the red flags in competing quotes. They know what to look
     for in a contract."
    Para 2: "Our contractors don\'t walk into cold pitches. They walk into
     conversations that are already halfway won — with a homeowner who trusts
     the process and wants a fair deal."
    Footnote: "We work with a limited number of contractors per county
    to protect the quality of every introduction."

CLOSING STATEMENT:
  Margin-top: 48px, max-width 600px mx-auto
  Background: rgba(255,255,255,0.03), border: 1px solid rgba(255,255,255,0.07)
  Border-radius: 12px, padding: 32px 28px, text-align: center

  Line 1: Poppins 22px color #F59E0B font-weight 700 font-style italic:
  "The industry profits from you not knowing."

  Line 2: Poppins 22px color white font-weight 400 margin-top 8px:
  "We profit from making sure you do."

  Sub: Inter 14px color #64748B margin-top 16px:
  "That\'s why the scan is free. That\'s why the report is yours.
   That\'s why we show you the math."
```

---

# ════════════════════════════════════════════════════════
# C-10: WHY WINDOWMAN GETS BETTER PRICES
# <WhyWindowManGetsBetterPrices />
# NEW — The Arbitrage Transparency Section
# ════════════════════════════════════════════════════════

```
Build a React component called <WhyWindowManGetsBetterPrices />.

PURPOSE: Explains the economic mechanism that makes the prices better.
Homeowners who understand HOW they\'re getting a better deal are more
likely to accept the contractor introduction. Understanding removes
the "too good to be true" objection.

The key insight: the first contractor paid for the discovery
(measurement, design, proposal). WindowMan uses that investment
to introduce a competitor who can win the deal with less sunk cost.
This is post-quote market arbitrage. The homeowner is the beneficiary.

LAYOUT:
  Background: #FAFBFC
  Border-top: 1px solid #E2E8F0
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-4xl mx-auto

SECTION HEADER:
  Eyebrow: JetBrains Mono 11px #F59E0B letter-spacing 0.1em text-center margin-bottom 20px:
  "WHY THE PRICES ARE BETTER"

  Headline: Poppins 34px mobile 44px desktop color #0F1419
  font-weight 700 text-center max-width 640px mx-auto margin-bottom 12px:
  "When a contractor quotes you, they\'ve already done the expensive work."

  Sub: Inter 16px color #64748B text-center:
  "Most homeowners don\'t realize this."
  Margin-bottom: 48px

EXPLANATION — THREE PARAGRAPHS (max-width 700px mx-auto):

  Vertical connector line on left (desktop only):
    Position: absolute left-0, width: 2px, height: 100%, background: linear-gradient(#F59E0B, #00D9FF)

  PARA 1:
    Number pill: "1" — circle 28px, background #FFFBEB, border 1.5px solid #F59E0B, JetBrains Mono 14px font-weight 700 color #F59E0B
    Inter 16px color #0F172A line-height 1.8 margin-top 8px margin-bottom 24px:
    "When a contractor visits your home to give an estimate, they spend hours
     measuring your windows, designing the package, calculating materials, and
     preparing the proposal. That\'s real labor. Real expense. Real sunk cost."

  PARA 2:
    Number: "2" — same pill
    "Once you have that quote, the hard work is already done. WindowMan uses
     that information to make sure you aren\'t paying more than it\'s worth."

  PARA 3:
    Number: "3" — circle, background #E0F8FF, border color #00D9FF, JetBrains Mono color #00D9FF
    "If your quote is overpriced, we introduce a vetted contractor who already
     knows your scope — because we\'ve just handed them the competing bid.
     They come in prepared to beat it. No guessing. No sales pressure.
     Just a number that\'s been benchmarked against the market."

CLOSING LINE:
  Margin-top: 40px
  Background: #0F1419, border-radius: 14px, padding: 28px 32px, text-align: center
  Poppins 22px color white font-style italic:
  "The first contractor paid for the discovery."
  Poppins 22px color #F59E0B font-weight 700 margin-top 8px:
  "WindowMan makes sure you benefit from it."
```

---

# ════════════════════════════════════════════════════════
# C-11: PROCESS STEPS
# <ProcessSteps />
# ════════════════════════════════════════════════════════

```
Build a React component called <ProcessSteps />.

LAYOUT:
  Background: white
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Eyebrow: JetBrains Mono 11px #00D9FF letter-spacing 0.1em text-center: "HOW IT WORKS"
  Heading: Poppins 36px color #0F1419 font-weight 700 text-center: "Five steps. Under 60 seconds."
  Margin-bottom: 48px

FIVE-STEP TIMELINE:
  Mobile: vertical, connecting line on left
  Desktop: horizontal, connecting line on top

  Each step number: 40px circle, border 2px solid #F59E0B, JetBrains Mono 18px font-weight 700 color #F59E0B
  Title: Inter 16px font-weight 700 color #0F1419 margin-top 10px
  Sub: Inter 13px color #64748B margin-top 4px line-height 1.6
  Deliverable: JetBrains Mono 11px color #10B981 font-weight 600 margin-top 8px:

  Step 1: "Answer 4 quick questions" / "County, scope, project type. No account required." / Deliverable: "Your project profile is configured."
  Step 2: "Upload your quote" / "PDF or image. Any format from any Florida contractor." / "Document received and queued for analysis."
  Step 3: "AI scans every line" / "Pricing, brands, warranties, permits, payment terms, installation specs." / "14 data points extracted and benchmarked."
  Step 4: "Your grade is calculated" / "Compared against real contracts in your county and scope." / "Letter grade, dollar delta, and flag report generated."
  Step 5: "You decide what to do" / "Use your negotiation script. Request a counter-quote. Or simply know you signed fairly." / "Full report saved to your Evidence Locker."

DELIVERABLES LIST:
  Margin-top: 48px
  Background: #FAFBFC, border: 1px solid #E2E8F0, border-radius: 16px, padding: 32px
  Heading: JetBrains Mono 11px #64748B letter-spacing 0.1em margin-bottom 20px: "WHAT\'S IN YOUR REPORT"
  Grid: grid-cols-1 mobile, grid-cols-2 desktop, gap: 12px
  Each: flex, align-items: center, gap: 10px
    Circle: 8px, background #F59E0B, border-radius 50%, flex-shrink 0
    Inter 14px font-weight 600 color #0F1419

  Items:
  "Letter grade A through F"
  "Dollar delta vs. fair market"
  "Every red flag identified and explained"
  "Negotiation script built for your flags"
  "Option to request a vetted counter-quote"
```

---

# ════════════════════════════════════════════════════════
# C-12: NARRATIVE PROOF
# <NarrativeProof />
# ════════════════════════════════════════════════════════

```
Build a React component called <NarrativeProof />.

LAYOUT:
  Background: #FAFBFC
  Border-top: 1px solid #E2E8F0
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Eyebrow: JetBrains Mono 11px #94A3B8 letter-spacing 0.1em text-center: "REAL ANALYSES · REAL OUTCOMES"
  Heading: Poppins 36px color #0F1419 font-weight 700 text-center: "What happens when you know the truth."
  Margin-bottom: 48px

TWO STORY CARDS:
  Grid: grid-cols-1 mobile, grid-cols-2 desktop, gap: 24px

  CARD STYLING:
    Background: white, border: 1.5px solid #E2E8F0, border-radius: 16px, padding: 32px
    Box-shadow: 0 4px 20px rgba(15,20,25,0.06)

  CARD 1 — MARIA:
    Top: flex justify-between align-items flex-start
    Left:
      Location badge: JetBrains Mono 10px #EF4444 font-weight 700: "PEMBROKE PINES, BROWARD COUNTY"
      Project tag: Inter 12px #94A3B8: "Full home replacement · 14 windows · Grade C"
    Right: Grade circle 48px, border #F97316 bg #FFF7ED → "C" Playfair 28px font-weight 900 #F97316

    Story: Inter 14px color #0F172A line-height 1.8 margin-top 16px:
    "Maria received a $17,400 quote for full-home impact window replacement.
     Everything looked professional. The contract was two pages, the contractor
     was licensed, and the price seemed in the right range. She ran it through
     WindowMan. The AI flagged one word: "impact windows." No brand name
     anywhere in the contract. We introduced her to a contractor who specified
     PGT WinGuard Series 500 by name — and came in at $13,200."

    Outcome: margin-top 16px, padding-top 14px, border-top 1px solid #E2E8F0
    Inter 15px font-weight 700 color #10B981: "She saved $4,200 before signing anything."
    Inter 13px color #64748B italic margin-top 8px:
    '"I didn\'t know that was even a thing to look for."'

  CARD 2 — DAVID:
    Grade circle color #EF4444 bg #FEF2F2 → "D"
    Location: "CORAL SPRINGS, BROWARD COUNTY"
    Project: "Full home replacement · 18 windows · Grade D"

    Story: "David had gotten three quotes. The lowest was $19,800. He was close to
     signing when a neighbor mentioned WindowMan. His grade D came back in 47
     seconds. The AI found his quote was 26% above the Broward County benchmark
     for his scope, flagged a 1-year labor warranty on windows with a 10-year
     manufacturer guarantee, and identified a 50% deposit requirement — above
     Florida\'s licensed contractor standard. His counter-quote came in at $14,600."

    Outcome: "He saved $5,200 and had a cleaner contract."
    Testimonial: '"I would have signed the first one if I hadn\'t checked."'

TRANSITION BLOCK:
  Margin-top: 40px, text-align: center
  Poppins 22px color #0F1419 font-style italic:
  "Your quote is either priced fairly or it isn\'t."
  Inter 16px color #64748B margin-top 8px:
  "The scan tells you which."
```

---

# ════════════════════════════════════════════════════════
# C-13: CLOSING MANIFESTO
# <ClosingManifesto />
# ════════════════════════════════════════════════════════

```
Build a React component called <ClosingManifesto />.

LAYOUT:
  Background: #0F1419
  Padding: py-24 px-4 mobile, py-32 px-8 desktop
  Text-align: center

EYEBROW: JetBrains Mono 11px #94A3B8 letter-spacing 0.1em margin-bottom 24px:
"WHY WE BUILT THIS"

MANIFESTO:
  Line 1: Poppins 36px mobile 48px desktop color white font-weight 400:
  "The industry built a system where you need their expertise"
  Line 2: same size, color #F59E0B font-weight 700:
  "to understand their quote."
  Line 3: same size, color white font-weight 700 margin-top 8px:
  "We built a system where you don\'t."

FOUR TRUST CHECKMARKS:
  Display: inline-flex, flex-col mobile, flex-row desktop, gap: 16px 32px
  Margin: 40px auto 0
  Each: flex, align-items: center, gap: 10px
  Checkmark: "✓" Inter 16px font-weight 700 color #10B981
  Text: Inter 15px color #D1D5DB

  "✓ Free for every Florida homeowner"
  "✓ No contractor contact unless you ask for it"
  "✓ No upselling, no pressure, no spam"
  "✓ Your report is yours to keep"

FINAL CTA:
  Background: #F59E0B, color white
  Inter 18px font-weight 700, padding 18px 48px, border-radius 10px
  Box-shadow: 0 4px 24px rgba(245,158,11,0.4)
  Margin-top: 40px
  Framer Motion: whileHover scale 1.02
  Text: "Scan My Quote — It\'s Free →"
  On click: smooth scroll to #truth-gate
  track({ event: 'wm_manifesto_cta_clicked' })

FINAL SUB: Inter 15px color #94A3B8 margin-top 14px:
"Your contract already contains the truth. We\'ll show it to you."

AUTONOMY LINE: Inter 13px color #64748B margin-top 8px:
"Or explore a sample report first — you\'re free to choose."

FOOTER:
  Margin-top: 60px, padding-top: 32px, border-top: 1px solid rgba(255,255,255,0.08)
  Inter 13px color #405060 text-center line-height 1.8 max-width 600px mx-auto:
  "WindowMan.pro — AI-Powered Impact Window Quote Intelligence"
  "Serving Florida homeowners in Miami-Dade, Broward, Palm Beach, and all major counties."
  Inter 12px color #2D3748 margin-top 8px:
  "WindowMan is a consumer protection service. We are not a contractor, licensed installer, or home improvement company."
  "WindowMan earns a referral fee only when a homeowner chooses to work with a contractor in our network and the project closes."
  Margin-top 12px: "Privacy Policy · Terms of Use · How It Works"
```

---

# ════════════════════════════════════════════════════════
# C-14: GRADE REVEAL
# <GradeReveal />
# Updated copy + revised CTA framing
# ════════════════════════════════════════════════════════

```
Build a React component called <GradeReveal />.
Renders when gradeRevealed === true, after ScanTheatrics completes.

PROPS: auditResult (the mockAuditResult object from App.jsx)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCAN THEATRICS (fires before GradeReveal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full-screen overlay, background #0F1419, z-index 9000

PHASE 1 — LOG (sequential, 1.2s each):
  Background: #0F1419, padding 32px, border-radius 12px, max-width 500px mx-auto
  Font: JetBrains Mono 13px color #00D9FF
  
  "■ Document received — analyzing structure..."
  "■ Extracting line items and specifications..."
  "■ Accessing [county] County pricing benchmarks..."
  "■ Running brand registry check..."
  "■ Scanning warranty language..."
  "■ Calculating fair-market delta..."

  Progress bar: 0→99%, then PAUSE 2 seconds. Nothing happens.

PHASE 2 — OTP GATE (slides up from bottom after pause):
  Heading: Poppins 28px white: "One more step."
  Sub: Inter 15px #94A3B8: "Enter the code we sent to [phone] to unlock your grade."
  Subtext: Inter 14px #F59E0B italic: "Your results are waiting."

  6 OTP inputs (same styling as TruthGateFlow OTP gate)
  On complete: setScanComplete(true), setGradeRevealed(true), dismiss overlay

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRADE REVEAL PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Padding: py-16 px-4 mobile, py-20 px-8 desktop
Max-width: max-w-4xl mx-auto

PAGE BADGE: JetBrains Mono 11px #94A3B8 letter-spacing 0.1em text-center margin-bottom 8px:
"YOUR WINDOWMAN ANALYSIS · [COUNTY] COUNTY"

EYEBROW: JetBrains Mono 11px color [grade color] letter-spacing 0.1em text-center: "ANALYSIS COMPLETE"

GRADE CIRCLE (centered, spring animation on mount):
  180px × 180px, border-radius 50%
  Border: 3px solid [grade color]
  Background: [grade bg]
  Box-shadow: 0 0 0 8px [grade color at 10%], 0 8px 40px rgba(0,0,0,0.10)
  Framer Motion: initial scale 0, animate scale 1, spring stiffness 400 damping 25
  Inside: grade letter, Poppins 100px font-weight 900 [grade color]

GRADE LABEL: JetBrains Mono 14px font-weight 700 [grade color] letter-spacing 0.08em text-center margin-top 12px:
"GRADE [letter] — [GRADE[letter].label]"

PRICE ANALYSIS BAND:
  Background: #FAFBFC, border: 1px solid #E2E8F0, border-radius: 16px
  Padding: 24px, margin-top: 32px
  Grid: grid-cols-3, gap: 20px, text-align center

  COL 1: JetBrains Mono 10px #64748B margin-bottom 6px: "YOUR QUOTE PREMIUM"
    JetBrains Mono 42px font-weight 900 color #EF4444: "+$[dollarDelta]" (counter animation from $0)
    Inter 13px #64748B: "above fair market"

  COL 2: JetBrains Mono 10px #64748B: "FAIR MARKET RANGE · [COUNTY]"
    JetBrains Mono 22px font-weight 700 color #00D9FF: "$[fairPriceLow] – $[fairPriceHigh]"
    Position marker: a small arrow or dot showing where their quote falls on the range
    Inter 12px #94A3B8: "Based on [sampleSize] comparable projects · Q1 2025"

  COL 3: JetBrains Mono 10px #64748B: "DATA SAMPLE"
    JetBrains Mono 36px font-weight 900 color #00D9FF: "[sampleSize]"
    Inter 13px #64748B: "[county] County contracts analyzed"

FLAGS SECTION:
  Margin-top: 40px
  Heading: Poppins 28px color #0F1419 font-weight 700: "What we found."
  Sub: Inter 16px color #0F172A margin-top 6px margin-bottom 24px:
  "We identified [flagCount] issue[s] in your quote."

  Each flag card (Framer Motion stagger: each delays 0.1s after previous):
    Background: [type bg], border-left: 4px solid [type color], border-radius: 10px, padding: 18px 20px
    
    TOP ROW: flex justify-between align-items flex-start
    Left:
      Badge: JetBrains Mono 10px font-weight 700 [color]: "⚑ CRITICAL — ACTION REQUIRED" / "⚡ REVIEW RECOMMENDED" / "✓ CONFIRMED"
      Title: Inter 16px font-weight 700 color #0F1419 margin-top 4px: [flag.label]
    Right: expand icon (chevron) — toggles detail visibility

    DETAIL (expanded):
      Inter 14px color #0F172A line-height 1.7 margin-top 12px: [flag.detail]

NEGOTIATION SCRIPT:
  Margin-top: 40px
  Background: #0F1419, border-radius: 14px, padding: 28px

  Top row: flex justify-between
  Left: JetBrains Mono 11px #94A3B8: "HOW TO HANDLE THIS QUOTE"
  Right: JetBrains Mono 11px #94A3B8: "PERSONALIZED TO YOUR FLAGS"

  Sub: Inter 15px color #D1D5DB margin-top 8px margin-bottom 20px:
  "Use this script before you sign or decline."

  Script card: background rgba(255,255,255,0.05), border-radius 10px, padding 20px
    Label: JetBrains Mono 10px #F59E0B: "SAY EXACTLY THIS:"
    Script text: Inter 15px color white line-height 1.8 italic margin-top 10px:
    '"I noticed the contract doesn\'t specify the window brand by name. Before I
     move forward, I need the exact brand, product line, and series specified in
     the contract — along with the NOA number. Can you send me a revised proposal
     with that language added?"'

  Copy button: background rgba(245,158,11,0.15) border rgba(245,158,11,0.3)
    JetBrains Mono 12px color #F59E0B: "Copy Script"
    On click: navigator.clipboard.writeText(script), button text → "Copied ✓"
    track({ event: 'wm_script_copied', grade })

BRIDGE LINE (appears 1s after flags have all cascaded in):
  Margin-top: 16px, padding: 16px 20px
  Background: #E0F8FF, border: 1px solid rgba(0,217,255,0.3), border-radius: 10px
  Inter 14px color #00D9FF font-weight 600:
  "Your project details have been flagged. A WindowMan contractor in [county] has been notified."
  Inter 13px color #0F172A margin-top 4px:
  "They\'ll reach out within 2 business hours — only if you request an introduction below."

CTA BLOCK:
  Margin-top: 32px, flex flex-col mobile flex-row desktop, gap 12px

  Primary (gold): "Get a Counter-Quote from a Vetted Contractor →"
    On click: setContractorMatchVisible(true), scroll to ContractorMatch
    track({ event: 'wm_contractor_intro_requested', grade, dollarDelta })

  Secondary (border): "Download My Grade Report (PDF)"
    On click: window.print()
    track({ event: 'wm_report_downloaded', grade })
```

---

# ════════════════════════════════════════════════════════
# C-15: CONTRACTOR MATCH (REVISED)
# <ContractorMatch />
# Single Introduction Model — NOT a marketplace
# ════════════════════════════════════════════════════════

```
Build a React component called <ContractorMatch />.
Renders below GradeReveal when contractorMatchVisible === true.
AnimatePresence: slides in from y: 40, opacity 0→1.

CRITICAL ARCHITECTURE NOTE:
This is ONE introduction. ONE contractor. ONE referral.
There are NO comparison cards, NO multiple options, NO grid of contractors.
This is a trusted advisor making a single, informed referral.
The "three contractors" model from the original build is removed.
The experience is: "I found a contractor who will do this job for less."

LAYOUT:
  Background: #0F1419
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Text-align: center

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRADE D / F VERSION (urgent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Eyebrow: JetBrains Mono 11px #00D9FF letter-spacing 0.1em: "YOUR WINDOWMAN INTRODUCTION"

Headline: Poppins 38px mobile 48px desktop color white font-weight 700:
"I found a contractor who will do this job for less."

Sub: Inter 18px color #D1D5DB line-height 1.75 max-width 560px mx-auto margin-top 14px margin-bottom 36px:
"Based on your grade and the issues we found, I\'ve identified a [county] County
 contractor in our network who covers your scope at fair-market pricing.
 I\'d like to make the introduction."

INTRODUCTION CARD:
  Background: rgba(255,255,255,0.06), border: 1px solid rgba(245,158,11,0.4)
  Border-radius: 14px, padding: 32px 28px, max-width: 500px, mx-auto

  TOP SECTION: flex, align-items: center, gap: 16px
    Avatar: 64px circle, background rgba(245,158,11,0.15), border 2px solid #F59E0B
    "WM" JetBrains Mono 20px bold #F59E0B centered

    Right of avatar:
    Inter 16px font-weight 700 white: "WindowMan Verified Contractor"
    Inter 13px #94A3B8: "[county] County, Florida · Vetted Q1 2025"

    Badges (flex-wrap gap-2 margin-top 8px):
    Each: background rgba(16,185,129,0.15) border rgba(16,185,129,0.3) border-radius 999px
    padding 3px 10px Inter 11px #6EE7B7 font-weight 600:
    "✓ Fair-market priced" · "✓ Brand-specified quotes" · "✓ 3-year labor warranty"

  DIVIDER: 1px solid rgba(255,255,255,0.08), margin: 20px 0

  WHAT HAPPENS NEXT:
    Label: JetBrains Mono 10px #64748B letter-spacing 0.1em margin-bottom 12px: "WHAT HAPPENS NEXT"
    Inter 14px color #D1D5DB line-height 1.9:
    "1. I pass your project details to our contractor — including your grade
        report and every issue we identified."
    "2. They\'ll reach out to schedule a free measurement."
    "3. Their quote arrives in writing with every specification named."

  CTA (full-width, margin-top 24px):
    Background: #F59E0B, color white, Inter 17px font-weight 700
    Height: 54px, border-radius: 10px
    Text: "Yes — Make the Introduction →"
    Framer Motion: whileHover scale 1.02
    On click: show success state
    track({ event: 'wm_intro_confirmed', grade, dollarDelta, county })

  AUTONOMY LINE: Inter 12px #64748B text-center margin-top 12px italic:
  "No obligation. The estimate is free. You\'re under no pressure to accept it."

  COMMISSION DISCLOSURE: Inter 11px #405060 text-center margin-top 10px:
  "WindowMan earns a percentage of the sale if you choose to work with our contractor. We never charge homeowners."

SUCCESS STATE (replaces card content):
  Green checkmark circle: 72px #10B981, ✓ 28px white
  Heading: Inter 20px font-weight 700 color white margin-top 16px:
  "Introduction requested."
  Body: Inter 14px color #D1D5DB line-height 1.8 margin-top 12px:
  "I\'ve flagged your project. Our contractor will reach out within 2 business
   hours to schedule your free measurement. They already have your grade report.
   They know what your current quote missed. The conversation starts where most
   conversations end."
  Note: Inter 13px #64748B italic margin-top 16px:
  "You can still use your negotiation script with your current contractor.
   Having options is the point."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GRADE A / B VERSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Headline: "Your quote scored [grade]. It\'s competitive."
Sub: "You\'re in a good position. Before you sign — here\'s the one question worth confirming about your warranty."

WARRANTY TIP CARD: Background rgba(255,255,255,0.05), border-radius 12px, padding 24px, max-width 480px mx-auto
  "Ask your contractor to confirm in writing that the labor warranty period
   matches the manufacturer\'s product warranty. A fair-priced quote with a
   mismatched warranty is still an exposure."

Soft link below (Inter 13px #64748B underline cursor-pointer):
"Request a comparison quote anyway →"
On click: show introduction card (same as D/F version)
```

---

# ════════════════════════════════════════════════════════
# C-16: EVIDENCE LOCKER
# <EvidenceLocker />
# Two states: Flow A (post-scan) + Flow B (pre-scan)
# ════════════════════════════════════════════════════════

```
Build a React component called <EvidenceLocker />.
PROPS: flowMode, auditResult, flowBAnswers, quoteWatcherSet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW A STATE — POST-SCAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Padding: py-20 px-4 mobile, py-28 px-8 desktop
Max-width: max-w-3xl mx-auto

VAULT HEADER:
  Eyebrow: JetBrains Mono 11px #94A3B8 letter-spacing 0.1em margin-bottom 8px:
  "YOUR EVIDENCE LOCKER"
  Heading: Poppins 30px color #0F1419 font-weight 700: "[firstName]\'s Quote Analysis"
  Privacy: Inter 13px color #94A3B8 italic: "Your report is private. Only you can access this link."

VAULT ITEMS (5 items, stacked, each an expandable row):
  Each row: flex justify-between align-items center, padding 16px 0, border-bottom 1px solid #E2E8F0

  Item 1 (checked, teal): 
    Left: "✓" in #10B981 + "Grade Report — [grade] · [county] County · [date]"
    Right: link: "View →" color #00D9FF

  Item 2 (checked):
    "✓ Red Flag Analysis — [n] issues identified" / "Review →"

  Item 3 (checked):
    "✓ Negotiation Script — Personalized to your flags" / "Copy →"

  Item 4 (conditional — checked if contractor intro was requested):
    Requested: "✓ Contractor Match — Introduction requested · Pending"
    Not requested: "○ Contractor Match — Available" + gold button "Request →"

  Item 5 (EMPTY SLOT — always open — the Zeigarnik hook):
    Background: #FAFBFC, border: 1.5px dashed #D1D5DB, border-radius 8px, padding: 16px
    Left: "+ Add Second Quote — Compare two quotes side by side"
    Right: button: "Add →" in #F59E0B
    ZEIGARNIK HOOK below: Inter 12px #94A3B8 italic:
    "Have another quote from a different contractor? Grade it here."

FUTURE SELF SCENARIOS:
  Margin-top: 40px
  Heading: Poppins 24px color #0F1419 font-weight 700: "Before and after."
  Sub: Inter 14px color #64748B

  Two cards side by side (flex gap-16):
    BEFORE CARD: Background #FEF2F2, border 1px solid rgba(239,68,68,0.2), border-radius 12px, padding 20px
      Label: JetBrains Mono 10px #EF4444: "BEFORE WINDOWMAN"
      Body: Inter 14px #0F172A line-height 1.8:
      "Signing a $17,400 contract with vague brand language, a 1-year labor
       warranty, and no permit line item."
    AFTER CARD: Background #D1FAE5, border 1px solid rgba(16,185,129,0.2), border-radius 12px, padding 20px
      Label: JetBrains Mono 10px #10B981: "AFTER WINDOWMAN"
      Body: "You declined, requested a counter-quote, saved $4,200, and signed
             a contract with every specification in writing."

EMAIL REPORT:
  Margin-top: 40px, text-center
  Heading: Inter 16px font-weight 600 color #0F1419: "Send a copy to your email."
  Input row: email input + "Email My Report →" button (gold, padding 0 20px)
  Privacy: Inter 11px #94A3B8 margin-top 8px: "Your report is never shared. Unsubscribe any time."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW B STATE — PRE-SCAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Renders when flowMode === 'B' && flowBLeadCaptured === true

Vault heading: "[firstName]\'s Impact Window Research Hub"
Completion status: Inter 14px color #F59E0B: "Your analysis vault is 60% complete."
Sub: "Upload your quote when you have it to unlock your full grade report."

Items:
  1 (checked): "✓ Fair-Market Baseline — [county] County · $12,400–$14,800 · View →"
  2 (conditional): "✓ Forensic Checklist — [X]/5 questions reviewed · Continue →"
  3 (conditional if set): "✓ Quote Reminder — [date] at [time + 15min] · Modify →"
  4 (pending gold): "○ Quote Analysis — Not yet uploaded · [Upload When Ready →]"
  5 (pending): "○ Contractor Match — Pending quote upload · —"
```

---

# ════════════════════════════════════════════════════════
# C-17: STICKY RECOVERY BAR
# <StickyRecoveryBar />
# Flow-Aware Recovery
# ════════════════════════════════════════════════════════

```
Build a React component called <StickyRecoveryBar />.

PROPS: stepsCompleted, flowMode, county, leadCaptured, flowBLeadCaptured,
       quoteWatcherSet, appointmentDate, isVisible, onCTAClick, onDismiss

SHOW WHEN (all true):
  leadCaptured === false AND flowBLeadCaptured === false
  User scrolled past 70% of total page height
  User has been on page > 30 seconds
  'wm_recovery_bar_dismissed' not in localStorage

HIDE WHEN:
  leadCaptured === true OR flowBLeadCaptured === true AND quoteWatcherSet === true
  User dismissed (×)

POSITION: fixed, bottom 0, left 0, right 0, z-index 8000
Background: white, border-top: 2px solid #F59E0B
Box-shadow: 0 -4px 24px rgba(15,20,25,0.14)
Padding: 14px 20px mobile, 16px 32px desktop

ENTRY: y 80→0, opacity 0→1, spring stiffness 300 damping 30

INNER: max-w-4xl mx-auto flex justify-between align-items center gap-16 flex-wrap

LEFT — STATUS SIGNAL:
  4 circles (10px each, #F59E0B if completed, #E2E8F0 if not) + status copy

  FLOW A status copy:
  stepsCompleted 0: "Your scan is ready to configure." / sub: "Takes 60 seconds. Free."
  stepsCompleted 1: "You answered 1 of 4 questions." / sub: "Takes less than a minute to finish."
  stepsCompleted 2: "You\'re halfway through your scan." / sub: "Takes less than a minute to finish."
  stepsCompleted 3: "One question left before your grade." / sub: "Your analysis is waiting."
  stepsCompleted 4: "Your scan is configured — enter your details." / sub: "Your analysis is waiting."

  FLOW B status:
  baseline not captured: "Your baseline is being configured." / CTA → scroll to #market-baseline
  baseline captured, no watcher: "Set your quote reminder to complete your setup."
  appointment within 24h: "Your contractor visit is tomorrow. Your baseline is ready."

URGENCY STATE (3+ min on page, step > 0, no lead):
  Border-top color changes to #EF4444
  Status: "Your configured scan expires in 24 hours."

CENTER — MINI PROGRESS BAR (desktop only):
  160px width, 4px height, #F59E0B fill, animated width

RIGHT — CTA + CLOSE:
  CTA:
  stepsCompleted 0: "Start My Scan →"
  stepsCompleted 1–3: "Continue My Scan →"
  stepsCompleted 4: "Unlock My Grade →"
  Flow B no baseline: "Continue to Baseline →"
  Flow B no watcher: "Set My Reminder →"
  Flow B appointment within 24h: "Review Your Checklist →"

  Button: background #F59E0B, color white, Inter 14px bold, padding 10px 22px, border-radius 8px
  On click: onCTAClick(), track({ event: 'wm_recovery_bar_clicked', stepsCompleted, flowMode })

  Close × button: 28px circle, on click: onDismiss(), localStorage.setItem('wm_recovery_bar_dismissed', 'true')
  track({ event: 'wm_recovery_bar_dismissed', stepsCompleted })
```

---

# ════════════════════════════════════════════════════════
# C-18: EXIT INTENT MODAL
# <ExitIntentModal />
# 4 Variants
# ════════════════════════════════════════════════════════

```
Build a React component called <ExitIntentModal />.

TRIGGER: mouseleave event where clientY < 20 (desktop)
         visibilitychange where hidden (mobile tab switch)
SHOW ONCE per session: sessionStorage key 'wm_exit_shown'
Only show when leadCaptured === false && NOT already shown

BACKDROP: fixed inset-0 z-9500, rgba(10,20,35,0.75), backdrop-filter blur(4px)
CARD: fixed top-50% left-50% transform -50%/-50%
  Width 92% mobile, 520px desktop, max-width 520px
  Background white, border-radius 20px, padding 36px 32px
  Box-shadow 0 24px 80px rgba(10,20,35,0.35)
  Entry: scale 0.9→1, opacity 0→1, duration 0.3s easeOut

CLOSE ×: absolute top-right, 32px circle, background #F3F4F6
On click: close modal, track({ event: 'wm_exit_modal_dismissed' })

━━━━ VARIANT A (stepsCompleted === 0) ━━━━
Icon: large "?" centered, 40px, color #F59E0B
Heading: Poppins 26px: "Before you go — one question."
Body: Inter 16px text-center:
"The average impact window quote in Florida is $4,800 above fair market.
 It takes 60 seconds to find out if yours is one of them."
CTA: gold button full-width: "Check My Quote — It\'s Free"
Leave link: Inter 12px #94A3B8 text-center: "or leave without checking — your choice."

━━━━ VARIANT B (stepsCompleted 1-3) ━━━━
Progress display (top): background #FFFBEB, border-radius 10px, padding 14px 18px
  Left: label + circles + "[n] of 4 questions answered"
  Right: percentage (25% / 50% / 75%)

Heading: "You\'re [%]% of the way to your grade."
Summary: background #FAFBFC, border-radius 8px, padding 16px 18px
  Label: "WHAT YOU\'VE CONFIGURED"
  Answered: "✓ [answer]" (green, Inter 13px)
  Unanswered: "○ [field] — not yet answered" (gray italic)

Body: "Everything you\'ve entered is still here. [n] more answer[s] and we can run your grade."
CTA: "Continue My Scan →" / "I\'m 50% There — Finish →" / "One Question Left →"
Leave: "or leave without your results — your choice."

━━━━ VARIANT C (stepsCompleted === 4, all questions done) ━━━━
Grade circle: 72px dashed border #F59E0B, "?" Playfair 36px #F59E0B, subtle spin animation
Heading: "Your grade is configured. It just needs your email."
Body: "You\'ve answered all 4 questions. Your analysis is ready to run. All we need is where to send your grade report."

Inline mini-form:
  Email: full-width input, placeholder "your@email.com"
  Phone: placeholder "(555) 000-0000"
  Submit: full-width background #10B981: "Show Me My Grade →"
Privacy: Inter 11px #94A3B8: "No sales calls. Report sent instantly. Unsubscribe any time."
Leave: "or leave without your results — your choice."

━━━━ VARIANT D (flowMode === 'B', baseline captured, no watcher) ━━━━
Heading: "Your baseline is set. Don\'t let it sit unused."
Body: "You know [county] County fair market is $12,400–$14,800. Set a reminder and we\'ll make sure you use it when the quote arrives."
Date input + time input (mini version of QuoteWatcher form)
Submit: "Set My Reminder →" (gold)
Leave: "or leave without setting a reminder."

AUTONOMY LINE (ALL VARIANTS):
The leave link is always present. BYAF — But You Are Free.
The act of providing an exit makes staying feel chosen, not manipulated.

ANALYTICS:
track({ event: 'wm_exit_intent_triggered', stepsCompleted, flowMode })
track({ event: 'wm_exit_modal_cta_clicked', variant, stepsCompleted })
track({ event: 'wm_exit_modal_dismissed', variant })
```

---

# ════════════════════════════════════════════════════════
# C-19: SHARED REPORT PAGE
# <SharedReportPage />
# Route: /report/:reportId
# ════════════════════════════════════════════════════════

```
Build a React component called <SharedReportPage />.
Route: /report/:reportId
This is a STANDALONE page — no TruthGate, no homepage components.

Uses mockAuditResult for the Lovable build.
Real implementation pulls from Supabase by reportId.

TRACK ON MOUNT: track({ event: 'wm_shared_report_opened', reportId })

PAGE HEADER (report header, NOT site nav):
  Background: #0F1419, padding py-6 px-6 mobile py-8 px-12 desktop
  Inner: max-w-4xl mx-auto flex justify-between align-items center

  Left: Logo (WINDOW/MAN/.PRO) + sub "AI-Powered Impact Window Quote Analysis"
  Right: Report ID pill: "WM-[reportId]-[county]" in JetBrains Mono

CERTIFICATE SECTION:
  Background white, padding py-16 px-6, max-w-4xl mx-auto text-center
  Small horizontal line 60px centered, 1px #E2E8F0, margin-bottom 24px
  Eyebrow: JetBrains Mono 11px #64748B: "WINDOWMAN QUOTE ANALYSIS CERTIFICATE"
  Title: Poppins 36px: "Impact Window Quote Analysis"
  Meta: Inter 15px #64748B: "[county] County, Florida · Generated [date]"
  Divider
  Grade circle (180px, same styling as GradeReveal but labeled "OFFICIAL GRADE")
  Grade label + analysis date badge below circle

FINDINGS SECTION:
  Background #FAFAFA, border-top/bottom 1px solid #E2E8F0, padding py-12 px-6
  Max-w-4xl mx-auto, grid-cols-2 desktop, single col mobile, gap 10

  Left — Pricing Analysis: delta, fair range
  Right — Issues Identified: flag pills (compact, with icons)

WATERMARK FOOTER: logo mark + legal disclaimer + download link (window.print())

VIRAL CTA SECTION (the new-visitor acquisition engine):
  Background: #0F1419, padding py-16 px-6, text-center
  Eyebrow: "GETTING AN IMPACT WINDOW QUOTE?"
  Heading: Poppins 36px white: "Find out if yours is priced fairly."
  Body: "The person who shared this report used WindowMan to check their quote
         before signing. It takes 60 seconds. It\'s free."
  Social proof pill: pulsing green + "4,127 Florida homeowners scanned this month"
  Gold CTA: "Scan My Quote — It\'s Free →" → window.location.href = '/'
  track({ event: 'wm_viral_cta_clicked', source: 'shared_report' })
  Sub: "No account. No contractor contact. 60 seconds."

PRINT STYLES (@media print):
  Hide viral CTA section (display none)
  Hide all buttons
  Print grade circle and flags cleanly
  Add "CONFIDENTIAL — WindowMan.pro" print header
```

---

# ════════════════════════════════════════════════════════
# C-20: ADMIN DASHBOARD
# <AdminDashboard />
# Route: /admin — Priority Call Queue
# ════════════════════════════════════════════════════════

```
Build a React component called <AdminDashboard />.
Route: /admin

PASSWORD GATE: sessionStorage key 'wm_admin_auth'
Password: "windowman2025"
Gate UI: dark card on #0F1419 background, WINDOWMAN.PRO logo, password input, "Access Dashboard →"

SHELL:
  Background: #0F1419
  Font-family: JetBrains Mono (this entire page is mono)
  Header: sticky, background #1A2332, border-bottom 1px solid rgba(0,217,255,0.1)
  Left: "WINDOWMAN · LEAD INTELLIGENCE" (gold + gray)
  Right: ● LIVE + date + LOGOUT →

TABS: [CALL QUEUE] [ALL LEADS] [PIPELINE] [STATS]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAB 1 — CALL QUEUE (default)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title: "PRIORITY CALL QUEUE" in #F59E0B
Sub: "Sorted by conversion urgency. Call these first."

P1 SECTION (CALL IMMEDIATELY):
  Border-left: 3px solid #EF4444, background rgba(239,68,68,0.06)
  Header: "● P1 — CALL IMMEDIATELY · [count] leads"
  Sub: "Flow A grade D/F · Flow B appointment within 48hrs"

  Each P1 lead card (grid-cols-4 desktop):
    Col 1: firstName + JetBrains Mono 10px [type/grade badge]
    Col 2: county + scope + quoteRange
    Col 3: delta (red) or "EARLY STAGE · No quote yet" (gold)
    Col 4: CALL → button + SCRIPT ▼ toggle + time since capture

  SCRIPT DROPDOWN (on SCRIPT ▼ click):
    Background rgba(255,255,255,0.04), border 1px solid rgba(255,255,255,0.08)
    Border-radius 8px, padding 16px, Inter 13px white italic:

    FLOW A D/F SCRIPT:
    "Hi [firstName], I\'m calling from WindowMan about the quote analysis you ran
     for your [projectType] project in [county] County. We found [flagCount]
     issue[s] — the biggest one was [topFlag]. We have a contractor in our
     network who does this exact scope at fair-market pricing. Would it be worth
     a free measurement to get a comparison number?"

    FLOW B SCRIPT:
    "Hi [firstName], this is WindowMan. You generated a fair-market baseline for
     your [county] County project — [windowCount] windows. For homeowners at
     your stage, we can send a contractor for a free measurement before you
     start getting other quotes. That way your first quote is from someone
     we\'ve already vetted. Would you be open to that?"

P2 SECTION (CALL TODAY):
  Border-left: 3px solid #F59E0B, background rgba(245,158,11,0.06)
  Header: "● P2 — CALL TODAY · [count] leads"
  Sub: "Flow A grade C · Flow B general · abandoned post-gate"

  FLOW A C SCRIPT: "Hi [firstName], this is [agent] from WindowMan. You ran your
  quote through our analysis tool. Your quote came back as a grade C — we found
  [flagCount] items worth reviewing, and the price is about $[dollarDelta] above
  the [county] market average. We have a contractor who covers your scope. A free
  measurement would give you a real comparison. Would that be useful?"

P3 SECTION (EMAIL SEQUENCE):
  Border-left: 3px solid #405060, background rgba(255,255,255,0.02)
  Header: "● P3 — EMAIL SEQUENCE · [count] leads"
  Sub: "Flow A grade A/B · Flow B appointment > 48hrs out"
  Each: EMAIL button instead of CALL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAB 2 — ALL LEADS (table)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Filter buttons: ALL / D+F PRIORITY / C — WARM / A+B — SATISFIED / SHADOW / FLOW B
Sort: NEWEST FIRST / HIGHEST DELTA / GRADE / COUNTY

Table columns: LEAD · FLOW · STATUS · GRADE · DELTA · COUNTY · SCOPE · FLAGS · TIME · ACTIONS
Status badges: SHADOW / PARTIAL / CONVERTED / CALLED / CLOSED (color coded)

COMPETITOR PROPOSAL BADGE: when PDF uploaded, show "COMPETITOR PROPOSAL ON FILE" in amber
CALL button: opens tel: link
VIEW button: expands row inline

EXPANDED ROW:
  Panel 1 (Contact): email, phone, "Copy phone" link
  Panel 2 (Their Answers): each answer labeled + CALL OPENER script
    "Hi [firstName], I\'m calling from WindowMan about the [projectType] project
     in [county] County. We found [flagCount] issue[s] — the biggest was [topFlag].
     We have a contractor ready to beat it. Do you have 5 minutes?"
  Panel 3 (Audit Results): grade, delta, flags list, "View shared report →", "Download competitor proposal →"

STATUS UPDATER (after CALL click):
  Dropdown: "Mark as called" / "Scheduled" / "Closed — won" / "Closed — lost"
  On select: update lead status in local state + track event

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAB 3 — PIPELINE (Flow B Kanban)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Horizontal columns, scrollable:
BASELINE CAPTURED → CALLED → CALL ANSWERED → INTRO OFFERED →
MEASUREMENT SCHEDULED → QUOTE UPLOADED → GRADE REVEALED → CLOSED

Each column: header with count + lead cards
Lead card: firstName, county, windowCount, days since capture
QUOTE UPLOADED stage: card highlighted gold, badge "FULL AUDIT READY"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAB 4 — STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4 stat cards:
  "LEADS TODAY": 7 (+2 from yesterday)
  "AVG OVERAGE FOUND": $4,900 (vs. fair market)
  "GRADE MIX": horizontal bar (A+B green / C orange / D+F red)
  "GATE CONVERSION": 58% (lead gate → verified phone)

Additional:
  "FLOW A CONVERSION": [converted / total Flow A] %
  "FLOW B → FLOW A RATE": [% who eventually upload quote]
  "AVG TIME TO P1 CALL": [avg minutes from capture to first call]
  "EST. REVENUE PIPELINE": [closed × avg sale × 0.07]

MOCK LEAD DATA: Use the 7 mockLeads defined in C-17 section of Phase 4 doc.
```

---

# ════════════════════════════════════════════════════════
# ROUTING UPDATE
# Final App.jsx wiring
# ════════════════════════════════════════════════════════

```
Final wiring for the complete WindowMan.pro build.

In main.jsx (or index.jsx):
  import { BrowserRouter } from 'react-router-dom'
  Wrap App in <BrowserRouter>

In HomePage.jsx render order:
  <LinearHeader />
  {flowMode === 'A' && <AuditHero onFlowAClick=... onFlowBClick=... />}
  <InteractiveDemoScan />
  <SocialProofStrip />

  {flowMode === 'A' && (
    <TruthGateFlow
      onFlowALeadCaptured=...
      onFlowBSelected={() => { setFlowMode('B'); scrollToFlowB() }}
      onFlowCSelected={(stage) => { setFlowMode('C'); setFlowCStage(stage) }}
      onStepComplete={(n) => setStepsCompleted(n)}
      answers={answers}
      setAnswers={setAnswers}
    />
  )}
  {flowMode === 'B' && <FlowBEntry onContinueToTool=... onSwitchToFlowA=... />}
  {flowMode === 'B' && <MarketBaselineTool onLeadCaptured=... onSwitchToFlowA=... />}
  {flowMode === 'B' && flowBLeadCaptured && <ForensicChecklist ... />}
  {flowMode === 'B' && flowBLeadCaptured && <QuoteWatcher ... />}
  {flowMode === 'C' && <FlowCEntry quoteStage={flowCStage} onSwitchToFlowA=... />}
  {flowMode === 'C' && <MarketBaselineTool ... />}  {/* Flow C shares the baseline tool */}

  <IndustryTruth />
  <MarketMakerManifesto />
  <WhyWindowManGetsBetterPrices />
  <ProcessSteps />
  <NarrativeProof />
  <ClosingManifesto />

  {gradeRevealed && <GradeReveal auditResult={mockAuditResult} />}
  {contractorMatchVisible && <ContractorMatch auditResult={mockAuditResult} />}
  {(gradeRevealed || flowBLeadCaptured) && (
    <EvidenceLocker flowMode={flowMode} auditResult={mockAuditResult} flowBAnswers={flowBAnswers} />
  )}

  <StickyRecoveryBar
    stepsCompleted={stepsCompleted}
    flowMode={flowMode}
    county={answers.county || flowBAnswers.county}
    leadCaptured={leadCaptured}
    flowBLeadCaptured={flowBLeadCaptured}
    quoteWatcherSet={quoteWatcherSet}
    isVisible={!leadCaptured}
    onCTAClick={() => { /* scroll to appropriate section */ }}
    onDismiss={() => { /* set dismissed state */ }}
  />

  <ExitIntentModal
    stepsCompleted={stepsCompleted}
    flowMode={flowMode}
    answers={answers}
    county={answers.county || flowBAnswers.county}
    isVisible={exitIntentTriggered}
    onClose={() => setExitIntentTriggered(false)}
    onCTAClick={() => { setExitIntentTriggered(false); /* scroll to truth gate */ }}
  />

EXIT INTENT LISTENER (useEffect in HomePage):
  const handleMouseLeave = (e) => {
    if (e.clientY < 20 && !leadCaptured && !exitIntentShown) {
      setExitIntentTriggered(true)
      setExitIntentShown(true)
      sessionStorage.setItem('wm_exit_shown', 'true')
      track({ event: 'wm_exit_intent_triggered', stepsCompleted, flowMode })
    }
  }
  const alreadyShown = sessionStorage.getItem('wm_exit_shown')
  if (!alreadyShown && !leadCaptured) {
    document.addEventListener('mouseleave', handleMouseLeave)
  }
  return () => document.removeEventListener('mouseleave', handleMouseLeave)

FINAL QUALITY CHECKLIST:
[ ] "Don't sign a window contract you haven't checked." renders as H1
[ ] InteractiveDemoScan second flag shows CATEGORY but not DETAIL (not blurred — masked with blocks)
[ ] Step 4 has 4 options in single-column layout with badges (SCAN READY / HIGH LEVERAGE / ACT NOW / WE'LL ARM YOU)
[ ] Micro-Verdict appears as its own state between Step 3 and Step 4
[ ] Micro-Verdict contains: county-specific range, 71% frequency stat, implication line
[ ] Diagnostic progression labels update above step counter each step
[ ] Flow B uses EMERALD (#10B981 / --color-emerald) as primary action color — not amber
[ ] Flow C uses AMBER (#F59E0B / --color-amber) as primary action color
[ ] ContractorMatch has ONE card, not three
[ ] Commission disclosure appears below contractor CTA
[ ] MarketMakerManifesto appears BETWEEN IndustryTruth and ProcessSteps
[ ] WhyWindowManGetsBetterPrices appears after MarketMakerManifesto
[ ] StickyRecoveryBar handles all 3 flow states
[ ] ExitIntentModal has 4 variants and fires max once per session
[ ] /report/:reportId route renders SharedReportPage in isolation
[ ] /admin route requires password gate (sessionStorage auth)
[ ] Admin default tab is CALL QUEUE (not all leads table)
[ ] Admin P1 cards show personalized SCRIPT ▼ dropdown with correct script per flow
[ ] Admin pipeline has 8 kanban stages
[ ] Returning Flow B user sees recognition banner on #truth-gate
[ ] All track() events fire at correct moments
// ── TOKEN + UTILITY CHECKS (new design system) ────────────────────────────
[ ] Amber #F59E0B (--color-amber) appears ONE time per viewport as CTA — never decorative
[ ] Emerald #10B981 (--color-emerald) appears max TWO times total as submit buttons
[ ] Cyan #00D9FF (--color-cyan) used ONLY for data, AI output, Flow B accents
[ ] Danger #EF4444 (--color-danger) used ONLY for red flags and urgent states
[ ] Warning amber #D97706 used ONLY for amber flags — never as CTA
[ ] .glass-card class (from globals.css) used on all white card containers
[ ] .animate-scan-line (from globals.css) used in C-03 scan overlay
[ ] .animate-shimmer (from globals.css) used in C-03 progress bar during scan
[ ] .animate-breathe (from globals.css) used on social proof pulse dot C-01
[ ] .animate-fade-in-up (from globals.css) used on flag card reveals in C-14
[ ] Poppins headings ≥ 36px use font-weight: 800 (geometric sans needs extra weight)
[ ] All display headline line-height: 1.15 (Poppins needs 3% more room than old serif)
[ ] Manifesto + testimonial italic lines: font-weight: 300 + font-style: italic
```

---

> **COMPLETE BUILD REFERENCE**
>
> Components: GLOBAL + C-01 through C-20 + ROUTING UPDATE
> Flows: A (written quote) · B (no quote) · C (verbal/appointment)
> Pages: / (homepage) · /report/:reportId · /admin
> Recovery: StickyRecoveryBar · ExitIntentModal
> Distribution: SharedReportPage viral loop
> Operations: AdminDashboard call queue + pipeline
>
> The first contractor paid for the discovery.
> WindowMan makes sure you benefit from it.


---

# ════════════════════════════════════════════════════════
# DESIGN TOKEN CHANGE AUDIT
# Complete diff of every changed value · C-01 → C-20
# ════════════════════════════════════════════════════════

## COLOR MAPPING: OLD → NEW

| Token           | Old         | New         | CSS Variable               |
|-----------------|-------------|-------------|----------------------------|
| navy            | `#0F1F35`   | `#0F1419`   | `--color-navy`             |
| gold / CTA      | `#C8952A`   | `#F59E0B`   | `--color-amber`            |
| cyan            | `#0099BB`   | `#00D9FF`   | `--color-cyan`             |
| emerald         | `#059669`   | `#10B981`   | `--color-emerald`          |
| crimson         | `#DC2626`   | `#EF4444`   | `--color-danger`           |
| amber (warning) | `#D97706`   | `#D97706`   | *(unchanged — darker shade preserves CTA vs warning hierarchy)* |
| slate / body    | `#374151`   | `#0F172A`   | `--foreground`             |
| gray            | `#6B7280`   | `#64748B`   | `--muted-foreground`       |
| lightGray       | `#9CA3AF`   | `#94A3B8`   | Tailwind slate-400         |
| offWhite        | `#F9FAFB`   | `#FAFBFC`   | `--background`             |
| border          | `#E5E7EB`   | `#E2E8F0`   | `--border`                 |
| navyDeep        | `#060E18`   | `#0F1419`   | `--color-navy`             |
| navyMid         | `#0A1628`   | `#1A2332`   | `--color-navy-light`       |
| goldLight bg    | `#FDF3E3`   | `#FFFBEB`   | amber-50 equivalent        |
| cyanLight bg    | `#E8F7FB`   | `#E0F8FF`   | cyan-50 equivalent         |
| greenLight bg   | `#ECFDF5`   | `#D1FAE5`   | emerald-100 equivalent     |

**New colors added from your globals.css (not in old system):**
| `--color-navy-light`   | `#1A2332` | navyMid / dark card bg on dark sections   |
| `--color-navy-lighter` | `#243044` | tertiary dark level                        |
| `--primary`            | `#0891B2` | teal — links, supporting UI, info states  |
| `--color-royal`        | `#0066CC` | secondary actions, trust badges            |

---

## FONT MAPPING: OLD → NEW

| Role    | Old Font                     | New Font                |
|---------|------------------------------|-------------------------|
| Display | Playfair Display (serif)     | Poppins (geometric sans)|
| Body    | DM Sans                      | Inter                   |
| Mono    | DM Mono                      | JetBrains Mono          |

**What this shift means aesthetically:**
The old system was editorial/authority (serif headlines, warm bronze gold).
The new system is modern/tech-authority (clean sans-serif, electric amber + cyan).
Both serve the same psychological goal — authority and trust — through different visual registers.

---

## COMPONENT IMPACT NOTES (C-01 → C-20)

### C-01 · LinearHeader
- Logo "WINDOW": Poppins 900 — `letter-spacing: -0.03em` at 22px for clean tight feel
- Social proof pulse dot: replace custom @keyframes with `.animate-breathe` from globals.css

### C-02 · AuditHero
- H1: `font-weight: 800`, `line-height: 1.15` (Poppins needs both vs. old serif)
- Grade preview card: use `.glass-card` instead of manual `bg-white + border + shadow`
- CTA box-shadow: now `rgba(245,158,11,0.35)` — amber gold, slightly more saturated

### C-03 · InteractiveDemoScan
- Heading "See the AI at work.": `font-weight: 800`
- **Replace custom scan animation with `.animate-scan-line` from globals.css**
- **Replace custom shimmer with `.animate-shimmer` from globals.css**
- Scan line `#00D9FF`: noticeably brighter/more electric than old `#0099BB` ✓
- Animation card: use `.glass-card` for the container
- Terminal text: `JetBrains Mono 11px #00D9FF` — slightly wider but more premium look ✓

### C-04 · SocialProofStrip
- Pulse dot: use `.animate-breathe` CSS class (removes custom keyframes)
- Background `#0F1419`: visually imperceptible change from old `#0F1F35`

### C-05 · TruthGateFlow
- Step headings: `font-weight: 800`, `line-height: 1.15`
- Progress bar fill: `#F59E0B` (same role, new hex — slightly more yellow)
- Option hover: `border-color: #F59E0B`, `bg: #FFFBEB`
- Micro-Verdict "71%": `#EF4444` bold — slightly brighter than old red ✓
- Lead Gate submit: `#10B981` (emerald — slightly lighter, same role)
- OTP focus ring: `border-color: #F59E0B`, shadow `rgba(245,158,11,0.12)`

### C-06 · FlowBEntry + MarketBaselineTool
- All emerald references: `#10B981` throughout (slightly lighter, more vibrant green)
- Baseline reveal card: `bg: #E0F8FF`, `border: #00D9FF` — more vivid cyan ✓
- CSS spinner: `border-top-color: #10B981`
- JetBrains Mono baseline price readout: slightly wider, looks more data-precise ✓

### C-07 · FlowCEntry
- Badge: `bg: #FFFBEB`, `border: #F59E0B`
- Primary CTA: `bg: #F59E0B` — more saturated yellow-amber than old bronze gold
- Urgency line: `#EF4444` — brighter red

### C-08 · IndustryTruth
- Block 1 badge border: `rgba(239,68,68,0.2)`
- Dark statement: `bg: #0F1419`

### C-09 · MarketMakerManifesto
- **All `rgba(15,31,53,...)` navy tints → `rgba(15,20,25,...)`** (imperceptible in dark context)
- Closing manifesto italic lines: `font-weight: 300` + `font-style: italic` for Poppins elegance
- NODE 2 center: can add `.glow-cyan-strong` for the cyan glow effect (it's in your globals.css)
- Three-party diagram nodes: slightly updated tint colors from rgba replacements

### C-10 · WhyWindowManGetsBetterPrices
- Number pill "1"/"2": `bg: #FFFBEB`, `border: #F59E0B`
- Closing block: `bg: #0F1419`

### C-11 · ProcessSteps
- Step number circles: `border: #F59E0B`, `color: #F59E0B`
- Deliverable checkmarks: `#10B981`
- Deliverables box: `bg: #FAFBFC`, `border: #E2E8F0`

### C-12 · NarrativeProof
- Story cards: use `.glass-card` for containers
- Grade circle "D": `border: #EF4444`
- Outcome text: `#10B981` (emerald)
- Background: `#FAFBFC`

### C-13 · ClosingManifesto
- Manifesto display lines: Poppins `font-weight: 800`
- **Italic opener**: `font-weight: 300` + `font-style: italic`
- Final CTA: `bg: #F59E0B`, `box-shadow: rgba(245,158,11,0.4)`

### C-14 · GradeReveal
- Scan theatrics log: `JetBrains Mono 13px #00D9FF` — more technical/premium feel ✓
- Grade circle glow (Grade B): use `.glow-cyan` utility class
- Dollar delta: `#EF4444` — slightly warmer/brighter red
- Script copy button: `rgba(245,158,11,0.15)` bg, `rgba(245,158,11,0.3)` border
- Bridge line: `bg: #E0F8FF`, `border: rgba(0,217,255,0.3)`, text `#00D9FF`
- Flag cascade reveals: use `.animate-fade-in-up` from globals.css

### C-15 · ContractorMatch
- Section background: `#0F1419`
- Card border: `rgba(245,158,11,0.4)`
- Avatar "WM": `JetBrains Mono 20px #F59E0B`
- Contractor badges: `rgba(16,185,129,...)` tints throughout
- CTA button: `#F59E0B`
- Success circle: `#10B981`

### C-16 · EvidenceLocker
- "View →" links: `#00D9FF` (was `#0099BB`) — more vivid ✓
- "Add →" button: `#F59E0B`
- Before card: `bg: #FEF2F2`, `label: #EF4444`
- After card: `bg: #D1FAE5`, `label: #10B981`
- Vault rows divider: `#E2E8F0`

### C-17 · StickyRecoveryBar
- Border-top: `#F59E0B`
- Box-shadow: `rgba(15,20,25,0.14)`
- Progress circles: `#F59E0B` filled, `#E2E8F0` empty
- Urgency border: `#EF4444`
- CTA: `bg: #F59E0B`

### C-18 · ExitIntentModal
- Variant A "?" icon: `#F59E0B`
- Variant B progress bg: `#FFFBEB`
- Variant C grade circle: `#F59E0B` dashed border
- Variant C submit: `bg: #10B981`

### C-19 · SharedReportPage
- Page header: `bg: #0F1419`
- Certificate title: Poppins `font-weight: 800`
- Report ID: `JetBrains Mono` — looks more official/technical ✓
- Viral CTA headline: Poppins `font-weight: 800`
- CTA button: `#F59E0B`

### C-20 · AdminDashboard
- Gate background: `#0F1419` (was `#060E18` — slightly lighter, still very dark)
- **Entire page uses `JetBrains Mono`** — looks sharper/more data-terminal ✓
- Header: `bg: #1A2332`
- P1 border: `#EF4444`, bg `rgba(239,68,68,0.06)`
- P2 border: `#F59E0B`, bg `rgba(245,158,11,0.06)`
- Queue title: `#F59E0B`

---

## VISUAL IMPACT SUMMARY

**Imperceptible changes (< 5% visual delta):**
- Navy `#0F1F35` → `#0F1419` · offWhite `#F9FAFB` → `#FAFBFC` · border `#E5E7EB` → `#E2E8F0`

**Noticeable in direct comparison:**
- Emerald `#059669` → `#10B981`: lighter, more vivid green
- Crimson `#DC2626` → `#EF4444`: brighter red
- Gray `#6B7280` → `#64748B`: slightly more blue-gray

**High visual impact — user notices immediately:**
- **Gold `#C8952A` → `#F59E0B`**: CTAs shift from warm bronze to bright yellow-amber.
  More saturated and eye-catching. Worth A/B testing engagement rate.
- **Cyan `#0099BB` → `#00D9FF`**: AI data readouts go from teal to electric cyan.
  The glow-cyan utility effects will be very prominent. This is the biggest
  single aesthetic shift — the "tech intelligence" feeling increases substantially.
- **Fonts**: Entire site shifts from editorial/serif authority to modern/tech authority.
  Poppins at 800 weight + Inter body + JetBrains Mono data labels = premium SaaS feel
  vs. the old editorial newspaper feel. Both serve the trust goal.
