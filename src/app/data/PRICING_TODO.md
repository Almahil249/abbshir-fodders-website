# Abbshir FODDERS — Product Pricing & Catalog Review (PRICING_TODO)

> **Client Action Required:** The prices, units, and bulk discount ladders below are **realistic placeholder values** based on standard UAE agricultural fodder market rates (ADAFSA-compliant, Sweihan/Nahil/Al Sila distribution). All values must be confirmed or adjusted by the Abbshir management team before real ordering or formal quotation goes live.

All monetary values are stored in integer minor units (**fils**, where 100 fils = 1.00 AED) per `AGENTS.md` Invariant #2.

---

## 1. Primary Catalog (`src/app/data/products.json`)

| ID | SKU | Product Name (EN / AR) | Category | Brand | Unit | Base Price (Fils / AED) | Sale Price (Fils / AED) | Bulk Tiers (minQty @ price) | Stock | Origin |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | `AB-ALF-001` | Alfalfa Hay (Jett / Bersim) / علف الجت | `alfalfa` | Abbshir | bale | 7500 (75.00 AED) // PLACEHOLDER | 7000 (70.00 AED) // PLACEHOLDER | 10+ @ 68.00 AED, 50+ @ 64.00 AED // PLACEHOLDER | 250 | Sudan |
| 2 | `AB-RHD-002` | Rhodes Grass / علف الرودس | `grass` | Abbshir | bale | 4500 (45.00 AED) // PLACEHOLDER | — | 15+ @ 42.00 AED, 50+ @ 39.00 AED // PLACEHOLDER | 400 | Pakistan |
| 3 | `AB-PNT-003` | Peanut Straw (Foul Sudani) / تبن الفول السوداني | `straw` | Abbshir | bale | 4000 (40.00 AED) // PLACEHOLDER | — | 20+ @ 37.00 AED, 50+ @ 34.00 AED // PLACEHOLDER | 180 | Sudan |
| 4 | `AB-FEN-004` | Fenugreek Straw / تبن الحلبة | `straw` | Abbshir | bale | 3800 (38.00 AED) // PLACEHOLDER | — | 20+ @ 35.00 AED, 50+ @ 32.00 AED // PLACEHOLDER | 120 | Sudan |
| 5 | `AB-WHT-005` | Wheat Straw / تبن القمح | `straw` | Abbshir | bale | 3200 (32.00 AED) // PLACEHOLDER | — | 25+ @ 29.00 AED, 60+ @ 26.00 AED // PLACEHOLDER | 500 | Egypt |
| 6 | `AB-BER-006` | Bermuda Grass / حشيشة برمودا | `grass` | Bartl | bale | 8500 (85.00 AED) // PLACEHOLDER | 8000 (80.00 AED) // PLACEHOLDER | 10+ @ 78.00 AED, 40+ @ 74.00 AED // PLACEHOLDER | 140 | USA |
| 7 | `AB-MIX-007` | Alfalfa + Wheat Straw Mix / مخلوط الجت وتبن القمح | `alfalfa` | Abbshir | bale | 5500 (55.00 AED) // PLACEHOLDER | — | 15+ @ 51.00 AED, 50+ @ 47.00 AED // PLACEHOLDER | 90 | Spain |
| 8 | `AB-TEF-008` | South African Teff Grass / علف التيف الجنوب أفريقي | `grass` | Zabeel | bale | 9500 (95.00 AED) // PLACEHOLDER | — | 10+ @ 89.00 AED, 30+ @ 84.00 AED // PLACEHOLDER | 75 | South Africa |
| 9 | `AB-TIM-009` | American Timothy Hay / علف التيموثي الأمريكي | `grass` | Bartl | bale | 11000 (110.00 AED) // PLACEHOLDER | 10500 (105.00 AED) // PLACEHOLDER | 10+ @ 100.00 AED, 30+ @ 95.00 AED // PLACEHOLDER | 60 | USA |

---

## 2. Extended Catalog (`src/app/data/products2.json`)

| ID | SKU | Product Name (EN / AR) | Category | Brand | Unit | Base Price (Fils / AED) | Sale Price (Fils / AED) | Bulk Tiers (minQty @ price) | Stock | Origin |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | `P2-ALF-001` | Alfalfa Hay (Jett) / علف الجت (البرسيم) | `alfalfa` | Abbshir | bale | 7600 (76.00 AED) // PLACEHOLDER | — | 10+ @ 71.00 AED, 50+ @ 66.00 AED // PLACEHOLDER | 220 | Sudan |
| 2 | `P2-RHD-002` | Rhodes Grass / علف الرودس | `grass` | Abbshir | bale | 4600 (46.00 AED) // PLACEHOLDER | — | 15+ @ 43.00 AED, 50+ @ 40.00 AED // PLACEHOLDER | 350 | Pakistan |
| 3 | `P2-BAR-003` | Barley (Sha'eer) / علف الشعير | `grains-concentrates` | Al Ghurair | bag | 6200 (62.00 AED) // PLACEHOLDER | 5800 (58.00 AED) // PLACEHOLDER | 20+ @ 56.00 AED, 50+ @ 53.00 AED // PLACEHOLDER | 300 | UAE |
| 4 | `P2-TIM-004` | Timothy Hay / علف تيموثي | `grass` | Bartl | bale | 11500 (115.00 AED) // PLACEHOLDER | — | 10+ @ 105.00 AED, 30+ @ 98.00 AED // PLACEHOLDER | 45 | USA |
| 5 | `P2-SUD-005` | Sudan Grass / حشيشة السودان | `grass` | Abbshir | bale | 4200 (42.00 AED) // PLACEHOLDER | — | 15+ @ 39.00 AED, 50+ @ 36.00 AED // PLACEHOLDER | 160 | Sudan |
| 6 | `P2-PNT-006` | Peanut Hay (Foul Sudani) / قش الفول السوداني | `straw` | Abbshir | bale | 4100 (41.00 AED) // PLACEHOLDER | — | 20+ @ 38.00 AED, 50+ @ 35.00 AED // PLACEHOLDER | 130 | Sudan |
| 7 | `P2-WHT-007` | Wheat Straw (Tibn) / تبن القمح | `straw` | Abbshir | bale | 3100 (31.00 AED) // PLACEHOLDER | — | 25+ @ 28.00 AED, 60+ @ 25.00 AED // PLACEHOLDER | 450 | UAE |
| 8 | `P2-FEN-008` | Fenugreek Straw / تبن الحلبة | `straw` | Abbshir | bale | 3900 (39.00 AED) // PLACEHOLDER | — | 20+ @ 36.00 AED, 50+ @ 33.00 AED // PLACEHOLDER | 95 | Sudan |
| 9 | `P2-BER-009` | Bermuda Grass / حشيشة برمودا | `grass` | Bartl | bale | 8700 (87.00 AED) // PLACEHOLDER | — | 10+ @ 81.00 AED, 40+ @ 76.00 AED // PLACEHOLDER | 110 | USA |
| 10 | `P2-MIX-010` | Alfalfa & Straw Mix / مخلوط الجت والتبن | `alfalfa` | Abbshir | bale | 5600 (56.00 AED) // PLACEHOLDER | — | 15+ @ 52.00 AED, 50+ @ 48.00 AED // PLACEHOLDER | 85 | Spain |
| 11 | `P2-TEF-011` | South African Teff Grass / علف التيف الجنوب أفريقي | `grass` | Zabeel | bale | 9800 (98.00 AED) // PLACEHOLDER | — | 10+ @ 92.00 AED, 30+ @ 87.00 AED // PLACEHOLDER | 70 | South Africa |

---

## 3. Brand & Category Validation Checklist

- All categories resolve to `src/app/data/categories.json`: `alfalfa`, `grass`, `straw`, `grains-concentrates`, `feed-additives`.
- All brands resolve to `src/app/data/brands.json`: `abbshir`, `arasco`, `al-ghurair`, `bartl`, `zabeel`.
- All slugs are unique, lowercase, and hyphenated.
- Bulk pricing ladders have ascending `minQty` and strictly decreasing `pricePerUnit`.
- All prices are strictly positive integers representing fils (never floating point).
