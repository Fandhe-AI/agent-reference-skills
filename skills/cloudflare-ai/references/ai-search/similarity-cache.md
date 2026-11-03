---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/
---

# Similarity cache

Serves cached responses for semantically similar prompts (MinHash plus Locality-Sensitive Hashing).

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		cache: {
			enabled: true,
			cache_threshold: "flexible_friend",
		},
	},
});
```

Purge all cached responses:

```sh
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/default/instances/$INSTANCE_NAME/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cache` | boolean | `true` | Instance-level toggle (binding create reference). |
| `cache_threshold` | string | `close_enough` | `super_strict_match` (exact), `close_enough` (strong), `flexible_friend` (broad), `anything_goes` (loose). |
| `cache_ttl` | number | `172800` | `600`, `1800`, `3600`, `7200`, `21600`, `43200`, `86400`, `172800`, `259200`, `518400` seconds (10 min to 6 days). |

## Notes

- Check the `cf-aig-cache-status` header: `HIT` or `MISS`.
- Cache is volatile (simultaneous similar requests may both miss) and tied to chunks: changed or deleted chunks clear it.
- Purging rotates the instance's internal cache key; also available from the dashboard settings.
- Do not enable AI Gateway caching on the connected gateway; use this cache instead (see models.md).
- Release note: default TTL is now 48 hours (previously a fixed 30 days).

## Related

- [Models and AI Gateway](./models.md)
- [search()](./search.md)
