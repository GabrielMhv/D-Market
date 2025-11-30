"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase/config";
import { getUserData, logout } from "@/lib/firebase/auth";
import { getUserOrders } from "@/lib/firebase/firestore";
import { User, Order } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { User as UserIcon, Package, LogOut, MapPin } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          setUser(userData);
          const orders = await getUserOrders(firebaseUser.uid);
          setRecentOrders(orders.slice(0, 3)); // Get last 3 orders
        } catch (error) {
          console.error("Erreur chargement données:", error);
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">En attente</Badge>;
      case "processing":
        return <Badge variant="info">En traitement</Badge>;
      case "shipped":
        return <Badge variant="primary">Expédiée</Badge>;
      case "delivered":
        return <Badge variant="success">Livrée</Badge>;
      case "cancelled":
        return <Badge variant="danger">Annulée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-16 h-16 border-4"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Mon Compte
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bienvenue, {user.name}
            </p>
          </div>
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <Link href="/compte">
              <Card className="flex items-center gap-3 p-4 border-l-4 border-primary-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <UserIcon className="text-primary-600" size={24} />
                <span className="font-medium">Vue d'ensemble</span>
              </Card>
            </Link>
            <Link href="/compte/commandes">
              <Card className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Package className="text-gray-500" size={24} />
                <span className="font-medium">Mes Commandes</span>
              </Card>
            </Link>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Info */}
            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserIcon size={20} />
                Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nom complet</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                  <p className="font-medium">{user.phone || "-"}</p>
                </div>
              </div>
            </Card>

            {/* Recent Orders */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Package size={20} />
                  Commandes récentes
                </h2>
                <Link
                  href="/compte/commandes"
                  className="text-primary-600 hover:underline text-sm"
                >
                  Voir tout
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Vous n'avez pas encore passé de commande.
                  <div className="mt-4">
                    <Link href="/boutique">
                      <Button>Commencer mes achats</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Commande #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.created_at?.toLocaleDateString()} •{" "}
                          {order.products.length} article(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white mb-1">
                          {order.total.toLocaleString("fr-FR")} FCFA
                        </p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
