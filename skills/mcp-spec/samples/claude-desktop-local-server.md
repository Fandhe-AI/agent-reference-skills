---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers
---

# Claude Desktop Local Server

Register a local stdio server (the reference Filesystem Server) in Claude Desktop's `claude_desktop_config.json`.

Config file location:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

macOS:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Downloads"
      ]
    }
  }
}
```

Windows:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\username\\Desktop",
        "C:\\Users\\username\\Downloads"
      ]
    }
  }
}
```

## Notes

- Reproduced from `docs/2026-07-28/develop/connect-local-servers.mdx` (tag `2026-07-28`); replace `username` with the real user name.
- Paths in `args` must be absolute; they define which directories the Filesystem Server can access. Node.js is required for `npx`.
- Claude Desktop `claude_desktop_config.json` is a different file and host from Claude Code's `.mcp.json`; Claude Code configuration is covered by anthropic-claude-code-extend.
