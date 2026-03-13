

# Shift Trust Items to the Left

**File:** `src/components/AuditHero.tsx` (~line 240)

Change the container className from:
```
flex flex-col items-start w-fit mx-auto gap-y-1 mt-4
```
to:
```
flex flex-col items-start w-fit ml-0 gap-y-1 mt-4
```

This removes the auto-centering (`mx-auto` → `ml-0`) so the checkmark block aligns with the left-aligned headline text above it. All other styling preserved.

