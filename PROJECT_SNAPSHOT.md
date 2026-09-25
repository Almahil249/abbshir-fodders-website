# Abbshir FODDERS — Project Snapshot — v1.1

> Working memory only. Replace assumptions with verified facts as tasks
> complete. Updated by agents after each completed task. Keep under 300 lines.

---

## Status

- **Phase:** PHASE 2 (Step 2: Implementation Task Matrix in progress).
- **Current Task:** T001 (Catalog Data Model & Extension) — COMPLETE.
- **Last Completed:** T000 (Reconnaissance & Reference Capture) & T001 (Catalog Data Model & Extension).
- **Next Task:** T002 (State Management: Zustand stores & Vitest test runner).

## Verified Repository Map (verified against repo on 2026-09-19)

- **Entry point:** `src/main.tsx` → `src/app/App.tsx`.
- **Router:** `react-router-dom` v7.13.0, `BrowserRouter` in `App.tsx`.
  Existing routes: `/`, `/ar`, `/en` (all render `LandingPage`), catch-all
  `*` → `ErrorPage code="404"`. **No `/shop`, `/cart`, `/product`, `/signin`,
  `/register` routes exist yet.**
- **i18n:** `src/app/components/LanguageContext.tsx` — React Context,
  `language: 'en' | 'ar'`, `toggleLanguage()`, `t(key)` against a flat
  `translations: Record<string, Record<Language, string>>` object defined
  in the same file. Default language is `'ar'`. Language also driven by
  URL path (`/en`, `/ar`) or `?lang=` query param. Sets `document.body.dir`
  and `document.documentElement.lang`. No i18next / react-intl.
- **UI kit:** `src/app/components/ui/*.tsx` — **48 files** of shadcn/ui
  components already vendored: accordion, alert, alert-dialog,
  aspect-ratio, avatar, badge, breadcrumb, button, calendar, card,
  carousel, chart, checkbox, collapsible, command, context-menu, dialog,
  drawer, dropdown-menu, form, hover-card, input, input-otp, label,
  menubar, navigation-menu, pagination, popover, progress, radio-group,
  resizable, scroll-area, select, separator, sheet, sidebar, skeleton,
  slider, sonner (toast), switch, table, tabs, textarea, toggle,
  toggle-group, tooltip, `use-mobile.ts`, `utils.ts` (`cn()` helper).
  Built on Radix primitives + `class-variance-authority`.
- **Styling:** Tailwind v4.1.12 via `@tailwindcss/vite` plugin.
  `src/styles/theme.css` defines CSS-variable palette (`--primary: #030213`,
  `--background: #ffffff`, etc.) plus a `.dark` variant block — dark mode
  is scaffolded but not currently toggled anywhere. Other CSS:
  `fonts.css`, `index.css` (72 bytes, just imports), `tailwind.css` (98 bytes).
- **Build config:** `vite.config.ts` — `@` alias → `src/`, React + Tailwind
  plugins. `tsconfig.json` — strict mode, `resolveJsonModule: true`.
  **Updated in T001:** `tsconfig.json` `include` includes `["src", "types"]`.
- **React/React-DOM:** v18.3.1 (listed as `peerDependencies`).
- **State management:** None beyond React `useState`/Context. No
  Redux/Zustand/Jotai in `package.json` yet (T002 will install Zustand). `motion`
  v12 is installed for animations.
- **Notable existing dependencies:** `react-hook-form` v7.55.0 (already
  present — use for auth form validation in T008), `lucide-react` v0.487.0
  (icon library), `embla-carousel-react` v8.6.0, `sonner` v2.0.3 (toast).
  MUI (`@mui/material`, `@emotion/*`) is also installed — prefer shadcn/ui.
- **Data files (Extended in T001):**
  - `src/app/data/categories.json` (5 items: `alfalfa`, `grass`, `straw`,
    `grains-concentrates`, `feed-additives`).
  - `src/app/data/brands.json` (5 items: `abbshir`, `arasco`, `al-ghurair`,
    `bartl`, `zabeel`).
  - `src/app/data/PRICING_TODO.md` — complete audit listing all 20 products with
    `// PLACEHOLDER` tags for client sign-off.
  - `src/app/utils/species.ts` — bidirectional mapping between emoji strings
    (`targets`) and typed `SpeciesTarget` enum values, plus bilingual labels.
  - `src/app/data/products.json` (9 items) & `products2.json` (11 items):
    Additively extended with `slug`, `sku`, `brandId`, `categoryId`, `unit`,
    `basePrice` (fils), `salePrice`, `bulkPricing`, `stock`, `originCountry`,
    `weight`, `weightUnit`, `speciesTargets`.
  - **Data Inconsistency Resolved:** `products2.json` `stats.label` has been
    fully normalized from plain strings to bilingual `{ en, ar }` objects.
    Both files now pass 100% data integrity validation.
  - Existing fields (`name`, `image`, `targets` emoji strings, `extraImages`,
    `goal`, `stats`, `description`, `extraDetails`) are strictly preserved.

- **Existing landing components:**
  `Navigation.tsx` (responsive, has mobile hamburger, language toggle),
  `HeroSection.tsx`, `AboutSection.tsx`,
  `ProductsSection.tsx` (reads `products.json` — NOT products2.json —
  renders card grid + desktop modal overlay with prev/next nav; uses
  `motion` for animations; has a custom `open-product` event listener;
  **renders `stat.label[language]`** so stats must be bilingual),
  `Footer.tsx`, `ContactModal.tsx` (WhatsApp + form),
  `ErrorPage.tsx`, `ErrorBoundary.tsx`.
- **Assets:** `src/assets/` has Abbshir's own `HeroCover.png`,
  `abbshirLogo.png`, `abbshirLogo1.png`, `aboutCover.png`. Root-level
  `Logos/` folder has `1.png`, `1Croped.png`, `3.png`, `3Croped.png` + PDFs.
  `public/Logo.png`, `public/favicon.ico`, `public/favicon.png`.
  `public/ProductsIMG/` has subdirectories for product IDs 1, 2, 3, 4, 9.
  **No third-party brand logos (Arasco, Al Ghurair, Bartl, Zabeel) exist.**
- **Deployment:** `vercel.json` present — static Vite build, deployed on
  Vercel. No server runtime assumed.
- **Domain model:** `types/ecommerce.ts` at repo root (outside `src/`) —
  defines Category, Brand, Product, PriceTier, CartLine, CartState,
  WishlistState, UserAccount, SessionState, CommerceCatalogProvider,
  `getUnitPrice()`, `formatPrice()`. Updated in Step 1.
- **Commerce README:** `services/commerce/README.md` documents the
  provider interface and swap-to-backend plan. No implementation yet.
- **Test runner:** None configured (`package.json` has no vitest/jest).
  TypeScript is not a direct devDependency (only `@vitejs/plugin-react` +
  `tailwindcss` + `vite`). Build still succeeds (Vite handles TS).

## Reference IA Notes (from sudanriver.com inspection, 2026-09-19)

### Homepage (`/`)
- **Layout:** Top green utility bar (location, WhatsApp, language dropdown)
  → main header (logo, search, account/cart/wishlist icons) → nav bar
  (Home, About, Shop, Branches, Blog, Subsidiaries, Contact) → hero
  carousel → value badges (delivery, 24/7, payment) → shop-by-category
  grid → shop-by-animal grid → best-sellers products → shop-by-brand
  logos → shop-by-origin country tabs → blog cards → footer (4 cols).
- **Product card (homepage):** Image, product name (link to PDP), dual
  price (sale in green, original struck-through in grey). Clean, no CTA
  buttons on homepage cards.
- **No sidebar** on homepage — full-width stacked sections.
- **Language:** Arabic/English dropdown in top bar.

### Shop (`/shop`)
- **Sidebar filters:** Categories (Alfalfa/Jet, Grass & Rhodes, Grains &
  Concentrates, Feed Additives, Other Products), Availability checkbox
  (include out of stock), Price range slider, Country of Origin (12
  countries), Brands (Al Ghurair, Arasco, Bartel, CDVET, Sudan River,
  Zabeel Feed).
- **Sort control:** Dropdown above grid — Price Low→High, Price High→Low.
- **Product card (shop):** White card → product image → product name link →
  dual price (AED sale/original) → "Shop Now" CTA button linking to PDP.
- **Grid:** 4 columns on desktop, responsive.
- **Pagination:** None visible — appears to be a single continuous grid
  (catalog small enough). Abbshir's ~20 products don't need pagination.

### Brand Page (`/product-brand/:id`)
- **Exact same layout** as `/shop` — same grid, same sidebar, same cards.
  Just pre-filtered to one brand. Brand header banner is the same template
  as the shop page header. Product cards are identical components.
- **Note:** Uses numeric ID in URL (e.g. `/product-brand/2`).

### Product Detail Page (`/product/:slug`)
- **Section order:** Page header banner → 2-column layout:
  - **Image column:** Main product image + thumbnails below.
  - **Info column:** Title, price display (AED sale price / original price
    struck-through), wishlist button, metadata spec box (SKU, Category,
    Origin Country, Weight, Branch stock counts), quantity stepper
    (−1+), dual CTAs ("Add to Cart" + "Buy Now"), payment trust badge
    (Telr logo).
  - **Description:** Single tab with text.
  - **No related products section.**
- **Out of stock:** Shown as branch stock numbers in the metadata box
  (not a full-page disabled state).
- **Slug format:** lowercase-hyphenated, e.g. `arasco-wafi-breeding-14`.

### Cart (`/cart`)
- **Full page** (not drawer/sheet).
- **Line item:** Product image, name, unit price, quantity stepper (−1+),
  line subtotal, red delete button.
- **Summary block:** Subtotal, Total (AED), Checkout CTA button, "Return
  to Shop" link.
- **Empty cart:** Shows subtotal/total as 0, only "Return to Shop" button.
- **No shipping or tax line visible** in the summary.

### Sign In (`/signin`)
- **Layout:** Split-screen — left illustration, right centered card.
- **Fields:** Email/username input, Password input.
- **CTA:** "Log In" button (full-width, red accent).
- **Links:** "Forgotten Your Password?" → `/forgotpassword`, "Don't have
  an account? Sign Up" → `/register`.

### Register (`/register`)
- **Layout:** Split-screen mirroring sign-in.
- **Heading:** "Welcome To Sudan River" / "Create New Account".
- **Fields:** Name, Email*, Password*, Confirm Password*.
- **CTA:** "Create Account" button (full-width, red accent).
- **Links:** "Already have an account? Log In" → `/signin`.
- **No Terms checkbox, no phone field, no company name field.**

## Open Questions (resolved where possible)

### Resolved

1. **Backend persistence for this phase?**
   **Answer: Local-only (localStorage) via Zustand + persist.** The
   `services/commerce/*` seam ensures a real backend can be swapped in
   later. This matches sudanriver.com's overall approach (full backend,
   but our Phase 1 scope is client-side only).

2. **Payment gateway?**
   **Answer: Out of scope for Phase 1.** Checkout CTA will be "Request
   Quote" re-using the existing `ContactModal` component, pre-filled with
   cart contents (WhatsApp handoff — matches how Abbshir currently
   converts leads). Sudanriver.com uses Telr but has a real backend.

3. **Real prices/stock/SKUs?**
   **Answer: Placeholder pricing.** T001 will assign realistic-looking
   placeholder values (in fils) and flag every one in
   `data/PRICING_TODO.md` for client review. No off-repo price list was
   found.

4. **`/product-brand/:brandId` — numeric ID or slug?**
   **Answer: Slug (e.g. `/product-brand/arasco`).** Rationale:
   - Slugs are human-readable and SEO-friendly.
   - Brand IDs in `types/ecommerce.ts` are already string slugs.
   - RULES.md §5 mandates stable slug-based routes.
   - Sudanriver.com uses numeric IDs (`/product-brand/2`), but they have
     a database with auto-increment IDs. We have no database — slug is
     the natural key.
   - If client later requires numeric ID parity for external links, a
     redirect from `/product-brand/2` → `/product-brand/arasco` can be
     added without breaking the component.

### Still Open (requires client input)

5. **Brand logos:** No third-party brand logos (Arasco, Al Ghurair, Bartl,
   Zabeel Feed) exist in the repo. T001/T005 will use text placeholders
   with a note for the client to supply logos. The Brand type has an
   optional `logo?: string` field ready.

6. **Products2.json purpose:** products2.json appears to be an alternate
   catalog set (some overlapping products like Alfalfa, Rhodes) with
   different descriptions and Unsplash images. Unclear whether both files
   should be merged into one catalog or kept separate. **Recommendation:**
   T001 should merge both into a single `products.json` (or a new
   `catalog.json`), de-duplicating by product type and keeping the
   richer descriptions, then fix `stats.label` to be consistently
   bilingual. Products2.json's Unsplash images should be replaced with
   real product photos when available.

## Decisions Log

### D1: Domain Model (Step 1)
- **SpeciesTarget enum:** Added `'deer'` to the union — products.json item 8
  (Teff Grass) and products2.json items 4, 11 have `"🦌"` in targets.
- **ProductStat.label:** Typed as `Localized | string` to accommodate
  both products.json (bilingual objects) and products2.json (plain strings).
  T001 must normalize to bilingual; the type allows both during transition.
- **salePrice field:** Added `salePrice?: Fils` to Product. Sudanriver.com
  displays sale/original dual pricing on every card. `getUnitPrice()` now
  returns `salePrice` when present (if no bulk tier applies), with
  `basePrice` as the "was" price for strikethrough display.
- **originCountry:** Added to Product. Sudanriver.com filters by origin
  (12 countries). Abbshir products reference origins in descriptions
  (Sudan, Egypt, Spain, USA, South Africa, Pakistan). Useful filter.
- **weight/weightUnit:** Added to Product. Sudanriver.com PDP shows
  weight in the spec box (e.g. "50Kg").
- **CartLine.slug:** Added `slug` to CartLine so the cart page can link
  to PDP without requiring a full product lookup just for navigation.
- **CatalogFilterParams:** Extracted filter params into a named interface
  with `search`, `includeOutOfStock`, `originCountry` in addition to
  the existing `categoryId`, `brandId`, `sort`.
- **getCategory():** Added to CommerceCatalogProvider for `/shop` sidebar
  state and breadcrumb rendering.
- **formatPrice():** Added utility using `Intl.NumberFormat` for AED
  formatting in both `en-AE` and `ar-AE` locales. Single source of
  truth for price display.

### D2: State Management (Step 1)
- **Zustand + persist CONFIRMED.** Rationale:
  - `package.json` has no state library installed. Clean slate.
  - Zustand is ~1 KB gzip, zero boilerplate, TypeScript-first.
  - `persist` middleware writes to `localStorage` under namespaced keys
    (`abbshir:cart`, `abbshir:wishlist`, `abbshir:session`).
  - Redux Toolkit considered but rejected: overkill for ~3 stores with
    simple CRUD operations on a catalog site. No middleware chains, no
    async thunks needed (catalog reads go through `services/commerce/*`).
  - React Context + useReducer considered but rejected: no built-in
    persistence, re-renders entire provider subtree on state change.
  - Jotai considered: similar to Zustand for small stores, but Zustand's
    `persist` middleware is more mature and the store-per-concern pattern
    maps more naturally to cart/wishlist/session.

### D3: Backend Seam (Step 1)
- **`services/commerce/*` with `LocalCatalogProvider` CONFIRMED.** See
  `services/commerce/README.md` for the full interface contract and
  swap plan. Key design decisions:
  - All methods return `Promise<T>` even though today they resolve
    synchronously — this is the async seam.
  - Singleton export (`export const catalog`) so components import from
    one place, never the class.
  - Catalog data (JSON files) is read via Vite imports, not
    `localStorage` — `localStorage` is only for user state (cart,
    wishlist, session).

### D4: Cart Checkout CTA (Step 1)
- **"Request Quote" via ContactModal** for Phase 1. No payment gateway.
  Rationale: Abbshir currently converts leads via WhatsApp/ContactModal.
  A "Place Order" button that doesn't actually place an order would be
  dishonest. "Request Quote" is honest and functional. Sudanriver.com
  has a real checkout with Telr, but that requires a backend we don't
  have. Future phase can swap the CTA.

### D5: Auth Form Fields (Step 1)
- **Adjusted from sudanriver.com for Abbshir's B2B context.**
  Sudanriver.com register has: Name, Email, Password, Confirm Password.
  For Abbshir's B2B/B2C hybrid, the register form will have: Company
  Name (optional), Full Name, Phone, Email, Password, Confirm Password.
  The `UserAccount` type in `types/ecommerce.ts` already has `name`,
  `companyName`, `email`, `phone`. Phone is important for UAE B2B
  (WhatsApp follow-up). Company name is optional since B2C individuals
  also buy fodder.

### D6: tsconfig.json Fix (T001)
- Added `"types"` to `tsconfig.json` `include` array. `types/ecommerce.ts` is now
  properly covered by TypeScript checking.

### D7: Categories & Brands Data Files (T001)
- Created `src/app/data/categories.json` (5 categories: `alfalfa`, `grass`, `straw`,
  `grains-concentrates`, `feed-additives`) and `src/app/data/brands.json` (5 brands:
  `abbshir`, `arasco`, `al-ghurair`, `bartl`, `zabeel`).
- Both files strictly adhere to `Category` and `Brand` types from `types/ecommerce.ts`.
- Slugs are clean, lowercase, and hyphenated.

### D8: Species Targeting & Emoji Strategy (T001)
- To preserve existing landing page functionality (`ProductsSection.tsx` mapping emoji strings directly),
  `targets` emoji array was preserved 100% in both `products.json` and `products2.json`.
- Added `speciesTargets?: SpeciesTarget[];` alongside in `types/ecommerce.ts` and in all product records.
- Created `src/app/utils/species.ts` with bidirectional mapping (`EMOJI_TO_SPECIES`, `SPECIES_TO_EMOJI`)
  and bilingual UI labels (`SPECIES_LABELS`).

### D9: Placeholder Pricing & Stats Normalization (T001)
- Assigned realistic UAE market prices (in integer fils) to all 20 products.
- Generated `src/app/data/PRICING_TODO.md` flagging all prices with `// PLACEHOLDER` for client review.
- Normalized all `stats[].label` in `products2.json` to bilingual `{ en, ar }` objects.
- Ran automated verification script (`scratch/validate_catalog.js`) confirming zero errors across all 20 items.

---

## Architect Handoff to Phase 2

### Summary
Step 1 (Architecture pass) and Step 2 Tasks T000 (Reconnaissance) and T001 (Catalog Data Model & Extension)
are complete. Data files, types, category/brand lookup datasets, and species mapping utilities are in place.

### Pre-flight Checklist for T002 (State Management: Zustand)
Before starting T002, ensure:
- [x] `types/ecommerce.ts` is finalized
- [x] `services/commerce/README.md` exists
- [x] `tsconfig.json` includes `"types"`
- [x] `categories.json` and `brands.json` exist
- [x] `products.json` and `products2.json` extended additively with e-commerce fields
- [x] `PRICING_TODO.md` created
- [x] `npm run build` succeeds
- [ ] Install `zustand` (do in T002)
- [ ] Create `src/app/state/` stores: `cartStore`, `wishlistStore`, `sessionStore` (do in T002)
- [ ] Install Vitest + React Testing Library (do in T002)
- [ ] Write unit tests for stores and `getUnitPrice` (do in T002)
- [ ] No `services/commerce/*.ts` implementation exists yet (create in T003)
