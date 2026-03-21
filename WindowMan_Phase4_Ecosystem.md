# WINDOWMAN.PRO — PHASE 4 PROMPT SEQUENCE
## C-14 through C-17 + Routing Update
## The Conversion Ecosystem: Recovery · Intelligence · Operations · Distribution

---

> **WHERE WE ARE**
> ✅ Phase 1 — Global Setup, Design System, Fonts, Tokens
> ✅ Phase 2 — Homepage (C-01 through C-10): Hero → Truth Gate → Industry Truth → 
>              Process Steps → Narrative Proof → Closing Manifesto
> ✅ Phase 3 — Post-Scan (C-11 through C-13): Grade Reveal → Contractor Match → 
>              Evidence Locker
>
> **WHAT PHASE 4 BUILDS**
> The homepage and post-scan flow handle users who convert in a single session.
> Phase 4 handles everything else:
>
> C-14 → Sticky Re-Engagement Bar    (recovers mid-funnel scrollers)
> C-15 → Exit Intent Modal            (catches abandonment before it happens)
> C-16 → Shareable Grade Report Page  (standalone /report route — viral distribution)
> C-17 → Admin Lead Dashboard         (internal CRM — where the business operates)
>
> Send in order. Then send the Routing + State Update at the end.

---

# ════════════════════════════════════════════════
# C-14: STICKY RE-ENGAGEMENT BAR
# <StickyRecoveryBar />
# The Leaky Funnel Catcher
# ════════════════════════════════════════════════

```
Build a React component called <StickyRecoveryBar />.

PURPOSE: A persistent bottom-of-screen bar that appears when the user 
has scrolled 70%+ of the page without completing the Truth Gate form.
It is the safety net for every user whose attention is drifting.

The core psychological mechanism: it names where they stopped.
"You answered 2 of 4 questions" is infinitely more compelling than
"Fill out the form." It exploits the Zeigarnik Effect by quantifying
the incompleteness. The user cannot unsee how close they are.

TRIGGER LOGIC (in App.jsx or as a hook):
  Show when ALL of the following are true:
  1. User has scrolled past 70% of total page height
  2. leadCaptured === false (form not yet submitted)
  3. User has been on page > 30 seconds
  4. Bar has not been manually dismissed (use localStorage key: 
     'wm_recovery_bar_dismissed' — check on mount)

  Hide when:
  - leadCaptured === true
  - User manually clicks the X (close) button
  - User clicks the CTA button (scroll to form)

COMPONENT PROPS:
  - stepsCompleted: number (0-4, from TruthGateFlow state, default 0)
  - county: string (from TruthGateFlow answers, default "your county")
  - isVisible: boolean

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTAINER:
  Position: fixed
  Bottom: 0, left: 0, right: 0
  Z-index: 8000
  Background: white
  Border-top: 2px solid #C8952A
  Box-shadow: 0 -4px 24px rgba(15, 31, 53, 0.14)
  Padding: 14px 20px mobile, 16px 32px desktop

ENTRY ANIMATION:
  Slides up from y: 80 → 0, opacity: 0→1
  Duration: 0.35s, ease: easeOut
  Spring physics (Framer Motion spring: stiffness 300, damping 30)

EXIT ANIMATION (on dismiss):
  Slides down y: 0 → 80, opacity: 1→0
  Duration: 0.2s

INNER LAYOUT:
  Max-width: max-w-4xl mx-auto
  Display: flex, align-items: center
  justify-content: space-between
  gap: 16px
  flex-wrap: wrap on mobile

LEFT SECTION — Status Signal:
  Display: flex, align-items: center, gap: 14px
  
  Progress indicator:
    Display: flex, align-items: center, gap: 3px
    4 small circles in a row:
      Each: 10px × 10px, border-radius: 50%
      Filled (step completed): background #C8952A
      Unfilled: background #E5E7EB, border: 1.5px solid #D1D5DB
    Circles are determined by stepsCompleted prop
    
  Status copy:
    Line 1: DM Sans 14px font-weight 700 color #0F1F35:
      Conditional on stepsCompleted:
        0 → "Your scan is ready to configure."
        1 → "You answered 1 of 4 questions."
        2 → "You're halfway through your scan."
        3 → "One question left before your grade."
        4 → "Your scan is configured — enter your details."
    
    Line 2: DM Sans 12px color #6B7280:
      Conditional on stepsCompleted:
        0 → "Takes 60 seconds. Free."
        1-2 → "Takes less than a minute to finish."
        3-4 → "Your analysis is waiting."

CENTER SECTION — Mini Progress Bar (desktop only, hidden on mobile):
  Width: 160px
  Height: 4px
  Background: #E5E7EB
  Border-radius: 2px
  Fill: background #C8952A
  Fill width: (stepsCompleted / 4) * 100 + "%"
  Animated: spring transition on width change

RIGHT SECTION — CTA + Close:
  Display: flex, align-items: center, gap: 10px

  CTA BUTTON:
    Background: #C8952A, color: white
    Font: DM Sans 14px font-weight 700
    Padding: 10px 22px, border-radius: 8px
    Border: none
    Box-shadow: 0 2px 10px rgba(200,149,42,0.3)
    
    BUTTON TEXT (conditional):
      stepsCompleted === 0 → "Start My Scan →"
      stepsCompleted >= 1 && < 4 → "Continue My Scan →"
      stepsCompleted === 4 → "Unlock My Grade →"
    
    On click:
      Smooth scroll to #truth-gate
      If stepsCompleted > 0: also restore TruthGateFlow to the user's last step
      console.log({ event: 'wm_recovery_bar_clicked', stepsCompleted })

  CLOSE BUTTON:
    Background: transparent, border: none
    Width: 28px, height: 28px
    Border-radius: 50%
    Display: flex, align-items: center, justify-content: center
    Color: #9CA3AF, font-size: 16px
    On hover: background #F3F4F6, color: #374151
    Content: "×" (close symbol)
    On click: set dismissed state, fire localStorage.setItem, hide bar
    console.log({ event: 'wm_recovery_bar_dismissed', stepsCompleted })

MOBILE LAYOUT OVERRIDE:
  On mobile (< 640px):
    - Left section and CTA stack into a 2-column layout
    - Close button absolute top-right of bar
    - Mini progress bar: hidden
    - Status copy line 2: hidden (too much text on mobile)
    - Bar height increases to accommodate stacking

URGENCY STATE:
  If user has been on page > 3 minutes AND stepsCompleted > 0 AND leadCaptured = false:
  The bar's border-top changes from #C8952A to #DC2626 (red urgency signal)
  Status line 1 changes to include: "Your configured scan expires in 24 hours."
  This is a soft urgency signal — not aggressive, but present.
```

---

# ════════════════════════════════════════════════
# C-15: EXIT INTENT RECOVERY MODAL
# <ExitIntentModal />
# The Last Line of Defense
# ════════════════════════════════════════════════

```
Build a React component called <ExitIntentModal />.

PURPOSE: Catches the user at the exact moment of abandonment.
Triggers on desktop when the mouse cursor moves above the browser chrome
(toward the back button or close tab). On mobile, triggers on the
browser back button or when the user switches to another app tab.

This is the Zeigarnik Effect in its purest form: "You started something.
It's not finished. Don't you want to know what we found?"

The modal does NOT beg. It does not say "Wait! Don't go!"
It delivers a calm, specific, personalized summary of what they've
built so far — and frames leaving as losing something they already own.

TRIGGER LOGIC:
  Desktop: mouseleave event on document where clientY < 20px
    (mouse moving toward top of viewport = browser chrome = exit intent)
    
  Mobile: 'visibilitychange' event where document.visibilityState = 'hidden'
    (user switching tabs or backgrounding the app)
  
  Show when ALL true:
  - Not already shown this session (sessionStorage key: 'wm_exit_shown')
  - leadCaptured === false
  - User has been on page > 15 seconds
  
  Do NOT trigger if:
  - leadCaptured === true
  - gradeRevealed === true
  - User is on mobile AND has NOT completed any steps (no engagement = no point)

  On trigger: sessionStorage.setItem('wm_exit_shown', 'true')
  Fire: console.log({ event: 'wm_exit_intent_triggered', stepsCompleted })

COMPONENT PROPS:
  - stepsCompleted: number (0-4)
  - answers: object (the Truth Gate answers collected so far)
  - isVisible: boolean
  - onClose: function
  - onCTAClick: function

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERLAY DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BACKDROP:
  Position: fixed, inset: 0, z-index: 9500
  Background: rgba(10, 20, 35, 0.75)
  Backdrop-filter: blur(4px)
  Entry: opacity 0→1, duration 0.2s
  Click outside card: closes modal (calls onClose)

MODAL CARD:
  Position: fixed
  Top: 50%, left: 50%
  Transform: translate(-50%, -50%)
  Width: 92% mobile, 520px desktop
  Max-width: 520px
  Background: white
  Border-radius: 20px
  Padding: 36px 32px mobile, 40px 40px desktop
  Box-shadow: 0 24px 80px rgba(10, 20, 35, 0.35)
  
  Entry animation: scale 0.9→1, opacity 0→1, duration 0.3s, ease easeOut
  Spring: stiffness 400, damping 35

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MODAL CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLOSE BUTTON (top right, absolute):
  Width: 32px, height: 32px, border-radius: 50%
  Background: #F3F4F6, border: none
  Content: "×", color: #6B7280, font-size: 18px
  On hover: background #E5E7EB
  On click: onClose(), console.log({ event: 'wm_exit_modal_dismissed' })

DYNAMIC CONTENT based on stepsCompleted:

━━━━ VARIANT A: stepsCompleted === 0 (no engagement) ━━━━
(This should rarely trigger due to the "> 15 seconds" rule, but handle it)

  Icon: large "?" emoji or question mark SVG, 40px, color #C8952A, text-center
  Margin-bottom: 16px

  Heading: Playfair Display 26px color #0F1F35 font-weight 700 text-center:
    "Before you go — one question."

  Body: DM Sans 16px #374151 text-center line-height 1.75 margin-top 12px:
    "The average impact window quote in Florida is $4,800 above fair market.
     It takes 60 seconds to find out if yours is one of them."

  CTA: gold button full-width, margin-top 24px:
    "Check My Quote — It's Free"
    On click: onClose(), scroll to #truth-gate, onCTAClick()

━━━━ VARIANT B: stepsCompleted 1-3 (partial engagement) ━━━━

  Progress display (top of card, before heading):
    Background: #FDF3E3, border-radius: 10px, padding: 14px 18px, margin-bottom: 24px
    Display: flex, align-items: center, justify-content: space-between
    
    Left:
      Small label: DM Mono 10px #C8952A letter-spacing 0.1em: "YOUR SCAN PROGRESS"
      Row of 4 circles (same as StickyRecoveryBar):
        Filled: #C8952A, unfilled: #E5E7EB
        stepsCompleted circles filled
      DM Sans 13px #C8952A margin-top 6px font-weight 600:
        "[stepsCompleted] of 4 questions answered"
    
    Right:
      Large percentage: DM Mono 28px font-weight 900 color #C8952A:
        stepsCompleted === 1 → "25%"
        stepsCompleted === 2 → "50%"
        stepsCompleted === 3 → "75%"

  Heading: Playfair Display 24px color #0F1F35 font-weight 700:
    "You're [25/50/75]% of the way to your grade."

  Personalized summary (shows what they've answered):
    Background: #F9FAFB, border-radius: 8px, padding: 16px 18px, margin-top: 16px
    Label: DM Mono 10px #6B7280 letter-spacing 0.08em: "WHAT YOU'VE CONFIGURED"
    
    Show each answered item as a row:
      Display: flex, align-items: center, gap: 8px, padding: 4px 0
      Green checkmark ✓ in #059669, 14px
      DM Sans 13px #374151:
        If windowCount answered: "Window count: [answers.windowCount]"
        If projectType answered: "Project type: [answers.projectType]"
        If county answered: "County: [answers.county] County"
    
    Show each unanswered item as a row:
      Grey circle ○ in #D1D5DB, 14px
      DM Sans 13px color #9CA3AF italic:
        "Quote range — not yet answered"
        (only shows items NOT yet answered)

  Body copy: DM Sans 15px #374151 line-height 1.75 margin-top 16px:
    "Everything you've entered is still here.
     [remaining questions to go] more answer[s] and we can run your grade."
    Replace [remaining] with (4 - stepsCompleted)

  CTA: gold button full-width, margin-top 24px:
    stepsCompleted === 1 → "Continue My Scan →"
    stepsCompleted === 2 → "I'm 50% There — Finish →"
    stepsCompleted === 3 → "One Question Left →"
    On click: onClose(), smooth scroll to #truth-gate, 
              restore TruthGateFlow to next unanswered step, onCTAClick()
    console.log({ event: 'wm_exit_modal_cta_clicked', stepsCompleted })

━━━━ VARIANT C: stepsCompleted === 4 (all questions answered, form not submitted) ━━━━

  Icon: large animated grade preview — circular outline, "?" in center
    Border: 3px dashed #C8952A, 72px, border-radius: 50%
    Center: Playfair Display 36px font-weight 900 color #C8952A: "?"
    Subtle rotation animation: rotate 0→360, duration 8s, linear, infinite
    Margin: 0 auto 20px, display block

  Heading: Playfair Display 26px color #0F1F35 font-weight 700 text-center:
    "Your grade is configured. It just needs your email."

  Body: DM Sans 15px #374151 text-center line-height 1.75 margin-top 12px:
    "You've answered all 4 questions. Your analysis is ready to run.
     All we need is where to send your grade report."

  Inline mini-form (margin-top: 20px):
    Two fields stacked (gap: 10px):
      Email input: full-width, height 48px, border 1.5px solid #E5E7EB,
        border-radius 8px, padding 0 16px, DM Sans 15px
        Placeholder: "your@email.com"
        Focus: border-color #C8952A
      
      Phone input: same styling
        Placeholder: "(555) 000-0000"
    
    Submit button (full-width, margin-top: 12px):
      Background: #059669, color: white
      Font: DM Sans 16px font-weight 700
      Height: 50px, border-radius: 8px
      Text: "Show Me My Grade →"
      On click: console.log({ event: 'wm_exit_modal_converted', stepsCompleted: 4 })
               onCTAClick(), onClose()
    
    Privacy line: DM Sans 11px #9CA3AF text-center margin-top 10px:
      "No sales calls. Report sent instantly. Unsubscribe any time."

BOTTOM LINK (all variants, below CTA):
  DM Sans 12px color #9CA3AF text-center margin-top 16px:
  "or leave without your results — your choice."
  On click: onClose()
  (BYAF — the autonomy line makes staying feel like a decision they made,
   not a manipulation they fell for)
```

---

# ════════════════════════════════════════════════
# C-16: SHAREABLE GRADE REPORT PAGE
# Route: /report/:reportId
# The Viral Distribution Engine
# ════════════════════════════════════════════════

```
Build a React component called <SharedReportPage />.

PURPOSE: A standalone, beautifully designed page that renders when 
someone opens a shared report link. This serves two audiences:

AUDIENCE A — The homeowner revisiting their own report:
  Sees their full grade, flags, and negotiation tools.
  Finds a reason to come back and act.

AUDIENCE B — Someone the homeowner shared with (spouse, friend, neighbor):
  Sees a professional forensic document.
  The bottom of the page immediately prompts THEM to scan their own quote.
  This is the viral loop mechanism.

ROUTE: This is a new page — create it as a separate component from the 
main homepage. In App.jsx, add React Router (react-router-dom):
  Route path="/report/:reportId" → renders <SharedReportPage />
  Route path="/" → renders the main <App /> homepage

For the Lovable build, use mock data — the reportId param is cosmetic.
Use the same mockAuditResult object from Phase 3.

This page has NO navbar. NO footer nav. Only the WindowMan logo and report.
This keeps the shared page focused and prevents the recipient from navigating away
before they've absorbed the report's impact.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE HEADER (Report Header — NOT the site nav)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #0F1F35
Padding: py-6 px-6 mobile, py-8 px-12 desktop

INNER: max-w-4xl mx-auto flex justify-between align-items-center

LEFT:
  Logo mark: "WINDOW" (white bold) + "MAN" (#C8952A bold) + ".PRO" (small gray)
  Below logo: DM Sans 12px color #94A3B8:
    "AI-Powered Impact Window Quote Analysis"

RIGHT:
  Report metadata pill:
    Background: rgba(255,255,255,0.08), border: 1px solid rgba(255,255,255,0.15),
    border-radius: 999px, padding: 6px 14px
    
    Two lines inside:
    Line 1: DM Mono 10px color #94A3B8 letter-spacing 0.08em: "REPORT ID"
    Line 2: DM Mono 12px color white font-weight 700: "WM-[reportId]-[county]"
    (for mock: "WM-2025-0142-BRW")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORT CERTIFICATE SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Padding: py-16 px-6 mobile, py-20 px-12 desktop
Max-width: max-w-4xl mx-auto

CERTIFICATE HEADER (centered):
  Small horizontal line: 60px wide, 1px solid #E5E7EB, centered, margin-bottom: 24px

  Eyebrow: DM Mono 11px #6B7280 letter-spacing 0.15em text-center margin-bottom 16px:
    "WINDOWMAN QUOTE ANALYSIS CERTIFICATE"

  Report title: Playfair Display 32px mobile, 40px desktop color #0F1F35 font-weight 700 text-center:
    "Impact Window Quote Analysis"

  Report meta: DM Sans 15px #6B7280 text-center margin-top 8px:
    "[county] County, Florida  ·  Generated [today's date formatted as: March 7, 2025]"

  Horizontal divider: margin-top 24px, 1px solid #E5E7EB

GRADE CERTIFICATE BLOCK (centered, margin-top: 40px):
  
  "OFFICIAL GRADE" label: DM Mono 11px #6B7280 letter-spacing 0.15em text-center

  Grade circle (same as GradeReveal but slightly larger and more "official"):
    180px × 180px, border-radius: 50%
    Border: 3px solid [grade color]
    Background: [grade bg color]
    Box-shadow: 0 0 0 8px [grade color at 8%], 0 8px 40px rgba(0,0,0,0.10)
    Margin: 20px auto
    
    Inside:
    Grade letter: Playfair Display, 100px, font-weight 900, [grade color]
    
  Below circle:
    Grade label: DM Mono 13px font-weight 700 [grade color] letter-spacing 0.08em:
    "GRADE [letter] — [grade label]"
    
    Date badge: DM Sans 12px #9CA3AF margin-top 8px:
    "Analysis conducted: [today's date]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORT FINDINGS SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #FAFAFA
Border-top: 1px solid #E5E7EB
Border-bottom: 1px solid #E5E7EB
Padding: py-12 px-6 mobile, py-16 px-12 desktop
Max-width: max-w-4xl mx-auto

Layout: 2-column on desktop (grid-cols-2 gap-10), single column on mobile

LEFT COLUMN — Price Analysis:
  
  Section label: DM Mono 10px #6B7280 letter-spacing 0.12em margin-bottom 16px:
  "PRICING ANALYSIS"

  If dollarDelta > 0:
    Large delta: DM Mono 44px font-weight 900 color #DC2626:
    "+$4,800"
    Sub: DM Sans 14px #6B7280: "above fair market for [county] County"
    
    Fair range block (margin-top 20px):
    Background white, border 1px solid #E5E7EB, border-radius 10px, padding 16px
    Label: DM Mono 10px #6B7280 letter-spacing 0.1em: "FAIR MARKET RANGE"
    Range: DM Mono 20px font-weight 700 color #0099BB: "$12,600 – $14,200"
    Sub: DM Sans 12px #9CA3AF: "Based on 847 [county] County quotes · Q1 2025"

  If dollarDelta <= 0:
    Large delta: DM Mono 44px font-weight 900 color #059669:
    "✓ At Market"
    Sub: DM Sans 14px #6B7280: "This quote is competitively priced for [county] County"

RIGHT COLUMN — Flag Summary:

  Section label: DM Mono 10px #6B7280 letter-spacing 0.12em margin-bottom 16px:
  "ISSUES IDENTIFIED"

  Flag summary pills (stacked, gap: 8px):
    Each flag gets a compact pill (not the full card from GradeReveal):
    
    RED pill: background #FEF2F2, border-left: 3px solid #DC2626,
    border-radius: 6px, padding: 10px 14px
    Icon: "⚠" in #DC2626, 12px + DM Sans 14px font-weight 600 color #0F1F35:
    flag.label
    Sub: DM Sans 12px #6B7280: flag.detail

    AMBER pill: same structure, background #FFFBEB, border-color: #F59E0B
    Icon: "⚡" in #D97706

    GREEN pill: background #ECFDF5, border-color: #059669
    Icon: "✓" in #059669

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WATERMARK FOOTER (bottom of certificate, before viral CTA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Padding: py-10 px-6, max-w-4xl mx-auto
Border-top: 1px solid #E5E7EB

Layout: flex justify-between align-items-center flex-wrap gap-4

LEFT:
  DM Mono 11px #9CA3AF:
    "Generated by WindowMan.pro  ·  AI-Powered Quote Intelligence"
  DM Mono 11px #C4C9D4 margin-top 4px:
    "This report is for informational purposes only."

CENTER:
  WindowMan logo mark (small): "WM" in a 32px circle, 
  background #0F1F35, color #C8952A, DM Mono 14px bold, border-radius 50%

RIGHT:
  Download button (text style):
    DM Sans 13px #0099BB underline: "⬇ Save as PDF"
    On click: console.log({ event: 'wm_shared_report_downloaded' })
    window.print() (triggers browser print dialog — clean PDF output)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIRAL CTA SECTION (the money section for audience B)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #0F1F35
Padding: py-16 px-6 mobile, py-20 px-12 desktop
Text-align: center

Eyebrow: DM Mono 11px #94A3B8 letter-spacing 0.1em margin-bottom 20px:
"GETTING AN IMPACT WINDOW QUOTE?"

Headline: Playfair Display 30px mobile, 40px desktop color white font-weight 700:
  "Find out if yours is priced fairly."

Body: DM Sans 16px color #D1D5DB line-height 1.7 max-width 560px mx-auto margin-top 12px:
  "The person who shared this report used WindowMan to check their quote
   before signing. It takes 60 seconds. It's free."

Social proof pill: margin-top 20px
  Background rgba(255,255,255,0.08), border 1px solid rgba(255,255,255,0.15),
  border-radius 999px, padding 8px 20px, display inline-flex align-items-center gap-8
  Pulsing green dot + DM Mono 13px white: "4,127 Florida homeowners scanned this month"

Gold CTA button: margin-top 28px
  Background: #C8952A, color white
  Font: DM Sans 17px font-weight 700
  Padding: 16px 40px, border-radius: 10px
  Box-shadow: 0 4px 20px rgba(200,149,42,0.4)
  Text: "Scan My Quote — It's Free →"
  On click: window.location.href = '/'
    console.log({ event: 'wm_viral_cta_clicked', source: 'shared_report' })
  Framer Motion: whileHover scale 1.02

Autonomy line below: DM Sans 13px #6B7280 margin-top 12px:
  "No account. No contractor contact. 60 seconds."

PAGE PRINT STYLES (for when user prints to PDF):
  Add a @media print stylesheet:
  - Hide the viral CTA section (display: none)
  - Hide all buttons
  - Expand the certificate to full page width
  - Set background: white, color: black on all text
  - The grade circle and flags should render cleanly
  - Add "CONFIDENTIAL — WindowMan.pro" as a print header
```

---

# ════════════════════════════════════════════════
# C-17: ADMIN LEAD DASHBOARD
# Route: /admin
# The Operations Brain
# ════════════════════════════════════════════════

```
Build a React component called <AdminDashboard />.

PURPOSE: The internal CRM and operations dashboard.
This is where the WindowMan team sees every lead in real time,
prioritizes which ones to call, and tracks the conversion pipeline.

The design philosophy: a trader's terminal, not a marketing dashboard.
Dense, data-forward, action-oriented. Every piece of data is there
because it affects the next action. Nothing decorative.

ROUTE: /admin (add to React Router in App.jsx)
SECURITY: For Lovable build — add a simple password gate:
  Render a centered password input before showing the dashboard.
  Hardcode password: "windowman2025" (replace with env var in production)
  Store auth in sessionStorage key: 'wm_admin_auth'
  If already authenticated this session, skip the gate.

PASSWORD GATE UI:
  Full-page center (min-h-screen flex items-center justify-center)
  Background: #060E18
  Card: background #0F1F35, border 1px solid rgba(255,255,255,0.1), 
  border-radius 16px, padding 40px 36px, max-width 380px, text-align center
  
  Logo: "WINDOWMAN.PRO" in DM Mono 16px #C8952A letter-spacing 0.15em
  Sub: DM Sans 13px #6B7280 margin-top 8px: "Admin Access"
  
  Input (margin-top 24px): 
    Type: password, full-width, height 48px
    Background: rgba(255,255,255,0.05), border 1px solid rgba(255,255,255,0.12)
    Border-radius 8px, padding 0 16px, DM Mono 14px color white
    Placeholder: "Enter password"
    Focus: border-color #C8952A
  
  Button (margin-top 12px): full-width, background #C8952A, height 46px,
  DM Sans 15px font-weight 700 white: "Access Dashboard →"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOCK DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Define this mock data array near the top of AdminDashboard:

const mockLeads = [
  { id: 'WM-001', firstName: 'Maria', email: 'maria.g@gmail.com', phone: '(954) 555-0184',
    county: 'Broward', windowCount: '11–20 windows', projectType: 'Full home replacement',
    quoteRange: '$10,000–$20,000', grade: 'C', dollarDelta: 4800, flagCount: 2,
    status: 'converted', lastStep: 8, createdAt: '2025-03-07T09:14:00Z',
    topFlag: 'No Window Brand Specified' },
  { id: 'WM-002', firstName: 'David', email: 'david.r@hotmail.com', phone: '(954) 555-0271',
    county: 'Broward', windowCount: '11–20 windows', projectType: 'Full home replacement',
    quoteRange: '$10,000–$20,000', grade: 'D', dollarDelta: 5200, flagCount: 3,
    status: 'called', lastStep: 8, createdAt: '2025-03-07T10:22:00Z',
    topFlag: '26% above Broward County benchmark' },
  { id: 'WM-003', firstName: 'Jennifer', email: 'jenn.m@yahoo.com', phone: '(561) 555-0093',
    county: 'Palm Beach', windowCount: '6–10 windows', projectType: 'Partial replacement',
    quoteRange: '$10,000–$20,000', grade: 'F', dollarDelta: 7400, flagCount: 4,
    status: 'converted', lastStep: 8, createdAt: '2025-03-07T11:05:00Z',
    topFlag: 'No Window Brand · No Permit · 50%+ Deposit' },
  { id: 'WM-004', firstName: 'Carlos', email: 'c.rivera@gmail.com', phone: '(305) 555-0317',
    county: 'Miami-Dade', windowCount: '20+ windows', projectType: 'New construction',
    quoteRange: '$35,000+', grade: 'B', dollarDelta: -1200, flagCount: 1,
    status: 'partial', lastStep: 5, createdAt: '2025-03-07T11:47:00Z',
    topFlag: 'Labor Warranty: 1 Year Only' },
  { id: 'WM-005', firstName: 'Susan', email: null, phone: null,
    county: 'Broward', windowCount: '6–10 windows', projectType: 'Partial replacement',
    quoteRange: '$10,000–$20,000', grade: null, dollarDelta: null, flagCount: null,
    status: 'shadow', lastStep: 2, createdAt: '2025-03-07T12:03:00Z',
    topFlag: null },
  { id: 'WM-006', firstName: 'Robert', email: 'rob.l@gmail.com', phone: '(786) 555-0449',
    county: 'Miami-Dade', windowCount: '1–5 windows', projectType: 'Single room / addition',
    quoteRange: 'Under $10,000', grade: 'A', dollarDelta: -800, flagCount: 0,
    status: 'converted', lastStep: 8, createdAt: '2025-03-07T12:31:00Z',
    topFlag: null },
  { id: 'WM-007', firstName: 'Patricia', email: 'pat.n@comcast.net', phone: '(561) 555-0628',
    county: 'Palm Beach', windowCount: '11–20 windows', projectType: 'Full home replacement',
    quoteRange: '$20,000–$35,000', grade: 'D', dollarDelta: 6100, flagCount: 3,
    status: 'converted', lastStep: 8, createdAt: '2025-03-07T13:14:00Z',
    topFlag: 'No Brand Specified · No NOA Rating' },
]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DASHBOARD SHELL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL LAYOUT:
  Background: #060E18 (darkest navy — "terminal" aesthetic)
  Min-height: 100vh
  Font-family: 'DM Mono', monospace (primary font for this page)
  Color: #C8D8E8

HEADER BAR:
  Background: #0A1628
  Border-bottom: 1px solid rgba(0,217,255,0.1)
  Padding: 14px 24px
  Display: flex, justify-content: space-between, align-items: center
  Position: sticky, top: 0, z-index: 100

  LEFT:
    "WINDOWMAN" DM Mono 14px #C8952A font-weight 700 letter-spacing 0.15em
    " · LEAD INTELLIGENCE" DM Mono 14px #405060 font-weight 400

  RIGHT: flex gap-16 align-items-center
    Live signal: pulsing green dot + DM Mono 11px #059669: "LIVE"
    Date/time: DM Mono 11px #405060: current date + "· Real-time"
    Logout: DM Mono 11px #405060 cursor pointer:
      "LOGOUT →" On click: clear sessionStorage, reload page

CONTENT AREA:
  Padding: 24px
  Max-width: 1400px, mx-auto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATS ROW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Grid: grid-cols-2 mobile, grid-cols-4 desktop, gap: 16px, margin-bottom: 24px

Each stat card:
  Background: rgba(255,255,255,0.03)
  Border: 1px solid rgba(255,255,255,0.07)
  Border-radius: 10px, padding: 18px 20px

STAT 1 — Today's Leads:
  Label: DM Mono 10px #405060 letter-spacing 0.1em: "LEADS TODAY"
  Value: DM Mono 32px font-weight 700 color #C8952A:
    [count of mockLeads where createdAt is today — use 7 for mock]
  Sub: DM Mono 11px #405060: "+2 from yesterday"

STAT 2 — Avg Dollar Delta:
  Label: "AVG OVERAGE FOUND"
  Value: DM Mono 32px font-weight 700 color #DC2626:
    [calculate average dollarDelta from converted leads — "$4,900"]
  Sub: DM Mono 11px #405060: "vs. fair market"

STAT 3 — Grade Distribution:
  Label: "GRADE MIX (TODAY)"
  Value area: horizontal grade bar, height 24px, border-radius 4px overflow hidden
    Segment widths proportional to grade counts:
    A+B: #059669, C: #F97316, D+F: #DC2626
  Sub: DM Mono 11px #405060: "[D+F count] priority calls · [C count] warm · [A+B count] satisfied"

STAT 4 — Conversion Rate:
  Label: "GATE CONVERSION"
  Value: DM Mono 32px font-weight 700 color #00D9FF:
    [converted / (converted + partial + shadow) — mock: "58%"]
  Sub: DM Mono 11px #405060: "lead gate → verified phone"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTROLS ROW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: rgba(255,255,255,0.02)
Border: 1px solid rgba(255,255,255,0.06)
Border-radius: 10px, padding: 14px 18px, margin-bottom: 16px
Display: flex, align-items: center, gap: 12px, flex-wrap: wrap

FILTER BUTTONS:
  Each button: DM Mono 11px, border-radius 6px, padding 6px 14px, 
  border 1px solid rgba(255,255,255,0.1), background transparent, cursor pointer
  
  Active state: background rgba(color,0.15), border-color color, color color

  "ALL" (color: #C8D8E8) 
  "D + F PRIORITY" (color: #DC2626)
  "C — WARM" (color: #F97316)
  "A + B — SATISFIED" (color: #059669)
  "SHADOW — NO EMAIL" (color: #405060)

USE STATE for activeFilter, default: 'ALL'
Filter logic:
  'ALL' → show all
  'D + F PRIORITY' → grade === 'D' || grade === 'F'
  'C — WARM' → grade === 'C'
  'A + B — SATISFIED' → grade === 'A' || grade === 'B'
  'SHADOW — NO EMAIL' → status === 'shadow'

SORT CONTROL (right side of controls row):
  DM Mono 11px #405060: "SORT: "
  Select dropdown (styled to match dark theme):
    Options: "NEWEST FIRST" / "HIGHEST DELTA" / "GRADE (D→A)" / "COUNTY"
  On change: sort the displayed leads accordingly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEAD TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For MOBILE: Lead cards (stacked, each card is one lead)
For DESKTOP: Table view

TABLE HEADERS (desktop):
  Background: rgba(255,255,255,0.04)
  Border-bottom: 1px solid rgba(255,255,255,0.08)
  Padding: 10px 16px
  DM Mono 10px #405060 letter-spacing 0.1em

  Columns: LEAD · STATUS · GRADE · DELTA · COUNTY · SCOPE · FLAGS · TIME · ACTIONS

TABLE ROWS — each lead:

  ROW BACKGROUND:
    Default: transparent
    D/F grade: rgba(220,38,38,0.04) (very subtle red tint)
    Shadow lead: rgba(255,255,255,0.01)
    On hover: rgba(255,255,255,0.04)
  
  Border-bottom: 1px solid rgba(255,255,255,0.04)
  Padding: 14px 16px
  Align-items: center

  COLUMN — LEAD:
    First name + DM Mono 10px #405060 lead ID below
    If email available: DM Mono 10px #405060 truncated
    If no email (shadow): DM Mono 10px #DC2626 italic: "no email captured"

  COLUMN — STATUS (badge):
    'shadow': background rgba(255,255,255,0.06) border rgba(255,255,255,0.1) 
              color #607080: "SHADOW"
    'partial': background rgba(200,149,42,0.12) border rgba(200,149,42,0.3) 
               color #C8952A: "PARTIAL"
    'converted': background rgba(0,153,187,0.12) border rgba(0,153,187,0.3) 
                 color #00D9FF: "CONVERTED"
    'called': background rgba(5,150,105,0.12) border rgba(5,150,105,0.3) 
              color #059669: "CALLED"
    'closed': background rgba(124,58,237,0.12) border rgba(124,58,237,0.3) 
              color #A78BFA: "CLOSED"
    All: DM Mono 10px font-weight 700 letter-spacing 0.06em, border-radius 999px, 
         padding 3px 10px, border 1px solid

  COLUMN — GRADE:
    Grade circle: 32px × 32px, border-radius 50%
    Border 2px solid [grade color], background [grade bg]
    DM Mono 14px font-weight 900 [grade color] centered
    If grade is null (shadow): "—" in #405060

  COLUMN — DELTA:
    If positive: DM Mono 14px font-weight 700 color #DC2626: "+$[amount]"
    If negative: DM Mono 14px font-weight 700 color #059669: "-$[amount]"
    If null: DM Mono 12px #405060: "—"

  COLUMN — COUNTY:
    DM Mono 12px #8AA0B4: "[county]"

  COLUMN — SCOPE:
    DM Mono 11px #607080 (truncated, max 20 chars): 
    "[windowCount] · [projectType abbreviated]"
    e.g., "11–20 · Full home"

  COLUMN — FLAGS:
    If flagCount > 0:
      Small pill: background rgba(220,38,38,0.12), 
      border 1px solid rgba(220,38,38,0.3), border-radius 999px, padding 3px 10px
      DM Mono 11px #DC2626 font-weight 700: "⚑ [flagCount]"
      Tooltip on hover (CSS): topFlag text
    If flagCount === 0: DM Mono 11px #059669: "✓ clean"
    If null: "—" in #405060

  COLUMN — TIME:
    DM Mono 11px #405060: time elapsed since createdAt
    e.g., "14 min ago" / "2 hr ago"
    (calculate from createdAt vs current time using Date)

  COLUMN — ACTIONS:
    Display: flex, gap: 6px

    CALL BUTTON (if phone available and status === 'converted'):
      Background: rgba(5,150,105,0.12), border 1px solid rgba(5,150,105,0.3)
      Border-radius 6px, padding 6px 12px
      DM Mono 11px color #059669 font-weight 700: "CALL →"
      On click: console.log({ event: 'wm_admin_call_initiated', leadId })
      Opens tel: link: window.open('tel:' + phone)
      After click: show status update prompt (see below)

    VIEW BUTTON (all converted leads):
      Background: rgba(0,153,187,0.12), border 1px solid rgba(0,153,187,0.3)
      Border-radius 6px, padding 6px 12px
      DM Mono 11px color #00D9FF: "VIEW"
      On click: expand the row inline to show full lead details (see below)

    STATUS UPDATER (small dropdown, appears after CALL click):
      Background: #0A1628, border 1px solid rgba(255,255,255,0.12)
      Border-radius 6px, DM Mono 11px color #C8D8E8
      Options: "Mark as called" / "Scheduled" / "Closed — won" / "Closed — lost"
      On select: update that lead's status in local state, log event

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXPANDED LEAD ROW (on VIEW click)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When a row is expanded (toggle on VIEW click):
Below the row, an expanded panel slides down (animate height: 0→auto):

Background: rgba(0,153,187,0.04)
Border: 1px solid rgba(0,153,187,0.15)
Border-radius: 0 0 10px 10px
Padding: 20px 16px

Layout: grid-cols-3 desktop, single-col mobile, gap: 20px

PANEL 1 — Contact:
  Label: DM Mono 10px #405060: "CONTACT INFO"
  Email: DM Mono 12px #C8D8E8
  Phone: DM Mono 12px #C8D8E8
  "Copy phone" link: DM Mono 11px #00D9FF underline

PANEL 2 — Qualification:
  Label: DM Mono 10px #405060: "THEIR ANSWERS"
  Show each answer as a row:
  DM Mono 10px #405060: "[key]:" + DM Mono 12px #C8D8E8: "[value]"
  windowCount, projectType, county, quoteRange each on own line
  
  Call script hint:
  Background rgba(200,149,42,0.08), border-radius 6px, padding 10px 12px, margin-top 12px
  DM Mono 10px #C8952A: "CALL OPENER:"
  DM Sans 12px #C8D8E8 italic: 
    "Hi [firstName], I'm calling from WindowMan about the quote analysis 
     you ran for your [projectType] project in [county] County. 
     We found [flagCount] issue[s] in your quote — the biggest one was [topFlag]."

PANEL 3 — Audit Summary:
  Label: DM Mono 10px #405060: "AUDIT RESULTS"
  Grade: large [letter] in grade color, DM Mono 20px bold
  Delta: DM Mono 14px [color]: "+$[dollarDelta]"
  Flags: numbered list, DM Mono 12px #C8D8E8
  Share link: DM Mono 11px #00D9FF underline:
    "View shared report →" (opens /report/[id] in new tab)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE CARD VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

On mobile (< 768px), replace table with stacked lead cards:

Each card:
  Background: rgba(255,255,255,0.03)
  Border: 1px solid rgba(255,255,255,0.07)
  Border-left: 4px solid [grade color or #405060 for shadow]
  Border-radius: 10px, padding: 16px, margin-bottom: 10px

  Row 1: flex justify-between
    Left: DM Mono 13px white font-weight 700: "[firstName]"
    Right: grade circle (28px) + status badge

  Row 2: DM Mono 11px #405060: "[county] · [windowCount] · [quoteRange]"

  Row 3 (if grade): flex align-items-center gap-8
    DM Mono 13px [delta color]: "+$[delta]"
    "·"
    DM Mono 11px #DC2626: "⚑ [flagCount] flags" (if any)

  Action bar: flex gap-8 margin-top 12px
    CALL button (if available)
    VIEW button
    Same styling as desktop actions
```

---

# ════════════════════════════════════════════════
# ROUTING + STATE UPDATE
# Final wiring for Phase 4
# ════════════════════════════════════════════════

```
Update App.jsx to integrate Phase 4 components and routing.

INSTALL React Router:
  npm install react-router-dom
  
  Wrap the entire app in <BrowserRouter> in main.jsx (or index.jsx):
    import { BrowserRouter } from 'react-router-dom'
    ReactDOM.createRoot(...).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

UPDATE App.jsx — add routing:
  Import: { Routes, Route, useLocation } from 'react-router-dom'
  
  App component now returns:
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/report/:reportId" element={<SharedReportPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  
  Extract current homepage content into a <HomePage /> component.
  This keeps App.jsx clean.

ADD TO HOMEPAGE (inside <HomePage /> component):

  NEW STATE:
    const [stepsCompleted, setStepsCompleted] = useState(0)
    Update stepsCompleted whenever TruthGateFlow advances a step:
    Pass onStepComplete={(n) => setStepsCompleted(n)} prop to TruthGateFlow

  ADD COMPONENTS after <ClosingManifesto />:
    <StickyRecoveryBar
      stepsCompleted={stepsCompleted}
      county={answers.county || 'Florida'}
      isVisible={!leadCaptured && stepsCompleted >= 0}
    />
    
    <ExitIntentModal
      stepsCompleted={stepsCompleted}
      answers={answers}
      isVisible={exitIntentTriggered}
      onClose={() => setExitIntentTriggered(false)}
      onCTAClick={() => {
        setExitIntentTriggered(false)
        document.getElementById('truth-gate')?.scrollIntoView({ behavior: 'smooth' })
      }}
    />

  EXIT INTENT LISTENER (add useEffect in HomePage):
    useEffect(() => {
      const handleMouseLeave = (e) => {
        if (e.clientY < 20 && !leadCaptured && !exitIntentShownThisSession) {
          setExitIntentTriggered(true)
          setExitIntentShownThisSession(true)
          sessionStorage.setItem('wm_exit_shown', 'true')
          console.log({ event: 'wm_exit_intent_triggered', stepsCompleted })
        }
      }
      const alreadyShown = sessionStorage.getItem('wm_exit_shown')
      if (!alreadyShown) {
        document.addEventListener('mouseleave', handleMouseLeave)
      }
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }, [leadCaptured, stepsCompleted])

    Add useState: exitIntentTriggered (bool, default false)
    Add useState: exitIntentShownThisSession (bool, from sessionStorage check)

ANALYTICS EVENTS — add to existing list:
  'wm_recovery_bar_shown' — fires when StickyRecoveryBar becomes visible,
    include: { stepsCompleted, timeOnPage }
  'wm_recovery_bar_clicked' — fires on CTA click, include stepsCompleted
  'wm_recovery_bar_dismissed' — fires on X click
  'wm_exit_intent_triggered' — fires on exit detection, include stepsCompleted
  'wm_exit_modal_dismissed' — fires on X or "leave anyway" click
  'wm_exit_modal_converted' — fires on CTA click inside modal
  'wm_shared_report_opened' — fires on SharedReportPage mount, include reportId
  'wm_viral_cta_clicked' — fires on viral CTA in SharedReportPage
  'wm_admin_viewed' — fires on AdminDashboard successful auth
  'wm_admin_call_initiated' — fires on CALL button click, include leadId + grade

QUALITY CHECKS:
[ ] StickyRecoveryBar does NOT appear when leadCaptured = true
[ ] StickyRecoveryBar correctly reflects stepsCompleted (0-4 circles)
[ ] ExitIntentModal only fires once per session (sessionStorage gate works)
[ ] ExitIntentModal Variant C (stepsCompleted=4) shows the mini inline form
[ ] SharedReportPage /report route works independently from homepage
[ ] SharedReportPage viral CTA navigates to "/" (homepage)
[ ] @media print styles hide viral section and buttons in SharedReportPage
[ ] AdminDashboard password gate uses sessionStorage (survives navigation, not refresh)
[ ] Admin table sort works for all 4 sort options
[ ] Admin filter buttons correctly filter the lead list
[ ] Expanded lead row shows the personalized call script
[ ] CALL button opens tel: link on mobile
[ ] D/F grade rows have the subtle red row background in admin table
[ ] All new analytics events log at correct trigger moments
```

---

## PHASE 4 COMPLETE — FULL SYSTEM SUMMARY

```
WHAT EXISTS AFTER PHASE 4:

USER-FACING FUNNEL (mobile-first, light theme):
  / (homepage)
    ↓ LinearHeader (zero nav)
    ↓ AuditHero (dual CTA, grade preview card)
    ↓ SocialProofStrip (dark band, animated counters)
    ↓ TruthGateFlow (4-step state machine → lead gate → upload)
    ↓ IndustryTruth (education, dark statement block)
    ↓ ProcessSteps (5-step timeline, deliverables list)
    ↓ NarrativeProof (Maria + David stories, transition block)
    ↓ ClosingManifesto (manifesto + final CTA)
    ↓ StickyRecoveryBar [PHASE 4] (fixed bottom, stepsCompleted-aware)
    ↓ ExitIntentModal [PHASE 4] (one-time exit detection, 3 variants)

POST-SCAN FLOW (appears after upload + OTP):
    ↓ GradeReveal (grade + delta + flags + negotiation script)
    ↓ ContractorMatch (3 vetted contractor cards + trust bridge)
    ↓ EvidenceLocker (personal vault + future self scenarios)

DISTRIBUTION LAYER:
  /report/:reportId [PHASE 4]
    → SharedReportPage (forensic document aesthetic)
    → Certificate-style grade + flags
    → Viral CTA at bottom (recipient scans their own quote)
    → Print-to-PDF ready

OPERATIONS LAYER:
  /admin [PHASE 4]
    → Password-gated
    → 4 stat cards (leads, avg delta, grade mix, conversion rate)
    → Filterable, sortable lead table
    → Expandable lead rows with personalized call scripts
    → Direct CALL button with status tracking

PSYCHOLOGICAL SYSTEMS ACTIVE:
  → Zeigarnik recovery: StickyRecoveryBar names incompleteness precisely
  → Loss aversion: ExitIntentModal quantifies what they're leaving
  → Viral loop: SharedReportPage converts report recipients into new leads
  → Sales intelligence: Admin call scripts use lead's own answers
```

*End of WindowMan.pro Phase 4 — The Conversion Ecosystem*
*Components: C-14 + C-15 + C-16 + C-17 + Routing Update = 5 prompt blocks*
*Send order: C-14 → C-15 → C-16 → C-17 → Routing Update*
