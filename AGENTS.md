# Abbshir FODDERS — Agent Contract — v1.0

Abbshir FODDERS is a bilingual Arabic/English marketing site for a UAE fodder
& animal-feed distributor (ADAFSA-certified, serving Sweihan/Nahil/Al Sila
breeders), being extended into a **B2B/B2C fodder e-commerce storefront**:
catalog browse → brand filter → product detail → cart → checkout,
plus account creation/sign-in — heavily inspired by sudanriver.com's IA.

Frontend: React 18 + TypeScript + Vite 6 + `react-router-dom` v7 + shadcn/ui
(Radix) + Tailwind v4 (CSS-variable theme). No backend exists yet — see
Non-Negotiable Invariant #6. i18n: hand-rolled `LanguageContext`
(`en`/`ar`) with full RTL support — **not** i18next, do not introduce a new
i18n library without an explicit task to migrate the whole site.

---

## Non-Negotiable Invariants

1. **Every page ships in both `en` and `ar`, RTL-correct.** No new UI copy is
   hardcoded in one language — it goes through `LanguageContext`'s `t()` /
   the bilingual object shape (`{ en, ar }`) already used in `products.json`.
2. **Money is never a bare `float` in state or JSON.** Store prices as integer
   minor units (fils, 1 AED = 100 fils) or fixed-precision strings; format for
   display only at render time. Currency is AED everywhere unless a task says
   otherwise.
3. **Cart, wishlist, and session state live behind the `services/commerce/*`
   interface, never accessed directly by page components.** This is what lets
   the mock `LocalCatalogProvider` (localStorage-backed) be swapped for a real
   API later without touching UI code.
4. **Product/category/brand data extensions are additive.** Do not remove or
   rename existing fields in `products.json` / `products2.json`
   (`name`, `image`, `targets`, `extraImages`, `goal`, `stats`, `description`,
   `extraDetails`) — the landing-page `ProductsSection` still reads them.
   New e-commerce fields (`slug`, `sku`, `brandId`, `categoryId`, `price`,
   `bulkPricing`, `unit`, `stock`) are added alongside.
5. **Reuse existing shadcn/ui primitives in `src/app/components/ui/`
   verbatim.** Do not fork or re-implement `card.tsx`, `button.tsx`,
   `select.tsx`, `sheet.tsx`, `form.tsx`, `input.tsx`, `table.tsx`, etc. If a
   primitive is genuinely missing, add it via the shadcn pattern already in
   use (Radix + `class-variance-authority` + `cn()` from `ui/utils.ts`), don't
   hand-roll a substitute.
6. **No backend exists.** Any task touching "the API" means the
   `services/commerce/*` mock layer (JSON + `localStorage`), unless the task
   explicitly says a real backend has been introduced. Do not silently invent
   a Node/Express/Supabase service — that's an architecture decision for a
   dedicated task, not a side effect of building `/cart`.
7. **Passwords/auth tokens are never stored in plain `localStorage` in the
   real-backend path.** The Phase 1 mock auth (for `/signin`/`/register`
   demo purposes only, no real backend) must be clearly commented as
   `// MOCK — replace when backend lands` at every touch point.
8. **All new routes are added to `App.tsx`'s existing `<Routes>` tree**,
   nested under the current `<BrowserRouter>` and `<LanguageProvider>` —
   do not introduce a second router or duplicate providers.

---

## Read order for every task

1. This file (`AGENTS.md`).
2. `RULES.md`.
3. `PROJECT_SNAPSHOT.md` (current status — must be updated at the end of
   every task).
4. The task's own prompt in `TASK_EXECUTION_MATRIX.md`.
5. Any skill named in that task's `Skills` column.

Conflicts between this file and a task-specific instruction → **stop and
report**, do not guess.

## Definition of done (every task)

- Code compiles (`npm run build`) and `npm run dev` boots with no console
  errors on the touched route(s), in both `?lang=en` and `?lang=ar` states.
- New/changed UI is checked in RTL (`dir="rtl"`), not just LTR.
- `PROJECT_SNAPSHOT.md` updated: task marked complete, new facts recorded,
  stale assumptions replaced.
- Stop and report — do not start the next task in the same conversation
  (see `TASK_EXECUTION_MATRIX.md` execution rule).
