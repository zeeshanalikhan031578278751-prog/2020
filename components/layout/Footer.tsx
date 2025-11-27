import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container flex flex-col gap-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="text-xs md:text-sm">
          © {year} Modern Store. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/products"
            className="transition-colors hover:text-slate-900"
          >
            Browse products
          </Link>
          <Link
            href="/checkout"
            className="transition-colors hover:text-slate-900"
          >
            Checkout
          </Link>
          <Link
            href="/auth/login"
            className="transition-colors hover:text-slate-900"
          >
            Client login
          </Link>
          <span className="hidden text-xs text-slate-400 md:inline">
            Built as a modern e-commerce template.
          </span>
        </div>
      </div>
    </footer>
  );
}
