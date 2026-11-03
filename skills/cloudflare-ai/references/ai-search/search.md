---
source: https://developers.cloudflare.com/ai-search/api/search/workers-binding/
---

# search()

Returns scored content chunks with source references from an instance, or merged across several instances from the namespace binding.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
});
```

### Cross-instance search (namespace binding)

```ts
const results = await env.AI_SEARCH.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		instance_ids: ["product-docs", "customer-abc123"],
	},
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | array (required unless `query`) | — | Each item has `role` (`system`, `developer`, `user`, `assistant`, `tool`) and `content`. Workers binding accepts string content; use REST or a public endpoint for image/file parts. |
| `query` | string | — | Text query, alternative to `messages` (provide one, not both). |
| `ai_search_options.custom_metadata` | object | — | Up to two string/number/boolean entries added to AI Gateway logs. Keys `ai-search`, `task`, `origin`, and `cf.*` are reserved. |
| `ai_search_options.retrieval.retrieval_type` | string | `hybrid` | `vector`, `keyword`, `hybrid`. |
| `ai_search_options.retrieval.match_threshold` | number | `0.4` | 0 to 1. |
| `ai_search_options.retrieval.max_num_results` | integer | `10` | 1 to 50. |
| `ai_search_options.retrieval.filters` | object | — | Metadata filters; see filtering.md. |
| `ai_search_options.retrieval.context_expansion` | integer | `0` | Surrounding chunks, 0 to 3. |
| `ai_search_options.retrieval.fusion_method` | string | instance setting | `rrf` or `max`. |
| `ai_search_options.retrieval.keyword_match_mode` | string | `and` | `and` or `or`. |
| `ai_search_options.retrieval.boost_by` | array | — | Max 3 `{ field, direction }`. |
| `ai_search_options.retrieval.metadata_only` | boolean | — | Return metadata without text. |
| `ai_search_options.retrieval.return_on_failure` | boolean | `true` | Return partial results on step failure. |
| `ai_search_options.query_rewrite.enabled` | boolean | `false` | Rewrite the query. |
| `ai_search_options.query_rewrite.model` | string | — | Rewrite model. |
| `ai_search_options.query_rewrite.rewrite_prompt` | string | — | Custom rewrite prompt. |
| `ai_search_options.reranking.enabled` | boolean | `false` | Rerank results. |
| `ai_search_options.reranking.model` | string | — | `@cf/baai/bge-reranker-base`. |
| `ai_search_options.reranking.match_threshold` | number | `0.4` | Min reranked score. |
| `ai_search_options.cache.enabled` | boolean | — | Override instance cache. |
| `ai_search_options.cache.cache_threshold` | string | — | `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`. |
| `ai_search_options.instance_ids` | string[] | — | Namespace search only; required, 1 to 10 instance IDs. |

Response fields: `query_kind` (`text`, `image`, `multimodal`), `search_query` (omitted for image-only), `chunks[]` with `id`, `type`, `score`, `text`, `item.key`, `item.timestamp`, `item.metadata`, and `scoring_details` (`vector_score`, `keyword_score`, `keyword_rank`, `vector_rank`, `reranking_score`, `fusion_method`). Namespace search adds `chunks[].instance_id` and `errors[]` (`instance_id`, `message`).

## Notes

- Filter operators: the options text on the source page names `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, but the filtering page and all examples use `$`-prefixed Vectorize-style operators; use the `$` forms (see filtering.md).
- Image and file content parts (up to 10 MiB decoded) need the REST API or a public endpoint.
- Legacy `env.AI.autorag().search()` uses a different response shape; see workers-binding-legacy.md.

## Related

- [chatCompletions()](./chat-completions.md)
- [Filtering](./filtering.md)
- [Result controls and boosting](./result-controls-and-boosting.md)
