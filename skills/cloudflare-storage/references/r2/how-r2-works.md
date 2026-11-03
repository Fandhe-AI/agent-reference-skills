---
source: https://developers.cloudflare.com/r2/how-r2-works/
---

# How R2 works

R2 is an S3-compatible, strongly consistent object storage service with no egress fees, built on Cloudflare's global network.

## Signature / Usage

```txt
Write: Gateway (auth) -> Metadata Service (key, placement) -> Distributed Storage (encrypted, replicated) -> Metadata commit -> HTTP 200
Read:  Gateway (auth) -> Metadata lookup -> Tiered read cache or Distributed Storage -> decrypt -> client
```

## Options / Props

| Component | Role |
| --- | --- |
| R2 Gateway | Entry point for all API requests; handles authentication and routing logic. Deployed across Cloudflare's global network via Cloudflare Workers. |
| Metadata Service | Distributed layer built on Durable Objects that stores and manages object metadata (e.g. object key, checksum) for strong consistency. Includes a built-in cache layer. |
| Tiered Read Cache | Caching layer in front of the Distributed Storage Infrastructure; uses Cloudflare Tiered Cache to serve data closer to the client. |
| Distributed Storage Infrastructure | Persistently stores encrypted object data. |

## Notes

- Client interfaces: Cloudflare Workers Binding, S3-compatible API, and a REST API that powers the Cloudflare Dashboard and Wrangler CLI. All requests route through the R2 Gateway.
- Write sequence: request handling at the edge and authentication; Gateway gets the encryption key from the Metadata Service and picks a storage cluster within the bucket's location; encrypted data is written and replicated within the region (e.g. ENAM); the Metadata Service commits metadata, making the object visible. Only after this commit is an `HTTP 200` sent, preventing unacknowledged writes.
- Read sequence: authentication, metadata lookup, retrieval of the encrypted object from the tiered read cache (or from distributed storage data centers within the region), decrypt and serve.
- Performance: affected by bucket location, request origin, and access patterns. Enable Local Uploads for cross-region upload performance. Enable Cloudflare Cache with a custom domain so reads can bypass the R2 Gateway and be served from edge cache (cached data may not reflect the latest version immediately).

## Related

- [Consistency model](./reference-consistency.md)
- [Durability](./reference-durability.md)
- [Data location](./reference-data-location.md)
- [Data security](./reference-data-security.md)
- [Local uploads](./buckets-local-uploads.md)
