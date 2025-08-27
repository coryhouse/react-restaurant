type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <section className="bg-gray-100 rounded shadow border-1 border-gray-200 m-4 p-4 mw-96">
      {props.children}
    </section>
  );
}
