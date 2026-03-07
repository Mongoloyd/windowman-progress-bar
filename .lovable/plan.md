

## Problem

The "Start My AI Scan" button in `UploadZone` works correctly in code — clicking it calls `onScanStart` which sets `showScan(true)`, which should activate `ScanTheatrics`. The wiring in `Index.tsx` is correct.

The likely issue is that **the scan button click is being swallowed by the hidden file input**. In `UploadZone.tsx` (lines 104-112), the file input has `position: absolute, inset: 0` covering the entire drop zone. When the file-selected state renders, the inner content div has `e.stopPropagation()` but the file input is still positioned on top with `inset: 0`, potentially intercepting clicks on child elements.

However, the scan button is **outside** the drop zone div, so this shouldn't be the cause. Let me reconsider.

Another possibility: the user may be referring to the **"Show Me My Grade" submit button** in `TruthGateFlow`, not the scan button. The form submit calls `onLeadCaptured()` which sets `showUpload(true)` — but the `UploadZone` might not scroll into view, making it seem like nothing happened.

## Plan

1. **Add scroll-into-view on UploadZone reveal** — When `showUpload` becomes true, smooth-scroll the UploadZone into the viewport so the user sees it appear.

2. **Add scroll-into-view after file upload** — When the scan button is clicked, ensure the `ScanTheatrics` overlay activates (it's fixed-position so visibility isn't an issue, but confirm the state flows correctly).

3. **Add a `useEffect` + `useRef` in `UploadZone`** to scroll itself into view when `isVisible` transitions to `true`.

4. **Verify the scan button isn't obstructed** — The file input overlay inside the drop zone could theoretically extend beyond its parent if there's an overflow issue. Add `overflow: hidden` to the drop zone container to be safe, though it likely already clips.

5. **Add console.log debugging** to `handleScan` in `UploadZone` and the `onScanStart` handler in `Index.tsx` to trace the click path.

### Files to modify:
- **`src/components/UploadZone.tsx`**: Add a `ref` and `useEffect` to scroll into view when visible. Add a console.log at the top of `handleScan` before the `!file` check.
- **`src/pages/Index.tsx`**: Add a console.log inside `onScanStart` to confirm state update fires.

