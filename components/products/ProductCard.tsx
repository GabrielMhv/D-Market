"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const discount = product.old_price
    ? Math.round(
        ((product.old_price - product.price) / product.old_price) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge variant="success" size="sm">
            Nouveau
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="danger" size="sm">
            -{discount}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="warning" size="sm">
            Épuisé
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700">
        <Heart size={20} className="text-gray-700 dark:text-gray-300" />
      </button>

      {/* Image */}
      <Link href={`/produit/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ShoppingCart size={48} />
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Title */}
        <Link href={`/produit/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {product.price.toLocaleString("fr-FR")} FCFA
          </span>
          {product.old_price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {product.old_price.toLocaleString("fr-FR")} FCFA
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mb-4">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full gap-2"
          disabled={product.stock === 0}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? "Épuisé" : "Ajouter au panier"}
        </Button>
      </div>
    </motion.div>
  );
}
