<!-- source: https://code.claude.com/docs/en/agent-sdk/tool-search / last verified: 2026-11-14 -->

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
| (unset) | Tool search on, definitions deferred and discovered on demand; falls back to upfront loading on models earlier than Opus 4 / Sonnet 4, on earlier Agent Platform models, and on Microsoft Foundry deployments hosted on Azure |
| `true` | Tool search on, with the same fallbacks as (unset) |
| `auto` | Off (definitions load upfront) until the deferrable definitions reach 10% of the model's context window; then it activates and can stay on in the same conversation even if they later drop below 10% |
| `auto:N` | Same as `auto` with a custom percentage; `auto:5` activates at 5%, lower values activate sooner |
| `false` | Off; all tool definitions loaded into context every turn |

## Notes

- Model support: Opus 4, Sonnet 4, Haiku 4.5, and later (on Google Cloud's Agent Platform: Opus 4.5, Sonnet 4.5, Haiku 4.5, and later). On earlier models the SDK loads definitions upfront regardless of `ENABLE_TOOL_SEARCH`. Microsoft Foundry deployments hosted on Azure reject tool search server-side; the SDK detects this and loads definitions upfront, and `ENABLE_TOOL_SEARCH` cannot override it.
- Up to five most-relevant tools loaded per search by default; catalog limit is 10,000 tools. Loaded tools stay available on later turns until the SDK compacts the messages where they were discovered, after which the agent searches again. Each search adds one round-trip; with fewer than ~10 tools that fit comfortably in context, loading upfront is typically faster.
- Behind an `ANTHROPIC_BASE_URL` gateway tool search is on by default with nothing to set (before Claude Code v2.1.304 the SDK disabled it unless `ENABLE_TOOL_SEARCH` was `true`, `auto`, or `auto:N`); if the gateway rejects it, see the Claude Code MCP gateway docs. `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` forces it off.
- Optimize discovery: search matches queries against tool names and descriptions, so names like `search_slack_messages` and keyword-rich descriptions surface more often. Optionally add a `systemPrompt` `claude_code` preset with `append` listing the available tool categories (`"You can search for tools to interact with Slack, GitHub, and Jira."`).
- In TypeScript `env` replaces the subprocess environment, so spread `...process.env`; in Python `env` is merged on top of the inherited environment.
- On Google Cloud's Agent Platform (Vertex), tool search is on by default for Claude Opus 4.5, Sonnet 4.5, Haiku 4.5, and later; earlier models load tool definitions upfront. Before Claude Code v2.1.221, the SDK disabled tool search for all Agent Platform models unless you set `ENABLE_TOOL_SEARCH`.
- Setting `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` keeps tool search off and `ENABLE_TOOL_SEARCH` can't override it; on Claude Code v2.1.227 or later, an organization can keep tool search on under this variable through managed settings. In a session that gets the HIPAA configuration, tool search is always off.
- With `ENABLE_TOOL_SEARCH=auto`, the threshold counts every definition tool search can defer (each MCP tool not marked `alwaysLoad`, plus built-in tools that load on demand); core built-in tools such as Bash, Read, and Edit load upfront and aren't counted.
- Applies to both custom SDK MCP tools and remote MCP server tools. A mod in a plugin can also defer a tool or load it upfront, which changes the `auto` count.
- Source: https://code.claude.com/docs/en/agent-sdk/tool-search (fetched 2026-11-14)
- This is Claude Agent SDK (library) tool search (`ENABLE_TOOL_SEARCH` env var, `defer_loading`/`tool_reference`). The underlying mechanism is the Claude API (Messages API) tool-search-tool beta, documented under anthropic-api-tools-mcp.

## Related

- [Custom Tools](./custom-tools.md)
- [MCP](./mcp.md)
