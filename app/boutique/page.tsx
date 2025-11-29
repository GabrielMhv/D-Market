"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters, {
  FilterOptions,
} from "@/components/products/ProductFilters";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartItem } from "@/types";

// Données de démonstration
const demoProducts: Product[] = [
  {
    id: "1",
    name: "T-Shirt Premium Coton",
    description: "T-shirt en coton 100% biologique, coupe moderne",
    images: [],
    price: 8500,
    old_price: 12000,
    category: "hommes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#0000FF"],
    stock: 15,
    isNew: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    name: "Robe Élégante",
    description: "Robe longue élégante pour toutes occasions",
    images: [],
    price: 25000,
    category: "femmes",
    sizes: ["S", "M", "L"],
    colors: ["#FF0000", "#000000"],
    stock: 8,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    name: "Sac à Main Cuir",
    description: "Sac à main en cuir véritable, design moderne",
    images: [],
    price: 35000,
    old_price: 45000,
    category: "accessoires",
    sizes: [],
    colors: ["#8B4513", "#000000"],
    stock: 5,
    featured: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    name: "Chemise Classique",
    description: "Chemise classique pour homme, tissu respirant",
    images: [],
    price: 15000,
    category: "hommes",
    sizes: ["M", "L", "XL"],
    colors: ["#FFFFFF", "#87CEEB", "#FFB6C1"],
    stock: 20,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    name: "Jupe Plissée",
    description: "Jupe plissée tendance, parfaite pour l'été",
    images: [],
    price: 12000,
    category: "femmes",
    sizes: ["S", "M", "L"],
    colors: ["#FF69B4", "#000000", "#FFFFFF"],
    stock: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "6",
    name: "Montre Élégante",
    description: "Montre élégante avec bracelet en cuir",
    images: [],
    price: 45000,
    category: "accessoires",
    sizes: [],
    colors: ["#C0C0C0", "#FFD700"],
    stock: 12,
    isNew: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default function BoutiquePage() {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(demoProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...demoProducts];

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filter by price
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filter by sizes
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => filters.sizes!.includes(size))
      );
    }

    // Filter by colors
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => filters.colors!.includes(color))
      );
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          filtered.sort(
            (a, b) => b.created_at.getTime() - a.created_at.getTime()
          );
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        product_id: product.id,
        product_name: product.name,
        product_image: product.images[0] || "",
        quantity: 1,
        price: product.price,
      };
      setCartItems([...cartItems, newItem]);
    }

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product_id !== productId));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Boutique
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez notre collection de vêtements et accessoires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProducts.length} produit
                {filteredProducts.length > 1 ? "s" : ""} trouvé
                {filteredProducts.length > 1 ? "s" : ""}
              </p>
              <button
                onClick={() => setIsCartOpen(true)}
                className="lg:hidden px-4 py-2 bg-primary-600 text-white rounded-lg"
              >
                Panier ({cartItems.length})
              </button>
            </div>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </main>
  );
}
