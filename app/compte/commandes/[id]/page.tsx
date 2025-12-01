"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/lib/firebase/firestore";
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
  MapPin,
  Phone,
  User,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

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
        title: "Commande confirmée",
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
        title: "En préparation",
        description: "Votre commande est en cours de traitement",
        timestamp: "",
        color: "from-purple-500 to-purple-600",
      });
    }

    if (order?.status === "shipped" || order?.status === "delivered") {
      timeline.push({
        id: "3",
        title: "Expédiée",
        description: "Votre colis est en route",
        timestamp: "",
        color: "from-indigo-500 to-indigo-600",
      });
    }

    if (order?.status === "delivered") {
      timeline.push({
        id: "4",
        title: "Livrée",
        description: "Colis livré avec succès",
        timestamp: "",
        color: "from-green-500 to-green-600",
      });
    }

    if (order?.status === "cancelled") {
      timeline.push({
        id: "2",
        title: "Annulée",
        description: "La commande a été annulée",
        timestamp: "",
        color: "from-red-500 to-red-600",
      });
    }

    return timeline;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Commande introuvable
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Cette commande n'existe pas ou vous n'y avez pas accès.
        </p>
        <Link href="/compte">
          <Button>Retour à mon compte</Button>
        </Link>
      </div>
    );
  }

  const subtotal = order.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = order.total - subtotal;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/compte"
            className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à mes commandes
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Commande #{order.id.slice(0, 8)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Passée le {order.created_at?.toLocaleDateString("fr-FR")} à{" "}
                {order.created_at?.toLocaleTimeString("fr-FR")}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <FadeIn delay={0.1}>
              <Card>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <ShoppingBag size={20} className="text-primary-600" />
                  Articles commandés
                </h2>
                <div className="space-y-6">
                  {order.products.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
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
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-4">
                            {item.product_name}
                          </h3>
                          <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString(
                              "fr-FR"
                            )}{" "}
                            FCFA
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {item.size && `Taille: ${item.size} • `}
                          {item.color && `Couleur: ${item.color} • `}
                          Qté: {item.quantity}
                        </p>
                        <p className="text-xs text-gray-400">
                          PU: {item.price.toLocaleString("fr-FR")} FCFA
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Livraison</span>
                    <span>{deliveryFee.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-2xl text-primary-600">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={0.2}>
              <Card>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Suivi de commande
                </h2>
                <Timeline items={getOrderTimeline()} />
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <Card>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Truck size={20} className="text-primary-600" />
                  Livraison
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Destinataire
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.delivery_address.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Téléphone
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.delivery_address.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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

            <FadeIn delay={0.4}>
              <Card className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30">
                <h3 className="font-bold text-primary-900 dark:text-primary-100 mb-2">
                  Besoin d'aide ?
                </h3>
                <p className="text-sm text-primary-700 dark:text-primary-300 mb-4">
                  Si vous avez des questions concernant votre commande,
                  n'hésitez pas à nous contacter.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-primary-200 hover:bg-primary-100 dark:border-primary-800 dark:hover:bg-primary-900/50"
                  >
                    Contactez le support
                  </Button>
                </Link>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
