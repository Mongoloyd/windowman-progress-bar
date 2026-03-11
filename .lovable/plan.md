

# Dark Forensic Hero Redesign

## What Changes

Rebuild `AuditHero.tsx` to match the uploaded reference mockup: dark background, hand-scanner hero image at top, cyan accents, and updated copy.

### Layout (mobile-first, matching the reference)

1. **Dark background** — full section bg `#050505`
2. **Hand scanner image** — centered at top, copied from `user-uploads://hand_scannner.jpg` to `src/assets/hand_scanner.jpg`, imported as ES module
3. **Eyebrow** — `WINDOW QUOTE FORENSIC ANALYSIS` in cyan (`#00f2ff`), letter-spaced, mono font
4. **Headline** — "Don't Sign Your Window Quote Until Window Man Scans It" in white, Jost bold
5. **Cyan shield icon + subhead** — `FORENSIC-GRADE AI ANALYSIS` in cyan
6. **Body text** — "Detect hidden fees, missing permits, vague scope, and warranty traps in seconds." in light gray
7. **Primary CTA** — "Scan My Quote Free" — cyan bg (`#00f2ff`), dark text, full-width on mobile
8. **Secondary CTA** — "I'm Getting Quotes" — transparent with cyan border, full-width on mobile
9. **Desktop** — same layout but wider, grade card still shown on right column

### Files

| File | Change |
|------|--------|
| `src/assets/hand_scanner.jpg` | Copy uploaded image here |
| `src/components/AuditHero.tsx` | Rewrite: dark bg, new copy, hero image at top, cyan accents, updated CTAs. Keep `onFlowBClick`/`onUploadQuote` props and PowerToolFlow integration intact. Desktop keeps the grade card in right column but styled dark. |
| `src/components/LinearHeader.tsx` | Update to dark: bg `#050505`, white logo text, dark pill styling |

### Copy Changes
- Eyebrow: "FOR FLORIDA HOMEOWNERS..." → "WINDOW QUOTE FORENSIC ANALYSIS"
- Headline: current → "Don't Sign Your Window Quote Until Window Man Scans It"
- Sub-eyebrow: new cyan line "FORENSIC-GRADE AI ANALYSIS"
- Body: new text about detecting hidden fees
- Primary CTA: "Scan My Quote — It's Free" → "Scan My Quote Free"
- Secondary CTA: "Getting Quotes Soon?..." → "I'm Getting Quotes"

### Color Mapping
- Section bg: `#FFFFFF` → `#050505`
- Text: `#0F1F35` → `#FFFFFF`
- Accent gold `#C8952A` → cyan `#00f2ff`
- Secondary text: `#374151` → `#9CA3AF`
- CTA button: gold bg → cyan bg with dark text
- Secondary CTA border: `#D1D5DB` → `#00f2ff`

