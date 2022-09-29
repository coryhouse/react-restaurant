// src/mocks/handlers.js
import { rest } from "msw";
import { mockFoods } from "./mockFoods";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("http://localhost:3001/foods", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockFoods));
  }),
];
