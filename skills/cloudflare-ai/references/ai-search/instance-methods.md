---
source: https://developers.cloudflare.com/ai-search/api/instances/workers-binding/
---

# Instance methods (update, info, stats, jobs)

Methods on an instance handle (`env.AI_SEARCH.get(name)`) or directly on an `ai_search` binding.

## Signature / Usage

```ts
const updated = await env.AI_SEARCH.get("my-instance").update({
	ai_search_model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	reranking: true,
});

const info = await env.AI_SEARCH.get("my-instance").info();
const stats = await env.AI_SEARCH.get("my-instance").stats();

const jobs = await env.AI_SEARCH.get("my-instance").jobs.list({
	page: 1,
	per_page: 20,
});

const job = await env.AI_SEARCH.get("my-instance").jobs.create({
	description: "Index updated content",
});

const one = await env.AI_SEARCH.get("my-instance")
	.jobs.get("job-id-123")
	.info();

const cancelled = await env.AI_SEARCH.get("my-instance")
	.jobs.get("job-id-123")
	.cancel();

const logs = await env.AI_SEARCH.get("my-instance")
	.jobs.get("job-id-123")
	.logs({ page: 1, per_page: 20 });
```

## Options / Props

`update()` accepts a partial of the create parameters. Only included fields change.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ai_search_model` | string | — | Text-generation model. |
| `embedding_model` | string | — | Embedding model. |
| `index_method` | object | — | `{ vector: boolean, keyword: boolean }`. |
| `fusion_method` | string | — | `rrf` or `max`. |
| `indexing_options` | object | — | `keyword_tokenizer`, `use_ocr`. |
| `retrieval_options` | object | — | `keyword_match_mode`, `boost_by`. |
| `reranking` | boolean | — | Toggle reranking. |
| `reranking_model` | string | — | Reranking model. |
| `rewrite_query` | boolean | — | Toggle query rewriting. |
| `rewrite_model` | string | — | Rewriting model. |
| `source` | string | — | Data source location. |
| `cache` | boolean | — | Toggle response caching. |
| `cache_ttl` | number | — | Seconds. |
| `chunk_size` | number | — | Chunk tokens. |
| `chunk_overlap` | number | — | Overlap tokens. |
| `score_threshold` | number | — | Min score. |
| `max_num_results` | number | — | Max results. |
| `custom_metadata` | array | — | Metadata field definitions. |
| `sync_interval` | number | — | Seconds between syncs. |

`stats()` response fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `queued` / `running` / `completed` / `error` / `skipped` / `outdated` | number | — | Item counts per status. |
| `last_activity` | string | — | ISO 8601 timestamp. |
| `file_embed_errors` | object | — | Map of file IDs to embedding errors. |
| `engine.vectorize.vectorsCount` | number | — | Stored vectors. |
| `engine.vectorize.dimensions` | number | — | Embedding dimensions. |
| `engine.r2.payloadSizeBytes` | number | — | Payload bytes. |
| `engine.r2.metadataSizeBytes` | number | — | Metadata bytes. |
| `engine.r2.objectCount` | number | — | Objects in storage. |

`info()` returns `id`, `type`, `source`, `namespace`, `status`, `paused`, `created_at`, `modified_at`, the model and retrieval settings above, `cache_threshold`, and `last_activity`.

## Notes

- `jobs.create({ description })`: description up to 255 characters. Job objects: `id`, `source` (`user` or `schedule`), optional `description`, `last_seen_at`, `started_at`, `ended_at`, `end_reason`. Logs: `id`, `message`, `message_type`, `created_at`, plus `result_info`.
- `stats()` is the polling endpoint for indexing completion.
- User-triggered syncs have a 30 second cooldown (error `7020`).
- The source shows the `index_method` shape escaped as `\{ ... \}`; it is a type shape, not shorthand.

## Related

- [Namespace methods](./namespace-methods.md)
- [Syncing](./syncing.md)
- [Items (Workers binding)](./items-workers-binding.md)
