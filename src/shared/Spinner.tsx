interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  center?: boolean;
}

export default function Spinner({
  size = "lg",
  className = "",
  center = true,
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (center) {
    return (
      <div className="flex items-center justify-center min-h-32">{spinner}</div>
    );
  }

  return spinner;
}
