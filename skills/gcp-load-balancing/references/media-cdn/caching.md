---
source: https://docs.cloud.google.com/media-cdn/docs/caching
---

# Configure caching behavior

Media CDN caches content per route using Google's global edge caching infrastructure. This page covers default caching, cacheable and uncacheable responses, cache modes, TTLs, negative caching, Cache-Control handling, cache keys, `Vary`, range requests and Livestream expansion.

## Signature / Usage

### Default `cdnPolicy`

Routes without an explicit `cdnPolicy` behave as if they had:

```yaml
cdnPolicy:
  cacheMode: CACHE_ALL_STATIC
  defaultTtl: 3600s
  cacheKeyPolicy:
    includeProtocol: false
    excludeHost: false
    excludeQueryString: false
  signedRequestMode: DISABLED
  negativeCaching: false
```

### Negative caching policy

Set a 5-second TTL for HTTP 404 and 10 seconds for HTTP 405 on each applicable route:

```yaml
cdnPolicy:
  negativeCaching: true
  negativeCachingPolicy:
    "404": 5s
    "405": 10s
  # other status codes to apply TTLs for
```

### Cache key: include or exclude query parameters

```yaml
cdnPolicy:
  cacheMode: CACHE_ALL_STATIC
  defaultTtl: 86400s
  cacheKeyPolicy:
    includedQueryParameters: ["contentID", "country"]
```

```yaml
cdnPolicy:
  cacheMode: CACHE_ALL_STATIC
  defaultTtl: 86400s
  cacheKeyPolicy:
    excludedQueryParameters: ["playback-id", "timestamp"]
```

```yaml
cdnPolicy:
  cacheMode: CACHE_ALL_STATIC
  defaultTtl: 3600s
  cacheKeyPolicy:
    excludeQueryString: true
```

### Open-ended range playlist (Low-Latency HLS)

Media playlist indicating which bytes represent each chunk:

```text
  #EXTINF:4.08,
  fs270.mp4
  #EXT-X-PART:DURATION=1.02,URI="fs271.mp4",BYTERANGE=20000@0
  #EXT-X-PART:DURATION=1.02,URI="fs271.mp4",BYTERANGE=23000@20000
  #EXT-X-PART:DURATION=1.02,URI="fs271.mp4",BYTERANGE=18000@43000
  #EXT-X-PRELOAD-HINT:TYPE=PART,URI="fs271.mp4",BYTERANGE-START=61000
```

## Options / Props

### Cacheable responses (GET and HEAD)

| HTTP attribute | Requirements |
|---|---|
| Status code | One of 200, 203, 204, 206, 300, 301, 302, 307, 308, 400, 403, 404, 405, 410, 451, 500, 501, 502, 503, 504. |
| HTTP methods | `GET` and `HEAD` |
| Request headers | Most caching request directives are ignored. |
| Response headers | A valid caching directive such as `Cache-Control: max-age=3600, public`, a cache mode that caches the content, or an `Expires` header with a future date. |
| Response size | Up to 100 GiB. |

### Uncacheable responses

| HTTP attribute | Requirement |
|---|---|
| Status code | Any code not listed as cacheable (for example 401, 412, 505), to avoid cache poisoning. |
| Request headers | With an `Authorization` request header, the response must include `public` to be cached. A `no-store` request directive prevents caching. |
| Response headers | `Set-Cookie`; a `Vary` other than `Accept`, `Accept-Encoding`, `Access-Control-Request-Headers`, `Access-Control-Request-Method`, `Origin`, `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site`, `X-Goog-Allowed-Resources`, `X-Origin`; in `CACHE_ALL_STATIC` or `USE_ORIGIN_HEADERS`, `no-store` or `private`. |
| Response size | Greater than 100 GiB. |

### Cache modes (`cdnPolicy.cacheMode`)

| Cache mode | Behavior |
|---|---|
| `USE_ORIGIN_HEADERS` | Requires valid cache directives and caching headers from the origin and a cacheable status code. TTLs cannot be configured. |
| `CACHE_ALL_STATIC` | Caches successful static responses (by `Content-Type`) unless `no-store` / `private`; origin directives are prioritized. Default mode. |
| `FORCE_CACHE_ALL` | Unconditionally caches successful responses, overriding origin directives. Do not serve private, per-user content (dynamic HTML, API responses) with this mode. |
| `BYPASS_CACHE` | Matching requests bypass the cache even if a cached object exists. Recommended only for debugging. |

### TTL settings

| Setting | Default | Minimum | Maximum | Applicable cache modes |
|---|---|---|---|---|
| Default TTL (`defaultTtl`) | 1 hour (3600 seconds) | 0 seconds | 1 year (31,536,000 seconds) | `CACHE_ALL_STATIC`, `FORCE_CACHE_ALL` |
| Max TTL (`maxTtl`) | 1 day (86400 seconds) | 0 seconds | 1 year (31,536,000 seconds) | `CACHE_ALL_STATIC` |
| Client TTL (`clientTtl`) | Not set | 0 seconds | 1 day (86400 seconds) | `CACHE_ALL_STATIC`, `FORCE_CACHE_ALL` |

| TTL settings |
|---|
| Default TTL applies when the origin sets no `max-age` / `s-maxage`; an origin `s-maxage` takes precedence. With `FORCE_CACHE_ALL` the default TTL is used and everything else is ignored. |
| `maxTtl` must be >= `defaultTtl`; `clientTtl` must be <= `maxTtl`. A TTL of 0 forces revalidation on every request. TTLs are optimistic; unpopular content can be evicted earlier. |
| If Media CDN overrides the TTL, the downstream `Cache-Control` reflects it; an overridden `Expires` is replaced by `Cache-Control`. |

### Negative caching defaults (when enabled without `negativeCachingPolicy`)

| Status codes | Reason-phrase | TTL |
|---|---|---|
| HTTP 300 | Multiple Choices | 10 minutes |
| HTTP 301 and 308 | Permanent Redirect | 10 minutes |
| HTTP 404 | Not Found | 120 seconds |
| HTTP 405 | Method Not Found | 60 seconds |
| HTTP 410 | Gone | 120 seconds |
| HTTP 451 | Unavailable for Legal Reasons | 120 seconds |
| HTTP 501 | Not Implemented | 60 seconds |

| Negative caching defaults (when enabled without `negativeCachingPolicy`) |
|---|
| Disabled by default. Codes allowed in a `negativeCachingPolicy`: 300, 301, 302, 307, 308, 400, 403, 404, 405, 410, 451, 500, 501, 502, 503, 504. Maximum policy TTL is 1800 seconds (30 minutes), though origin directives with a higher TTL are respected. HTTP 414 is not supported for caching. |
| With a policy, list every status code you want cached; the defaults do not apply. A TTL in the policy always wins; origin directives win otherwise when valid; `FORCE_CACHE_ALL` ignores origin directives. |
| Disable defaults with `cdnPolicy.negativeCaching: false` (valid origin directives still cache). Omit a code to respect origin directives for it; set its TTL to `0` to ignore them. |
| Caching 400 or 403 is not recommended (cache poisoning, for example a 403 without a correct `Authorization` header being served to all later requests). |

### Cache-Control directives

| Directive | Request | Response |
|---|---|---|
| `no-cache` | Ignored. | Cached but must be validated with the origin before being served; overridable with `FORCE_CACHE_ALL`. |
| `no-store` | Response is not cached. | Not cached; overridable with `FORCE_CACHE_ALL`. |
| `public` | N/A | Cached if otherwise cacheable and has `max-age` / `s-maxage` (not required in `CACHE_ALL_STATIC` / `FORCE_CACHE_ALL`). |
| `private` | N/A | Not cached by Media CDN; overridable with `FORCE_CACHE_ALL`. Use `no-store` to prevent all caching. |
| `max-age=SECONDS` | Ignored. | Cached up to `SECONDS`. |
| `s-maxage=SECONDS` | N/A | Cached up to `SECONDS`; wins over `max-age`. `s-max-age` is not valid. |
| `min-fresh`, `max-stale`, `only-if-cached` | Ignored. | N/A |
| `stale-if-error` | Ignored. | No effect, passed to the client. |
| `stale-while-revalidate`, `immutable` | N/A | No effect, passed to the client. |
| `must-revalidate`, `proxy-revalidate` | N/A | Revalidated with the origin after expiry. |
| `no-transform` | N/A | No transforms applied. |

### Cache key components

| Component | Included by default | Details |
|---|---|---|
| Protocol | No | HTTP and HTTPS share an object; set `cacheKeyPolicy.includeProtocol` to true to separate. |
| Host | Yes | Set `cdnPolicy.excludeHost` to true to share content across hostnames (the default policy shows `cacheKeyPolicy.excludeHost`). |
| Path | Yes | Always included; cannot be removed. |
| Query parameters | Yes | `cacheKeyPolicy.excludeQueryString`, `includedQueryParameters` or `excludedQueryParameters` (one of the include / exclude lists per route). |
| Headers | No | `cacheKeyPolicy.includedHeaderNames`; many high-cardinality headers lower hit rate. Names are lowercased. The special name `:method` includes the HTTP method. |
| Cookies | No | `cacheKeyPolicy.includedCookieNames`; names are case-sensitive; `edge-cache-` cookies (any case) cannot be used. |

### Other limits and behaviors

| Other limits and behaviors |
|---|
| Query parameters are always sorted before the cache key is derived (cannot be disabled); same-key duplicates sort by full value. |
| Up to 100 variants are cached per cache key (random eviction beyond that); invalidating a URL or tag invalidates all variants. Multiple `Vary` values are sorted lexicographically. |
| Byte ranges: objects larger than 1 MiB are fetched as range requests of up to 2 MiB; responses up to 1 MiB need no origin range support; larger responses are not served if the origin lacks byte-range support (200 or 206, valid `Content-Length` or `Content-Range`, and `ETag` or `Last-Modified`). Multipart range requests are converted into single-part range requests of 2 MB each and answered as `multipart/byteranges`; non-cacheable content is forwarded to the origin. |
| Open-ended `Range` (for example `bytes=0-`): tune `EdgeCacheOrigin.timeouts.readTimeout`, typically about 2x the target duration. The origin must stream objects before they are fully written; Cloud Storage and Amazon S3 support open-ended ranges but only serve fully written objects. |
| Livestream expansion (allowlist-only, not enabled by default; contact your Google Cloud Sales or Account team): maximum cached object size is 25 MiB; larger objects are proxied to the origin on every request unless the optional setting is enabled, in which case Media CDN returns `503 Service Unavailable` for cacheable objects above 25 MiB. |

## Notes

- Default behavior: Default cache mode `CACHE_ALL_STATIC`: respects origin `Cache-Control` / `Expires` up to a configurable max TTL; caches static media types automatically with a default TTL of 3600s if the origin gives no directive; caches HTTP 200, 204 and 206 (negative caching off). Responses with `no-store` or `private`, or otherwise uncacheable, are not cached. Non-static responses without valid cache directives are not cached unless configured.
- Cacheable responses (GET and HEAD): To cache origin responses larger than 1 MiB the origin must send a validator (`Last-Modified` or `ETag`), a valid `Date`, a valid `Content-Length`, and for `Range GET` a `Content-Range` of the form `bytes x-y/z`. Smaller responses lacking them may be evicted sooner. The `Age` header reflects when Media CDN first cached the response (typically at an origin shielding location); if your origin sends `Age`, use `FORCE_CACHE_ALL` to prevent revalidations when Age exceeds the TTL.
- Uncacheable responses: Uncacheable responses are proxied as is and are not billed as `Cache Egress`.
- Cache modes (`cdnPolicy.cacheMode`): Non-2xx responses are not cached by MIME type and do not get the default TTL. `CACHE_ALL_STATIC` MIME types: `text/css`, `text/ecmascript`, `text/javascript`, `application/javascript`, `font/*`, `image/*`, `video/*`, `audio/*`, `application/pdf`, `application/postscript`. HTML (`text/html`) and JSON (`application/json`) are not cached by default; use Cloud CDN for web assets and API responses. Cloud Storage always sends a `Cache-Control` header, so successful Cloud Storage responses are cached by its defaults unless you change object cache-control metadata or use `FORCE_CACHE_ALL`.
- Cache-Control directives: `Expires` must be a valid HTTP-date; a past date, invalid date or `0` means already expired. `Expires` is ignored when `Cache-Control` is present. `Pragma` is ignored and passed through.
- Cache key components: Headers that cannot be in the cache key: any `access-control-*`, any `sec-fetch-*`, `accept-encoding`, `accept`, `authorization`, `connection`, `content-md5`, `content-type`, `cookie`, `date`, `forwarded`, `from`, `host`, `if-match`, `if-modified-since`, `if-none-match`, `origin`, `proxy-authorization`, `range`, `referer`, `referrer`, `user-agent`, `want-digest`, `x-csrf-token`, `x-csrftoken`, `x-forwarded-for`.
- Cache keys are scoped to an `EdgeCacheService` (deleting a service invalidates its cached objects), are not tied to an origin or a route, and do not include URL rewrites. With signed requests, the signed query parameters or the path component starting with `edge-cache-token` up to the next `/` are not part of the cache key; including signed parameters would make every request unique.
- Revalidation: popular content at TTL expiry is revalidated with a `HEAD` request to the origin; there is no guarantee of retention for the full TTL. A high eviction rate usually means cache keys include non-identifying parameters.
- `BYPASS_CACHE` traffic is priced at internet egress rates; use an external Application Load Balancer for dynamic API backends.
- Do not include confidential, sensitive or personally identifiable information in URL paths or query parameters (treated as non-identifiable service data).
- Google Cloud Media CDN / Cloud CDN — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the default policy example in the source places `excludeHost` under `cacheKeyPolicy`, while the cache key table says to "set `cdnPolicy.excludeHost` to true" and sets `cacheKeyPolicy.excludeQueryString` in the next row. The table row is kept as written; the default policy example shows the nested `cacheKeyPolicy.excludeHost` form.
- Source: https://docs.cloud.google.com/media-cdn/docs/caching (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [routing.md](./routing.md)
- [origins.md](./origins.md)
- [configuration.md](./configuration.md)
- [overview.md](./overview.md)
