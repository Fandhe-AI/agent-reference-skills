# Incremental Static Regeneration (ISR)

ISR updates static content without a full rebuild, serving prerendered pages while regenerating stale ones in the background.

## Signature / Usage

```tsx filename="app/blog/[id]/page.tsx"
export const revalidate = 60 // seconds

export async function generateStaticParams() {
  const posts = await fetch('https://api.vercel.app/blog').then((r) => r.json())
  return posts.map((post) => ({ id: String(post.id) }))
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await fetch(`https://api.vercel.app/blog/${id}`).then((r) => r.json())
  return <main><h1>{post.title}</h1></main>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revalidate` (route export) | `number` | Seconds before the cache is invalidated and regenerated |
| `revalidatePath(path)` | function | On-demand invalidation of a specific route path |
| `revalidateTag(tag)` | function | On-demand invalidation of fetch/`unstable_cache` requests tagged with `tag` |
| `dynamicParams` | `boolean` | Controls on-demand generation for params not returned by `generateStaticParams` |

## Notes

- On-demand ISR: `revalidatePath`/`revalidateTag` invalidate the cache entry, but regeneration happens on the **next** request, not eagerly.
- Caveats: ISR requires the Node.js runtime (not supported with Static Exports); the lowest `revalidate` across multiple `fetch` calls in a route wins; any `fetch` with `revalidate: 0` or `no-store` forces the route to be dynamically rendered.
- Proxy is not executed for on-demand ISR requests — revalidate the exact path, not a rewritten one.
- Default file-system cache is per-instance; use a shared custom cache handler to coordinate across multiple instances.
- `x-nextjs-cache` response header values: `HIT`, `STALE`, `MISS`, `REVALIDATED`.
- Debug with `NEXT_PRIVATE_DEBUG_CACHE=1` env var, or `logging.fetches.fullUrl` in `next.config.js`.

## Related

- [Caching (Previous Model)](./caching-without-cache-components.md)
- [Static Exports](./static-exports.md)
