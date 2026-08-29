---
source: https://tanstack.com/router/latest/docs/framework/react/guide/ssr
---

# Basic SSR

Share a `createRouter` factory between server and client entries, render on the server with `createRequestHandler`, then hydrate on the client.

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

```tsx
// src/entry-server.tsx
import { createRequestHandler, defaultRenderHandler } from '@tanstack/react-router/ssr/server'
import { createRouter } from './router'

export async function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter })
  return await handler(defaultRenderHandler)
}
```

```tsx
// src/entry-client.tsx
import { hydrateRoot } from 'react-dom/client'
import { RouterClient } from '@tanstack/react-router/ssr/client'
import { createRouter } from './router'

const router = createRouter()
hydrateRoot(document, <RouterClient router={router} />)
```

## Notes

- Do not mix in Next.js/Remix/React Router DOM conventions (`src/pages/`, `getServerSideProps`, `react-router-dom` imports) — this is TanStack Router's own SSR model with `src/routes/` + `createFileRoute`.
- Server history switches automatically to `createMemoryHistory` inside `RouterServer`; the client uses `createBrowserHistory`.
- Resolved `loader` data is automatically dehydrated/hydrated; deferred/streamed data needs the streaming variant (`defaultStreamHandler` + `renderRouterToStream`).
- This SSR layer is experimental and shares its internal implementation with TanStack Start.
