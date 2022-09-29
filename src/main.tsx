import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";

// Lazy load so this isn't in the prod bundle
const DevTools = React.lazy(() => import("./mocks/DevTools"));

const useDevTools = import.meta.env.VITE_ENABLE_DEVTOOLS === "Y";

// Warning: StrictMode will render twice in dev only. This can catch subtle bugs.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Oops! Sorry, an error occurred.</h1>}>
      <BrowserRouter>
        <Toaster />
        {useDevTools ? <DevTools /> : <App />}
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
