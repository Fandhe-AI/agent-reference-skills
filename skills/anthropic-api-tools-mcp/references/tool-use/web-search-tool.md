<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool / last verified: 2026-08-07 -->

# Web search tool

Server tool: real-time web search with cited sources; `_20260209`+ adds dynamic filtering via code execution.

## Signature / Usage

```json
{
  "type": "web_search_20260318",
  "name": "web_search",
  "max_uses": 5,
  "allowed_domains": ["example.com"],
  "user_location": {"type": "approximate", "city": "San Francisco", "country": "US"}
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | `web_search_20260318` (adds `response_inclusion`) / `web_search_20260209` (adds dynamic filtering) / `web_search_20250305` (basic) |
| max_uses | integer (optional) | Caps searches per request; excess returns `max_uses_exceeded` error |
| allowed_domains / blocked_domains | array (optional) | Mutually exclusive domain filter |
| user_location | object (optional) | `type: "approximate"` + any of `city`/`region`/`country` (ISO 3166-1 alpha-2)/`timezone` (IANA) |
| allowed_callers | array (optional) | Controls direct vs. code-execution invocation; `_20260209`+ defaults to `["code_execution_20260120"]` instead of `["direct"]` |
| response_inclusion | string (optional) | `_20260318`+ only; `"excluded"` drops nested code-execution search blocks from the response to cut output tokens; default `"full"` |

## Notes

- Dynamic filtering (`_20260209`+): Claude writes/runs code (inside code execution, auto-provisioned) to filter results before they reach context, cutting tokens on search-heavy requests; available on Claude 4.6+ and Claude Mythos Preview. Set `allowed_callers: ["direct"]` to disable it and call search directly (required on models without programmatic tool calling support, or the API 400s).
- Search results carry `encrypted_content` that must be round-tripped verbatim on later turns (decrypted server-side); missing/modified content is a 400 validation error. Citations (`web_search_result_location`) are always on for web search, with `url`/`title`/`encrypted_index`/`cited_text` (up to 150 chars) — these citation fields don't count toward token usage.
- Errors (200 response, error inside `content`): `too_many_requests`, `invalid_tool_input`, `max_uses_exceeded`, `query_too_long`, `request_too_large`, `unavailable`. A no-match search returns an empty `content` list, not an error.
- `pause_turn` on long searches (resend as-is); mixed with a client tool call in the same turn returns `stop_reason: "tool_use"` instead and the search runs after you return client tool results (see server-tools.md).
- Pricing: $10 per 1,000 searches (each search = one use regardless of result count; failed searches aren't billed) plus standard token costs for search content.
- Disabled per-org in Claude Console causes a 400 `invalid_request_error`, not an in-result error code.
- Domain/ZDR details: see server-tools.md.

## Related

- [web-fetch-tool](./web-fetch-tool.md)
- [server-tools](./server-tools.md)
- [code-execution-tool](./code-execution-tool.md)
