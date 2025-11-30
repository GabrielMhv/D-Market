"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getProductById,
  addProduct,
  updateProduct,
} from "@/lib/firebase/firestore";
import { uploadImagesToCloudinary } from "@/lib/cloudinary/upload";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/Motion";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductFormPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "hommes",
    stock: 0,
    images: [],
    sizes: ["S", "M", "L", "XL"],
    colors: [],
    isNew: true,
    featured: false,
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const product = await getProductById(params.id);
      if (product) {
        setFormData(product);
        setPreviewImages(product.images);
      } else {
        setError("Produit non trouvé");
      }
    } catch (err) {
      setError("Erreur lors du chargement du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);

      // Create previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemovePreview = (index: number) => {
    const currentImagesCount = formData.images?.length || 0;

    if (index < currentImagesCount) {
      // Removing an existing image
      const updatedImages = [...(formData.images || [])];
      updatedImages.splice(index, 1);
      setFormData((prev) => ({ ...prev, images: updatedImages }));
    } else {
      // Removing a new image
      const newImageIndex = index - currentImagesCount;
      setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageUrls = [...(formData.images || [])];

      // Upload new images to Cloudinary
      if (newImages.length > 0) {
        const uploadedUrls = await uploadImagesToCloudinary(newImages);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      const productData = {
        ...formData,
        images: imageUrls,
        price: Number(formData.price),
        stock: Number(formData.stock),
      } as Omit<Product, "id">;

      if (isNew) {
        await addProduct(productData);
      } else {
        await updateProduct(params.id, productData);
      }

      router.push("/admin/produits");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/produits">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <FadeIn className="flex-1">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {isNew ? "Nouveau produit" : "Modifier le produit"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isNew
              ? "Ajoutez un nouveau produit à votre catalogue"
              : "Modifiez les informations du produit"}
          </p>
        </FadeIn>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Informations générales
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Nom du produit"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: T-shirt Premium Noir"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Décrivez votre produit en détail..."
                      required
                    />
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                  <ImageIcon size={20} className="text-primary-600" />
                  Images du produit
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <AnimatePresence>
                    {previewImages.map((url, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group"
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePreview(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={16} />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-lg font-medium">
                            Principal
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer transition-all bg-gray-50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 group"
                  >
                    <Upload
                      size={32}
                      className="text-gray-400 group-hover:text-primary-600 mb-2 transition-colors"
                    />
                    <span className="text-sm text-gray-500 group-hover:text-primary-600 font-medium transition-colors">
                      Ajouter
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </motion.label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  La première image sera utilisée comme image principale
                </p>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Détails
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Prix (FCFA)"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="15000"
                    required
                  />
                  <Input
                    label="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: Number(e.target.value),
                      })
                    }
                    placeholder="50"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Product["category"],
                        })
                      }
                    >
                      <option value="hommes">Hommes</option>
                      <option value="femmes">Femmes</option>
                      <option value="accessoires">Accessoires</option>
                    </select>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Options
                </h2>
                <div className="space-y-3">
                  <motion.label
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) =>
                        setFormData({ ...formData, isNew: e.target.checked })
                      }
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        Nouveauté
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Afficher le badge "Nouveau"
                      </p>
                    </div>
                  </motion.label>
                  <motion.label
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        Mis en avant
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Afficher sur la page d'accueil
                      </p>
                    </div>
                  </motion.label>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Button
                type="submit"
                className="w-full gap-2"
                isLoading={saving}
                size="lg"
              >
                <Save size={20} />
                {isNew ? "Créer le produit" : "Enregistrer les modifications"}
              </Button>
            </FadeIn>
          </div>
        </div>
      </form>
    </div>
  );
}
