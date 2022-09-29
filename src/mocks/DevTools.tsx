import { useState } from "react";
import App from "../App";
import { useWorker } from "./useWorker";

export type FoodResponse = "Ice cream shop" | "Diner";

export default function DevTools() {
  const [foodResponse, setFoodResponse] = useState<FoodResponse>("Diner");

  const isReady = useWorker({
    foodResponse,
  });

  if (!isReady) return <p>Initializing...</p>;

  return (
    <>
      <App />

      <section className="fixed p-4 border shadow-xl max-h-screen overflow-auto bg-white opacity-90 bottom-0">
        <label className="block">Foods Response</label>
        <select value={foodResponse}>
          <option value="Ice cream shop">Ice cream shop</option>
          <option value="Diner">Diner</option>
        </select>
      </section>
    </>
  );
}
