import { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "electronics",
    name: "Electronics",
    description: "Headphones, keyboards, earbuds and more modern tech essentials.",
    featured: true,
    image: "/products/product-7.jpg"
  },
  {
    id: "cat-2",
    slug: "wearables",
    name: "Wearables",
    description: "Smartwatches and wearable accessories for an active lifestyle.",
    featured: true,
    image: "/products/product-2.jpg"
  },
  {
    id: "cat-3",
    slug: "home-office",
    name: "Home & Office",
    description: "Desks, chairs, lamps and everything you need for a productive workspace.",
    featured: true,
    image: "/products/product-3.jpg"
  },
  {
    id: "cat-4",
    slug: "fashion",
    name: "Fashion",
    description: "Comfortable, everyday clothing and stylish accessories.",
    featured: false,
    image: "/products/product-5.jpg"
  },
  {
    id: "cat-5",
    slug: "kitchen",
    name: "Kitchen",
    description: "Mugs, tools and essentials for your kitchen and coffee corner.",
    featured: false,
    image: "/products/product-8.jpg"
  },
  {
    id: "cat-6",
    slug: "outdoor",
    name: "Outdoor",
    description: "Outdoor bottles and gear for staying active and hydrated.",
    featured: false,
    image: "/products/product-10.jpg"
  }
];

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getFeaturedCategories(limit?: number): Category[] {
  const featured = CATEGORIES.filter((category) => category.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}
