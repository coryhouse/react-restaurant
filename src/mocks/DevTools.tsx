import { useState } from "react";
import { Food } from "../food";

type FoodResponse = "Ice cream shop" | "Diner";

export default function DevTools() {
  const [foodsResponse, setFoodsResponse] = useState<FoodResponse>("Diner");

  return (
    <div>
      <label>Foods Response</label>
      <select value={foodsResponse}>
        <option value="Ice cream shop">Ice cream shop</option>
        <option value="Diner">Diner</option>
      </select>
    </div>
  );
}
