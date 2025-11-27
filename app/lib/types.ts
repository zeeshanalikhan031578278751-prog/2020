export type CategorySlug = string;

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description?: string;
  featured?: boolean;
  image?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description: string;
  price: number;
  previousPrice?: number;
  currency: string;
  categorySlug: CategorySlug;
  tags?: string[];
  images: ProductImage[];
  inStock: boolean;
  stock: number;
  rating: number; // 0–5
  reviewCount: number;
  isFeatured?: boolean;
  createdAt: string; // ISO date string
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "popular";

export interface PriceRange {
  min?: number;
  max?: number;
}

export type PaymentMethod = "stripe" | "paypal" | "cod";

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface CheckoutFormValues {
  email: string;
  phone?: string;
  address: Address;
  paymentMethod: PaymentMethod;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
