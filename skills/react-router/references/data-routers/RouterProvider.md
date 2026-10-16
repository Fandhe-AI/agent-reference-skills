# RouterProvider

Render the UI for the given `DataRouter`. Typically placed at the top of an app's element tree. Data Mode only.

## Signature / Usage

```tsx
function RouterProvider({
  router,
  flushSync: reactDomFlushSyncImpl,
  onError,
  useTransitions,
}: RouterProviderProps): React.ReactElement
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
| router | `DataRouter` | The router instance used for navigation and data fetching. Must be a single instance created outside the React tree |
| flushSync | `ReactDOM.flushSync` | `flushSync` implementation for flushing updates. Handled by the `react-router/dom` export; ignore in non-DOM environments |
| onError | `(error, info) => void` | Called for any middleware, loader, action, or render error. `info` has `location`, `params`, `pattern`, `errorInfo` (render errors only, from `componentDidCatch`) |
| useTransitions | `boolean` | Controls whether router state updates are wrapped in `React.startTransition` |

`useTransitions` values:

- `undefined`: all state updates are wrapped in `React.startTransition` (can misbehave if you wrap your own navigations/fetchers in `startTransition`)
- `true`: `Link` and `Form` navigations and router state changes are wrapped in `React.startTransition` and also sent through `React.useOptimistic` to surface mid-navigation state
- `false`: no `React.startTransition` or `React.useOptimistic` is used

```tsx
<RouterProvider onError={(error, info) => {
  let { location, params, pattern, errorInfo } = info;
  console.error(error, location, errorInfo);
  reportToErrorService(error, location, errorInfo);
}} />
```

## Notes

- Exported from both `react-router` and `react-router/dom`; the latter wires up `react-dom`'s `flushSync`. Use the `react-router/dom` version unless running in a non-DOM environment.
- Avoid creating new routers during React renders/re-renders.
- `onError` is not subject to re-rendering and runs once per error, so it suits logging/reporting better than `ErrorBoundary`.

## Related

- [createBrowserRouter](./createBrowserRouter.md)
- [Link](../components/Link.md)
- [Form](../components/Form.md)
- [HydratedRouter](../routers/HydratedRouter.md)
