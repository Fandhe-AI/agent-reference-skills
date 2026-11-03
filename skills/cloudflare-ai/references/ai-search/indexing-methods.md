---
source: https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/, https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/, https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/
---

# Indexing methods: vector, keyword, hybrid

`index_method` selects the indexes built for an instance. Hybrid (vector plus keyword with fusion) is the default.

## Signature / Usage

```ts
const instance = await env.AI_SEARCH.create({
	id: "my-instance",
	index_method: {
		vector: true,
		keyword: true,
	},
	fusion_method: "rrf",
});
```

Per-request override:

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			retrieval_type: "hybrid",
			fusion_method: "rrf",
		},
	},
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `index_method.vector` | boolean | `true` | Vector (semantic) search via the built-in Vectorize index. |
| `index_method.keyword` | boolean | `true` | Keyword (BM25) search. At least one of vector/keyword must be true. |
| `fusion_method` | string | `rrf` | `rrf` (Reciprocal Rank Fusion, recommended) or `max` (higher normalized score). |
| `indexing_options.keyword_tokenizer` | string | `porter` | `porter` (stemming, natural language) or `trigram` (3-char windows, code). |
| `retrieval_options.keyword_match_mode` | string | `and` | `and` all terms; `or` any term. Overridable per request. |
| `retrieval.retrieval_type` (request) | string | `hybrid` | `vector`, `keyword`, `hybrid`; must match `index_method`. |

`scoring_details`: `vector_score`, `keyword_score` (raw BM25), `vector_rank`, `keyword_rank`, `fusion_method`, `reranking_score`.

## Notes

- Changing `index_method` or `keyword_tokenizer` triggers a full reindex; turning keyword off deletes the keyword index.
- The embedding model sets vector dimensions and cannot change after creation.
- Japanese, Chinese, and Korean: `porter` splits on spaces and punctuation and may return no keyword results; use `trigram` (words shorter than three characters cannot match alone).
- An incompatible `retrieval_type` returns error `7070`.
- Limits: keyword-enabled instances hold up to 500,000 files on Workers Paid versus 1,000,000 for vector-only.
- Vector index internals: Vectorize is a sibling category.

## Related

- [Result controls and boosting](./result-controls-and-boosting.md)
- [Models](./models.md)
- [Vectorize](../vectorize/README.md)
