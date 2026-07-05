# Caching Options

`next.config.js` options controlling data/render caching: Cache Components, custom cache handlers, cache lifetimes, ISR expiry, and client-side navigation caching.

## cacheComponents

Enables component/function-level caching via the [`use cache`](/docs/app/api-reference/directives/use-cache) directive; data fetching is dynamic by default and you opt specific pages/components/functions into caching. Also implements Partial Prerendering (PPR) as the default App Router rendering behavior (replacing the old `experimental.ppr` flag/`experimental_ppr` route config).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheComponents: true,
}
```

- Unifies and replaces the former `experimental.ppr`, `experimental.useCache`, `experimental.dynamicIO` flags (see Version 16 upgrade guide for migration).
- Enables `cacheLife()`, `cacheTag()` for use with `use cache`.
- Uses React `<Activity>` to keep recently visited routes mounted (`"hidden"`) on client navigation, preserving component state; older routes are removed from the DOM.
- Introduced `v16.0.0`.

## cacheHandlers

Defines custom cache storage implementations for `'use cache'` (`default` handler) and `'use cache: remote'` (`remote` handler). `'use cache: private'` is not configurable via this option.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheHandlers: {
    default: require.resolve('./cache-handlers/default-handler.js'),
    remote: require.resolve('./cache-handlers/remote-handler.js'),
  },
}
```

- Default (if unconfigured): in-memory LRU cache for both `default` and `remote`.
- A handler implements `get(cacheKey, softTags)`, `set(cacheKey, pendingEntry)`, `refreshTags()`, `getExpiration(tags)`, `updateTags(tags, durations?)`.
- `CacheEntry` shape: `{ value: ReadableStream<Uint8Array>, tags, stale, timestamp, expire, revalidate }`.
- Needed only for advanced cases: sharing cache across instances (e.g. Redis) or changing storage medium.
- Soft tags (auto-generated per route path, e.g. for `revalidatePath()`) are passed to `get()` as `softTags`.
- `set()` failures don't affect the already-served response (cache entry is simply lost); `get()` errors are **not** caught by the framework — an unhandled exception propagates as a render error.
- Not supported for static export; platform-specific for Adapters.
- Introduced `v16.0.0`.

## cacheLife

Defines custom named cache profiles (`stale`, `revalidate`, `expire` in seconds) for use with the `cacheLife()` function inside `'use cache'` scopes. Requires `cacheComponents: true`.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    blog: { stale: 3600, revalidate: 900, expire: 86400 },
  },
}
```

```ts filename="app/actions.ts"
import { cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  return fetch('/api/data')
}
```

| Property | Type | Description | Requirement |
|------|------|-------------|-------------|
| `stale` | `number` | How long the client caches a value without checking the server. | Optional |
| `revalidate` | `number` | How often the cache refreshes on the server; stale values may serve while revalidating. | Optional |
| `expire` | `number` | Max duration a value can stay stale before becoming dynamic. | Optional, must be > `revalidate` |

## incrementalCacheHandlerPath (cacheHandler)

Configures the storage location for Next.js's built-in ISR/route-handler/image-optimization server cache (distinct from `cacheHandlers`, which is for `'use cache'`).

```js filename="next.config.js"
module.exports = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // disable default in-memory caching
}
```

- Implements `get(key, ctx)`, `set(key, data, ctx)`, `revalidateTag(tag)`, `resetRequestCache()`.
- `ctx.kind` identifies entry type: `'APP_PAGE'`, `'APP_ROUTE'`, `'PAGES'`, `'FETCH'`, `'IMAGE'`.
- Set `images.customCacheHandler: true` to also route optimized-image caching through this handler (will become default in a future major version).
- Not supported for static export; platform-specific for Adapters.
- Renamed from `incrementalCacheHandlerPath` to `cacheHandler` and stabilized in `v14.1.0`; image optimization caching support added in `v16.2.0`.

## expireTime

Sets a custom `stale-while-revalidate` value (seconds) for the `Cache-Control` header on ISR-enabled pages, for CDNs to consume.

```js filename="next.config.js"
module.exports = {
  expireTime: 3600, // one hour
}
```

E.g. with a 15-minute `revalidate` and 1-hour `expireTime`, the header becomes `s-maxage=900, stale-while-revalidate=2700`.

## serverComponentsHmrCache

**Experimental.** Caches Server Component `fetch` responses across HMR refreshes in local dev (faster refreshes, fewer billed API calls). Applies even to `cache: 'no-store'` requests; cache clears on navigation/full reload.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
}
```

- Pair with [`logging.fetches`](./env-and-checks.md#logging) to observe cache hits/misses in dev.

## staleTimes

**Experimental.** Configures Client Cache (Router Cache) durations, in seconds, for prefetched page segments.

```js filename="next.config.js"
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

| Name | Default | Description |
|------|---------|-------------|
| `dynamic` | `0` (was `30` before `v15.0.0`) | For pages neither static nor fully prefetched. |
| `static` | `300` (5 min) | For static pages, or `Link prefetch={true}` / `router.prefetch`. |

- Loading boundaries are reusable for the `static` period.
- Doesn't affect partial rendering (shared layouts aren't refetched every navigation) nor back/forward cache behavior.
- Introduced `v14.2.0`.

## staticGeneration (staticGenerationRetryCount / MaxConcurrency / MinPagesPerWorker)

**Experimental.** Tunes the static generation (build-time prerender) process for advanced/large builds.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
}
```

| Name | Description |
|------|-------------|
| `staticGenerationRetryCount` | Retries for a failed page generation before failing the build. |
| `staticGenerationMaxConcurrency` | Max pages processed per worker. |
| `staticGenerationMinPagesPerWorker` | Min pages processed before starting a new worker. |

## Related

- [build-output.md](./build-output.md)
- [react-experimental.md](./react-experimental.md)
