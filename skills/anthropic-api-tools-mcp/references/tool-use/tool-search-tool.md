<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool / last verified: 2026-08-07 -->

# Tool search tool

Server tool: Claude discovers and loads tools on demand from a large catalog instead of every definition loading upfront, cutting context bloat and improving selection accuracy.

## Signature / Usage

```json
{"type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex"}
```

```json
{"name": "get_weather", "description": "...", "input_schema": {"...": "..."}, "defer_loading": true}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | `tool_search_tool_regex_20251119` (Python `re.search()` patterns, case-insensitive, max 200 chars) or `tool_search_tool_bm25_20251119` (natural language, max 500 chars) — two variants, neither supersedes the other |
| defer_loading | boolean | On individual tool defs; excluded from context until discovered via search. Never set on the tool search tool itself. Max 10,000 deferred tools per request |

## Notes

- Every tool's full definition (including deferred ones) must still be sent in `tools` on every request — the API needs them server-side to run search and expand `tool_reference` blocks; `defer_loading` controls what enters context, not what you send.
- Response shape: `server_tool_use` (the search call, never needs a `tool_result`) → `tool_search_tool_result` with `tool_references` array (up to 5 matches by default) → the API auto-expands references into full tool definitions before Claude sees them → Claude's own `tool_use` on the discovered tool, executed and answered normally. A no-match search returns an empty `tool_references` array, not an error.
- Continuing the conversation: pass the assistant content back unchanged (including `server_tool_use`/`tool_search_tool_result`), add your `tool_result` for the discovered tool, resend the same full `tools` array. Never return a `tool_result` for the search's `srvtoolu_...` id.
- Custom client-side tool search is supported: return standard `tool_result` with `tool_reference` content blocks from your own search tool (e.g. embeddings-based) — every referenced tool must still have a `defer_loading: true` definition in `tools`.
- MCP toolsets configure `defer_loading` once on `mcp_toolset`'s `default_config` (or per-tool in `configs`), not per individual tool.
- Errors: 400 `invalid_request_error` if all tools are deferred or a `tool_reference` has no matching definition; 200-with-error-body `tool_search_tool_result_error` codes `invalid_tool_input`, `unavailable`, `too_many_requests`, `execution_time_exceeded`.
- A `defer_loading: true` tool cannot also carry `cache_control` (400 error) — put the cache breakpoint on a non-deferred tool instead; prompt-cache prefix is preserved regardless since deferred tools are excluded from it (see tool-use-with-prompt-caching.md).
- Use when 10+ tools, tool defs exceed ~10k tokens, selection accuracy is degrading, aggregating 200+ MCP tools, or the toolset grows over time. Not worth it below 10 tools / <100 tokens of definitions / every tool used every request. Keep the 3-5 most-used tools non-deferred.
- Not separately metered — loaded tool definitions count as normal input tokens; `usage.server_tool_use` has no tool-search-specific field.
- Model support: Claude Fable 5, Mythos 5, Opus 5, Opus 4.8/4.7/4.6, Sonnet 4.6, Opus 4.5, Sonnet 4.5, Haiku 4.5 (not Opus 4.1 or earlier). Bedrock supports it only via InvokeModel, not Converse.

## Related

- [manage-tool-context](./manage-tool-context.md)
- [tool-use-with-prompt-caching](./tool-use-with-prompt-caching.md)
- [define-tools](./define-tools.md)
