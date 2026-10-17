---
source: https://ui.shadcn.com/docs/mcp
---

# MCP Server

The shadcn MCP server lets AI assistants browse, search and install items from registries configured in `components.json`.

## Signature / Usage

```bash
npx shadcn@latest mcp init --client claude   # claude | cursor | vscode | codex | opencode
```

Manual configuration for Claude Code (`.mcp.json`):

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

Cursor uses `.cursor/mcp.json` with the same `mcpServers` shape. VS Code uses `.vscode/mcp.json` with a `servers` key. Codex (`~/.codex/config.toml`, must be edited manually; the CLI cannot update it):

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

Registries and authentication:

```json
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }
    }
  }
}
```

```bash
# .env.local
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

## Notes

- No configuration is needed for the standard shadcn/ui registry. Works with third-party, private and namespaced (`@namespace`) registries.
- Capabilities: browse components/blocks/templates, search across registries, install via natural language, multiple registries.
- Claude Code: restart, then run `/mcp`; `Connected` means ready. Cursor: enable the server in Cursor Settings. VS Code: click Start next to the server in `.vscode/mcp.json`. Codex / OpenCode: restart.
- Troubleshooting: verify config and enablement, restart the client, ensure `shadcn` is installed, check registry URLs, env vars and namespace syntax (`@namespace/component`). For `No tools or prompts`, run `npx clear-npx-cache`, re-enable the server, check logs (Cursor: View -> Output, `MCP: project-*`).
- The shadcn MCP server is a provider; MCP client configuration itself is covered by skills anthropic-claude-code-extend / openai-codex.

## Related

- [shadcn CLI](./cli.md)
- [components.json](./components-json.md)
- [Skills](./skills.md)
