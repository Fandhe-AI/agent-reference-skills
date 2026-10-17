---
source: https://ui.shadcn.com/docs/registry/mcp
---

# MCP Server

MCP support for registry developers: the shadcn MCP server works out of the box with any shadcn-compatible registry, with no registry-side setup beyond a valid registry index.

## Signature / Usage

Consumers configure the registry in `components.json`, then initialize the MCP server for their client:

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest mcp init --client claude    # also: cursor, vscode, opencode
```

Codex (`~/.codex/config.toml`):

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Notes

- Prerequisite: the MCP server requests your registry index, so a `registry` item file must exist at the registry root, e.g. `https://acme.com/r/registry.json` (or `https://acme.com/r/registry`). It must be valid JSON conforming to the registry schema.
- Per client: Claude Code (restart, `/mcp` to debug), Cursor (enable the MCP server in Cursor Settings), VS Code (open `.vscode/mcp.json`, click Start; prompts run with GitHub Copilot), Codex (edit `config.toml` manually, restart), OpenCode (restart). Example prompts: "Show me the components in the acme registry", "Create a landing page using items from the acme registry".
- Best practices: clear concise descriptions, accurate `dependencies`, `registryDependencies` for relationships, consistent kebab-case names.
- The shadcn MCP server is a provider; MCP client configuration itself is covered by skills anthropic-claude-code-extend / openai-codex. Consumer-side server docs are in the shadcn-ui cli-config category (`mcp.md`).

## Related

- [Getting Started](./getting-started.md)
- [registry.json](./registry-json.md)
- [Namespaces](./namespace.md)
