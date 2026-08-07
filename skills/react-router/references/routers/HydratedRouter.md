# HydratedRouter

Framework Mode client-side router that hydrates the app from a `ServerRouter`-rendered HTML. Used in `entry.client.tsx` to initialize the router after SSR.

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
| `getContext` | Context factory function | Passed through to `createBrowserRouter`. Called to create a fresh `context` instance on each navigation/fetch, made available to `clientAction`/`clientLoader`. |
| `onError` | `(error: Error, info: ErrorInfo) => void` | Called for any middleware, loader, action, or render error. `ErrorInfo` fields: `location`, `params`, `pattern`, and `errorInfo` (from React's `componentDidCatch`, render errors only). Useful for logging outside of `ErrorBoundary`. |

## Notes

- Available in Framework Mode only (not Data Mode, not Declarative Mode). As of v8.3.0, `getContext` is the current (non-prefixed) prop name — no `unstable_` prefix.
- Must be called with `hydrateRoot` (not `createRoot`) — it hydrates existing server-rendered HTML.
- `onError` runs once per error and is not subject to re-rendering, making it more reliable than `ErrorBoundary` for external reporting.

## Related

- [ServerRouter](./ServerRouter.md)
- [entry.client.tsx](../conventions/entry-client-tsx.md)
