<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool / last verified: 2026-08-07 -->

# Web fetch tool

Server tool: retrieves full content (text/HTML/PDF) from specific URLs already present in the conversation; `_20260209`+ adds dynamic filtering.

## Signature / Usage

```json
{
  "type": "web_fetch_20260318",
  "name": "web_fetch",
  "max_uses": 5,
  "citations": {"enabled": true},
  "max_content_tokens": 100000
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | `web_fetch_20260318` (adds `response_inclusion`) / `web_fetch_20260309` (adds `use_cache`) / `web_fetch_20260209` (dynamic filtering) / `web_fetch_20250910` (basic) |
| max_uses | integer (optional) | Caps fetches per request (no default limit); failed fetches count against it |
| allowed_domains / blocked_domains | array (optional) | Mutually exclusive |
| citations.enabled | boolean (optional) | Disabled by default (unlike web search, which is always on) |
| max_content_tokens | integer (optional) | Approximate truncation limit for text content; does not apply to binary (PDF) content |
| use_cache | boolean (optional) | `_20260309`+; `false` bypasses cache for fresh content (default `true`); increases latency |
| response_inclusion | string (optional) | `_20260318`+; `"excluded"` drops nested code-execution fetch blocks; default `"full"` |

## Notes

- Security: Claude cannot dynamically construct URLs — it can only fetch URLs that already appeared in the conversation (user messages, client tool results, or prior web search/fetch results), not URLs it generates itself or that come from container-based server tools (code execution, bash). Still carries residual data-exfiltration risk in untrusted-input environments; mitigate with `max_uses`, `allowed_domains`, or disabling the tool entirely.
- Does not support JavaScript-rendered (SPA) websites.
- Dynamic filtering (`_20260209`+): runs via auto-provisioned code execution, no need to add that tool yourself; useful for extracting sections from long docs/PDFs and cutting token cost.
- Response `content` is a `document` block: `text/plain` source for HTML/text, `base64`/`application/pdf` for PDFs; includes `retrieved_at` timestamp. Results are cached (may not reflect the latest page version) — use `use_cache: false` for fresh content.
- Errors (200 response): `invalid_tool_input`, `url_too_long` (>250 chars), `url_not_allowed` (domain filter/org restriction/robots.txt/private address), `url_not_in_prior_context`, `url_not_accessible`, `too_many_requests`, `unsupported_content_type` (only text/HTML/PDF), `max_uses_exceeded`, `unavailable`.
- Combined search+fetch: when both tools are enabled and the user names a resource without a URL, Claude searches first then fetches.
- Pricing: **no additional charge** beyond standard token costs. Typical usage: ~2,500 tokens for a 10 kB page, ~25,000 for a 100 kB doc, ~125,000 for a 500 kB PDF — use `max_content_tokens` to cap.
- `pause_turn` / mixed-turn mechanics: see server-tools.md.

## Related

- [web-search-tool](./web-search-tool.md)
- [server-tools](./server-tools.md)
- [code-execution-tool](./code-execution-tool.md)
