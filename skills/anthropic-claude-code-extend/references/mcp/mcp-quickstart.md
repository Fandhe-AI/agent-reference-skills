<!-- source: https://code.claude.com/docs/en/mcp-quickstart.md / last verified: 2026-10-17 -->

# Connect to MCP servers

Add an MCP server to Claude Code, verify the connection, and find the configuration on disk. Step-by-step walkthrough; see the MCP reference for every configuration option.

## Signature / Usage

```bash
# 1. Add
claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp

# 2. Verify
claude mcp list

# 3. Use (inside a session)
# "Use the claude-code-docs server to look up what MCP_TIMEOUT does"

# 4. Remove (optional cleanup)
claude mcp remove claude-code-docs
```

```json
// .mcp.json (project scope, hand-written)
{
  "mcpServers": {
    "claude-code-docs": { "type": "http", "url": "https://code.claude.com/docs/mcp" },
    "playwright": { "type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"] }
  }
}
```

## Options / Props

| `claude mcp list` status | Meaning |
| --- | --- |
| `✔ Connected` | Ready to use |
| `! Connected · tools fetch failed` | Connected but tool listing failed; run `claude mcp get <name>` |
| `! Needs authentication` | Needs browser sign-in or a `--header` token |
| `✘ Failed to connect` | Server didn't respond; `claude mcp list` and `claude mcp get <name>` show the HTTP status or error code and any error text the server returned (before v2.1.219 only the bare status) |
| `✘ Connection error` | The connection attempt threw an error; Claude Code appends no detail to this status, so check with curl and the server command |
| `⊘ Disabled for this project (re-enable via /mcp)` | Turned off for this project by the project's `disabledMcpServers` list; turn it back on from the `/mcp` panel |
| `⏸ Pending approval (run claude to approve)` | Project-scoped server awaiting approval |

| Scope | File | Available to |
| --- | --- | --- |
| `local` (default) | `~/.claude.json`, under the project entry | Only you, only this project |
| `project` | `.mcp.json` in project root | Everyone who clones the project |
| `user` | `~/.claude.json`, top-level `mcpServers` | Only you, all projects |

## Notes

- This is the Claude Code **CLI** connection setup. For the Agent SDK's own MCP configuration surface, see anthropic-agent-sdk. For the Claude API's MCP connector / MCP tunnels, see anthropic-api-tools-mcp.
- The first time Claude Code sees a project-scoped `.mcp.json` server, it prompts for approval before connecting (protects against a cloned repo launching processes without consent).
- Sign-in-required servers (Sentry, Linear, Notion, etc.) show `! Needs authentication` after `claude mcp add`; complete OAuth via `/mcp` inside a session.
- Every Claude Code surface can connect to MCP servers: desktop app (Connectors UI), Claude Desktop chat app (`claude mcp add-from-claude-desktop` on macOS/WSL), VS Code, Claude Code on the web (reads `.mcp.json`), and claude.ai connectors.

## Related

- [Connect Claude Code to tools via MCP](./mcp.md)
- [Control MCP server access for your organization](./managed-mcp.md)
