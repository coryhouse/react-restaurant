import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { UserContextProvider } from "./UserContext";
import { CartContextProvider } from "./CartContext";
import { AppRouterProvider } from "./Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

createRoot(document.getElementById("root")!).render(
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
  </StrictMode>
);
