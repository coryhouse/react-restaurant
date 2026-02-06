type CardProps = React.ComponentPropsWithoutRef<"section">;

export function Card({ className, ...props }: CardProps) {
  const combinedClassName = className
    ? `${className} rounded shadow border-1 border-gray-200 m-4 p-4 mw-96`
    : "rounded shadow border-1 border-gray-200 m-4 p-4 mw-96";

  return <section className={combinedClassName} {...props} />;
}
