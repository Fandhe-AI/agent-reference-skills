---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point
---

# Server Entry Point

Optional `src/server.ts` file conforming to a universal fetch-handler format (compatible with Cloudflare Workers and other WinterCG runtimes); if omitted, TanStack Start uses its built-in entry, which renders requests and converts uncaught errors into HTTP responses. It is the entry point for all SSR work, server routes, and server function requests.

## Signature / Usage

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request, opts) {
    return handler.fetch(request, opts)
  },
})
```

Custom server handler:

```tsx
// src/server.ts
import {
  createStartHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const customHandler = defineHandlerCallback((ctx) => {
  // add custom logic here
  return defaultStreamHandler(ctx)
})

const startHandler = createStartHandler(customHandler)

export default createServerEntry({
  fetch(request, opts) {
    return startHandler(request, opts)
  },
})
```

## Configuring a Custom Server Entry

Start automatically detects `src/server.ts`; if absent it uses the built-in entry. For a custom entry at another path, set `server.entry` in the bundler plugin (resolved relative to `srcDirectory`, default `src`). Works for Vite and Rsbuild:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: './server-entry.ts',
      },
    }),
    viteReact(),
  ],
})
```

```ts
// rsbuild.config.ts (Rsbuild)
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild'
// ...plugins: [pluginReact(), tanstackStart({ server: { entry: './server-entry.ts' } })]
```

## Error Handling

The built-in entry uses `createServerEntry` to catch errors that escape the Start handler and call `handleStartError(error)` inside the active request context. The handler returned by `createStartHandler(...)` rethrows the original uncaught value. Use your own `try`/`catch` inside the `createServerEntry` callback (for example for Sentry reporting):

```tsx
// src/server.ts
import {
  createStartHandler,
  defaultStreamHandler,
  handleStartError,
} from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const startHandler = createStartHandler(defaultStreamHandler)

export default createServerEntry({
  async fetch(request, opts) {
    try {
      return await startHandler(request, opts)
    } catch (error) {
      // Report the original error here, for example to Sentry.
      return handleStartError(error)
    }
  },
})
```

After reporting, choose how to finish the catch:

- Return `handleStartError(error)` to obtain Start's error response explicitly.
- Rethrow `error` to let `createServerEntry` produce that same error response.
- Return your own `Response` to choose its body, status, and headers.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fetch` | method accepting a `Request` and Start's request options | Required default-export shape; returns `Response \| Promise<Response>`. Use `createServerEntry` to infer the types. Forward `opts` to `handler.fetch(request, opts)` |
| Request context | via `Register['server']['requestContext']` module augmentation | Pass runtime values as `handler.fetch(request, { ...opts, context: {...} })`; available through server middleware, server routes, server functions, and the router. Type registration does not create the values |

## Notes

- Uncaught errors produce a generic JSON error body with status `500` unless a response helper or HTTP-style error property (`error.status`, `error.statusText`, `error.headers`) supplies an error status (`400`-`599`); a success/redirect/bodyless status set before the error is discarded. A thrown `Response` keeps its body and metadata, except for `HEAD` and statuses `204`, `205`, `304`. The generic body does not expose the error message or stack.
- Error conversion preserves error statuses and status text from `setResponseStatus`, response-helper header operations, and cookies from `setCookie` / `appendResponseHeader('set-cookie', ...)`. It never copies `Content-Length`, `Content-Encoding`, `Transfer-Encoding`, `Trailer`, `Connection`, `Keep-Alive`, `Proxy-Connection`, `TE` from error metadata; when `error.cause` is a `Response`, only its status and status text are used.
- Errors that Router handles via route error components do not reach this catch; server function calls and their request middleware use a separate error path; errors in a streamed body after the `Response` was returned cannot change its status or headers.
- A cloned or rewritten `Request` starts a separate request context (own response-helper state). Wrap a raw `createStartHandler` handler with `createServerEntry` when passing it a new request. Custom `Response` objects returned from a catch or callback are returned as-is and do not inherit helper state; helper writes after `await handler.fetch(...)` are not applied to its returned response.
- Behavior change in 1.169: the handler returned by `createStartHandler(...)` now rethrows the original error; `createServerEntry` converts errors to responses (the built-in entry already uses it). In a custom entry, catch inside the `createServerEntry` callback and `return handleStartError(error)` or rethrow.
- Register request-context types by augmenting `@tanstack/react-router`'s `Register` interface with `server.requestContext`.
- Cloudflare Workers deployments can extend `server.ts` for queues, scheduled events, and Durable Objects.

## Related

- [Client Entry Point](./client-entry-point.md)
- [Early Hints](./early-hints.md)
- [CDN Asset URLs](./cdn-asset-urls.md)
