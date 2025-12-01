"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400",
  secondary: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  success:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function StatusBadge({
  children,
  variant = "primary",
  pulse = false,
  className,
}: StatusBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
        "transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-1.5 h-1.5 rounded-full bg-current"
        />
      )}
      {children}
    </motion.span>
  );
}
