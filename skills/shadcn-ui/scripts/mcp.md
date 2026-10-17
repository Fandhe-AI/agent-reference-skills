---
source: https://ui.shadcn.com/docs/mcp
---

# MCP

Commands to configure the shadcn MCP server for each MCP client. Source: the official mcp page (retrieved 2026-10-16).

## Configure Claude Code

```sh
npx shadcn@latest mcp init --client claude
```

Restart Claude Code afterwards. You can debug with the `/mcp` command inside Claude Code.

## Configure Cursor

```sh
npx shadcn@latest mcp init --client cursor
```

Afterwards, enable the shadcn MCP server in Cursor Settings.

## Configure VS Code

```sh
npx shadcn@latest mcp init --client vscode
```

Afterwards, open `.vscode/mcp.json` and click **Start** on the shadcn server.

## Configure Codex

```sh
npx shadcn@latest mcp init --client codex
```

The `shadcn` CLI cannot update `~/.codex/config.toml` automatically. Following the official instructions, add the configuration below manually and restart Codex.

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Configure OpenCode

```sh
npx shadcn@latest mcp init --client opencode
```

Restart OpenCode afterwards.

## MCP server start command (for manual configuration)

```sh
npx shadcn@latest mcp
```

In each client's configuration file, set `command` to `npx` and `args` to `["shadcn@latest", "mcp"]` (examples for `.mcp.json`, `.cursor/mcp.json` and `.vscode/mcp.json` are on the official mcp page).

## Fix "No tools or prompts"

```sh
npx clear-npx-cache
```

Then re-enable the shadcn server in the MCP client.
