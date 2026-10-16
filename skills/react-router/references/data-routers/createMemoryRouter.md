# createMemoryRouter

Create a data router that manages the application path using an in-memory history stack. Useful for non-browser environments without a DOM API. Data Mode only.

## Signature / Usage

```tsx
function createMemoryRouter(
  routes: RouteObject[],
  opts?: MemoryRouterOpts,
): DataRouter
```

```tsx
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router";

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});
// <RouterProvider router={router} />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| routes | `RouteObject[]` | Application routes |
| opts.basename | `string` | Basename path for the application |
| opts.dataStrategy | function | Override the default data strategy of running loaders in parallel |
| opts.future | object | Future flags to enable for the router |
| opts.getContext | `() => RouterContextProvider` | Returns a fresh `RouterContextProvider` on each navigation or fetcher call |
| opts.hydrationData | object | Hydration data to initialize the router with if data loading was already performed on the server |
| opts.initialEntries | `string[]` | Initial entries in the in-memory history stack |
| opts.initialIndex | `number` | Index of `initialEntries` the application should initialize to |
| opts.instrumentations | array | Instrumentation objects for the router and routes |
| opts.patchRoutesOnNavigation | `PatchRoutesOnNavigationFunction` | Lazily define portions of the route tree on navigations |

Returns an initialized `DataRouter` to pass to `<RouterProvider>`.

## Notes

- Do not hold the router in React state; create it once outside the React tree.
- The `RouterProvider` import in the snippet is from `react-router` (non-DOM environment); the `react-router/dom` variant wires up `react-dom` `flushSync`.
- Data Mode only.
- Source: https://reactrouter.com/api/data-routers/createMemoryRouter (docs/api/data-routers/createMemoryRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/createMemoryRouter.md)

## Related

- [createBrowserRouter](./createBrowserRouter.md)
- [RouterProvider](./RouterProvider.md)
