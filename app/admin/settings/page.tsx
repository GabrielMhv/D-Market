"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  Save,
  Settings as SettingsIcon,
  DollarSign,
  Truck,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSettings, Settings } from "@/lib/context/SettingsContext";

export default function AdminSettingsPage() {
  const { settings, updateSettings, loading } = useSettings();
  const [formData, setFormData] = useState<Settings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith("notifications.")) {
        const notificationKey = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationKey]: checked,
          },
        }));
      }
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
            Paramètres
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configuration de votre boutique
          </p>
        </div>
      </FadeIn>

      <form onSubmit={handleSubmit}>
        <StaggerContainer className="space-y-6">
          {/* General Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <SettingsIcon
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Informations générales
                </h2>
              </div>
              <div className="space-y-4">
                <Input
                  label="Nom de la boutique"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Mon E-Shop"
                />
                <Input
                  label="Email de contact"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@exemple.com"
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+229..."
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adresse
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    rows={3}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payments & Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Truck
                    className="text-green-600 dark:text-green-400"
                    size={24}
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Paiements & Livraison
                </h2>
              </div>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Frais de livraison standard
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Appliqué à toutes les commandes
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="deliveryFee"
                      value={formData.deliveryFee}
                      onChange={handleChange}
                      className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      FCFA
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Livraison gratuite à partir de
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Montant minimum de commande
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="freeDeliveryThreshold"
                      value={formData.freeDeliveryThreshold}
                      onChange={handleChange}
                      className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      FCFA
                    </span>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Bell
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h2>
              </div>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Nouvelles commandes
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Recevoir une notification pour chaque nouvelle commande
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications.newOrders"
                    checked={formData.notifications.newOrders}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Stock bas
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Alerte quand un produit a moins de 10 unités
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications.lowStock"
                    checked={formData.notifications.lowStock}
                    onChange={handleChange}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
              </div>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <div className="sticky bottom-6 flex justify-end">
            <Button
              type="submit"
              className="gap-2 shadow-xl"
              disabled={isSaving}
            >
              <Save size={20} />
              {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </div>
        </StaggerContainer>
      </form>
    </div>
  );
}
