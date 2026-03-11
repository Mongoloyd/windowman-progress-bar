

# Global Font Migration: Playfair Display → Jost

## Scope of Change

This is a find-and-replace operation across **16 files** with **181 instances** of `'Playfair Display', serif`. No layout complications expected — Jost is a geometric sans-serif with similar x-height metrics to Playfair at the same sizes, so nothing will overflow or break spacing.

**One potential issue**: The Grade C letter ("C") in ScanTheatrics, AuditHero, QuoteWatcher, and GradeReveal is rendered at 64–96px in Playfair. Jost at those sizes will look different (geometric vs serif) but will actually look *better* for a data/tech brand. No sizing adjustments needed.

## Changes

### 1. `index.html` — Add Jost font
Add Jost (400, 600, 700, 800) to the existing Google Fonts link. Keep Inter and IBM Plex Mono (used by PowerToolDemo).

### 2. `tailwind.config.ts` — Add font families
Add `fontFamily` to the `extend` block:
- `sans: ['Jost', 'Inter', 'system-ui', 'sans-serif']`  
- `heading: ['Jost', 'sans-serif']`

### 3. Global replacement across 16 component files
Every instance of `fontFamily: "'Playfair Display', serif"` → `fontFamily: "'Jost', sans-serif"`.
Every instance of `fontWeight: 700` on headlines → `fontWeight: 800` (extrabold).
Every instance of `fontWeight: 400` on headline text → `fontWeight: 700`.

Remove `fontStyle: "italic"` from **headline** elements only (keep italic on footnotes/notes in DM Mono/DM Sans — those are body text, not headlines).

Add `letterSpacing: "-0.02em"` (tracking-tight) to all primary headlines.

### 4. Remove `@fontsource/playfair-display` imports
Remove `import "@fontsource/playfair-display/700.css"` from these 6 files:
- AuditHero.tsx
- FlowBEntry.tsx  
- MarketBaselineTool.tsx
- QuoteWatcher.tsx
- TruthGateFlow.tsx
- ForensicChecklist.tsx

### Files affected (16 total)

| File | Playfair instances | Italic headlines to fix |
|------|-------------------|------------------------|
| AuditHero.tsx | 2 + import | 1 (sample card footer — keep, it's body text) |
| MarketMakerManifesto.tsx | 3 | 1 (closing quote — remove italic) |
| IndustryTruth.tsx | 3 | 0 |
| ProcessSteps.tsx | 1 | 0 |
| NarrativeProof.tsx | 2 | 0 |
| ClosingManifesto.tsx | 3 | 0 |
| FlowBEntry.tsx | 3 + import | 0 |
| QuoteWatcher.tsx | 5 + import | 1 (closing italic — remove) |
| TruthGateFlow.tsx | 2 + import | 0 |
| ContractorMatch.tsx | 2 | 0 |
| GradeReveal.tsx | 3 | 0 |
| ScanTheatrics.tsx | 1 | 0 |
| UploadZone.tsx | 1 | 0 |
| EvidenceLocker.tsx | 1 | 0 |
| MarketBaselineTool.tsx | 3 + import | 0 |
| ForensicChecklist.tsx | 1 + import | 0 |

### What stays untouched
- **PowerToolDemo.tsx** — uses its own isolated `Inter` + `IBM Plex Mono` design system. No Playfair references.
- **LinearHeader.tsx** — uses DM Sans. No Playfair.
- **DM Sans / DM Mono** usage throughout body text — unchanged.
- All italic styles on **body text** (footnotes, disclaimers, subtexts) — unchanged. Only headline italics removed.

### No complications expected
Jost has similar character widths to Playfair at equivalent sizes, and we're bumping weight to 800 which compensates for any perceived "thinness" vs a serif. The `letterSpacing: "-0.02em"` tightening will give the dense, authoritative feel requested.

