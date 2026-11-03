---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/, https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/, https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/community-mcp-server/
---

# MCP

Run a remote MCP server locally, inspect it with the MCP Inspector, and connect MCP clients to it.

## Signature / Usage

### Start the local development server

```sh
npm start
```

With the authless template, the MCP endpoint is `http://localhost:8788/mcp`. Opening `/mcp` directly in a browser does not work, because the endpoint expects MCP protocol messages from an MCP client.

### Start the MCP Inspector

```sh
npx @modelcontextprotocol/inspector
```

```sh
npx @modelcontextprotocol/inspector@latest
```

In the Inspector that opens in your browser, enter the server URL (for example `http://localhost:8788/mcp`), select **Connect**, then **List Tools** to list the tools. If the server requires authentication, use **Open Auth settings** and then **Quick OAuth Flow**. Do not share the URL containing `MCP_PROXY_AUTH_TOKEN` that the command prints.

### Add a remote MCP server to Claude Code

```sh
claude mcp add --transport http my-server https://my-mcp-server.my-account.workers.dev/mcp
claude mcp list
```

If the server requires authentication, complete the authorization flow in your browser. Replace the URL with your own deployed server.

### Run a community MCP server (Discourse example)

```sh
npx @discourse/mcp@latest
```

## Notes

- `claude mcp add` is the Claude Code consuming side (anthropic-claude-code-extend skill).
- `npx @discourse/mcp@latest` downloads and runs third-party code; run it only for a server you trust.

## Related

- [deploy.md](./deploy.md) — deploying an MCP server
- [create-project.md](./create-project.md) — scaffolding an authless MCP server
- For the MCP protocol specification itself, see the mcp-spec skill.
