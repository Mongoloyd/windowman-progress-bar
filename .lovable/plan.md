

# Update Typography for Mobile Line Break

## Change

**File:** `src/components/AuditHero.tsx` (line 412)

Replace the single text string with two `<span>` elements and a `<br />` tag that is visible on mobile but hidden on larger screens:

```tsx
<span>This is a sample.</span>
<br className="md:hidden" />
<span> Your quote will generate a real grade.</span>
```

The parent `<p>` tag already has `text-center`-equivalent inline styling. Add `textAlign: "center"` to the existing inline style if not present.

One line changed, no new files or dependencies.

