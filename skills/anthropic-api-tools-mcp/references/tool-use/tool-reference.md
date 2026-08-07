<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference / last verified: 2026-08-07 -->

# Tool reference

Directory of Anthropic-provided tools (`type` strings, execution location, status) and the optional properties available on any tool definition.

## Signature / Usage

```json
{"type": "web_search_20260209", "name": "web_search", "cache_control": {"type": "ephemeral"}}
```

## Options / Props

| Tool | type | Execution | Status |
| --- | --- | --- | --- |
| Web search tool | `web_search_20260318` / `web_search_20260209` / `web_search_20250305` | Server | GA |
| Web fetch tool | `web_fetch_20260318` / `web_fetch_20260309` / `web_fetch_20260209` / `web_fetch_20250910` | Server | GA |
| Code execution tool | `code_execution_20260521` / `code_execution_20260120` / `code_execution_20250825` | Server | GA |
| Advisor tool | `advisor_20260301` | Server | Beta: `advisor-tool-2026-03-01` |
| Tool search tool | `tool_search_tool_regex_20251119` / `tool_search_tool_bm25_20251119` | Server | GA |
| MCP connector | `mcp_toolset` | Server | Beta: `mcp-client-2025-11-20` |
| Memory tool | `memory_20250818` | Client | GA |
| Bash tool | `bash_20250124` | Client | GA |
| Text editor tool | `text_editor_20250728` / `text_editor_20250124` | Client | GA |
| Computer use tool | `computer_20251124` / `computer_20250124` | Client | Beta: `computer-use-2025-11-24` / `computer-use-2025-01-24` |

| Property | Purpose | Available on |
| --- | --- | --- |
| cache_control | Set a prompt-cache breakpoint at this tool definition | All tools |
| strict | Guarantee schema validation on tool names and inputs | All tools except `mcp_toolset` |
| defer_loading | Exclude the tool from the initial system prompt; loaded on demand via tool search | All tools |
| allowed_callers | Restrict which callers (`direct` / `code_execution_20260120`) can call the tool | All tools except `mcp_toolset` |
| input_examples | Example input objects | User-defined and Anthropic-schema client tools only, not server tools |
| eager_input_streaming | Enable fine-grained (unbuffered) input streaming | User-defined tools only |

## Notes

- `tool_search_tool_regex`/`tool_search_tool_bm25` (undated) resolve to the latest dated version.
- Tool versioning patterns vary: capability-keyed (e.g. `web_search_20260209` adds dynamic filtering over predecessor, both remain current), model-keyed (`text_editor_20250728` for Claude 4+, `text_editor_20250124` for earlier), variant-not-version (`tool_search_tool_regex_20251119` vs `_bm25_20251119` — two algorithms, neither supersedes), and legacy (`code_execution_20250522` Python-only vs `_20250825` adds Bash/files). `mcp_toolset` versioning is carried via the `anthropic-beta` header, not a date suffix.
- Properties compose: `defer_loading`, `cache_control`, and `strict` can all be set on the same tool.
- `allowed_callers` omitting `"direct"` guides Claude to call the tool only from code execution; `"code_execution_20260120"` and `"code_execution_20260521"` are interchangeable in this field, and response `caller` fields always tag `code_execution_20260120` regardless.
- `defer_loading: true` tools are stripped before the cache key is computed, so adding deferred tools never invalidates an existing prompt cache; discovered tools expand inline as `tool_reference` blocks in the conversation body, not in the prefix.

## Related

- [define-tools](./define-tools.md)
- [strict-tool-use](./strict-tool-use.md)
- [tool-search-tool](./tool-search-tool.md)
- [programmatic-tool-calling](./programmatic-tool-calling.md)
