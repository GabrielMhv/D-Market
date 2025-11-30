"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/lib/firebase/firestore";
import { Order } from "@/types";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Motion";
import Timeline from "@/components/ui/Timeline";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminOrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(params.id);
      setOrder(data);
    } catch (error) {
      console.error("Erreur chargement commande:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: Order["status"]) => {
    if (!order) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, status);
      setOrder({ ...order, status });
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
      alert("Erreur lors de la mise à jour du statut");
    } finally {
      setUpdating(false);
    }
  };

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

  const getOrderTimeline = () => {
    const timeline = [
      {
        id: "1",
        title: "Commande créée",
        description: `Passée le ${order?.created_at?.toLocaleDateString(
          "fr-FR"
        )}`,
        timestamp: order?.created_at?.toLocaleTimeString("fr-FR") || "",
        color: "from-blue-500 to-blue-600",
      },
    ];

    if (
      order?.status === "processing" ||
      order?.status === "shipped" ||
      order?.status === "delivered"
    ) {
      timeline.push({
        id: "2",
        title: "En traitement",
        description: "Commande en cours de préparation",
        timestamp: "Aujourd'hui",
        color: "from-purple-500 to-purple-600",
      });
    }

    if (order?.status === "shipped" || order?.status === "delivered") {
      timeline.push({
        id: "3",
        title: "Expédiée",
        description: "Commande en cours de livraison",
        timestamp: "Aujourd'hui",
        color: "from-indigo-500 to-indigo-600",
      });
    }

    if (order?.status === "delivered") {
      timeline.push({
        id: "4",
        title: "Livrée",
        description: "Commande livrée avec succès",
        timestamp: "Aujourd'hui",
        color: "from-green-500 to-green-600",
      });
    }

    if (order?.status === "cancelled") {
      timeline.push({
        id: "2",
        title: "Annulée",
        description: "Commande annulée",
        timestamp: "Aujourd'hui",
        color: "from-red-500 to-red-600",
      });
    }

    return timeline;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Commande non trouvée
        </p>
        <Link href="/admin/commandes">
          <Button variant="outline">Retour aux commandes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/commandes">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <FadeIn className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              Commande #{order.id.slice(0, 8)}
            </h1>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Passée le {order.created_at?.toLocaleDateString("fr-FR")} à{" "}
            {order.created_at?.toLocaleTimeString("fr-FR")}
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <FadeIn delay={0.1}>
            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Package size={20} className="text-primary-600" />
                Produits commandés
              </h2>
              <div className="space-y-4">
                {order.products.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        {item.product_image ? (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qté: {item.quantity} ×{" "}
                          {item.price.toLocaleString("fr-FR")} FCFA
                          {item.size && ` • Taille: ${item.size}`}
                          {item.color && ` • Couleur: ${item.color}`}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                      FCFA
                    </p>
                  </motion.div>
                ))}

                {/* Order Summary */}
                <div className="space-y-2 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Sous-total</span>
                    <span>{order.subtotal.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Livraison</span>
                    <span>
                      {order.delivery_fee.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Réduction</span>
                      <span>
                        -{order.discount.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-2xl text-primary-600">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Delivery Info */}
          <FadeIn delay={0.2}>
            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Truck size={20} className="text-primary-600" />
                Informations de livraison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Nom complet
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.delivery_address.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Phone
                      size={18}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Téléphone
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.delivery_address.phone}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin
                      size={18}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Adresse
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.delivery_address.address}
                      <br />
                      {order.delivery_address.city},{" "}
                      {order.delivery_address.country}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Timeline */}
          <FadeIn delay={0.3}>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Suivi de commande
              </h2>
              <Timeline items={getOrderTimeline()} />
            </Card>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <FadeIn delay={0.4}>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Actions
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Changer le statut :
                </p>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleStatusChange("processing")}
                  disabled={order.status === "processing" || updating}
                >
                  <Package size={16} />
                  En traitement
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => handleStatusChange("shipped")}
                  disabled={order.status === "shipped" || updating}
                >
                  <Truck size={16} />
                  Expédiée
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={() => handleStatusChange("delivered")}
                  disabled={order.status === "delivered" || updating}
                >
                  <CheckCircle size={16} />
                  Livrée
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => handleStatusChange("cancelled")}
                  disabled={order.status === "cancelled" || updating}
                >
                  <XCircle size={16} />
                  Annuler
                </Button>
              </div>
            </Card>
          </FadeIn>

          {/* Client Info */}
          <FadeIn delay={0.5}>
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Client
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                  {order.user_email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {order.delivery_address.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Mail size={12} />
                    {order.user_email}
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
