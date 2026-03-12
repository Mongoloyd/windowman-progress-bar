

# Add Advanced Hover State to EvidenceImage Component

## Change: `src/components/EvidenceImage.tsx`

**Import**: Add `Search` from `lucide-react`.

**Container div** (line 24-27): Update classes to `relative overflow-hidden group cursor-pointer rounded-t-xl hover:shadow-lg transition-shadow duration-500`. Add `role="button"`, `tabIndex={0}`, move `onClick` here, and add `onKeyDown` handler for Enter/Space.

**Image** (line 49-51): Replace `cursor-pointer transition-opacity duration-300` with `transition-all duration-500 transform-gpu group-hover:scale-110 group-hover:brightness-90`. Keep the conditional opacity class. Remove `onClick` from img.

**Inspect badge**: After the `<img>`, add an absolute-positioned badge:
```
<div className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <Search className="h-4 w-4" />
</div>
```

Single file change. All existing image perf attributes preserved.

