const foods = ["pizza", "hamburger", "taco"];

export function Menu() {
  return (
    <>
      <h1>Menu</h1>
      <ul>
        {foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </>
  );
}
