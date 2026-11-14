---
source: https://developers.cloudflare.com/ai-search/troubleshooting/api-error-codes/, https://developers.cloudflare.com/ai-search/troubleshooting/indexing-error-codes/
---

# Error codes (API and indexing)

API and public endpoint failures return numeric codes; indexing failures are asynchronous string codes recorded on items or instances.

## Signature / Usage

```json
{
	"success": false,
	"errors": [
		{
			"code": 7002,
			"message": "ai_search_not_found"
		}
	],
	"result": {}
}
```

## Options / Props

Common (HTTP status): `10000` Authentication error (401); `7001` internal_error (500); `7002` ai_search_not_found (404); `7017` unable_to_connect_to_ai_search (503); `7063` namespace_not_found (404); `7068` internal_invariant_violated (500); `7115` ai_search_models_unavailable (503).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `7010` | 400 | — | invalid_model. |
| `7012` | 400 | — | ai_search_instance_invalid_token (service API token). |
| `7013` | 403 | — | max_instances_reached. |
| `7018` | 400 | — | ai_gateway_not_found. |
| `7022` | 400 | — | Instance name already exists in the namespace. |
| `7023` / `7024` | 400 | — | Domain not owned / invalid domain (website source). |
| `7028` / `7029` | 400 | — | Missing sitemap / missing robots.txt. |
| `7034` / `7035` | 400 | — | robots.txt or sitemap forbids the crawler. |
| `7036` | 400 | — | Chunk size exceeds embedding model input limit. |
| `7040` | 400 | — | invalid_custom_header. |
| `7045` | 400 | — | specific_sitemaps only valid with `sitemap` parse type. |
| `7047` | 400 | — | invalid_url_location. |
| `7050` | 500 | — | fail_while_provisioning_managed_resources. |
| `7052` | 400 | — | type and source required for non-managed instances. |
| `7101` / `7102` / `7103` | 400 | — | discover needs a verified zone / `include_external_links` not allowed (legacy; the option is no longer documented, see website-parse-types.md) / sitemap needs owned zone. |
| `7104` | 409 | — | instance status modified concurrently (retry). |
| `7111` | 400 | — | source is not a valid URL or existing R2 bucket. |
| `7090`-`7093`, `7096`, `60018` | — | — | Custom domain errors (see custom-domains-and-access.md). |
| `7062` / `7064` / `7065` / `7066` / `7067` / `7099` | — | — | Namespace limit reached (403) / already exists (409) / cannot modify default (400) / not empty (400) / same name (400) / modified concurrently (409). |
| `7075` / `7076` | 404 / 409 | — | token_not_found / token_in_use_by_instances. |
| `7032` | 400 | — | Instance is paused. |
| `7041` / `7042` | 404 / 409 | — | item_not_found / item_key_already_exist. |
| `7044` | 503 | — | unable_to_sync_item. |
| `7053` | 400 | — | Operation needs a managed instance. |
| `7054` / `7055` / `7056` | 413 / 400 / 400 | — | File too large / `file` field missing / invalid metadata format. |
| `7058` / `7057` / `7105` | 400 | — | Invalid metadata filter / invalid datetime value / unknown filter field. |
| `7059` | 400 | — | Content download unavailable for external-source items. |
| `7060` / `7072` | 400 | — | Unsupported file type / filename over 128 characters. |
| `7095` / `7113` / `7114` | 429 / 499 / 429 | — | Item write rate limited / client disconnected / instance overloaded (honor `Retry-After`). |
| `7100` | 403 | — | Full page download unavailable for discover-crawled content. |
| `7020` / `7021` / `7046` | 429 / 404 / 400 | — | Sync cooldown (30 s) / job_not_found / job cannot be cancelled. |
| `7015` / `7016` | 400 | — | Legacy `or` filter limits (only `eq`, one key). |
| `7038` / `7039` | 400 | — | Missing user query. |
| `7069` | 429 | — | Monthly query quota exceeded. |
| `7070` | 400 | — | invalid_retrieval_type for the instance `index_method`. |
| `7071` | 401 | — | vectorize_authentication_failed. |
| `7073` | 500 | — | all_search_methods_failed. |
| `7080` | 400 | — | Filter not serializable. |
| `7089` | 400 | — | Image query requires a vector index. |
| `7049` / `7074` | 500 / 400 | — | Cross-instance search failed with `return_on_failure` off / more than 10 instances. |
| `2003` / `2016` / `2017` | 429 / 424 / 424 | — | AI Gateway rate limited / prompt blocked / response blocked. |
| `7011` / `7019` / `7030` / `7031` / `7033` | — | — | Workers AI invalid response (500) / error (400) / timeout (400) / AI Gateway timeout (400) / exception (502). |
| `7077` / `7078` / `7079` / `7117` | 401 / 402 / 413 / 400 | — | Gateway authentication / billing / context window exceeded / credential not found. |
| `7094` | 402 | — | workers_ai_free_allocation_exceeded. |
| `60001`-`60011`, `60016`-`60017`, `60019`, `60100` | — | — | Public endpoint errors: asset not found (404), hash missing (404), config not found (404), disabled (404), rate limited (429, `60005`), endpoint not found (404), MCP / search / chat endpoint disabled (401), method not allowed (405), invalid stats body (400), MCP POST only (405), asset fetch failed (503), search/chat POST only (405), internal error (500). |
| `60013`-`60015` | — | — | Namespace public endpoint errors: `60013` (404) the instances allowlist is empty, so no instance is searchable; `60014` (404) unsupported path; `60015` (400) request body is not a JSON object (an empty body is treated as `{}`). `60012` (malformed `instance_ids`) was removed (see namespace-public-endpoints.md). |

Indexing error codes (item-level, string):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| File and content | `unknown_error`, `over_size`, `unsupported_type`, `file_not_found`, `invalid_url`, `file_is_corrupt`, `file_is_password_locked`, `invalid_pdf`, `unable_to_convert_to_markdown`, `markdown_too_large`, `markdown_conversion_empty`, `file_content_empty`, `chunk_too_large_for_storage`, `timeout_error`, `file_length_exceed_embedding_model`, `file_too_large_for_embedder` | — | Fix or replace the file, enable OCR for scanned PDFs, then sync the item again. |
| Website crawl | `too_many_redirects`, `invalid_host_after_redirect`, `subdomains_not_allowed`, `blocked_by_robots_txt`, `blocked_by_robots_txt_path`, `blocked_by_content_signal`, `excluded_by_path_filter`, `network_connection_lost`, `crawl_got_http_error`, `crawl_got_http_401`, `crawl_got_http_403`, `crawl_got_http_429`, `blocked_by_payment`, `blocked_by_waf`, `blocked_by_bot_management`, `blocked_by_turnstile`, `http_4xx`, `http_5xx`, `unreachable_timeout`, `unreachable_dns`, `page_limit_reached`, `browser_rendering_*` | — | Allow the AI Search crawler through WAF/bot controls, fix robots.txt or origin health, configure authentication headers, or exclude with path filtering. `page_limit_reached`: Free plans crawl 500 pages/day. |
| Models and AI Gateway | `error_embedding_data_with_workers_ai`, `workers_ai_invalid_input`, `workers_ai_free_allocation_exceeded`, `workers_ai_internal_error`, `workers_ai_out_of_capacity_error`, `workers_ai_timeout_error`, `error_external_model_unknown_error`, `error_external_model_rate_limited`, `error_external_model_unauthorized`, `ai_gateway_request_blocked_firewall`, `ai_gateway_dlp_blocked`, `ai_gateway_response_blocked_firewall`, `ai_gateway_rate_limited` | — | Retry the sync, check provider credentials and Guardrails/DLP settings. |
| Storage and Vectorize | `r2_unknown_error`, `r2_internal_error`, `vectorize_rate_limited`, `vectorize_ingestion_timeout`, `vectorize_upstream_error`, `hybrid_search_indexing_failed`, `ai_search_is_full` | — | Retry; `ai_search_is_full` does not pause the instance (request a limit increase or add an instance). |
| D1 database (row-level) | `d1_document_empty`, `d1_document_too_large` (rendered document over 64 KiB), `d1_id_too_long` (text `id` over 512 bytes), `d1_metadata_too_large` (`id` and `meta_*` over 8,000 bytes as JSON) | — | Fix the row or the query, then run a source sync job; syncing the item alone does not read the row again. Other rows keep indexing. |
| D1 sync job errors | `d1_invalid_query`, `d1_read_only_violation`, `d1_forbidden_table`, `d1_invalid_columns`, `d1_missing_id_column`, `d1_invalid_metadata_field`, `d1_too_many_metadata_fields`, `d1_null_id`, `d1_invalid_id_type`, `d1_unsafe_integer_id`, `d1_duplicate_id`, `d1_mixed_id_types`, `d1_cursor_not_advancing`, `d1_no_rows`, `d1_too_many_rows`, `d1_timeout`, `d1_response_too_large`, `d1_rate_limited`, `d1_upstream_error`, `d1_malformed_response`, `d1_request_rejected`, `d1_invalid_database_id`, `d1_invalid_account_id` | — | End the sync job (job log shows `Error: <code>: <details>`) without pausing the instance or deleting items; the next sync retries. Fix the query or columns per data-source-d1.md and update the instance; for `d1_request_rejected` / `d1_invalid_*_id` contact support; for rate-limit and upstream errors use a longer sync interval. |
| Instance-level (pause indexing) | `r2_not_enabled`, `bucket_not_found`, `bucket_unauthorized`, `external_source_missing_api_token`, `bucket_name_invalid`, `invalid_custom_header`, `ai_gateway_not_configured`, `hybrid_search_is_full`; D1 pauses report a status instead of a code | — | Fix the cause, then resume the instance. D1: a token that cannot read the database pauses the instance with status `paused_invalid_api_token` (update `token_id`); a deleted database pauses it with `paused_source_parameters_are_invalid` (create a new instance; the database cannot be changed). |

## Notes

- The REST API and public endpoints return the JSON envelope above; the Workers binding throws `AiSearchNotFoundError` (404), `AiSearchInternalError` (5xx), or `AiSearchError` (other), with the AI Search message in `message`.
- Indexing errors are not returned by the original upload, sync, or crawl request: inspect item logs, item details, or instance stats. Retry one item by fixing it and syncing it again; for sources run a source sync job.
- Retry transient errors with exponential backoff; when contacting support give the error code, instance ID, and timestamp.
- Cross-instance partial results with `return_on_failure` return `errors: [{ instance_id, message: "search_failed" }]` without a numeric code.
- Several codes appear under multiple headings in the source with the same meaning; the two `missing_user_query` codes (`7038` chat, `7039` search) differ by endpoint.
- Indexing errors fall into three categories: item-level errors, sync job errors (D1 only; the instance is not paused and no items are deleted), and instance-level pauses.
- Source: https://developers.cloudflare.com/ai-search/troubleshooting/api-error-codes/ and https://developers.cloudflare.com/ai-search/troubleshooting/indexing-error-codes/ (pin 34d908a / fetched 2026-11-14)
- Condensed from two official pages; per-code recommended actions are on the official pages.

## Related

- [Syncing](./syncing.md)
- [Service API token](./service-api-token.md)
- [Limits and pricing](./limits-pricing.md)
- [D1 data source](./data-source-d1.md)
