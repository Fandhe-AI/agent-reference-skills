# Runtime Integration

The Deployment Adapter API is a build-time interface; runtime behavior (request handling, streaming, caching) is handled by the Next.js server together with the `cacheHandler` / `cacheHandlers` cache interfaces.

## Signature / Usage

```ts
await handler(req, res, {
  waitUntil,
  requestMeta: {
    onCacheEntryV2: async (cacheEntry, meta) => {
      // propagate cache updates to platform storage
      return false
    },
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| ctx.waitUntil | `(promise: Promise<void>) => void` | Keeps the serverless function alive after the response is sent, for background work like cache revalidation. |
| requestMeta.onCacheEntryV2 | callback | Fires when a cache entry is generated or looked up (not just for PPR); use it to propagate cache updates to shared storage across instances. |
| pprChain.headers | `Record<string, string>` | Headers for the PPR resume protocol (`{ 'next-resume': '1' }`), found on the prerenders output type. |

## Notes

- Adapter (build-time): processes build outputs, configures routing, sets up platform-specific infrastructure. Cache interfaces (runtime): `cacheHandler` manages ISR/server cache storage and revalidation across instances; `cacheHandlers` configures `'use cache'` directive backends and tag coordination.
- To resume a PPR route: set `pprChain.headers` on the internal request, send it as a POST with `postponedState` as the body; the handler renders only the deferred Suspense boundaries and streams the result.
- In standard `next start`, the server handles both the shell and dynamic render in a single pass automatically — the resume protocol targets adapter-based deployments and CDN-to-origin architectures.

## Related

- [Implementing PPR in an Adapter](./adapters-implementing-ppr-in-an-adapter.md)
- [Output Types](./adapters-output-types.md)
