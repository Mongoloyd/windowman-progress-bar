

# Import InteractiveDemoScan from "Window Report Pro"

## What It Is
A self-running animated demo that cycles through 3 sample contractor quotes. It shows a mock PDF document, runs a laser-sweep scan animation, then reveals a grade + red flags. After results display, a CTA pulses to drive users into the lead funnel. No user interaction required — it loops automatically.

## Color Mapping (Source → This Project)

The source component uses Tailwind classes from a different design system. Here's the translation:

| Source Class | Meaning | This Project Equivalent |
|---|---|---|
| `text-navy` | Dark heading text | `text-foreground` (white on dark) |
| `bg-gold` | Amber CTA button | `bg-[hsl(var(--brand-amber))]` |
| `text-cyan-text` | Cyan accent text | `text-[hsl(var(--primary))]` |
| `bg-cyan-light` | Cyan badge bg | `bg-[hsl(var(--primary)/0.1)]` |
| `bg-cyan` | Cyan solid | `bg-[hsl(var(--primary))]` |
| `text-warning` / `text-danger` | Flag severity colors | `text-[hsl(var(--brand-amber))]` / `text-[hsl(var(--destructive))]` |
| `bg-gold-light` / `bg-danger-light` / `bg-green-light` / `bg-red-light` | Tinted flag backgrounds | Dark tinted versions: `bg-[hsl(var(--brand-amber)/0.1)]` etc. |
| `border-l-danger` / `border-l-gold` / `border-l-cyan` | Flag left stripes | `border-l-[hsl(var(--destructive))]` etc. |
| `bg-cyan/5` | Scan overlay tint | `bg-[hsl(var(--primary)/0.05)]` |
| `border-cyan/30` | Scan status border | `border-[hsl(var(--primary)/0.3)]` |
| `font-display` | Heading font | `font-heading` (Jost) |
| `font-body` | Body font | `font-sans` |
| `font-mono` | Monospace | `font-mono` (DM Mono / IBM Plex Mono — already available via `@fontsource`) |

## SCANS Data
The grade badge classes also need remapping. Instead of using Tailwind class names in the data array, I'll convert them to inline style references using the CSS custom properties so they work with this project's token system.

## Changes

### 1. Create `src/components/InteractiveDemoScan.tsx`
- Port the full component from the source project
- Remap all ~25 Tailwind class references to this project's dark forensic tokens
- Grade circle: glassmorphic dark bg with colored border glow (not pastel)
- Flag cards: `glass-card` style with colored left stripe
- CTA button: use `brand-amber` with scan-line shimmer or `bg-primary` cyan
- Scan laser: keep cyan glow (`hsl(var(--primary))`)
- Container: `glass-card` with `border-white/5`, dark card surface
- Shadow: dark shadow instead of `rgba(15,20,25,0.08)`

### 2. Update `src/pages/Index.tsx`
- Import `InteractiveDemoScan`
- Place it between `AuditHero` and `SocialProofStrip` (before the lead funnel, after the hero — this is the "watch before you commit" moment)
- Only show when `flowMode === 'A'` and `!gradeRevealed`

### 3. No tailwind.config changes needed
All required tokens (`primary`, `brand-amber`, `destructive`, `brand-lime`, `card`, `background`, `foreground`, `muted-foreground`) already exist.

## Placement in Page Flow

```text
LinearHeader
AuditHero
InteractiveDemoScan  ← NEW (auto-playing demo)
SocialProofStrip
TruthGateFlow
UploadZone
...
```

