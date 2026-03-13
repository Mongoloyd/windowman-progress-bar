## What You Want

Remove the dot separators (`·`) between the trust items ("No account required", "Your contractor never knows", "Results in 60 seconds") and stack them vertically so each green checkmark + text sits on its own line, perfectly aligned.

## What I Will Do

**File:** `src/components/AuditHero.tsx`

1. **Line 240** — Change the container from horizontal `flex-wrap` to vertical `flex-col`:
  ```tsx
   className="flex flex-col gap-y-1 mt-4"
  ```
2. **Lines 248-252** — Remove the dot separator and keep only the checkmark + text:
  ```tsx
   {trustItems.map((item, i) => (
     <span key={i} className="flex items-center gap-1">
       <span style={{ color: "#059669" }}>✓</span>
       {item}
     </span>
   ))}
  ```

All styling, fonts, and colors preserved. Just layout direction and dot removal.  
  
in the check marks look jagged . Please update the container class to `flex flex-col items-start w-fit mx-auto gap-y-1 mt-4` so the checkmarks form a perfectly straight vertical line while keeping the whole block centered on the page."