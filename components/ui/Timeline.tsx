"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: ReactNode;
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="relative flex gap-4 group"
        >
          {/* Timeline Line */}
          {index !== items.length - 1 && (
            <div className="absolute left-[19px] top-10 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700" />
          )}

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={cn(
              "relative z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0",
              "bg-gradient-to-br shadow-lg",
              item.color || "from-primary-500 to-primary-600"
            )}
          >
            {item.icon || <div className="w-2 h-2 bg-white rounded-full" />}
          </motion.div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-4 border border-gray-100 dark:border-gray-800 group-hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
