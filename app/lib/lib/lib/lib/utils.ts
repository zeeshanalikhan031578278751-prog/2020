import { CartItem, CartTotals, PriceRange, Product } from "./types";

/**
 * Format a price with currency using Intl API.
 */
export function formatPrice(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Get a price range (min and max) from a list of products.
 */
export function getProductsPriceRange(
  products: Product[]
): PriceRange {
  if (products.length === 0) {
    return {};
  }

  let min = products[0].price;
  let max = products[0].price;

  products.forEach((product) => {
    if (product.price < min) min = product.price;
    if (product.price > max) max = product.price;
  });

  return { min, max };
}

/**
 * Create a human-readable label for a price range.
 */
export function getPriceRangeLabel(
  range: PriceRange,
  currency: string = "USD"
): string {
  const { min, max } = range;

  if (typeof min === "number" && typeof max === "number") {
    return `${formatPrice(min, currency)} - ${formatPrice(
      max,
      currency
    )}`;
  }

  if (typeof min === "number") {
    return `From ${formatPrice(min, currency)}`;
  }

  if (typeof max === "number") {
    return `Up to ${formatPrice(max, currency)}`;
  }

  return "All prices";
}

/**
 * Utility for safely parsing a number from a string (e.g. query params).
 */
export function parseNumberOrUndefined(
  value: string | string[] | undefined
): number | undefined {
  if (!value) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Calculate cart totals based on items and product data.
 * This is a simple example and can be adjusted for different tax/shipping logic.
 */
export function calculateCartTotals(
  items: CartItem[],
  products: Product[]
): CartTotals {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  // Example tax and shipping logic:
  const taxRate = 0.1; // 10% tax (example)
  const tax = subtotal * taxRate;

  let shipping = 0;
  if (subtotal > 0 && subtotal < 200) {
    shipping = 9; // flat shipping for smaller orders
  }

  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total
  };
}

/**
 * Get a simple rating label such as "4.5 (123 reviews)".
 */
export function getRatingLabel(
  rating: number,
  reviewCount: number
): string {
  return `${rating.toFixed(1)} (${reviewCount} reviews)`;
}

/**
 * Truncate a text to a certain length with ellipsis.
 */
export function truncateText(
  text: string,
  maxLength: number
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}
