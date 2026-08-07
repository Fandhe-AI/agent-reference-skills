# Use Codex with the Agents SDK (MCP server)

Runs Codex CLI as a Model Context Protocol (MCP) server so other MCP clients — for example an agent built with the OpenAI Agents SDK — can call it, enabling deterministic, reviewable multi-agent workflows.

## Signature / Usage

```bash
codex mcp-server

# Inspect it
npx @modelcontextprotocol/inspector codex mcp-server
```

```python
from agents.mcp import MCPServerStdio

async with MCPServerStdio(
    name="Codex CLI",
    params={"command": "codex", "args": ["mcp-server"]},
    client_session_timeout_seconds=360000,
) as codex_mcp_server:
    ...
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `codex` tool: `prompt` (required) | string | Initial user prompt starting a Codex conversation. |
| `codex` tool: `approval-policy` | string | `untrusted`, `on-request`, or `never` for shell commands the model generates. |
| `codex` tool: `sandbox` | string | `read-only`, `workspace-write`, or `danger-full-access`. |
| `codex` tool: `model` / `cwd` / `config` / `base-instructions` / `developer-instructions` / `compact-prompt` | various | Per-session overrides; `config` merges into `$CODEX_HOME/config.toml` settings. |
| `codex-reply` tool: `prompt` (required), `threadId` (required) | string | Continues a session; `conversationId` is a deprecated alias for `threadId`. |

## Notes

- `tools/list` on the MCP server returns two tools: `codex` (start a session) and `codex-reply` (continue via `threadId`, taken from `structuredContent.threadId` in the prior `tools/call` response; approval prompts also carry `threadId`).
- Modern MCP clients generally read only `structuredContent`; the server also returns `content` for older clients.
- The multi-agent workflow pattern uses `MCPServerStdio` to keep one long-running Codex MCP server alive across many agent turns, with sub-agents instructed to always call Codex with an explicit `approval-policy`/`sandbox` pair (e.g. `"never"` / `"workspace-write"`) so file-writing steps don't block on interactive approval.
- Requires Codex CLI installed locally (`codex` on `PATH`), Python 3.10+ for the Agents SDK example, and Node.js 18+ only if using the MCP Inspector.

## Related

- [Codex SDK](./codex-sdk.md)
- [Non-interactive mode](./non-interactive-mode.md)
