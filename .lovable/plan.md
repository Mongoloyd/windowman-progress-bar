

# Replace ScamConcernImage WebP with AVIF

## Steps

1. **Copy asset**: `user-uploads://Homeowner_being_pitched_by_a_window_salesman_wondering_if_he_s_getting_scammed.avif` → `src/assets/scam-concern.avif`

2. **Delete old asset**: Remove `src/assets/homeowner-scam-concern.webp`

3. **Update `src/components/ScamConcernImage.tsx`**:
   - Change import from `@/assets/homeowner-scam-concern.webp` to `@/assets/scam-concern.avif`
   - Everything else stays identical

Two-file operation (asset swap + import update). No logic or layout changes.

