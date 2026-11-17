---
source: https://docs.cloud.google.com/media-cdn/docs/overview
---

# Media CDN overview

Media CDN is Google Cloud's media delivery solution, optimized for high-throughput egress workloads such as streaming video and large file downloads. It complements Cloud CDN (web acceleration) and fetches content from publicly accessible HTTP endpoints (Cloud Storage, another cloud, or on-premises). Caching behavior is controlled per route.

## Signature / Usage

### How it works

Three components: a router, a cache and a cache filler (downstream user agent <-> router <-> cache <-> cache filler <-> upstream origin).

- The router and cache are configured by an `EdgeCacheService` resource (IP addresses, protocols, security and cache policies, routing configuration). The router uses the `HeaderAction` of `EdgeCacheService` to modify requests (header manipulation, path rewrites).
- The reverse proxy terminates user HTTP requests and matches them to a `Routing` configuration that defines how requests are routed, modified, cached and filled.
- On a cache miss the cache requests content from the upstream origin. The cache key is built from request parameters such as host, path and query parameters (configurable).
- The cache filler makes a new request on each origin contact, copies the headers of the original request and modifies it based on the settings in `EdgeCacheOrigin`. Because the cache sits downstream from the router, the filler only sees headers the router already modified and cannot undo router-level changes; it applies only the header configuration of the active `EdgeCacheOrigin`.

The source page has no code samples. Snippet taken from https://docs.cloud.google.com/media-cdn/docs/configuration (export a service configuration):

```bash
gcloud edge-cache services export SERVICE_NAME \
    --destination=my-service.yaml
```

## Options / Props

| Capability | Summary |
|------------|---------|
| SSL (TLS) certificates | Serves HTTPS from your own (bring-your-own) domain; no Google-hosted domain needed. No additional charge for serving SSL (TLS) traffic or for Google-managed SSL certificates. |
| Cloud Armor | Edge security policies: IP allowlists / denylists, geographic and layer 7 header filtering, decorate requests with custom headers, Google Threat Intelligence integration, ASN allow / block. |
| Extensibility | Service Extensions plugins in the request-response path (Preview), for example header normalization and custom tokenization. |
| Origin authentication | Private Cloud Storage buckets as origin; grant Media CDN access and authenticate requests. |
| Advanced routing | Fine-grained mapping of traffic to edge configurations and origins. |
| Client connectivity | HTTP/2 and QUIC from client to edge. |
| Cache invalidation | By host and URL path; by URL prefix and wildcard; by cache tags (including built-in tags for status, origin and media type). Parameters can be combined. |
| Custom HTTP headers | Request headers: static values; response headers: static and dynamic values. Use for client geo data (country, region, city), cache status / cache location, stripping or replacing headers. |
| Cloud Logging | Logs each HTTP request client-to-edge and Media CDN-to-origin, typically near real time; exportable to Cloud Storage or Pub/Sub. |
| Signed requests | Signed cookies and signed URLs scoped to an exact URL prefix, for a limited time and a specific client. |

## Notes

- Access: to get started, contact your Google Cloud sales representative or account team to enable Media CDN for your project, then use the quickstart.
- Signed requests use keys: keep private signing keys out of version control and logs; only the public keys go into an `EdgeCacheKeyset`.
- Do not include confidential, sensitive or personally identifiable information in URL paths or query parameters. URLs (host, path, query parameters) are treated as non-identifiable service data (Section 12, Resource Fields, of the Service Specific Terms); URL components should be opaque system-generated identifiers.
- Google Cloud Media CDN / Cloud CDN — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Cloud CDN is covered in the `gcp-load-balancing` skill's Cloud CDN pages; guidance on choosing between them: https://docs.cloud.google.com/media-cdn/docs/choose-cdn-product.
- Snippet taken from https://docs.cloud.google.com/media-cdn/docs/configuration (the overview page itself has no code).
- Source: https://docs.cloud.google.com/media-cdn/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration.md](./configuration.md)
- [origins.md](./origins.md)
- [routing.md](./routing.md)
- [caching.md](./caching.md)
