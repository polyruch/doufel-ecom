"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cart } from "@/components/Cart";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-neutral-800" />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start lg:flex-none">
            <Link href="/" className="flex items-center">
              <span className="sr-only">DOUFEL collection</span>
              <div className="relative">
                <span className="font-serif text-pink-700 text-3xl tracking-wide">
                  DOUFEL
                </span>
                <span className="block text-pink-800 text-xs tracking-wide text-center mt-[-2px]">
                  collection
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation - hidden on mobile */}
          <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/new-collection"
                  className="text-neutral-800 hover:text-[#5a8575]"
                >
                  New Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/ensemble"
                  className="text-neutral-800 hover:text-[#5a8575]"
                >
                  Ensemble
                </Link>
              </li>
              <li>
                <Link
                  href="/robe"
                  className="text-neutral-800 hover:text-[#5a8575]"
                >
                  Robe
                </Link>
              </li>
              <li>
                <Link
                  href="/veste"
                  className="text-neutral-800 hover:text-[#5a8575]"
                >
                  Veste
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search and cart */}
          <div className="flex items-center space-x-4">
            {/* Cart component */}
            <Cart />
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-neutral-800"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-6">
            <li>
              <Link
                href="/new-collection"
                className="text-xl font-medium text-neutral-800 hover:text-[#5a8575]"
                onClick={() => setIsMenuOpen(false)}
              >
                New Collection
              </Link>
            </li>
            <li>
              <Link
                href="/ensemble"
                className="text-xl font-medium text-neutral-800 hover:text-[#5a8575]"
                onClick={() => setIsMenuOpen(false)}
              >
                Ensemble
              </Link>
            </li>
            <li>
              <Link
                href="/robe"
                className="text-xl font-medium text-neutral-800 hover:text-[#5a8575]"
                onClick={() => setIsMenuOpen(false)}
              >
                Robe
              </Link>
            </li>
            <li>
              <Link
                href="/veste"
                className="text-xl font-medium text-neutral-800 hover:text-[#5a8575]"
                onClick={() => setIsMenuOpen(false)}
              >
                Veste
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
