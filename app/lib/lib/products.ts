import { PriceRange, Product, SortOption } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    shortDescription: "Noise-cancelling over-ear wireless headphones.",
    description:
      "Experience crystal clear sound with these premium wireless headphones. Featuring active noise cancellation, long battery life, and ultra-comfortable ear cushions for all-day listening.",
    price: 199,
    previousPrice: 249,
    currency: "USD",
    categorySlug: "electronics",
    tags: ["audio", "wireless", "headphones"],
    images: [
      {
        url: "/products/product-1.jpg",
        alt: "Premium wireless headphones in black color"
      },
      {
        url: "/products/product-1-2.jpg",
        alt: "Side view of premium wireless headphones"
      }
    ],
    inStock: true,
    stock: 34,
    rating: 4.7,
    reviewCount: 134,
    isFeatured: true,
    createdAt: "2024-01-15T00:00:00.000Z"
  },
  {
    id: "prod-2",
    slug: "smartwatch-sport-edition",
    name: "Smartwatch Sport Edition",
    shortDescription: "Fitness-focused smartwatch with heart rate tracking.",
    description:
      "Stay on top of your health and notifications with this sport edition smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters.",
    price: 149,
    currency: "USD",
    categorySlug: "wearables",
    tags: ["smartwatch", "fitness", "wearable"],
    images: [
      {
        url: "/products/product-2.jpg",
        alt: "Smartwatch sport edition with orange band"
      }
    ],
    inStock: true,
    stock: 52,
    rating: 4.4,
    reviewCount: 89,
    isFeatured: true,
    createdAt: "2024-02-03T00:00:00.000Z"
  },
  {
    id: "prod-3",
    slug: "minimalist-desk-lamp",
    name: "Minimalist Desk Lamp",
    shortDescription: "LED desk lamp with adjustable brightness.",
    description:
      "A sleek and minimalist LED desk lamp perfect for modern workspaces. Offers three brightness levels, adjustable arm, and low energy consumption.",
    price: 59,
    currency: "USD",
    categorySlug: "home-office",
    tags: ["lamp", "lighting", "office"],
    images: [
      {
        url: "/products/product-3.jpg",
        alt: "Minimalist white desk lamp on a wooden desk"
      }
    ],
    inStock: true,
    stock: 120,
    rating: 4.3,
    reviewCount: 47,
    isFeatured: false,
    createdAt: "2024-03-10T00:00:00.000Z"
  },
  {
    id: "prod-4",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    shortDescription: "Adjustable ergonomic chair for long work sessions.",
    description:
      "Upgrade your workspace with an ergonomic office chair designed to support your posture. Features adjustable height, lumbar support, and breathable mesh back.",
    price: 249,
    previousPrice: 299,
    currency: "USD",
    categorySlug: "home-office",
    tags: ["chair", "office", "ergonomic"],
    images: [
      {
        url: "/products/product-4.jpg",
        alt: "Black ergonomic office chair with mesh back"
      }
    ],
    inStock: false,
    stock: 0,
    rating: 4.6,
    reviewCount: 203,
    isFeatured: true,
    createdAt: "2024-01-25T00:00:00.000Z"
  },
  {
    id: "prod-5",
    slug: "cotton-oversized-hoodie",
    name: "Cotton Oversized Hoodie",
    shortDescription: "Soft unisex hoodie for everyday comfort.",
    description:
      "This oversized hoodie is made from premium cotton blend fabric, offering warmth and comfort. Features a kangaroo pocket and adjustable drawstrings.",
    price: 69,
    currency: "USD",
    categorySlug: "fashion",
    tags: ["hoodie", "clothing", "unisex"],
    images: [
      {
        url: "/products/product-5.jpg",
        alt: "Beige oversized hoodie on a hanger"
      }
    ],
    inStock: true,
    stock: 87,
    rating: 4.5,
    reviewCount: 156,
    isFeatured: false,
    createdAt: "2024-04-01T00:00:00.000Z"
  },
  {
    id: "prod-6",
    slug: "leather-crossbody-bag",
    name: "Leather Crossbody Bag",
    shortDescription: "Compact leather bag for daily essentials.",
    description:
      "A stylish leather crossbody bag with multiple compartments, ideal for keeping your daily essentials organized and within reach.",
    price: 129,
    currency: "USD",
    categorySlug: "fashion",
    tags: ["bag", "leather", "accessories"],
    images: [
      {
        url: "/products/product-6.jpg",
        alt: "Brown leather crossbody bag on a table"
      }
    ],
    inStock: true,
    stock: 41,
    rating: 4.2,
    reviewCount: 63,
    isFeatured: true,
    createdAt: "2024-02-20T00:00:00.000Z"
  },
  {
    id: "prod-7",
    slug: "wireless-mechanical-keyboard",
    name: "Wireless Mechanical Keyboard",
    shortDescription: "Compact mechanical keyboard with wireless connectivity.",
    description:
      "Enjoy a satisfying typing experience with this compact wireless mechanical keyboard. Features hot-swappable switches, RGB backlighting, and USB-C charging.",
    price: 119,
    currency: "USD",
    categorySlug: "electronics",
    tags: ["keyboard", "mechanical", "wireless"],
    images: [
      {
        url: "/products/product-7.jpg",
        alt: "Wireless mechanical keyboard with RGB backlight"
      }
    ],
    inStock: true,
    stock: 65,
    rating: 4.8,
    reviewCount: 312,
    isFeatured: true,
    createdAt: "2024-05-12T00:00:00.000Z"
  },
  {
    id: "prod-8",
    slug: "ceramic-coffee-mug-set",
    name: "Ceramic Coffee Mug Set",
    shortDescription: "Set of 4 ceramic mugs in neutral tones.",
    description:
      "A set of four ceramic coffee mugs with a matte finish, perfect for serving hot drinks. Microwave and dishwasher safe.",
    price: 39,
    currency: "USD",
    categorySlug: "kitchen",
    tags: ["mugs", "ceramic", "kitchen"],
    images: [
      {
        url: "/products/product-8.jpg",
        alt: "Set of ceramic coffee mugs on a kitchen counter"
      }
    ],
    inStock: true,
    stock: 200,
    rating: 4.1,
    reviewCount: 28,
    isFeatured: false,
    createdAt: "2024-03-05T00:00:00.000Z"
  },
  {
    id: "prod-9",
    slug: "noise-isolating-earbuds",
    name: "Noise Isolating Earbuds",
    shortDescription: "Compact in-ear earbuds with clear sound.",
    description:
      "These noise isolating earbuds offer a comfortable in-ear fit and crisp audio quality. Perfect for commuting, workouts, and everyday listening.",
    price: 49,
    currency: "USD",
    categorySlug: "electronics",
    tags: ["earbuds", "audio", "portable"],
    images: [
      {
        url: "/products/product-9.jpg",
        alt: "Black noise isolating earbuds with case"
      }
    ],
    inStock: true,
    stock: 150,
    rating: 4.0,
    reviewCount: 76,
    isFeatured: false,
    createdAt: "2024-04-18T00:00:00.000Z"
  },
  {
    id: "prod-10",
    slug: "stainless-steel-water-bottle",
    name: "Stainless Steel Water Bottle",
    shortDescription: "Insulated bottle that keeps drinks cold or hot.",
    description:
      "Durable stainless steel water bottle with double-wall insulation. Keeps beverages cold for up to 24 hours and hot for up to 12 hours.",
    price: 29,
    currency: "USD",
    categorySlug: "outdoor",
    tags: ["bottle", "outdoor", "hydration"],
    images: [
      {
        url: "/products/product-10.jpg",
        alt: "Stainless steel water bottle on a rock outdoors"
      }
    ],
    inStock: true,
    stock: 98,
    rating: 4.3,
    reviewCount: 51,
    isFeatured: false,
    createdAt: "2024-02-28T00:00:00.000Z"
  }
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = PRODUCTS.filter((product) => product.isFeatured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(
    (product) => product.categorySlug === categorySlug
  );
}

export interface ProductFilterParams {
  query?: string;
  categorySlug?: string;
  priceRange?: PriceRange;
  sort?: SortOption;
  inStockOnly?: boolean;
}

export function filterAndSortProducts(params: ProductFilterParams): Product[] {
  const { query, categorySlug, priceRange, sort, inStockOnly } = params;
  let result = [...PRODUCTS];

  if (query && query.trim().length > 0) {
    const q = query.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        (product.shortDescription &&
          product.shortDescription.toLowerCase().includes(q)) ||
        product.description.toLowerCase().includes(q)
    );
  }

  if (categorySlug && categorySlug !== "all") {
    result = result.filter(
      (product) => product.categorySlug === categorySlug
    );
  }

  if (priceRange) {
    const { min, max } = priceRange;
    if (typeof min === "number") {
      result = result.filter((product) => product.price >= min);
    }
    if (typeof max === "number") {
      result = result.filter((product) => product.price <= max);
    }
  }

  if (inStockOnly) {
    result = result.filter((product) => product.inStock && product.stock > 0);
  }

  if (sort) {
    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
        case "popular":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });
  }

  return result;
}

export function getRelatedProducts(
  productId: string,
  limit = 4
): Product[] {
  const current = PRODUCTS.find((p) => p.id === productId);
  if (!current) {
    return PRODUCTS.slice(0, limit);
  }

  const sameCategory = PRODUCTS.filter(
    (p) => p.categorySlug === current.categorySlug && p.id !== current.id
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = PRODUCTS.filter(
    (p) => p.categorySlug !== current.categorySlug
  );

  return [...sameCategory, ...others].slice(0, limit);
}
