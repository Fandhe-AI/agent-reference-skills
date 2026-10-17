---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector
---

# Inspector

Commands to launch MCP Inspector via `npx` to test and debug MCP servers interactively.

## Basic usage

```bash
npx @modelcontextprotocol/inspector <command>
```

```bash
npx @modelcontextprotocol/inspector <command> <arg1> <arg2>
```

No installation is needed; run it directly with `npx`.

## Inspect a server from an npm package

```bash
npx -y @modelcontextprotocol/inspector npx <package-name> <args>
# For example
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem /Users/username/Desktop
```

## Inspect a server from a PyPI package

```bash
npx @modelcontextprotocol/inspector uvx <package-name> <args>
# For example
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
```

## Inspect a local TypeScript server under development

```bash
npx @modelcontextprotocol/inspector node path/to/server/index.js args...
```

## Inspect a local Python server under development

```bash
npx @modelcontextprotocol/inspector \
  uv \
  --directory path/to/server \
  run \
  package-name \
  args...
```

## Notes

- Source: tag `2026-07-28` raw (`docs/docs/2026-07-28/tools/inspector.mdx`), fetched 2026-10-16.
- The instructions in the README of the server under inspection are the most accurate (per the source).
- Inspector CLI / TUI / mcpdo and other subpages added after the tag do not exist in this tag and are not included.
- `npx` fetches and runs packages from the npm registry. Do not pass untrusted package names.
