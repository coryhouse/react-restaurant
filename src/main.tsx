import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const foods = ["pizza", "hamburger", "taco"];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1>Menu</h1>
    <ul>
      {foods.map((food) => (
        <li key={food}>{food}</li>
      ))}
    </ul>
  </React.StrictMode>
);
