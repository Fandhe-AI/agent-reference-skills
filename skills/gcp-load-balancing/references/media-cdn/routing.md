---
source: https://docs.cloud.google.com/media-cdn/docs/routing
---

# Configure service routes

Media CDN routes are defined in the `routing` section of an `EdgeCacheService`. Routes match requests on (at least) a host, then on path, headers and query parameters. Each route can define its own CDN configuration, rewrites, redirects, CORS policy, custom headers and origin mapping; routes can share origins.

## Signature / Usage

### Edit routes with gcloud and YAML

Export the service, edit the YAML, then import it (replace `SERVICE_NAME` with the service name and `FILENAME` with the YAML file name).

```bash
gcloud edge-cache services export SERVICE_NAME \
    --destination=FILENAME.yaml
```

```bash
gcloud edge-cache services import SERVICE_NAME \
    --source=FILENAME.yaml
```

### Match on host, header, query parameter and path prefix

```yaml
name: prod-service
routing:
  hostRules:
  - hosts:
    - media.example.com
    pathMatcher: example_routes
  pathMatchers:
  - name: example_routes
    routeRules:
    - priority: 10
      origin: staging-live-origin
      matchRules:
      - prefixMatch: /vod/
        headerMatches:
        - headerName: "x-staging-client"
          presentMatch: true
        queryParameterMatches:
        - name: "live"
          exactMatch: "yes"
      routeAction:
        cdnPolicy:
          defaultTtl: 5s
```

### Capture path variables and rewrite

```yaml
routing:
  hostRules:
  - hosts:
    - media.example.com
    pathMatcher: example_routes
  pathMatchers:
  - name: example_routes
    routeRules:
    - priority: 1
      matchRules:
      # Matches a request of "/us/en/hls/123139139/segments/00001.ts"
      - pathTemplateMatch: "/{country}/{lang}/{format}/{id}/{file=**}"
      origin: my-origin
      routeAction:
        urlRewrite:
          # Rewrites to "/123139139/hls/segments/00001.ts"
          pathTemplateRewrite: "/{id}/{format}/{file}"
```

`/us/en/hls/123139139/segment_00001.ts` is rewritten to `/123139139/hls/segment_00001.ts`; `/us/123139139/master.m3u8` does not match and gets HTTP `404`; `/br/es/dash/c966cbbe6ae3/subtitle_00001.vtt` is rewritten to `/c966cbbe6ae3/dash/subtitle_00001.vtt`.

### Host matching

Adapted (not in the official docs): the wildcard host `*.vod.example.com` is quoted because an unquoted leading `*` is not valid YAML.

```yaml
name: prod-service
routing:
  hostRules:
  - hosts:
    - media.example.com
    - "*.vod.example.com"
    pathMatcher: example_routes
  pathMatchers:
  - name: example_routes
    routeRules:
    # list of routes for the configured hosts
    - priority: 999
      matchRules:
      - prefixMatch: /
      origin: DEFAULT_ORIGIN
```

### Redirects

Redirect all requests to HTTPS at the service level:

```bash
gcloud edge-cache services update SERVICE_NAME \
    --require-tls
```

### CORS policy

```yaml
routeRules:
- priority: 1
  matchRules:
  - prefixMatch: /stream/
  routeAction:
    cdnPolicy:
      defaultTtl: 3600s
    corsPolicy:
      allowOrigins:
      - "https://stream.example.com"
      - "https://stream-staging.example.com"
      maxAge: 86400s # some browsers might only honor up to 7200s or less
      allowMethods:
      - "GET"
      - "HEAD"
      - "OPTIONS"
      allowHeaders:
      - "Content-Type"
      - "If-Modified-Since"
      - "Range"
      - "User-Agent"
      exposeHeaders:
      - "Content-Type"
      - "Content-Length"
      - "Date"
```

## Options / Props

### Path match types (exactly one per `matchRules[]` entry)

| Field | Description |
|---|---|
| `fullPathMatch` | Matches the full URL path (no query string); trailing slashes must be specified. `fullPathMatch: "/stream/"` matches `/stream/` but not `/stream` or `/stream/us/hls/1234.ts`. |
| `prefixMatch` | Matches URLs starting with the string; `prefixMatch: "/videos/"` matches `/videos/hls/58481314/manifest.m3u8`. |
| `pathTemplateMatch` | Wildcard operators and named variables; `"/**.m3u8"` matches any path ending in `.m3u8`. |

### Wildcard syntax

| Operator | Matches |
|---|---|
| `*` | One path segment, up to the next `/`. `/videos/*/*/*.m4s` matches `/videos/123414/hls/1080p5000_00001.m4s`. |
| `**` | Zero or more path segments; if present, must be the last operator. |
| `{name}` or `{name=*}` | Named variable matching one path segment. |
| `{name=videos/*}` | Named variable matching more than one segment (`/videos/{language=lang/*}/*` on `/videos/lang/en/video.m4s` sets `language` to `lang/en`). |
| `{name=**}` | Named variable matching zero or more segments; if present, must be the last operator. |

| Wildcard syntax |
|---|
| Use plain `*` / `**` if not rewriting. Parts not captured by a variable cannot be referenced in `pathTemplateRewrite`; variables not in the `pathTemplateMatch` of the same route cannot be used. Variables are case-sensitive. |
| Up to 10 operators (wildcards or variables) in a match; `pathTemplateMatch` and `pathTemplateRewrite` must not exceed 255 characters. |

### Route priority

| Route priority |
|---|
| Highest priority is `1`, lowest is `999`; each rule needs a unique priority between 1 and 999 inclusive (no two `routeRules` with the same priority). |
| Put more specific (longer) matches at a higher priority (smaller number); a `/live/` rule at priority 1 would prevent `/live/us/` at priority 2 from ever matching. |
| Catch-all route: lowest priority (for example 999), `prefixMatch: /`, and one of `origin` or `urlRedirect`. |
| Header and query matching is a logical AND across all specified keys (and values). Routes with more specific conditions need a higher (smaller number) priority than broader routes matching the same path. |

### URL rewrites

| Field | Description |
|---|---|
| `urlRewrite.pathPrefixRewrite` | Replaces the whole prefix matched by `prefixMatch`. Only one of `pathPrefixRewrite` / `pathTemplateRewrite` per route rule. |
| `urlRewrite.pathTemplateRewrite` | Only with a `pathTemplateMatch` on the same route. |
| `urlRewrite.hostRewrite` | Rewrites the host before sending to the origin. |

### Redirects

| Value | HTTP status |
|---|---|
| `MOVED_PERMANENTLY_DEFAULT` | 301 (Moved Permanently) |
| `FOUND` | 302 (Found) |
| `SEE_OTHER` | 303 (See Other) |
| `TEMPORARY_REDIRECT` | 307 (Temporary Redirect) |
| `PERMANENT_REDIRECT` | 308 (Permanent Redirect) |

### CORS policy fields (`routing.pathMatchers[].routeRules[].routeAction.corsPolicy`)

| Field | Description |
|---|---|
| `allowOrigins` | Sets `Access-Control-Allow-Origin`. If set to `*`, Media CDN reflects the request `Origin` value instead of returning a literal `*`. |
| `maxAge` | Sets `Access-Control-Max-Age` (preflight cache, seconds; maximum 86400s); some browsers cap at 2 hours or less. |
| `allowMethods` | Sets `Access-Control-Allow-Methods`; default supports only `GET`, `HEAD`, `OPTIONS` (see method filtering). |
| `allowHeaders` | Sets `Access-Control-Allow-Headers`. |
| `exposeHeaders` | Sets `Access-Control-Expose-Headers`. |
| `allowCredentials` | Sets `Access-Control-Allow-Credentials`; omitted when false. |
| `disabled` | Disables the policy without removing it; preflight `OPTIONS` requests are proxied to the origin. |

## Notes

- Path match types (exactly one per `matchRules[]` entry): A route must have a `matchRule` with exactly one of `prefixMatch`, `fullPathMatch` or `pathTemplateMatch`, otherwise the API returns an error. Unmatched requests get HTTP `404` unless another route or a catch-all route exists. Unmatched hosts get a default `404` page; to accept any host include `*` as a `hostRules[].hosts[]` entry.
- Host matching: Host (or HTTP/2 `:authority`) values containing a port match implicitly. Over HTTP, `*.vod.example.com` matches `us.vod.example.com` and `us.vod.example.com:80`; over HTTPS it matches `us.vod.example.com:443`. Each service has a single security policy, so one service per market (geography) or workload is generally recommended.
- Method filtering: By default only `GET`, `HEAD`, `OPTIONS` are proxied to the origin. Per route, `routeMethods.allowedMethods` can also allow `PUT`, `POST`, `DELETE`, `PATCH`. Methods not enabled for a route are rejected with HTTP `405 (Method Not Allowed)`. Retries and failover apply only to `GET`, `HEAD`, `OPTIONS`; an unsafe method failing on the first attempt gets `502 Bad Gateway`.
- Path normalization: Consecutive slashes are merged (`/videos///12345/manifest.mpd` becomes `/videos/12345/manifest.mpd`); dot segments are removed per RFC 3986 (`/a/b/c/./../../g` becomes `/a/g`) before cache lookup or origin forwarding. Percent-encoding is not normalized (`%2F` is not decoded). URLs are case-sensitive and not case-normalized.
- URL rewrites: Rewrites do not change the cache key (based on the client request URL) and occur after route matching and signed request validation; routes are not re-matched. Host and path rewrites can be combined in one route.
- Redirects: Three types: host redirects (host only), path redirects (replace the full path), path prefix redirects (replace the matching prefix). Default is HTTP 301; `redirectResponseCode` values: `MOVED_PERMANENTLY_DEFAULT` (301), `FOUND` (302), `SEE_OTHER` (303), `TEMPORARY_REDIRECT` (307), `PERMANENT_REDIRECT` (308).
- Redirects: A route can set either `origin` or `urlRedirect`, not both. HTTPS redirects require at least one SSL certificate attached to the service. `--require-tls` (service `requireTls: true`) overrides per-route `urlRedirect.httpsRedirect` settings; all HTTP traffic gets `301`.
- `corsPolicy` takes precedence over `routeAction.responseHeadersToAdd`: Media CDN overwrites any manually defined `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials` and `Access-Control-Expose-Headers`, and does not merge with origin-provided CORS headers. `OPTIONS` requests matching a route with a CORS policy are served directly from Media CDN. `{origin_request_header}` is populated with the client `Origin` header and can be used as a custom response header value.
- Example blocks omitted to keep the page short (see the source page): wildcard routes on manifest and segment file extensions, header and query parameter matching, catch-all route, priority ordering, method filtering (`routeMethods.allowedMethods`), `pathPrefixRewrite`, the `urlRedirect` route example, and the Amazon S3 third-party backend route with `hostRewrite`. The fields they use are described in the tables above.
- Troubleshooting: `GET` requests with a body, or any request with trailers, are rejected with HTTP `400`.
- Adapted from the official docs: the source writes the host list as `- *.vod.example.com` (unquoted), which is invalid YAML; it is quoted here. The source's first CORS example (`corsPolicy: maxAge: 600 allowOrigins: ["stream.example.com"] allowHeaders: ["X-Client-ID"]` on a single line) is not valid YAML and was omitted; use the full `corsPolicy` example above.
- The `--require-tls` block is shown with a bash tag; the source tagged it yaml. Console steps, the `Strict-Transport-Security` header mention and the rest of the console flow are omitted.
- Signed-URL and signed-cookie keys (`EdgeCacheKeyset` public keys are shared; the matching private signing keys are not): never commit or share private key files, and do not print them to logs or put key material on a command line.
- Do not include confidential, sensitive or personally identifiable information in URL paths or query parameters (treated as non-identifiable service data); use opaque identifiers.
- Google Cloud Media CDN — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Warning: `allowOrigins: "*"` makes Media CDN reflect whatever `Origin` a request sends, so every site is allowed; do not combine it with `allowCredentials` unless every origin is trusted, and prefer listing specific origins.
- Source: https://docs.cloud.google.com/media-cdn/docs/routing (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [caching.md](./caching.md)
- [origins.md](./origins.md)
- [configuration.md](./configuration.md)
- [overview.md](./overview.md)
