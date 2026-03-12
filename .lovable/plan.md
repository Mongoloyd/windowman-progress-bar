

# Replace WindowMan Icon with Character Image

## What I'll do
Replace the middle "WM" circle icon and its "WindowMan / The market maker" text in the flow diagram with the uploaded superhero image. The image will be constrained to match the width of the "How we make money" card column below it.

## Improvement suggestion
Instead of just swapping the icon, I'll remove the circular border/background container entirely and let the character image stand on its own — it's a rich illustration that doesn't need to be crammed into a circle. The image will be centered, scaled to roughly the width of the middle grid column (~33% of the 3-column grid, capped around 200px), and the "WindowMan" / "The market maker" labels beneath will remain.

## Changes

### 1. Copy the image into the project
- Copy `user-uploads://windowman_with_truth_report_on_the_phone_webp.webp` to `src/assets/windowman-hero.webp`

### 2. `src/components/MarketMakerManifesto.tsx`
- Import the image: `import windowmanHero from "@/assets/windowman-hero.webp";`
- Replace the Node 2 circle `<div>` (lines 152-166) containing the "WM" text with an `<img>` tag using the imported image
- Style: `max-width: 200px`, `width: 100%`, `height: auto`, no circular border/background
- Keep the "WindowMan" and "The market maker" labels below the image

