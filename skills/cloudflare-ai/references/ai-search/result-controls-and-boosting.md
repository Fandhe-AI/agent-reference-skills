---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/result-controls/, https://developers.cloudflare.com/ai-search/configuration/retrieval/boosting/
---

# Result controls and relevance boosting

Control how many chunks are returned, the minimum score, and bias ranking by metadata.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			match_threshold: 0.5,
			max_num_results: 10,
			boost_by: [{ field: "timestamp", direction: "desc" }],
		},
	},
});
```

Instance-level boosting:

```ts
const instance = await env.AI_SEARCH.create({
	id: "my-instance",
	retrieval_options: {
		boost_by: [
			{ field: "timestamp", direction: "desc" },
			{ field: "priority", direction: "desc" },
		],
	},
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `match_threshold` | number | `0.4` | 0 to 1; filters on the vector similarity score, not the fused score. |
| `max_num_results` | integer | `10` | Max 50. |
| `reranking.match_threshold` | number | `0.4` | Separate threshold on reranking score. |
| `boost_by[].field` | string | — | Metadata field or built-in `timestamp`; case-insensitive; max 64 chars; unique per request. |
| `boost_by[].direction` | string | by type | `asc`, `desc`, `exists`, `not_exists`. |

Directions by field type: `datetime` and `number` support all four; `text` and `boolean` only `exists` / `not_exists`. Default: `asc` for number, datetime, timestamp; `exists` for text, boolean. `desc` favors higher values (recent), `asc` lower.

## Notes

- Pipeline order: retrieve up to 50 candidates, boost (additive to retrieval score), rerank if enabled, return top `max_num_results`. Boosting cannot promote a chunk that retrieval did not return.
- Max 3 boost fields; `asc`/`desc` on text or boolean errors. Per-request `boost_by` fully replaces the instance default; an empty array disables boosting (also removes instance-level boosting when passed to `update`).
- If no result meets the threshold, no response is generated.
- Larger `max_num_results` increases latency and cost.

## Related

- [Metadata attributes](./metadata-attributes.md)
- [Reranking, query rewriting, system prompt](./reranking-query-rewriting-system-prompt.md)
- [Filtering](./filtering.md)
