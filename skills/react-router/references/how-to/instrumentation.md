# Instrumentation

Add observability (logging, error reporting, performance tracing) by wrapping request handlers, router operations, route middlewares, and route handlers without modifying runtime application behavior.

**Status (v8):** Stable, exported as `instrumentations` (in v7 this was the experimental `unstable_instrumentations`; the `unstable_` prefix has been dropped in v8).

Instrumentation is **read-only** — you can observe what's happening but cannot modify arguments passed to, or data returned from, route handlers.

## Signature / Usage

### Quick Start (Framework mode)

```tsx
// app/entry.server.tsx
export const instrumentations = [
  {
    // Instrument the server handler
    handler(handler) {
      handler.instrument({
        async request(handleRequest, { request }) {
          let url = `${request.method} ${request.url}`;
          console.log(`Request start: ${url}`);
          let result = await handleRequest();
          let pattern = result.meta?.pattern ?? "unknown";
          console.log(`Request end: ${url} (${result.statusCode} ${pattern})`);
        },
      });
    },
    // Instrument individual routes
    route(route) {
      if (route.id === "root") return;
      route.instrument({
        async loader(callLoader, { request }) {
          let url = `${request.method} ${request.url}`;
          console.log(`Loader start: ${url} - ${route.id}`);
          await callLoader();
          console.log(`Loader end: ${url} - ${route.id}`);
        },
        // Also available: async action() {...}, async middleware() {...}, async lazy() {...}
      });
    },
  },
];

export default function handleRequest(/* ... */) {
  // Your existing handleRequest implementation
}
```

```tsx
// app/entry.client.tsx
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

const instrumentations = [
  {
    router(router) {
      router.instrument({
        async navigate(callNavigate, { currentUrl, to }) {
          let nav = `${currentUrl} -> ${to}`;
          console.log(`Navigation start: ${nav}`);
          let result = await callNavigate();
          console.log(`Navigation end: ${nav} (${result.meta?.pattern})`);
        },
        async fetch(callFetch, { href, currentUrl, fetcherKey }) {
          let fetch = `${fetcherKey} -> ${href}`;
          console.log(`Fetcher start: ${fetch}`);
          let result = await callFetch();
          console.log(`Fetcher end: ${fetch} (${result.meta?.pattern})`);
        },
      });
    },
    route(route) {
      if (route.id === "root") return;
      route.instrument({
        async loader(callLoader, { request }) {
          console.log(`Loader start: ${route.id}`);
          await callLoader();
          console.log(`Loader end: ${route.id}`);
        },
      });
    },
  },
];

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter instrumentations={instrumentations} />
    </StrictMode>,
  );
});
```

### Quick Start (Data mode)

```tsx
import { createBrowserRouter, RouterProvider } from "react-router";

const instrumentations = [
  {
    router(router) {
      router.instrument({
        async navigate(callNavigate, { currentUrl, to }) {
          let result = await callNavigate();
          console.log(`Navigation end: (${result.meta?.pattern})`);
        },
      });
    },
  },
];

const router = createBrowserRouter(routes, { instrumentations });

function App() {
  return <RouterProvider router={router} />;
}
```

### Instrumentation Levels

Each instrumentation function receives a second "info" argument with contextual metadata:

- **Handler level (server, Framework mode):** `handler.instrument({ request(handleRequest, { request, context }) {...} })` wraps ALL requests to your app
- **Router level (client):** `router.instrument({ navigate(...) {...}, fetch(...) {...} })` wraps client-side navigations and fetcher calls
- **Route level (server + client):** `route.instrument({ loader, action, middleware, lazy })` wraps individual route handlers

### Result Metadata

- Route-level instrumentations (`loader`/`action`/`middleware`) don't include `meta`
- Client navigation/fetcher and server request-handler instrumentations return a `meta` field with `url`, `pattern` (e.g. `/projects/:id`), and `params`; `meta` may be `undefined` for calls without route metadata (server manifest requests, numeric POP navigations)
- For client navigations that redirect, `meta` describes the original navigation target, not the final redirected location
- Server request-handler instrumentations also return `statusCode`

### Error Handling

If a handler (loader/action/request handler/navigation) throws, the error does not bubble out of `callHandler`; instead it returns `{ status: "success" | "error", error?: Error }` so your instrumentation runs to completion without try/catch:

```tsx
async loader(callLoader) {
  let { status, error } = await callLoader();
  if (status === "error") {
    // error is defined
  }
}
```

If your instrumentation function itself throws, React Router swallows the error so it never bubbles out and affects other instrumentations or app behavior.

## Options / Props

| Hook | Level | Signature |
|------|-------|-----------|
| `handler.instrument({ request })` | Server handler | `(handleRequest, { request, context }) => Promise<Result>` |
| `router.instrument({ navigate })` | Client router | `(callNavigate, { to, currentUrl }) => Promise<Result>` |
| `router.instrument({ fetch })` | Client router | `(callFetch, { href, currentUrl, fetcherKey }) => Promise<Result>` |
| `route.instrument({ loader })` | Route | `(callLoader, { params, request, context, pattern }) => Promise<Result>` |
| `route.instrument({ action })` | Route | `(callAction, { params, request, context, pattern }) => Promise<Result>` |
| `route.instrument({ middleware })` | Route | `(callMiddleware, { params, request, context, pattern }) => Promise<Result>` |
| `route.instrument({ lazy })` | Route | `(callLazy) => Promise<Result>` |

## Notes

- Instrumentation is read-only: cannot modify arguments or return values, so it's safe to add to production apps
- `instrumentations` is an array — multiple instrumentations compose, each wrapping the previous one in a nested chain
- Enable conditionally (e.g. by `NODE_ENV` or per-route) to avoid overhead in production
- Runtime performance characteristics change when instrumentation is added — test and/or conditionally instrument to avoid negative UX impact

## Related

- [./middleware.md](./middleware.md)
- [./error-reporting.md](./error-reporting.md)
