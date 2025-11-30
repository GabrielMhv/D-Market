"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        glass
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-white/20 shadow-xl"
          : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm",
        hover &&
          "hover:shadow-xl hover:-translate-y-1 hover:border-primary-500/20",
        "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
