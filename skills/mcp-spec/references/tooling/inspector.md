---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector
---

# MCP Inspector

Interactive developer tool for testing and debugging MCP servers (github.com/modelcontextprotocol/inspector).

## Signature / Usage

The Inspector runs directly through `npx` without requiring installation:

```bash
npx @modelcontextprotocol/inspector <command>
npx @modelcontextprotocol/inspector <command> <arg1> <arg2>
```

Servers from npm or PyPI:

```bash
npx -y @modelcontextprotocol/inspector npx <package-name> <args>
# For example
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem /Users/username/Desktop

npx @modelcontextprotocol/inspector uvx <package-name> <args>
# For example
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
```

Locally developed servers:

```bash
# TypeScript
npx @modelcontextprotocol/inspector node path/to/server/index.js args...

# Python
npx @modelcontextprotocol/inspector \
  uv \
  --directory path/to/server \
  run \
  package-name \
  args...
```

Please carefully read any attached README for the most accurate instructions.

## Options / Props

| Pane / tab | Capabilities |
| --- | --- |
| Server connection pane | Select the transport for connecting to the server; for local servers, customize command-line arguments and environment |
| Resources tab | List resources; show metadata (MIME types, descriptions); inspect content; test subscriptions |
| Prompts tab | Display prompt templates; show arguments and descriptions; test with custom arguments; preview generated messages |
| Tools tab | List tools; show schemas and descriptions; test with custom inputs; display execution results |
| Notifications pane | Present all logs recorded from the server; show notifications received from the server |

## Notes

- Recommended workflow: start development (launch Inspector, verify basic connectivity, check capability negotiation); iterate (make server changes, rebuild, reconnect, test affected features, monitor messages); test edge cases (invalid inputs, missing prompt arguments, concurrent operations, error handling and error responses).
- Only the page present in tag `2026-07-28` is covered. Inspector subpages listed on the current site (web, cli, tui, etc.) were added after the tag and are not included.

## Related

- [Debugging](./debugging.md)
- [SDKs](./sdks.md)
