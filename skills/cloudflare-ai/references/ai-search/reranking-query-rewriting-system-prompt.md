---
source: https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/, https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/, https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/
---

# Reranking, query rewriting, system prompt

Optional pipeline steps that reorder results, rewrite follow-up queries, and steer generation.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		reranking: {
			enabled: true,
			model: "@cf/baai/bge-reranker-base",
		},
	},
});
```

```ts
const instance = env.AI_SEARCH.get("my-instance");

const response = await instance.chatCompletions({
	messages: [
		{ role: "system", content: "You are a helpful assistant." },
		{ role: "user", content: "What is Cloudflare?" },
	],
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reranking` (instance) | boolean | `false` | Cross-encoder reorders results after retrieval (and fusion). |
| `ai_search_options.reranking.enabled` / `model` | boolean / string | `false` / — | Per-request override. |
| `rewrite_query` (instance) | boolean | `false` | Rewrite follow-up queries using conversation history. |
| `ai_search_options.query_rewrite.enabled` / `model` / `rewrite_prompt` | boolean / string / string | `false` / — / — | Per-request override. |
| Generation system prompt | text | Cloudflare default | Guides the final answer; sent in `messages` with `role: "system"` or configured on the instance. |
| Query rewrite system prompt | text | Cloudflare default | Guides rewriting; model sees the prompt and the user query. |

## Notes

- Rewriting needs the `messages` format (not `query`); the first message is used as-is. Example: `How do I deploy one?` after `What is Cloudflare Workers?` becomes `deploy Cloudflare Worker getting started`.
- Reranking runs on the results retrieved under `max_num_results` and the match threshold settings (`score_threshold` on the instance, or `match_threshold` per request).
- Source: https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/ (pin 34d908a / fetched 2026-11-14)
- Each step adds a model call and latency. Reranking is included in AI Search usage and does not appear in AI Gateway logs; rewriting and generation do.
- View the effective system prompt for any model call in AI Gateway logs.
- The official generation prompt example instructs the model to cite documents, note contradictions, say when documents are insufficient, and answer concisely in Markdown; the rewrite example expands terms and returns only the optimized query.

## Related

- [Result controls and boosting](./result-controls-and-boosting.md)
- [Models](./models.md)
- [chatCompletions()](./chat-completions.md)
