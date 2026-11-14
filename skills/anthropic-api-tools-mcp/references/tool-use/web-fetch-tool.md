<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool / last verified: 2026-11-14 -->

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
| max_uses | integer (optional) | Caps fetches per turn (no default limit); failed fetches count; fetches from earlier requests of the same turn (after `pause_turn` or a `tool_result`-only message) count unless run from code execution via dynamic filtering. Direct overrun gives `max_uses_exceeded`; overrun from code ends that code run with an error |
| allowed_domains / blocked_domains | array (optional) | Mutually exclusive |
| citations.enabled | boolean (optional) | Disabled by default (unlike web search, which is always on) |
| max_content_tokens | integer (optional) | Approximate truncation limit for text content; does not apply to binary (PDF) content |
| url_sources | object (optional) | Controls which sources make a URL fetchable: keys `user_input` (`all`\|`none`), `client_tool_results` and `server_tool_results` (`all`\|`none`\|`only`\|`except` with a `tools` list of `tool_reference` objects); each defaults to `{"type": "all"}`. Works with all four versions |
| use_cache | boolean (optional) | `_20260309`+; `false` bypasses cache for fresh content (default `true`); increases latency |
| response_inclusion | string (optional) | `_20260318`+; `"excluded"` drops nested code-execution fetch blocks; default `"full"` |

## Notes

- Security: Claude cannot dynamically construct URLs — it can only fetch URLs that already appeared in the conversation (user messages, client tool results, or prior web search/fetch results), not URLs it generates itself or that come from container-based server tools (code execution, bash). Still carries residual data-exfiltration risk in untrusted-input environments; mitigate with `max_uses`, `allowed_domains`, or disabling the tool entirely.
- URL validation: a URL that appears only in the system prompt is not fetchable; also include it in a user message. Results of other server-side tools (code execution, MCP connector, tool search) are not an allowed source. Client-side tool results are allowed even when they echo text Claude produced (for example, a command that prints its input).
- A URL that appears to contain a credential (such as an API key or password) is refused with `url_not_allowed` unless that credential appears in the system prompt or in the text of a user message; a credential only in a tool result does not count. To fetch such a URL, include it in a user message.
- `invalid_tool_input` covers, for example, a malformed URL or a non-HTTP(S) scheme.
- Platform availability: Claude API, Claude Platform on AWS, Microsoft Foundry Claude Models on Google Cloud (Anthropic managed), and Microsoft Foundry (deployments hosted on Azure support only `web_fetch_20250910`, no dynamic filtering / response inclusion / cache bypass; hosted on Anthropic supports all versions). Managed Agents (Claude API, Claude Platform on AWS): on by default in the agent toolset; only domain lists (no paths) and `max_content_tokens` are settable, not `max_uses`, `citations`, `cache_control`. Claude Mythos Preview: Claude API and Microsoft Foundry only. Dynamic filtering needs Claude 4.6+ or Mythos Preview.
- Does not support JavaScript-rendered (SPA) websites; for pages needing a real browser see the browser use tool.
- `url_sources` example: to stop a code-running client tool's output from counting as a URL source, use `"client_tool_results": {"type": "except", "tools": [{"type": "tool_reference", "name": "run_code"}]}`; to exclude all client tool results use `{"type": "none"}`. Each named tool must exist in `tools`. Under `except` a tool added later counts as a source; under `only` it does not.
- ZDR: eligible (excludes Covered Models) but dynamic filtering is not eligible for ZDR or HIPAA; HIPAA not eligible. Publishers may retain URL/request data.
- Dynamic filtering (`_20260209`+): runs via auto-provisioned code execution, no need to add that tool yourself; useful for extracting sections from long docs/PDFs and cutting token cost.
- Response `content` is a `document` block: `text/plain` source for HTML/text, `base64`/`application/pdf` for PDFs; includes `retrieved_at` timestamp. Results are cached (may not reflect the latest page version) — use `use_cache: false` for fresh content.
- Errors (200 response): `invalid_tool_input`, `url_too_long` (>250 chars), `url_not_allowed` (domain filter/org restriction/robots.txt/private address), `url_not_in_prior_context` (also when the URL appeared only in sources excluded by `url_sources`), `content_too_large` (fetched PDF would exceed PDF page/size limits, counting PDFs/images already in the conversation), `url_not_accessible`, `too_many_requests`, `unsupported_content_type` (only text/HTML/PDF), `max_uses_exceeded`, `unavailable`.
- Combined search+fetch: when both tools are enabled and the user names a resource without a URL, Claude searches first then fetches.
- Pricing: **no additional charge** beyond standard token costs. Typical usage: ~2,500 tokens for a 10 kB page, ~25,000 for a 100 kB doc, ~125,000 for a 500 kB PDF — use `max_content_tokens` to cap.
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool (fetched 2026-11-14)
- `pause_turn` / mixed-turn mechanics: see server-tools.md.

## Related

- [web-search-tool](./web-search-tool.md)
- [server-tools](./server-tools.md)
- [code-execution-tool](./code-execution-tool.md)
