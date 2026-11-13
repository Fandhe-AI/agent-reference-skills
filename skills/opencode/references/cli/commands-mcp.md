---
source: https://opencode.ai/docs/cli/commands/#mcp
---

# opencode mcp

Manages MCP (Model Context Protocol) servers.

## Signature / Usage

```bash
$ opencode mcp list
```

Add a remote server.

```bash
$ opencode mcp add context7 --url https://mcp.context7.com/mcp
```

Add a local server to the global config.

```bash
$ opencode mcp add everything --global -- npx -y @modelcontextprotocol/server-everything
```

Add a local server with an environment variable.

```bash
$ opencode mcp add everything --env LOG_LEVEL=debug -- npx -y @modelcontextprotocol/server-everything
```

Add a remote server with a header.

Adapted (not in the official docs): the official example passes a literal header value (`CONTEXT7_API_KEY=secret`); an `{env:NAME}` reference is used here so the key stays out of the config file and shell history.

```bash
$ opencode mcp add context7 --url https://mcp.context7.com/mcp --header 'CONTEXT7_API_KEY={env:CONTEXT7_API_KEY}'
```

Authenticate with an OAuth-capable remote server.

```bash
$ opencode mcp auth sentry
```

Remove stored OAuth credentials for a server.

```bash
$ opencode mcp logout sentry
```

View all subcommands and flags.

```bash
$ opencode mcp --help
```

## Notes

- The MCP protocol specification is covered by the `mcp-spec` skill; Claude Code and Codex MCP configuration are covered by their own skills (anthropic-claude-code-extend, openai-codex).
- Local MCP servers run commands on your machine; add only servers you trust.
- Adapted from the official docs: the `--header` example uses the quoted `{env:NAME}` form documented at https://opencode.ai/docs/mcp-servers/ instead of a literal secret value.

## Related

- [Commands: plugin](./commands-plugin.md)
