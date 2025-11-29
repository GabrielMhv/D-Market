"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.product_id, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
        {item.product_image ? (
          <Image
            src={item.product_image}
            alt={item.product_name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
          {item.product_name}
        </h4>

        {/* Variants */}
        <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 mb-2">
          {item.size && <span>Taille: {item.size}</span>}
          {item.color && (
            <div className="flex items-center gap-1">
              <span>Couleur:</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: item.color }}
              />
            </div>
          )}
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary-600 dark:text-primary-400">
            {itemTotal.toLocaleString("fr-FR")} FCFA
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              <Minus size={16} />
            </button>

            <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              <Plus size={16} />
            </button>

            <button
              onClick={() => onRemove(item.product_id)}
              className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
