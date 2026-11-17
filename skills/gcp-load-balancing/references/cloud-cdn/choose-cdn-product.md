---
source: https://docs.cloud.google.com/cdn/docs/choose-cdn-product
---

# Choose a CDN product

Cloud CDN is Google Cloud's web acceleration CDN for static and dynamic latency-sensitive web assets (CSS, JavaScript, HTML, images). Media CDN complements it for high-throughput egress such as streaming video and large downloads. The source compares them like Cloud SQL (small queries at scale) versus BigQuery (throughput and extreme scale).

## Signature / Usage

Cloud CDN origins on Cloud Storage use backend buckets; to list them:

```bash
gcloud compute backend-buckets list
```

## Options / Props

### Use cases

| Use case | Recommended CDN product |
|----------|-------------------------|
| Workloads with both standard web and media content (social media) | Two configurations: Cloud CDN for static website assets with an external Application Load Balancer for APIs, and Media CDN for streaming video, downloads or other high-throughput content. |
| Serve a website quickly | Cloud CDN: very small objects at high rates (ad tech, ecommerce); static JavaScript, CSS, fonts, inline images. |
| Large software downloads | Media CDN if demand is large; Cloud CDN if downloads are a small fraction of the web workload. |
| HLS and DASH streaming | Media CDN (origin shielding, Tbps-scale capacity, detailed logging and metrics). |
| Strong compliance needs (firmware downloads for government or healthcare) | Cloud CDN (FedRAMP authorization). Unless signed requests are used, cached content is typically publicly accessible by URL; consider your own DRM or encryption. |
| User-generated image content | Cloud CDN for most image-serving platforms. |

### Exceptions

| Use case | Suggestion |
|----------|------------|
| RTMP delivery | Neither product supports RTMP to clients; use a regional external passthrough Network Load Balancer for legacy RTMP, or the Live Stream API to package RTMP sources into HLS/DASH for Media CDN. |
| WebRTC | Not supported; use a regional external passthrough Network Load Balancer. |
| WebSockets | Use a global external Application Load Balancer (WebSocket traffic is not cacheable). |
| Sensitive workloads (health data, user-specific data) | Do not use Cloud CDN or Media CDN. |

### Feature comparison (Cloud CDN / Media CDN)

| Feature | Cloud CDN | Media CDN |
|---------|-----------|-----------|
| Origins: Cloud Storage, Compute Engine, GKE, external backends, App Engine / Cloud Run functions / Cloud Run | Yes | Yes |
| Origin failover | No | Yes |
| Configurable timeouts | Yes | Yes |
| Request collapsing (coalescing) | Yes | Yes |
| Origin shielding | No | Yes |
| Custom cache keys, cache mode overrides, programmatic invalidation, configurable TTLs, negative caching, cache bypass | Yes | Yes |
| Asynchronous content validation (serve while stale) | Yes | No |
| Per-route cache policies, dynamic compression | Yes | Yes |
| Built-in CORS policies | No | Yes |
| HTTP/3, HTTP/2, HTTP/1.1, TLS 1.3, TLS 1.2, global Anycast IPv4 and IPv6 | Yes | Yes |
| Early data for TLS 1.3; TLS 1.0 and 1.1 for legacy devices | Yes | No |
| Managed SSL (TLS) certificates | Yes | Yes |
| Managed SSL (TLS) certificates, no additional cost | No | Yes |
| Bring-your-own SSL (TLS) certificates, no additional cost | No | Yes |
| Service Extensions plugins | Yes | Yes (Preview) |
| Signed URLs, signed cookies, HMAC-SHA1 | Yes | Yes |
| Signed tokens, dual-token authentication, header and IP attributes in signed requests, Ed25519 and HMAC-SHA-256 | No | Yes |
| Private origin authentication | Yes | Yes (S3-compatible buckets) |
| Compliance: PCI-DSS, SOC1/2/3, ISO 27001/27017/27018/27701 | Yes | Yes |
| Compliance: HIPAA, FedRAMP Moderate | Yes | No |

## Notes

- Google Cloud CDN / Media CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) edge networks.
- Multi-CDN: you can transition between Cloud CDN and Media CDN, or run one as an additional CDN, by using DNS or Cloud DNS server policies (https://docs.cloud.google.com/dns/docs/policies, handled by the `gcp-networking` skill); a primary CDN serves most traffic and a secondary serves a minority as failover.
- The feature table above is condensed from the source's tables (origin, caching, routing, protocols, logging, automation, security, edge computing, content authentication, compliance); consult the source for per-feature links.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/list (gcloud 593.0.0 help).
- Source inconsistency: the exceptions list says "Don't use Cloud CDN or Media CDN for serving sensitive workloads or user-specific data" and gives health data as an example, while the same source marks HIPAA as supported by Cloud CDN in the feature comparison and recommends Cloud CDN for firmware downloads for "government agencies or healthcare providers". Both statements are kept as written.
- Source: https://docs.cloud.google.com/cdn/docs/choose-cdn-product (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [caching.md](./caching.md)
