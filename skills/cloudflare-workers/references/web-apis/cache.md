---
source: https://developers.cloudflare.com/workers/runtime-apis/cache/
---

# Cache

The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.

## Signature / Usage

```js
let cache = caches.default;
await cache.match(request);
```

Additional Cache instances via `caches.open`:

```js
let myCache = await caches.open('custom:cache');
await myCache.match(request);
```

Methods:

```js
cache.put(request, response);
cache.match(request, options);
cache.delete(request, options);
```

## Options / Props

| Method | Returns | Parameters |
|--------|---------|------------|
| `put(request, response)` | Promise | `request`: string \| Request (key; a string is interpreted as the URL of a new Request). `response`: Response to store. Attempts to add a response to the cache; resolves to `undefined` regardless of whether the cache successfully stored it. |
| `match(request, options)` | Promise `<Response \| undefined>` | `request`: string \| Request (lookup key). `options`: can contain one property, `ignoreMethod` (Boolean); when `true` the request is considered a `GET` regardless of its actual method. |
| `delete(request, options)` | Promise `<boolean>` | `request`: string \| Request. `options`: object with one possible property, `ignoreMethod` (Boolean). Resolves `true` if the response was cached but is now deleted, `false` if it was not in the cache. |

Response headers respected by `put()`:

| Header | Behavior |
|--------|----------|
| `Cache-Control` | Controls caching directives, consistent with Cloudflare Cache-Control Directives. |
| `Cache-Tag` | Allows resource purging by tag(s) later. `cache.match()` does not include this header in the response it returns. |
| `ETag` | Allows `cache.match()` to evaluate conditional requests with `If-None-Match`. |
| `Expires` | A string that specifies when the resource becomes invalid. |
| `Last-Modified` | Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`. |

Request headers respected by `match()`:

| Header | Behavior |
|--------|----------|
| `Range` | Results in a `206` response if a matching response with a Content-Length header is found. The cache always respects range requests, even if an `Accept-Ranges` header is on the response. |
| `If-Modified-Since` | Results in a `304` response if a matching response has a `Last-Modified` value before the specified time. |
| `If-None-Match` | Results in a `304` response if a matching response has an `ETag` that matches a value in `If-None-Match`. |

## Notes

- The Cache API is a programmatic interface for reading from and writing to Cloudflare's cache from inside a Worker. To have Cloudflare return cached responses without executing your Worker, use Workers Caching instead (the two mechanisms are independent).
- The Cache API is available globally but cache contents do not replicate outside the originating data center.
- `cache.put` is not compatible with tiered caching; use the fetch API for tiered caching.
- Workers on custom domains (and Pages functions) have functional cache operations. Cache API operations in the dashboard editor and Playground previews have no impact. For Workers fronted by Cloudflare Access, the Cache API is not currently available.
- Unlike browsers, this implementation honors headers on the response passed to `put()`.
- Responses with `Set-Cookie` are never cached. Delete that header or set `Cache-Control: private=Set-Cookie` on the response before `cache.put()`.
- `stale-while-revalidate` and `stale-if-error` are not supported with `cache.put` / `cache.match`.
- Responses from `cache.match()` do not include `Cache-Tag`. If you pass a matched response back to `cache.put()`, set `Cache-Tag` first; otherwise a purge by tag between `match()` and `put()` leaves the new entry untagged (later tag purges won't remove it; a purge by URL does). Copy tags into a custom header when first storing, then restore `Cache-Tag` from it before each `put()`.
- `cache.put` throws if: the request method is not `GET`; the response status is `206 Partial Content`; the response contains `Vary: *`. It returns a `413` error if `Cache-Control` instructs not to cache or the response is too large.
- `cache.put` silently rejects a `301`/`302` redirect if (1) the cache key does not include the query string and (2) the `Location` header contains the request's query string (cache-poisoning mitigation). Include the query string in the cache key or remove it from `Location`. Not applicable on `.workers.dev`.
- `match()` does not support `ignoreSearch` or `ignoreVary`; remove query strings or headers at `put()` time instead.
- `cache.match()` never sends a subrequest to the origin; a miss resolves `undefined`. The underlying `504` is visible in Cloudflare Logs with `RequestSource` of `edgeWorkerCacheAPI`.
- `cache.delete` only purges the cache in the data center where the Worker was invoked.
- The `Expires` header is described as a string in the source.

## Related

- Workers Cache (the `workers/cache/` feature): see [cache-databases](../cache-databases/README.md)
- [Request](./request.md)
- [Response](./response.md)
- [Fetch](./fetch.md)
