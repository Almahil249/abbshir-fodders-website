/**
 * Abbshir FODDERS — e-commerce domain model.
 *
 * Conventions (see AGENTS.md / RULES.md):
 * - Every user-facing string is bilingual: { en, ar }.
 * - Money is integer minor units (fils; 1 AED = 100 fils) — never float.
 * - This file is additive to, not a replacement for, the shape already
 *   used in products.json / products2.json.
 *
 * Last updated: Super Architect pass (Step 1).
 */

export type Locale = 'en' | 'ar';

export interface Localized<T = string> {
  en: T;
  ar: T;
}

/** Integer minor units. 1 AED = 100 fils. Never a JS float. */
export type Fils = number;

export type Unit = 'bale' | 'bag' | 'ton';

export type SpeciesTarget = 'camel' | 'horse' | 'cattle' | 'sheep' | 'goat' | 'deer' | 'other';

// ---------------------------------------------------------------------------
// Catalog structure
// ---------------------------------------------------------------------------

export interface Category {
  id: string; // slug, e.g. "alfalfa"
  name: Localized;
  /** Optional parent for a future subcategory tree (e.g. Grains > Barley). */
  parentId?: string;
  image?: string;
}

export interface Brand {
  id: string; // slug, e.g. "arasco"
  name: Localized;
  logo?: string; // asset gap today — see PROJECT_SNAPSHOT.md
  description?: Localized;
}

/** One quantity break in a bulk-pricing ladder. minQty is inclusive. */
export interface PriceTier {
  minQty: number;
  pricePerUnit: Fils;
}

/**
 * Product stat shape. Mirrors what's already in products.json (bilingual label)
 * while also accommodating products2.json (which uses plain-string labels).
 * The `label` field accepts either shape; components should normalise at render.
 */
export interface ProductStat {
  label: Localized | string;
  value: string; // e.g. "16-22%" — kept as display string, not parsed
}

/**
 * Extends the existing products.json/products2.json item shape.
 * All fields already present there (name, image, targets, extraImages,
 * goal, stats, description, extraDetails) are preserved unchanged; the
 * fields below are new, added alongside — see AGENTS.md Invariant #4.
 */
export interface Product {
  id: number;
  slug: string; // stable once assigned — see RULES.md §5
  sku: string;
  brandId: Brand['id'];
  categoryId: Category['id'];

  name: Localized;
  description: Localized;
  extraDetails?: Localized;
  goal?: Localized;

  image: string;
  extraImages?: string[];

  /**
   * Existing field in products.json — array of emoji strings ("🐪" etc.)
   * for the landing page ProductsSection.tsx. New e-commerce data will
   * add typed SpeciesTarget[] alongside, but the original emoji array
   * MUST be preserved so ProductsSection continues to work.
   */
  targets: string[] | SpeciesTarget[];
  speciesTargets?: SpeciesTarget[];

  stats: ProductStat[];

  unit: Unit;
  /** Base (lowest-tier) price per unit, in fils. */
  basePrice: Fils;
  /**
   * Optional sale price in fils. When present, display as the current
   * price with basePrice shown as the strikethrough "was" price
   * (matching sudanriver.com's dual-price display pattern).
   */
  salePrice?: Fils;
  /** Optional quantity discounts; sorted ascending by minQty. */
  bulkPricing?: PriceTier[];

  stock: number; // units available; 0 = out of stock, shown not hidden
  isFeatured?: boolean;

  /** Country of origin slug, e.g. "sudan", "egypt", "usa". */
  originCountry?: string;
  /** Weight per unit, e.g. 50. Display only — not used in pricing math. */
  weight?: number;
  /** Weight unit label, e.g. "kg", "lb". */
  weightUnit?: string;
}

// ---------------------------------------------------------------------------
// Cart / Wishlist (Zustand store shapes — see RULES.md §3)
// ---------------------------------------------------------------------------

export interface CartLine {
  productId: Product['id'];
  /** Stored alongside productId so the cart can link to the PDP without an
   *  additional catalog lookup for display purposes. */
  slug: string;
  quantity: number;
  /** Snapshot of the unit price at add-time, so price changes don't
   *  silently reprice an existing cart line — recomputed on quantity change. */
  unitPriceAtAdd: Fils;
}

export interface CartState {
  lines: CartLine[];
  addItem: (productId: Product['id'], slug: string, quantity: number, unitPrice: Fils) => void;
  updateQuantity: (productId: Product['id'], quantity: number, unitPrice: Fils) => void;
  removeItem: (productId: Product['id']) => void;
  clear: () => void;
}

export interface WishlistState {
  productIds: Product['id'][];
  toggle: (productId: Product['id']) => void;
}

// ---------------------------------------------------------------------------
// User / auth (MOCK — see AGENTS.md Invariant #7; replace when backend lands)
// ---------------------------------------------------------------------------

export interface UserAccount {
  id: string;
  name?: string;
  companyName?: string;
  email: string;
  phone: string;
  createdAt: string; // ISO date
}

export interface SessionState {
  user: UserAccount | null;
  // MOCK — replace when backend lands. No real password/token handling here.
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (input: Omit<UserAccount, 'id' | 'createdAt'> & { password: string }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
}

// ---------------------------------------------------------------------------
// services/commerce/* contract — the seam a real backend replaces later
// ---------------------------------------------------------------------------

export interface CatalogFilterParams {
  categoryId?: string;
  brandId?: string;
  originCountry?: string;
  includeOutOfStock?: boolean;
  sort?: 'price-asc' | 'price-desc';
  search?: string;
}

export interface CommerceCatalogProvider {
  listProducts(params?: CatalogFilterParams): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  listCategories(): Promise<Category[]>;
  getCategory(categoryId: string): Promise<Category | null>;
  listBrands(): Promise<Brand[]>;
  getBrand(brandId: string): Promise<Brand | null>;
}

// ---------------------------------------------------------------------------
// Pricing utilities — single source of truth (RULES.md §2)
// ---------------------------------------------------------------------------

/** Returns the applicable unit price in fils for the given quantity. */
export function getUnitPrice(product: Pick<Product, 'basePrice' | 'salePrice' | 'bulkPricing'>, quantity: number): Fils {
  // If there are bulk tiers, check those first
  if (product.bulkPricing && product.bulkPricing.length > 0) {
    const applicable = [...product.bulkPricing]
      .sort((a, b) => a.minQty - b.minQty)
      .filter((tier) => quantity >= tier.minQty);
    if (applicable.length > 0) {
      return applicable[applicable.length - 1].pricePerUnit;
    }
  }
  // Fall back to sale price if present, otherwise base price
  return product.salePrice ?? product.basePrice;
}

/**
 * Format fils as a display string. Uses Intl.NumberFormat for locale-aware
 * currency formatting. Call this at the render boundary only.
 */
export function formatPrice(fils: Fils, locale: Locale): string {
  const aed = fils / 100;
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(aed);
}
