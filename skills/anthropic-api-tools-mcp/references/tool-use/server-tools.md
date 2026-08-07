<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools / last verified: 2026-08-07 -->

# Server tools

Shared mechanics for Anthropic-executed tools: the `server_tool_use` block, `pause_turn` continuation, mixed server/client turns, ZDR, and domain filtering.

## Signature / Usage

```json
{
  "type": "server_tool_use",
  "id": "srvtoolu_01A2B3C4D5E6F7G8H9",
  "name": "web_search",
  "input": {"query": "latest quantum computing breakthroughs"}
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| server_tool_use.id | string | `srvtoolu_` prefix distinguishes server calls from client `toolu_` calls |
| stop_reason: pause_turn | — | Server-side agentic loop paused on a long turn; resume by resending the assistant content as-is |
| allowed_domains / blocked_domains | array | Domain allowlist/blocklist on web-accessing server tools; mutually exclusive |

## Notes

- No `tool_result` needed for server tools — the API executes and returns the result block (paired to `server_tool_use` by `tool_use_id`) in the same assistant turn, unless mixed with a client tool call (see below).
- `pause_turn`: re-send the paused assistant content as-is (same `tools` array) to continue; a paused turn can end with an unresolved `server_tool_use`, and omitting its tool from the continuation request causes a validation error. Repeat until a non-`pause_turn` stop reason, capping continuations like any retry loop.
- Mixed server + client tool call in one turn: the API does NOT run the server tool; it returns `stop_reason: "tool_use"` with the `server_tool_use` block present but unresolved (no result block) alongside the client `tool_use` block. Detect this by finding a `server_tool_use`/`mcp_tool_use` id with no matching result block. Reply with a user message containing **only** `tool_result` blocks for the client tool_use ids (nothing else, not even text), keeping the same `tools` array — the API then runs the deferred server tool and the next response starts with its result block. This differs from `pause_turn`, which never leaves a client tool waiting on you.
- With programmatic tool calling, the same "unresolved server_tool_use + tool_use" shape means the client tool_use is code running inside `code_execution` (caller field names it), already paused awaiting your `tool_result`; also pass back the response's `container` id.
- ZDR: `web_search_20250305` and `web_fetch_20250910` are ZDR-eligible by default; `_20260209`+ versions are not (they use code execution internally for dynamic filtering) unless you set `"allowed_callers": ["direct"]` to disable dynamic filtering. On models without programmatic tool calling support, `_20260209`+ web tools require `allowed_callers: ["direct"]` explicitly.
- Domain filtering fields (`allowed_domains`/`blocked_domains`): no scheme prefix; subdomains auto-included unless a specific subdomain is given; web search supports subpaths (`example.com/blog`), web fetch matches domain only; wildcards allowed only in the path (`example.com/*`), not the domain (`*.example.com` invalid); request-level allowlist must be a subset of any org-level allowlist. Use ASCII-only domains — Unicode homograph attacks (Cyrillic а vs Latin a) can bypass filters.
- Dynamic filtering (`_20260209`+ web search/fetch) auto-provisions a shared code execution container; if you also declare `code_execution`, it must be `code_execution_20260120`+.
- Streaming: server_tool_use blocks called directly by Claude stream like client tool_use (content_block_start + input_json_delta events); result blocks arrive complete in one content_block_start with no deltas.
- All server tools support batch processing with a higher per-turn iteration limit before `pause_turn`.
- Messages API general streaming mechanics: see anthropic-api-core skill.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [programmatic-tool-calling](./programmatic-tool-calling.md)
- [tool-combinations](./tool-combinations.md)
