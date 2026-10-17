# Codex MCP server removal

The `codex mcp-server` command and the standalone `codex-mcp-server` binary have been removed. Integrations that launch either command must migrate before upgrading Codex. The previous MCP tool reference and Agents SDK examples are no longer supported.

## Signature / Usage

Migrate from MCP tool calls to the Codex app server, which uses its own JSON-RPC protocol:

```bash
# before (removed)
codex mcp-server

# after
codex app-server
```

Managing external MCP servers is unchanged:

```bash
codex mcp add <server-name> -- <stdio server-command>
codex mcp list
```

## Options / Props

| Name | Description |
|------|-------------|
| `codex mcp-server` | Removed. |
| `codex-mcp-server` (standalone binary) | Removed. |
| Codex app server | Replacement for integrations that need authentication, conversation history, approvals, and streamed agent events. Its own JSON-RPC protocol; not an MCP server or a drop-in replacement for an MCP client. |
| `codex mcp` | Still manages connections to external MCP servers. |

## Notes

- Update your integration to use the app-server protocol instead of MCP tool calls. The app-server command is experimental and isn't supported for production workloads.
- Codex continues to support external MCP servers; the removal affects hosting Codex as an MCP server.
- Historical (no longer supported): the former server exposed two tools via `tools/list`, `codex` (start a session; `prompt`, `approval-policy`, `sandbox`, `model`, `cwd`, `config`, `base-instructions`, `developer-instructions`, `compact-prompt`) and `codex-reply` (continue via `threadId`), and was driven from the OpenAI Agents SDK through `MCPServerStdio`. Don't build new integrations on it.
- For automation or CI, use the Codex SDK instead of driving app-server directly.
- Source: https://learn.chatgpt.com/docs/mcp-server (retrieved 2026-10).

## Related

- [Codex app server](./app-server.md)
- [Codex SDK](./codex-sdk.md)
- [Non-interactive mode](./non-interactive-mode.md)
