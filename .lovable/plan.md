

# Fix StickyRecoveryBar Layout

## Current issues
- Desktop: text/dots, progress bar, and buttons are in a `flex-wrap` row but the text block and buttons can wrap onto separate rows
- Mobile: text (`line1`) shows above buttons; `line2` is hidden. Buttons stack vertically due to wrapping

## What I will do

### Mobile (below `sm` / 640px)
- **Hide the entire left status section** (dots + text) on mobile — no wording shows, just buttons
- **Hide the center progress bar** (already hidden below `md`)
- **Two buttons sit side by side** in a single row, equal width, with the close `×` button beside them
- Reduce button padding slightly so both fit comfortably

### Desktop (`sm` and above)
- **Single row layout**: dots + text on the left, buttons + close on the right, all sharing one horizontal line
- Remove `flex-wrap` so nothing wraps to a second row
- Keep the mini progress bar visible on `md+` between text and buttons

### Specific changes in `StickyRecoveryBar.tsx`
1. Add `hidden sm:flex` to the left status `div` (dots + text) so it's hidden on mobile
2. Remove `flex-wrap` from the outer container, keep `flex items-center justify-between`
3. On the buttons container, add `flex-1 sm:flex-none` and `justify-center sm:justify-end` so buttons center on mobile and align right on desktop
4. Add `min-w-0` and `text-sm` adjustments to prevent text overflow on smaller desktops

