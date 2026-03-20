# Integrations

Source: https://knip.dev/reference/integrations

## VS Code Extension

Official extension:
- Inline warnings for unused dependencies, exports, files
- Hover information with import/usage locations
- Tree views for imports/exports
- Contention detection (circular dependencies)
- Built-in MCP Server

Available on VS Code Marketplace and Open VSX Registry.

## JetBrains Plugin

Community-maintained. Supports WebStorm, IntelliJ IDEA, etc. Powered by Knip Language Server.

## MCP Server

Enables coding agents to configure Knip automatically.

```sh
npx @knip/mcp
```

VS Code extension includes this by default.

## Language Server

Underlying technology for IDE integrations. Builds the full module graph and provides a graph explorer session.
