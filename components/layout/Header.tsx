"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl font-display font-bold gradient-text">
              E-Shop
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/boutique"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Boutique
            </Link>
            <Link
              href="/boutique/hommes"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Hommes
            </Link>
            <Link
              href="/boutique/femmes"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Femmes
            </Link>
            <Link
              href="/boutique/accessoires"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Accessoires
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
              <Search size={24} className="text-gray-700 dark:text-gray-300" />
            </button>

            {/* User */}
            <Link
              href="/auth/login"
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <User size={24} className="text-gray-700 dark:text-gray-300" />
            </Link>

            {/* Cart */}
            <Link
              href="/panier"
              className="relative p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ShoppingCart
                size={24}
                className="text-gray-700 dark:text-gray-300"
              />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Menu size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Accueil
              </Link>
              <Link
                href="/boutique"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Boutique
              </Link>
              <Link
                href="/boutique/hommes"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Hommes
              </Link>
              <Link
                href="/boutique/femmes"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Femmes
              </Link>
              <Link
                href="/boutique/accessoires"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Accessoires
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
