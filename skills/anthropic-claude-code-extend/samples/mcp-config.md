<!-- source: https://code.claude.com/docs/en/mcp-quickstart.md / last verified: 2026-08-07 -->

# Project-scoped MCP servers via .mcp.json

Hand-written `.mcp.json` at the project root, defining an HTTP server and a local stdio server; checked into version control so teammates get the same servers on clone.

```json .mcp.json
{
  "mcpServers": {
    "claude-code-docs": {
      "type": "http",
      "url": "https://code.claude.com/docs/mcp"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Equivalent registration via CLI (writes the same file when run with `--scope project`):

```bash
claude mcp add --scope project --transport http claude-code-docs https://code.claude.com/docs/mcp
claude mcp add playwright -- npx -y @playwright/mcp@latest
```

## Notes

- For HTTP servers, `url` is the endpoint; for stdio servers, `command`/`args` is the program Claude Code runs as a subprocess.
- The `playwright` CLI line above defaults to `local` scope (private, current project only); pass `--scope project` explicitly to also write it into `.mcp.json` alongside `claude-code-docs`.
- The first time Claude Code sees a project-scoped server from `.mcp.json`, it prompts for approval before connecting (protects against a cloned repo launching processes without consent).
- Claude Code reads `.mcp.json` at session start only; restart the session after editing it.
- Precedence for MCP config here is the Claude Code **CLI** connection surface. For the Agent SDK's own MCP configuration (in-process/subprocess servers passed programmatically), see anthropic-agent-sdk. For the Claude API's MCP connector / MCP tunnels, see anthropic-api-tools-mcp.
