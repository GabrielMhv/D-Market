"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/firebase/firestore";
import { User } from "@/types";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  Search,
  Mail,
  Phone,
  User as UserIcon,
  Users,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminClientsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erreur chargement clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    clients: users.filter((u) => u.role === "customer").length,
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
            Clients
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} inscrit
            {users.length > 1 ? "s" : ""}
          </p>
        </div>
      </FadeIn>

      {/* Quick Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Users size={24} />
            <span className="text-3xl font-bold">{stats.total}</span>
          </div>
          <p className="text-sm text-blue-100">Total utilisateurs</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Shield size={24} />
            <span className="text-3xl font-bold">{stats.admins}</span>
          </div>
          <p className="text-sm text-purple-100">Administrateurs</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <UserIcon size={24} />
            <span className="text-3xl font-bold">{stats.clients}</span>
          </div>
          <p className="text-sm text-green-100">Clients</p>
        </motion.div>
      </StaggerContainer>

      {/* Search */}
      <FadeIn delay={0.2}>
        <Card>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
        </Card>
      </FadeIn>

      {/* Clients Table */}
      <FadeIn delay={0.3}>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Client
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Email
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Téléphone
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Rôle
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Inscrit le
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucun client trouvé
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Mail size={14} />
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {user.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            {user.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge
                          variant={
                            user.role === "admin" ? "primary" : "secondary"
                          }
                        >
                          {user.role === "admin" ? "Admin" : "Client"}
                        </StatusBadge>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {user.created_at?.toLocaleDateString("fr-FR")}
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
