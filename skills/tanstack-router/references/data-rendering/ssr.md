---
source: https://tanstack.com/router/latest/docs/framework/react/guide/ssr
---

# SSR

Server-side rendering utilities for rendering the router on the server and hydrating on the client, in non-streaming or streaming flavors.

## Signature / Usage

Shared router factory:

```tsx
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanstackRouter({ routeTree })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

Non-streaming server entry:

```tsx
// src/entry-server.tsx
import { createRequestHandler, defaultRenderHandler } from '@tanstack/react-router/ssr/server'
import { createRouter } from './router'

export async function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter })
  return await handler(defaultRenderHandler)
}
```

Streaming server entry:

```tsx
import { createRequestHandler, defaultStreamHandler } from '@tanstack/react-router/ssr/server'
import { createRouter } from './router'

export async function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter })
  return await handler(defaultStreamHandler)
}
```

Client entry:

```tsx
// src/entry-client.tsx
import { hydrateRoot } from 'react-dom/client'
import { RouterClient } from '@tanstack/react-router/ssr/client'
import { createRouter } from './router'

const router = createRouter()
hydrateRoot(document, <RouterClient router={router} />)
```

Custom render with `RouterServer` (manual `Wrap`/providers):

```tsx
import { createRequestHandler, renderRouterToString, RouterServer } from '@tanstack/react-router/ssr/server'
import { createRouter } from './router'

export function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter })
  return handler(({ request, responseHeaders, router }) =>
    renderRouterToString({ request, responseHeaders, router, children: <RouterServer router={router} /> }),
  )
}
```

Use `renderRouterToStream` in place of `renderRouterToString` for manual streaming.

## Options / Props

| Name | Description |
|------|-------------|
| `createRequestHandler({ request, createRouter })` | Builds a handler from a web-standard `Request`; returns a web-standard `Response` promise |
| `defaultRenderHandler` | Non-streaming render + automatic dehydration/hydration + `RouterServer` |
| `defaultStreamHandler` | Streaming equivalent of `defaultRenderHandler` |
| `renderRouterToString` / `renderRouterToStream` | Manual render allowing custom `Wrap`/providers via `RouterServer` |
| `<RouterServer router>` | Implements the router's `Wrap` option server-side |
| `<RouterClient router>` | Renders the app client-side; implements `Wrap` automatically |

## Notes

- **TanStack Router is not Next.js, Remix, or React Router DOM** — do not use `src/pages/`, `app/layout.tsx`, `getServerSideProps`/`getStaticProps`, Remix-style `loader`/`action` exports, or imports from `react-router-dom`/`next/`. Use `src/routes/` + `createFileRoute`, `Link`/`useNavigate`/`redirect` from `@tanstack/react-router`, and `createServerFn` from `@tanstack/<framework>-start` for Start. Wrong-framework code typically fails to build or produces conflicting `/` routes.
- Server history is automatically switched to `createMemoryHistory` (vs. `createBrowserHistory` on the client) inside `RouterServer`.
- Resolved loader data is automatically dehydrated/hydrated; deferred/streamed data additionally requires the Streaming SSR setup below.
- Built-in serialization supports `undefined`, `Date`, `Error`, `FormData`; `Map`/`Set`/`BigInt` need a custom serializer.
- Experimental: internal implementation is shared with TanStack Start and may change until Start reaches stable.
- If using an Express-style server with its own Request/Response objects, convert to/from the web-standard `Request`/`Response` expected by `createRequestHandler`.

## Related

- [Data Loading](./data-loading.md)
- [Deferred Data Loading](./deferred-data-loading.md)
- [Document Head Management](./document-head-management.md)
