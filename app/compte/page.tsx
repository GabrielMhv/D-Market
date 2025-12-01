"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, getUserData } from "@/lib/firebase/auth";
import { getOrdersByUser, getUserAddresses } from "@/lib/firebase/firestore";
import { Order } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  User,
  Package,
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ComptePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      // Get Firestore user data
      const firestoreUser = await getUserData(currentUser.uid);

      // Merge Firebase Auth user with Firestore data
      setUser({
        ...currentUser,
        ...firestoreUser,
      });

      // Get user orders
      const userOrders = await getOrdersByUser(currentUser.uid);
      setOrders(userOrders);

      // Get user addresses
      const addresses = await getUserAddresses(currentUser.uid);
      const defaultAddr = addresses.find((addr) => addr.isDefault);
      setDefaultAddress(defaultAddr || null);

      setLoading(false);
    }

    loadUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter((o) => o.status === "delivered").length;

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
            Mon Compte
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos informations et suivez vos commandes
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - User Info */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {(user?.name || user?.displayName || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {user?.name || user?.displayName || "Utilisateur"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {user?.email}
                  </p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <Mail size={16} />
                      <span>{user?.email}</span>
                    </div>
                    {(user?.phone || user?.phoneNumber) && (
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <Phone size={16} />
                        <span>{user.phone || user.phoneNumber}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />
                      <span>
                        Membre depuis{" "}
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString("fr-FR")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Stats Cards */}
            <FadeIn delay={0.2}>
              <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Commandes</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Dépensé</p>
                    <p className="text-2xl font-bold">
                      {totalSpent.toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Default Address */}
            <FadeIn delay={0.35}>
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin size={18} className="text-primary-600" />
                    Adresse par défaut
                  </h3>
                  <Link href="/compte/adresses">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit size={14} />
                    </Button>
                  </Link>
                </div>
                {defaultAddress ? (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {defaultAddress.name}
                    </p>
                    <p>{defaultAddress.address}</p>
                    <p>
                      {defaultAddress.city}, {defaultAddress.country}
                    </p>
                    <p className="mt-1">{defaultAddress.phone}</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Aucune adresse par défaut
                    </p>
                    <Link href="/compte/adresses">
                      <Button size="sm" variant="outline" className="w-full">
                        Ajouter une adresse
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            </FadeIn>
          </div>

          {/* Main Content - Orders */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.4}>
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Package className="text-primary-600" size={24} />
                  Mes Commandes
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag
                      size={64}
                      className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
                    />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Vous n'avez pas encore passé de commande
                    </p>
                    <Link href="/boutique">
                      <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                        Découvrir la boutique
                      </button>
                    </Link>
                  </div>
                ) : (
                  <StaggerContainer className="space-y-4">
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={`/compte/commandes/${order.id}`}>
                          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Commande #{order.id.slice(0, 8)}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  {order.created_at?.toLocaleDateString(
                                    "fr-FR"
                                  )}
                                </p>
                              </div>
                              {getStatusBadge(order.status)}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Package size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {order.products.length} article
                                  {order.products.length > 1 ? "s" : ""}
                                </span>
                              </div>
                              <p className="font-bold text-primary-600 dark:text-primary-400">
                                {order.total.toLocaleString("fr-FR")} FCFA
                              </p>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                )}
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
