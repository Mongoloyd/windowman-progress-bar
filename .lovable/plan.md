

# Add Hand-Scanner Hero to AuditHero Mobile Layout

The hand-scanner image hasn't been added to the project yet. I need to copy the asset and add the mobile-only hero block.

## Steps

### 1. Copy asset
- Copy `user-uploads://hand_scannner_transparnet.webp` to `src/assets/hand-scanner-hero.webp`

### 2. `src/components/AuditHero.tsx`
- Import the image: `import handScannerHero from "@/assets/hand-scanner-hero.webp";`
- Add a **mobile-only block** (`md:hidden`, order-0) at the top of the grid, before the left column. Structure:
  1. **"WINDOWMAN"** wordmark — Jost 800, centered, dark color
  2. **Hand-scanner image** — centered, `max-width: 85vw`, `max-height: 40vh`, `object-fit: contain`
  3. **"FORENSIC QUOTE ANALYSIS"** subtitle — DM Mono, tracked, muted color, centered
- This block gets `order-0` so it renders first on mobile; existing left column stays `order-1`, right column stays `order-2`

