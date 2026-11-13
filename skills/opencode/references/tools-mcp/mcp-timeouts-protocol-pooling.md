---
source: https://opencode.ai/docs/mcp-servers/#timeouts
---

# MCP servers: Timeouts, Protocol version, Shared connections

Per-server and default timeouts, selecting the MCP protocol revision, and sharing connections across directories.

## Signature / Usage

### Timeouts

Timeouts are positive integer milliseconds. Set defaults under `mcp.timeout`; a server's `timeout` object overrides matching defaults.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "timeout": {
      "startup": 45000,
      "catalog": 30000,
      "execution": 600000,
    },
    "servers": {
      "slow-tools": {
        "type": "remote",
        "url": "https://mcp.example.com/mcp",
        "timeout": {
          "catalog": 60000,
        },
      },
    },
  },
}
```

### Protocol version

OpenCode opens every server with the classic MCP `initialize` handshake by default. Set a server's `protocol` to talk to one built on the 2026-07-28 revision:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "modern": {
        "type": "remote",
        "url": "https://mcp.example.com/mcp",
        "protocol": "auto",
      },
    },
  },
}
```

Probing a local `legacy` server adds a short-lived extra process and can wait up to the startup timeout when the server ignores unknown requests, so keep `auto` scoped to servers that need it.

### Shared connections

One OpenCode server can have many directories open, and each one connects to every MCP server on its own. Set `pool` to `true` to let directories with the same server settings share one connection and one tool list:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "cloudflare": {
        "type": "remote",
        "url": "https://mcp.cloudflare.com/mcp",
        "pool": true,
      },
    },
  },
}
```

- Only connections on the 2026-07-28 revision are shared. With `pool` set, an unset `protocol` means `auto`. A server that answers with an older revision, or one set to `legacy`, keeps one connection per directory.
- Directories share a connection only when everything that changes it matches: the URL, headers, OAuth settings and signed-in account for a remote server, and the command, working directory and environment for a local one. Timeouts and `protocol` must match too. The server's name doesn't need to, but sign-ins are stored per name, so an OAuth server is shared only under the same name.
- A local server is shared only between directories on this machine, not ones in a workspace. Sharing it across projects needs a fixed `cwd`, such as `"~"`. Without one it runs in each project's folder, so each project gets its own and OpenCode logs a warning.
- A shared connection has no roots. When a tool asks for input, the request appears in the directory that called it.
- The connection closes as soon as the last directory using it closes or disconnects the server.

## Options / Props

| Timeout | Default | Applies to |
| --- | --- | --- |
| `startup` | 30 seconds | Transport connection and server initialization. |
| `catalog` | 30 seconds | Listing tools, prompts, resources, and resource templates. |
| `execution` | 12 hours | Tool calls, prompt retrieval, and resource reads. |

| `protocol` value | Behavior |
| --- | --- |
| `legacy` | Default. Sends `initialize` and speaks protocol revisions up to 2025-11-25. |
| `auto` | Probes with `server/discover` for the 2026-07-28 revision and falls back to `legacy` when the server does not support it. |
| `2026-07-28` | Requires the 2026-07-28 revision. The connection fails against older servers. |

## Notes

- Protocol revisions themselves are specified by `mcp-spec`.

## Related

- [mcp-local.md](./mcp-local.md)
- [mcp-remote.md](./mcp-remote.md)
