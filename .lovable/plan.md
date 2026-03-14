

# Comprehensive UI/UX Test Plan for All 3 User Flows

## Current State Summary

**Flow A** (Have a Quote) — Fully wired in Index.tsx. Hero → TruthGateFlow → UploadZone → ScanTheatrics → GradeReveal → EvidenceLocker → ContractorMatch.

**Flow B** (Pre-Quote Research) — Fully wired in Index.tsx. FlowBEntry → MarketBaselineTool → ForensicChecklist → QuoteWatcher. Bridges to Flow A via CTAs.

**Flow C** (Verbal Quote / Appointment) — Component exists (`FlowCEntry.tsx`) but is **NOT wired into Index.tsx**. It is never rendered. The `flowMode` state only supports `'A' | 'B'`. Flow C is dead code.

---

## Recommended Test Prompt

Copy and paste this prompt to run the full audit:

---

**Run a full end-to-end UI/UX audit of all user flows. For each flow, walk through every state transition, click every button/link, and report what works vs. what's broken or missing. Use the browser to interact with the live preview.**

### FLOW A — "I Have a Quote"

Test these interactions in order:

1. **Hero CTA**: Click "Scan My Quote — It's Free". Verify it scrolls to `#truth-gate` and the Step 1 of 4 configurator appears.
2. **Truth Gate Steps 1-4**: Click through all 4 option cards. Verify each step animates forward, the progress eyebrow updates ("STEP 2 OF 4" etc.), and the selected option highlights.
3. **Lead Capture Form**: After step 4, verify the lead form appears. Test field validation — submit with empty fields, invalid email, short phone number. Confirm error states show.
4. **Upload Zone**: After lead capture, verify the Upload Zone auto-scrolls into view. Test drag-and-drop a file and the file picker button. Verify the "Scan My Quote" button appears after file selection.
5. **Scan Theatrics**: Click scan. Verify the animated scan sequence plays (progress bar, line-by-line text, 99% cliffhanger pause). Confirm it auto-advances to Grade Reveal.
6. **Grade Reveal**: Verify the grade card (C), dollar delta ($4,800), and all 4 flags render. Check that red/amber/green color coding is correct. Click "Find a Verified Contractor" and verify it scrolls to ContractorMatch.
7. **Evidence Locker**: Verify all 6 cards render. Test "Download All" — confirm a .txt file downloads. Test "Share" — confirm clipboard toast appears (desktop fallback). Test "Second Opinion Scan" (+ Add) — verify it resets the funnel and scrolls back to `#truth-gate`.
8. **Sticky Recovery Bar (post-reveal)**: Verify it shows "Your grade report is ready" with "Find a Contractor →" CTA.

### FLOW B — "Getting Quotes Soon"

Test these interactions in order:

1. **Hero Switch**: From the hero, click "Show me how it works first →" (or the Flow B entry link). Verify the hero swaps to FlowBEntry with animation.
2. **FlowBEntry CTA**: Click "Build My Baseline →". Verify it scrolls to `#market-baseline`.
3. **ScamConcernImage**: Verify the image between FlowBEntry and MarketBaselineTool loads without 404.
4. **Market Baseline Tool Steps 1-3**: Click through county, window count, and window type. Verify step transitions animate and selections highlight.
5. **Lead Gate (Blur Tease)**: After step 3, verify the baseline result appears blurred with a lead capture form overlay. Submit the form and verify the baseline reveal animation plays with the correct price range for the selected county/window count.
6. **Forensic Checklist**: Verify it appears after lead capture. Expand each of the 5 questions — confirm the "WHY THIS MATTERS" and "SAY EXACTLY THIS" sections render. Test the "Upload Your Quote" CTA at the bottom — verify it switches to Flow A.
7. **Quote Watcher**: Verify the reminder form appears. Test date/time selection and submission. Verify the success state renders.
8. **Flow B → Flow A Bridge**: Click "Already have a quote? Upload it now" links in the checklist or watcher. Verify it transitions to Flow A and scrolls to `#truth-gate`.

### FLOW C — "Verbal Quote / Appointment"

1. **Existence Check**: Verify whether Flow C is accessible from any UI element on the page. Report if it is currently unreachable (component exists but is not rendered).

### CROSS-FLOW ELEMENTS (test in both Flow A and B contexts)

1. **Interactive Demo Scan**: Scroll to the demo section. Verify auto-cycling between 3 sample quotes. Hover to pause. Click "[unlock to read]" — verify it triggers `triggerTruthGate` and scrolls to the configurator.
2. **Social Proof Strip**: Verify it renders between the hero and demo scan in Flow A.
3. **Bottom-Page Sections**: Verify IndustryTruth, MarketMakerManifesto, ProcessSteps, NarrativeProof, and ClosingManifesto all render. Click every "Scan My Quote →" CTA — verify each one triggers `triggerTruthGate`.
4. **Sticky Recovery Bar**: Test across states — before any interaction (generic CTA), mid-funnel (shows step count), after Flow B lead capture (shows "Set My Reminder →"). Test dismiss (X button) and verify it stays dismissed.
5. **Exit Intent Modal**: Move mouse above the viewport boundary. Verify the modal appears with contextual copy. Test the CTA button — verify it triggers PowerTool and scrolls to top.
6. **Asset Check**: Report any broken images (404s) or missing fonts across all sections.
7. **Mobile Responsiveness**: Check hero layout, flag cards, baseline tool, and checklist at 375px width. Report any clipping or overflow.

### DELIVERABLE FORMAT

For each test item, report:
- **[PASS]** — works as expected
- **[FAIL]** — broken, with description of what's wrong
- **[MISSING]** — feature not implemented or not reachable
- **[PARTIAL]** — works but has issues (describe)

End with a summary table and list of recommended fixes prioritized by conversion impact.

---

## Known Issues to Expect

| Item | Status | Detail |
|------|--------|--------|
| Flow C | NOT WIRED | `FlowCEntry.tsx` exists but is never imported or rendered in `Index.tsx`. `flowMode` state is `'A' \| 'B'` only. |
| `IS_DEV_MODE = true` | Active | Recovery bar and some debug behaviors are always visible. Must be set to `false` before production. |
| All form submissions | No backend | Lead forms, email inputs, and reminders log to console only. No data is persisted. |
| InteractiveDemoScan "[unlock to read]" | Needs manual verify | Click target may be too small on mobile (no `min-h-[44px]`). |
| `navigator.share` | Desktop limitation | Will always fall back to clipboard on desktop browsers. Only testable as native share on mobile. |

