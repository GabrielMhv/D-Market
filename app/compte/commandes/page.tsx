"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase/config";
import { getUserOrders } from "@/lib/firebase/firestore";
import { Order } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";

export default function UserOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const data = await getUserOrders(firebaseUser.uid);
          setOrders(data);
        } catch (error) {
          console.error("Erreur chargement commandes:", error);
        }
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/compte">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              Mes Commandes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Historique de vos achats
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Aucune commande
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link href="/boutique">
              <Button>Découvrir nos produits</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        Commande #{order.id}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.created_at?.toLocaleDateString()} à{" "}
                      {order.created_at?.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-primary-600">
                      {order.total.toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          {item.product_image ? (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package
                              size={20}
                              className="text-gray-400 m-auto h-full"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.product_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qté: {item.quantity} ×{" "}
                            {item.price.toLocaleString("fr-FR")} FCFA
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                        FCFA
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Livraison à : {order.delivery_address.name}</p>
                    <p>{order.delivery_address.city}</p>
                  </div>
                  {/* Future: Add 'Track Order' or 'Invoice' buttons here */}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
