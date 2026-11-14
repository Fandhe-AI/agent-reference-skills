---
source: https://opencode.ai/docs/mcp-servers/
---

# Add MCP Servers

Add a remote and a local MCP server from the CLI or by hand under `mcp.servers`.

Add a remote server and check its connection:

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp
opencode mcp list
```

Add a local server with an environment variable:

```sh
opencode mcp add everything --env LOG_LEVEL=info -- npx -y @modelcontextprotocol/server-everything
```

Configure a local server by hand:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "everything": {
        "type": "local",
        "command": ["npx", "-y", "@modelcontextprotocol/server-everything"],
        "cwd": ".",
        "environment": {
          "LOG_LEVEL": "info",
          "MCP_API_KEY": "{env:MCP_API_KEY}",
        },
      },
    },
  },
}
```

Configure a remote server with a header credential:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "oauth": false,
        "headers": {
          "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}",
        },
      },
    },
  },
}
```

## Notes

- V2 does not place server names directly under `mcp`; use `mcp.servers`. Use `disabled`, not `enabled`.
- Remote servers use OAuth by default (`/mcps` or `opencode mcp auth <name>`); set `oauth: false` only for header-credential servers.
- Store secrets in environment variables with `{env:NAME}`.
- Local servers run their command with your user's authority; add only servers you trust and pin package versions where possible.
- The protocol spec is covered by mcp-spec; Claude Code and Codex MCP settings are covered by other skills.
