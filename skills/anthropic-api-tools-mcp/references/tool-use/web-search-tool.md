<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool / last verified: 2026-11-14 -->

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
| max_uses | integer (optional) | Caps searches per turn (single-fact queries typically use 1-3); failed searches count. Direct overrun returns `max_uses_exceeded` error; overrun from code ends that code run with an error. Earlier requests of the same turn (after `pause_turn` or a `tool_result`-only message) count unless run via dynamic filtering |
| allowed_domains / blocked_domains | array (optional) | Mutually exclusive domain filter; sending both returns 400 |
| user_location | object (optional) | `type: "approximate"` + any of `city`/`region`/`country` (ISO 3166-1 alpha-2)/`timezone` (IANA) |
| allowed_callers | array (optional) | Controls direct vs. code-execution invocation; `_20260209`+ defaults to `["code_execution_20260120"]` instead of `["direct"]` |
| response_inclusion | string (optional) | `_20260318`+ only; `"excluded"` drops nested code-execution search blocks from the response to cut output tokens; default `"full"` |

## Notes

- Dynamic filtering (`_20260209`+): Claude writes/runs code (inside code execution, auto-provisioned) to filter results before they reach context, cutting tokens on search-heavy requests; available on Claude 4.6+ and Claude Mythos Preview. Set `allowed_callers: ["direct"]` to disable it and call search directly (required on models without programmatic tool calling support, or the API 400s).
- Search results carry `encrypted_content` that must be round-tripped verbatim on later turns (decrypted server-side); missing/modified content is a 400 validation error. Citations (`web_search_result_location`) are always on for web search, with `url`/`title`/`encrypted_index`/`cited_text` (up to 150 chars) — these citation fields don't count toward token usage.
- When Claude searches: for requests that depend on current, changing, or outside-training information (recent events, current prices / rates / scores, specific organizations, people, or products that may have changed, explicit requests to search). It answers directly for stable knowledge (established facts, math, science fundamentals, coding concepts, creative writing, analysis of content already in the conversation, greetings). Triggering is steerable through the system prompt; for a hard constraint use `max_uses`.
- To check support from code, read `capabilities.server_tools.web_search.supported` from the Models API. Claude Mythos Preview: web search is supported on the Claude API, Claude Models on Google Cloud (Google managed), and Microsoft Foundry.
- Platform availability: Claude API, Claude Platform on AWS, Claude Models on Google Cloud (Anthropic managed), Microsoft Foundry (hosted on Anthropic) support all versions; Google Cloud (Google managed) and Microsoft Foundry (hosted on Azure) support only basic `web_search_20250305` (no dynamic filtering). Managed Agents (Claude API, Claude Platform on AWS): on by default in the agent toolset; domain lists and `user_location` are settable on the toolset's `web_search` entry, not `max_uses`, `citations`, `cache_control`.
- `user_location.country` unsupported ISO code returns 400; provide at least one of city/region/country/timezone. Zero data retention and HIPAA: eligible (excludes Covered Models) except dynamic filtering, which is not eligible for either.
- Errors (200 response, error inside `content`): `too_many_requests`, `invalid_tool_input`, `max_uses_exceeded`, `query_too_long`, `request_too_large` (typically a long domain filter list), `unavailable`. A no-match search returns an empty `content` list, not an error.
- `pause_turn` on long searches (resend as-is); mixed with a client tool call in the same turn returns `stop_reason: "tool_use"` instead and the search runs after you return client tool results (see server-tools.md).
- Pricing: $10 per 1,000 searches (each search = one use regardless of result count; failed searches aren't billed) plus standard token costs for search content.
- Disabled per-org in Claude Console causes a 400 `invalid_request_error`, not an in-result error code.
- Domain/ZDR details: see server-tools.md.
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool (fetched 2026-11-14)

## Related

- [web-fetch-tool](./web-fetch-tool.md)
- [server-tools](./server-tools.md)
- [code-execution-tool](./code-execution-tool.md)
