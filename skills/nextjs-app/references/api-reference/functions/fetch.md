# fetch (extended)

Next.js extends the Web `fetch()` API so each server-side request can configure persistent caching and revalidation semantics.

## Signature / Usage

```tsx
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `cache` | `'auto no cache' \| 'no-store' \| 'force-cache'` | `'auto no cache'` | Interaction with Next.js server-side cache. `no-store` always fetches fresh; `force-cache` reuses a fresh cache match or refetches and updates the cache. |
| `next.revalidate` | `false \| 0 \| number` | — | Cache lifetime in seconds. `false` caches indefinitely, `0` disables caching, a number sets max cache lifetime. |
| `next.tags` | `string[]` | — | Cache tags for on-demand revalidation via `revalidateTag` (max 128 tags, 256 chars each). |

## Notes

- Any native `fetch()` options are supported since this is an extension of the Web API.
- `GET` requests with the same URL/options are automatically memoized during a single server render pass (across Server Components, layouts, pages, `generateStaticParams`, `generateViewport`); opt out by passing an `AbortController` signal.
- Memoization does not apply inside Route Handlers.
- Setting `{ revalidate: 3600, cache: 'no-store' }` (conflicting options) is not allowed — both are ignored, with a dev warning.
- If a `fetch()`'s `revalidate` is lower than a route's default, the whole route's revalidation interval decreases; if two fetches with the same URL have different `revalidate` values in the same route, the lower one wins.
- In local development, the HMR cache applies to all fetches (including `no-store`), so uncached requests may not show fresh data between HMR refreshes — cleared on navigation/full reload.
- If a request has `cache-control: no-cache` header (dev tools disabled cache / hard refresh), `cache`, `next.revalidate`, and `next.tags` options are ignored.
- Introduced in `v13.0.0`.

## Related

- [revalidateTag](./revalidateTag.md)
- [cacheTag](./cacheTag.md)
