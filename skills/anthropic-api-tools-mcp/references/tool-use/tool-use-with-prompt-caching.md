<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching / last verified: 2026-08-07 -->

# Tool use with prompt caching

Cache tool definitions with `cache_control` and understand what invalidates the tools/system/messages cache prefix hierarchy.

## Signature / Usage

```json
{
  "tools": [
    {"name": "get_weather", "description": "...", "input_schema": {"...": "..."}},
    {"name": "get_time", "description": "...", "input_schema": {"...": "..."}, "cache_control": {"type": "ephemeral"}}
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| cache_control | object | Place `{"type": "ephemeral"}` on the last tool in `tools` to cache the whole tool-definitions prefix up to that point |

## Notes

- For `mcp_toolset`, place the breakpoint on the `mcp_toolset` entry itself (tool order within the set is not controllable); the API applies it to the final expanded tool.
- `defer_loading` tools are excluded from the system-prompt prefix; when discovered via tool search they're appended inline as `tool_reference` blocks, so dynamic tool discovery does not invalidate the cache. This is independent of strict-mode grammar construction, which always builds from the full toolset.
- Cache invalidation follows the prefix hierarchy `tools → system → messages`; a change at one level invalidates that level and everything after: modifying tool definitions invalidates everything; toggling web search/citations invalidates system+messages; changing `tool_choice`, `disable_parallel_tool_use`, or image presence/absence invalidates messages only; changing thinking parameters or `output_config.effort` invalidates messages always (and tools/system too on models that render thinking config ahead of them).
- When a request with caching enabled uses a server tool (web search, web fetch, code execution), the API auto-places a cache breakpoint on the server tool result before the next agentic-loop iteration, always with the default 5-minute TTL (shown as `cache_creation.ephemeral_5m_input_tokens` in `usage`) regardless of your own markers' TTL. This only happens if the request already has at least one `cache_control` marker.
- Per-tool caching notes: web_search/web_fetch enable/disable invalidates system+messages; code_execution container state is independent of prompt cache; tool_search-discovered tools preserve prefix cache; computer_use screenshot presence affects messages cache; text_editor/bash/memory have no special interaction.
- General prompt caching mechanics (TTLs, pricing): see anthropic-api-core skill.

## Related

- [manage-tool-context](./manage-tool-context.md)
- [tool-search-tool](./tool-search-tool.md)
- [server-tools](./server-tools.md)
