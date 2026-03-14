

## Plan: Fix Double-Upload Bug in UploadZone

### Root Cause

The bug is on **lines 103 and 115-123**. The hidden `<input type="file">` is positioned with `position: absolute; inset: 0; opacity: 0` — meaning it covers the entire drop zone. When the user clicks:

1. The click hits the **invisible `<input>`** (which natively opens the file picker)
2. The click **also bubbles up** to the parent `<div>` which calls `inputRef.current?.click()` on line 103, opening the file picker **a second time**

The first picker gets immediately replaced by the second one, so the file from the first selection is lost. The user has to pick twice.

### Fix (in `src/components/UploadZone.tsx`)

1. **Remove the overlaid invisible input.** Change the `<input>` from `position: absolute; inset: 0` to `display: none`. It should not be a click target at all.

2. **Keep the container `onClick`** that calls `inputRef.current?.click()` — this becomes the sole trigger for the file picker.

3. **Reset the input value before opening.** Add `inputRef.current.value = ""` before calling `.click()` so re-selecting the same file still fires `onChange`.

### What stays the same
- The "File Ready" state with checkmark, filename, and size (already implemented lines 136-169)
- Drag-and-drop handlers (unaffected — they use `onDrop`, not click)
- The "Change file" button with `e.stopPropagation()`

### Files Modified
- `src/components/UploadZone.tsx` — Change input from absolute-positioned overlay to `display: none`, reset value before `.click()`

