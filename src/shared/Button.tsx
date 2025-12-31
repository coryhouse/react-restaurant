import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "danger" | "danger-ghost" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  "danger-ghost": "text-red-600 hover:text-red-700 hover:bg-red-50",
  ghost: "border border-gray-300 hover:bg-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-medium rounded-md transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
