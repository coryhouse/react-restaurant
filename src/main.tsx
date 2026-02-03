import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { CartContextProvider } from "./CartContext";
import { queryClient } from "./queryClient";
import { AppRouterProvider } from "./Router";
import { UserContextProvider } from "./UserContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Oops!</div>}>
      <Toaster richColors position="top-right" />
      <UserContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <AppRouterProvider />
          </QueryClientProvider>
        </CartContextProvider>
      </UserContextProvider>
    </ErrorBoundary>
  </StrictMode>,
);
