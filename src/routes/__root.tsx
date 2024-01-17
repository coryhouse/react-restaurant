import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = new RootRoute({
  component: () => (
    <>
      <nav className="p-2 flex gap-2">
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
