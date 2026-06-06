# vercel mcp

Configure MCP clients (Claude Code, Cursor, VS Code with Copilot, Claude.ai) to use Vercel's hosted MCP endpoint at `https://mcp.vercel.com`.

## Signature / Usage

```bash
vercel mcp
vercel mcp --clients "Cursor,VS Code with Copilot"
vercel mcp --project
```

## Options / Props

| Name | Description |
|------|-------------|
| `--clients` | Comma-separated list of MCP clients to set up; required in non-interactive environments. Supported: `Claude Code`, `Claude.ai and Claude for desktop`, `Cursor`, `VS Code with Copilot` |
| `--project` | Configure project-specific MCP access (`https://mcp.vercel.com/<org>/<project>`) for the linked project |

## Notes

- Does not deploy any MCP server; only adjusts client-side configuration on your machine
- For Claude.ai and Claude for desktop, prints manual setup instructions
- For Claude Code, Cursor, VS Code with Copilot, configures the client directly
- Without `--clients`, launches an interactive client picker

## Related

- [link.md](./link.md)
