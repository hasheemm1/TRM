import { clsx } from "clsx";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md";
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  pulse = false,
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-cyan-100 text-cyan-700",
    purple: "bg-purple-100 text-purple-700",
  };

  const pulseVariants = {
    default: "",
    success: "animate-pulse-success",
    warning: "animate-pulse-warning",
    danger: "animate-pulse-danger",
    info: "",
    purple: "",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        pulse && pulseVariants[variant]
      )}
    >
      {pulse && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            variant === "success" && "bg-emerald-500",
            variant === "warning" && "bg-amber-500",
            variant === "danger" && "bg-red-500"
          )}
        />
      )}
      {children}
    </span>
  );
}
