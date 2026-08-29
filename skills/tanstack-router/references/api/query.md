---
source: https://tanstack.com/router/latest/docs/framework/react/integrations/query
---

# TanStack Query Integration

Automates SSR dehydration/hydration and streaming between TanStack Router and TanStack Query, removing the need for manual external data-loading configuration.

## Signature / Usage

```tsx
const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: { queryClient },
})

setupRouterSsrQueryIntegration({ router, queryClient })

// In a route loader
export const Route = createFileRoute('/posts')({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
})
```

## Notes

- Create a fresh `QueryClient` per request in SSR and expose it via router `context`.
- `ensureQueryData()` in a loader ensures data is cached before render; `useSuspenseQuery()` executes on the server and streams results; `useQuery()` only runs on the client after hydration.
- If a loader promise is neither awaited nor returned, the query starts on the server and streams to the client as it resolves.
- `QueryClientProvider` wrapping happens automatically by default (disable via `wrapQueryClient: false`).
- Redirects thrown from queries/mutations are handled by default.
- Compatible with TanStack Start (which uses Router internally).

## Related

- [createRouter](./create-router.md)
- [RouterOptions](./router-options.md)
