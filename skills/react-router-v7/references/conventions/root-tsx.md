# root.tsx

The only required route in Framework Mode. Renders the root `<html>` document and acts as the parent to all other routes.

## Signature / Usage

```tsx
import { Outlet, Scripts, ScrollRestoration, Meta, Links } from "react-router";

// Optional: shared document shell (avoids duplication across App / HydrateFallback / ErrorBoundary)
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Required default export
export default function App() {
  return <Outlet />;
}

// Optional error boundary shown when loader throws or render fails
export function ErrorBoundary() {
  return <h1>Something went wrong</h1>;
}
```

## Required Rendered Components

| Component | Purpose |
|-----------|---------|
| `<Outlet />` | Renders the active child route |
| `<Scripts />` | Injects all JS bundles. Accept `nonce` prop for CSP |
| `<ScrollRestoration />` | Restores scroll position on navigation. Accepts `nonce` |
| `<Meta />` | Renders `meta` exports from all routes (pre-React 19) |
| `<Links />` | Renders `link` exports from all routes (pre-React 19) |

## Supported Route Module Exports

`root.tsx` supports all standard route module exports:

| Export | Description |
|--------|-------------|
| `Layout` | Shared document shell (optional, prevents re-mount) |
| `default` | App component, renders `<Outlet />` |
| `ErrorBoundary` | Error UI when loader/render throws |
| `HydrateFallback` | Loading UI shown before hydration completes |
| `loader` | Server-side data loading |
| `action` | Form submission handler |
| `meta` | Root-level `<meta>` tags |
| `links` | Root-level `<link>` elements |
| `headers` | HTTP response headers |

## Notes

- The `Layout` export prevents FOUC (Flash of Unstyled Content) by keeping the document shell mounted across `App`, `HydrateFallback`, and `ErrorBoundary`.
- Do **not** use `useLoaderData()` inside `Layout` — if the loader threw an error it won't be available. Use `useRouteLoaderData("root")` instead (returns `undefined` on error).
- Keep `Layout` very defensive: if it throws, the entire error boundary is bypassed and React Router falls back to a minimal built-in error UI.
- Pass `nonce={nonce}` to `<Scripts />` and `<ScrollRestoration />` when using nonce-based CSP.

## Related

- [routes.ts](./routes-ts.md)
- [entry.client.tsx](./entry-client-tsx.md)
- [entry.server.tsx](./entry-server-tsx.md)
