# V2 Report System — Full Build Integration Guide

## What Changed From the Previous Build

The original build had `preview | full` modes. This build implements the
**partial_reveal architecture** from your design partner's spec:

- `partial_reveal` — the "Money State." Report visible underneath, OTP modal
  on top. Findings readable, evidence blurred, action plan teased.
- `full` — everything unlocked after OTP verification.
- `GateState` — separate OTP status tracking independent of report data.

New components: `FindingsPageShell`, `OtpUnlockModal`, `BlurGate`,
`LockedSectionTeaser`, `ReportRevealContainer` (Framer Motion).

## Quick Start

1. `npm install framer-motion` (for premium unlock animation)
2. Unzip and copy `src/` contents into your `mongoloyd/wm-mvp` repo
3. Visit `/report/test?fixture=grade_d&dev=1` — see partial reveal + OTP modal
4. Visit `/report/test?fixture=grade_d&gate=unlocked&mode=full&dev=1` — see full report
5. Enter any 6 digits in the OTP modal to simulate unlock

## File Map (24 files)

```
src/
├── App.tsx                                  ← Updated routing
├── types/
│   └── report-v2.ts                         ← ReportMode: partial_reveal | full
│                                               GateState: otp_required → unlocked
├── lib/
│   ├── findings-transform.ts                ← V1 → V2 transform (updated for partial_reveal)
│   ├── report-fixtures.ts                   ← 3 fixtures (Grade D, B, Demo)
│   └── reportMode.ts                        ← Feature flags (USE_FINDINGS_V2, USE_FRAMER_MOTION)
├── pages/
│   └── Report.tsx                           ← Route handler with full dev controls
├── components/
│   ├── findings-gate/                       ← NEW: OTP overlay system
│   │   ├── index.ts
│   │   ├── FindingsPageShell.tsx            ← Parent orchestrator (lock state + overlay)
│   │   ├── OtpUnlockModal.tsx              ← Premium OTP card (bottom-sheet mobile)
│   │   ├── ReportRevealContainer.tsx        ← Framer Motion 3-layer animation
│   │   ├── BlurGate.tsx                     ← Reusable blur wrapper
│   │   └── LockedSectionTeaser.tsx          ← Persuasive locked placeholder
│   └── report-v2/                           ← Report components (updated)
│       ├── index.ts
│       ├── ReportShellV2.tsx                ← NEW: partial_reveal layout ordering
│       ├── ReportShell.tsx                  ← LEGACY: kept for backwards compat
│       ├── VerdictHeader.tsx
│       ├── TopFindings.tsx
│       ├── FindingCard.tsx
│       ├── CoverageMap.tsx
│       ├── ActionPlan.tsx
│       ├── EvidenceExplorer.tsx
│       ├── BenchmarksPanel.tsx
│       ├── TrustStrip.tsx
│       └── UnlockCTA.tsx
```

## Dependencies

Required:
- React, react-router-dom, lucide-react, Tailwind CSS (already in your stack)

Optional:
- `framer-motion` — for premium unlock animation. Without it, use the
  CSS-only fallback: `ReportRevealContainerCSS` from the same file.

## The Three Display States

### `partial_reveal` (the conversion moment)
- Report page visible underneath with blur + dim
- OTP modal centered on desktop, bottom-sheet on mobile
- Findings titles, severity, "why it matters" = fully readable
- Evidence text, action plans, benchmarks = blurred/teased
- Section order: Verdict → Findings → Action Plan TEASER → Coverage → Evidence TEASER → Benchmarks TEASER

### `full` (unlocked)
- Everything visible and interactive
- Section order: Verdict → Findings → Action Plan → Evidence Explorer → Coverage → Benchmarks → Appendix

### GateState (OTP status, independent of report data)
- `otp_required` — modal open, waiting for code
- `otp_submitting` — spinner, inputs disabled
- `otp_invalid` — error message, inputs cleared
- `otp_expired` — prompt to resend
- `unlocked` — modal exits, report sharpens

## Dev Sidedoor URLs

| URL | What it shows |
|-----|---------------|
| `/report/test?fixture=grade_d&dev=1` | Grade D, partial reveal + OTP modal |
| `/report/test?fixture=grade_d&gate=unlocked&mode=full&dev=1` | Grade D, fully unlocked |
| `/report/test?fixture=grade_b&dev=1` | Good quote, partial reveal |
| `/report/test?fixture=grade_b&gate=unlocked&mode=full&dev=1` | Good quote, unlocked |
| `/report/demo` | Demo mode (Grade C) |
| `/report/test?gate=otp_invalid&dev=1` | Test error state |
| `/report/test?gate=otp_expired&dev=1` | Test expired state |

The `?dev=1` flag shows a floating control panel with:
- Fixture selector (grade_d / grade_b / demo)
- Mode toggle (partial_reveal / full)
- Gate state selector (required / submitting / invalid / expired / unlocked)

## Unlock Animation Sequence

When OTP succeeds (Framer Motion):
1. OTP modal exits: opacity 0, scale 1.05, blur 8px (0.4s)
2. Report background sharpens: blur 6px → 0px, scale 0.985 → 1.0, opacity 0.55 → 1.0 (0.8s)
3. Brief cobalt blue glow flash (1.2s fade)
4. Report sections are now fully interactive

Without Framer Motion (CSS fallback):
- Same transitions via CSS `transition-all duration-700 ease-out`
- No exit animation on modal, just fade

## Wiring to Twilio OTP

In `FindingsPageShell.tsx`, pass real handlers:

```tsx
<FindingsPageShell
  report={report}
  phoneMasked="(555) •••-1234"
  initialGateState="otp_required"
  onSubmitOtp={async (code) => {
    const { data, error } = await supabase.functions.invoke('verify-otp', {
      body: { code, scan_session_id: sessionId }
    });
    return !error && data?.verified === true;
  }}
  onResendOtp={async () => {
    await supabase.functions.invoke('send-otp', {
      body: { phone, scan_session_id: sessionId }
    });
  }}
/>
```

## Wiring to Real Scanner Data

Uncomment the Supabase fetch block in `Report.tsx` (lines ~70-90):

```ts
import { transformToV2 } from "@/lib/findings-transform";

const envelope = transformToV2({
  scanSessionId: sessionId,
  leadId: data.lead_id,
  fullJson: data.full_json,
  previewJson: data.preview_json,
  proofOfRead: data.proof_of_read,
  confidenceScore: data.confidence_score,
}, "partial_reveal"); // or "full" based on OTP status
```

## Section Order: Why Partial Reveal Differs From Full

The design partner spec identifies that after seeing risks, the user's
next question is "what do I do?" — not "what areas were covered."

So in `partial_reveal`, the Action Plan teaser appears BEFORE the
Coverage Map to maximize unlock intent:

```
PARTIAL REVEAL               FULL (UNLOCKED)
─────────────                ───────────────
1. Verdict                   1. Verdict
2. Findings                  2. Findings
3. Action Plan TEASER  ←     3. Action Plan (full)
4. Coverage Map              4. Evidence Explorer
5. Evidence TEASER           5. Coverage Map
6. Benchmarks TEASER         6. Benchmarks
                             7. Appendix
```

## Analytics Events to Wire

Replace `console.log("TODO: ...")` placeholders with your tracking:

- `wm_report_unlocked` — OTP success (in FindingsPageShell)
- `wm_report_download` — PDF button (in VerdictHeader)
- `wm_report_share` — Share button (in VerdictHeader)
- `wm_next_step_clicked` — Renegotiate/Get Quote/Proceed (in ActionPlan)
- `wm_evidence_viewed` — Evidence explorer interaction
