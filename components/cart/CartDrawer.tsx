"use client";

import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartItem as CartItemType } from "@/types";
import CartItem from "./CartItem";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 1000; // 1000 FCFA
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={24} />
                Panier ({items.length})
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={64}
                    className="text-gray-300 dark:text-gray-600 mb-4"
                  />
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                    Votre panier est vide
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                    Ajoutez des produits pour commencer vos achats
                  </p>
                  <Link href="/boutique" onClick={onClose}>
                    <Button variant="primary">Découvrir la boutique</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.product_id}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemove}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Livraison</span>
                    <span>{deliveryFee.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span>{total.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" onClick={onClose}>
                  <Button variant="primary" size="lg" className="w-full">
                    Procéder au paiement
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
