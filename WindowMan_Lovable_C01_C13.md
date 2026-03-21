# WINDOWMAN FORENSIC NOIR — COMPLETE LOVABLE BUILD SEQUENCE
## C-01 through C-13 · Copy-Locked · Token-Referenced
## Feed one prompt at a time. Verify copy before accepting each build.

---

## PRE-FLIGHT CHECKLIST (Run before C-01)

Confirm these are in place before building any component:
- [ ] globals.css `:root` updated with forensic noir tokens (Phase 1 doc)
- [ ] tailwind.config.ts updated with noir palette + border-radius 0px
- [ ] Barlow Condensed + DM Sans + JetBrains Mono loaded in index.html
- [ ] `--btn: #BB2D00` (accessible CTA orange) confirmed
- [ ] `--fo: #F97316` (flag orange decoration) confirmed
- [ ] `--cy: #00D9FF` (cyan truth signal) confirmed

---

## C-01 — LinearHeader (Navigation)

```
Build a new component called LinearHeader.tsx.

This is a sticky navigation bar — it stays fixed at the top of the page on scroll.

BACKGROUND: background-color: var(--noir-bg) which is #0A0A0A
BORDER BOTTOM: 1px solid var(--noir-border-2) which is #2E3A50
HEIGHT: 56px on desktop, 52px on mobile
PADDING: 0 24px desktop, 0 16px mobile
Z-INDEX: 100

LAYOUT: flex row, space-between, vertically centered.

LEFT SIDE — Logo mark:
- A 28×28px square div, background var(--sys-cobalt) #1D4ED8, border-radius 0px
- Inside: text "WM" in font-family Barlow Condensed, font-weight 900, font-size 14px, color #FFFFFF, text-transform uppercase, centered
- Immediately right of the square: brand name text
  - "WINDOW" in Barlow Condensed 900, font-size 18px, color #FFFFFF, text-transform uppercase
  - "MAN" in Barlow Condensed 900, font-size 18px, color #F97316 (flag orange), text-transform uppercase
  - ".PRO" in Barlow Condensed 900, font-size 16px, color var(--t4) #7D9DBB, text-transform uppercase
  - No spaces between WINDOW, MAN, .PRO — they read as one continuous word
  - Gap between WM square and the text: 10px

RIGHT SIDE:
- "SIGN IN" ghost button: font-family DM Sans, font-weight 600, font-size 12px, color var(--t3) #A0B8D8, background transparent, border 1px solid var(--noir-border-2) #2E3A50, padding 7px 14px, border-radius 0px, no hover background (border-color changes to var(--sys-cobalt) #1D4ED8 on hover)
- Gap 10px
- "SCAN MY QUOTE" primary button: font-family DM Sans, font-weight 700, font-size 12px, color #FFFFFF, background var(--btn) #BB2D00, border none, padding 8px 16px, border-radius 2px. Exact text: "SCAN MY QUOTE"
- On hover: background #9B2400, transform translateY(-1px), transition 0.12s ease

MOBILE (under 768px):
- Hide "SIGN IN" button
- Keep logo + "SCAN MY QUOTE" button
- Button font-size 11px, padding 7px 12px

NO OTHER NAV LINKS. No hamburger menu. No About, FAQ, Services links. Zero.

The header never collapses or changes its content on scroll.
```

---

## C-02 — AuditHero (Section 1 — The Interrogation Room)

```
Build a new component called AuditHero.tsx.

This is the hero section. Full viewport height on desktop, min-height 85vh on mobile.

BACKGROUND LAYERS (stack in order, all using CSS, no images):
1. Base color: background #0A0A0A
2. Scanline texture: CSS repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.006) 2px, rgba(255,255,255,0.006) 4px) — applied as a pseudo-element ::before covering the full section, pointer-events none, z-index 1
3. Cobalt radial depth: radial-gradient(ellipse 100% 70% at 65% 50%, rgba(29,78,216,0.10) 0%, transparent 65%) — applied as a pseudo-element ::after, pointer-events none, z-index 1
4. Vignette: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%) — as a third pseudo-element or inline div covering the section, pointer-events none, z-index 1

LAYOUT: Two columns on desktop (content left ~55%, mascot zone right ~45%). Single column on mobile (content stacked, mascot hidden).

Content z-index: 2 (above all pseudo-elements)

--- LEFT CONTENT COLUMN ---

EYEBROW LINE:
- font-family JetBrains Mono, font-size 10px, font-weight 500, letter-spacing 0.16em, text-transform uppercase, color #00D9FF
- display flex, align-items center, gap 10px
- Preceded by a 20px × 1px horizontal line in color #00D9FF
- EXACT TEXT: "FLORIDA'S FORENSIC QUOTE ENGINE"
- margin-bottom 16px

HEADLINE — 4 lines, Barlow Condensed 900, text-transform uppercase, line-height 0.95, letter-spacing -0.01em:
- Line 1: "YOUR QUOTE" — color #FFFFFF — font-size clamp(32px, 5.5vw, 52px)
- Line 2: "LOOKS LEGITIMATE." — color #FFFFFF — font-size clamp(32px, 5.5vw, 52px)
- Line 3: "THAT'S EXACTLY WHAT" — color #A0B8D8 (var --t3) — font-size clamp(24px, 4vw, 40px)
- Line 4: "THEY'RE COUNTING ON." — color #F97316 (flag orange) — font-size clamp(24px, 4vw, 40px)
- Margin between line 2 and line 3: 6px
- Total headline margin-bottom: 20px

DO NOT PUT THESE FOUR LINES IN A SINGLE STRING. They are separate div or span elements so colors can differ.

SUBHEADLINE:
- font-family DM Sans, font-size 15px, font-weight 400, color #A0B8D8, line-height 1.7, max-width 440px
- EXACT TEXT: "Upload any impact window quote and our AI scans it for hidden fees, missing protections, and overpriced scope — before you commit to anything."
- margin-bottom 24px

CTA ROW — display flex, align-items center, gap 16px, flex-wrap wrap:
- PRIMARY BUTTON: font-family DM Sans, font-weight 700, font-size 15px, color #FFFFFF, background #BB2D00, border none, padding 14px 30px, border-radius 2px, letter-spacing 0.01em
  - EXACT TEXT: "SCAN MY QUOTE — IT'S FREE  →"
  - hover: background #9B2400, transform translateY(-1px), transition 0.12s ease
  - box-shadow: 0 4px 20px rgba(187,45,0,0.35)
- TRUST MICRO-COPY: font-family DM Sans, font-size 12px, color #7D9DBB (var --t4)
  - EXACT TEXT: "No account required. Results in 60 seconds."
  - This is plain text, NOT a button. Sits immediately right of the CTA button.

FLOW B MICRO-LINK (below CTA row, margin-top 14px):
- font-family DM Sans, font-size 13px, color #1D4ED8 (var --sys-cobalt), cursor pointer, text-decoration none
- EXACT TEXT: "Getting quotes soon? We can arm you first →"
- On hover: color #3B82F6

--- RIGHT COLUMN — MASCOT ZONE ---

On desktop: position absolute or flex column, right edge of hero section, bottom-aligned.
The mascot zone is a placeholder for the WM superhero image (windowman_a1.png if available, otherwise a styled placeholder).

If the image is available:
- Display the WM mascot image, height ~70% of hero height, object-fit contain, object-position bottom center
- The image should appear to "stand in" the window frame — use the actual image

If no image:
- A div: width 220px, height 340px, background rgba(29,78,216,0.08), border 1px dashed rgba(0,217,255,0.30), display flex, align-items center, justify-content center
- Inside: text "WM MASCOT" in JetBrains Mono 11px color #7D9DBB

On mobile (under 768px): hide the mascot zone entirely.

ENTRY ANIMATION on page load (one-time only):
- The entire left content column: opacity 0 → 1, translateY 16px → 0, duration 0.5s ease, starts on mount
- Stagger each element: eyebrow 0s delay, headline 0.1s, subheadline 0.2s, CTA 0.3s
- If mascot image present: translateX 8px → 0 with 0.3s delay
```

---

## C-03 — DynamicUrgencyStats (Section 2 — Proof Strip)

```
Build a new component called DynamicUrgencyStats.tsx.

This is a stats strip placed directly below the hero section and above the evidence section.

BACKGROUND: #111418 (var --noir-surface)
BORDER TOP: 1px solid #2E3A50
BORDER BOTTOM: 1px solid #2E3A50
PADDING: 0

LAYOUT: Three equal columns, separated by 1px solid #1C1C1C dividers. No gap — columns touch each other with the divider between them. Full width.

SEED DATA (hardcoded initial values — do not use round numbers):
- Column 1: number 4218, label "FL SCANS COMPLETED"
- Column 2: number "$4,800", label "AVG OVERPAYMENT FOUND"
- Column 3: number "73%", label "OF QUOTES FLAGGED"

Each column: padding 16px 20px

NUMBER STYLING:
- Column 1 number: font-family Barlow Condensed, font-weight 800, font-size 28px, text-transform uppercase, color #00D9FF (cyan)
- Column 2 number: font-family Barlow Condensed, font-weight 800, font-size 28px, color #F59E0B (amber)
- Column 3 number: font-family Barlow Condensed, font-weight 800, font-size 28px, color #F97316 (flag orange)

LABEL STYLING (below each number):
- font-family JetBrains Mono, font-size 9px, font-weight 500, letter-spacing 0.12em, text-transform uppercase, color #7D9DBB, margin-top 4px

LIVE SIMULATION:
- Every 37 seconds (not 30, not 60 — must be 37), there is a 12% chance an event fires
- When an event fires: column 1 number increments by 1 with a flash animation
- Flash animation: background of that cell briefly becomes rgba(0,217,255,0.12) for 600ms then returns to transparent
- The number animates with a brief scale(1.08) for 150ms
- Column 2 number ($4,800) does NOT change — it is a static average

SESSION PERSISTENCE: store the current scan count in sessionStorage with a 4-hour TTL so the number doesn't reset on page refresh within the same session.

MOBILE: stack to 3 rows instead of 3 columns. Each row full width, padding 12px 20px, bordered bottom.

COUNTY PROP: the component accepts an optional `county` prop (string). When provided, prepend the county name to the label: e.g. "BROWARD SCANS TODAY" instead of "FL SCANS COMPLETED". When no prop provided, use "FL SCANS COMPLETED".
```

---

## C-04 — IndustryTruth (Section 3 — The Evidence Room)

```
Build a new component called IndustryTruth.tsx.

BACKGROUND: #0A0A0A (var --noir-bg)
PADDING: 80px 24px desktop, 48px 16px mobile

SECTION HEADER (above the 3 cards):
No "What We Do" title. Instead, a section eyebrow only:
- font-family JetBrains Mono, font-size 9px, letter-spacing 0.14em, uppercase, color #A0B8D8
- EXACT TEXT: "DOCUMENTED · VERIFIED · REPRODUCIBLE"
- margin-bottom 48px, display flex, align-items center, gap 12px
- Preceded by a 24px × 1px line in color #2E3A50

THREE FINDING CARDS — stacked vertically, gap 2px between them (the gap IS the divider, no border between):

--- FINDING CARD 01 ---
Background: rgba(220,38,38,0.04)
Border: 1px solid rgba(220,38,38,0.20)
Border-left: 2px solid #DC2626
Border-radius: 0px
Padding: 28px 24px

Top row (flex, space-between):
- Left pill: background rgba(220,38,38,0.14), color #F87171, border 1px solid rgba(220,38,38,0.30), font-family JetBrains Mono, font-size 9px, letter-spacing 0.1em, border-radius 2px, padding 3px 8px
  - EXACT TEXT: "FINDING 01 — PRICING"
- Right pill: same style, EXACT TEXT: "CRITICAL"
- margin-bottom: 14px

Headline: font-family Barlow Condensed, font-weight 900, font-size 28px, text-transform uppercase, color #FFFFFF, margin-bottom 10px
EXACT TEXT: "THE DELTA."

Body: font-family DM Sans, font-size 14px, color #A0B8D8, line-height 1.7, max-width 620px
EXACT TEXT: "The average gap between what Florida contractors quote and what the scope actually costs is $4,800. Not because they're criminals. Because the quote is written so you can't verify it. We run the numbers they're hoping you don't."

The "$4,800" inside the body text must be color #F59E0B (amber) — use a <span> to apply the color.

--- FINDING CARD 02 ---
Background: rgba(249,115,22,0.04)
Border: 1px solid rgba(249,115,22,0.20)
Border-left: 2px solid #F97316
Border-radius: 0px
Padding: 28px 24px

Top row pills:
- Left pill: background rgba(249,115,22,0.15), color #F97316, border 1px solid rgba(249,115,22,0.35), font-family JetBrains Mono, font-size 9px, border-radius 2px, padding 3px 8px
  - EXACT TEXT: "FINDING 02 — SPEC FRAUD"
- Right pill: same style, EXACT TEXT: "HIGH RISK"
- margin-bottom: 14px

Headline: font-family Barlow Condensed, font-weight 900, font-size 28px, text-transform uppercase, color #FFFFFF, margin-bottom 10px
EXACT TEXT: "BRAND AMBIGUITY."

Body: font-family DM Sans, font-size 14px, color #A0B8D8, line-height 1.7, max-width 620px
EXACT TEXT: "71% of Florida impact window contracts don't name the brand being installed. That means your contractor can swap it after you sign. We check every brand claim against the Florida product registry."

The "71%" must be color #FFFFFF, font-weight 600 — use a <span>.

--- FINDING CARD 03 ---
Background: rgba(245,158,11,0.04)
Border: 1px solid rgba(245,158,11,0.20)
Border-left: 2px solid #F59E0B
Border-radius: 0px
Padding: 28px 24px

Top row pills:
- Left pill: background rgba(245,158,11,0.14), color #F59E0B, border 1px solid rgba(245,158,11,0.30), font-family JetBrains Mono, font-size 9px, border-radius 2px, padding 3px 8px
  - EXACT TEXT: "FINDING 03 — COMPLIANCE"
- Right pill: same style, EXACT TEXT: "LEVERAGE"
- margin-bottom: 14px

Headline: Barlow Condensed 900, 28px uppercase, color #FFFFFF, margin-bottom 10px
EXACT TEXT: "NOA COMPLIANCE."

Body: DM Sans 14px, color #A0B8D8, line-height 1.7, max-width 620px
EXACT TEXT: "A Notice of Acceptance is the state's certification that a window system meets Florida's hurricane standards. Every legitimate impact window has one. We verify it. If your quote doesn't reference it, we flag it."

SCROLL ENTRANCE ANIMATION:
Each card animates in when it enters the viewport using IntersectionObserver:
- opacity 0 → 1, translateY 12px → 0, duration 0.3s ease
- Card 01: no delay, Card 02: 0.1s delay, Card 03: 0.2s delay
```

---

## C-05 — TruthGateFlow (Section 4 — The Truth Gate)

```
Build a new component called TruthGateFlow.tsx.

This is a multi-step form with 4 steps. It is the core conversion mechanism of the product.
One step is shown at a time. Steps do not animate with springs — all transitions are 0.12s ease.

OUTER CONTAINER:
Background: #161C28 (var --noir-elevated)
Border: 1px solid #2E3A50
Border-radius: 0px
Padding: 32px 28px desktop, 24px 16px mobile
Max-width: 640px, centered

--- PROGRESS HEADER (above step content, always visible) ---

Top line: display flex, space-between, margin-bottom 8px
- Left: font-family JetBrains Mono, font-size 9px, color #00D9FF, letter-spacing 0.12em, uppercase
  - EXACT TEXT per step: Step 1 = "BUILDING YOUR PROJECT PROFILE", Step 2 = "CALIBRATING SCOPE PARAMETERS", Step 3 = "LOADING COUNTY BENCHMARKS", Step 4 = "IDENTIFYING QUOTE STAGE"
- Right: font-family JetBrains Mono, font-size 9px, color #7D9DBB
  - EXACT TEXT per step: "STEP 1 OF 4", "STEP 2 OF 4", "STEP 3 OF 4", "STEP 4 OF 4"

Progress bar:
- Height 2px, background #2E3A50, border-radius 0px
- Fill: linear-gradient(90deg, #1D4ED8, #00D9FF)
- Width per step: 25%, 50%, 75%, 100%
- Transition: width 0.20s ease
- When danger flags have been found (after Step 3 county match): fill changes to linear-gradient(90deg, #1D4ED8, #F97316)

Margin below progress: 24px

--- STEP 1 ---

Question: font-family Barlow Condensed, font-weight 800, font-size 22px, text-transform uppercase, color #FFFFFF, margin-bottom 8px
EXACT TEXT: "How many windows are in your project?"

Micro-copy: font-family JetBrains Mono, font-size 10px, color #7D9DBB, margin-bottom 18px
EXACT TEXT: "This helps our AI calculate your per-window cost vs. county average."

Options — 2×2 grid on desktop, 1 column on mobile, gap 6px:
Each option button:
- font-family DM Sans, font-size 14px, font-weight 500, color #C8DEFF, background #161C28, border 1px solid #2E3A50, padding 14px 16px, border-radius 0px, text-align left, display flex, align-items center, gap 12px, width 100%, cursor pointer
- Left: a 6×6px square div, background transparent, border 1px solid #2E3A50, flex-shrink 0
- On hover: border-color #1D4ED8, background rgba(29,78,216,0.08), color #FFFFFF, transition 0.12s ease
- On selected: border-color #00D9FF, background rgba(0,217,255,0.07), color #00D9FF. The 6px square becomes: background #00D9FF, border-color #00D9FF

EXACT OPTION TEXT (in this order):
- "1–5 windows"
- "6–10 windows"
- "11–20 windows"
- "20+ windows"

On option select: move to Step 2 after 200ms delay (gives user a moment to see the selection confirmed).

--- STEP 2 ---

Question: Barlow Condensed 800, 22px, uppercase, color #FFFFFF
EXACT TEXT: "What type of project?"

Micro-copy: JetBrains Mono 10px, color #7D9DBB
EXACT TEXT: "Different scopes have different fair-price benchmarks. Yours matters."

Options — 1 column, gap 6px, same button style as Step 1:
EXACT OPTION TEXT:
- "Full home replacement"
- "Partial replacement"
- "New construction"
- "Addition / Single room"

--- STEP 3 ---

Question: Barlow Condensed 800, 22px, uppercase, color #FFFFFF
EXACT TEXT: "What is your zip code?"

Micro-copy: JetBrains Mono 10px, color #7D9DBB
EXACT TEXT: "We have pricing data for every major Florida market. Your zip unlocks county-level intelligence."

Input field:
- font-family DM Sans, font-size 16px, color #FFFFFF, background #0D1B35, border 1px solid #2E3A50, padding 13px 14px, border-radius 0px, width 200px
- placeholder text: "e.g. 33062" — color #7D9DBB
- On focus: border-color #00D9FF, box-shadow 0 0 0 1px rgba(0,217,255,0.15), transition 0.15s ease
- type="tel" inputmode="numeric" maxLength={5}

County display (appears below input after 3+ digits are typed):
- font-family JetBrains Mono, font-size 10px, color #00D9FF, margin-top 6px, letter-spacing 0.1em
- EXACT FORMAT: "◈ BROWARD COUNTY DATA LOADED" (replace county name dynamically)
- This uses a ZIP_TO_COUNTY lookup (use your existing ZIP_MARKET_DATA)

Continue button appears below input after valid 5-digit ZIP:
- EXACT TEXT: "CONTINUE →"
- font-family DM Sans, font-weight 700, font-size 13px, background #0B60C5, color #FFFFFF, border none, padding 11px 22px, border-radius 2px
- Transition 0.12s ease

--- STEP 4 ---

Question: Barlow Condensed 800, 22px, uppercase, color #FFFFFF
EXACT TEXT: "Your approximate quote total?"

Micro-copy: JetBrains Mono 10px, color #7D9DBB
EXACT TEXT: "This is how we calculate if you're in the overcharge zone."

Options — 1 column, gap 6px, same button style:
EXACT OPTION TEXT:
- "Under $10,000"
- "$10,000 – $20,000"
- "$20,000 – $35,000"
- "$35,000+"

On selection of Step 4 option: show the Micro-Verdict card (C-05b), then after 2 seconds show the Lead Gate (C-06).

STATE MANAGEMENT:
- Store all 4 answers in component state: windowCount, projectType, zipCode, countyName, quoteRange
- These values are passed forward to the Lead Gate component
```

---

## C-05b — MicroVerdictCard (Section 5 — between Step 3 and Step 4)

```
Build a new component called MicroVerdictCard.tsx.

This card appears between Step 3 completion and Step 4 display in TruthGateFlow.
It slides up with opacity 0 → 1, translateY 8px → 0, duration 0.20s ease.

CONTAINER:
Background: rgba(245,158,11,0.05)
Border: 1px solid rgba(245,158,11,0.25)
Border-left: 2px solid #F59E0B
Border-radius: 0px
Padding: 20px 18px
Margin-bottom: 16px

TOP LABEL:
font-family JetBrains Mono, font-size 9px, letter-spacing 0.12em, uppercase, color #F59E0B
EXACT TEXT: "BASED ON YOUR ANSWERS SO FAR"
Margin-bottom: 12px

FINDING LINE:
font-family DM Sans, font-size 15px, font-weight 600, color #FFFFFF, line-height 1.5
EXACT TEXT TEMPLATE: "Homes like yours in [COUNTY] typically see quote gaps of [LOW]–[HIGH]."

Where:
- [COUNTY] is dynamic, wrapped in a span with color #00D9FF
- [LOW] and [HIGH] are dynamic dollar amounts from COUNTY_VERDICT_DATA, wrapped in spans with color #F59E0B

Fallback if county not matched: "Homes like yours in Florida typically see quote gaps of $3,200–$5,400."

FREQUENCY STAT (below finding line, margin-top 10px):
font-family DM Sans, font-size 14px, color #A0B8D8, line-height 1.7
EXACT TEXT TEMPLATE: "The most common issue in this county and scope: [FLAG_TYPE] — found in 71% of contracts we've analyzed."

Where [FLAG_TYPE] is dynamic from COUNTY_VERDICT_DATA, wrapped in a span with color #F97316 (flag orange).
"71%" is wrapped in a span: font-weight 600, color #FFFFFF.

IMPLICATION LINE (below, margin-top 8px):
font-family DM Sans, font-size 14px, color #A0B8D8, line-height 1.7
EXACT TEXT: "When brands aren't specified, you can't verify you're getting the product quality you were verbally sold."

PROPS this component accepts:
- county: string (e.g. "Broward County")
- dollarLow: number (e.g. 3800)
- dollarHigh: number (e.g. 6200)
- flagType: string (e.g. "unspecified window brands")
```

---

## C-06 — LeadGate (Section 6 — Lead Capture)

```
Build a new component called LeadGate.tsx.

This slides in (opacity 0 → 1, translateY 12px → 0, 0.20s ease) after Step 4 selection.
It appears inside the TruthGateFlow container, replacing the step content.

CONTAINER: same styling as TruthGateFlow outer container (inherits it)

PROGRESS BADGES ROW (top of form):
- display flex, gap 6px, flex-wrap wrap, margin-bottom 20px
- Badge 1: text "YOUR PROFILE IS CONFIGURED", background rgba(29,78,216,0.18), color #3B82F6, border 1px solid rgba(29,78,216,0.35), font-family JetBrains Mono, font-size 9px, letter-spacing 0.1em, border-radius 2px, padding 3px 8px
- Badge 2: dynamic county badge — EXACT FORMAT: "[COUNTY] COUNTY" (e.g. "BROWARD COUNTY"), background rgba(0,217,255,0.10), color #00D9FF, border 1px solid rgba(0,217,255,0.25), same type-style
- Badge 3: scope from Step 2 (e.g. "FULL REPLACEMENT"), same cobalt style as Badge 1
- Badge 4: quote range from Step 4 (e.g. "$10K–$20K"), background rgba(245,158,11,0.14), color #F59E0B, border 1px solid rgba(245,158,11,0.30)

HEADING: font-family Barlow Condensed, font-weight 800, font-size 24px, text-transform uppercase, color #FFFFFF, margin-bottom 6px
EXACT TEXT: "Where should we send your grade report?"

SUBHEADING: font-family DM Sans, font-size 14px, color #A0B8D8, margin-bottom 20px
EXACT TEXT: "Your analysis is running. Enter your details to receive the full results."

FORM FIELDS — stacked vertically, gap 16px:

Field 1 — First Name:
- Label: font-family JetBrains Mono, font-size 9px, letter-spacing 0.1em, uppercase, color #7D9DBB, margin-bottom 5px
  EXACT LABEL TEXT: "FIRST NAME"
- Input: font-family DM Sans, font-size 14px, color #FFFFFF, background #0D1B35, border 1px solid #2E3A50, padding 12px 14px, border-radius 0px, width 100%
- placeholder: "Your first name" — color #7D9DBB
- On focus: border-color #00D9FF, box-shadow 0 0 0 1px rgba(0,217,255,0.15)

Field 2 — Email:
- Label: same style. EXACT LABEL TEXT: "EMAIL"
- Label has a secondary span immediately after it: font-family JetBrains Mono, font-size 9px, color #7D9DBB, margin-left 8px
  EXACT SECONDARY TEXT: "(your grade report is sent here)"
- Input: same style, type="email"
- placeholder: "your@email.com"

Field 3 — Mobile Number:
- Label: EXACT LABEL TEXT: "MOBILE NUMBER"
- Label has secondary span: EXACT TEXT: "(for OTP verification — one code, then done)"  ← DO NOT CHANGE THIS EXACT STRING
- Input: same style, type="tel"
- placeholder: "(305) 000-0000"

TCPA CONSENT TEXT (below fields, before submit button):
font-family DM Sans, font-size 11px, color #7D9DBB, line-height 1.65, margin-bottom 16px
EXACT TEXT: "By continuing you consent to receive one SMS for identity verification. No sales calls. No spam. Unsubscribe any time."

SUBMIT BUTTON:
- font-family DM Sans, font-weight 700, font-size 15px, color #FFFFFF, background #BB2D00, border none, padding 15px 24px, border-radius 2px, width 100%, cursor pointer, letter-spacing 0.01em
- EXACT TEXT: "UNLOCK MY ANALYSIS  →"  ← DO NOT CHANGE THIS EXACT STRING
- hover: background #9B2400, transition 0.12s ease
- box-shadow: 0 4px 20px rgba(187,45,0,0.30)

SKIP LINK (below submit, margin-top 12px, text-align center):
- font-family DM Sans, font-size 12px, color #1D4ED8, cursor pointer, text-decoration none
- EXACT TEXT: "Or skip for now and explore a sample report"
- hover: color #3B82F6

SOCIAL PROOF INJECTION (appears above the form, just before the heading):
A single testimonial card:
Background: rgba(16,185,129,0.05), border: 1px solid rgba(16,185,129,0.20), border-left: 2px solid #10B981, padding 14px, margin-bottom 20px, border-radius 0px
- Quote: font-family DM Sans, font-size 13px, color #A0B8D8, font-style italic, line-height 1.65
  EXACT TEXT: '"The report saved me $3,200 — and all I did was send them the quote."'
- Attribution: font-family JetBrains Mono, font-size 9px, color #7D9DBB, margin-top 6px, letter-spacing 0.08em
  EXACT TEXT: "— MARIA T. · BROWARD COUNTY · VERIFIED"
```

---

## C-07 — UploadZone (Section 7 — Quote Upload)

```
Build a new component called UploadZone.tsx.

This appears after successful lead capture / OTP verification as the next step.

EYEBROW (above container):
JetBrains Mono, 9px, letter-spacing 0.14em, uppercase, color #7D9DBB
EXACT TEXT: "STEP 2 OF 2 — UPLOAD YOUR QUOTE"
Margin-bottom 16px

CONTAINER:
Background: #161C28
Border: 1px dashed #3D4F6A (slightly lighter than standard border for the zone)
Border-radius: 0px
Padding: 40px 28px
Text-align: center

HEADING: Barlow Condensed 800, 24px, uppercase, color #FFFFFF, margin-bottom 8px
EXACT TEXT: "Drop your quote here to start the scan."

SUBHEADING: DM Sans 14px, color #A0B8D8, margin-bottom 24px
EXACT TEXT: "PDF or image. Any format from any Florida contractor."

DROP ZONE (inner area):
Background: rgba(29,78,216,0.05)
Border: 1px dashed #1D4ED8 (cobalt)
Border-radius: 0px
Padding: 32px 24px
Cursor: pointer
Margin-bottom: 20px
Transition: all 0.15s ease

States:
- Default: border 1px dashed #1D4ED8, background rgba(29,78,216,0.05)
- On dragover: border 1px solid #00D9FF, background rgba(0,217,255,0.07)
- On file accepted: border 1px solid #10B981, background rgba(16,185,129,0.06)

Inside drop zone (default state):
- Primary text: DM Sans, font-size 15px, font-weight 500, color #C8DEFF
  EXACT TEXT: "Drag your quote here, or click to browse"
- Secondary text: JetBrains Mono, font-size 10px, color #7D9DBB, margin-top 6px, letter-spacing 0.08em
  EXACT TEXT: "PDF · JPG · PNG · Up to 10MB"

Inside drop zone (file accepted state):
- Text: JetBrains Mono, font-size 11px, color #10B981, letter-spacing 0.08em
  EXACT FORMAT: "✓ [filename] · Ready to scan"

SCAN BUTTON (below drop zone, visible after file is accepted):
- font-family DM Sans, font-weight 700, font-size 15px, color #FFFFFF, background #BB2D00, padding 14px 32px, border-radius 2px, border none, cursor pointer
- EXACT TEXT: "START MY AI SCAN  →"
- Initially hidden (opacity 0, pointer-events none). Appears (opacity 1, pointer-events auto) when file is accepted. Transition 0.20s ease.

PRIVACY NOTE (always visible, below button or drop zone):
font-family DM Sans, font-size 11px, color #7D9DBB, text-align center, margin-top 12px
EXACT TEXT: "Your document is encrypted and never shared with contractors without your permission."
```

---

## C-08 — ScanTheatrics (Section 8 — The Forensic Scan Sequence)

```
Build a new component called ScanTheatrics.tsx. This replaces the upload zone after scan begins.

FULL SECTION:
Background: #0A0A0A
Min-height: 100vh (full screen takeover)
Display: flex, flex-direction column, align-items center, justify-content center
Padding: 40px 20px

TERMINAL CONTAINER:
Width: 100%, max-width 680px
Background: #0A0A0A
Border: 1px solid #2E3A50

TERMINAL HEADER BAR:
Height: 36px, background #111418, border-bottom: 1px solid #1C1C1C
Display flex, align-items center, padding 0 14px, gap 8px
- Status dot: 8×8px div, background #1D4ED8, border-radius 0px (square, not circle)
- Text: JetBrains Mono, font-size 9px, color #7D9DBB, letter-spacing 0.1em, uppercase
  EXACT TEXT TEMPLATE: "WINDOWMAN FORENSIC ENGINE v2.1 — [COUNTY] COUNTY"
  Where [COUNTY] is dynamic from the lead's county. Color the county name: color #00D9FF

TERMINAL LOG AREA:
Padding: 16px 14px
Min-height: 220px
Font-family: JetBrains Mono
Font-size: 12px
Line-height: 2.0

Log lines appear one at a time, each with animation: opacity 0 → 1, translateX -6px → 0, duration 0.15s ease.
Delay between lines: 1.1 seconds each.

EXACT LOG LINE SEQUENCE (in order, with colors):

Line 1: color #1D4ED8 (sys-cobalt), opacity 0.85
EXACT TEXT: "$ INITIALIZING FORENSIC PROTOCOL..."

Line 2: color #1D4ED8, opacity 0.85
EXACT TEXT: "$ SECURE HANDSHAKE ESTABLISHED"

Line 3: color #A0B8D8 (t3)
EXACT TEXT: "■ Accessing [COUNTY] COUNTY pricing benchmarks..."  ← [COUNTY] in color #FFFFFF

Line 4: color #A0B8D8
EXACT TEXT: "■ Extracting line items and specifications..."

Line 5: color #A0B8D8
EXACT TEXT: "■ Running brand registry check..."

Line 6: color #F97316 (flag orange)
EXACT TEXT: "▲ FLAG DETECTED: No window brand specified — substitution risk HIGH"

Line 7: color #A0B8D8
EXACT TEXT: "■ Scanning warranty language..."

Line 8: color #F97316 (flag orange)
EXACT TEXT: "▲ FLAG DETECTED: \"Permit included\" — no dollar amount found"

Line 9: color #A0B8D8
EXACT TEXT: "■ Running NOA compliance verification..."

Line 10: color #10B981 (emerald)
EXACT TEXT: "✓ Document authenticity: CONFIRMED"

Line 11: color #A0B8D8
EXACT TEXT: "■ Calculating fair-market delta for [COUNTY] COUNTY..."  ← [COUNTY] in #FFFFFF

Line 12: color #F97316 (flag orange)
EXACT TEXT: "▲ FLAG DETECTED: Labor warranty 1 year — state minimum is 3"

Line 13: color #1D4ED8, opacity 0.6
EXACT TEXT: "$ COMPUTING FINAL RISK SCORE..."

After line 13 appears: show a progress bar and counter:

PROGRESS SECTION (below log):
Padding: 0 14px 14px

Progress label row: display flex, space-between, margin-bottom 6px
- Left: JetBrains Mono, 9px, color #7D9DBB, uppercase, "ANALYSIS PROGRESS"
- Right: JetBrains Mono, 9px, color #00D9FF, id="pct-display", starts at "0%"

Progress bar: height 3px, background #2E3A50, border-radius 0px
Fill: starts at 0%, background linear-gradient(90deg, #1D4ED8, #00D9FF)
PHASE TIMING:
- Phase 1 (0→40%): duration 6s linear
- Phase 2 (40→79%): duration 18s linear — switch fill to linear-gradient(90deg, #1D4ED8, #F97316)
- Phase 3 (79→99%): duration 34s linear

AT 99%: FREEZE. The bar stops at 99%. Zero movement. Zero text. 2100ms hold.

After 2100ms hold:
- White flash: the entire screen briefly goes rgba(255,255,255,0.15) for 80ms, then fades out over 200ms
- Then: unmount ScanTheatrics and mount GradeReveal (C-09)

SIGNIFICANT FINDINGS ALERT (appears when first FLAG line appears):
Position: below the log area
font-family JetBrains Mono, font-size 10px, color #F97316, letter-spacing 0.08em, text-align center
EXACT TEXT: "⚡ SIGNIFICANT FINDINGS — IDENTITY VERIFICATION REQUIRED"
Appears with opacity 0 → 1, transition 0.20s ease
```

---

## C-09 — OTPGate (Section 9 — Identity Verification)

```
Build a new component called OTPGate.tsx.

This is a full-screen overlay that appears after scan reaches 99% (via the white flash transition in ScanTheatrics).

BACKGROUND: #0A0A0A, min-height 100vh, display flex, align-items center, justify-content center

CONTAINER:
Background: #161C28
Border: 1px solid #2E3A50
Border-radius: 0px
Padding: 40px 32px desktop, 28px 20px mobile
Max-width: 480px
Width: 100%
Text-align: center

Entry animation: opacity 0 → 1, translateY 20px → 0, 0.30s ease

EYEBROW:
JetBrains Mono, 9px, letter-spacing 0.14em, uppercase, color #00D9FF, margin-bottom 16px
EXACT TEXT: "IDENTITY VERIFICATION REQUIRED"

HEADING: Barlow Condensed 800, 26px, uppercase, color #FFFFFF, margin-bottom 8px
EXACT TEXT: "Your Truth Report is ready."

SUBHEADING: DM Sans, 14px, color #A0B8D8, line-height 1.65, margin-bottom 24px
EXACT TEXT TEMPLATE: "Verify your identity to unlock it. We sent a 6-digit code to [MASKED_PHONE]."
Where [MASKED_PHONE] shows last 2 digits only, e.g. "( *** ) *** - **62". Color #FFFFFF.

OTP INPUT ROW:
Display flex, gap 8px, justify-content center, margin-bottom 16px
Six individual input boxes:
- Width 44px, height 52px, font-family JetBrains Mono, font-size 20px, font-weight 500, text-align center, color #FFFFFF
- Background #0D1B35, border 1px solid #2E3A50, border-radius 0px, outline none
- On focus: border-color #00D9FF, box-shadow 0 0 0 1px rgba(0,217,255,0.15)
- On fill (digit entered): border-color #1D4ED8
- Auto-advance: when a digit is entered, focus moves to next input automatically
- type="tel" inputmode="numeric" maxLength={1}

RESEND LINK (below OTP inputs):
font-family DM Sans, font-size 12px, color #1D4ED8, cursor pointer, margin-bottom 16px
EXACT TEXT: "Didn't get it? Resend code"

SECURITY NOTE:
font-family DM Sans, font-size 11px, color #7D9DBB, line-height 1.5
EXACT TEXT: "This keeps your report secure and your phone private."

On correct OTP: transition to GradeReveal (C-10) with white flash (same 80ms flash as scan completion).
```

---

## C-10 — GradeReveal (Section 10 — The Grade Reveal)

```
Build a new component called GradeReveal.tsx.

This is the payoff for every micro-commitment. One spring animation fires here and ONLY here.

LAYOUT: full width, background #0A0A0A, padding 60px 24px desktop, 40px 16px mobile

ENTRY: the grade letter appears with this EXACT animation:
animation: gradeReveal 0.40s cubic-bezier(0.34, 1.56, 0.64, 1) forwards
keyframes: from { transform: scale(0.6) rotate(-4deg); opacity: 0; } to { transform: scale(1) rotate(0deg); opacity: 1; }

Immediately after the grade letter entry animation: the container fires camera-shake:
keyframes: 0% { transform: translateX(0); } 15% { transform: translateX(-3px); } 30% { transform: translateX(3px); } 45% { transform: translateX(-2px); } 60% { transform: translateX(2px); } 100% { transform: translateX(0); }
Duration: 200ms, one-time

--- GRADE HEADER SECTION ---
Background based on grade:
- Grade A or B: border 1px solid rgba(16,185,129,0.35), background rgba(16,185,129,0.04)
- Grade C: border 1px solid rgba(245,158,11,0.35), background rgba(245,158,11,0.04)
- Grade D: border 1px solid rgba(249,115,22,0.35), background rgba(249,115,22,0.04)
- Grade F: border 1px solid rgba(220,38,38,0.40), background rgba(220,38,38,0.05)

Padding: 28px 24px, border-radius: 0px

Inside: display flex, gap 20px, align-items flex-start

Left: the GRADE LETTER
- font-family Barlow Condensed, font-weight 900, font-size 80px, line-height 1, letter-spacing -0.04em, text-transform uppercase
- Grade colors: A = #10B981, B = #34D399, C = #F59E0B, D = #F97316, F = #DC2626
- Below grade: JetBrains Mono, 9px, color #7D9DBB, letter-spacing 0.1em, margin-top 4px, EXACT TEXT: "FORENSIC GRADE"

Right (flex: 1):
- VERDICT LINE: Barlow Condensed 800, font-size 22px, uppercase, color #FFFFFF, margin-bottom 6px
  Grade-specific exact text:
  - A: "YOUR QUOTE PASSES INSPECTION."
  - B: "MOSTLY FAIR — REVIEW THE FLAGS."
  - C: "PROCEED WITH CAUTION."
  - D: "SIGNIFICANT ISSUES FOUND."
  - F: "DO NOT SIGN THIS CONTRACT."

- FLAG SUMMARY: JetBrains Mono, 10px, color #7D9DBB, letter-spacing 0.08em, margin-bottom 14px
  EXACT FORMAT: "[N] CRITICAL FLAGS · [M] LEVERAGE POINTS IDENTIFIED"

- DOLLAR DELTA: Barlow Condensed 800, font-size 30px, color #DC2626 (if over market) or #10B981 (if under), uppercase
  EXACT FORMAT: "$[X,XXX] ABOVE" or "$[X,XXX] BELOW"

- COUNTY LINE: JetBrains Mono, 9px, color #7D9DBB, letter-spacing 0.08em
  EXACT FORMAT: "[COUNTY] COUNTY FAIR-MARKET RANGE"

--- PILLAR SCORES (below header, margin-top 20px) ---

SECTION LABEL: JetBrains Mono, 9px, color #7D9DBB, letter-spacing 0.1em, uppercase, margin-bottom 12px
EXACT TEXT: "PILLAR SCORES"

Each of 5 pillars displayed as a row (display flex, align-items center, gap 10px, margin-bottom 8px):
- Grade letter: Barlow Condensed 800, font-size 16px, width 20px, text-align center, color by grade (same mapping)
- Pillar name: JetBrains Mono, 9px, color #7D9DBB, letter-spacing 0.06em, uppercase, width 110px
- Score bar: flex: 1, height 2px, background #2E3A50
  - Fill div: height 100%, width by score%, background by grade color, transition: width 0.8s ease (staggered: each bar starts at 0.2s intervals)
- Score label: JetBrains Mono, 9px, color matches grade, min-width 40px, text-align right
  EXACT FORMAT: "[score]/100"

PILLAR NAMES IN ORDER (exact strings):
1. "PRICE FAIRNESS"
2. "FINE PRINT & TRANSPARENCY"
3. "WARRANTY VALUE"
4. "INSTALL & SCOPE CLARITY"
5. "SAFETY & CODE MATCH"

--- FLAG CARDS (below pillars, margin-top 20px) ---

For each critical flag:
Background: rgba(220,38,38,0.05), border: 1px solid rgba(220,38,38,0.25), border-left: 2px solid #DC2626, border-radius 0px, padding 16px, margin-bottom 8px

Top: pill — background rgba(220,38,38,0.14), color #F87171, border 1px solid rgba(220,38,38,0.30), font-family JetBrains Mono, font-size 9px, border-radius 2px, padding 3px 8px, uppercase, letter-spacing 0.1em
EXACT FORMAT: "FLAG [N] — [SEVERITY]"

Headline: DM Sans, font-size 14px, font-weight 600, color #FFFFFF, margin: 6px 0 4px
Body text: DM Sans, font-size 13px, color #A0B8D8, line-height 1.65

--- PRIMARY CTA (below all flags, margin-top 28px) ---
font-family DM Sans, font-weight 700, font-size 15px, color #FFFFFF, background #BB2D00, border none, padding 16px 28px, border-radius 2px, width 100%, text-align center, cursor pointer
EXACT TEXT: "CONNECT ME WITH A CONTRACTOR WHO BEATS THIS  →"
hover: background #9B2400, transition 0.12s ease
box-shadow: 0 4px 20px rgba(187,45,0,0.35)

SECONDARY LINK (below CTA, margin-top 10px, text-align center):
font-family DM Sans, font-size 12px, color #1D4ED8, cursor pointer
EXACT TEXT: "Or download this report as PDF first"
```

---

## C-11 — NarrativeProof (Section 11 — Testimonials)

```
Build a new component called NarrativeProof.tsx.

BACKGROUND: #0A0A0A, padding: 80px 24px desktop, 48px 16px mobile

SECTION EYEBROW (above cards, centered):
JetBrains Mono, 9px, letter-spacing 0.14em, uppercase, color #7D9DBB
EXACT TEXT: "VERIFIED · SPECIFIC · WITH DOLLAR AMOUNTS"
Preceded by 24px × 1px line in #2E3A50
Margin-bottom: 48px

THREE TESTIMONIAL CARDS — stacked vertically, gap 2px:

--- TESTIMONIAL 1 ---
Background: rgba(16,185,129,0.04), border: 1px solid rgba(16,185,129,0.18), border-left: 2px solid #10B981, border-radius 0px, padding 24px

Header row: display flex, justify-content space-between, align-items flex-start, margin-bottom 14px
Left:
- Name: DM Sans, font-size 15px, font-weight 600, color #FFFFFF
  EXACT TEXT: "Maria T."
- Location below name: JetBrains Mono, font-size 9px, color #7D9DBB, letter-spacing 0.08em, margin-top 2px
  EXACT TEXT: "BROWARD COUNTY"
Right: savings badge — background rgba(16,185,129,0.14), color #34D399, border 1px solid rgba(16,185,129,0.28), font-family JetBrains Mono, font-size 10px, border-radius 2px, padding 4px 10px, font-weight 500, uppercase, letter-spacing 0.08em
  EXACT TEXT: "$3,200 SAVED"

Quote text: DM Sans, font-size 14px, font-style italic, color #A0B8D8, line-height 1.7, margin-bottom 10px
EXACT TEXT: '"I thought I was done. Quote was in, contractor was nice, price seemed reasonable. Then WindowMan flagged something on page 2 that my contractor "forgot" to mention."'

Finding text: DM Sans, font-size 14px, color #F59E0B (amber), line-height 1.7
EXACT TEXT: 'The permit wasn't included in the price. Listed as "$0 — included" — which legally means they don't have to pull one. After the flag, I asked the contractor directly. He added a real permit line item for $380. The scan took 60 seconds and saved me from a future home sale nightmare.'

--- TESTIMONIAL 2 ---
Background: rgba(29,78,216,0.04), border: 1px solid rgba(29,78,216,0.18), border-left: 2px solid #1D4ED8, border-radius 0px, padding 24px

Header row:
Left:
- Name: EXACT TEXT: "David R."
- Location: EXACT TEXT: "PALM BEACH COUNTY"
Right badge: background rgba(29,78,216,0.18), color #3B82F6, border 1px solid rgba(29,78,216,0.30)
  EXACT TEXT: "$4,800 RENEGOTIATED"

Quote text: DM Sans, 14px, italic, color #A0B8D8, line-height 1.7, margin-bottom 10px
EXACT TEXT: '"I used WindowMan\'s report to negotiate. The contractor dropped the price by $3,200 and added a 3-year warranty. All I did was show him the page."'

Finding text: DM Sans, 14px, color #00D9FF (cyan), line-height 1.7
EXACT TEXT: 'The report showed the quote was 28% above Palm Beach market average, no brand was specified, and the labor warranty was 1 year when the state minimum is 3. I emailed the contractor the flagged report. He came back with a new number in 4 hours.'

--- TESTIMONIAL 3 ---
Background: rgba(245,158,11,0.04), border: 1px solid rgba(245,158,11,0.18), border-left: 2px solid #F59E0B, border-radius 0px, padding 24px

Header row:
Left:
- Name: EXACT TEXT: "Robert & Diane T."
- Location: EXACT TEXT: "COLLIER COUNTY"
Right badge: background rgba(245,158,11,0.14), color #F59E0B, border 1px solid rgba(245,158,11,0.28)
  EXACT TEXT: "$4,800 RECOVERED"

Quote text: DM Sans, 14px, italic, color #A0B8D8, line-height 1.7, margin-bottom 10px
EXACT TEXT: '"Post-Ian pricing gouging is real in Naples. WindowMan showed us the fair-market range for our county. Our quote was $6,400 over."'

Finding text: DM Sans, 14px, color #F59E0B (amber), line-height 1.7
EXACT TEXT: 'We used the report in our negotiation and got $4,800 back. Then used WindowMan to find a contractor who came in at fair market from the start. The whole thing took 2 days.'

SCROLL ENTRANCE: each card fades in with translateY 12px → 0 as it enters viewport, 0.3s ease, staggered 0.1s each.
```

---

## C-12 — ClosingManifesto (Section 12 — The Final Statement)

```
Build a new component called ClosingManifesto.tsx.

BACKGROUND: #0A0A0A, padding: 100px 24px desktop, 64px 16px mobile
Text-align: center

--- MANIFESTO TEXT (centered, max-width 580px, margin 0 auto) ---

EXACT 4-LINE STRUCTURE (each line is a separate div):
Line 1: Barlow Condensed 900, font-size clamp(22px, 4vw, 36px), uppercase, color #FFFFFF, line-height 1.0
EXACT TEXT: "THE INDUSTRY BUILT A SYSTEM"

Line 2: Barlow Condensed 900, font-size clamp(22px, 4vw, 36px), uppercase, color #FFFFFF, line-height 1.0
EXACT TEXT: "WHERE YOU NEED THEIR EXPERTISE"

Line 3: Barlow Condensed 900, font-size clamp(22px, 4vw, 36px), uppercase, color #A0B8D8 (var --t3 muted), line-height 1.0
EXACT TEXT: "TO UNDERSTAND THEIR QUOTE."

Divider: a horizontal rule — width 80px, height 1px, background #2E3A50, margin: 24px auto

Line 4: Barlow Condensed 900, font-size clamp(22px, 4vw, 36px), uppercase, color #00D9FF (cyan — THIS IS THE ONLY CYAN HEADLINE ON THE PAGE), line-height 1.0
EXACT TEXT: "WE BUILT A SYSTEM WHERE YOU DON'T."

DO NOT COMBINE THESE FOUR LINES. Each must be a separate element with its own color.

Margin below line 4: 40px

--- FOUR CHECKMARK BULLETS (centered column, max-width 320px, margin 0 auto) ---

Each bullet: display flex, align-items center, gap 12px, margin-bottom 12px, text-align left

Left: an 8×8px div, background #10B981 (emerald), border-radius 0px (square, not circle or checkmark icon)

Text: DM Sans, font-size 14px, color #A0B8D8, line-height 1.5

EXACT TEXT FOR EACH (in order):
1. "Free for every Florida homeowner"
2. "No contractor contact unless you ask for it"
3. "No upselling, no pressure, no spam"
4. "Your report is yours to keep"

Margin below bullets: 40px

--- FINAL CTA ---

Primary button:
font-family DM Sans, font-weight 700, font-size 16px, color #FFFFFF, background #BB2D00, padding 16px 40px, border-radius 2px, border none, cursor pointer, letter-spacing 0.01em
EXACT TEXT: "SCAN MY QUOTE — IT'S FREE  →"
box-shadow: 0 4px 24px rgba(187,45,0,0.35)
hover: background #9B2400, transform translateY(-1px), transition 0.12s ease

Sub-CTA line (below button, margin-top 14px):
DM Sans, font-size 13px, color #7D9DBB, line-height 1.5
EXACT TEXT: "Your contract already contains the truth. We'll show it to you."

Autonomy link (below sub-CTA line, margin-top 10px):
DM Sans, font-size 12px, color #1D4ED8, cursor pointer
EXACT TEXT: "Or explore a sample report first — you're free to choose."  ← DO NOT SHORTEN OR CHANGE THIS STRING
hover: color #3B82F6

SCROLL ENTRANCE: the entire section animates in as one block — opacity 0 → 1, translateY 16px → 0, 0.4s ease, triggered by IntersectionObserver.
```

---

## C-13 — Footer (Section 13 — Footer)

```
Build a new component called Footer.tsx (or update existing).

BACKGROUND: #0A0A0A
BORDER TOP: 1px solid #2E3A50
PADDING: 48px 24px 32px desktop, 36px 16px 24px mobile

UPPER SECTION — display flex, justify-content space-between, align-items flex-start, flex-wrap wrap, gap 32px, margin-bottom 32px:

LEFT COLUMN:
Brand mark (same as nav):
- "WINDOW" Barlow Condensed 900, 18px, color #FFFFFF
- "MAN" Barlow Condensed 900, 18px, color #F97316
- ".PRO" Barlow Condensed 900, 16px, color #7D9DBB
Margin-bottom: 10px

Tagline: DM Sans, 13px, color #7D9DBB, max-width 240px, line-height 1.65
EXACT TEXT: "AI-Powered Impact Window Quote Intelligence."

Service area: DM Sans, 12px, color #7D9DBB, margin-top 4px
EXACT TEXT: "Serving homeowners across all 67 Florida counties."  ← DO NOT CHANGE — this replaces any South Florida-only language

RIGHT COLUMN (display flex, gap 24px, flex-wrap wrap, align-items center):
Four footer links. Each:
- JetBrains Mono, font-size 9px, letter-spacing 0.1em, uppercase, color #1D4ED8, cursor pointer, text-decoration none
- hover: color #3B82F6, transition 0.12s ease

EXACT LINK TEXTS (in order):
1. "PRIVACY POLICY"
2. "TERMS OF USE"
3. "HOW IT WORKS"
4. "FAQ"

LOWER SECTION (below a 1px solid #1C1C1C divider):
Padding-top: 24px
Display flex, flex-direction column, gap 10px

Legal disclaimer: DM Sans, 11px, color #7D9DBB, line-height 1.65
EXACT TEXT: "WindowMan is a consumer protection service. We are not a contractor, licensed installer, or home improvement company."

Commission disclosure: DM Sans, 11px, color #7D9DBB, line-height 1.65
EXACT TEXT: "WindowMan earns a referral fee only when a homeowner chooses to work with a contractor in our network and the project closes. We never charge homeowners."

Copyright: DM Sans, 11px, color #7D9DBB, margin-top 4px
EXACT TEXT: "© 2025 WindowMan.pro. All rights reserved."

MOBILE (under 768px):
- Upper section stacks vertically
- Links wrap to 2×2 grid
- No other changes
```

---

## COPY DEFENSE CHECKLIST

After each component is built, verify these exact strings are present before accepting:

**C-01 NAV:**
- [ ] "WINDOW" white · "MAN" #F97316 · ".PRO" #7D9DBB
- [ ] "SCAN MY QUOTE" (not "Submit" or "Get Started")
- [ ] No other nav links

**C-02 HERO:**
- [ ] Eyebrow: "FLORIDA'S FORENSIC QUOTE ENGINE" — cyan, mono
- [ ] Line 4: "THEY'RE COUNTING ON." — #F97316 orange
- [ ] Sub: exact 2-line text about "hidden fees, missing protections, overpriced scope"
- [ ] Trust micro-copy: "No account required. Results in 60 seconds."
- [ ] Flow B link: "Getting quotes soon? We can arm you first →"

**C-05 TRUTH GATE:**
- [ ] Step labels: "BUILDING YOUR PROJECT PROFILE" etc. (not "Step 1" etc.)
- [ ] Micro-copy under each question is exact
- [ ] County display: "◈ [COUNTY] DATA LOADED"

**C-05b MICRO-VERDICT:**
- [ ] "Homes like yours in" — not "Homes in"
- [ ] "71% of contracts we've analyzed" — not "homeowners"
- [ ] All three sentences present — none removed

**C-06 LEAD GATE:**
- [ ] Phone micro-copy: "for OTP verification — one code, then done" — EXACT
- [ ] CTA: "UNLOCK MY ANALYSIS →" — not "Submit" or "Continue"
- [ ] Skip: "Or skip for now and explore a sample report"
- [ ] Social proof Maria T. card above the form

**C-08 SCAN:**
- [ ] First log line uses county name in white
- [ ] Orange lines have ▲ FLAG DETECTED: prefix
- [ ] Green line: "✓ Document authenticity: CONFIRMED"
- [ ] 99% pause: 2100ms freeze before white flash

**C-10 GRADE REVEAL:**
- [ ] Grade letter uses spring: cubic-bezier(0.34, 1.56, 0.64, 1) 400ms
- [ ] Camera shake fires after entry
- [ ] Grade F verdict: "DO NOT SIGN THIS CONTRACT."
- [ ] CTA: "CONNECT ME WITH A CONTRACTOR WHO BEATS THIS →"

**C-12 MANIFESTO:**
- [ ] Line 4 in cyan #00D9FF — not white
- [ ] Checkmarks are 8×8px SQUARE emerald divs
- [ ] Sub-CTA: "Your contract already contains the truth. We'll show it to you."
- [ ] Autonomy link: "Or explore a sample report first — you're free to choose." — EXACT

**C-13 FOOTER:**
- [ ] Service area: "all 67 Florida counties" — not "Miami-Dade, Broward, Palm Beach"
- [ ] Commission disclosure present verbatim
