# How Revalidation Works

Internal deep-dive into how Next.js revalidates cached content: the tag system, cache consistency between HTML/RSC payload, and multi-instance coordination, aimed at platform engineers implementing custom cache handlers.

## Signature / Usage

```ts filename="Explicit vs. soft tags"
// Explicit tag — set by the developer
cacheTag('my-tag')
// or: fetch(url, { next: { tags: ['my-tag'] } })
revalidateTag('my-tag', 'max')

// Soft tags — auto-generated per route path, prefixed with _N_T_
// /blog/hello -> _N_T_/layout, _N_T_/blog/layout, _N_T_/blog/hello/layout, _N_T_/blog/hello
revalidatePath('/blog/hello')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Time-based revalidation | strategy | Stale-while-revalidate; cached content served immediately, background regeneration triggered past `cacheLife`/`revalidate` |
| On-demand revalidation | strategy | `revalidateTag()` / `revalidatePath()` explicitly invalidate; next request triggers a fresh render |
| Explicit tags | tag type | Set via `cacheTag()` inside `use cache` or `fetch`'s `next: { tags }` |
| Soft tags | tag type | Auto-generated `_N_T_`-prefixed tags per route segment; power `revalidatePath()` |
| `updateTags()` | cache handler hook | Called on `revalidateTag()`; write invalidation events to shared storage for multi-instance coordination |
| `refreshTags()` | cache handler hook | Called periodically before each request; reads shared storage to update local tag state (must catch its own errors) |
| `deploymentId` | `next.config.js` option | Mitigates cross-deployment skew by forcing a hard navigation when the client detects a different deployment ID |

## Notes

- Revalidation regenerates **both** the HTML response and the RSC payload from the same component tree, stored together in the same cache entry — caching them separately with different TTLs can produce mismatched content during client navigation.
- A cache read failure should return `undefined` (cache miss signal) rather than throw; a thrown error propagates as a render error instead of triggering a fresh render.
- Single-instance deployments get consistency automatically via the default file-system cache (atomic local writes, in-memory tag state); multi-instance deployments need `updateTags()`/`refreshTags()` wired to shared storage (Redis, DynamoDB, etc.).
- The revalidation system prioritizes availability over strict consistency — cache write/read failures degrade to stale content or extra renders rather than broken responses.

## Related

- [Incremental Static Regeneration (ISR)](./incremental-static-regeneration.md)
- [Incremental Static Regeneration with Cache Components](./incremental-static-regeneration-cache-components.md)
- [Migrating to Cache Components](./migrating-to-cache-components.md)
