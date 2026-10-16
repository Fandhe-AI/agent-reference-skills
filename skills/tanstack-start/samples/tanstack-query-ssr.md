---
source: https://tanstack.com/start/latest/docs/framework/react/guide/tanstack-query
---

# TanStack Query SSR (request-isolated QueryClient)

Create a QueryClient per router with `setupRouterSsrQueryIntegration`, share `queryOptions` between the route loader and component, and invalidate after a server-function mutation.

```tsx
// src/router.tsx
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 30_000 } },
  })
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({ router, queryClient })
  return router
}
```

```tsx
// src/routes/__root.tsx (context type only)
import { createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  // head, component, ... as in your root route
})
```

```ts
// src/utils/preferences.ts
import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
  setResponseHeader,
} from '@tanstack/react-start/server'

export const getReaderName = createServerFn({ method: 'GET' }).handler(() => {
  setResponseHeader('Cache-Control', 'private, no-store')
  return getCookie('reader-name') || 'Guest'
})

export const saveReaderName = createServerFn({ method: 'POST' })
  .validator((name: string) => {
    if (typeof name !== 'string' || !name.trim() || name.length > 40) {
      throw new Error('Enter a name between 1 and 40 characters')
    }
    return name.trim()
  })
  .handler(({ data }) => {
    setResponseHeader('Cache-Control', 'private, no-store')
    setCookie('reader-name', data, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
  })

export const readerNameOptions = queryOptions({
  queryKey: ['reader-name'],
  queryFn: () => getReaderName(),
})
```

```tsx
// src/routes/preferences.tsx
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute, useHydrated } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { readerNameOptions, saveReaderName } from '../utils/preferences'

export const Route = createFileRoute('/preferences')({
  loader: async ({ context }) => {
    await context.queryClient.query(readerNameOptions)
  },
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  head: () => ({ meta: [{ title: 'Reader preferences' }] }),
  component: Preferences,
})

function Preferences() {
  const { data: name } = useSuspenseQuery(readerNameOptions)
  const queryClient = useQueryClient()
  const save = useServerFn(saveReaderName)
  const hydrated = useHydrated()
  const mutation = useMutation({
    mutationFn: (name: string) => save({ data: name }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: readerNameOptions.queryKey }),
  })

  return (
    <main className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Reader preferences</h1>
      <p data-testid="reader-name">Hello, {name}</p>
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault()
          const value = new FormData(event.currentTarget).get('name')
          if (typeof value === 'string') {
            mutation.mutate(value)
          }
        }}
      >
        <fieldset
          disabled={!hydrated || mutation.isPending}
          className="flex gap-3"
        >
          <label>
            Display name{' '}
            <input
              name="name"
              defaultValue={name}
              maxLength={40}
              required
              className="rounded border p-1"
            />
          </label>
          <button type="submit" className="rounded border px-3">
            {mutation.isPending ? 'Saving...' : 'Save name'}
          </button>
        </fieldset>
        {mutation.isError ? (
          <p role="alert">Could not save your name. Try again.</p>
        ) : null}
      </form>
    </main>
  )
}
```

## Notes

- Install `@tanstack/react-query` and `@tanstack/react-router-ssr-query`; the example uses Query 5.102 or newer (`queryClient.query`). Query APIs themselves (`queryOptions`, `useSuspenseQuery`, `invalidateQueries`, `staleTime`) belong to the tanstack-query skill; this sample covers only the Start SSR wiring.
- Create the QueryClient inside `getRouter`, not at module scope: Start creates a router per SSR request, and a process-wide client could serve one reader's cached data in another reader's HTML. Do not add a second QueryClient or dehydrate manually; the integration provides the Query provider and handles dehydration, hydration, and streaming.
- Privileged reads go in a server function because a normal route loader can also run in the browser during navigation. Use the same `queryOptions` object in the loader and the component so hydration does not repeat the read. `queryClient.invalidateQueries` refreshes Query data; `router.invalidate()` reloads Router-owned loader data and route context.
- The `reader-name` cookie is a display preference, not an authentication mechanism. Authorize every private read and mutation on the server, and keep `Cache-Control: private, no-store` on personalized responses. The example's `src/start.ts` enables Start's CSRF middleware for server-function requests (not reproduced here).
