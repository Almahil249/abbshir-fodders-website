# Abbshir FODDERS — Agentic Build: Step 1 (Architecture) + Step 2 (Tasks)

**Execution rule:** run exactly ONE task per coding-agent conversation
(Antigravity, Claude Code, etc.). Start a fresh conversation per task so
context doesn't bleed between unrelated changes. Every prompt below
assumes the repo root already contains `AGENTS.md`, `RULES.md`,
`PROJECT_SNAPSHOT.md`, `types/ecommerce.ts`, and the `.agents/` tree from
this package.

Model roster available: **Gemini 3.8 Flash**, **Gemini 3.1 Pro**,
**Claude Sonnet 4.6**, **Claude Opus 4.6**. Routing below follows one
rule: reconnaissance/templated/well-specified UI → cheapest model that can
do it; anything with irreversible architectural consequences, security
surface, or genuinely ambiguous trade-offs → Opus 4.6 (Thinking); the
large middle band of "well-defined but non-trivial" feature work → Sonnet
4.6 (Thinking).

---

## STEP 1 — Super Architect (run this first, once)

| | |
|:---|:---|
| **Model** | **Claude Opus 4.6 (Thinking)** |
| **Justification** | Sets the domain model, the state strategy, and the backend seam that every later task builds on — the one place where a wrong call is expensive to unwind. Also the only task that needs to hold the whole existing codebase (bilingual system, no-backend constraint, shadcn kit) and the whole target (sudanriver.com IA) in view at once. |
| **Skills to load** | `domain-modeling`, `codebase-design`, `writing-for-agents`, `to-tickets`, `security-review` (light pass, for the mock-auth boundary) |

```text
/goal Act as Super Architect for the Abbshir FODDERS e-commerce build.

Read @AGENTS.md , @RULES.md , @PROJECT_SNAPSHOT.md , and @types/ecommerce.ts
first — they encode verified facts about this repo (Vite+React+TS+
react-router-dom v7, shadcn/ui already vendored in
src/app/components/ui/, bilingual EN/AR via LanguageContext, NO backend,
NO state library, products.json/products2.json with no price/brand/
category/stock fields). Do not re-derive what's already stated there —
verify it against the actual files instead, and correct
PROJECT_SNAPSHOT.md if anything has drifted.

Then, before writing any code:
1. Open these seven reference URLs and actually look at them (screenshot
   or describe layout, don't guess from the URL alone):
   https://sudanriver.com/
   https://sudanriver.com/shop
   https://sudanriver.com/product-brand/2
   https://sudanriver.com/product/arasco-wafi-breeding-14
   https://sudanriver.com/cart
   https://sudanriver.com/signin
   https://sudanriver.com/register
   For each, note: information architecture (what's in the sidebar vs.
   main column), the product card anatomy, the PDP section order, the
   cart layout (drawer vs. full page), and the auth form fields. This is
   IA/interaction inspiration only — Abbshir's own visual system
   (theme.css tokens, existing card patterns) still governs colors and
   typography; do not copy sudanriver's branding.

2. Finalize the domain model: review types/ecommerce.ts (already drafted
   with Category, Brand, Product, PriceTier, CartState, WishlistState,
   SessionState, CommerceCatalogProvider, getUnitPrice). Adjust it based
   on what you actually find in products.json/products2.json and the
   reference site's IA — but keep every change additive to the existing
   product fields (name, image, targets, extraImages, goal, stats,
   description, extraDetails) per AGENTS.md Invariant #4.

3. Confirm or revise the state-management strategy: Zustand + persist for
   cart/wishlist/session (see RULES.md §3). If you have a concrete reason
   to prefer something else given what you find in package.json, say so
   and justify it in the Decisions Log — otherwise proceed with Zustand.

4. Confirm or revise the backend seam: services/commerce/* with a
   LocalCatalogProvider (JSON + localStorage) implementing
   CommerceCatalogProvider, per AGENTS.md Invariant #6. Do not scaffold a
   real backend/server — that's explicitly out of scope for this phase.

5. Resolve as many "Open Questions" in PROJECT_SNAPSHOT.md as you
   reasonably can from the reference site + repo inspection (e.g. whether
   /product-brand/:id should be numeric-ID or slug-based — recommend one
   and justify it).

Deliverables (write these, don't just describe them):
- Updated types/ecommerce.ts.
- A short services/commerce/README.md describing the provider interface
  and the swap-to-real-backend plan (no implementation yet — that's T003).
- Updated PROJECT_SNAPSHOT.md: Verified Repository Map corrected, Open
  Questions resolved where possible, Decisions Log filled in with your
  reasoning for each of steps 2-5 above.
- A one-page handoff note (append to PROJECT_SNAPSHOT.md under a new
  "## Architect Handoff to Phase 2" heading) confirming Tasks T000-T012 in
  TASK_EXECUTION_MATRIX.md are still accurate given what you found, or
  listing exactly what needs to change in that file before Phase 2 starts.

Do not implement any UI. Stop and report.
```

---

## STEP 2 — Implementation Task Matrix

Run each task below in its own fresh conversation, in order. Each row
links to its paste-ready prompt underneath the table.

| Task | Name | Model | Justification | Skills |
|:---|:---|:---|:---|:---|
| **T000** | Reconnaissance & Reference Capture | Gemini 3.1 Pro | Read-only, browser-heavy (visits 7 live URLs), no irreversible decisions — cheap model with good vision/browsing is the right fit. | `domain-modeling`, `ui-components` |
| **T001** | Catalog Data Model & Extension | Claude Sonnet 4.6 (Thinking) | Well-defined but consequential — every later task depends on the shape of Product/Brand/Category and slug scheme being right the first time. | `domain-modeling`, `codebase-design` |
| **T002** | State Management (Zustand: cart, wishlist, session) | Claude Sonnet 4.6 (Thinking) | New dependency + store design; needs to reason about persistence, hydration, and the mock-session boundary correctly. | `codebase-design`, `testing` |
| **T003** | `services/commerce/*` Provider Implementation | Claude Sonnet 4.6 (Thinking) | Implements the seam the whole app depends on; must be correct and swap-ready, not just functional. | `codebase-design`, `domain-modeling` |
| **T004** | `/shop` Catalog Grid + Filters + Sort | Claude Sonnet 4.6 (Thinking) | Core, highest-traffic page; sidebar filter state + sort + reused card component is non-trivial UI logic. | `ui-components`, `prototype` |
| **T005** | `/product-brand/:brandId` | Gemini 3.1 Pro | Reuses T004's grid component almost entirely — templated, low-risk. | `ui-components` |
| **T006** | `/product/:slug` Product Detail Page | Claude Sonnet 4.6 (Thinking) | Gallery, spec table, bulk-price display, quantity stepper wired to `getUnitPrice()` and the cart store — several moving parts that must agree. | `ui-components`, `domain-modeling` |
| **T007** | `/cart` (drawer or page) | Claude Sonnet 4.6 (Thinking) | Subtotal/tax/total math, empty states, quantity edit/remove, checkout CTA — needs the pricing function used correctly, not reimplemented. | `ui-components`, `codebase-design` |
| **T008** | `/signin` & `/register` | Gemini 3.1 Pro | Standard form pattern on top of shadcn `form`/`input`; the mock-auth boundary is simple by design (see AGENTS.md Invariant #7). | `ui-components` |
| **T009** | Navigation Integration (Shop/Cart-badge/Sign-in links, mobile menu) | Gemini 3.1 Pro | Wiring existing store state into an existing component — low ambiguity. | `ui-components` |
| **T010** | Bilingual/RTL QA Pass (all new routes) | Claude Sonnet 4.6 (Thinking) | Needs to actually reason about layout breakage in RTL, not just toggle and glance — the constraint most likely to be silently dropped. | `ui-components` |
| **T011** | Responsive & Accessibility Sweep | Gemini 3.8 Flash | Broad, checklist-shaped verification pass across many small viewports/components — fast and cheap is the right tool. | `ui-components` |
| **T012** | Final Review: Data Integrity, Mock-Auth Honesty, Scope Audit | Claude Opus 4.6 (Thinking) | Last gate before calling Phase 2 done — checks for float-money leaks, dangling brand/category IDs, undisclosed mock-auth behavior, and scope creep across all prior tasks. Needs the highest reasoning to catch what the per-task reviews missed. | `security-review`, `code-review` |

---

### Prompt T000 — Reconnaissance & Reference Capture
```text
/goal Execute Task T000: Reconnaissance & Reference Capture.
Read @AGENTS.md and @PROJECT_SNAPSHOT.md (must reflect the Step 1
Architect Handoff — if that section is missing, stop and report that
Step 1 hasn't been run yet).

Do NOT modify application code. Visit these seven URLs and record what
you actually see (layout regions, component anatomy, field lists) — do
not infer from the URL path alone:
https://sudanriver.com/
https://sudanriver.com/shop
https://sudanriver.com/product-brand/2
https://sudanriver.com/product/arasco-wafi-breeding-14
https://sudanriver.com/cart
https://sudanriver.com/signin
https://sudanriver.com/register

For /shop: note sidebar filter groups, the sort control, and every
element on one product card (image, name, price format, unit label,
CTA buttons).
For the product-brand page: note whether it's a distinct layout or the
shop grid with a brand filter pre-applied.
For the PDP: note section order top-to-bottom (gallery, title, price,
spec/stat table, quantity control, CTA, description tabs if any).
For /cart: note drawer vs. full-page, line-item anatomy, summary block
contents (subtotal/tax/shipping/total), and the checkout CTA.
For /signin and /register: note the exact field list and validation cues.

Write findings into a new "## Reference IA Notes" section of
PROJECT_SNAPSHOT.md , organized by route. Also re-verify the "Verified
Repository Map" section against the actual current repo state (files may
have changed since Step 1). Update it if anything drifted. Mark T000
complete. Stop and report.
```

### Prompt T001 — Catalog Data Model & Extension
```text
/goal Execute Task T001: Catalog Data Model & Extension.
Read @AGENTS.md , @RULES.md , @PROJECT_SNAPSHOT.md (T000 must be complete —
check "Reference IA Notes" exists), and @types/ecommerce.ts.
Activate skills: domain-modeling, codebase-design.

1. Finalize Category and Brand lookup data: Alfalfa, Grass, Grains &
   Concentrates, Feed Additives, Straw (categories); Al Ghurair Foods,
   Arasco, Bartl, Zabeel Feed (brands) — cross-check against what T000
   found on sudanriver.com and against the species/goal patterns already
   in products.json. Create src/app/data/categories.json and
   src/app/data/brands.json matching the Category/Brand shapes in
   types/ecommerce.ts.
2. Extend every item in products.json AND products2.json additively (do
   not remove/rename existing fields — see AGENTS.md Invariant #4) with:
   slug, sku, brandId, categoryId, unit ('bale'|'bag'|'ton'), basePrice
   (integer fils), optional bulkPricing tiers, stock (integer). Use
   realistic-looking placeholder values where real pricing isn't
   available — flag every placeholder with a "// PLACEHOLDER" comment in
   a companion notes file (data/PRICING_TODO.md) listing every product
   that needs a real price from the client.
3. Convert the existing `targets: string[]` emoji arrays to the typed
   SpeciesTarget[] enum from types/ecommerce.ts, keeping a mapping table
   so the existing landing-page ProductsSection.tsx (which renders the
   emoji) still works — check that component and adjust its render logic
   if needed, but do not change its visual output.
4. Verify every product's brandId/categoryId resolves against
   brands.json/categories.json — no dangling references. Verify every
   slug is unique, lowercase, hyphenated.

Update PROJECT_SNAPSHOT.md: mark T001 complete, log any placeholder-price
decision in the Decisions Log, note the file paths created. Stop and
report — list every PLACEHOLDER price so the client can be asked for
real numbers.
```

### Prompt T002 — State Management (Zustand)
```text
/goal Execute Task T002: State Management Setup.
Read @AGENTS.md , @RULES.md (§3), @PROJECT_SNAPSHOT.md (T001 must be
complete). Activate skills: codebase-design, testing.

Add zustand as a dependency. Create src/app/state/ with three stores,
typed against the interfaces in types/ecommerce.ts:
- cartStore.ts — CartState (lines, addItem, updateQuantity, removeItem,
  clear), persisted to localStorage under key "abbshir:cart".
- wishlistStore.ts — WishlistState (productIds, toggle), persisted under
  "abbshir:wishlist".
- sessionStore.ts — SessionState (user, signIn, register, signOut). MOCK
  implementation only: validate shape, "persist" a fake user object to
  localStorage under "abbshir:session" — comment every mock touch point
  with "// MOCK — replace when backend lands" per AGENTS.md Invariant #7.
  Never store a plaintext password in this mock, even fake ones — hash or
  simply don't retain it after the call resolves.

Add Vitest + React Testing Library (no test runner exists yet — check
package.json first, don't add a second one if it's already there from a
prior task). Write unit tests for: getUnitPrice() (from
types/ecommerce.ts) across a no-tier product, a multi-tier product at
boundary quantities; cartStore addItem/updateQuantity/removeItem/clear;
wishlistStore toggle (add then remove).

Do not wire these stores into any UI yet — that's T004+. Update
PROJECT_SNAPSHOT.md: mark T002 complete, note the new dependency and test
runner addition. Stop and report.
```

### Prompt T003 — `services/commerce/*` Provider
```text
/goal Execute Task T003: services/commerce Provider Implementation.
Read @AGENTS.md (Invariant #6), @RULES.md (§3), @PROJECT_SNAPSHOT.md
(T001, T002 must be complete). Activate skills: codebase-design,
domain-modeling.

Implement services/commerce/LocalCatalogProvider.ts, satisfying the
CommerceCatalogProvider interface from types/ecommerce.ts, reading
products.json/products2.json + categories.json + brands.json created in
T001. Implement listProducts (with categoryId/brandId filter and
price-asc/price-desc sort), getProductBySlug, listCategories, listBrands,
getBrand. This is plain synchronous data wrapped in a resolved Promise —
no real network call — but the function signatures must exactly match
the interface so a future real API implementation is a drop-in
replacement.

Export a single configured instance from services/commerce/index.ts
(e.g. `export const catalog: CommerceCatalogProvider =
new LocalCatalogProvider()`), so every future component imports from
there, never the provider class directly.

Write unit tests: listProducts filtering by each category and each
brand returns only matching items; price-asc/price-desc sort is correct;
getProductBySlug returns null for an unknown slug, not throws;
listCategories/listBrands length matches the JSON files.

Update PROJECT_SNAPSHOT.md: mark T003 complete. Stop and report.
```

### Prompt T004 — `/shop` Catalog Grid + Filters + Sort
```text
/goal Execute Task T004: /shop Catalog Grid, Filters, Sort.
Read @AGENTS.md , @RULES.md (§1, §4, §6), @PROJECT_SNAPSHOT.md ("Reference
IA Notes" for /shop must exist from T000; T003 must be complete).
Activate skills: ui-components, prototype.

Add the /shop route to App.tsx's existing <Routes> tree. Build:
- src/app/components/shop/ProductCard.tsx — image, bilingual name, price
  formatted via Intl.NumberFormat (AED, correct locale for en/ar), unit
  label (per Bale/Bag/Ton), "Shop Now" (→ /product/:slug) and "Add to
  Wishlist" (toggles wishlistStore) buttons. Use the existing shadcn
  `card` and `button` components — do not fork them.
- src/app/components/shop/CategoryFilterSidebar.tsx — category + brand
  checkboxes/list (data via catalog.listCategories()/listBrands()),
  matching the sidebar structure noted in T000's Reference IA Notes.
  Collapses to a shadcn `sheet` on mobile.
- src/app/components/shop/SortSelect.tsx — shadcn `select`, at minimum
  "Price: Low to High" / "Price: High to Low".
- src/app/pages/ShopPage.tsx (or equivalent route file) wiring these
  together, calling catalog.listProducts({ categoryId, brandId, sort })
  from services/commerce, with filter/sort state in the URL query string
  (so filtered views are shareable/back-button-safe).

Bilingual + RTL required (RULES.md §1) — verify in both languages before
reporting done. Reuse Navigation.tsx as-is for now; nav links come in
T009.

Update PROJECT_SNAPSHOT.md: mark T004 complete, note new files. Stop and
report.
```

### Prompt T005 — `/product-brand/:brandId`
```text
/goal Execute Task T005: /product-brand/:brandId Route.
Read @AGENTS.md , @PROJECT_SNAPSHOT.md (T004 must be complete, including
its Reference IA Notes for the sudanriver.com /product-brand/2 page).
Activate skills: ui-components.

Add the /product-brand/:brandId route to App.tsx. Reuse
ProductCard/CategoryFilterSidebar/SortSelect from T004 as-is — this page
is the T004 grid pre-filtered to one brand, plus a brand header (name,
logo if available, else a text placeholder noting the T001
PRICING_TODO/asset-gap list) fetched via catalog.getBrand(brandId). If
brandId doesn't resolve to a real brand, render a friendly not-found
state reusing ErrorPage's pattern, not a blank screen.

Do not duplicate the grid/filter/sort logic — extract a shared hook or
component from T004 if it isn't already reusable as-is; if extraction is
needed, keep it minimal and note the refactor in PROJECT_SNAPSHOT.md
rather than expanding scope further.

Update PROJECT_SNAPSHOT.md: mark T005 complete. Stop and report.
```

### Prompt T006 — `/product/:slug` Product Detail Page
```text
/goal Execute Task T006: /product/:slug Product Detail Page.
Read @AGENTS.md , @RULES.md (§2), @PROJECT_SNAPSHOT.md ("Reference IA
Notes" for the sudanriver.com PDP must exist; T003 must be complete).
Activate skills: ui-components, domain-modeling.

Add the /product/:slug route to App.tsx. Build ProductDetailPage using
catalog.getProductBySlug(slug):
- Image gallery: main image + extraImages, matching the section order
  T000 recorded for the reference PDP. Use shadcn primitives already
  available (e.g. compose from existing card/dialog patterns used in
  ProductsSection.tsx's existing modal, don't hand-roll a new lightbox).
- Bilingual title, goal, description, extraDetails.
- Spec/stat table from product.stats.
- Bulk pricing display: render product.bulkPricing (if present) as a
  table ("10+ bales: X AED/bale", etc.), and the currently-applicable
  unit price via getUnitPrice(product, quantity) that updates live as
  the quantity stepper changes.
- Quantity increment/decrement stepper (min 1, respects product.stock).
- "Add to Cart" CTA calling cartStore.addItem(product.id, quantity,
  getUnitPrice(product, quantity)).
- If product.stock === 0, disable Add to Cart and show an out-of-stock
  state rather than hiding the product.

Bilingual + RTL required — verify both before reporting done.

Update PROJECT_SNAPSHOT.md: mark T006 complete. Stop and report.
```

### Prompt T007 — `/cart`
```text
/goal Execute Task T007: /cart Page.
Read @AGENTS.md , @RULES.md (§2), @PROJECT_SNAPSHOT.md ("Reference IA
Notes" for the sudanriver.com cart must exist; T002, T003 must be
complete). Activate skills: ui-components, codebase-design.

Add the /cart route to App.tsx (or a shadcn `sheet` drawer triggered from
the nav cart icon, per whichever layout T000 recorded as closer to the
reference — pick one and note the choice in PROJECT_SNAPSHOT.md rather
than building both). Build:
- Line items from cartStore.lines, resolving each productId via
  catalog.getProductBySlug/listProducts (or a small lookup helper) for
  display data — image, name, unit price, quantity control (reuse the
  stepper pattern from T006), remove button, line subtotal.
- Order summary: subtotal (sum of line subtotals), a tax line (5% UAE VAT
  — compute in fils, display formatted), total. All via one small pure
  summary function, not inline JSX arithmetic.
- Empty-cart state (no line items) with a "Continue Shopping" link to
  /shop.
- Checkout CTA: since there is no payment backend yet (AGENTS.md
  Invariant #6), this button should NOT claim to process a payment.
  Implement it as either (a) a "Request Quote" handoff reusing the
  existing ContactModal component, pre-filled with the cart contents, or
  (b) a clearly-labeled "Checkout (coming soon)" disabled state — pick
  (a) unless PROJECT_SNAPSHOT.md's Open Questions say otherwise, and
  record the choice.

Bilingual + RTL required — verify both before reporting done.

Update PROJECT_SNAPSHOT.md: mark T007 complete, note the checkout-CTA
decision. Stop and report.
```

### Prompt T008 — `/signin` & `/register`
```text
/goal Execute Task T008: /signin and /register Pages.
Read @AGENTS.md (Invariant #7), @PROJECT_SNAPSHOT.md ("Reference IA
Notes" for both pages must exist; T002 must be complete). Activate
skills: ui-components.

Add /signin and /register routes to App.tsx. Build both forms with
shadcn `form` + `input` + `label` + `button`, using react-hook-form
(already a dependency) for validation:
- /register fields: Company Name, Phone, Email, Password, Confirm
  Password.
- /signin fields: Email, Password.
Both bilingual, RTL-correct, with inline validation error messages (also
bilingual). On submit, call sessionStore.register / sessionStore.signIn
(the MOCK implementation from T002) and redirect to /shop on success, or
show the returned error message on failure. Visibly note near the form
(a small caption, not an error state) that this is a demo account system
pending full backend integration — do not let the UI imply real
persistence/security it doesn't have.

Update PROJECT_SNAPSHOT.md: mark T008 complete. Stop and report.
```

### Prompt T009 — Navigation Integration
```text
/goal Execute Task T009: Navigation Integration.
Read @AGENTS.md , @RULES.md (§6), @PROJECT_SNAPSHOT.md (T002, T004, T007,
T008 must be complete).

Update Navigation.tsx (the existing single nav component — do not create
a second one): add a "Shop" link (/shop), a cart icon showing a live item
count badge sourced from cartStore.lines.length (or summed quantity —
pick one and note it), and a Sign in / My Account link that reflects
sessionStore.user (shows "Sign in" when null, the user's name/company
when present, with a sign-out action). Ensure the mobile menu variant
(check Navigation.tsx for an existing mobile breakpoint pattern) includes
the same three additions. Bilingual + RTL required.

Update PROJECT_SNAPSHOT.md: mark T009 complete. Stop and report.
```

### Prompt T010 — Bilingual/RTL QA Pass
```text
/goal Execute Task T010: Bilingual/RTL QA Pass.
Read @AGENTS.md , @RULES.md (§1), @PROJECT_SNAPSHOT.md (T004-T009 must be
complete). Activate skills: ui-components.

Do NOT skip this by spot-checking. For each of /shop,
/product-brand/:brandId, /product/:slug, /cart, /signin, /register:
toggle to ar, set dir="rtl", and actually read the rendered layout for:
mirrored alignment issues (text or icons stuck on the wrong side because
of a hardcoded ml-/pl-/text-left instead of a logical property), any
untranslated hardcoded English string introduced in T004-T009, and any
component that doesn't reflow correctly (overlapping text, cut-off
buttons, broken flex direction). Fix every issue found — this task's
job is fixing, not just cataloguing.

Update PROJECT_SNAPSHOT.md: mark T010 complete, list what was fixed. Stop
and report.
```

### Prompt T011 — Responsive & Accessibility Sweep
```text
/goal Execute Task T011: Responsive & Accessibility Sweep.
Read @AGENTS.md , @PROJECT_SNAPSHOT.md (T010 must be complete). Activate
skills: ui-components.

For each of /shop, /product-brand/:brandId, /product/:slug, /cart,
/signin, /register: check rendering at mobile (~375px), tablet (~768px),
and desktop (~1280px) widths. Fix any overflow, unreadable text size, or
unreachable control at small widths (the filter sidebar in particular —
confirm it collapses to the shadcn `sheet` pattern built in T004, in both
languages). Run a basic accessibility check: every interactive control
has an accessible name (not just an icon), form inputs have associated
labels, color contrast on custom text (not just shadcn defaults) is
readable, and the quantity stepper/Add-to-Cart controls are keyboard
operable.

Update PROJECT_SNAPSHOT.md: mark T011 complete, list what was fixed. Stop
and report.
```

### Prompt T012 — Final Review: Data Integrity, Mock-Auth Honesty, Scope Audit
```text
/goal Execute Task T012: Final Review.
Read @AGENTS.md , @RULES.md , @PROJECT_SNAPSHOT.md in full (all of T000-
T011 must be marked complete). Activate skills: security-review,
code-review.

Do NOT modify UI. Audit the full diff introduced across T000-T011
against two axes:
1. Standards: any bare float used for money anywhere in state/JSON/
   components (RULES §2)? Any product with a brandId/categoryId that
   doesn't resolve (RULES §5)? Any component reading localStorage/raw
   JSON directly instead of through the Zustand store /
   services/commerce seam (RULES §3)? Any shadcn primitive forked instead
   of reused (RULES §4)? Does the mock auth (T008/T002) clearly disclose
   its non-persistent, demo-only nature anywhere a real user would see it,
   per AGENTS.md Invariant #7?
2. Spec: does /shop, /product-brand/:brandId, /product/:slug, /cart,
   /signin, /register each match what its task actually asked for? Flag
   (don't necessarily revert) anything built beyond task scope.

Fix any Standards-axis violation directly (these are correctness bugs,
not style debates). For Spec-axis findings, report them — do not
unilaterally revert working functionality without flagging it first.

Produce a final report appended to PROJECT_SNAPSHOT.md under "## Phase 2
Completion Report": what was built, what real data/assets are still
outstanding (pull forward the PRICING_TODO.md list from T001 and the
brand-logo asset gap from PROJECT_SNAPSHOT.md), and what would be needed
to move from the LocalCatalogProvider mock to a real backend (payments,
persistent accounts, inventory sync) as a distinct future phase.

Stop and report.
```

---

## Model Roster — Reconciliation Note (2026-09-25)

The header of this file declares: **Gemini 3.8 Flash**, **Gemini 3.1 Pro**,
**Claude Sonnet 4.6**, **Claude Opus 4.6**. This predates the Phase 3
planning pass. No external "Sept 2026 cross-provider pricing table" was
supplied or found in the repo. The Phase 3 tasks below use the **same four
models** already declared above, following the same routing rubric:

- **Gemini 3.8 Flash** — broad, checklist-shaped verification passes,
  responsive sweep work. Cheap and fast.
- **Gemini 3.1 Pro** — read-only or templated tasks with low ambiguity.
- **Claude Sonnet 4.6 (Thinking)** — well-defined but non-trivial feature
  work (the large middle band).
- **Claude Opus 4.6 (Thinking)** — irreversible architecture, security
  surface, genuinely ambiguous trade-offs, or final-gate reviews.

> **Drift note (D10):** The user prompt referenced a separate roster with
> "Gemini 3.5 Flash" — this does not match the existing header's "Gemini
> 3.8 Flash." We retain "3.8 Flash" as declared in the existing header
> since that's the canonical version in this file. If a model version
> renaming has occurred, update this note rather than silently switching.

---

## STEP 3 — Admin Portal Task Matrix (Phase 3)

> **Dependency gate:** T013 should not start until T002 (State Management:
> Zustand stores & Vitest) and T003 (`services/commerce/*` Provider) are
> complete. The admin mock layer mirrors those patterns and depends on the
> Zustand/Vitest infrastructure and the `CommerceCatalogProvider` interface
> shape being finalized. This planning pass (Phase 3) has no code
> dependency on T002–T012 finishing.

Run each task below in its own fresh conversation, in order. Each row
links to its paste-ready prompt underneath the table.

| Task | Name | Model | Justification | Skills |
|:---|:---|:---|:---|:---|
| **T013** | Admin Foundations (types, mock service, storage adapter) | Claude Opus 4.6 (Thinking) | Sets the admin domain model, mock-service interface, IndexedDB adapter, and seed generator that every subsequent admin task depends on — the one place where a wrong call is expensive to unwind, paralleling why Step 1 used Opus. | `codebase-design`, `zod`, `writing-for-agents` |
| **T014** | Admin Shell & Layout (sidebar, header, routing, role-gate) | Claude Sonnet 4.6 (Thinking) | Well-defined but non-trivial: admin routing tree, lazy loading, sidebar state, role-gate stub, all composing shadcn primitives correctly — several moving parts that must agree. | `ui-ux-pro-max`, `ui-styling`, `shadcn-ui`, `web-design-guidelines` |
| **T015** | Catalog & Inventory UI (table, create/edit wizard, variant matrix, image dropzone) | Claude Sonnet 4.6 (Thinking) | The most complex admin screen: TanStack Table integration, Zod-validated multi-step form, variant matrix builder, real binary image upload — each is non-trivial and they must work together. | `table-features`, `table-state`, `ui-ux-pro-max`, `zod`, `shadcn-ui` |
| **T016** | Order Management UI (list, status tabs, detail drawer, state machine, tracking ID) | Claude Sonnet 4.6 (Thinking) | State-machine enforcement in the UI, status transition validation, detail drawer with timeline — well-defined but the state machine logic must be correct first time. | `table-features`, `table-state`, `ui-styling`, `shadcn-ui` |
| **T017** | Financials & Analytics UI (summary cards, charts, ledger, mock refund) | Claude Sonnet 4.6 (Thinking) | Dashboard metrics, chart rendering, ledger table, and mock refund flow — multiple UI patterns but each is well-constrained. | `ui-ux-pro-max`, `table-features`, `shadcn-ui` |
| **T018** | Bulk Actions & CSV Export | Gemini 3.1 Pro | Templated: batch status update on selected rows + CSV serialization of table data — well-specified, low ambiguity, building on T015/T016's DataGrid. | `table-features`, `table-state` |
| **T019** | English-Only QA + Accessibility Sweep | Gemini 3.8 Flash | Broad, checklist-shaped verification across all admin routes — fast and cheap is the right tool. No bilingual complexity (admin is English-only). | `web-design-guidelines`, `ui-styling` |
| **T020** | Final Review: mock-auth honesty, float-money audit, sync-boundary, order-provenance, scope | Claude Opus 4.6 (Thinking) | Last gate before calling Phase 3 done — checks for float-money leaks, mock-auth disclosure compliance, sync-boundary violations, synthetic-order labeling, and scope creep across T013–T019. Needs highest reasoning to catch what per-task reviews missed. | `code-review`, `codebase-design` |

---

### Prompt T013 — Admin Foundations (types, mock service, storage adapter)
```text
/goal Execute Task T013: Admin Foundations.
Read @AGENTS.md (especially Invariants #6, #7, #9), @RULES.md (§2, §3, §9),
@PROJECT_SNAPSHOT.md (T002 and T003 must be complete — if not, stop and
report), and @.agents/rules/50-admin.md.
Activate skills: codebase-design, zod, writing-for-agents.

This task creates the admin data infrastructure. Do NOT build any UI —
that's T014+.

1. Add admin-specific types to types/ecommerce.ts (additive only —
   Invariant #4 applies to this file too):

   - AdminProduct — extends Product with:
     createdAt: string (ISO 8601)
     updatedAt: string (ISO 8601)
     isPublished: boolean
     variantMatrix: ProductVariant[] (array of { label: string, sku: string,
       priceFils: number, stock: number, weight: string, weightUnit: string })
     imageKeys: string[] (IndexedDB blob keys for uploaded photos)

   - OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' |
     'delivered' | 'cancelled'

   - OrderStatusTransition = { from: OrderStatus, to: OrderStatus,
     timestamp: string (ISO 8601), actor: string }

   - VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> — the
     allowed state machine: pending → [confirmed, cancelled],
     confirmed → [processing, cancelled], processing → [shipped, cancelled],
     shipped → [delivered], delivered → [] (terminal), cancelled → [] (terminal)

   - AdminOrderLine = { productId: string, slug: string, name: Localized,
     quantity: number, unitPriceFils: number, lineTotalFils: number }

   - AdminOrder = { orderId: string, customerName: string,
     customerEmail: string, customerPhone: string,
     items: AdminOrderLine[], status: OrderStatus,
     statusHistory: OrderStatusTransition[], trackingId?: string,
     subtotalFils: number, vatFils: number, totalFils: number,
     createdAt: string, updatedAt: string, notes: string,
     isSynthetic: boolean }

   - AdminFinancialSummary = { totalRevenueFils: number,
     totalOrderCount: number, averageOrderFils: number,
     refundedFils: number, periodStart: string, periodEnd: string,
     statusBreakdown: Record<OrderStatus, number> }

   - AdminServiceProvider interface:
     listProducts(params?: CatalogFilterParams): Promise<AdminProduct[]>
     getProduct(productId: string): Promise<AdminProduct | null>
     createProduct(data: Omit<AdminProduct, 'createdAt' | 'updatedAt'>):
       Promise<AdminProduct>
     updateProduct(productId: string, data: Partial<AdminProduct>):
       Promise<AdminProduct>
     deleteProduct(productId: string): Promise<void>
     storeImageBlob(file: File): Promise<string> (returns IndexedDB key)
     getImageBlob(key: string): Promise<Blob | null>
     deleteImageBlob(key: string): Promise<void>
     listOrders(params?: { status?: OrderStatus, page?: number,
       pageSize?: number }): Promise<{ orders: AdminOrder[],
       total: number }>
     getOrder(orderId: string): Promise<AdminOrder | null>
     updateOrderStatus(orderId: string, newStatus: OrderStatus,
       actor: string): Promise<AdminOrder> (enforces VALID_ORDER_TRANSITIONS)
     updateTrackingId(orderId: string, trackingId: string):
       Promise<AdminOrder>
     getFinancialSummary(periodStart: string, periodEnd: string):
       Promise<AdminFinancialSummary>
     seedIfEmpty(): Promise<void>
     clearAdminData(): Promise<void>

   - validateOrderTransition(current: OrderStatus, next: OrderStatus):
     boolean — pure function checking VALID_ORDER_TRANSITIONS.

   - parseAedToFils(input: string): number — converts "45.50" → 4550,
     using Math.round(parseFloat(input) * 100). Never stores the float.

2. Create services/admin/LocalAdminProvider.ts implementing
   AdminServiceProvider:
   - Uses IndexedDB (via idb library or thin wrapper) for product and
     order storage. Product image blobs stored as IndexedDB Blob values
     keyed by UUID (crypto.randomUUID()).
   - Admin session state in localStorage under 'abbshir:admin-session',
     every touch point commented // MOCK — replace when backend lands.
   - seedIfEmpty() reads products.json/products2.json, creates
     AdminProduct records in IndexedDB, and generates ~20 synthetic
     AdminOrder records with isSynthetic: true, deterministic PRNG for
     test reproducibility.
   - All methods return Promise<T>. No real network calls.
   - updateOrderStatus() enforces VALID_ORDER_TRANSITIONS — throws if
     transition is invalid.

3. Create services/admin/index.ts exporting:
   export const adminService: AdminServiceProvider =
     new LocalAdminProvider();

4. Add idb as a dependency (npm install idb) — this is the only new
   runtime dependency. Do NOT install @tanstack/react-query here — that
   comes in T014 when the first admin UI component needs it.

5. Write Vitest unit tests (the runner must exist from T002):
   - validateOrderTransition: test all valid transitions return true,
     all invalid transitions (e.g. pending → shipped) return false.
   - parseAedToFils: "45.50" → 4550, "0.01" → 1, "999.99" → 99999,
     "0" → 0, edge cases.
   - LocalAdminProvider.seedIfEmpty: verify it creates products and
     ~20 orders with isSynthetic: true.
   - LocalAdminProvider.updateOrderStatus: verify valid transition
     succeeds, invalid transition throws.

Update PROJECT_SNAPSHOT.md: mark T013 complete, note new files and the
idb dependency. Stop and report.
```

### Prompt T014 — Admin Shell & Layout
```text
/goal Execute Task T014: Admin Shell & Layout.
Read @AGENTS.md, @RULES.md (§6, §9), @PROJECT_SNAPSHOT.md (T013 must be
complete), and @.agents/rules/50-admin.md.
Activate skills: ui-ux-pro-max, ui-styling, shadcn-ui,
web-design-guidelines.

Build the admin shell — the layout wrapper all admin pages render inside.
Do NOT build catalog/order/financial pages yet — those are T015–T017.

1. Install @tanstack/react-query and wrap the admin route subtree in a
   QueryClientProvider (separate from any customer-side providers).

2. Add admin routes to App.tsx's existing <Routes> tree (Invariant #8),
   all under /admin/*. Use React.lazy() + <Suspense> with skeleton
   fallbacks so admin code doesn't add to the customer bundle:
   - /admin → redirect to /admin/dashboard
   - /admin/login → AdminLoginPage
   - /admin/dashboard → AdminDashboardPage (placeholder for T017)
   - /admin/catalog → AdminCatalogPage (placeholder for T015)
   - /admin/catalog/new → AdminCatalogNewPage (placeholder for T015)
   - /admin/catalog/:productId → AdminCatalogEditPage (placeholder for T015)
   - /admin/orders → AdminOrdersPage (placeholder for T016)
   - /admin/orders/:orderId → AdminOrderDetailPage (placeholder for T016)
   - /admin/financials → AdminFinancialsPage (placeholder for T017)

3. Build src/app/components/admin/AdminLayout.tsx:
   - Sidebar: collapsible, built from shadcn sidebar primitive. Sections:
     Dashboard, Catalog, Orders, Financials. Active route highlighted.
   - Header: breadcrumbs (shadcn breadcrumb), admin user display from
     localStorage abbshir:admin-session, sign-out action.
   - Main content area with <Outlet> for nested routes.

4. Build src/app/components/admin/AdminRoleGate.tsx:
   - Checks localStorage abbshir:admin-session for a mock admin user.
   - If not present, redirects to /admin/login.
   - Comment every auth check with // MOCK — replace when backend lands
     (Invariant #9).

5. Build src/app/pages/admin/AdminLoginPage.tsx:
   - Simple form: email + password fields (shadcn form/input).
   - On submit: shape-validate only (non-empty fields), write mock admin
     user to localStorage, redirect to /admin/dashboard.
   - Visible caption: "Demo admin access — not a real authentication
     system."
   - Never store the password. Comment: // MOCK — replace when backend lands.

6. Create placeholder pages for T015–T017 routes — each renders a heading
   and "Coming in T0XX" text inside the AdminLayout.

Admin is English-only — no bilingual/RTL requirement.
Verify: npm run build clean, npm run dev boots, /admin renders the shell
with sidebar and header. Customer-facing routes unaffected.

Update PROJECT_SNAPSHOT.md: mark T014 complete, note @tanstack/react-query
dependency addition. Stop and report.
```

### Prompt T015 — Catalog & Inventory UI
```text
/goal Execute Task T015: Catalog & Inventory UI.
Read @AGENTS.md, @RULES.md (§2, §4, §9), @PROJECT_SNAPSHOT.md (T014 must
be complete), and @.agents/rules/50-admin.md, @.agents/rules/20-state.md.
Activate skills: table-features, table-state, ui-ux-pro-max, zod, shadcn-ui.

Build the admin catalog management screens inside the AdminLayout shell.

1. Build src/app/components/admin/DataGrid.tsx:
   - Generic, reusable data table wrapping shadcn table + TanStack Table.
   - Supports: sortable columns, text filter, pagination, row selection
     (checkbox column).
   - Filter/sort/pagination state synced to URL search params.
   - Accepts column definitions and data as props — not hardcoded to
     products.
   - Skeleton loading state using shadcn skeleton.

2. Build src/app/components/admin/ImageDropzone.tsx:
   - Drag-and-drop + click-to-browse file upload area.
   - Uses HTML5 drag events + <input type="file" accept="image/*" multiple>.
   - On drop/select: calls adminService.storeImageBlob(file) for each
     file, stores returned keys.
   - Displays image previews via URL.createObjectURL(blob), revokes on
     unmount.
   - Shows existing images for edit mode (loads blobs from IndexedDB via
     adminService.getImageBlob).
   - Delete button per image (calls adminService.deleteImageBlob).

3. Build src/app/pages/admin/AdminCatalogPage.tsx:
   - DataGrid showing all admin products from adminService.listProducts()
     via TanStack Query useQuery hook.
   - Columns: image thumbnail, name, SKU, brand, category, price (AED
     formatted from fils), stock, status (published/draft), actions
     (edit/delete).
   - "Add Product" button linking to /admin/catalog/new.
   - Row click navigates to /admin/catalog/:productId.

4. Build src/app/pages/admin/AdminCatalogEditPage.tsx (handles both create
   and edit):
   - Multi-step wizard form using react-hook-form + Zod validation:
     Step 1: Basic info (name EN/AR, description EN/AR, SKU, brandId
       select, categoryId select)
     Step 2: Pricing (basePrice in AED input → parseAedToFils on save,
       salePrice, bulk pricing tiers)
     Step 3: Variants (variant matrix builder — add/remove rows with
       label, SKU suffix, price override, stock, weight)
     Step 4: Images (ImageDropzone for product photos)
     Step 5: Review & publish (summary, isPublished toggle, save button)
   - Uses TanStack Query useMutation for create/update with optimistic UI.
   - Zod schema validates: price > 0, stock >= 0, SKU non-empty, at least
     one image.
   - On save: converts AED prices to fils via parseAedToFils, calls
     adminService.createProduct or adminService.updateProduct.

5. Build src/app/components/admin/StatusPill.tsx:
   - shadcn badge variant, color-coded: pending=amber, confirmed=blue,
     processing=indigo, shipped=purple, delivered=green, cancelled=red.
   - Accepts status: OrderStatus as prop.

Admin is English-only. Verify: npm run build clean, /admin/catalog
renders product grid, /admin/catalog/new shows the wizard.

Update PROJECT_SNAPSHOT.md: mark T015 complete. Stop and report.
```

### Prompt T016 — Order Management UI
```text
/goal Execute Task T016: Order Management UI.
Read @AGENTS.md, @RULES.md (§2, §9), @PROJECT_SNAPSHOT.md (T015 must be
complete — DataGrid and StatusPill are prerequisites),
@.agents/rules/50-admin.md (Order Provenance section).
Activate skills: table-features, table-state, ui-styling, shadcn-ui.

Build the admin order management screens. Per Open Decision #5, all
orders are seeded/synthetic mock data — clearly labeled.

1. Build src/app/pages/admin/AdminOrdersPage.tsx:
   - Status tabs at top: All, Pending, Confirmed, Processing, Shipped,
     Delivered, Cancelled. Each tab filters the DataGrid.
   - DataGrid (from T015) showing orders from adminService.listOrders()
     via TanStack Query, with columns: order ID, customer name, date,
     items count, total (AED from fils), status (StatusPill), actions.
   - "Demo Data" banner at top when all displayed orders are synthetic:
     "These orders are sample data for demonstration purposes."
   - Row click opens order detail.
   - Bulk actions bar (appears when rows selected): "Update Status" dropdown.

2. Build src/app/pages/admin/AdminOrderDetailPage.tsx (renders in a shadcn
   sheet/drawer, or a detail panel — pick one and note the choice):
   - Order header: order ID, customer info, creation date, current status
     (StatusPill).
   - Status timeline: vertical timeline showing statusHistory transitions
     (from → to, timestamp, actor). Use shadcn separator + custom layout.
   - Status action: dropdown to advance status. Only shows valid next
     states from VALID_ORDER_TRANSITIONS. Calls
     adminService.updateOrderStatus() via useMutation. If transition is
     invalid, show error toast (sonner). On success, invalidate order
     query.
   - Tracking ID input: text field, saves via
     adminService.updateTrackingId(). Shown only when status is 'shipped'
     or 'delivered'.
   - Line items table: product name, quantity, unit price (AED), line
     total (AED).
   - Order summary: subtotal, VAT (5%), total — all formatted from fils.
   - "Synthetic Order" badge if order.isSynthetic is true.
   - Notes field: editable textarea for admin notes.

3. State machine enforcement in UI:
   - The status dropdown only shows valid transitions. E.g. when status
     is 'pending', dropdown shows only 'Confirm' and 'Cancel'.
   - After selecting a new status, a confirmation dialog (shadcn
     alert-dialog) asks "Change status from [current] to [new]?" with
     Confirm/Cancel buttons.
   - On confirm, mutation fires. Optimistic UI: StatusPill updates
     immediately, rolls back on error.

Admin is English-only. Verify: npm run build clean, /admin/orders shows
the order grid with status tabs, clicking an order shows the detail with
timeline and status controls.

Update PROJECT_SNAPSHOT.md: mark T016 complete. Stop and report.
```

### Prompt T017 — Financials & Analytics UI
```text
/goal Execute Task T017: Financials & Analytics UI.
Read @AGENTS.md, @RULES.md (§2), @PROJECT_SNAPSHOT.md (T016 must be
complete), @.agents/rules/50-admin.md.
Activate skills: ui-ux-pro-max, table-features, shadcn-ui.

Build the admin dashboard and financials screens.

1. Build src/app/components/admin/MetricCard.tsx:
   - shadcn card variant for KPI display.
   - Props: label (string), value (string — pre-formatted), trend
     (optional: { direction: 'up' | 'down' | 'flat', percentage: number }).
   - Trend indicator: green up-arrow for 'up', red down-arrow for 'down',
     grey dash for 'flat'.
   - All monetary values must be pre-formatted via formatPrice() before
     passing as the value prop — MetricCard itself is currency-agnostic.

2. Build/update src/app/pages/admin/AdminDashboardPage.tsx:
   - Row of MetricCards: Total Revenue, Total Orders, Average Order Value,
     Refunded Amount. Data from adminService.getFinancialSummary() via
     useQuery. All monetary values in fils, formatted via formatPrice().
   - Recent orders table: last 5 orders from adminService.listOrders(),
     mini DataGrid with order ID, customer, total, status (StatusPill).
   - Quick stats: order status breakdown (pie/donut chart or simple bar
     chart). Use a lightweight chart library (recharts — it's commonly
     paired with shadcn) or pure SVG.

3. Build src/app/pages/admin/AdminFinancialsPage.tsx:
   - Period selector: date range picker (shadcn calendar + popover) or
     preset buttons (Today, This Week, This Month, All Time).
   - MetricCards row for the selected period.
   - Revenue chart: line or bar chart showing revenue over time. Use the
     same chart library as the dashboard.
   - Ledger table: DataGrid showing individual orders as line items,
     sortable by date/amount. Columns: date, order ID, customer, items,
     subtotal, VAT, total, status.
   - Mock refund flow: on the ledger, a "Refund" button per delivered
     order. Clicking opens a confirmation dialog. On confirm, updates
     the financial summary's refundedFils and marks the order as
     'cancelled'. This is a simplified mock — real refund logic would
     involve a payment gateway.

4. All monetary values: integer fils in state, formatted to AED only at
   the display boundary. No bare float arithmetic.

Admin is English-only. Verify: npm run build clean, /admin/dashboard
shows metrics and recent orders, /admin/financials shows the period
selector and charts.

Update PROJECT_SNAPSHOT.md: mark T017 complete. Stop and report.
```

### Prompt T018 — Bulk Actions & CSV Export
```text
/goal Execute Task T018: Bulk Actions & CSV Export.
Read @AGENTS.md, @RULES.md, @PROJECT_SNAPSHOT.md (T015 and T016 must be
complete — DataGrid with row selection is a prerequisite).
Activate skills: table-features, table-state.

Add bulk operations and CSV export to the admin catalog and order tables.

1. Catalog bulk actions (AdminCatalogPage):
   - When rows are selected, a floating action bar appears with:
     - "Publish" / "Unpublish" toggles (batch update isPublished).
     - "Delete" (batch delete with confirmation dialog).
   - Each action calls the appropriate adminService method for each
     selected product via Promise.all(), then invalidates the product
     list query.
   - Show a toast (sonner) with success count: "3 products published."

2. Order bulk actions (AdminOrdersPage):
   - When rows are selected, a floating action bar appears with:
     - "Update Status" dropdown showing only statuses that are valid
       transitions for ALL selected orders (intersection of valid next
       states). If no common transition exists, the dropdown is disabled
       with tooltip "Selected orders have no common valid transition."
   - Fires adminService.updateOrderStatus() for each selected order.
   - Show a toast with success/failure count.

3. CSV Export:
   - "Export CSV" button on both catalog and order DataGrid toolbars.
   - Catalog CSV columns: SKU, Name (EN), Brand, Category, Base Price
     (AED — formatted from fils for human readability), Sale Price (AED),
     Stock, Published.
   - Order CSV columns: Order ID, Customer, Date, Status, Items Count,
     Subtotal (AED), VAT (AED), Total (AED), Tracking ID.
   - Generate CSV client-side (no backend) using a simple serializer.
     Trigger download via Blob + URL.createObjectURL + click-on-anchor.
   - Monetary columns in CSV are formatted as AED decimal ("45.50"), not
     fils integers, for human readability in spreadsheets.

Admin is English-only. Verify: npm run build clean, bulk actions work on
both catalog and orders, CSV downloads correctly.

Update PROJECT_SNAPSHOT.md: mark T018 complete. Stop and report.
```

### Prompt T019 — English-Only QA + Accessibility Sweep
```text
/goal Execute Task T019: Admin QA + Accessibility Sweep.
Read @AGENTS.md, @RULES.md, @PROJECT_SNAPSHOT.md (T013–T018 must be
complete). Activate skills: web-design-guidelines, ui-styling.

This is the admin equivalent of T010/T011 but English-only (no bilingual/
RTL complexity per Open Decision #2).

1. For each admin route (/admin/login, /admin/dashboard, /admin/catalog,
   /admin/catalog/new, /admin/catalog/:productId, /admin/orders,
   /admin/orders/:orderId, /admin/financials):
   - Verify rendering at mobile (~375px), tablet (~768px), desktop
     (~1280px). Fix any overflow, unreadable text, or unreachable control.
   - Verify the admin sidebar collapses properly on mobile.
   - Verify DataGrid is horizontally scrollable on narrow viewports.

2. Accessibility audit:
   - Every interactive control has an accessible name (aria-label or
     visible text — not just an icon).
   - Form inputs have associated labels.
   - Color contrast meets WCAG 2.1 AA (4.5:1 normal text, 3:1 large).
   - StatusPill includes text label, not just color.
   - ImageDropzone is keyboard operable (can tab to it, trigger file
     picker with Enter/Space).
   - DataGrid rows are keyboard-navigable.
   - Status change confirmation dialog traps focus correctly.
   - All toasts (sonner) are announced to screen readers.

3. Mock-auth disclosure check:
   - /admin/login shows "Demo admin access" caption.
   - Every // MOCK comment is present at auth touch points.

4. Synthetic order labeling check:
   - "Demo Data" banner/badge visible on order list and detail pages.
   - Every synthetic order shows its isSynthetic status.

Fix every issue found — this task's job is fixing, not cataloguing.

Update PROJECT_SNAPSHOT.md: mark T019 complete, list what was fixed.
Stop and report.
```

### Prompt T020 — Final Review: Admin Phase 3
```text
/goal Execute Task T020: Admin Phase 3 Final Review.
Read @AGENTS.md (all 9 Invariants), @RULES.md (all sections including §9),
@PROJECT_SNAPSHOT.md (T013–T019 must be marked complete).
Activate skills: code-review, codebase-design.

Do NOT modify UI. Audit the full diff introduced across T013–T019 against
five axes:

1. **Float-money audit:** grep every file under src/app/components/admin/,
   src/app/pages/admin/, services/admin/ for any bare float used for money
   in state, IndexedDB, or component logic. formatPrice() and
   parseAedToFils() should be the only places floats appear transiently.
   Flag any violation.

2. **Mock-auth honesty (Invariant #9):** verify every admin auth touch
   point (services/admin/* session methods, AdminRoleGate, AdminLoginPage)
   has the // MOCK — replace when backend lands comment. Verify no
   plaintext password is retained anywhere after the login form submits.
   Verify the "Demo admin access" caption is visible on the login page.

3. **Sync-boundary compliance (Open Decision #1):** verify admin data
   operations (product CRUD, order status updates) go through
   services/admin/* → IndexedDB only, never writing back to
   products.json/products2.json or any file in src/app/data/. Verify the
   customer storefront (services/commerce/*) is completely unaffected by
   admin edits.

4. **Order-provenance compliance (Open Decision #5):** verify every
   synthetic order has isSynthetic: true, is labeled as demo data in the
   UI, and no admin UI implies real customer transactions exist.

5. **Scope audit:** does each task (T013–T019) match what its prompt
   actually asked for? Flag anything built beyond task scope. Verify no
   admin code leaked into customer-facing components/routes/stores.

Fix any Standards-axis violation directly. Report Spec-axis findings
without reverting.

Produce a final report appended to PROJECT_SNAPSHOT.md under "## Phase 3
Admin Portal Completion Report": what was built, what mock limitations
exist, and what would be needed to connect the admin portal to a real
backend (real auth, real database, real image storage, real order pipeline)
as a distinct future phase.

Stop and report.
```

