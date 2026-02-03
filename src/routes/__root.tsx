import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useCart } from "../hooks/useCart";
import type { MyRouterContext } from "../Router";
import { ReactBistroLogo } from "../shared/ReactBistroLogo";

const navLinkClassName =
  "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors [&.active]:text-blue-600 [&.active]:font-semibold";

function RootLayout() {
  const { totalItems } = useCart();

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <ReactBistroLogo />
              <div className="flex space-x-6">
                <Link to="/" className={navLinkClassName}>
                  Menu
                </Link>
                <Link
                  to="/admin/{-$foodId}"
                  params={{ foodId: undefined }}
                  className={navLinkClassName}
                >
                  Admin
                </Link>
                <Link to="/about" className={navLinkClassName}>
                  About
                </Link>
                <Link to="/cart" className={navLinkClassName}>
                  <div className="relative inline-block">
                    Cart
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: (props) => (
    <div>Oops! Something went wrong: {props.error.message}</div>
  ),
  notFoundComponent: () => <h1>Oops! That page doesn't exist.</h1>,
  component: RootLayout,
});
