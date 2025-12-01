"use client";

import { useState, useEffect } from "react";
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
import {
  getAllOrders,
  getProducts,
  getAllUsers,
} from "@/lib/firebase/firestore";
import { Order, Product, User } from "@/types";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
  revenueTrend: { value: string; isPositive: boolean } | null;
  ordersTrend: { value: string; isPositive: boolean } | null;
  customersTrend: { value: string; isPositive: boolean } | null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    revenueTrend: null,
    ordersTrend: null,
    customersTrend: null,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [orders, products, users] = await Promise.all([
          getAllOrders(),
          getProducts(),
          getAllUsers(),
        ]);

        // Calculate basic stats
        const totalRevenue = orders.reduce(
          (sum, order) => sum + order.total,
          0
        );
        const pendingOrders = orders.filter(
          (o) => o.status === "pending"
        ).length;
        const lowStockProducts = products.filter((p) => p.stock < 5).length;
        const customers = users.filter((u) => u.role === "customer").length;

        // Calculate trends
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        // Revenue Trend
        const thisMonthRevenue = orders
          .filter((o) => o.created_at && o.created_at >= thisMonthStart)
          .reduce((sum, o) => sum + o.total, 0);
        const lastMonthRevenue = orders
          .filter(
            (o) =>
              o.created_at &&
              o.created_at >= lastMonthStart &&
              o.created_at <= lastMonthEnd
          )
          .reduce((sum, o) => sum + o.total, 0);

        let revenueTrend = null;
        if (lastMonthRevenue > 0) {
          const percent =
            ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
          revenueTrend = {
            value: `${percent > 0 ? "+" : ""}${percent.toFixed(0)}% ce mois`,
            isPositive: percent >= 0,
          };
        } else if (thisMonthRevenue > 0) {
          revenueTrend = { value: "+100% ce mois", isPositive: true };
        }

        // Orders Trend
        const thisMonthOrders = orders.filter(
          (o) => o.created_at && o.created_at >= thisMonthStart
        ).length;
        const lastMonthOrders = orders.filter(
          (o) =>
            o.created_at &&
            o.created_at >= lastMonthStart &&
            o.created_at <= lastMonthEnd
        ).length;

        let ordersTrend = null;
        if (lastMonthOrders > 0) {
          const percent =
            ((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
          ordersTrend = {
            value: `${percent > 0 ? "+" : ""}${percent.toFixed(0)}% ce mois`,
            isPositive: percent >= 0,
          };
        } else if (thisMonthOrders > 0) {
          ordersTrend = { value: "+100% ce mois", isPositive: true };
        }

        // Customers Trend
        const thisMonthCustomers = users.filter(
          (u) =>
            u.role === "customer" &&
            u.created_at &&
            u.created_at >= thisMonthStart
        ).length;
        const lastMonthCustomers = users.filter(
          (u) =>
            u.role === "customer" &&
            u.created_at &&
            u.created_at >= lastMonthStart &&
            u.created_at <= lastMonthEnd
        ).length;

        let customersTrend = null;
        if (lastMonthCustomers > 0) {
          const percent =
            ((thisMonthCustomers - lastMonthCustomers) / lastMonthCustomers) *
            100;
          customersTrend = {
            value: `${percent > 0 ? "+" : ""}${percent.toFixed(0)}% ce mois`,
            isPositive: percent >= 0,
          };
        } else if (thisMonthCustomers > 0) {
          customersTrend = { value: "+100% ce mois", isPositive: true };
        }

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: products.length,
          totalCustomers: customers,
          pendingOrders,
          lowStockProducts,
          revenueTrend,
          ordersTrend,
          customersTrend,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error("Erreur chargement dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const recentActivity = recentOrders.map((order) => ({
    id: order.id,
    title: `Nouvelle commande #${order.id.slice(0, 8)}`,
    description: `Client: ${
      order.delivery_address.name
    } - ${order.total.toLocaleString("fr-FR")} FCFA`,
    timestamp: order.created_at
      ? new Date(order.created_at).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    color: "from-blue-500 to-blue-600",
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

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
          trend={stats.revenueTrend || undefined}
          iconColor="text-green-600 dark:text-green-400"
          iconBgColor="bg-green-100 dark:bg-green-900/30"
        />
        <StatsCard
          title="Commandes"
          value={stats.totalOrders}
          subtitle={`${stats.pendingOrders} en attente`}
          icon={ShoppingCart}
          trend={stats.ordersTrend || undefined}
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
          trend={stats.customersTrend || undefined}
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
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/commandes/${order.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        Commande #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.delivery_address.name} •{" "}
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString(
                              "fr-FR"
                            )
                          : ""}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {order.total.toLocaleString("fr-FR")} FCFA
                        </p>
                      </div>
                      <StatusBadge variant="secondary" pulse={false}>
                        {order.status}
                      </StatusBadge>
                    </div>
                  </div>
                </Link>
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
