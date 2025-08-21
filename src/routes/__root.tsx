import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Menu
        </Link>{" "}
        <Link to="/admin" className="[&.active]:font-bold">
          Admin
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
