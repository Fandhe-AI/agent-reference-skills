---
source: https://developers.cloudflare.com/pages/configuration/serving-pages/
---

# Serving Pages

Default route matching, 404 handling, SPA fallback, caching and response headers for Pages static assets.

## Signature / Usage

Headers Pages always adds to asset responses:

```txt
Access-Control-Allow-Origin: *
Cf-Ray: $CLOUDFLARE_RAY_ID
Referrer-Policy: strict-origin-when-cross-origin
Etag: $ETAG
Content-Type: $CONTENT_TYPE
X-Content-Type-Options: nosniff
Server: cloudflare
```

Headers added in some cases:

```txt
// if the asset has been encoded
Cache-Control: no-transform
Content-Encoding: $CONTENT_ENCODING

// if the asset is cacheable (the request does not have an `Authorization` or `Range` header)
Cache-Control: public, max-age=0, must-revalidate

// if requesting the asset over a preview URL
X-Robots-Tag: noindex
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Route matching | behavior | — | An HTML file at the matching path is served; `/contact.html` redirects to `/contact` and `/about/index.html` to `/about/`. |
| `404.html` | file | — | Closest `404.html` up the directory tree (ending at `/404.html`) is served for missing files. |
| SPA fallback | behavior | — | With no top-level `404.html`, Pages assumes a single-page app and serves the root (`/`) for any path that is not a static asset. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Pages auto-detects the SPA/404 behavior; in Workers it is explicit via `assets.not_found_handling` and `assets.html_handling` (see the cloudflare-workers skill, static-assets/routing).
- Avoid custom caching on a custom domain: assets stay on the Cloudflare CDN until the next deployment. For a proxied custom domain, Cache Rules and legacy Page Rules can cache responses in your zone before requests reach Pages; this cache is separate from Pages' built-in caching and can serve stale content after a deployment, and it can interfere with redirects and Functions. Cache Rules make sense for immutable, content-hashed files. Static assets are served from Tiered Cache automatically.
- If a custom caching rule serves stale content after a deployment, remove or narrow the rule, then purge the affected URLs in your custom domain's zone (purge by single file). Purging alone does not prevent stale content after future deployments. You can also use purge everything to clear all cached content in that zone.
- Source: https://developers.cloudflare.com/pages/configuration/serving-pages/ (fetched 2026-11-14, cloudflare-docs 34d908a)
- Pages sends `Etag` on `200` responses and answers a matching `If-None-Match` with `304`. Range requests currently return `200`; spec-compliant `206` partial responses are planned. Gzip and Brotli are used when possible.
- Assets are inserted into the cache per data center with a one-week TTL and can disappear at any time.
- Change these headers through the `_headers` file (for example to add Early Hints).

## Related

- [Headers](./headers.md)
- [Redirects](./redirects.md)
- [Early Hints](./early-hints.md)
- [Custom domains](./custom-domains.md)
