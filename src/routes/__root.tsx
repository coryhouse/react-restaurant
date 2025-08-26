import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { MyRouterContext } from "../main";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: (props) => (
    <div>Oops! Something went wrong: {props.error.message}</div>
  ),
  notFoundComponent: () => (
    <h1>Oops! That page doesn't exist. (root route 404)</h1>
  ),
  component: () => (
    <>
      <nav className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Menu
        </Link>{" "}
        <Link
          to="/admin/{-$foodId}"
          params={{ foodId: undefined }}
          className="[&.active]:font-bold"
        >
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
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
});
