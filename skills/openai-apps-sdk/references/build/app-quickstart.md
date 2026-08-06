# App quickstart

End-to-end tutorial that builds a to-do plugin: an optional web component rendered in an iframe plus an MCP server that defines the tools ChatGPT and Codex call. ChatGPT implements the open MCP Apps UI standard so the same UI runs across compatible hosts.

## Signature / Usage

```bash
npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod
node server.js
```

The web component (`public/todo-widget.html`) establishes the MCP Apps bridge using JSON-RPC over `postMessage`:

- `ui/initialize` — initialize the bridge
- `ui/notifications/initialized` — confirm readiness
- `tools/call` — invoke MCP tools from the UI
- `ui/notifications/tool-result` — listen for model-initiated tool call results

```js
const initializeBridge = async () => {
  const appInfo = { name: "todo-widget", version: "0.1.0" };
  const appCapabilities = {};
  const protocolVersion = "2026-01-26";
  await rpcRequest("ui/initialize", { appInfo, appCapabilities, protocolVersion });
  rpcNotify("ui/notifications/initialized", {});
};
```

The server registers a UI resource and tools:

```js
registerAppResource(server, "todo-widget", "ui://widget/todo.html", {}, async () => ({
  contents: [{ uri: "ui://widget/todo.html", mimeType: RESOURCE_MIME_TYPE, text: todoHtml }],
}));

registerAppTool(
  server,
  "add_todo",
  {
    title: "Add todo",
    description: "Creates a todo item with the given title.",
    inputSchema: addTodoInputSchema,
    outputSchema: todoOutputSchema,
    _meta: { ui: { resourceUri: "ui://widget/todo.html" } },
  },
  async (args) => { /* ... */ }
);
```

## Options / Props

| Step | Purpose |
|------|---------|
| Build a web component | Optional; skip if the plugin needs only tools, no ChatGPT UI |
| Build an MCP server | Register tools (`add_todo`, `complete_todo`) and a UI resource; listens on `/mcp` |
| Run locally | `node server.js`; no build step needed for vanilla HTML |
| Test with MCP Inspector | `npx @modelcontextprotocol/inspector@latest`, connect via Streamable HTTP |
| Expose publicly | `ngrok http <port>` for a public HTTPS URL during development |
| Connect in ChatGPT | Enable Developer mode, create a connection at chatgpt.com/plugins with the `/mcp` URL |

## Notes

- Uses the Node MCP SDK (`@modelcontextprotocol/sdk`) plus `@modelcontextprotocol/ext-apps` for `registerAppTool` / `registerAppResource` helpers; a Python SDK example is available in the `openai-apps-sdk-examples` GitHub repo.
- For new UI, prefer the shared MCP Apps bridge; layer `window.openai` extensions only for ChatGPT-specific capabilities.
- Refresh the developer-mode plugin connection after every server change (tools, metadata).

## Related

- [MCP server](./mcp-server.md)
- [Add UI to your MCP server](./chatgpt-ui.md)
- [Authentication](./auth.md)
