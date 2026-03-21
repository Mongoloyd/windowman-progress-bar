# WINDOWMAN.PRO — COMPLETE BUSINESS MODEL ARCHITECTURE
## Strategic Realignment + Revised Component Specs
## The Market Maker Model — Full System Rewrite

---

# PART 1: THE TRUTH ABOUT WHAT WINDOWMAN IS

Before writing a single component, every future build decision must be filtered
through this business model map. Print this. Pin it up.

---

## THE ACTUAL FLYWHEEL

```
FACEBOOK AD
"Is your impact window quote fair?"
(visceral creative, scroll-stopping)
        ↓
TWO AUDIENCES LAND ON THE PAGE:

AUDIENCE A — THE MONEY LEAD (20% of traffic, 80% of revenue)
"I just got a quote. I didn't sign it. Something felt off."
They already did the hard part. They have a document.
They are ACTIVELY shopping. They have high urgency.
The pixel is specifically trained to find these people.
This is the rarest, most valuable person on the internet
for a window contractor. WindowMan is the only entity
in the country with a pixel optimized to find them.

AUDIENCE B — THE INTENTION LEAD (80% of traffic, future revenue)
"I'm thinking about windows. I saw the ad. I clicked."
They don't have a quote. They're early.
They're going to buy eventually.
Capturing their intention NOW means WindowMan
owns this person before any contractor touches them.
        ↓
BOTH AUDIENCES: GET THEIR CONTACT INFO
        ↓
WEBHOOK FIRES IMMEDIATELY
AI voice agent calls within minutes:
  Flow A: "I reviewed your quote. We found [X]. 
           Want a free estimate from a contractor who'll beat it?"
  Flow B: "You're in the early stages — perfect timing. 
           Can we schedule a free measurement so you have 
           a baseline before you get any quotes?"
        ↓
THE CLIENT CONTRACTOR GETS:
  Flow A: The homeowner's ACTUAL COMPETING QUOTE
           + the AI analysis of every weakness in it
           + the homeowner's contact info
           + the homeowner pre-educated on why the quote is overpriced
           This is the warmest lead a contractor salesman
           has ever walked into. The deal is half-closed before
           they ring the doorbell.

  Flow B: A homeowner who is pre-sold on WindowMan's authority,
           hasn't spoken to any competitor,
           and has requested a free measurement.
           The contractor IS the first quote.
           There is no competition.
        ↓
CONTRACTOR CLOSES THE DEAL
        ↓
WINDOWMAN EARNS 6–8% OF THE SALE
```

---

## THE MARKET MAKER TRUTH

WindowMan is not a lead generation service.
WindowMan is not an affiliate marketer.
WindowMan is not a SaaS tool.

WindowMan is a **market maker** — a trusted neutral party that
sits between buyers and sellers, gives real intelligence to both sides,
and earns a transaction fee when a deal closes.

The homeowner gets: a genuine audit, a better price, peace of mind.
The contractor gets: pre-qualified, pre-educated, pre-sold prospects.
WindowMan gets: 6-8% of every closed sale.

**This is the ethos that should appear on the page.**
Not "AI scan tool." Not "quote checker."
The positioning is: *"We keep both sides honest."*
That is the transparency play. That is the trust weapon.

---

## THE UNIQUE COMPETITIVE MOAT

There is one sentence in this business model that no competitor can replicate:

*"I am the only marketer in the country with a Facebook pixel 
 specifically optimized to find people who just got a window quote."*

This is not a feature. This is a category creation statement.
The pixel training is the moat. Every scan that comes in trains it further.
Every Flow A converter makes the next campaign more accurate.
The business gets stronger with every lead — not just richer.

---

# PART 2: WHAT THIS CHANGES IN THE BUILD

---

## CHANGE 1: THE "WHY THIS WORKS" PAGE SECTION
(NEW — Insert between IndustryTruth and ProcessSteps)

```
Build a React component called <MarketMakerManifesto />.

PURPOSE: The "how this actually works" transparency section.
This is the section that converts skeptics and builds category authority.
It explains the WindowMan model in plain language — which is itself
the trust mechanism. Transparency IS the pitch.

The psychological principle at work: The Pratfall Effect + Unity.
Explaining your business model openly signals you have nothing to hide.
It also reframes the homeowner's relationship to WindowMan — they're not
a lead being captured, they're a participant in a system that benefits them.

LAYOUT:
  Background: #0F1F35
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Eyebrow: DM Mono 11px #0099BB letter-spacing 0.1em text-center margin-bottom 20px:
  "HOW WINDOWMAN ACTUALLY WORKS"
  
  Headline: Playfair Display 36px mobile, 46px desktop 
  color white font-weight 700 text-center max-width 700px mx-auto:
  "We keep both sides honest."
  Margin-bottom: 14px
  
  Sub: DM Sans 18px color #D1D5DB text-center line-height 1.7 
  max-width 600px mx-auto margin-bottom 56px:
  "Most services profit from information asymmetry. 
   WindowMan profits from eliminating it."

THE THREE-PARTY DIAGRAM:
  A visual showing the three parties and the value flow.
  Max-width: 720px, mx-auto, margin-bottom: 56px

  Three nodes in a row (flex or grid-cols-3):
  
  NODE 1 — HOMEOWNER:
    Circle: 72px, background rgba(5,150,105,0.15), 
    border 2px solid rgba(5,150,105,0.4), border-radius 50%
    Icon: 🏠 or home SVG, 28px color #059669, centered
    Label below: DM Sans 14px font-weight 700 color white: "You"
    Sub: DM Sans 12px color #94A3B8: "The homeowner"
  
  CONNECTOR ARROW 1 (between Node 1 and Node 2):
    Horizontal arrow → on desktop, vertical on mobile
    Above arrow: DM Mono 10px #C8952A: "your quote + contact info"
    Below arrow: DM Mono 10px #059669: "free AI analysis + better price"
  
  NODE 2 — WINDOWMAN (center, slightly larger):
    Circle: 88px, background rgba(200,149,42,0.15), 
    border 2px solid rgba(200,149,42,0.5), border-radius 50%
    Text inside: DM Mono 18px font-weight 900 color #C8952A: "WM"
    Label below: DM Sans 14px font-weight 700 color white: "WindowMan"
    Sub: DM Sans 12px color #94A3B8: "The market maker"
  
  CONNECTOR ARROW 2 (between Node 2 and Node 3):
    Above arrow: DM Mono 10px #C8952A: "warm lead + quote intel"
    Below arrow: DM Mono 10px #059669: "6–8% on closed sales only"
  
  NODE 3 — CONTRACTOR:
    Circle: 72px, background rgba(0,153,187,0.15), 
    border 2px solid rgba(0,153,187,0.4), border-radius 50%
    Icon: 🔨 or contractor SVG, 28px color #0099BB
    Label: DM Sans 14px font-weight 700 color white: "The Contractor"
    Sub: DM Sans 12px color #94A3B8: "Vetted. Fair-priced."

THE EXPLANATION BLOCKS:
  Grid: grid-cols-1 mobile, grid-cols-3 desktop, gap: 24px, margin-top: 40px

  BLOCK 1 — FOR HOMEOWNERS:
    Background: rgba(5,150,105,0.08)
    Border: 1px solid rgba(5,150,105,0.2)
    Border-radius: 12px, padding: 24px
    
    Icon: ✓ in circle, 36px, #059669
    Heading: DM Sans 17px font-weight 700 color white margin-top 12px:
      "What you get — free"
    
    List (DM Sans 14px color #D1D5DB line-height 1.8 margin-top 12px):
      • A forensic AI analysis of your quote
      • Fair-market benchmarks for your county
      • Every red flag identified and explained
      • A negotiation script built for your specific situation
      • An introduction to a contractor who'll beat your price
         — only if you want it

    Bottom note: DM Mono 11px #6B7280 italic margin-top 14px:
      "We earn nothing unless you choose to work with our contractor 
       and they close your project."

  BLOCK 2 — THE HONEST BUSINESS MODEL:
    Background: rgba(200,149,42,0.08)
    Border: 1px solid rgba(200,149,42,0.2)
    Border-radius: 12px, padding: 24px
    
    Icon: ⚖ or scales SVG, 36px, #C8952A
    Heading: "How we make money"
    
    Body (DM Sans 14px color #D1D5DB line-height 1.8 margin-top 12px):
      "WindowMan earns a percentage of the sale — only when a
       homeowner chooses to work with one of our contractors
       and the project is completed.
       
       We never charge homeowners. We never charge for the scan.
       We never get paid for sending a lead.
       
       We only get paid when you get a better price than you
       would have gotten without us. That's the only model
       that keeps us honest."
    
    Bottom note: DM Mono 11px #6B7280 italic margin-top 14px:
      "If your current quote is already fair, we'll tell you that too."

  BLOCK 3 — FOR CONTRACTORS:
    Background: rgba(0,153,187,0.08)
    Border: 1px solid rgba(0,153,187,0.2)
    Border-radius: 12px, padding: 24px
    
    Icon: 📊 or chart SVG, 36px, #0099BB
    Heading: "What our contractors receive"
    
    Body (DM Sans 14px color #D1D5DB line-height 1.8 margin-top 12px):
      "Every homeowner we introduce has already been educated
       on fair-market pricing. They've seen the red flags in
       competing quotes. They understand the value of brand
       specifications and proper warranties.
       
       Our contractors don't walk into cold calls.
       They walk into conversations that are already halfway won."
    
    Bottom note: DM Mono 11px #6B7280 italic margin-top 14px:
      "We work with a small number of vetted contractors per county."

CLOSING LINE:
  Margin-top: 48px text-align center
  Playfair Display 22px color #C8952A font-weight 700 font-style italic:
  "The industry profits from you not knowing. We profit from you knowing."
```

---

## CHANGE 2: CONTRACTOR MATCH REFRAME (C-12 UPDATE)

The current ContractorMatch presents THREE contractor cards as if WindowMan
is a marketplace. That's the wrong model. WindowMan has ONE client contractor
(or a small vetted network per county). The experience should feel like a
trusted advisor making ONE introduction — not a comparison shopping engine.

A comparison engine creates friction (which one do I pick?) and signals
marketplace dynamics (they're competing for my business, I should keep
shopping). That's the opposite of what we want.

```
UPDATE ContractorMatch:

REMOVE: The three-column contractor card grid
REPLACE WITH: A single "Personal Introduction" card

NEW FRAMING:

After Grade C/D/F reveal:

Eyebrow: DM Mono 11px #0099BB: "YOUR WINDOWMAN INTRODUCTION"

Headline: Playfair Display 36px white font-weight 700:
  "I found a contractor who will do this job for less."

Sub: DM Sans 17px #D1D5DB line-height 1.75 max-width 580px mx-auto margin-top 14px:
  "Based on your grade and the red flags in your quote, I've 
   identified a [county] County contractor in our network who 
   covers your scope at fair-market pricing.
   
   I'd like to make an introduction."

THE INTRODUCTION CARD:
  Background: rgba(255,255,255,0.06)
  Border: 1px solid rgba(200,149,42,0.4)
  Border-radius: 14px, padding: 32px 28px
  Max-width: 480px, mx-auto, margin-top: 32px
  
  TOP SECTION: flex, align-items: center, gap: 16px
    Avatar: 64px circle, background rgba(200,149,42,0.15),
    border 2px solid #C8952A
    "WM" text or contractor initial, DM Mono 20px bold #C8952A
    
    Right of avatar:
    DM Sans 16px font-weight 700 white: "WindowMan Verified Contractor"
    DM Sans 13px #94A3B8: "[county] County, Florida · Vetted Q1 2025"
    
    Verification badges: flex flex-wrap gap-2 margin-top 8px
    Each badge: background rgba(5,150,105,0.15) border rgba(5,150,105,0.3)
    border-radius 999px padding 3px 10px DM Sans 11px #6EE7B7 font-weight 600:
    "✓ Fair-market priced" · "✓ Brand-specified quotes" · "✓ 3yr labor warranty"
  
  DIVIDER: margin 20px 0, border-top 1px solid rgba(255,255,255,0.08)
  
  WHAT HAPPENS SECTION:
    DM Mono 10px #6B7280 letter-spacing 0.1em margin-bottom 12px: "WHAT HAPPENS NEXT"
    
    Three steps (DM Sans 14px #D1D5DB line-height 1.9):
    "1. I pass your project details to our contractor — 
        including your grade report and the issues we found.
     2. They'll reach out to schedule a free measurement.
     3. Their quote comes in writing with every specification named."
    
  CTA BUTTON (full-width, margin-top 24px):
    Background: #C8952A, color white
    DM Sans 17px font-weight 700, height 54px, border-radius 10px
    Text: "Yes — Make the Introduction →"
    On click: console.log({ event: 'wm_contractor_intro_requested', grade, dollarDelta })
    Then show: success state (see below)
  
  AUTONOMY LINE: DM Sans 12px #6B7280 text-center margin-top 12px italic:
    "No obligation. The estimate is free. 
     You're under no pressure to accept it."

SUCCESS STATE (after CTA click):
  Card content replaces with:
  
  Green circle checkmark (72px, #059669)
  Heading: DM Sans 20px font-weight 700 color #0F1F35 margin-top 16px:
    "Introduction requested."
  
  Body: DM Sans 14px #374151 line-height 1.8 margin-top 12px:
    "I've flagged your project. Our contractor will reach out 
     within 2 business hours to schedule your free measurement.
     
     They already have your grade report. They know what 
     your current quote missed. The conversation starts 
     where most conversations end."
  
  Bottom note: DM Mono 11px #9CA3AF margin-top 16px:
    "You can still use your negotiation script with your 
     current contractor. Having options is the point."

AFTER GRADE A/B (different version):
  Headline: "Your quote scored [grade]. It's competitive."
  Sub: "You're in a good position. Before you sign — 
        here's the one question worth asking about the warranty."
  No contractor card shown — instead show the warranty tip from
  the ForensicChecklist, with a soft "request a comparison quote 
  anyway" text link below.
```

---

## CHANGE 3: THE AI AGENT WEBHOOK — DOCUMENT THE HANDOFF

This is the component that doesn't exist in the UI but is the most 
important conversion event in the system. Document it so Lovable 
can build the admin trigger and the webhook firing logic.

```
THE WEBHOOK ARCHITECTURE:

TRIGGER: leadCaptured = true AND phone verified (OTP confirmed)
FIRES: POST to webhook endpoint (Zapier/Make/n8n → CRM → AI agent queue)

PAYLOAD:
{
  event: 'wm_lead_ready_for_ai_call',
  lead: {
    id, firstName, email, phone, county, windowCount,
    projectType, quoteRange, flowType ('A' or 'B'),
    grade (null if Flow B), dollarDelta (null if Flow B),
    flagCount (null if Flow B), topFlag (null if Flow B),
    auditId (null if Flow B), appointmentDate (Flow B only),
    createdAt, sourceAdId, utmCampaign
  },
  priority: calculated as:
    flowType === 'A' && (grade === 'D' || grade === 'F') → 'P1'
    flowType === 'A' && grade === 'C' → 'P2'
    flowType === 'B' && appointmentDate within 48h → 'P1'
    flowType === 'B' → 'P2'
    flowType === 'A' && (grade === 'A' || grade === 'B') → 'P3'
}

AI AGENT CALL SCRIPTS:

FLOW A — GRADE D/F (Priority 1):
"Hi, is this [firstName]? 
This is [agent name] from WindowMan — you ran a quote analysis 
on our site a few minutes ago.

I wanted to reach out personally because your quote came back 
with a grade [grade]. We found [flagCount] issues — the main one 
was [topFlag], and your quote was $[dollarDelta] above what we're 
seeing in [county] County right now.

The reason I'm calling is that we work with a contractor in 
[county] who does this exact scope of work. They'd come in 
significantly below your current quote — and every spec would 
be in writing.

Would it be worth a free measurement to get a comparison number?"

FLOW A — GRADE C (Priority 2):
"Hi [firstName], this is [agent] from WindowMan. You just ran 
your quote through our analysis tool.

Your quote came back as a grade C — it's not terrible, but we 
found [flagCount] items that could create issues, and the price 
is about $[dollarDelta] above the [county] market average.

We have a contractor in our network who covers your scope. 
A free measurement would give you a real comparison. 
Would that be useful?"

FLOW B (Priority 2):
"Hi [firstName], this is [agent] from WindowMan.

You visited our site and generated a fair-market baseline for 
your [county] County project — [windowCount] windows.

I'm calling because for homeowners in your stage, we can actually 
send a contractor out for a free measurement BEFORE you start 
getting other quotes. That way your first quote is from someone 
we've already vetted for fair pricing.

Would you be open to scheduling that? Takes about 20 minutes, 
completely free, no obligation."

FLOW A — GRADE A/B (Priority 3 — email only, no immediate call):
Email subject: "Your WindowMan grade: [grade] — one thing to check before you sign"
Body: "Good news — your quote scored [grade]. Here's one warranty 
question worth confirming in writing before you finalize..."
No call. High-grade homeowners don't need rescue — they need a nudge.
```

---

## CHANGE 4: ADMIN DASHBOARD REBUILD (C-17 REVISED)

The current admin treats all leads equally. The revised admin is a 
SALES OPERATIONS TOOL. The primary view is a call queue, not a table.

```
BUILD: Replace the AdminDashboard default view with a PRIORITY CALL QUEUE.

LAYOUT CHANGE:
  Add tabs at the top of the content area:
  [CALL QUEUE] [ALL LEADS] [PIPELINE] [STATS]

TAB 1 — CALL QUEUE (default tab):

  TITLE: DM Mono 13px #C8952A: "PRIORITY CALL QUEUE"
  Sub: DM Sans 12px #405060: "Sorted by conversion urgency. Call these first."

  Three priority sections:

  SECTION P1 — "CALL NOW" (red header):
    Background: rgba(220,38,38,0.06)
    Border-left: 3px solid #DC2626
    Header: DM Mono 11px #DC2626 letter-spacing 0.1em padding 10px 16px:
    "● P1 — CALL IMMEDIATELY · [count] leads"
    Sub: DM Mono 10px #405060 padding-left 16px margin-top -6px:
    "Flow A grade D/F · Flow B appointment within 48hrs"
    
    Each P1 lead card (compact, action-forward):
    Background: rgba(220,38,38,0.04), border-bottom 1px solid rgba(255,255,255,0.04)
    Padding: 14px 16px
    
    Layout: grid, 4 columns on desktop
    Col 1: firstName + DM Mono 10px #DC2626: flowType + grade or "FLOW B"
    Col 2: DM Sans 13px #C8D8E8: county + scope + quoteRange
    Col 3: if Flow A: DM Mono 14px #DC2626 font-weight 700: "+$[delta]"
           if Flow B: DM Mono 12px #C8952A: "EARLY STAGE · No quote yet"
    Col 4: CALL button + time since capture

    CALL SCRIPT BUTTON (beside CALL):
      Text: "SCRIPT ▼" — on click toggles the call script dropdown
      Dropdown shows the exact script for this lead type
      DM Sans 13px white italic, background rgba(255,255,255,0.04) 
      border 1px solid rgba(255,255,255,0.08), border-radius 8px, padding 16px

  SECTION P2 — "CALL TODAY":
    Same structure, border-left #C8952A, header in #C8952A
    "Flow A grade C · Flow B general · Flow A no upload after gate"

  SECTION P3 — "EMAIL SEQUENCE":
    Same structure, border-left #405060, header in #405060
    "Flow A grade A/B · Flow B appointment > 48hrs out"
    No CALL button — EMAIL button instead
    Clicking EMAIL: opens pre-written email in a modal

TAB 2 — ALL LEADS:
  The existing table view from C-17 (keep as-is, just moved to this tab)
  Add FLOW column: badge showing "A" or "B"
  Add PRIORITY column: P1 / P2 / P3 badge

TAB 3 — PIPELINE:
  Flow B specific tracking
  Shows each Flow B lead as a pipeline card:
  
  STAGES (horizontal columns, kanban-style):
  "BASELINE CAPTURED" → "CALLED" → "CALL ANSWERED" → 
  "INTRO OFFERED" → "MEASUREMENT SCHEDULED" → 
  "QUOTE UPLOADED" → "GRADE REVEALED" → "CLOSED"
  
  Each stage column shows count + lead cards
  Lead card: firstName, county, windowCount, days since capture
  Drag between stages OR click to update status
  
  When a Flow B lead moves to "QUOTE UPLOADED" —
  that card gets highlighted gold and a "FULL AUDIT READY" badge
  This is the moment Flow B becomes Flow A in the system

TAB 4 — STATS:
  Keep existing stat cards from C-17
  Add:
  Flow A conversion: [converted / total Flow A] %
  Flow B conversion: [measurement scheduled / total Flow B] %
  Avg time to P1 call: [avg minutes from capture to first call]
  Flow B → Flow A rate: [% of Flow B leads who eventually upload quote]
  Closed sale rate: [closed / total introduced to contractor]
  Est. revenue: [closed count × avg sale × 0.07]
```

---

## CHANGE 5: THE FLOW B → FLOW A CONTINUITY MOMENT

When a Flow B lead returns to upload their quote (after the QuoteWatcher
SMS fires or they come back organically), the page should RECOGNIZE them.

```
RETURNING USER DETECTION:
  On page load: check localStorage for keys:
  'wm_flow_b_county', 'wm_flow_b_window_count', 'wm_baseline_captured'
  
  If these keys exist AND flowMode === 'A' (default):
    Show a RECOGNITION BANNER at top of TruthGateFlow:
    
    Background: #FDF3E3, border: 1.5px solid #C8952A, border-radius 10px,
    padding: 16px 20px, margin-bottom 20px
    
    Display: flex, align-items: center, gap: 14px
    
    Left icon: 🔔 bell, 24px, color #C8952A
    
    Content:
    DM Sans 15px font-weight 700 color #0F1F35:
      "Welcome back — your baseline is loaded."
    DM Sans 13px color #374151 margin-top 4px:
      "County: [county] · [windowCount] windows · 
       Fair market: [baselineLow]–[baselineHigh]"
    DM Sans 13px color #6B7280 margin-top 4px:
      "Upload your quote and we'll grade it against your baseline."
    
    Right: small "×" to dismiss banner
    
  ALSO: Pre-fill county in TruthGateFlow Step 3 from localStorage
  ALSO: Pre-fill windowCount range in Step 1 from localStorage
  This makes Flow B returning users skip the questions they already answered
  and feel the recognition of a system that remembers them.
```

---

## CHANGE 6: THE "EARLY VISITOR" SURPRISE MOMENT IN THE HERO

The current hero has TWO CTAs side by side of equal visual weight.
The "I Don't Have a Quote Yet" button is secondary — smaller, less prominent.

Given that Flow B is 80% of traffic and the PRIMARY lead type for 
the business, we need to rethink the visual hierarchy.

NOT by making Flow B visually dominant (that would confuse Flow A users
who are the highest-value immediate converters) — but by making the
"I Don't Have a Quote Yet" button feel like a discovery rather than a consolation.

```
HERO CTA BLOCK UPDATE:

PRIMARY CTA: "Scan My Quote — It's Free" (gold, same as now)

SECONDARY CTA — CHANGE THE COPY:
  OLD: "I Don't Have a Quote Yet →"
  NEW: "Getting Quotes Soon? We Can Arm You First →"
  
  Visual: Same styling (border button), but add a small ★ badge 
  or "NEW" tag before the text — something that signals this is 
  an interesting path, not a lesser one.
  
  Subtext under the secondary CTA (NEW — didn't exist before):
  DM Sans 12px color #6B7280 text-center margin-top 6px:
  "Generate your fair-market baseline before the contractor arrives"
  
  This subtext does two things:
  1. It explains what Flow B IS so the right people self-select
  2. It makes Flow B feel like a proactive power move, not a fallback
```

---

## CHANGE 7: THE TRUST MANIFESTO COPY THROUGHOUT

Every piece of copy that currently says "we'll connect you with a contractor"
or "request an introduction" needs to carry the market maker framing:

REPLACE everywhere:
  "vetted contractor" → "contractor in our network"
  "we'll introduce you" → "I'll make the introduction"
  "3 contractors available" → "we have availability in [county]"

ADD everywhere near contractor match:
  The commission disclosure: "WindowMan earns a percentage of the 
  sale if you choose to work with our contractor. We never charge you."
  (This is the Pratfall Effect — disclosing the model increases trust
  dramatically and removes the "what's the catch" objection)

---

# PART 3: WHAT DOES NOT CHANGE

The following components are correct as built and require no revision:

✅ LinearHeader — zero-leak is correct
✅ SocialProofStrip — data signals are correct
✅ TruthGateFlow — the 4-step engine is correct
✅ ScanTheatrics — the theatre is correct
✅ GradeReveal (all 5 sections) — the grade report is correct
✅ ForensicChecklist — the 5 questions are correct
✅ QuoteWatcher — the appointment engine is correct
✅ StickyRecoveryBar — the recovery logic is correct
✅ Exit Intent Modal — correct
✅ Shared Report Page — correct (viral loop works for both flows)

---

# PART 4: THE REVISED BUILD ORDER

Given the business model clarification, here is the ACTUAL priority order
for what to build next in Lovable:

```
IMMEDIATE (these unlock the revenue):
1. MarketMakerManifesto (NEW — trust + transparency section)
2. ContractorMatch REVISED (single introduction, not marketplace)
3. Admin REVISED (call queue as primary view, pipeline tab for Flow B)
4. Webhook payload documentation (AI agent handoff)
5. Hero secondary CTA copy update + subtext

NEXT SPRINT (these compound the funnel):
6. Returning user recognition banner (Flow B → Flow A continuity)
7. Flow B vault state update (EvidenceLocker)
8. Admin pipeline kanban (Flow B stages)

LATER (optimization, not core):
9. Nurture email templates (3-email sequence for Flow B)
10. A/B test variants on hero headline
```

---

# PART 5: THE ONE-SENTENCE POSITIONING STATEMENT

Every page, every component, every word should be filterable through this:

**"WindowMan helps Florida homeowners not get screwed on impact window 
quotes — and when we find a better deal, we make the introduction."**

That is the product. That is the promise. That is the pitch.
Everything on the page is either delivering that promise or building
the trust required to believe it.

---

# PART 6: THE COMPLETE LOVABLE PROMPT FOR CHANGE 1
# <MarketMakerManifesto />

```
Build a React component called <MarketMakerManifesto />.

Insert this component in the page ORDER between IndustryTruth and ProcessSteps.
It is the bridge between "why the industry is broken" and "how WindowMan fixes it."

PURPOSE: Radical transparency about the business model. 
This section does what no competitor would dare do: it explains 
exactly how WindowMan makes money, why that model keeps it honest,
and what all three parties in the transaction receive.

The psychological engine: The Pratfall Effect.
A company willing to explain its own business model openly signals
it has nothing to hide. This destroys the "what's the catch" objection
before it forms — which is the #1 conversion killer for any free tool.

LAYOUT:
  Background: #0F1F35
  Padding: py-20 px-4 mobile, py-28 px-8 desktop
  Max-width: max-w-5xl mx-auto

SECTION HEADER:
  Small decorative element: a horizontal line 48px, 1px, rgba(200,149,42,0.4), centered
  Margin-bottom: 24px

  Eyebrow: DM Mono 11px #0099BB letter-spacing 0.12em text-center margin-bottom 20px:
  "HOW WINDOWMAN ACTUALLY WORKS"

  Headline: Playfair Display 36px mobile, 46px desktop color white 
  font-weight 700 text-center line-height 1.2 max-width 680px mx-auto margin-bottom 16px:
  "We keep both sides honest."

  Sub: DM Sans 18px color #94A3B8 text-center line-height 1.7 
  max-width 560px mx-auto margin-bottom 56px:
  "Most services profit from information asymmetry.
   WindowMan profits from eliminating it."

FLOW DIAGRAM:
  Max-width: 700px, mx-auto, margin-bottom: 56px

  Three nodes in a row with connecting arrows:
  flex items-center justify-between on desktop
  flex-col items-center gap-4 on mobile

  NODE 1 — YOU (the homeowner):
    Circle: 80px × 80px border-radius 50%
    Background: rgba(5,150,105,0.12)
    Border: 2px solid rgba(5,150,105,0.35)
    Inside: home icon SVG 32px color #059669 centered

    Label: DM Sans 15px font-weight 700 color white margin-top 12px text-center: "You"
    Sub: DM Sans 12px color #6B7280 text-center: "Florida homeowner"

  ARROW 1 (between node 1 and 2):
    Desktop: horizontal arrow → (→ unicode or SVG), color #C8952A, 32px
    Mobile: ↓ vertical, 24px
    Two labels on arrow — above and below:
    Above: DM Mono 10px #C8952A: "quote + intent"
    Below: DM Mono 10px #059669: "free analysis + better price"

  NODE 2 — WINDOWMAN (center, enlarged):
    Circle: 96px × 96px
    Background: rgba(200,149,42,0.12)
    Border: 2px solid rgba(200,149,42,0.5)
    Box-shadow: 0 0 24px rgba(200,149,42,0.15)
    Inside: "WM" DM Mono 22px font-weight 900 color #C8952A centered

    Label: DM Sans 15px font-weight 700 color white margin-top 12px: "WindowMan"
    Sub: DM Sans 12px color #6B7280: "The market maker"

  ARROW 2 (between node 2 and 3):
    Above: DM Mono 10px #C8952A: "warm lead + intel"
    Below: DM Mono 10px #059669: "% of closed sales only"

  NODE 3 — CONTRACTOR:
    Circle: 80px × 80px
    Background: rgba(0,153,187,0.12)
    Border: 2px solid rgba(0,153,187,0.35)
    Inside: wrench/tool icon SVG 32px color #0099BB

    Label: DM Sans 15px font-weight 700 color white: "The Contractor"
    Sub: DM Sans 12px color #6B7280: "Vetted. Fair-priced."

THREE EXPLANATION BLOCKS:
  Grid: grid-cols-1 mobile, grid-cols-3 desktop, gap: 20px

  Each block: border-radius 12px, padding: 26px 22px

  BLOCK 1 — WHAT YOU GET:
    Background: rgba(5,150,105,0.07)
    Border: 1px solid rgba(5,150,105,0.18)
    
    Icon row: flex align-items-center gap-10 margin-bottom 14px
    Circle 36px bg rgba(5,150,105,0.15) border rgba(5,150,105,0.3):
    "✓" in #059669 16px centered
    DM Sans 16px font-weight 700 color white: "What you get — free"
    
    List items (DM Sans 13px color #D1D5DB line-height 2.0 margin-top 12px):
    Each item: flex gap-8 align-items-flex-start
    Bullet: small "→" in #059669

    → Free AI analysis of your quote
    → Red flags explained in plain English
    → Fair-market price for your county
    → A negotiation script for your situation
    → An introduction to a vetted contractor
       who will beat your price — only if you want it

    Note: DM Mono 11px #405060 italic border-top 1px solid rgba(255,255,255,0.06)
    margin-top 14px padding-top 12px:
    "No charge. No catch. We earn nothing if you don't use our contractor."

  BLOCK 2 — HOW WE MAKE MONEY:
    Background: rgba(200,149,42,0.07)
    Border: 1px solid rgba(200,149,42,0.18)

    Icon row: circle bg rgba(200,149,42,0.15) border rgba(200,149,42,0.3)
    "⚖" or SVG scales icon, 18px color #C8952A
    DM Sans 16px font-weight 700 color white: "How we make money"

    Body (DM Sans 13px color #D1D5DB line-height 1.9 margin-top 12px):
    "WindowMan earns a percentage of the sale — only when you 
     choose to work with one of our contractors and your project 
     is completed.
     
     We never charge homeowners. We never charge for the scan.
     We get paid when you get a better deal than you would have 
     gotten without us.
     
     That's the only model that keeps us honest about the analysis."

    Note: DM Mono 11px #405060 italic border-top 1px solid rgba(255,255,255,0.06)
    margin-top 14px padding-top 12px:
    "If your current quote is already fair, we'll tell you that too.
     Your trust is worth more to us than one referral."

  BLOCK 3 — WHAT CONTRACTORS GET:
    Background: rgba(0,153,187,0.07)
    Border: 1px solid rgba(0,153,187,0.18)

    Icon row: circle bg rgba(0,153,187,0.15)
    "📊" or chart icon, color #0099BB
    DM Sans 16px font-weight 700 color white: "Why contractors work with us"

    Body (DM Sans 13px color #D1D5DB line-height 1.9 margin-top 12px):
    "Every homeowner we introduce already understands fair-market 
     pricing. They've seen the red flags in competing quotes. They 
     know what to look for in a contract.
     
     Our contractors don't walk into cold pitches. They walk into 
     conversations that are already halfway won — with a homeowner 
     who trusts the process and wants a fair deal."

    Note: DM Mono 11px #405060 italic border-top 1px solid rgba(255,255,255,0.06)
    margin-top 14px padding-top 12px:
    "We work with a limited number of contractors per county
     to protect the quality of every introduction."

CLOSING STATEMENT:
  Margin-top: 48px, text-align: center, padding: 32px 24px
  Background: rgba(255,255,255,0.03)
  Border: 1px solid rgba(255,255,255,0.07)
  Border-radius: 12px
  Max-width: 600px, mx-auto

  Playfair Display 22px color #C8952A font-weight 700 font-style italic:
  "The industry profits from you not knowing."
  
  Margin-top: 8px:
  Playfair Display 22px color white font-weight 400:
  "We profit from making sure you do."
  
  Below (DM Sans 14px #6B7280 margin-top 16px):
  "That's why the scan is free. That's why the report is yours.
   That's why we show you the math."
```

---

*End of WindowMan Business Model Architecture + Strategic Realignment*
*New Components: MarketMakerManifesto (INSERT between IndustryTruth and ProcessSteps)*
*Changed Components: ContractorMatch (single introduction), Admin (call queue primary view)*
*New Documentation: Webhook payload, AI agent scripts, pipeline stages*
*What doesn't change: Everything else — the analysis tool is correct as built*
