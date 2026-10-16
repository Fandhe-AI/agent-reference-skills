<!-- source: https://code.claude.com/docs/en/mcp.md / last verified: 2026-10-17 -->

# Connect Claude Code to tools via MCP

Learn how to connect Claude Code to your tools with the Model Context Protocol (MCP). Full reference; see the MCP quickstart for a step-by-step walkthrough.

## Signature / Usage

```bash
# HTTP (recommended)
claude mcp add --transport http notion https://mcp.notion.com/mcp
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"

# stdio (local process)
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable \
  -- npx -y airtable-mcp-server

# WebSocket / SSE (SSE deprecated, use HTTP where available)
claude mcp add-json events-server \
  '{"type":"ws","url":"wss://mcp.example.com/socket","headers":{"Authorization":"Bearer YOUR_TOKEN"}}'

claude mcp list
claude mcp get <name>
claude mcp remove <name>
/mcp   # inside a session: status, auth, tool inspection
```

## Options / Props

| Scope | Loads in | Shared with team | Stored in |
| --- | --- | --- | --- |
| `local` (default) | Current project only | No | `~/.claude.json` (per-project entry) |
| `project` | Current project only | Yes, via `.mcp.json` in repo root | `.mcp.json` |
| `user` | All your projects | No | `~/.claude.json` (top-level `mcpServers`) |

| `claude mcp add` flag | Description |
| --- | --- |
| `--transport http\|sse\|stdio` | Transport (`-t`); WebSocket configured via `add-json` with `"type":"ws"` |
| `--header "Key: value"` | Static auth header (`-H`) |
| `--env KEY=value` | Environment variable for the server process (`-e`) |
| `--scope local\|project\|user` | Installation scope (`-s`) |
| `--callback-port <n>` | Fixed OAuth callback port |
| `--client-id` / `--client-secret` | Pre-configured OAuth credentials |

Scope/duplicate precedence when the same server name/endpoint appears in multiple sources: local > project > user > plugin-provided servers > claude.ai connectors. The three scopes are matched by name; plugins and connectors are matched by endpoint (URL spellings count as the same endpoint when they differ only in scheme/host letter case, the scheme's default port such as `:443`, or a trailing slash; a different path, query, userinfo or non-default port makes two servers). A server your organization provides through the `managedMcpServers` managed setting ranks above all of these (v2.1.259+). The whole entry from the winning source is used; fields are not merged.

## Notes

- Precedence for MCP config in this skill is the Claude Code **CLI** connection surface. For the Agent SDK's own MCP configuration (in-process/subprocess servers passed programmatically), see the anthropic-agent-sdk skill. For the Claude API's MCP connector / MCP tunnels (server-side, not CLI), see anthropic-api-tools-mcp.
- `${VAR}` and `${VAR:-default}` expansion is supported in `command`, `args`, `env`, `url`, and `headers` of `.mcp.json` entries.
- Reserved server names (`workspace`, `claude-in-chrome`, `computer-use`, `Claude Preview`, `Claude Browser`) cannot be registered by users.
- `claude mcp login <name>` / `claude mcp logout <name>` run and clear OAuth flows from the shell without opening `/mcp`. `claude mcp login` prints the authorization URL when no local browser is available; `--no-browser` forces the URL prompt (paste the redirect URL back; use `ssh -t`). `oauth.scopes` (a single space-separated string) pins the scopes requested during authorization and takes precedence over `authServerMetadataUrl` and discovered scopes.
- A JSON entry with a `url` but no `type` is a configuration error (an entry with no `type` is read as stdio); add `"type": "http"` (or `sse` / `ws`).
- MCP client runtimes: v1 (MCP TypeScript SDK 1.x) and v2 (SDK 2.0, adds MCP protocol revision 2026-07-28). Where feature flags are fetched, v2 is used on v2.1.232+; where they aren't (Bedrock / Claude Platform on AWS / Google Cloud's Agent Platform / Microsoft Foundry, Claude apps gateway, telemetry or flag fetching turned off) v2 is the default on v2.1.274+. Pick with `MCP_SDK_GENERATION` (`v1` | `v2`); `MCP_PROTOCOL_NEGOTIATION` (`auto` | `legacy`) decides whether Claude Code asks servers about the newer revision. On v2, a channel server that connects on the newer revision is not registered as a channel, and OAuth credentials are sent only to HTTPS (or `localhost` / `127.0.0.1` / `::1`) token endpoints.
- Disabling servers: toggling a server off in `/mcp` records it per project in `~/.claude.json` in `disabledMcpServers` (user-configured, plugin, managed-provided, fetched claude.ai connectors, default-on built-ins) or, for default-off built-ins such as `computer-use`, `enabledMcpServers` (opt-in). Neither list overrides the other, and both are unrelated to `enabledMcpjsonServers` / `disabledMcpjsonServers` (approval of `.mcp.json` servers).
- `disableClaudeAiConnectors: true` in any settings scope turns off the claude.ai connectors Claude Code fetches itself (not those a cloud host or the desktop app delivers).
- Text results with no image content longer than 50,000 characters are saved to a file regardless of `MAX_MCP_OUTPUT_TOKENS`; a server can raise a tool's threshold with `_meta["anthropic/maxResultSizeChars"]` (hard ceiling 500,000).
- `_meta["anthropic/alwaysLoad"]` on a tool and `alwaysLoad` on a server entry (all server types) control whether tools load upfront or stay deferred behind tool search; `"alwaysLoad": false` at the server level keeps all of a server's tools deferred (v2.1.287+).
- `headersHelper` runs a script to generate dynamic auth headers (e.g. Kerberos, short-lived tokens) at connection time; can't reference `${user_config.*}` (shell-executed).
- MCP tool output over 10,000 tokens triggers a warning; output is capped at 25,000 tokens by default (`MAX_MCP_OUTPUT_TOKENS` to raise it).
- Long-running tool calls (>2 min) in the main conversation move to a background task automatically (`CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` to tune, `0` to disable).
- Servers from claude.ai (connectors, added at claude.ai/customize/connectors) are auto-available when logged in with a claude.ai subscription account; not loaded when API-key or third-party-provider auth is active.
- Organizations can set per-tool `ask`/`blocked` controls on claude.ai connector tools, enforced locally by Claude Code.

## Related

- [Connect to MCP servers (quickstart)](./mcp-quickstart.md)
- [Control MCP server access for your organization](./managed-mcp.md)
