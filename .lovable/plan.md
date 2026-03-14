

## CTA Copy Audit: Current State vs. "AI Audit" Branding

### Inventory of all CTA copy across the site

| Location | Current Copy | Consistent? |
|----------|-------------|-------------|
| **Hero** (AuditHero) | "Scan My Quote — It's Free" | Neutral — no branding conflict |
| **Hero** (PowerToolDemo button) | "SEE THE AI IN ACTION" | Missing "Audit" framing |
| **Hero** (Ghost button) | "Getting Quotes Soon? We Can Arm You First →" | Neutral |
| **ProcessSteps** | "Scan My Quote — It's Free" | Neutral |
| **ProcessSteps** | "See the AI in Action — No Upload Needed" | Missing "Audit" |
| **IndustryTruth** | "Scan My Quote — It's Free" | Neutral |
| **IndustryTruth** | "See the AI in Action — No Upload Needed" | Missing "Audit" |
| **ClosingManifesto** | "Scan My Quote →" | Inconsistent — missing "It's Free" |
| **ClosingManifesto** | "See the AI in Action — No Upload Needed" | Missing "Audit" |
| **NarrativeProof** | "See the AI in Action — No Upload Needed" | Missing "Audit" |
| **MarketMakerManifesto** | "See the AI in Action — No Upload Needed" | Missing "Audit" |
| **InteractiveDemoScan** | "Scan My Quote — Free →" | Inconsistent variant |
| **ScamConcernImage** | "Don't Sign Until You've Got Your Free WindowMan Truth Report →" | Uses old naming, no "AI Audit" |
| **PowerToolDemo modal step 1** | eyebrow: "WINDOW MAN AI AUDIT" | Correct |
| **PowerToolDemo modal step 1** | headline: "See a Sample AI Truth Report" | Correct |
| **PowerToolDemo modal step 1** | cta: "Get Instant Access →" | Neutral |
| **PowerToolDemo modal step 2** | cta: "Show Me a Sample Truth Report →" | Missing "AI" qualifier |
| **PowerToolDemo report** | kicker: "WINDOW MAN TRUTH REPORT" | Missing "AI" — should match "AI AUDIT" |
| **PowerToolDemo report** | "Upload YOUR quote to get your real Truth Report →" | Missing "AI" |
| **PowerToolDemo report** | "Get your real Truth Report — free" | Missing "AI" |

### Issues Found

1. **"See the AI in Action" buttons (5 sections)** — These are fine as demo triggers. Adding "Audit" would make them too long. No change needed.

2. **ClosingManifesto primary CTA** — Says "Scan My Quote →" instead of "Scan My Quote — It's Free". Should match the others.

3. **InteractiveDemoScan CTA** — Says "Scan My Quote — Free →" — slight variant. Should align to "Scan My Quote — It's Free".

4. **ScamConcernImage** — Uses "WindowMan Truth Report" without "AI". Should say "AI Truth Report".

5. **PowerToolDemo step 2 CTA** — "Show Me a Sample Truth Report →" should say "Show Me a Sample AI Truth Report →" to match step 1 headline.

6. **PowerToolDemo report kicker** — "WINDOW MAN TRUTH REPORT" should be "WINDOW MAN AI TRUTH REPORT" to match the modal eyebrow branding.

7. **PowerToolDemo report body copy (2 instances)** — "your real Truth Report" should be "your real AI Truth Report".

### Proposed Changes

**`src/components/ClosingManifesto.tsx`** — Change "Scan My Quote →" to "Scan My Quote — It's Free"

**`src/components/InteractiveDemoScan.tsx`** — Change "Scan My Quote — Free →" to "Scan My Quote — It's Free →"

**`src/components/ScamConcernImage.tsx`** — Change "Free WindowMan Truth Report" to "Free WindowMan AI Truth Report"

**`src/components/PowerToolDemo.tsx`** (3 changes):
- Step 2 CTA: "Show Me a Sample **AI** Truth Report →"
- Report kicker: "WINDOW MAN **AI** TRUTH REPORT"
- Two body instances: "your real **AI** Truth Report"

Total: 4 files, 7 copy changes. No structural or logic changes.

