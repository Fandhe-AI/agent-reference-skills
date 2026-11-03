---
source: https://developers.cloudflare.com/ai-search/api/migration/workers-binding-legacy/
---

# Workers binding (legacy `env.AI.autorag()`)

Legacy API: `env.AI.autorag("name")` exposes `aiSearch()` and `search()`. It keeps working; new projects should use the new bindings.

## Signature / Usage

```js
const answer = await env.AI.autorag("my-autorag").aiSearch({
	query: "How do I train a llama to deliver coffee?",
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	rewrite_query: true,
	max_num_results: 2,
	ranking_options: {
		score_threshold: 0.3,
	},
	reranking: {
		enabled: true,
		model: "@cf/baai/bge-reranker-base",
	},
	stream: true,
});
```

```js
const answer = await env.AI.autorag("my-autorag").search({
	query: "How do I train a llama to deliver coffee?",
	rewrite_query: true,
	max_num_results: 2,
	ranking_options: {
		score_threshold: 0.3,
	},
	reranking: {
		enabled: true,
		model: "@cf/baai/bge-reranker-base",
	},
});
```

## Options / Props

`aiSearch()`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `query` | string (required) | — | Input query. |
| `model` | string | instance generation model | Generation model. |
| `system_prompt` | string | — | System prompt for the answer. |
| `rewrite_query` | boolean | `false` | Rewrite to a search-optimized query. |
| `max_num_results` | number | `10` | 1 to 50. |
| `ranking_options.score_threshold` | number | `0` | 0 to 1. |
| `reranking.enabled` | boolean | `false` | Enable reranking. |
| `reranking.model` | string | — | Reranking model. |
| `stream` | boolean | `false` | Stream results. |
| `filters` | object | — | Legacy metadata filters. |

Response (non-stream): `object` (`vector_store.search_results.page`), `search_query`, `response` (aiSearch only), `data[]` (`file_id`, `filename`, `score`, `attributes.modified_date`, `attributes.folder`, `content[]` with `id`, `type`, `text`), `has_more`, `next_page`.

## Notes

- The source's `search()` parameter list shows the new-style `messages` / `ai_search_options` fields (`retrieval.filters`, `retrieval.max_num_results`, `retrieval.retrieval_type`, `retrieval.match_threshold`, `cache.enabled`, `reranking.enabled`) while its example passes `query`; the parameter list looks mis-pasted, so the example above is what is documented for legacy usage.
- Response shape is `data[]`, not `chunks[]`.

## Related

- [Migration from AutoRAG](./migration-from-autorag.md)
- [search()](./search.md)
