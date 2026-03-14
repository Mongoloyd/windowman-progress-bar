

## What's Missing for Enterprise-Grade Form Submissions

After reviewing both lead capture forms (`MarketBaselineTool.tsx` lines 549-597 and `TruthGateFlow.tsx` lines 300-368), here's what's currently implemented vs. what's missing.

### Currently Implemented
- Basic `type="tel"` and `type="email"` on inputs
- `required` attribute (MarketBaselineTool only, TruthGateFlow has none)
- Console logging of submissions
- No actual data persistence, validation, or formatting

### What's Missing (Grouped by Priority)

**Tier 1 — Blocks Webhook/Voice Agent Integration**

1. **Phone input masking + E.164 normalization.** Currently raw text input. Need `(555) 123-4567` display formatting that strips to `+15551234567` for storage/webhook. Library: `react-phone-number-input` or custom mask using `libphonenumber-js`.

2. **Twilio Lookup API validation.** Silent server-side check via Supabase Edge Function — confirms the number is real, mobile vs. landline, valid carrier. No SMS sent. Catches fake/disconnected numbers before they hit your voice agent.

3. **E.164 storage format.** Your webhook payload to the AI voice agent must send `+1XXXXXXXXXX`, not `(XXX) XXX-XXXX`. The formatting layer handles display; the data layer stores canonical format.

4. **Webhook dispatch from Edge Function.** After validation, fire the lead payload (name, email, phone in E.164, county, project details, timestamp, source flow) to your voice agent endpoint. Currently submissions just `console.log` and call parent callbacks.

**Tier 2 — Conversion & UX**

5. **Inline field validation with visual feedback.** Green checkmark on valid fields, red border + message on invalid — as user leaves each field (onBlur), not on submit.

6. **Submit button state machine.** Idle → Submitting (spinner, disabled) → Success (checkmark) → Error (retry). Prevents double-submit. Currently no loading state on either form.

7. **Form data persistence on error.** Neither form clears on error currently (good), but neither handles errors at all — there's no error state.

8. **Abandoned lead capture.** If email is entered but form isn't submitted, fire a partial lead event after 30s idle or on page unload (`beforeunload`). Capture what you have.

9. **`autocomplete` attributes.** Add `autoComplete="given-name"`, `autoComplete="email"`, `autoComplete="tel"` to enable browser autofill.

10. **Numeric keypad enforcement.** Add `inputMode="numeric"` + `pattern="[0-9]*"` alongside `type="tel"` for consistent mobile keyboard behavior.

**Tier 3 — Security & Reliability**

11. **Server-side validation in Edge Function.** Re-validate email format, phone digit count, name length. Never trust client.

12. **Rate limiting.** Throttle the Twilio Lookup endpoint (e.g., 5 requests per IP per minute) to prevent abuse and cost overruns.

13. **Input sanitization.** Strip HTML/script tags from all text fields server-side before storage or webhook dispatch.

14. **Idempotency key.** Generate a unique submission ID client-side, send it with the payload. Edge Function deduplicates — prevents double-entries from network retries.

15. **GDPR/TCPA compliance fields.** A checkbox or micro-copy consent statement near the phone field: "By providing your number, you consent to receive one call regarding your quote analysis." Required for AI voice agent outreach.

**Tier 4 — Analytics & Optimization**

16. **Field-level analytics.** Track which field users abandon on (focus → blur without submit). Tells you which field has the most friction.

17. **Form timing.** Track time-to-complete per field and total form duration. Slow fields = friction.

18. **Error frequency logging.** Count how often each validation error fires. High invalid-phone rate = UX problem.

19. **A/B testable micro-copy.** The sublabel text under phone ("for quote reminder when you're ready" vs. "we only text when your report is ready") should be easy to swap.

20. **Post-submission redirect/next-step.** Currently the MarketBaselineTool reveals the baseline. The TruthGateFlow just logs. Neither tells the user "Check your phone in 60 seconds" after the voice agent is dispatched.

---

### Recommended Implementation Order

**Phase 1** (implement now): Items 1-6, 9-10, 15. This gets you formatted phone inputs, Twilio validation, webhook-ready E.164 data, submit states, and consent — enough to connect the voice agent.

**Phase 2** (next sprint): Items 7-8, 11-14. Server hardening, abandoned lead capture, rate limiting.

**Phase 3** (optimization): Items 16-20. Analytics, A/B copy, post-submit UX.

### Files That Would Change
- `src/components/MarketBaselineTool.tsx` — Phone mask, validation, submit states, autocomplete, consent
- `src/components/TruthGateFlow.tsx` — Same treatment (both forms need identical upgrades)
- New: `supabase/functions/validate-phone/index.ts` — Twilio Lookup + webhook dispatch
- New: `src/hooks/usePhoneInput.ts` — Shared phone formatting/validation hook
- New: `src/utils/formatPhone.ts` — E.164 conversion utility

Shall I implement Phase 1?

