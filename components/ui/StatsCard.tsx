"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = "text-primary-600 dark:text-primary-400",
  iconBgColor = "bg-primary-100 dark:bg-primary-900/30",
  className,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg",
        "p-6 shadow-sm hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-800/50 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {value}
            </motion.p>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn("p-3 rounded-xl", iconBgColor)}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </motion.div>
        </div>

        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
