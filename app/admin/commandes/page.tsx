"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrders } from "@/lib/firebase/firestore";
import { Order } from "@/types";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  Eye,
  Search,
  ShoppingCart,
  Filter,
  Calendar,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <StatusBadge variant="warning" pulse>
            En attente
          </StatusBadge>
        );
      case "processing":
        return <StatusBadge variant="info">En traitement</StatusBadge>;
      case "shipped":
        return <StatusBadge variant="primary">Expédiée</StatusBadge>;
      case "delivered":
        return <StatusBadge variant="success">Livrée</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="danger">Annulée</StatusBadge>;
      default:
        return <StatusBadge variant="secondary">{status}</StatusBadge>;
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
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
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
            Commandes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {orders.length} commande{orders.length > 1 ? "s" : ""} au total
          </p>
        </div>
      </FadeIn>

      {/* Quick Stats */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart size={20} />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
          <p className="text-sm text-blue-100">Total</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar size={20} />
            <span className="text-2xl font-bold">{stats.pending}</span>
          </div>
          <p className="text-sm text-amber-100">En attente</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={20} />
            <span className="text-2xl font-bold">{stats.processing}</span>
          </div>
          <p className="text-sm text-purple-100">En cours</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart size={20} />
            <span className="text-2xl font-bold">{stats.delivered}</span>
          </div>
          <p className="text-sm text-green-100">Livrées</p>
        </motion.div>
      </StaggerContainer>

      {/* Filters */}
      <FadeIn delay={0.2}>
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher par ID ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="processing">En traitement</option>
                <option value="shipped">Expédiée</option>
                <option value="delivered">Livrée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Orders Table */}
      <FadeIn delay={0.3}>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Commande
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Client
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Total
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Statut
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucune commande trouvée
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono font-medium text-gray-900 dark:text-white">
                          #{order.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.user_email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {order.created_at?.toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {order.total.toLocaleString("fr-FR")} FCFA
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link href={`/admin/commandes/${order.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Eye size={18} />
                            Détails
                          </Button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
