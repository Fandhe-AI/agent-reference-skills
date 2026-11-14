---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/, https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/
---

# Metadata filtering

Narrow search results by metadata attributes. The filter is applied before retrieval.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			filters: {
				folder: "docs/getting-started/",
				timestamp: { $gte: 1735689600000 },
			},
		},
	},
});
```

"Starts with" a folder:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "folder": { "$gte": "docs/", "$lt": "docs0" } }
		}
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `$eq` | operator | implicit | Equals; a bare value is `$eq`. |
| `$ne` | operator | — | Not equals. |
| `$in` | operator | — | Stored scalar matches any candidate; does not search inside arrays. |
| `$nin` | operator | — | Excludes a stored scalar matching any candidate. |
| `$lt` / `$lte` | operator | — | Less than / or equal. |
| `$gt` / `$gte` | operator | — | Greater than / or equal. |

## Notes

- Multiple keys are an implicit AND; combine bounds for ranges (`{ "timestamp": { "$gte": 1735689600000, "$lt": 1735862400000 } }`).
- `{ "folder": "docs/" }` matches only files directly in the folder; use the range form for subfolders (`0` sorts after `/`).
- Only the first 64 UTF-8 bytes of indexed strings are filterable; Vectorize does not filter string arrays.
- Legacy AutoRAG filter format (`{ type: "eq", key, value }`, compound `and`/`or`, `or` limited to `eq` on one key) is documented in migration-from-autorag.md.
- The binding reference page names the operators without `$`; the filtering page and examples use `$` forms, which this page follows.
- The built-in `timestamp` filter value is in Unix milliseconds (examples updated from seconds in the previous pin).
- Source: https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/ (pin 34d908a / fetched 2026-11-14)
- Errors: `7058` invalid filter, `7105` unknown field, `7057` invalid datetime.

## Related

- [Metadata attributes](./metadata-attributes.md)
- [Migration from AutoRAG](./migration-from-autorag.md)
- [search()](./search.md)
