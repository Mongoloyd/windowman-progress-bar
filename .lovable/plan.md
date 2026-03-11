

# Global "Forensic AI Scanner" Rebrand

## Scope

Every section below the hero still uses the old light-theme palette (`#FFFFFF` backgrounds, `#0F1F35` text, `#F9FAFB` surfaces). This plan converts all 10+ components to the dark forensic aesthetic, centralizes remaining hardcoded colors, and adds the requested polish (glassmorphism, scroll animations, scan-line shimmer, grid overlays).

## Design Token Updates

### `src/index.css`
- Add `scroll-behavior: smooth` and `-webkit-font-smoothing: antialiased` to `body`
- Add `@keyframes scan-line-shimmer` (a horizontal light sweep, 3s interval) for the CTA button
- Add `@keyframes pulse-glow` for checklist checkmarks

### `tailwind.config.ts`
- Add `brand-ruby: hsl(0 72% 50%)` to the brand color tokens (for critical red flags, distinct from `destructive`)
- Add animation keyframes: `shimmer`, `pulse-glow`

## Component Transformations (8 files)

### 1. `SocialProofStrip.tsx`
- Background: `#0F1F35` → `hsl(var(--background))` (inherits #050505)
- Add `border-y border-white/5` for subtle separation
- Stat colors already use amber/red/green — keep those, just swap label text to `#94a3b8`

### 2. `TruthGateFlow.tsx` (~493 lines)
- Section bg: use `bg-background`
- All `color: "#0F1F35"` → `hsl(var(--foreground))` (white)
- Step indicators: style as terminal inputs with `IBM Plex Mono`, cyan step numbers
- Option cards: `bg-white` → `bg-[hsl(var(--card))]` with `border border-white/5`
- Selected state: cyan border glow instead of gold
- Lead capture form inputs: dark surface bg, white text, cyan focus ring

### 3. `IndustryTruth.tsx` (~229 lines)
- Section bg: `#FFFFFF` → `bg-background`
- Add subtle CSS grid-line overlay (repeating-linear-gradient, white/3 lines)
- Cards: glassmorphic — `bg-white/5 backdrop-blur-xl border border-white/8`
- Hover: `hover:border-[hsl(var(--primary))]/30` cyan glow
- Icon backgrounds: swap pastel to dark tinted versions
- All `#0F1F35` text → foreground, `#374151` → muted-foreground
- CTA box at bottom: already dark `#0F1F35` → use `bg-card` with cyan border

### 4. `ProcessSteps.tsx` (~165 lines)
- Section bg: `#F9FAFB` → `bg-background`
- Timeline connecting line: `#E5E7EB` → animated cyan gradient line that fills on scroll (use framer-motion `useScroll`)
- Step dots: dark surface with cyan number text
- All heading text: white, body text: `#94a3b8`
- Deliverables list: dark cards with left-color stripe (keep red/amber/green/cyan semantic colors)

### 5. `NarrativeProof.tsx` (~205 lines)
- Section bg: `#FFFFFF` → `bg-background`
- Story cards: glassmorphic `bg-white/5 border border-white/8`
- Avatar initials: keep colored but darken bg to match theme
- Grade badges: keep semantic colors, darken badge bg
- Bottom CTA card: `#F9FAFB` → `bg-card` with subtle border
- Pagination dots: cyan active, muted inactive

### 6. `MarketMakerManifesto.tsx` (~462 lines)
- Section bg: `#0F1F35` → `bg-background` (already dark, just unify)
- Decorative line: amber → cyan
- All text already light — verify and align to design tokens
- Cards/list items: add `bg-white/5 border border-white/5`

### 7. `ClosingManifesto.tsx` (~175 lines)
- Section bg: `#0F1F35` → gradient from `bg-background` to deep navy `#0a1628`
- Checkmarks: swap to Cyber Lime with `animate-pulse-glow`
- CTA button: cyan with scan-line shimmer effect

### 8. `ForensicChecklist.tsx` (~341 lines)
- Already uses HSL colors — verify backgrounds match dark theme
- Checkmarks: Cyber Lime (`hsl(var(--brand-lime))`) with pulse animation when visible
- Card surfaces: `bg-card` with `border-white/5`

### 9. `FlowBEntry.tsx` (~493 lines)
- Outcome cards: pastel backgrounds → dark tinted (`bg-white/5`)
- Timeline steps: dark cards, cyan accents
- All `#0F1F35` → foreground token

### 10. `ScanTheatrics.tsx`
- Background: `#0F1F35` → `hsl(var(--background))`
- OTP modal: dark card surface instead of white

## Hero Enhancements (`AuditHero.tsx`)

- Hand scanner image: add framer-motion breathing scale animation (1.0 → 1.02, 4s loop)
- Hover: `drop-shadow(0 0 25px rgba(0, 242, 255, 0.4))` on the image
- Grade card: upgrade to glassmorphic — `bg-white/5 backdrop-blur-xl border` with cyan-to-amber gradient border
- "Scan My Quote Free" button: add scan-line shimmer animation (CSS `background-size: 200%` sweep every 3s)

## PowerToolDemo.tsx — DS Constant Alignment

- Update `DS.colors.bg` from `#070b12` → `#050505` to match `:root --background`
- Update `DS.colors.cyan` from `#06b6d4` → `#00f2ff` to match `--primary`
- Update `DS.colors.surface` from `#0e1420` → `hsl(0 0% 6%)` to match `--card`

## Scroll Entrance Animations

All sections already use `framer-motion` `useInView` — add staggered `delay` to child elements for the "materialize" effect. No new dependencies needed; just add `transition={{ delay: i * 0.08 }}` to mapped card arrays.

## Implementation Order

1. Design tokens (index.css + tailwind.config.ts)
2. SocialProofStrip + AuditHero enhancements
3. TruthGateFlow (largest file, core conversion)
4. IndustryTruth + ProcessSteps + NarrativeProof
5. MarketMakerManifesto + ClosingManifesto
6. ForensicChecklist + FlowBEntry + ScanTheatrics
7. PowerToolDemo DS alignment

