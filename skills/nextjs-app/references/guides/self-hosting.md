# Self-Hosting

Learn how to self-host a Next.js application on a Node.js server, Docker image, or static HTML files (static exports).

## Signature / Usage

```js filename="next.config.js"
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // disable default in-memory caching
  generateBuildId: async () => process.env.GIT_HASH,
  deploymentId: process.env.DEPLOYMENT_VERSION,
}
```

## Key topics

- **Reverse Proxy**: use nginx or similar in front of the Next.js server for request validation, rate limiting, and security; keep the Next.js server focused on rendering.
- **Image Optimization**: works with zero config under `next start`. Requires a custom [image loader](./../api-reference/components/image.md) for static exports (runtime, not build-time, optimization).
- **Proxy** (`proxy.js`): works self-hosted with zero config under `next start`; not supported with static export. Runs on the Edge runtime by default; use the Node.js runtime for full API access.
- **Environment Variables**: server-only by default; `NEXT_PUBLIC_` prefix exposes to the browser and is inlined at `next build`. Use `connection()` to defer evaluation to request time.
- **Caching and ISR**: shares the Next.js server cache, stored on local disk per instance by default. For multi-instance/ephemeral compute, configure a custom `cacheHandler` (e.g. Redis, S3) and set `cacheMaxMemorySize: 0`.
- **Build Cache**: `generateBuildId` in `next.config.js` keeps a consistent build ID across containers rebuilt per environment stage.
- **Multi-Server Deployments**: set a consistent `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` (base64, 16/24/32-byte AES key) across instances; configure `deploymentId` for version-skew protection; use `'use cache: remote'` with a custom cache handler for a shared cache.
- **Version Skew**: `deploymentId` adds a `?dpl=` query param to assets and an `x-deployment-id` header to navigations; mismatches trigger a hard navigation instead of a client-side one.
- **Streaming and Suspense**: supported self-hosted; disable proxy/nginx response buffering (e.g. `X-Accel-Buffering: no`) and ensure load balancers/reverse proxies support chunked transfer or HTTP/2 streaming (required for PPR).
- **Multi-Instance Cache Coordination**: `revalidateTag()` only invalidates the calling instance by default; implement `refreshTags()` in a custom cache handler to sync tag state (e.g. via Redis) across instances.
- **Usage with CDNs**: dynamic pages send `Cache-Control: private`; fully static routes send `Cache-Control: public` and can be cached at the CDN edge.
- **`after`**: fully supported under `next start`; allow a 10-30s drain period on shutdown (`SIGINT`/`SIGTERM`) so in-flight requests and `after()` callbacks complete.

## Notes

- On glibc-based Linux, Image Optimization may need [additional config](https://sharp.pixelplumbing.com/install#linux-memory-allocator) to avoid excessive memory use.
- `revalidatePath` is a convenience layer on top of `revalidateTag`.
- Cache Components work by default when self-hosting (not a CDN-only feature).

## Related

- [ISR](./incremental-static-regeneration.md)
- [Static Exports](./static-exports.md)
- [Content Security Policy](./content-security-policy.md)
