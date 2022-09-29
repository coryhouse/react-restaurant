import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";

// TODO: Require this so it's lazy loaded.
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

// Warning: StrictMode will render twice in dev only. This can catch subtle bugs.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Oops! Sorry, an error occurred.</h1>}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
