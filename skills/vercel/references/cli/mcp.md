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
- For Claude Code, adds Vercel MCP to the client; for Cursor and VS Code with Copilot, opens the client's one-click installer and you follow the prompts there; for other clients see the Vercel MCP setup docs
- Without `--clients`, launches an interactive client picker; in non-interactive environments such as CI, `--clients` is required
- `--project` scopes the MCP session to the linked project; if the directory is not linked, run `vercel link` first
- After the command finishes, complete any authentication the client asks for (in Claude Code, run `/mcp`)
- Source: https://vercel.com/docs/cli/mcp (fetched 2026-11-14)

## Related

- [link.md](./link.md)
