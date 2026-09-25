# Abbshir FODDERS — Global Agent Rules

> Canonical single source of hard constraints. Every agent reads this before
> touching code. Conflicts with a task prompt → stop and report.

---

## 1. Internationalization & RTL

- Every string a user sees is bilingual: reuse the `{ en: string; ar: string }`
  shape already used in `products.json`, or add a key to
  `LanguageContext`'s `translations` map. Never hardcode an English (or
  Arabic) literal in JSX for new e-commerce copy.
- Test every new page with the language toggle in **both** states. Layouts
  built with `flex`/`grid` + logical Tailwind properties (`ps-`, `pe-`,
  `text-start`) survive RTL; layouts hardcoded with `ml-`/`pl-`/`text-left`
  usually don't — prefer the logical variants for anything new.
- Numbers, prices, and quantities are not mirrored in RTL — only text
  direction and layout flip.

## 2. Money & Pricing

- Never store or compute prices as JS `float`. Use integer minor units
  (fils) internally; format with `Intl.NumberFormat('en-AE', { style:
  'currency', currency: 'AED' })` (and the `ar-AE` locale variant) only at
  the display boundary.
- Bulk/tiered pricing (`bulkPricing` on a product) must be evaluated by a
  single pure function (e.g. `getUnitPrice(product, quantity)`), never
  duplicated inline in the product card, product detail page, and cart —
  one function, three call sites.

## 3. State Management

- Cart, wishlist, and (mock) session state are Zustand stores under
  `src/app/state/`, each with the `persist` middleware writing to
  `localStorage` under a namespaced key (`abbshir:cart`, `abbshir:wishlist`,
  `abbshir:session`). Page/section components read via the store's hook —
  never reach into `localStorage` directly from a component.
- Server-shaped data (catalog, brands, categories) is fetched through
  `services/commerce/*`, not imported as raw JSON directly into page
  components — even though today that service just reads the JSON file.
  This is the seam that makes a future real backend a one-file change.

## 4. Component Reuse

- Before writing any new UI primitive, check
  `src/app/components/ui/` for an existing shadcn component that already
  does it (`card`, `sheet`, `dialog`, `select`, `dropdown-menu`, `form`,
  `input`, `label`, `table`, `tabs`, `skeleton`, `badge` if present,
  `separator`). Compose, don't reinvent.
- New composite components (a `ProductCard`, a `CartLineItem`, a
  `BulkPriceTable`) live in `src/app/components/shop/` — a new folder,
  parallel to the existing flat `components/` — so shop-specific
  components don't get mixed with the landing-page ones.

## 5. Data & Domain

- Extending `products.json`/`products2.json` (or a new `catalog.json`) is
  additive only — see Invariant #4 in `AGENTS.md`. Run a schema-shape check
  against every existing item after editing so `ProductsSection.tsx` (the
  existing landing-page carousel) doesn't break.
- Every product has exactly one `brandId` and one `categoryId`, both
  resolvable against the `brands`/`categories` lookup tables defined in
  `types/ecommerce.ts`. No product ships with a dangling/unknown ID.
- Slugs (`arasco-wafi-breeding-14`-style) are lowercase, hyphenated, stable
  once assigned (used as the `/product/:slug` route param and as a
  de facto permalink) — do not regenerate slugs when unrelated product
  fields change.

## 6. Routing

- All shop routes are added inside the existing `<Routes>` in `App.tsx`:
  `/shop`, `/product-brand/:brandId`, `/product/:slug`, `/cart`, `/signin`,
  `/register`. Keep the existing `/`, `/ar`, `/en`, and catch-all `*` routes
  untouched unless a task says otherwise.
- `Navigation.tsx` gets the new links (Shop, Cart icon w/ item-count badge,
  Sign in) — do not build a second, parallel nav.

## 7. Testing & Verification

- No test runner is installed yet (`package.json` has none). The first task
  that needs one (state logic: `getUnitPrice`, cart reducer/store) adds
  Vitest + React Testing Library — do not silently skip tests because "no
  runner exists," and do not add a second, different runner later.
- Every task ends with a manual verification pass per `AGENTS.md`'s
  Definition of Done, and updates `PROJECT_SNAPSHOT.md`.

## 8. Scope Discipline

- A task that touches `/cart` does not also refactor `/shop`'s filter
  sidebar "while we're in there." File a follow-up task instead. Cross-task
  scope creep is the #1 way these plans rot — see `TASK_EXECUTION_MATRIX.md`'s
  execution rule (one task per fresh conversation).
