"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Filter, Search, X } from "lucide-react";
import Input from "@/components/ui/Input";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterCategory
      ? product.category === filterCategory
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["hommes", "femmes", "accessoires"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Boutique
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Découvrez nos dernières collections
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Filtres</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === null
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Tout
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    filterCategory === cat
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Catégories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterCategory(null)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filterCategory === null
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  Tout voir
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg capitalize transition-colors ${
                      filterCategory === cat
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Aucun produit trouvé.</p>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <FadeIn key={product.id}>
                    <Link href={`/produit/${product.id}`}>
                      <Card
                        hover
                        className="h-full p-4 group transition-all duration-300"
                      >
                        <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                          {product.isNew && (
                            <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-md shadow-sm">
                              NOUVEAU
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 capitalize mb-1">
                            {product.category}
                          </p>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-primary-600 font-bold text-xl">
                            {product.price.toLocaleString("fr-FR")} FCFA
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
