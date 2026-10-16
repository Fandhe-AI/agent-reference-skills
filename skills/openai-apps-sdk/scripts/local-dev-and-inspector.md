# local-dev-and-inspector

Run the MCP server locally, inspect it with MCP Inspector, and expose it to ChatGPT for testing as a custom MCP server plugin.

## Start the MCP server

```bash
node server.js
```

Run this from the directory that contains `server.js` (or `server.ts`). The quickstart server listens on `http://localhost:<port>/mcp`, defaulting to port `8787` when no `PORT` environment variable is set, and prints `Todo MCP server listening on http://localhost:8787/mcp` once ready.

Source: https://developers.openai.com/plugins/build/app-quickstart

## Inspect the MCP server with MCP Inspector

```bash
npx @modelcontextprotocol/inspector@latest
```

Opens the MCP Inspector UI. Select **Streamable HTTP**, enter the server URL (for example `http://localhost:8787/mcp`), and connect to list tools, call them, and inspect responses.

Source: https://developers.openai.com/plugins/build/app-quickstart, https://developers.openai.com/plugins/deploy/connect-chatgpt

## Expose the local server to the public internet with ngrok

> **Warning**: `ngrok http <port>` exposes your local server to the public internet at a shareable URL. Only run this against a server without secrets you don't intend to disclose, and prefer Secure MCP Tunnel (see connect-chatgpt docs) when you need to keep the server private during testing.

```bash
ngrok http <port>
```

Produces a public URL such as `https://<subdomain>.ngrok.app`. When adding the server in ChatGPT, use the `/mcp` path appended to that URL (for example `https://<subdomain>.ngrok.app/mcp`).

Source: https://developers.openai.com/plugins/build/app-quickstart

## Add and refresh a custom MCP server in ChatGPT

Account and workspace policies apply to adding and using custom MCP servers.

1. Go to [ChatGPT Plugins](https://chatgpt.com/plugins).
2. Select the plus button, then **Add custom MCP server**.
3. Enter a user-facing name and description.
4. Under **Connection**, choose the connection method: for a public endpoint, enter the MCP server URL including the `/mcp` path; for Secure MCP Tunnel, select **Tunnel**, then choose an available tunnel or enter its `tunnel_id`.
5. Configure authentication, review the risk warning, and select **I understand and want to continue**.
6. Select **Create as a plugin**.
7. Review the tools and metadata discovered from the server.

After changing tool names, descriptions, schemas, annotations, authentication, or UI resources:

1. Deploy or restart the MCP server.
2. Open the connection at [ChatGPT Plugins](https://chatgpt.com/plugins).
3. Select **Refresh**.
4. Confirm that the advertised metadata changed.
5. Start a new conversation and rerun the affected tests.

This refresh flow applies to custom MCP servers connected directly in ChatGPT. Published plugins use continuous review for tool updates.

Source: https://developers.openai.com/plugins/deploy/connect-chatgpt
