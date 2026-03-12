# Add "Am I Getting Scammed?" Image Section + CRO & Best Practices

## What I will do

1. **Copy the uploaded image** to `src/assets/homeowner-scam-concern.webp`
2. **Create a new component** `src/components/ScamConcernImage.tsx` — a simple full-width image section
3. **Place it in `Index.tsx**` between `SocialProofStrip` (the "4,127 Florida Homeowners…" strip) and `InteractiveDemoScan` (above the baseline tool), and also between `FlowBEntry` and `MarketBaselineTool` in Flow B

The component will be a centered, max-width-constrained image with subtle fade-in animation.

---

## Image Best Practices Applied

1. **Lazy loading** — `loading="lazy"` so it only loads when near viewport
2. `**decoding="async"**` — non-blocking decode, prevents main thread jank
3. **Explicit `width`/`height` attributes** — prevents Cumulative Layout Shift (CLS)
4. Use the **aspect-ratio** calculated from the raw image (e.g., `aspect-ratio: 16 / 9`) to ensure the "Color Ghosting" block is the exact size of the final image before it loads.
5. **WebP format** — already optimized; smallest file size for the quality
6. **Meaningful `alt` text** — accessibility + SEO ("Homeowner wondering if contractor quote is fair")
7. `**fetchpriority="low"**` — tells browser this is not above-the-fold critical
8. **ES6 module import** from `src/assets/` — Vite hashes, caches, and optimizes the asset
9. **Separate component** — keeps Index.tsx clean, single responsibility
10. `**object-fit: cover**` with `max-height` constraint — consistent rendering across aspect ratios
11. **Responsive sizing** — `w-full max-w-4xl` with padding so it works on all breakpoints
  &nbsp;

---

## 3 Senior Dev CRO Ideas for Better Placement

### 1. Place it as an emotional anchor BEFORE the lead form, not after

Current plan puts it between social proof and the baseline tool — this is correct. The image creates an emotional "pattern interrupt" right when the user is deciding whether to engage with the tool. It validates their fear ("Am I getting scammed?") and motivates them to use the free tool below.

### 2. Use it as a scroll-triggered reveal with slight parallax

Rather than a static image, fade it in with a subtle `y: 20 → 0` animation as it enters the viewport. This draws the eye without being distracting. A parallax shift of 15-20px on scroll would add depth. The emotional impact of the image is stronger when it "arrives" rather than sitting there.

### 3. Add a single-line caption below the image as a micro-CTA

Something like: *"Don't Sign Until You've Got Your Free WindowMan Truth Report →"* with an arrow linking/scrolling to the baseline tool. This converts the emotional moment into action. The image alone is powerful but pairing it with a directional nudge increases scroll-through rate to the lead capture form.

Since you are using **Tailwind** (based on your previous plan's class names), don't hardcode the hex in the component. Use the theme-aware classes in your `ScamConcernImage.tsx`:

TypeScript

```
// Inside your <figure> or container div:
className="w-full bg-sky-50 dark:bg-sky-950 animate-pulse"
```