type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <section className="bg-sky-200 rounded shadow border-1 border-gray-500 m-2 p-2 mw-96">
      {props.children}
    </section>
  );
}
