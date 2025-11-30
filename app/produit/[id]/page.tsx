"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/firebase/firestore";
import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import { FadeIn, SlideIn } from "@/components/ui/Motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      if (params.id) {
        const data = await getProductById(params.id as string);
        setProduct(data);
        if (data?.sizes?.length) setSelectedSize(data.sizes[0]);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, selectedSize);
    toast.success("Ajouté au panier !");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Produit non trouvé</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Image Gallery */}
          <SlideIn className="space-y-4">
            <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm relative group">
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary-600 ring-2 ring-primary-100"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </SlideIn>

          {/* Product Info */}
          <FadeIn delay={0.2} className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={24} />
                </button>
              </div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary-600">
                {product.price.toLocaleString("fr-FR")} FCFA
              </p>
            </div>

            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400">
              <p>{product.description}</p>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
                  Taille
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                        selectedSize === size
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl w-max">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:text-primary-600 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:text-primary-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 gap-2 rounded-xl"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                Ajouter au panier
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  <Truck size={20} />
                </div>
                <span>Livraison rapide partout au Bénin</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <span>Garantie satisfait ou remboursé</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
