---
source: https://docs.cloud.google.com/cdn/docs/overview
---

# Cloud CDN overview

Cloud CDN uses Google's global edge network to serve content closer to users. It works with the global external Application Load Balancer or the classic Application Load Balancer, which provide the frontend IP addresses and ports and the backends (origin servers). The Google Front End (GFE) comprises Cloud CDN and the external Application Load Balancer.

## Signature / Usage

### Bypass the cache (direct origin URL)

To bypass Cloud CDN, request an object directly from a Cloud Storage bucket or a Compute Engine VM. A Cloud Storage object URL looks like this:

```text
https://storage.googleapis.com/STORAGE_BUCKET/FILENAME
```

## Options / Props

### How a request is served

| Concept | Behavior |
|---------|----------|
| Cache hit | The GFE finds a cached response, looks it up by cache key and answers directly. |
| Partial hit | Request served partly from cache and partly from a backend (byte range requests). |
| Cache miss | The GFE forwards the request to the external Application Load Balancer, then to an origin; a cacheable response is stored. |
| Cache egress / cache fill | Data transfer from a cache to a client / to a cache. |
| Cache hit ratio | Percentage of requests served from the cache (60% means 40% are retrieved from the origin). |

| How a request is served |
|---|
| The GFE uses Cloud CDN only if the load balancer URL map routes traffic to a backend service or backend bucket that has Cloud CDN configured. Backend services can use Compute Engine, GKE Ingress, or GKE Gateway backends. Hit and miss behavior is consistent across Compute Engine, backend buckets, GKE Ingress and GKE Gateway. |
| Cache hit ratio: the Cloud CDN console page shows the last few minutes per origin (`n/a` = not cached or not requested recently); the **Monitoring** tab of an origin shows 1 hour to 30 days. |

### Eviction and expiration

| Concept | Behavior |
|---------|----------|
| Insertion | Reactive only: an object is stored when a request goes through that cache and the response is cacheable. No replication between caches and no preloading except by causing caches to respond to requests. |
| Eviction | Caches are usually full and evict content that has not been accessed recently, regardless of expiration time. Setting an expiration time does not affect eviction. Multiple Google Cloud projects share a common pool of cache space (popularity is compared across projects). |
| Expiration | Configurable expiration time tells the cache not to serve old content even if it has not been evicted. |

### Security and integrations

| Integration | Details |
|-------------|---------|
| Google-managed SSL certificates | Can be used when Cloud CDN is enabled. |
| Google Cloud Armor | Two policy types: edge security policies (applied to Cloud CDN-enabled origins, apply to all traffic before CDN lookup) and backend security policies (enforced only for dynamic content, cache misses, or other requests destined for the origin). |
| Service Extensions | Plugins on global external Application Load Balancers run on the request path or response path, pre-cache, and can influence how content is cached. |
| GKE Gateway | Cache behavior is defined with `GCPHTTPFilter` resources attached to `HTTPRoute` resources (cache modes and TTL settings). |
| Global Front End (Preview) | Combines Cloud CDN, global external Application Load Balancers, Google Cloud Armor and Service Extensions under the Global Front End Enterprise billing tier. Cloud CDN can still use standalone pricing. |

## Notes

- Google Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) edge caching.
- Global Front End is marked Preview in the source ("Pre-GA Offerings Terms"; pre-GA features are available "as is" and might have limited support).
- Cloud CDN works with the global external Application Load Balancer or the classic Application Load Balancer; per-URL-map cache policies are global-only (see caching.md).
- Data location: content may be stored at serving locations outside the region or zone of the origin. Under the Service Specific Terms the Data Location Setting of other Cloud Platform Services does not apply to Core Customer Data when used with Cloud CDN; the source states that if you do not want this outcome, do not use Cloud CDN.
- Requests initiated by Cloud CDN (validation requests and byte range requests) are described in caching.md.
- Google Cloud Armor and Service Extensions detail pages: Cloud Armor is covered by the `gcp-security` skill; Service Extensions is in this skill.
- The source also shows Console steps and figures that are omitted here. Pricing is not copied; see https://cloud.google.com/cdn/pricing.
- Source: https://docs.cloud.google.com/cdn/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-cdn-product.md](./choose-cdn-product.md)
- [caching.md](./caching.md)
- [using-cache-modes.md](./using-cache-modes.md)
- [using-cache-keys.md](./using-cache-keys.md)
- [cache-invalidation-overview.md](./cache-invalidation-overview.md)
