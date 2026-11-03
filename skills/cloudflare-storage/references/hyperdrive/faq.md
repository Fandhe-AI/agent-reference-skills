---
source: https://developers.cloudflare.com/hyperdrive/reference/faq/
---

# FAQ

Answers on Hyperdrive connectivity, caching, pricing, and limits.

## Signature / Usage

Two bindings to the same database for read-after-write consistency:

```jsonc
{
	"hyperdrive": [
		{ "binding": "HYPERDRIVE", "id": "<CACHE_ENABLED_CONFIG_ID>" },
		{ "binding": "HYPERDRIVE_CACHE_DISABLED", "id": "<CACHE_DISABLED_CONFIG_ID>" }
	]
}
```

## Notes

- IPs: Hyperdrive connects from Cloudflare's IP ranges, shared by all configurations and other Cloudflare products.
- D1: not supported, because D1 gives fast connectivity from Workers by design and needs no connection round trips; Hyperdrive targets traditional regional SQL databases over TCP.
- Placement: yes if a Worker makes multiple queries per request (20-30ms down to 1-3ms per query). Use `placement.region` for databases in AWS, GCP, or Azure; `placement.host` for databases hosted elsewhere.
- Cache invalidation: no; a matching read can return a cached result until `max_age` expires, and during `stale_while_revalidate`.
- Read-after-write: use two bindings (cached and cache-disabled) to the same database; pass the cache-disabled client to ORM/auth libraries that need fresh reads.
- Pricing: no egress charge; available on the Free plan; no Hyperdrive compute charge (Workers compute billed per Workers pricing).

## Related

- [Query caching](./query-caching.md)
- [Pricing](./pricing.md)
- [Limits](./limits.md)
- [Firewall and networking configuration](./firewall-and-networking.md)
