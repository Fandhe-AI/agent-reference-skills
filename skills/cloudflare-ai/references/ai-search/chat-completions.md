---
source: https://developers.cloudflare.com/ai-search/api/search/workers-binding/
---

# chatCompletions()

Retrieves relevant content from an instance and generates a response grounded in it. Supports Server-Sent Events streaming and cross-instance calls.

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance");

const response = await instance.chatCompletions({
	messages: [
		{ role: "system", content: "You are a helpful documentation assistant." },
		{ role: "user", content: "What is Cloudflare?" },
	],
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	ai_search_options: {
		retrieval: {
			max_num_results: 5,
		},
		query_rewrite: {
			enabled: true,
		},
	},
});
```

### Streaming

```ts
const instance = env.AI_SEARCH.get("my-instance");

const stream = await instance.chatCompletions({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	stream: true,
});

return new Response(stream, {
	headers: {
		"content-type": "text/event-stream",
		"cache-control": "no-cache",
	},
});
```

### Cross-instance (namespace binding)

```ts
const response = await env.AI_SEARCH.chatCompletions({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		instance_ids: ["product-docs", "customer-abc123"],
	},
});
```

## Options / Props

Accepts the same `messages` and `ai_search_options` as `search()` (see search.md), plus:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `model` | string | instance generation model | Text-generation model; see models.md. |
| `stream` | boolean | `false` | Return a `ReadableStream` of SSE events. |
| `ai_search_options.instance_ids` | string[] | — | Namespace calls only; required, 1 to 10. |

Non-streaming response: `id`, `object` (`chat.completion`), `created`, `model`, `choices[].message.role` (`assistant`), `choices[].message.content`, `choices[].finish_reason`, `usage.prompt_tokens` / `completion_tokens` / `total_tokens`, `chunks[]` (same shape as search; namespace calls add `chunks[].instance_id` and `errors[]`).

## Notes

- Streaming: the retrieved chunks arrive first as an `event: chunks` event, then `chat.completion.chunk` events with `choices[0].delta.content`, ending with `data: [DONE]`.
- If no result meets the match threshold, no response is generated.
- Legacy `env.AI.autorag().aiSearch({ stream: true })` returned only the streamed text, without chunks.

## Related

- [search()](./search.md)
- [Reranking, query rewriting, system prompt](./reranking-query-rewriting-system-prompt.md)
- [Models](./models.md)
