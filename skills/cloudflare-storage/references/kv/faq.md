---
source: https://developers.cloudflare.com/kv/reference/faq/
---

# FAQ

Frequently asked questions about Workers KV, including consistency, rate limits, and access methods.

## Signature / Usage

```js
// Reads can be cached up to the cacheTtl duration
const value = await env.NAMESPACE.get("key", { cacheTtl: 60 });
```

## Notes

- Workers KV can be used outside Workers via the REST API or Cloudflare SDKs, subject to REST API limits.
- Access method trade-offs: the Workers Binding API is generally faster than the REST API (no HTTP overhead), and the REST API has a lower write rate limit.
- Updated values may not be visible immediately because KV caches heavily; you may read a cached value for up to the cache TTL.
- KV is eventually consistent: data is stored in central stores and replicated to all locations via hybrid push/pull replication, so the previous value may be seen for as long as the cache TTL.
- A bulk request counts as a single operation against the 1,000 operations limit regardless of key count (e.g. 500 bulk KV requests plus 500 R2 requests).
- Rate limit: REST API operations share the Cloudflare REST API limits across all requests; Binding API writes are limited to 1 write per second per key, unlimited across keys.
- Pricing: each key-value pair in a REST API bulk `PUT` counts as one write; dashboard and Wrangler operations are billable; no egress charge; key expirations are not billed as delete operations.

## Related

- [how-kv-works.md](./how-kv-works.md)
- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
- [api-write.md](./api-write.md)
