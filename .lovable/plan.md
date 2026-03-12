

## Assessment

**Will doubling to 400px cause problems?** Yes, likely:

1. **Layout breakage on tablet/small desktop (640–900px):** The flow diagram uses a horizontal flex row with max-width 700px. The "You" and "Contractor" nodes are 80px circles. A 400px image in the center would consume over half the container, squeezing the arrows and side nodes into nearly nothing — or forcing them to wrap vertically even on desktop.

2. **Visual imbalance:** The side nodes (80px circles) next to a 400px hero image will look disproportionate. The diagram will feel lopsided rather than like a balanced three-node flow.

3. **Mobile stacking:** At 400px max-width, the image would dominate the entire mobile viewport width, pushing the labels and arrows far apart.

## Better approach

Instead of forcing a huge image inline within the flow diagram, I'd recommend a **stacked layout**:

1. **Pull the WindowMan hero image out above the flow diagram** as a standalone, prominently sized element (max-width ~300–360px, centered).
2. **Keep the flow diagram below it** with three evenly sized nodes (all using the 80px circle style, with a small WindowMan icon or logo in the center node).
3. This gives the hero image the visual prominence you want without distorting the information architecture of the diagram.

**Alternatively**, if you want to keep it inline, a more moderate increase to **max-width 260px** would double the visual area (~1.4× each dimension) while still fitting the 700px container comfortably.

## Proposed plan (moderate inline increase)

### `src/components/MarketMakerManifesto.tsx`
- Line 152: Change container `maxWidth` from `200` to `280`
- Line 156: Change image `maxWidth` from `180` to `260`
- Increase the overall diagram `maxWidth` from `700` to `800` to accommodate the larger center node

This keeps the three-node flow readable while making WindowMan noticeably larger — roughly 2× the visual area without breaking the layout.

