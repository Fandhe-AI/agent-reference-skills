# createBrowserRouter

Create a data router that manages the application path via `history.pushState` and `history.replaceState`. Data Mode only.

## Signature / Usage

```tsx
function createBrowserRouter(
  routes: RouteObject[],
  opts?: DOMRouterOpts,
): DataRouter
```

```tsx
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| routes | `RouteObject[]` | Application routes |
| opts.basename | `string` | Basename path for the application |
| opts.dataStrategy | function | Override the default data strategy of running loaders in parallel (see how-to/data-strategy) |
| opts.future | object | Future flags to enable for the router |
| opts.getContext | `() => RouterContextProvider` | Returns a fresh `RouterContextProvider` on each navigation or fetcher call; passed as `context` to client actions, loaders and middleware |
| opts.hydrationData | object | Hydration data from a server render (subset of `StaticHandlerContext`: `loaderData`, optionally `errors` / `actionData`) |
| opts.instrumentations | array | Instrumentation objects for the router and routes (navigations, fetches, middleware, loaders, actions); also applied to routes added via `route.lazy` or `patchRoutesOnNavigation` |
| opts.patchRoutesOnNavigation | `PatchRoutesOnNavigationFunction` | Lazily define portions of the route tree on navigations ("Fog of War") |
| opts.window | `Window` | Window override; defaults to the global `window` |

Returns an initialized data router to pass to `<RouterProvider>`.

```tsx
const router = createBrowserRouter(routes, {
  async patchRoutesOnNavigation({ patch, path }) {
    if (path === "/a") {
      let route = await getARoute();
      patch("root", [route]);
    }
  },
});
```

## Notes

- Data Routers should not be held in React state. Create the router once outside the React tree and pass it to `<RouterProvider>`.
- `patchRoutesOnNavigation` is called whenever the router cannot match a `path`, and also whenever a matched path contains at least one param (to confirm the best match). It runs during `loading` for `GET` and `submitting` for non-`GET` navigations. Pass `null` as `routeId` to patch root-level routes.
- If an in-progress `patchRoutesOnNavigation` is interrupted by a later navigation, remaining `patch` calls do not update the route tree.
- `hydrationData` partial data: a route `loader` runs during hydration if no hydration data is provided for it (its `HydrateFallback` renders) or if `loader.hydrate` is `true`.
- Data Mode only (not Framework / Declarative Mode).
- Source: https://reactrouter.com/api/data-routers/createBrowserRouter (docs/api/data-routers/createBrowserRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/createBrowserRouter.md)

## Related

- [RouterProvider](./RouterProvider.md)
- [createHashRouter](./createHashRouter.md)
- [createMemoryRouter](./createMemoryRouter.md)
- [HydratedRouter](../routers/HydratedRouter.md)
