---
source: https://opencode.ai/docs/mcp-servers/
---

# MCP

Add, authenticate, and list MCP servers with `opencode mcp`.

## Signature / Usage

### List servers

```sh
opencode mcp list
```

### Add a remote server

The command writes the server to the project configuration.

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp
```

Add `--global` to make it available in every project:

```sh
opencode mcp add context7 --global --url https://mcp.context7.com/mcp
```

Pass request headers with repeated `--header` flags. Quote `{env:NAME}` references so the shell writes them literally:

```sh
opencode mcp add context7 --url https://mcp.context7.com/mcp --header 'CONTEXT7_API_KEY={env:CONTEXT7_API_KEY}'
```

### Add a local server

Add one with a command after `--`:

```sh
opencode mcp add everything -- npx -y @modelcontextprotocol/server-everything
```

Add to the global config.

Source: https://opencode.ai/docs/cli/commands/

```sh
opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything
```

Pass environment variables with repeated `--env` flags:

```sh
opencode mcp add everything --env LOG_LEVEL=info -- npx -y @modelcontextprotocol/server-everything
```

### OAuth

```sh
opencode mcp auth sentry
```

Run without a name to pick from the OAuth-capable servers:

```sh
opencode mcp auth
```

Remove stored OAuth credentials when you need to sign in again or switch accounts:

```sh
opencode mcp logout sentry
```

## Notes

- Remote servers use OAuth by default. If the list shows `needs authentication`, run `/mcps` in OpenCode, select the server, and sign in.
- To remove a server, delete its entry from the project or global configuration where it was added; there is no remove subcommand in the official page.
- Quote `--header` values containing secrets and prefer `{env:NAME}` references over literal keys, which end up in shell history.
- `opencode mcp add ... -- npx -y <package>` runs third-party code; review the package before adding it.
- The MCP protocol itself is specified in the mcp-spec skill. MCP configuration for Claude Code and Codex is covered by anthropic-claude-code-extend and openai-codex.

## Related

- cli.md
- https://opencode.ai/docs/mcp-servers/
