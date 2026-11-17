---
source: https://docs.cloud.google.com/load-balancing/docs/url-map-concepts
---

# URL maps overview

A URL map is the Google Cloud configuration resource that Application Load Balancers and Cloud Service Mesh use to route HTTP(S) requests to backend services or backend buckets, based on the hostname and path of each URL. This page covers URL map types, components (host rules, path matchers, path rules, route rules), order of operations, regular expressions, path templates, rewrites, and URL redirects.

## Signature / Usage

### Create a URL map with host and path rules (classic Application Load Balancer example)

```bash
gcloud compute url-maps create video-org-url-map \
    --default-service=org-site
```

```bash
gcloud compute url-maps add-path-matcher video-org-url-map \
    --path-matcher-name=video-matcher \
    --default-service=video-site \
    --path-rules=/video/hd=video-hd,/video/hd/*=video-hd,/video/sd=video-sd,/video/sd/*=video-sd
```

```bash
gcloud compute url-maps add-host-rule video-org-url-map \
    --hosts=example.net \
    --path-matcher-name=video-matcher
```

```bash
gcloud compute url-maps describe video-org-url-map
```

### Route rule with a regular expression on the path

```yaml
defaultService: projects/example-project/global/backendServices/org-site
name: rule-match-url-map
hostRules:
- hosts:
  - '*' # Match any host
  pathMatcher: video-matcher
- hosts:
  - example.net
  pathMatcher: video-matcher
pathMatchers:
- name: video-matcher
  # Optional: default service for this path matcher if no routeRules match
  defaultService: projects/example-project/global/backendServices/video-site
  routeRules:
  - priority: 100000
    matchRules:
    - regexMatch: /videos/hd.*
    routeAction:
      weightedBackendServices:
      - backendService: projects/example-project/global/backendServices/video-hd
        weight: 100
```

### Regular expression URL rewrite (`regexRewrite`)

Incoming `/region/us-central1/bucket/my-bucket/stage/dev/object.pdf` is rewritten to `/us-central1/my-bucket-dev/object.pdf`.

Adapted (not in the official docs): the `hostRules` entry that sends every host (`'*'`) to `region-matcher` is added; without it the source's URL map sends all requests to the top-level `defaultService` and the rewrite never runs.

```yaml
defaultService: projects/example-project/regions/us-central1/backendServices/default-bs
name: regex-rewrite-url-map
hostRules:
- hosts:
  - '*'
  pathMatcher: region-matcher
pathMatchers:
- name: region-matcher
  defaultService: projects/example-project/regions/us-central1/backendServices/default-bs
  routeRules:
  - matchRules:
    - prefixMatch: /region/
    priority: 1
    service: projects/example-project/regions/us-central1/backendServices/rewrite-bs
    routeAction:
      urlRewrite:
        regexRewrite:
          pathPattern: "/region/(?<reg>[a-z0-9-]+)/bucket/(?<bkt>[a-z0-9-]+)/stage/(?<stg>[a-z0-9-]+)/object\\.pdf"
          pathSubstitution: "/\\g<reg>/\\g<bkt>-\\g<stg>/object.pdf"
```

### Path template match and rewrite

This is the `pathMatchers` excerpt shown in the source: the URL map name, `defaultService` and the `hostRules` that point hosts at `cart-matcher` / `user-matcher` are not part of it and must be added, as in the examples above.

```yaml
pathMatchers:
  - name: cart-matcher
    routeRules:
      - description: CartService
        matchRules:
          - pathTemplateMatch: '/xyzwebservices/v2/xyz/users/{username=*}/carts/{cartid=**}'
        service: cart-backend
        priority: 1
        routeAction:
          urlRewrite:
            pathTemplateRewrite: '/{username}-{cartid}/'
  - name: user-matcher
    routeRules:
      - description: UserService
        matchRules:
          - pathTemplateMatch: '/xyzwebservices/v2/xyz/users/*/accountinfo/*'
        service: user-backend
        priority: 1
```

## Options / Props

### URL map resource type per product

| Product | Load-balancing scheme | URL map resource type | Supported destinations |
|---|---|---|---|
| Global external Application Load Balancer | `EXTERNAL_MANAGED` | Global (`urlMaps`) | Backend services, backend buckets |
| Classic Application Load Balancer | `EXTERNAL` | Global (`urlMaps`) | Backend services, backend buckets |
| Regional external Application Load Balancer | `EXTERNAL_MANAGED` | Regional (`regionUrlMaps`) | Backend services, backend buckets |
| Cross-region internal Application Load Balancer | `INTERNAL_MANAGED` | Global (`urlMaps`) | Backend services, backend buckets |
| Regional internal Application Load Balancer | `INTERNAL_MANAGED` | Regional (`regionUrlMaps`) | Backend services, backend buckets |
| Cloud Service Mesh | `INTERNAL_SELF_MANAGED` | Global or Regional | Backend services |

### Components

| Component | Behavior |
|---|---|
| Default backend service / bucket | Required: either a default backend service or a default backend bucket, not both. Used for any hostname without an applicable host rule. Backend buckets are not supported with Cloud Service Mesh. |
| Host rule (`hostRules`) | Maps one or more hostnames (exact match, or `*` / partial wildcard such as `*.example.net`) to a single path matcher. If the host is omitted the rule matches any requested host. Two host rules can't include the same hostname. Classic Application Load Balancer considers only the hostname (port ignored); all other Application Load Balancers can include a port, for example `example.net:8080`. |
| Path matcher (`pathMatchers`) | A default backend service or bucket (required, not both) plus path rules (`pathRules`) or route rules (`routeRules`). |
| Path rule | Maps a URL path to one backend service or bucket. A wildcard `*` is only allowed after `/` (`/videos/*` valid; `/videos*` not). No regular expressions or substring matching. Only one path rule per path. |
| Route rule | Advanced routing on path, headers and query parameters; supports flexible pattern matching, regex, route actions. |
| `prefixMatch` | Does not treat `*` as a wildcard; `*` is a literal character. |

### Relationships

| Relationships |
|---|
| A hostname can reference only one host rule; one host rule can process multiple hostnames. |
| A host rule references only one path matcher; multiple host rules can reference one path matcher. |
| Each unique URL goes to one backend service or bucket (path rules). Route rules with header / parameter matches, or weighted backend services (regional external Application Load Balancers and Cloud Service Mesh), can direct one URL to several backends. |
| One URL map can serve HTTP and HTTPS if both a target HTTP proxy and a target HTTPS proxy reference it. |

### Regular expressions (`regexMatch`)

| Field | Matches |
|---|---|
| `pathMatchers[].routeRules[].matchRules[].regexMatch` | Request path (query parameters and anchors removed first) |
| `pathMatchers[].routeRules[].matchRules[].headerMatches[].regexMatch` | A request header |
| `pathMatchers[].routeRules[].matchRules[].queryParameterMatches[].regexMatch` | A query parameter |

| Regular expressions (`regexMatch`) |
|---|
| A route rule matches when any of its `matchRules` is satisfied; predicates inside one `matchRule` have `AND` semantics. |
| Supported only for regional internal, cross-region internal, regional external and global external Application Load Balancers. Classic Application Load Balancers don't support regular expressions. |
| RE2 syntax is required (see RE2 specifications for URL maps). |
| Latency cost: a single regular expression adds about 100 microseconds per request; five regular expressions add about 200 microseconds per request. |

### Regex rewrite (`regexRewrite`) limits

| Item | Limit |
|---|---|
| `pathPattern` and `pathSubstitution` length | 250 characters each |
| Capture groups in `pathSubstitution` | Maximum 8, must be defined in `pathPattern` |
| URL rewrite actions per route rule | One; `regexRewrite` can't be combined with `pathPrefixRewrite` or `pathTemplateRewrite` |
| Supported products | Same four products as regex matching (not classic) |

### Path template operators (`pathTemplateMatch` / `pathTemplateRewrite`)

| Operator | Matches |
|---|---|
| `*` | A single path segment, not including the surrounding `/` |
| `**` | Zero or more characters, including `/`; if combined with other operators it must be last |
| `{name}` or `{name=*}` | Named variable matching one path segment |
| `{name=news/*}` | Named variable matching two segments (`news` and a `*` segment) |
| `{name=*/news/*}` | Named variable matching three segments |
| `{name=**}` | Named variable matching zero or more characters; must be last |

| Path template operators (`pathTemplateMatch` / `pathTemplateRewrite`) |
|---|
| Maximum five operators per template pattern. A variable name can appear only once per pattern; names are case-sensitive and must match `^[a-zA-Z][a-zA-Z0-9_]*$`. |
| Only variables used in `pathTemplateMatch` may be used in `pathTemplateRewrite`; variables can be reordered or omitted. |
| Query parameters are split off, then re-appended after the rewrite. Requests are not percent-encoding normalized. |
| The original client URL is available at the origin through the `x-client-request-url` and `x-envoy-original-path` headers. |

### URL redirect locations and examples

| Method | Configuration |
|---|---|
| URL map default redirect | Top-level `defaultUrlRedirect` |
| Path matcher default redirect | `pathMatchers[].defaultUrlRedirect` |
| Path rule redirect | `pathMatchers[].pathRules[].urlRedirect` |
| Route rule redirect | `pathMatchers[].routeRules[].urlRedirect` |

| You want (default URL redirect) | Fields under `defaultUrlRedirect` |
|---|---|
| `http://host.name/path` to `https://host.name/path` | `httpsRedirect: True` |
| `http://any-host-name/path` to `https://www.example.com/path` | `httpsRedirect: True`, `hostRedirect: "www.example.com"` |
| `http://any-host-name/path` to `https://www.example.com/newPath` | plus `pathRedirect: "/newPath"` |
| `http://any-host-name/originalPath` to `https://www.example.com/newPrefix/originalPath` | `httpsRedirect: True`, `hostRedirect: "www.example.com"`, `prefixRedirect: "/newPrefix"` |

## Notes

- Order of operations: 1. No host rule for the hostname: default backend service / bucket of the URL map. 2. Host rule found: its path matcher is consulted. An exact path rule match wins; otherwise the path rule ending in `/*` with the longest matching prefix; otherwise the path matcher's default.
- Regex rewrite (`regexRewrite`) limits: Capture groups use `(?<name>re)` or `(?P<name>re)` and are referenced as `\g<name>` or `\1`.
- Path template operators (`pathTemplateMatch` / `pathTemplateRewrite`): Supported for global external, regional external, regional internal and cross-region internal Application Load Balancers, and Cloud Service Mesh.
- URL redirect locations and examples: All examples use `kind: compute#urlMap` and a `name` such as `web-map-http`. `pathRedirect` replaces the entire path. `prefixRedirect` is a prefix prepend in a `defaultUrlRedirect` (matched path is always `/`) and a prefix replacement in a path rule / route rule `urlRedirect`.
- Application Load Balancers are named after their URL map. In the console the URL map gets the load balancer name; with gcloud / API the URL map name you choose is shown as the load balancer name.
- A path rule for `/video/*` (set with `--path-rules` on `gcloud compute url-maps add-path-matcher`) matches `/video/test1` but not `/video`.
- A request containing `/../` gets a 302 redirect to the normalized URL (for example `http://example.net/video/../abc` to `http://example.net/abc`); this redirect isn't logged in Cloud Logging.
- The load balancer doesn't validate the hostname; clients can set arbitrary `Host` values, so don't use the hostname for access control.
- Path rules can't emulate Apache `<LocationMatch>`; for dynamic path prefixes use a limited set of path rules or regex matching on your backends.
- Omitted to keep the page short: the `describe` output for `video-org-url-map`, the Console and API forms, the route-rule examples that match on a header (`headerMatches` with `regexMatch`) and on query parameters (`queryParameterMatches`), and the annotated `defaultUrlRedirect` example; the redirect fields are listed in the tables above and in `setting-up-global-http-https-redirect.md`.
- Not all URL map features are available for all products; see the Load balancer feature comparison page (routing and traffic management). Regional URL maps can be a service in App Hub applications.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the source says "Similarly for regional external Application Load Balancers and Cloud Service Mesh, weighted backend services on route actions can direct the same URL to multiple backend services or buckets", but its own route rule example above uses `weightedBackendServices` with global backend services, and the global external traffic management page (https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global, retrieved 2026-11-17) describes weight-based traffic splitting for global external Application Load Balancers. The weighted backend services quota is "not supported by classic" on the quotas page, so global external is not excluded.
- Corrected from the official docs: the source writes "A `--path-rule` for `/video/*`"; the gcloud 593.0.0 help for `gcloud compute url-maps add-path-matcher` names the flag `--path-rules=PATH=SERVICE,[...]`, as does the source's own example (`--path-rules=/video/hd=video-hd,...`).
- Corrected from the official docs: the source writes `pathMatchers[].defaultUrlRedirect[]`, but the Compute Engine v1 Discovery document defines `PathMatcher.defaultUrlRedirect` (like `UrlMap.defaultUrlRedirect`) as a single `HttpRedirectAction` object, not an array.
- Adapted from the official docs: the source's `regexRewrite` URL map defines `pathMatchers` (`region-matcher`) but no `hostRules`, so no host is mapped to the path matcher and requests go to the top-level `defaultService` (a URL map evaluates host rules first, then the selected path matcher). A `hostRules` entry for `'*'` was added.
- Source: https://docs.cloud.google.com/load-balancing/docs/url-map-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [traffic-management-global.md](./traffic-management-global.md)
- [setting-up-global-http-https-redirect.md](./setting-up-global-http-https-redirect.md)
- Use URL maps: https://docs.cloud.google.com/load-balancing/docs/url-map
- `gcloud compute url-maps create`: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/create (full flag list in the `gcp-compute` skill)
