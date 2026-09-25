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
