<!-- source: https://code.claude.com/docs/en/mcp.md / last verified: 2026-11-14 -->

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
- MCP tasks (public beta, v2.1.304+; terminal CLI, Agent SDK and GitHub Actions sessions only, not the VS Code extension or desktop app): a long job the server runs itself via the MCP tasks extension. Claude's tool call returns once the server accepts the job, the footer shows a count such as `1 MCP task`, and the result arrives when it ends; a task on a remote server keeps running after you exit (`runs on the server; survives exiting this session` in `/tasks`). A call becomes a task only if the server supports tasks, is HTTP / stdio / claude.ai connector on protocol revision 2026-07-28 (not `MCP_SDK_GENERATION=v1` or `MCP_PROTOCOL_NEGOTIATION=legacy`), the session fetches feature flags (not Bedrock etc.), and the call comes from the main conversation. Stop a task in `/tasks` with `x` (`Esc` doesn't stop it). Task answers may omit `createdAt`, `lastUpdatedAt`, `ttlMs` since v2.1.317.
- Make Claude wait for an MCP task in an interactive session by setting `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` to `0` (waits for every MCP tool call) or `CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND` to `1` (waits for the task's result; the call moves to a plain background call after two minutes by default). In Agent SDK or `claude -p --input-format stream-json` sessions, tasks also need `CLAUDE_AUTO_BACKGROUND_TASKS=1`, `CLAUDE_CODE_DISABLE_MCP_TASK_BACKGROUND` not `1`, and `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` not `0`; a one-shot `claude -p "<prompt>"` run gets no MCP tasks. A task that asks for input opens an elicitation dialog (not served in non-interactive sessions, where Claude Code asks the server to cancel).
- 2.1.319: MCP tasks moved to the background right away in the terminal and work without feature-flag fetching (Bedrock, Vertex, Foundry, LLM gateways, `DISABLE_TELEMETRY`); `CLAUDE_CODE_DISABLE_MCP_TASKS=1` turns them off. 2.1.325: Esc on a background MCP task's question means "answer later" (nothing is sent to the server; the question stays in `/tasks`), and Claude is told when a task is waiting for your answer.
- 2.1.323: project (`.mcp.json`) MCP server approvals now match the server's exact name; an approval entry written in another spelling asks again. `MCP_SDK_GENERATION=v1` now runs the v2 MCP client in a compatibility mode (earlier handshake, relaxed OAuth sign-in checks) because the v1 client is removed. The tool Claude uses to finish an MCP server sign-in asks you to confirm, even in bypass and auto modes (use `/mcp` where nobody can be asked, e.g. `dontAsk`).
- `.mcp.json` approvals: `enableAllProjectMcpServers` / `enabledMcpjsonServers` committed to the project's `.claude/settings.json` are ignored in an untrusted folder (the server stays `Pending approval`); approvals from `~/.claude/settings.json`, managed settings and `--settings` still apply, and a `disabledMcpjsonServers` entry in any settings file still rejects the server.
- Per-call limits: per-server `timeout` (ms, hard wall-clock, values below 1000 ignored) or `MCP_TOOL_TIMEOUT` (default about 28 hours); idle timeout 5 minutes for HTTP / SSE / WebSocket / claude.ai connector servers and 30 minutes for stdio (`CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`, `0` disables). Calls from subagents, IDE servers and non-interactive runs (unless `CLAUDE_AUTO_BACKGROUND_TASKS=1`) never auto-background.
- Server authors: `_meta["anthropic/requiresUserInteraction"]: true` on a `tools/list` entry forces a permission prompt on every call (denied in `dontAsk`); `annotations.idempotentHint` / `readOnlyHint` let Claude Code repeat a call that was pending when a connection closed. Tools whose input schema breaks the API rules (top-level property names must be 1 to 64 chars of ASCII letters, digits, `_`, `.`, `-`; draft 2020-12 validity) are excluded (v2.1.216+; `/mcp` shows the count, 2.1.323), root-level `anyOf` / `oneOf` / `allOf` schemas are flattened, and tools with full names over 128 characters are left out.
- `/mcp reconnect all` retries every failed or unauthenticated server (v2.1.284+). An SSE-only server added with `--transport http` is switched to SSE automatically (v2.1.265+).
- Source: https://code.claude.com/docs/en/mcp.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304, 2.1.317, 2.1.319, 2.1.323, 2.1.325, retrieved 2026-11-14)
- Servers from claude.ai (connectors, added at claude.ai/customize/connectors) are auto-available when logged in with a claude.ai subscription account; not loaded when API-key or third-party-provider auth is active.
- Organizations can set per-tool `ask`/`blocked` controls on claude.ai connector tools, enforced locally by Claude Code.

## Related

- [Connect to MCP servers (quickstart)](./mcp-quickstart.md)
- [Control MCP server access for your organization](./managed-mcp.md)
