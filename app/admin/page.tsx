"use client";

import { useState } from "react";
import Link from "next/link";
import StatsCard from "@/components/ui/StatsCard";
import Timeline from "@/components/ui/Timeline";
import StatusBadge from "@/components/ui/StatusBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
  Bell,
  Clock,
} from "lucide-react";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export default function AdminDashboardPage() {
  const [stats] = useState<Stats>({
    totalRevenue: 2450000,
    totalOrders: 156,
    totalProducts: 45,
    totalCustomers: 89,
    pendingOrders: 12,
    lowStockProducts: 5,
  });

  const recentActivity = [
    {
      id: "1",
      title: "Nouvelle commande #1056",
      description: "Client: Marie Dupont - 25,000 FCFA",
      timestamp: "Il y a 5 min",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      title: "Produit ajouté",
      description: "T-shirt Premium Noir - Taille M",
      timestamp: "Il y a 15 min",
      color: "from-green-500 to-green-600",
    },
    {
      id: "3",
      title: "Commande expédiée #1055",
      description: "Client: Jean Martin - Livraison en cours",
      timestamp: "Il y a 1h",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "4",
      title: "Stock bas détecté",
      description: "Casquette Sport - 3 unités restantes",
      timestamp: "Il y a 2h",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <FadeIn>
          <div>
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Clock size={16} />
              Vue d'ensemble de votre activité
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex gap-3">
            <Link href="/admin/produits/nouveau">
              <Button className="gap-2">
                <Plus size={18} />
                Nouveau produit
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <Bell size={18} />
              Notifications
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Chiffre d'affaires"
          value={stats.totalRevenue.toLocaleString("fr-FR")}
          subtitle="FCFA"
          icon={DollarSign}
          trend={{ value: "+12% ce mois", isPositive: true }}
          iconColor="text-green-600 dark:text-green-400"
          iconBgColor="bg-green-100 dark:bg-green-900/30"
        />
        <StatsCard
          title="Commandes"
          value={stats.totalOrders}
          subtitle={`${stats.pendingOrders} en attente`}
          icon={ShoppingCart}
          trend={{ value: "+8% ce mois", isPositive: true }}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBgColor="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatsCard
          title="Produits"
          value={stats.totalProducts}
          subtitle={`${stats.lowStockProducts} stock bas`}
          icon={Package}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBgColor="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatsCard
          title="Clients"
          value={stats.totalCustomers}
          subtitle="Inscrits"
          icon={Users}
          trend={{ value: "+15% ce mois", isPositive: true }}
          iconColor="text-pink-600 dark:text-pink-400"
          iconBgColor="bg-pink-100 dark:bg-pink-900/30"
        />
      </StaggerContainer>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2 columns */}
        <FadeIn delay={0.3} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart size={20} className="text-primary-600" />
                Commandes récentes
              </h2>
              <Link href="/admin/commandes">
                <Button variant="ghost" size="sm" className="gap-1">
                  Voir tout
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      Commande #{1000 + i}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Client {i} • Il y a {i}h
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {(15000 + i * 5000).toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                    <StatusBadge
                      variant={
                        i === 1 ? "warning" : i === 2 ? "info" : "success"
                      }
                      pulse={i === 1}
                    >
                      {i === 1 ? "En attente" : i === 2 ? "En cours" : "Livrée"}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        {/* Activity Timeline - 1 column */}
        <FadeIn delay={0.4}>
          <Card className="h-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary-600" />
              Activité récente
            </h2>
            <Timeline items={recentActivity} />
          </Card>
        </FadeIn>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts > 0 && (
        <FadeIn delay={0.5}>
          <Card className="border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Package
                    className="text-red-600 dark:text-red-400"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Alerte Stock Bas
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.lowStockProducts} produit
                    {stats.lowStockProducts > 1 ? "s" : ""} nécessite
                    {stats.lowStockProducts > 1 ? "nt" : ""} un
                    réapprovisionnement
                  </p>
                </div>
              </div>
              <Link href="/admin/produits">
                <Button variant="outline" size="sm" className="gap-2">
                  Gérer
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </FadeIn>
      )}
    </div>
  );
}
