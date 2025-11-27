"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import classNames from "classnames";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/register", label: "Sign Up" }
];

export default function Header() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white shadow-soft">
            <span>EC</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Modern Store
            </span>
            <span className="text-xs text-slate-500">
              E-commerce template
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                "text-sm font-medium transition-colors hover:text-slate-900",
                pathname === link.href
                  ? "text-slate-900"
                  : "text-slate-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile menu button */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs">
              🛒
            </span>
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex flex-col gap-0.5">
              <span className="block h-0.5 w-4 rounded bg-slate-800" />
              <span className="block h-0.5 w-4 rounded bg-slate-800" />
              <span className="block h-0.5 w-4 rounded bg-slate-800" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="border-t border-slate-100 bg-white md:hidden">
          <div className="container flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
