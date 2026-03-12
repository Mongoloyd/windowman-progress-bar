

# Import Readiness Audit — Complete Checklist

## 1. NPM Dependencies ✅ ALL CLEAR

| Package | Source Uses | Your Project | Status |
|---------|-----------|--------------|--------|
| `framer-motion` | `motion`, `AnimatePresence` | `^12.35.0` installed | ✅ |
| `lucide-react` | `X` icon (ExitIntentModal only) | `^0.462.0` installed | ✅ |
| `react` / `react-dom` | hooks | installed | ✅ |

No additional npm packages needed.

## 2. Custom Hooks / Utils ✅ ALL CLEAR

I read every import line across all three files. They import **only** from `react`, `framer-motion`, and `lucide-react`. Zero local imports — no `useExitIntent`, no `useLocalStorage`, no `cn()`, no shared utils.

## 3. Tailwind Color Tokens ⚠️ MISSING — This Is the Real Blocker

The three components use **19 semantic color classes** that don't exist in your current `tailwind.config.ts`. Without these, every colored element renders as transparent/default.

### What must be added to `tailwind.config.ts` → `theme.extend.colors`:

```text
navy:        hsl(var(--color-navy))          // text-navy, bg-navy
navy-light:  hsl(var(--color-navy-light))
navy-lighter:hsl(var(--color-navy-lighter))
cyan:        hsl(var(--color-cyan))          // bg-cyan, border-cyan
cyan-light:  hsl(var(--color-cyan-light))    // bg-cyan-light
cyan-text:   #006B8E                         // text-cyan-text
gold:        hsl(var(--color-amber))         // bg-gold, border-gold
gold-light:  hsl(var(--color-gold-light))    // bg-gold-light
emerald:     hsl(var(--color-emerald))       // bg-emerald
emerald-text:#065F46                         // text-emerald-text
green-light: hsl(var(--color-green-light))   // bg-emerald-light maps here
danger:      hsl(var(--color-danger))        // text-danger, border-l-danger
danger-light:hsl(var(--color-red-light))     // bg-danger-light
warning:     hsl(var(--color-warning))       // text-warning, border-warning
amber-text:  #92400E                         // text-amber-text
```

### What must be added to `src/index.css` → `:root`:

```text
--color-navy: 210 25% 10%;
--color-navy-light: 214 30% 15%;
--color-navy-lighter: 213 30% 20%;
--color-amber: 38 92% 50%;
--color-cyan: 187 100% 50%;
--color-emerald: 160 84% 39%;
--color-danger: 0 79% 43%;
--color-warning: 32 90% 44%;
--color-gold-light: 48 100% 96%;
--color-cyan-light: 190 100% 94%;
--color-green-light: 152 81% 90%;
--color-red-light: 0 86% 97%;
--cyan-text: 195 100% 28%;
--amber-text: 22 84% 31%;
--emerald-text: 166 90% 20%;
--danger-text: 0 80% 43%;
```

## 4. Font Families ⚠️ MISSING

The components use three font utility classes that don't exist in your config:

| Class Used | Maps To | Your Current Equivalent |
|-----------|---------|------------------------|
| `font-display` | Poppins | `font-heading` (Jost) |
| `font-body` | Inter | `font-sans` (Jost) |
| `font-mono` | JetBrains Mono | none configured |

**Options**: Either (a) add `font-display`, `font-body`, `font-mono` aliases pointing to your existing fonts (Jost), or (b) install the Report Pro fonts (Poppins, Inter, JetBrains Mono) for visual fidelity.

## Implementation Plan

| Step | File | What |
|------|------|------|
| 1 | `src/index.css` | Add 16 CSS custom properties to `:root` |
| 2 | `tailwind.config.ts` | Add `navy`, `cyan`, `gold`, `emerald`, `danger`, `warning` color objects + `font-display`, `font-body`, `font-mono` font families |
| 3 | `src/components/InteractiveDemoScan.tsx` | Copy from Report Pro (379 lines, self-contained) |
| 4 | `src/components/ExitIntentModal.tsx` | Copy from Report Pro (288 lines, self-contained) |
| 5 | `src/components/FlowCEntry.tsx` | Copy from Report Pro (97 lines, self-contained) |

No wiring into `Index.tsx` — you place them where you want.

