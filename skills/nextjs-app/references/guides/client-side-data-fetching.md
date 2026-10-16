# Client-side data fetching

Fetch data in Client Components with a data-fetching library (SWR, TanStack Query, Apollo Client), optionally provide initial data from a Server Component, and coordinate server and client caches.

## Signature / Usage

```tsx
// One-time read of server data without a library: pass a Promise, unwrap with use()
// Library fallback keyed to a Server Component: <SWRConfig fallback> (SWR) / <HydrationBoundary> (TanStack Query)
```

```ts
// Invalidate cached server data after a mutation
updateTag(tag)
revalidateTag(tag, 'max')
revalidateTag(tag, { expire: 0 })
```

## Options / Props

Client fetching patterns:

| Pattern | SWR | TanStack Query | When data becomes available |
|---------|-----|----------------|-----------------------------|
| Inline loading states | `useSWR` | `useQuery` | Browser request after hydration |
| Suspense loading states | `useSWR` with `suspense: true` | `useSuspenseQuery` | Browser request after hydration |
| Provided by the server | `<SWRConfig fallback>` | `<HydrationBoundary>` | Initial render or streamed from server |

Cache layers (with Cache Components):

| Layer | What it stores | Freshness control |
|-------|----------------|-------------------|
| Next.js server cache | Cached data and Server Component output | `cacheLife` `revalidate` and `expire` |
| Next.js client cache | RSC payloads for visited and prefetched routes | `cacheLife` `stale` |
| Client data-fetching library | Browser data under an SWR key or TanStack query key | The library's revalidation options and mutations |

Invalidation after a mutation:

| Method | Use when | Next server read |
|--------|----------|------------------|
| `updateTag(tag)` | A Server Action must make its update visible immediately | Waits for fresh data |
| `revalidateTag(tag, 'max')` | The update is passive or stale data is acceptable | Serves stale data while revalidating |
| `revalidateTag(tag, { expire: 0 })` | A webhook or external system requires immediate expiration | Waits for fresh data |

## Notes

- Source: https://nextjs.org/docs/app/guides/client-side-data-fetching (v16.4.2)

- If a Client Component only needs to read server data once, pass it a Promise and unwrap it with `use()`; no library is needed. Use a library when Client Components need a shared browser cache (focus revalidation, polling, request deduplication, optimistic updates).
- Providing initial data and caching it on the server are independent choices. The cache layers have independent freshness policies and need not match durations, but cache identities and mutation invalidation must stay coordinated.
- Server Components provide initial data scoped to the owning segment; the library stores the browser value under a shared cache identity; mutations update the browser cache and invalidate cached server data. An optimistic update should restore the previous value if the write fails. An uncached server read has no tag to invalidate.
- Live demo: `next-spa-patterns` (source `github.com/nextjs/next-spa-patterns`).

## Related

- [Client-side data fetching with SWR](./client-side-data-fetching-swr.md)
- [Client-side data fetching with TanStack Query](./client-side-data-fetching-tanstack-query.md)
- [Single-page applications](./single-page-applications.md)
- [Interactive Apps](./interactive-apps.md)
- [Prefetching](./prefetching.md)
