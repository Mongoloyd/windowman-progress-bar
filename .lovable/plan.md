

## Problem

The mobile vertical timeline has a layout bug: the numbered circles (40px wide) overlap with the step titles because the container only has `pl-8` (32px) padding and the circles are positioned at `-left-8`. The circle bleeds into the text by ~8px, as visible in your screenshot.

## 5 Improved Versions

I recommend picking one. All fix the overlap bug. Each offers a different UX/UI approach.

---

### Version 1: Clean Card Timeline
Fix the overlap and wrap each step in a subtle card for better scannability.

- Increase `pl-12` so text clears the 40px circle
- Adjust circle to `absolute -left-12`
- Wrap each step's text in a light card (`bg-white rounded-xl p-4 shadow-sm border border-gray-100`)
- Connecting line stays as vertical spine

**Feel:** Structured, modern, easy to scan.

---

### Version 2: Numbered Badge (No Timeline)
Remove the vertical line entirely. Use inline numbered badges next to each step.

- Remove the vertical connecting line and absolute positioning
- Each step is a horizontal row: `flex items-start gap-4`
- Number badge is a static `flex-shrink-0` 36px circle (cyan background, white text)
- Title and copy sit beside it, naturally flowing
- Add `mb-6` gap between steps

**Feel:** Simple, clean, no overlap possible. Like a numbered list with polish.

---

### Version 3: Accordion Steps
Collapse each step into an expandable accordion — title always visible, copy revealed on tap.

- Use shadcn `Accordion` component
- Each trigger shows the number badge + title in a row
- Content panel reveals the description copy
- First item open by default
- Reduces vertical scroll on mobile significantly

**Feel:** Interactive, compact, modern SaaS onboarding pattern.

---

### Version 4: Horizontal Swipe Carousel
Replace the vertical list with a swipeable card carousel on mobile.

- Use shadcn `Carousel` component (already installed)
- Each slide is a centered card with the number, title, and copy
- Dot indicators below showing 1–5 progress
- Cards have the cyan accent border on the active slide

**Feel:** App-like, engaging, reduces perceived length of section.

---

### Version 5: Minimal Fix Only
Just fix the overlap bug with minimal changes. Keep the existing vertical timeline design.

- Change container from `pl-8` → `pl-14`
- Change circle from `-left-8` → `-left-14`
- Adjust connecting line from `left-[19px]` → `left-[27px]` (center of circle at new position)
- No other design changes

**Feel:** Identical to current design, just properly spaced.

---

## Recommendation

**Version 2** (Numbered Badge) gives the best mobile UX — zero overlap risk, no absolute positioning fragility, clean and readable. Version 5 is the safest if you just want the bug fixed.

Pick a version (or combine elements) and I will implement it.

