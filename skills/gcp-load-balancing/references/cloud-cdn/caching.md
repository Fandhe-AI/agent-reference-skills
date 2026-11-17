---
source: https://docs.cloud.google.com/cdn/docs/caching
---

# Caching overview

Cloud CDN stores cacheable HTTP responses (served by a backend service, backend bucket or external backend with Cloud CDN enabled) using the response headers your origin sends. Standard `Cache-Control` manages caching universally; `CDN-Cache-Control` targets Cloud CDN without affecting browsers. Cache modes, cache keys, TTL defaults, byte range requests, request collapsing and cache bypass are described below.

## Signature / Usage

### Request collapsing (item requests)

Request collapsing is enabled by default (gcloud CLI 330.0.0 or later for `--request-coalescing`). Disable item request collapsing on a backend service:

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --no-request-coalescing
```

Enable on a backend bucket:

```bash
gcloud compute backend-buckets update BACKEND_BUCKET_NAME \
    --request-coalescing
```

Enable on a backend service (VM groups and external backends included):

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --request-coalescing
```

### Cache bypass on request headers (gcloud CLI 324.0.0 or later)

Up to five header names; values are case-insensitive; a name can't be repeated. Bypass applies to every cache mode, including `FORCE_CACHE_ALL`, and many matching requests cause many cache misses.

```text
gcloud compute backend-buckets (create | update) BACKEND_BUCKET_NAME
    --bypass-cache-on-request-headers=BYPASS_REQUEST_HEADER
```

```text
gcloud compute backend-services (create | update) BACKEND_SERVICE_NAME
    --bypass-cache-on-request-headers=BYPASS_REQUEST_HEADER
```

Adapted (not in the official docs): added the `\` line continuations that the source example omits, so the multi-line command runs as one command.

```bash
gcloud compute backend-services update my-backend-service \
    --bypass-cache-on-request-headers=Pragma \
    --bypass-cache-on-request-headers=Authorization
```

Adapted (not in the official docs): the REST URL names the backend bucket (`/BACKEND_BUCKET`), as in the Compute Engine `backendBuckets.patch` path.

REST: `PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/BACKEND_BUCKET` with this body fragment:

```text
"cdnPolicy": {
  "bypassCacheOnRequestHeaders": [
    {
      "headerName": string
    }
  ]
}
```

Disable bypass:

Adapted (not in the official docs): the source shows one command with `backend-services (create | update) (BACKEND_SERVICE_NAME | BACKEND_BUCKET_NAME)`, which cannot take a backend bucket, and `--no-bypass-cache-on-request-headers` exists only on `update` (see the gcloud help for `compute backend-buckets update` and `compute backend-services update`). It is split into one command per resource type with `\` continuations, and `--global` is added for the global backend service.

```text
gcloud compute backend-buckets update BACKEND_BUCKET_NAME \
    --no-bypass-cache-on-request-headers
```

```text
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --no-bypass-cache-on-request-headers
```

## Options / Props

### Cache modes

| Mode | Behavior |
|------|----------|
| `CACHE_ALL_STATIC` (default for backends created with gcloud or REST) | Caches successful static-content responses not otherwise non-cacheable; responses with valid caching directives are also cached. |
| `USE_ORIGIN_HEADERS` | Requires valid cache directives and headers on successful origin responses; others are forwarded from the origin. |
| `FORCE_CACHE_ALL` | Unconditionally caches successful responses, overriding `Cache-Control` and `Expires` but not other headers (a `Vary` header can still suppress caching). Not for private per-user content. Required to cache content from buckets with private bucket access enabled. |

### Static content types (`CACHE_ALL_STATIC`)

| Category | MIME types |
|----------|------------|
| Web assets | `text/css text/ecmascript text/javascript application/javascript` |
| Fonts / images / videos / audio | `font/*`, `image/*`, `video/*`, `audio/*` |
| Formatted documents | `application/pdf`, `application/postscript` |

| Static content types (`CACHE_ALL_STATIC`) |
|---|
| Applies only to successful responses (for example `200 OK`). `text/html` and `application/json` aren't cached by default; they need explicit `Cache-Control` headers. File extensions in the URL aren't used. |
| Responses with `Cache-Control: private` or `no-store`, or a `Set-Cookie` header, aren't cached. |

### Defaults

| Parameter | Default |
|-----------|---------|
| Cache mode | `CACHE_ALL_STATIC` |
| Client TTL | `3600s` |
| Default TTL | `3600s` |
| Include Host / Protocol / Query String | `true` |
| Max TTL | `86400s` |
| Negative Caching | `false` |
| Serve While Stale | `86400s` |

### GKE controller support

| Feature | GKE Ingress (backend config) | GKE Gateway (`GCPHTTPFilter`) |
|---------|------------------------------|-------------------------------|
| Modes/TTLs, cache key customization, negative caching, serve while stale, request coalescing | Yes | Yes |
| Dynamic compression, signed URLs and cookies | Yes | No |

### Cacheability requirements (all must hold)

| Attribute | Requirement |
|-----------|-------------|
| Served by | Backend service, backend bucket, or external backend with Cloud CDN enabled |
| Request | `GET` |
| Status code | `200`, `203`, `204`, `206`, `300`, `301`, `302`, `307`, `308`, `404`, `405`, `410`, `421`, `451`, `501` |
| Freshness | `Cache-Control` with `max-age` or `s-maxage`, or future `Expires`; `public` required for age-less responses such as `no-cache`; `CACHE_ALL_STATIC` caches static types without directives; negative caching can make a matching status eligible |
| Content | HTTP/1 origins need valid `Content-Length`, `Content-Range` or `Transfer-Encoding: chunked` |
| Size | At most the maximum size: 100 GiB (107,374,182,400 bytes) if the origin supports byte range requests, 10 MiB (10,485,760 bytes) if not; larger bodies aren't cached but are delivered |

### Cache key rules

| Cache key rules |
|---|
| Backend services default to the complete request URI; backend buckets default to the URI without protocol or host and with only Cloud Storage-known query parameters (for example `generation`). Filename and path are always part of the key; query parameter order doesn't matter. |
| Query string include list needs the query string included, a non-empty include list and no exclude list (and vice versa for exclude lists). Backend buckets support include lists only (gcloud CLI `369.0.0` or later). |
| Headers and cookies in the cache key (gcloud CLI `369.0.0` or later): headers for backend services and buckets, named cookies for backend services only (up to five names; only the first instance of a repeated cookie name is honored). Requests with extra headers or cookies are cached on the third request in a cache location. Header names must be valid per RFC 7230, case-insensitive, no duplicates. |
| Disallowed header names include `Accept`, `Accept-Encoding`, `Authority`, `Authorization`, `CDN-Loop`, `Connection`, `Content-MD5`, `Content-Type`, `Cookie`, `Date`, `Forwarded`, `From`, `Host`, `If-Match`, `If-Modified-Since`, `If-None-Match`, `Origin`, `Proxy-Authorization`, `Range`, `Referer`, `User-Agent`, `Want-Digest`, `X-CSRFToken`, `X-CSRF-Token`, `X-Forwarded-For`, `X-User-IP`, and any header starting with `Access-Control-`, `Sec-Fetch-`, `Sec-GFE-`, `Sec-Google-`, `X-Amz-`, `X-GFE-`, `X-Goog-`, `X-Google-`. |
| Custom variables usable for headers that are both custom request headers and cache key headers: `device_request_type`, `user_agent_family`, `client_region`, `client_region_subdivision`. |

### Cache control directives

| Directive | Request | Response |
|-----------|---------|----------|
| `no-store` | Honored: response not stored | Not cached (overridable with `FORCE_CACHE_ALL`) |
| `no-cache` | Ignored | Cached but revalidated before serving (overridable with `FORCE_CACHE_ALL`) |
| `private` | N/A | Not cached by Cloud CDN (overridable with `FORCE_CACHE_ALL`) |
| `max-age` | Ignored | Cached for the given seconds |
| `s-maxage` | N/A | Cached for the given seconds; wins over `max-age`; not served stale (`s-max-age` is invalid) |
| `max-stale` | Honored (stale response only if less stale than the value) | N/A |
| `stale-while-revalidate` | N/A | Served up to the given seconds while async revalidation runs (or enable for all via `cdnPolicy.serveWhileStale`) |
| `must-revalidate`, `proxy-revalidate` | N/A | Revalidated after expiry; not served stale |
| `min-fresh`, `only-if-cached`, `stale-if-error` (request) | Ignored | `stale-if-error` response header has no effect |
| `public`, `immutable`, `no-transform` | N/A | `public` is a best practice; `immutable` passed through; no transforms applied |

### Expiration and validation

| Expiration and validation |
|---|
| `s-maxage` beats `max-age`, which beats `Expires`. Expiration values above 30 days (2,592,000 seconds) are treated as 2,592,000 seconds (clients still see the original). Entries not accessed for 30 days are evicted. |
| `CACHE_ALL_STATIC`: origin headers decide freshness, `default_ttl` applies to static content without headers. `USE_ORIGIN_HEADERS`: origin headers. `FORCE_CACHE_ALL`: `default_ttl`. |
| Conditional validation (`If-Modified-Since` / `If-None-Match`, `304 Not Modified`) happens when the cached response has `Last-Modified` or `ETag` and the client `GET` has neither conditional header. |

### Byte range requests

| Byte range requests |
|---|
| An origin supports ranges when it returns `200 OK` or `206 Partial Content`, `Accept-Ranges: bytes`, `Content-Length` (and a `Content-Range` with a complete length for `206`, for example `0-100/999`, not `0-100/*`), and `Last-Modified` and `ETag` with a strong validator. |
| A cache first declines to store a response that is incomplete or larger than 1 MB (1,048,576 bytes), records range support, and then fills with its own range requests, so content over 1 MB is stored only from the second access. Cloud Storage objects over 10 MB must not have `Content-Encoding: gzip` metadata. |
| Range requests start at offsets that are multiples of 2,097,136 bytes, each 2,097,136 bytes (final range smaller; may change). Each GET to Cloud Storage is billed as a Class B operation. Validation and range requests omit client headers such as `Cookie` and `User-Agent`; the Cloud Logging user agent is `Cloud-CDN-Google`. |

### Request collapsing

| Request type | Default | Configurable |
|--------------|---------|--------------|
| Chunk requests | Enabled | No |
| Item requests | Enabled | Yes (consider disabling for latency-sensitive uses such as ad-serving) |

## Notes

- Cache modes: For signed URLs or cookies, `FORCE_CACHE_ALL` overrides the `--signed-url-cache-max-age` value, and it changes the TTL of previously cached content. Error responses may be cached via negative caching even without cache directives.
- Cache policy placement: Cache policy can be set on a backend service or backend bucket (one policy for all requests) or at levels of the URL map (root, path matchers, path rules, route rules). URL map cache policies are supported only for the global external Application Load Balancer, not the classic Application Load Balancer. Dynamic compression, signed URLs and signed cookies are configured on the backend only.
- Cacheability requirements (all must hold): Not cached when: `Set-Cookie` present; `Vary` other than `Accept`, `Accept-Encoding`, `Access-Control-Request-Headers`, `Access-Control-Request-Method`, `Available-Dictionary`, `Origin`, `Sec-Fetch-Dest`, `Sec-Fetch-Mode`, `Sec-Fetch-Site`, `X-Goog-Allowed-Resources`, `X-Origin`, or a cache-key header; response `no-store`/`private` (unless `FORCE_CACHE_ALL`); request `Cache-Control: no-store`; request `Authorization` unless overridden by response `Cache-Control`. `no-store`/`private` content is still cached if URL signing is configured or the mode forces caching.
- Cacheability requirements (all must hold): With `Authorization` on origin requests, `USE_ORIGIN_HEADERS` and `CACHE_ALL_STATIC` only cache responses with `public`, `must-revalidate` or `s-maxage`.
- Cache control header precedence: `CDN-Cache-Control` (used exclusively if present; forwarded to the client) takes priority over `Cache-Control`. Provider-specific third-party CDN headers are ignored. There's no fallback for malformed headers: a `CDN-Cache-Control` with syntax errors (RFC 9213 structured fields) may make the response uncacheable instead of falling back to `Cache-Control`.
- Cache control directives: `Expires` must be a valid HTTP-date; a past date, invalid date or `0` means expired; it is ignored if `Cache-Control` is present. `Pragma` is ignored.
- Google Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) caching.
- Cloud Storage backend buckets: the recommended approach for public content is a publicly readable bucket (`allUsers`), which lets anyone on the internet view and list objects and metadata; use dedicated buckets for public objects, managed folders for a portion, or private bucket access / private origin authentication / signed URLs to restrict access. Don't use Requester Pays buckets, buckets in a VPC Service Controls perimeter, or CMEK / CSEK-encrypted objects. Cloud Storage defaults to `Cache-Control: public, max-age=3600` for public objects without metadata.
- `FORCE_CACHE_ALL` and signed URLs can cache private content regardless of `Cache-Control` (public exposure of per-user data; only use `FORCE_CACHE_ALL` for public, static content); to prevent caching avoid `FORCE_CACHE_ALL`, send `Cache-Control: private` or `no-store`, and don't sign URLs for private information.
- Cache bypass changes caching for all modes and increases cache misses; it can be disabled again with `--no-bypass-cache-on-request-headers`.
- Changing cache modes, cache keys or bypass changes cache behavior for the whole backend; try it on a non-production backend first.
- Corrected from the official docs: the bypass example `gcloud compute backend-services update my-backend-service` followed by `--bypass-cache-on-request-headers=Pragma` and `--bypass-cache-on-request-headers=Authorization` on separate lines had no `\` continuations; they are added so it runs as one command. The `(create | update)` forms are pseudo-usage and are in `text` fences. The source also shows Console steps and the REST `POST` / `PUT` URLs (for example `.../global/backendServices/BACKEND_SERVICE`) with `"cdnPolicy": {"fields": "bypassCacheOnRequestHeaders"}`, which are omitted.
- Custom response headers, Vary handling, and `x-http-method-override` (added to the cache key automatically when it differs from the underlying method) are covered in the source and condensed here.
- Corrected from the official docs: the source shows the REST request as `PATCH .../global/backendBuckets` without the bucket name (the Discovery document `compute.v1` defines `backendBuckets.patch` as `projects/{project}/global/backendBuckets/{backendBucket}`), and shows the disable command as `gcloud compute backend-services (create | update) (BACKEND_SERVICE_NAME | BACKEND_BUCKET_NAME) --no-bypass-cache-on-request-headers`; the flag is listed only for `update` in the gcloud 593.0.0 help of both `backend-buckets update` and `backend-services update`.
- Source: https://docs.cloud.google.com/cdn/docs/caching (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [using-cache-modes.md](./using-cache-modes.md)
- [using-cache-keys.md](./using-cache-keys.md)
- [cache-invalidation-overview.md](./cache-invalidation-overview.md)
