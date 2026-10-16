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
- Recommended: set `partialPrefetching` explicitly together with `cacheComponents` (`cacheComponents: true, partialPrefetching: true`). Leaving it unset logs a warning, because the first release of Cache Components did not include Partial Prefetching; set it to `false` only while migrating an app that adopted Cache Components earlier. Both features will be enabled everywhere in the next major release and the options will be removed.
- Requires the Node.js runtime and does not support the `runtime` route segment config: remove any `runtime` export, including `runtime = 'nodejs'` and the deprecated `runtime = 'edge'`.
- Version history: `v16.0.0` stabilized `cacheComponents` and moved it from `experimental.cacheComponents` to the top-level option (one flag controls the `ppr`, `useCache`, `dynamicIO` behaviors); `cacheLife` was likewise stabilized and moved to top-level in `v16.0.0`.
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
- `CacheEntry` shape: `{ value: ReadableStream<Uint8Array>, tags: string[], stale, timestamp (ms), expire, revalidate }`. Both `CacheHandler` and `CacheEntry` types are exported from `next/cache` (`import type { CacheHandler, CacheEntry } from 'next/cache'`).
- The entry `value` stream is single-use and belongs to the request that produced it: consume it exactly once in `set()` (buffer it or pipe it to storage), build a new stream over the stored bytes in every `get()`, and do not keep the stream (or the `pendingEntry` promise) after `set()` resolves. For fan-out to two destinations use `.tee()` and consume both branches before `set()` resolves. The stream can error partway; discarding an incomplete value is safer.
- `get()` need not check age: Next.js compares `timestamp` against the entry's `expire` itself (and `revalidate` when writing into another server cache). Past `expire` the entry is discarded and regenerated; past `revalidate` but within `expire` it is served while a fresh one is generated in the background. To report an invalidated entry, return `undefined` (miss) or return it with `revalidate: -1` (served stale, regenerated in background).
- Eviction is the handler's job (Next.js never deletes from your store): use a TTL derived from `expire` or a size-bounded LRU.
- `updateTags(tags, durations?)`: `durations` absent means invalidate immediately (`updateTag()` and single-argument `revalidateTag()`); `durations` present (`{ expire }`, e.g. `revalidateTag(tag, 'max')`) means the tags go stale now but entries may be served while refreshing until `durations.expire` seconds pass. Record invalidation times per tag so `get()` and `getExpiration()` (soft tags) can compare them against an entry's `timestamp`.
- `refreshTags()` runs once per request, before the first cache read for this handler's kind (a request that reads nothing from the handler never calls it); a no-op for in-memory handlers.
- Needed only for advanced cases: sharing cache across instances (e.g. Redis) or changing storage medium.
- Soft tags (auto-generated per route path, e.g. for `revalidatePath()`) are passed to `get()` as `softTags`.
- Error handling: `set()` failures don't affect the already-served response (cache entry is simply lost; still catch your own errors, since a rejected `set()` joins the request's pending revalidation work as a failed background task); `get()` errors are **not** caught by the framework — catch internally and return `undefined`, otherwise an unhandled exception propagates as a render error. Partially written entries read back have undefined behavior (use atomic writes).
- Not supported for static export; platform-specific for Adapters.
- Version history: `v16.0.0` stabilized `cacheHandlers` and moved it from `experimental.cacheHandlers` to the top-level option.

## cacheMaxMemorySize

Sets the size, in bytes, of the in-memory cache each Next.js server instance keeps. Defaults to 50 MB.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheMaxMemorySize: 50 * 1024 * 1024, // 50 MB, the default
}
```

- Sizes two separate caches: the server cache for prerendered pages, route handler responses and optimized images (set `0` when adopting a custom `cacheHandler` so reads go to your store), and the built-in handler behind `'use cache'` (not applied to a handler you register via `cacheHandlers`, which manages its own memory).
- `cacheMaxMemorySize: 0` disables both in-memory caches; it also mimics `use cache` behavior in serverless, where entries rarely survive between requests.
- `next dev` keeps its own in-memory cache regardless of this option; production honors the configured value exactly.

## partialPrefetching

Enables Partial Prefetching at the app level: the framework prefetches the static parts of each route (one reusable App Shell per route) by default; `<Link prefetch={true}>` fetches more (per-link prefetching: URL data such as `params` / `searchParams` and the cached content behind it). Requires `cacheComponents` (config validation throws without it).

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
}
```

| Value | Description |
|------|-------------|
| `true` | Enables Partial Prefetching across the app. |
| `false` | Keeps the previous prefetch behavior, for apps that adopted Cache Components before Partial Prefetching existed. |

- Unset behaves like `false` and logs a warning when `cacheComponents` is enabled. Both features will be enabled everywhere in the next major release, and the options will be removed.
- A segment that exports `prefetch` overrides the app-level default for that route.
- Routes that read `cookies()` / `headers()` produce an App Shell including session data; the framework auto-detects this and caches the shell per session on the client.
- Version history: `16.3.0` introduced `partialPrefetching` (requires `cacheComponents`).

## prefetchInlining

**Experimental.** Overrides how the App Router bundles small prefetch responses into a single response (on by default; most apps should leave it). Only the `experimental.prefetchInlining` config is experimental; the inlining behavior itself is permanent.

```ts filename="next.config.ts"
const nextConfig: NextConfig = {
  experimental: {
    prefetchInlining: { maxSize: 2048, maxBundleSize: 10240 },
  },
}
```

| Value | Description |
|------|-------------|
| `true` | Inlines with default thresholds (default). |
| `false` | Disables inlining; each segment is its own request. |
| `object` | `maxSize` (default `2048`, largest single segment response eligible) and `maxBundleSize` (default `10240`, largest total per bundled response), both in bytes of gzip-compressed response. |

- Version history: `16.2.0` added `experimental.prefetchInlining`; `16.3.0` enabled it by default.

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
- Cache keys are opaque identifiers: preserve the entire key when reading and writing entries; a key is not a request pathname. See the Redis `cacheHandler` example (`examples/cache-handler-redis` in the Next.js repository) for a working implementation.
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
