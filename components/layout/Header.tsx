"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";
import { useTheme } from "@/lib/context/ThemeContext";
import { useSettings } from "@/lib/context/SettingsContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { settings } = useSettings();
  const {
    cart,
    isCartOpen,
    openCart,
    closeCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
  } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl font-display font-bold gradient-text">
                {settings.shopName}
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
                href="/boutique?category=hommes"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Hommes
              </Link>
              <Link
                href="/boutique?category=femmes"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Femmes
              </Link>
              <Link
                href="/boutique?category=accessoires"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                Accessoires
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title={`Thème : ${theme === "dark" ? "Sombre" : "Clair"}`}
              >
                {theme === "dark" ? (
                  <Moon
                    size={24}
                    className="text-gray-700 dark:text-gray-300"
                  />
                ) : (
                  <Sun size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Search */}
              <button className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Search
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>

              {/* User */}
              <Link
                href="/auth/login"
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <User size={24} className="text-gray-700 dark:text-gray-300" />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ShoppingBag
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
                <AnimatePresence>
                  {getCartCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {getCartCount()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu
                    size={24}
                    className="text-gray-700 dark:text-gray-300"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-white/20"
              >
                <div className="flex flex-col gap-4 py-4">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/boutique"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Boutique
                  </Link>
                  <Link
                    href="/boutique?category=hommes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Hommes
                  </Link>
                  <Link
                    href="/boutique?category=femmes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Femmes
                  </Link>
                  <Link
                    href="/boutique?category=accessoires"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    Accessoires
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </>
  );
}
