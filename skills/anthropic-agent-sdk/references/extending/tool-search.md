<!-- source: https://code.claude.com/docs/en/agent-sdk/tool-search / last verified: 2026-10-16 -->

# Scale to Many Tools with Tool Search

Enables the agent to work with hundreds/thousands of tools by discovering and loading only what's needed on demand, instead of loading all tool definitions upfront. On by default.

## Signature / Usage

```typescript
options: {
  mcpServers: { "enterprise-tools": { type: "http", url: "https://tools.example.com/mcp" } },
  allowedTools: ["mcp__enterprise-tools__*"],
  env: {
    ...process.env,
    ENABLE_TOOL_SEARCH: "auto:5" // Activate when tool defs exceed 5% of context
  }
}
```

## Options / Props

| Value | Behavior |
|-------|----------|
| (unset) | Tool search on by default; falls back to upfront loading on unsupported models/proxies |
| `true` | Always on (except where server-side rejection forces upfront loading) |
| `auto` | Activates when combined tool-definition tokens exceed 10% of context window |
| `auto:N` | Same as `auto` with custom percentage threshold |
| `false` | Off; all tool definitions loaded into context every turn |

## Notes

- Supported on Claude Sonnet 4.5, Haiku 4.5, Opus 4.5, and later; unsupported models/proxies fall back to upfront loading regardless of `ENABLE_TOOL_SEARCH`.
- Up to five most-relevant tools loaded per search by default; catalog limit is 10,000 tools.
- Disabled automatically when `ANTHROPIC_BASE_URL` points to a non-first-party host (most proxies don't forward `tool_reference` blocks); `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` also forces it off.
- On Google Cloud's Agent Platform (Vertex), tool search is on by default for Claude Opus 4.5, Sonnet 4.5, Haiku 4.5, and later; earlier models load tool definitions upfront. Before Claude Code v2.1.221, the SDK disabled tool search for all Agent Platform models unless you set `ENABLE_TOOL_SEARCH`.
- Setting `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` keeps tool search off and `ENABLE_TOOL_SEARCH` can't override it; on Claude Code v2.1.227 or later, an organization can keep tool search on under this variable through managed settings. In a session that gets the HIPAA configuration, tool search is always off.
- With `ENABLE_TOOL_SEARCH=auto`, the threshold counts every definition tool search can defer (each MCP tool not marked `alwaysLoad`, plus built-in tools that load on demand); core built-in tools such as Bash, Read, and Edit load upfront and aren't counted.
- Applies to both custom SDK MCP tools and remote MCP server tools.
- This is Claude Agent SDK (library) tool search (`ENABLE_TOOL_SEARCH` env var, `defer_loading`/`tool_reference`). The underlying mechanism is the Claude API (Messages API) tool-search-tool beta, documented under anthropic-api-tools-mcp.

## Related

- [Custom Tools](./custom-tools.md)
- [MCP](./mcp.md)
