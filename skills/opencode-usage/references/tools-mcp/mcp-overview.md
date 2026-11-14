---
source: https://opencode.ai/docs/mcp-servers/
---

# MCP servers

OpenCode connects to [Model Context Protocol](https://modelcontextprotocol.io/) servers and exposes capabilities such as tools, prompts, resources, and instructions. MCP tools consume model context, so add only the servers you need.

## Signature / Usage

### Setup

Add a remote server from the project that should use it, then check its connection:

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp
opencode mcp list
```

The command writes the server to the project [configuration](https://opencode.ai/docs/config/). Add `--global` to make it available in every project:

```sh
opencode mcp add context7 --global --url https://mcp.context7.com/mcp
```

Remote servers use OAuth by default. If the list shows `needs authentication`, open OpenCode, run `/mcps`, select the server, and sign in. A connected server is ready for an agent to use:

```text
✓ context7  connected
```

### Config

To configure a server by hand, give it a unique name under `mcp.servers`. V2 does not place server names directly under `mcp`.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "my-server": {
        "type": "local",
        "command": ["npx", "-y", "example-mcp-server"],
      },
    },
  },
}
```

Servers connect automatically. Use `disabled`, not an `enabled` field, to keep one configured without connecting it:

```jsonc
{
  "mcp": {
    "servers": {
      "my-server": {
        "type": "local",
        "command": ["npx", "-y", "example-mcp-server"],
        "disabled": true,
      },
    },
  },
}
```

A higher-precedence project config replaces the entire server object with the same name. Use different names for separate connections or accounts; otherwise repeat every required field in the override:

```jsonc title="opencode.jsonc"
{
  "mcp": {
    "servers": {
      "my-server": {
        "type": "remote",
        "url": "https://mcp.example.com/mcp",
      },
    },
  },
}
```

### Management

List servers and their current connection state from any project:

```sh
opencode mcp list
```

Use `/mcps` in OpenCode to view, connect, disconnect, or authenticate servers. Use the CLI to add servers and manage OAuth credentials:

```sh
opencode mcp add sentry --url https://mcp.sentry.dev/mcp
opencode mcp auth sentry
opencode mcp logout sentry
```

Run `opencode mcp auth` without a name to pick from the OAuth-capable servers:

```sh
opencode mcp auth
```

To remove a server, delete its entry from the project or global configuration where it was added:

```jsonc
{
  "mcp": {
    "servers": {},
  },
}
```

Disconnecting a server in `/mcps` does not change configuration. Edit configuration directly for OAuth client settings, timeouts, working directories, or to keep a server disconnected:

```jsonc
{
  "mcp": {
    "servers": {
      "sentry": {
        "type": "remote",
        "url": "https://mcp.sentry.dev/mcp",
        "disabled": true,
      },
    },
  },
}
```

## Notes

- The MCP protocol specification is covered by the `mcp-spec` skill. Claude Code and Codex MCP configuration are covered by anthropic-claude-code-extend and openai-codex, not here.
- Per-server field tables are in `mcp-local.md` and `mcp-remote.md`.

## Related

- [mcp-local.md](./mcp-local.md)
- [mcp-remote.md](./mcp-remote.md)
- [mcp-oauth.md](./mcp-oauth.md)
- [mcp-timeouts-protocol-pooling.md](./mcp-timeouts-protocol-pooling.md)
- [mcp-permissions-names.md](./mcp-permissions-names.md)
- [mcp-runtime-behavior.md](./mcp-runtime-behavior.md)
