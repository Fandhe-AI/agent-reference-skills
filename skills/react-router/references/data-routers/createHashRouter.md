# createHashRouter

Create a data router that manages the application path via the URL `hash`. Data Mode only.

## Signature / Usage

```tsx
function createHashRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts,
): DataRouter
```

```tsx
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";

const router = createHashRouter(routes);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| routes | `RouteObject[]` | Application routes |
| opts.basename | `string` | Basename path for the application |
| opts.future | object | Future flags to enable for the router |
| opts.getContext | `() => RouterContextProvider` | Returns a fresh `RouterContextProvider` on each navigation or fetcher call; passed as `context` to client actions, loaders and middleware |
| opts.hydrationData | object | Hydration data from a server render (subset of `StaticHandlerContext`) |
| opts.instrumentations | array | Instrumentation objects for the router and routes |
| opts.dataStrategy | function | Override the default data strategy of running loaders in parallel |
| opts.patchRoutesOnNavigation | `PatchRoutesOnNavigationFunction` | Lazily define portions of the route tree on navigations |
| opts.window | `Window` | Window override; defaults to the global `window` |

Returns an initialized data router to pass to `<RouterProvider>`.

## Notes

- Same options and semantics as `createBrowserRouter`; only the URL strategy differs (hash instead of `history.pushState`). See that page for `patchRoutesOnNavigation`, `hydrationData` and `instrumentations` details.
- Do not hold the router in React state; create it once outside the React tree.
- Data Mode only.
- Source: https://reactrouter.com/api/data-routers/createHashRouter (docs/api/data-routers/createHashRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/createHashRouter.md)

## Related

- [createBrowserRouter](./createBrowserRouter.md)
- [RouterProvider](./RouterProvider.md)
