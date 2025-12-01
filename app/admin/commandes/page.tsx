"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "@/lib/firebase/firestore";
import { Order } from "@/types";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  Search,
  ShoppingCart,
  Clock,
  Package,
  CheckCircle,
  Printer,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

type DateFilter = "today" | "7days" | "30days";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("30days");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Commande marquée comme ${getStatusLabel(newStatus)}`);
      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir annuler cette commande ? Le stock sera restauré."
      )
    ) {
      return;
    }

    try {
      await cancelOrder(orderId);
      toast.success("Commande annulée avec succès");
      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error("Erreur annulation:", error);
      toast.error("Erreur lors de l'annulation");
    }
  };

  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.delivery_address.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by date
    const now = new Date();
    if (dateFilter === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter(
        (order) => order.created_at && order.created_at >= today
      );
    } else if (dateFilter === "7days") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (order) => order.created_at && order.created_at >= sevenDaysAgo
      );
    } else if (dateFilter === "30days") {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(
        (order) => order.created_at && order.created_at >= thirtyDaysAgo
      );
    }

    return filtered.sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return b.created_at.getTime() - a.created_at.getTime();
    });
  };

  const filteredOrders = getFilteredOrders();

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En attente",
      processing: "En préparation",
      shipped: "En livraison",
      delivered: "Livré",
      cancelled: "Annulé",
    };
    return labels[status] || status;
  };

  const getTimeAgo = (date: Date | null | undefined) => {
    if (!date) return "";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(diff / 2592000000);

    if (months > 0) return `Il y a ${months} mois`;
    if (days > 0) return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
    return "À l'instant";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <FadeIn>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Rechercher des commandes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
        </div>
      </FadeIn>

      {/* Stats Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ShoppingCart className="text-blue-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Total commandes</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="text-yellow-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">En attente</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Package className="text-purple-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">En préparation</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.processing}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Livré</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats.delivered}</div>
        </motion.div>
      </StaggerContainer>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "all", label: "Toutes les commandes" },
            { value: "pending", label: "En attente" },
            { value: "processing", label: "En préparation" },
            { value: "delivered", label: "Livré" },
            { value: "cancelled", label: "Annulé" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === filter.value
                  ? "bg-primary-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Date Filters */}
        <div className="flex gap-2 ml-auto">
          {[
            { value: "today" as DateFilter, label: "Aujourd'hui" },
            { value: "7days" as DateFilter, label: "7 derniers jours" },
            { value: "30days" as DateFilter, label: "30 derniers jours" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setDateFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                dateFilter === filter.value
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      Commande #{order.id.slice(0, 8)}
                    </h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">
                      📋{" "}
                      {order.payment_method === "cash" ? "Table" : "Livraison"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {getTimeAgo(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {order.total.toLocaleString("fr-FR")} FCFA
                  </div>
                  <div className="text-sm text-gray-400">
                    {order.products.length} article
                    {order.products.length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="flex items-center justify-between mb-6 relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-700"></div>
                {["pending", "processing", "delivered"].map((status, idx) => {
                  const isActive =
                    order.status === status ||
                    (order.status === "delivered" && idx < 3) ||
                    (order.status === "processing" && idx < 2);
                  return (
                    <div key={status} className="relative z-10 text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 transition-all ${
                          isActive
                            ? "bg-primary-500 text-white"
                            : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {isActive ? "●" : "○"}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive ? "text-primary-400" : "text-gray-500"
                        }`}
                      >
                        {getStatusLabel(status)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isActive && getTimeAgo(order.created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Client Details */}
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Détails Client
                </h4>
                <p className="text-white">{order.delivery_address.name}</p>
                {order.delivery_address.phone && (
                  <p className="text-sm text-gray-400">
                    {order.delivery_address.phone}
                  </p>
                )}
                <p className="text-sm text-gray-400">
                  {order.delivery_address.address},{" "}
                  {order.delivery_address.city}
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  💳 Mode de paiement
                </h4>
                <p className="text-white">
                  {order.payment_method === "cash"
                    ? "Paiement à la caisse"
                    : order.payment_method === "delivery"
                    ? "Paiement à la livraison"
                    : order.payment_method || "Non spécifié"}
                </p>
              </div>

              {/* Products */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                  Produits commandés
                </h4>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-300">
                        {item.quantity}x {item.product_name}
                      </span>
                      <span className="text-white font-medium">
                        {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                        FCFA
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {order.status !== "delivered" &&
                  order.status !== "cancelled" && (
                    <Button
                      variant="primary"
                      className="flex-1 bg-primary-600 hover:bg-primary-700"
                      onClick={() => handleUpdateStatus(order.id, "delivered")}
                    >
                      Marquer comme livré
                    </Button>
                  )}
                {order.status !== "cancelled" && (
                  <Button
                    variant="danger"
                    className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    <Trash2 size={16} />
                    Annuler
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 border-primary-500/30"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
}
