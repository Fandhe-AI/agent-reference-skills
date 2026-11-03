---
source: https://developers.cloudflare.com/ai-search/api/instances/workers-binding/
---

# Namespace methods (get, list, create, delete)

Methods available only on the `ai_search_namespaces` binding handle (`env.AI_SEARCH`).

## Signature / Usage

```ts
const instance = env.AI_SEARCH.get("my-instance"); // synchronous, no network call

const { result, result_info } = await env.AI_SEARCH.list();
for (const i of result) {
	console.log(`${i.id} (${i.type}) - ${i.status}`);
}

const created = await env.AI_SEARCH.create({
	id: "my-docs",
	type: "web-crawler",
	source: "developers.cloudflare.com",
});

await env.AI_SEARCH.delete("old-docs");
```

Create an R2-backed instance:

```ts
const instance = await env.AI_SEARCH.create({
	id: "internal-docs",
	type: "r2",
	source: "my-docs-bucket",
});
```

## Options / Props

`get(name)` / `delete(name)`: `name` (string, required) is the instance name. `delete` returns `void` and throws if the instance does not exist.

`list()` parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | `1` | Page number. |
| `per_page` | number | `20` | Instances per page, max `100`. |
| `search` | string | — | Search instances by ID. |
| `order_by` | string | `created_at` | Sort column; only `created_at`. |
| `order_by_direction` | string | `desc` | `asc` or `desc`. |

`create()` parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string (required) | — | 1-64 chars matching `^[a-z0-9_]+(?:-[a-z0-9_]+)*$`. |
| `type` | string | inferred | `r2` or `web-crawler`. If omitted: HTTP(S) URL source selects `web-crawler`, existing R2 bucket selects `r2`, missing/blank source creates built-in storage; other sources return error `7111`. Workers binding does not accept `null`. |
| `source` | string | — | R2 bucket name or website domain. Required when `type` is set. |
| `source_params.prefix` | string | — | R2 key prefix to index. |
| `source_params.r2_jurisdiction` | string | — | R2 jurisdiction, e.g. `eu`. |
| `source_params.include_items` | string[] | — | Glob patterns to include. |
| `source_params.exclude_items` | string[] | — | Glob patterns to exclude. |
| `source_params.web_crawler.parse_type` | string | `sitemap` | `sitemap` or `discover`. |
| `source_params.web_crawler.parse_options.include_headers` | object | — | Custom crawl HTTP headers. |
| `source_params.web_crawler.parse_options.include_images` | boolean | — | Include images in the index. |
| `source_params.web_crawler.parse_options.specific_sitemaps` | string[] | — | Sitemap URLs; `sitemap` parse type only. |
| `source_params.web_crawler.parse_options.use_browser_rendering` | boolean | — | Use Browser Run to crawl JavaScript-rendered pages. |
| `source_params.web_crawler.discover_options.source` | string | `all` | `all`, `sitemaps`, `links`. |
| `source_params.web_crawler.discover_options.limit` | number | `100000` | 1 to 100000 pages. |
| `source_params.web_crawler.discover_options.depth` | number | `5` | 1 to 100000 link hops. |
| `source_params.web_crawler.discover_options.max_age` | number | `86400` | Cache reuse seconds, 0 to 604800. |
| `source_params.web_crawler.discover_options.include_external_links` | boolean | `false` | Follow links to other domains. |
| `source_params.web_crawler.discover_options.include_subdomains` | boolean | `false` | Follow subdomain links. |
| `source_params.web_crawler.store_options` | object | — | `storage_type` (`r2`), `storage_id`, `r2_jurisdiction`. |
| `index_method.vector` | boolean | `true` | Vector search. At least one of vector/keyword must be true. |
| `index_method.keyword` | boolean | `true` | Keyword (BM25) search. |
| `fusion_method` | string | `rrf` | `rrf` or `max`. |
| `indexing_options.keyword_tokenizer` | string | `porter` | `porter` or `trigram`. |
| `indexing_options.use_ocr` | boolean | `false` | OCR for PDFs and images. |
| `retrieval_options.keyword_match_mode` | string | `and` | `and` or `or`. |
| `retrieval_options.boost_by` | array | — | Max 3 items: `field` (max 64 chars), `direction` (`asc`, `desc`, `exists`, `not_exists`). |
| `sync_interval` | number | `21600` | Seconds between syncs; this page lists `3600`, `7200`, `14400`, `21600`, `43200`, `86400`. |
| `token_id` | string | — | Service API token UUID; needed only if you never created an instance before. |
| `ai_gateway_id` | string | — | Gateway for generation, query rewriting, external providers. |
| `embedding_model` | string | — | Embedding model. |
| `ai_search_model` | string | — | Text-generation model. |
| `rewrite_query` | boolean | `false` | Query rewriting. |
| `rewrite_model` | string | — | Rewriting model. |
| `reranking` | boolean | `false` | Reranking. |
| `reranking_model` | string | — | `@cf/baai/bge-reranker-base`. |
| `chunk_size` | number | — | Min `64`. |
| `chunk_overlap` | number | — | Min `0`. |
| `max_num_results` | number | — | Default max results, min `1`. |
| `score_threshold` | number | — | Default min score, min `0`. |
| `cache` | boolean | `true` | Response caching. |
| `cache_threshold` | string | `close_enough` | `super_strict_match`, `close_enough`, `flexible_friend`, `anything_goes`. |
| `cache_ttl` | number | `172800` | `600`, `1800`, `3600`, `7200`, `21600`, `43200`, `86400`, `172800`, `259200`, `518400`. |
| `custom_metadata` | array | — | `{ field_name, data_type }` with `text`, `number`, `boolean`, `datetime`. |
| `enable` | boolean | `true` | Whether the instance is enabled. |

`list()` response: `result[]` (`id`, `type`, `source`, `status`, `paused`, `namespace`, `created_at`, `modified_at`) and `result_info.total_count`.

## Notes

- `create()` returns an instance handle usable immediately for `search()`, `info()`, `stats()`, `items.upload()`.
- `delete()` permanently removes embeddings, chunks, and source files.
- Instance `status` values include `waiting`, `index_source`, `embed_files`, or `paused_*`.
- Inconsistency in the source: `sync_interval` here lists `3600` to `86400` with default `21600`, while the syncing page lists `900` to `86400` with default `86400` (see syncing.md).
- `Browser Run` is the current name of Browser Rendering in the source.

## Related

- [Instance methods](./instance-methods.md)
- [Data source: website](./data-source-website.md)
- [Service API token](./service-api-token.md)
