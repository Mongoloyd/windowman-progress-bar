

# UI/UX Color Audit: Remaining Light-Theme Components

## Problem

The dark forensic rebrand was applied to 10 components, but **5 critical components still use the old light theme** (white backgrounds, light gray borders, dark text). This creates jarring visual breaks when users reach these sections:

| Component | Issue |
|-----------|-------|
| **GradeReveal** | `#FAFAFA` / `white` backgrounds, `#0F1F35` text, `#E5E7EB` borders, `#C8952A` gold buttons |
| **UploadZone** | `#FFFFFF` card, `#E5E7EB` border, `#F9FAFB` drop zone, `#059669` green button |
| **EvidenceLocker** | `white` background, `#0F1F35` text, `#E5E7EB` borders, `#FEF2F2`/`#ECFDF5` comparison cards |
| **StickyRecoveryBar** | `#FFFFFF` bg, `#C8952A` gold CTA, `#0F1F35` text, `#E5E7EB` progress bar |
| **MarketBaselineTool** | `white` option buttons, `#E5E7EB` borders, light-green selection states |
| **QuoteWatcher** | Mixed — some dark elements, some hardcoded light colors |
| **ContractorMatch** | Already dark (`#0F1F35` bg) but uses old gold `#C8952A` instead of cyan |

## Recommended Changes

### 1. GradeReveal.tsx (~307 lines) — Full dark conversion
- Section backgrounds: `#FAFAFA` / `white` → `bg-background`
- Grade circle: white bg → `bg-card` with colored border glow
- Grade config `bg` values: `#ECFDF5` / `#FFF7ED` → dark tinted versions (e.g., `hsl(var(--brand-lime) / 0.08)`)
- Flag cards: white bg → `glass-card`, borders → `border-white/5` with colored left stripe
- Severity badge backgrounds: pastel → dark tinted
- Negotiation tip backgrounds: pastel → dark tinted
- Summary bar: `#0F1F35` → `bg-card` (already close but use token)
- Script section: `#F9FAFB` bg → `bg-card`, `#E5E7EB` borders → `border-white/5`
- CTA buttons: `#C8952A` gold → `bg-primary` cyan (or `bg-brand-lime` for the action CTA)
- All `#0F1F35` text → `text-foreground`
- All `#6B7280` / `#374151` → `text-muted-foreground`
- `#0099BB` accent → `hsl(var(--primary))`
- Progress bar: `#E5E7EB` track → `bg-white/5`, teal gradient → cyan gradient

### 2. UploadZone.tsx (~231 lines) — Full dark conversion
- Outer card: `#FFFFFF` bg → `glass-card`
- Badge: `#E8F7FB` bg → `hsl(var(--primary) / 0.08)`, `#0099BB` → `text-primary`
- Heading: `#0F1F35` → `text-foreground`
- Drop zone: `#F9FAFB` bg → `bg-card`, dashed border `#D1D5DB` → `border-white/10`, drag-over gold → cyan
- File success: `#ECFDF5` circle → dark lime tinted, `#059669` → `brand-lime`
- Scan button: `#059669` → `bg-brand-lime text-primary-foreground`
- Body text: `#6B7280` → `text-muted-foreground`

### 3. EvidenceLocker.tsx (~256 lines) — Full dark conversion
- Main bg: `white` → `bg-background`
- Vault card: white bg, `#E5E7EB` border → `glass-card` with cyan border accent
- Header bar: `#0F1F35` → `bg-card` (keep dark)
- Grade config backgrounds: pastel → dark tinted
- VaultRow borders: `#E5E7EB` → `border-white/5`
- VaultRow text: `#0F1F35` → `text-foreground`, `#6B7280` → `text-muted-foreground`
- "Without/With" comparison cards: `#FEF2F2` / `#ECFDF5` → dark tinted versions
- Email input: white bg → `bg-card`, border → `border-white/10`, focus → cyan
- Footer: `#F9FAFB` → `bg-card`
- `#C8952A` gold accents → `hsl(var(--brand-amber))` or keep for historical consistency
- Empty slot bg: `#F9FAFB` → `bg-card`

### 4. StickyRecoveryBar.tsx (~198 lines) — Full dark conversion
- Background: `#FFFFFF` → `hsl(var(--card))` with `border-t border-primary`
- Shadow: light shadow → dark shadow
- Progress dots: `#E5E7EB` empty → `bg-white/10`, `#C8952A` filled → `bg-primary` cyan
- Mini progress bar: `#E5E7EB` track → `bg-white/5`, `#C8952A` fill → `bg-primary`
- Text: `#0F1F35` → `text-foreground`, `#6B7280` → `text-muted-foreground`
- CTA button: `#C8952A` → `bg-primary text-primary-foreground`
- Close button hover: `#F3F4F6` → `bg-white/5`
- Urgent border: `#DC2626` stays (destructive token)

### 5. MarketBaselineTool.tsx (~543 lines) — Full dark conversion
- Option buttons: white bg → `bg-card`, `#E5E7EB` borders → `border-white/8`
- Selected state: light green → `hsl(var(--brand-lime) / 0.1)` with lime border
- Hover state: light green → dark lime tinted
- All text colors: same mapping as above
- Lead capture inputs: white → `bg-card`, border → `border-white/8`, focus → cyan ring
- Baseline reveal card: match dark glassmorphic style

### 6. QuoteWatcher.tsx (~409 lines) — Audit and align
- Scan preview card already partially dark — verify all hardcoded colors
- Any remaining `#FFFFFF`, `#F9FAFB`, `#E5E7EB` → dark equivalents
- Form inputs: dark surface, cyan focus

### 7. ContractorMatch.tsx (~311 lines) — Accent alignment
- Already dark bg — swap `#C8952A` gold accents → cyan primary or keep amber as intentional warm accent
- `#0099BB` → `hsl(var(--primary))` for consistency

### Font Color Improvements (site-wide)
- Body text should use `hsl(220 5% 64%)` (~`#94a3b8`) instead of pure `#9CA3AF` for slightly warmer feel against the black
- The current `--muted-foreground: 220 5% 64%` is already set — just ensure all components use the token instead of hardcoded hex

### Section Separation
- Add `border-t border-white/5` between all major sections for visual rhythm (already done on converted components, missing on these 5)

## Implementation Order
1. **StickyRecoveryBar** — most visible (fixed position), quickest win
2. **UploadZone** — appears right after TruthGateFlow lead capture
3. **GradeReveal** — largest file, most complex, core post-scan experience
4. **EvidenceLocker** — follows GradeReveal
5. **MarketBaselineTool + QuoteWatcher** — Flow B path
6. **ContractorMatch** — already mostly dark, just accent swap

