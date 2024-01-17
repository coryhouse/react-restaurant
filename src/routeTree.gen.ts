import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

import { Route as rootRoute } from './routes/__root'

const MenuComponentImport = new FileRoute('/menu').createRoute()
const AboutComponentImport = new FileRoute('/about').createRoute()
const IndexComponentImport = new FileRoute('/').createRoute()

const MenuComponentRoute = MenuComponentImport.update({
  path: '/menu',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/menu.component'),
    'component',
  ),
})

const AboutComponentRoute = AboutComponentImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/about.component'),
    'component',
  ),
})

const IndexComponentRoute = IndexComponentImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).update({
  component: lazyRouteComponent(
    () => import('./routes/index.component'),
    'component',
  ),
})
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexComponentImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutComponentImport
      parentRoute: typeof rootRoute
    }
    '/menu': {
      preLoaderRoute: typeof MenuComponentImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexComponentRoute,
  AboutComponentRoute,
  MenuComponentRoute,
])
