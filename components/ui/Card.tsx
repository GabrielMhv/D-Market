"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  hover = false,
  glass = false,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "rounded-2xl p-6";
  const glassStyles = glass ? "glass" : "bg-white dark:bg-gray-800 shadow-lg";
  const hoverStyles = hover ? "card-hover cursor-pointer" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={props.onClick}
    >
      {children}
    </motion.div>
  );
}
