import { Link, type LinkProps } from "@tanstack/react-router";

type LinkButtonVariant = "primary" | "danger" | "text";
type LinkButtonSize = "sm" | "md" | "lg";

type LinkButtonProps = Omit<LinkProps, "className"> & {
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  className?: string;
};

const variantClasses: Record<LinkButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "text-red-600 hover:text-red-700 hover:bg-red-50",
  text: "text-blue-600 hover:text-blue-800",
};

const sizeClasses: Record<LinkButtonSize, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

export function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: LinkButtonProps) {
  const isTextVariant = variant === "text";
  const baseClasses = isTextVariant
    ? ""
    : "inline-block font-medium rounded-md";

  return (
    <Link
      className={`${baseClasses} transition-colors ${variantClasses[variant]} ${isTextVariant ? "" : sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
