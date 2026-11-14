---
source: https://developers.cloudflare.com/ai-search/api/migration/workers-binding/, https://developers.cloudflare.com/ai-search/api/migration/rest-api/, https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/
---

# Migration from AutoRAG (legacy binding and REST API)

The `env.AI.autorag()` binding and the `/autorag/rags/` REST endpoints are the legacy API for AI Search. They keep working, but new features are only on the new bindings and `/ai-search/namespaces/{namespace}/instances/` endpoints.

## Signature / Usage

Before:

```ts
const result = await env.AI.autorag("my-instance").search({
	query: "What is Cloudflare?",
});
```

After (instance binding `MY_INSTANCE`):

```ts
const result = await env.MY_INSTANCE.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
});
```

Wrangler config:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "compatibility_date": "2026-03-27",
  "ai_search": [
    {
      "binding": "MY_INSTANCE",
      "instance_name": "my-instance"
    }
  ]
}
```

```ts
export interface Env {
	MY_INSTANCE: AiSearchInstance;
}
```

Filter migration (implicit equality plus range):

```ts
const result = await env.MY_INSTANCE.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			filters: {
				folder: "customer-a/",
				timestamp: { $gte: 1735689600000 },
			},
		},
	},
});
```

REST: legacy `POST /accounts/<ACCOUNT_ID>/autorag/rags/<INSTANCE_NAME>/ai-search` and `/search` become:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/default/instances/<INSTANCE_NAME>/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -d '{
    "messages": [
      {
        "content": "What is Cloudflare?",
        "role": "user"
      }
    ]
  }'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Wrangler config | legacy `ai` binding | — | New: `ai_search` or `ai_search_namespaces`. |
| Access | `env.AI.autorag("name")` | — | New: `env.MY_INSTANCE` or `env.AI_SEARCH.get("name")`. |
| Search format | `query` | — | New: `messages` array or `query` string. |
| Response | `data[]` | — | New: `chunks[]`. |
| `data[].file_id` | field | — | New `chunks[].id`. |
| `data[].filename` | field | — | New `chunks[].item.key`. |
| `data[].score` | field | — | New `chunks[].score`. |
| `data[].content[].text` | field | — | New `chunks[].text`. |
| `data[].attributes.modified_date` | field | — | New `chunks[].item.timestamp`. |
| Operators `eq ne gt gte lt lte` | legacy | — | New `$eq $ne $gt $gte $lt $lte`, plus new `$in`, `$nin`. |

Legacy filter shapes (`{ type: "eq", key, value }` and `{ type: "and"|"or", filters: [...] }`): `or` allows only `eq` on one key; no nesting of `and`/`or`. The legacy "starts with" trick used `gt` `customer-a//` and `lte` `customer-a/z`.

## Notes

- Minimum versions for the new bindings: `@cloudflare/workers-types` `4.20260304.0`, `wrangler` `4.68.1`.
- Token permission: legacy endpoints used the AutoRAG permission; new endpoints need AI & Machine Learning > AI Search (Read, Run, Edit). Account API tokens are recommended.
- Streaming: legacy streaming returned only the generated text; new streaming sends a `chunks` event first.
- The source migration examples now filter `timestamp` in milliseconds in both the legacy form (`"1735689600000"`) and the new form (`1735689600000`), consistent with the metadata page (built-in `timestamp` is Unix milliseconds, truncated to the minute).
- Source: https://developers.cloudflare.com/ai-search/api/migration/workers-binding/ and https://developers.cloudflare.com/ai-search/api/migration/rest-api/ (pin 34d908a / fetched 2026-11-14)
- The new REST API filters live under `ai_search_options.retrieval.filters` in the request body.

## Related

- [Legacy binding reference](./workers-binding-legacy.md)
- [Filtering](./filtering.md)
- [REST API: search and chat](./rest-api-search.md)
