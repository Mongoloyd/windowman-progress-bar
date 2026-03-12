

# Hybrid Evidence Images in IndustryTruth — Full Senior Dev Implementation

## Summary

Add 3 AVIF evidence images to the IndustryTruth section using a hybrid responsive strategy: **Card Flip on desktop**, **Swipe Carousel on mobile**. Includes lightbox, skeleton loaders, gradient caption overlays, ARIA accessibility, and synchronized motion animations.

## Assets

Copy the 3 uploaded AVIF files to `src/assets/`:
- `Hidden_contract_terms_blurry_webp.avif` → `src/assets/hidden-contract-terms.avif`
- `Forensic_Analysis_Report.avif` → `src/assets/forensic-analysis-report.avif`
- `NOA.avif` → `src/assets/noa-letter.avif`

## Changes to `src/components/IndustryTruth.tsx`

### Data: Add image paths + captions + alt text to the blocks array

Each block gets an `image` import, a `caption` string, and an `alt` string:
- "Unspecified Brands" → `hidden-contract-terms.avif`, caption: "What fine print really looks like", alt: "Close-up of confusing window contract fine print"
- "Vague Warranty Language" → `forensic-analysis-report.avif`, caption: "What our forensic scanner finds", alt: "AI forensic analysis report highlighting hidden window warranty flaws"
- "Hidden Fee Structure" → `noa-letter.avif`, caption: "Good vs. bad — can you tell?", alt: "Comparison of a good and bad impact window Notice of Acceptance letter"

### Desktop (md+): Evidence Card Flip

Inside each `motion.div` block, add the image above the icon/heading (visible only on `md+` via `hidden md:block`):
- `<img>` with explicit `width={400}` `height={225}` (16:9 aspect), `style={{ aspectRatio: "16/9" }}`, `loading="lazy"`, `decoding="async"`, `fetchPriority="low"`
- `rounded-t-xl`, `object-cover`, `w-full`, max-height ~140px
- **Skeleton fallback**: Wrap in a container with `bg-muted animate-pulse` that shows until `onLoad` fires, then hides
- **Click to enlarge**: onClick opens a Radix Dialog (lightbox) showing the full-res image
- Inherits the parent `motion.div` stagger animation (already has `delay: i * 0.15`)

### Mobile (<md): Swipe-to-Reveal Carousel

Between the header `motion.div` and the education grid, add a `md:hidden` carousel section:
- Uses `embla-carousel-react` (already installed)
- Container gets `aria-roledescription="carousel"`, `role="region"`, `aria-label="Evidence documents"`
- 3 slides, each with:
  - `<img>` with same perf attributes as desktop (ensure `z-index: 0`)
  - **Gradient overlay**: `bg-gradient-to-t from-black/60 to-transparent` at the bottom of each slide (`z-index: 10`)
  - **Caption text** over the gradient: white, DM Sans, 13px, `text-shadow` for extra safety, and `relative z-20` to guarantee it never falls behind the image
  - **Skeleton loader**: Same `bg-muted animate-pulse` pattern
  - **Scale-in animation**: Each slide uses `motion.div` with `initial={{ opacity: 0, scale: 0.95 }}` synced to the section's `useInView`
  - **Click to enlarge**: Same lightbox behavior as desktop
- **Dot indicators** below with `aria-label="Go to slide X of 3"` on each dot, keyboard navigable
- Dots styled as small circles, active dot uses `#0099BB`

### Lightbox Component (inline in same file)

A simple Radix `Dialog` (already available via `@radix-ui/react-dialog`):
- Opens on image click (both desktop and mobile)
- Shows the full-resolution image centered on a dark overlay
- Close button (X) in top-right
- `DialogTitle` and `DialogDescription` for a11y (can be visually hidden)

## Performance Checklist

| Attribute | Applied |
|-----------|---------|
| `loading="lazy"` | All 6 img tags (3 desktop + 3 mobile) |
| `decoding="async"` | All 6 |
| `fetchPriority="low"` | All 6 |
| `width` + `height` HTML attrs | All 6 (prevents CLS) |
| `aspect-ratio` CSS | All 6 (reserves space) |
| Skeleton fallback | All 6 (prevents broken icon flash) |
| AVIF format | Smallest file size available |
| ES6 module import | Vite hashes + caches |
| `onError` fallback | Shows muted bg if asset fails |

## Accessibility Checklist

- All images have specific alt text applied from the data array above
- Carousel container: `aria-roledescription="carousel"`, `role="region"`
- Each slide: `role="group"`, `aria-roledescription="slide"`
- Dot indicators: `aria-label="Go to slide N of 3"`, `role="tablist"` / `role="tab"`
- Keyboard: left/right arrows navigate slides
- Lightbox: focus trap, Escape to close, `aria-label` on close button

## What does NOT change

- No text, font, color, or copy changes
- No changes to the Statement Block or CTA section
- No changes to `Index.tsx`
- No changes to form logic anywhere
- Existing motion animation timings preserved exactly

