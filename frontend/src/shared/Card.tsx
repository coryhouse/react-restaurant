type CardProps = React.ComponentPropsWithoutRef<"section">;

export function Card({ className, ...props }: CardProps) {
  const combinedClassName = className
    ? `${className} rounded shadow border border-gray-200 m-4 p-4 max-w-96`
    : "rounded shadow border border-gray-200 m-4 p-4 max-w-96";

  return <section className={combinedClassName} {...props} />;
}
