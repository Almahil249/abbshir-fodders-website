# 10 — Frontend

- Reuse `src/app/components/ui/*` shadcn primitives; compose, don't fork.
- New shop components live in `src/app/components/shop/`.
- **New admin components live in `src/app/components/admin/`** — parallel
  to `shop/`. Admin primitives (`DataGrid`, `MetricCard`, `ImageDropzone`,
  `StatusPill`) compose existing shadcn `table`, `card`, `badge`, `input`.
- All new routes register inside the existing `<Routes>` in `App.tsx`:
  `/shop`, `/product-brand/:brandId`, `/product/:slug`, `/cart`,
  `/signin`, `/register`, **`/admin/*`**.
- `Navigation.tsx` gains Shop / Cart(badge) / Sign-in links — no second nav.
  **Admin has its own sidebar layout** inside the `/admin/*` subtree, built
  from the shadcn `sidebar` primitive.
- Every customer-facing string is bilingual (`{ en, ar }` or a
  `LanguageContext` key). Use Tailwind logical properties (`ps-`, `pe-`,
  `text-start`) for anything built new, so RTL doesn't require a rewrite.
- **Admin routes are English-only** — no bilingual/RTL requirement for
  `/admin/*` pages (Open Decision #2).
- Verify both `en` and `ar` language states, and both LTR/RTL layout, before
  marking a customer-facing UI task done.
- Visual language (color/typography/spacing) matches the existing
  `theme.css` tokens and the patterns in `HeroSection.tsx`/
  `ProductsSection.tsx`. sudanriver.com informs layout/IA/interaction only.

## Vite Admin Dev Standards

- Admin pages are lazy-loaded via `React.lazy()` + `<Suspense>` with
  skeleton fallbacks, so the admin shell doesn't add to the customer
  storefront's initial bundle.
- Admin-specific CSS (if any beyond Tailwind utilities) goes in
  `src/styles/admin.css`, imported only by the admin layout component —
  not in `index.css` or `theme.css`.
- Dev server HMR must work for admin routes: verify `npm run dev` boots
  and navigating to `/admin` renders the shell with no console errors.
