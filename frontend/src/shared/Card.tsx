type CardProps = React.ComponentPropsWithoutRef<"section">;

export function Card({ className, ...props }: CardProps) {
  const combinedClassName = className
    ? `${className} bg-gray-100 rounded shadow border-1 border-gray-200 m-4 p-4 mw-96`
    : "bg-gray-100 rounded shadow border-1 border-gray-200 m-4 p-4 mw-96";

  return <section className={combinedClassName} {...props} />;
}
