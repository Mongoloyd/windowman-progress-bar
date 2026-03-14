

## What You're Trying to Accomplish

You want the LeadModal copy to set accurate expectations. "Unlock the Truth Report" sounds like they're getting their own personal report — but at this stage they're seeing a **demo**. Users who expect a real report and get a sample will feel bait-and-switched. You're fixing that trust gap.

The eyebrow "WINDOW MAN POWER TOOL" is internal/product-speak. Users don't care about tool names — they care about what it does for them.

## Copy Recommendations

**Eyebrow (line 415):** Instead of "WINDOW MAN POWER TOOL", something benefit-oriented:

- `"WINDOW MAN AI AUDIT"` — simple, branded, says what it is
- `"FREE AI-POWERED AUDIT TOOL"` — leads with free + what it does
- `"YOUR AI QUOTE PROTECTION"` — user-focused framing

I'd go with **"WINDOW MAN AI AUDIT"** — it's branded, concise, and matches the authority framing you've established elsewhere.

**Headline (line 416):** Your suggestion "View A Demo AI Audit Truth Report" is accurate but reads a bit long and has awkward capitalization. Tighter options:

- `"See a Sample AI Audit Report"` — clear, honest, fits one line
- `"Preview a Real AI Truth Report"` — "preview" sets demo expectation, "real" adds credibility
- `"Watch the AI Scan in Action"` — action-oriented

I'd recommend **"See a Sample AI Truth Report"** — it's honest about what they'll get, fits one line, and the word "sample" prevents the bait-and-switch feeling.

## Changes — `src/components/PowerToolDemo.tsx`

Lines 414-418: Update the step 1 copy object:

```typescript
1: {
  eyebrow: "WINDOW MAN AI AUDIT",
  headline: "See a Sample AI Truth Report",
  sub: "Get the same AI scanner contractors don't want you to have. Every clause, every compliance gap, every price red flag — exposed before you sign anything.",
  cta: "Get Instant Access →",
},
```

Two lines changed, no structural modifications.

