

# Upgrade EvidenceLightbox to Gallery Mode

## Changes

### 1. `src/components/EvidenceLightbox.tsx` — Full rewrite

**New props interface:**
- `images: Array<{ src: string; alt: string }>` — all 3 evidence images
- `currentIndex: number` — which image is open
- `onIndexChange: (index: number) => void` — navigate to a different image
- `open: boolean` and `onOpenChange` — same as before

**Desktop arrows (md+):**
- Import `ChevronLeft`, `ChevronRight` from lucide-react
- Two absolute-positioned buttons on left/right center of the image: `bg-black/20 hover:bg-black/50 text-white p-3 rounded-full transition-colors`
- Hidden on mobile (`hidden md:flex`)

**Keyboard navigation:**
- Add a `useEffect` that listens for `ArrowLeft`/`ArrowRight` keydown events when `open` is true, calling `onIndexChange` with wrapped index

**Mobile swipe:**
- Use `motion.img` with `drag="x"` and `dragConstraints={{ left: 0, right: 0 }}` plus `onDragEnd` handler
- If drag offset exceeds 50px threshold, navigate prev/next
- Wrap in `AnimatePresence mode="wait"` with horizontal slide transition (`initial/animate/exit` using `x: 100` / `x: 0` / `x: -100`)

**Image transition (desktop too):**
- Use `AnimatePresence` + `motion.img` with `key={currentIndex}` for a subtle crossfade on both breakpoints

**Counter:**
- Small `"1 / 3"` text indicator centered below the image: `text-white/70 text-sm font-mono mt-2 text-center`

**Infinite loop:**
- All navigation wraps: `(currentIndex + 1) % images.length` and `(currentIndex - 1 + images.length) % images.length`

**Preserved:** Focus trap (Radix Dialog), Escape to close, `object-contain max-h-[85vh]`, `decoding="async"`, sr-only title/description.

### 2. `src/components/IndustryTruth.tsx` — Minor update

Update the `<EvidenceLightbox>` call (lines 259-264) to pass the new props:

```tsx
<EvidenceLightbox
  open={lightboxIndex !== null}
  onOpenChange={(open) => !open && setLightboxIndex(null)}
  images={blocks.map(b => ({ src: b.image, alt: b.alt }))}
  currentIndex={lightboxIndex ?? 0}
  onIndexChange={setLightboxIndex}
/>
```

No other changes needed in this file.

### Additional enhancement included

**Preloading:** When the lightbox opens, preload the adjacent images (prev/next) using `new Image().src = ...` in a `useEffect` so transitions feel instant.

Two files changed. No new dependencies.

