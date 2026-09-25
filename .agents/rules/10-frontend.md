# 10 — Frontend

- Reuse `src/app/components/ui/*` shadcn primitives; compose, don't fork.
- New shop components live in `src/app/components/shop/`.
- All new routes register inside the existing `<Routes>` in `App.tsx`:
  `/shop`, `/product-brand/:brandId`, `/product/:slug`, `/cart`,
  `/signin`, `/register`.
- `Navigation.tsx` gains Shop / Cart(badge) / Sign-in links — no second nav.
- Every string is bilingual (`{ en, ar }` or a `LanguageContext` key). Use
  Tailwind logical properties (`ps-`, `pe-`, `text-start`) for anything
  built new, so RTL doesn't require a rewrite.
- Verify both `en` and `ar` language states, and both LTR/RTL layout, before
  marking a UI task done.
- Visual language (color/typography/spacing) matches the existing
  `theme.css` tokens and the patterns in `HeroSection.tsx`/
  `ProductsSection.tsx`. sudanriver.com informs layout/IA/interaction only.
