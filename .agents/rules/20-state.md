# 20 — State & Data

- Cart/wishlist/session are Zustand stores under `src/app/state/`, each
  using `persist` → `localStorage` (`abbshir:cart`, `abbshir:wishlist`,
  `abbshir:session`). Components consume the store's hook only.
- Catalog/brand/category data is read through `services/commerce/*`
  (`CommerceCatalogProvider` in `types/ecommerce.ts`), never imported as
  raw JSON directly into a page/component. This is the seam a real backend
  replaces later — keep it clean even though today it's just JSON reads.
- Money is integer fils, never a float, anywhere in state or JSON. Format
  with `Intl.NumberFormat` at the display boundary only.
- Tiered pricing goes through the single `getUnitPrice()` function in
  `types/ecommerce.ts` — no inline price-tier logic in components.
- Data edits to `products.json`/`products2.json` (or a new `catalog.json`)
  are additive only; every product resolves to a real `brandId` and
  `categoryId`; slugs are unique and stable once assigned.
