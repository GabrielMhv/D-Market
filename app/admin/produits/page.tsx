"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProducts, deleteProduct } from "@/lib/firebase/firestore";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  Grid,
  List,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erreur chargement produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    setIsDeleting(id);
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression");
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <FadeIn>
          <div>
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
              Produits
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {products.length} produit{products.length > 1 ? "s" : ""} au
              catalogue
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link href="/admin/produits/new">
            <Button className="gap-2">
              <Plus size={20} />
              Nouveau produit
            </Button>
          </Link>
        </FadeIn>
      </div>

      {/* Search and View Toggle */}
      <FadeIn delay={0.2}>
        <Card>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="gap-2"
              >
                <Grid size={18} />
                Grille
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List size={18} />
                Liste
              </Button>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Products Display */}
      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Commencez par ajouter votre premier produit
              </p>
              <Link href="/admin/produits/new">
                <Button className="gap-2">
                  <Plus size={20} />
                  Ajouter un produit
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : viewMode === "grid" ? (
          <StaggerContainer
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card hover className="group overflow-hidden p-0">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={48} className="text-gray-400" />
                      </div>
                    )}
                    {product.stock < 10 && (
                      <div className="absolute top-2 right-2">
                        <StatusBadge variant="danger" pulse>
                          Stock bas
                        </StatusBadge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <StatusBadge variant="info" className="text-xs">
                        {product.category}
                      </StatusBadge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Prix
                        </p>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">
                          {product.price.toLocaleString("fr-FR")} FCFA
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Stock
                        </p>
                        <p
                          className={`font-bold text-lg ${
                            product.stock < 10
                              ? "text-red-600"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {product.stock}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/admin/produits/${product.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                        >
                          <Edit size={16} />
                          Modifier
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDelete(product.id)}
                        isLoading={isDeleting === product.id}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Produit
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Catégorie
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Prix
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Stock
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                              {product.images[0] ? (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package size={20} className="text-gray-400" />
                              )}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge variant="info">
                            {product.category}
                          </StatusBadge>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                          {product.price.toLocaleString("fr-FR")} FCFA
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-medium ${
                              product.stock < 10
                                ? "text-red-600"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {product.stock}
                            {product.stock < 10 && (
                              <AlertCircle className="inline ml-1" size={14} />
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/produits/${product.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <Edit size={18} />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDelete(product.id)}
                              isLoading={isDeleting === product.id}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
