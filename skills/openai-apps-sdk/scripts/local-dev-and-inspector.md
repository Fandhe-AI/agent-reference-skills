# local-dev-and-inspector

Run the MCP server locally, inspect it with MCP Inspector, and expose it to ChatGPT for developer-mode testing.

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

> **Warning**: `ngrok http <port>` exposes your local server to the public internet at a shareable URL. Only run this against a server without secrets you don't intend to disclose, and prefer Secure MCP Tunnel (see connect-chatgpt docs) when you need to keep the server private during developer-mode testing.

```bash
ngrok http <port>
```

Produces a public URL such as `https://<subdomain>.ngrok.app`. When connecting the server in ChatGPT developer mode, use the `/mcp` path appended to that URL (for example `https://<subdomain>.ngrok.app/mcp`).

Source: https://developers.openai.com/plugins/build/app-quickstart

## Connect and refresh the server in ChatGPT developer mode

1. In ChatGPT, open **Settings → Security and login** and turn on **Developer mode**.
2. Go to [ChatGPT Plugins](https://chatgpt.com/plugins), select the plus button, and paste the HTTPS + `/mcp` URL.
3. After changing tool names, descriptions, schemas, annotations, authentication, or UI resources, redeploy or restart the server, open the connection at chatgpt.com/plugins, and select **Refresh**.

Source: https://developers.openai.com/plugins/build/app-quickstart, https://developers.openai.com/plugins/deploy/connect-chatgpt
