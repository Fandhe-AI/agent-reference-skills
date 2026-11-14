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
| `unstable_fetch` | `unstable_RouterFetch` | Experimental (8.5.0). Custom `fetch` implementation used for JavaScript-issued manifest and data requests. Defaults to `window.fetch`. Read once when the singleton router is created; later changes have no effect. See [Custom Fetch](../how-to/custom-fetch.md). |
| `onError` | `(error: Error, info: ErrorInfo) => void` | Called for any middleware, loader, action, or render error. `ErrorInfo` fields: `location`, `params`, `pattern`, and `errorInfo` (from React's `componentDidCatch`, render errors only). Useful for logging outside of `ErrorBoundary`. |

## Notes

- Available in Framework Mode only (not Data Mode, not Declarative Mode). As of v8.4.0, `getContext` is the current (non-prefixed) prop name — no `unstable_` prefix.
- Must be called with `hydrateRoot` (not `createRoot`) — it hydrates existing server-rendered HTML.
- `onError` runs once per error and is not subject to re-rendering, making it more reliable than `ErrorBoundary` for external reporting.
- `unstable_fetch` is experimental and subject to breaking changes. To use changing values such as auth tokens, read current application state inside the function rather than capturing values from a component render
- Browser-managed data prefetches from `Link`, `NavLink`, or `PrefetchPageLinks` use native `<link rel="prefetch">` elements and do not call `unstable_fetch`. If your data requests require custom headers or other request transformations, use `prefetch="none"` on links and avoid rendering `PrefetchPageLinks`
- Source: https://reactrouter.com/api/framework-routers/HydratedRouter (docs/api/framework-routers/HydratedRouter.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/framework-routers/HydratedRouter.md)

## Related

- [ServerRouter](./ServerRouter.md)
- [entry.client.tsx](../conventions/entry-client-tsx.md)
