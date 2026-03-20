# HydratedRouter

Framework Mode client-side router that hydrates the app from a `ServerRouter`-rendered HTML. Used in `entry.client.tsx` to initialize the router after SSR.

> Available in: Framework Mode only (not Data Mode, not Declarative Mode)

## Signature / Usage

```tsx
import { HydratedRouter } from "react-router/dom";
import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";

hydrateRoot(
  document,
  <StrictMode>
    <HydratedRouter />
  </StrictMode>
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onError` | `(error: unknown, info: ErrorInfo) => void` | Called for any middleware, loader, action, or render error. Useful for logging outside of `ErrorBoundary`. |
| `getContext` | `() => AppLoadContext` | Passed to `createBrowserRouter`; creates a fresh context on each navigation/fetch, made available to `clientAction` and `clientLoader`. |

### `onError` detail

The `info` argument contains: `location`, `params`, `unstable_pattern`, and `errorInfo` (render errors only).

```tsx
<HydratedRouter
  onError={(error, info) => {
    const { location, params, unstable_pattern, errorInfo } = info;
    reportToErrorService(error, location, errorInfo);
  }}
/>
```

## Notes

- Must be called with `hydrateRoot` (not `createRoot`) — it hydrates existing server-rendered HTML.
- `onError` runs once per error and is not subject to re-rendering, making it more reliable than `ErrorBoundary` for external reporting.

## Related

- [ServerRouter](./ServerRouter.md)
- [entry.client.tsx](../conventions/entry-client-tsx.md)
