"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  User,
} from "lucide-react";
import { logout } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    badge: null,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Produits",
    icon: Package,
    href: "/admin/produits",
    badge: null,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Commandes",
    icon: ShoppingCart,
    href: "/admin/commandes",
    badge: "3",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Clients",
    icon: Users,
    href: "/admin/clients",
    badge: null,
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/admin/settings",
    badge: null,
    color: "from-gray-500 to-gray-600",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  return (
    <aside className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 shadow-xl">
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Gestion E-Shop
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-3">
          Navigation
        </p>
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredItem(item.href)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r " +
                        item.color +
                        " text-white shadow-lg shadow-primary-500/30"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon with Animation */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    rotate: hoveredItem === item.href ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="relative z-10"
                >
                  <Icon size={20} />
                </motion.div>

                {/* Title */}
                <span className="relative z-10 flex-1">{item.title}</span>

                {/* Badge */}
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
                  >
                    {item.badge}
                  </motion.span>
                )}

                {/* Hover Arrow */}
                <AnimatePresence>
                  {hoveredItem === item.href && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="relative z-10"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/50">
        <div className="flex items-center gap-3 px-3 py-2 mb-3 rounded-xl bg-white/50 dark:bg-gray-800/50">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              Administrateur
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@eshop.bj
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span>Déconnexion</span>
        </motion.button>
      </div>
    </aside>
  );
}
