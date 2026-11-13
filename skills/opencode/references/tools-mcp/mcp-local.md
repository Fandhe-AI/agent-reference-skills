---
source: https://opencode.ai/docs/mcp-servers/#local
---

# MCP servers: Local

A local server is a command that OpenCode starts over the MCP stdio transport.

## Signature / Usage

Add one with a command after `--`:

```sh
opencode mcp add everything -- npx -y @modelcontextprotocol/server-everything
```

Pass environment variables with repeated `--env` flags:

```sh
opencode mcp add everything --env LOG_LEVEL=info -- npx -y @modelcontextprotocol/server-everything
```

Use configuration for other process options such as a working directory:

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

Use `{env:NAME}` for environment substitution. Shell expressions such as `$NAME` are not expanded in JSON strings:

```jsonc
{
  "environment": {
    "MCP_API_KEY": "{env:MCP_API_KEY}",
  },
}
```

## Options / Props

| Field | Required | Description |
| --- | --- | --- |
| `type` | Yes | Must be `"local"`. |
| `command` | Yes | Executable followed by its arguments. |
| `cwd` | No | Process directory. Relative paths resolve from the workspace, which is also the default. |
| `environment` | No | String variables added to OpenCode's inherited process environment. |
| `disabled` | No | Prevents connection when `true`. Defaults to `false`. |
| `codemode` | No | Set to `false` to expose tools directly instead of through Code Mode. Defaults to `true`. |
| `timeout` | No | Per-server timeout overrides. |
| `protocol` | No | `legacy` (default), `auto`, or `2026-07-28`. See Protocol version. |
| `pool` | No | Share one connection across directories. Defaults to `false`. See Shared connections. |

## Notes

- Local servers run arbitrary commands with your user's authority; add only servers you trust.
- Protocol spec is `mcp-spec`; Claude Code and Codex MCP setup are in other skills.

## Related

- [mcp-overview.md](./mcp-overview.md)
- [mcp-remote.md](./mcp-remote.md)
- [mcp-timeouts-protocol-pooling.md](./mcp-timeouts-protocol-pooling.md)
