---
source: https://modelcontextprotocol.io/extensions/apps/overview
---

# MCP Apps

MCP Apps (`io.modelcontextprotocol/ui`) let servers return interactive HTML interfaces (data visualizations, forms, dashboards) that render directly in the chat inside an MCP host.

## Signature / Usage

A tool declares a UI resource in its description via `_meta.ui.resourceUri` pointing to a `ui://` resource:

```typescript
registerAppTool(
  server,
  "get-time",
  {
    title: "Get Time",
    description: "Returns the current server time.",
    inputSchema: {},
    _meta: { ui: { resourceUri } },
  },
  async () => {
    const time = new Date().toISOString();
    return {
      content: [{ type: "text", text: time }],
    };
  },
);
```

Flow when the LLM calls a tool that supports MCP Apps:

1. **UI preloading**: the tool description includes `_meta.ui.resourceUri` (a `ui://` resource); the host can preload it before the tool is called.
2. **Resource fetch**: the host fetches the UI resource (an HTML page, often bundled with JS and CSS). Apps can load external scripts and resources from origins specified in `_meta.ui.csp`.
3. **Sandboxed rendering**: web hosts typically render the HTML in a sandboxed iframe. The resource's `_meta.ui` object can include `permissions` (e.g., microphone, camera) and `csp`.
4. **Bidirectional communication**: app and host talk over a JSON-RPC dialect of MCP via postMessage. Some messages are shared with core MCP (e.g., `tools/call`), some similar (e.g., `ui/initialize`), and most are new with a `ui/` method prefix.

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`). Full API documentation and specification live in the separate `modelcontextprotocol/ext-apps` repository and its docs site; they are not reproduced here.
- Security model: the app runs in a sandboxed iframe; it cannot access the parent DOM, host cookies or local storage, navigate the parent page, or execute scripts in the parent context. All communication goes through postMessage, and the host controls which capabilities the app can access (e.g., restricting which tools an app can call, or disabling `sendOpenLink`).
- Transport is postMessage instead of stdio or HTTP. The `App` class from `@modelcontextprotocol/ext-apps` is a convenience wrapper, not a requirement; the postMessage protocol can be implemented directly. The ext-apps examples directory includes starter templates for React, Vue, Svelte, Preact, Solid, and vanilla JavaScript.
- Client support: hosts can use `@mcp-ui/client` (React components) or the SDK's App Bridge module. The client advertises `io.modelcontextprotocol/ui` with `mimeTypes: ["text/html;profile=mcp-app"]` in `extensions` (see Extensions Overview). See the client matrix for supported hosts.
- Distance from OpenAI Apps SDK: MCP Apps (`ui://` resources, `_meta.ui.resourceUri`, official extension) is not the OpenAI Apps SDK (`window.openai`, ChatGPT-specific `_meta`). See the openai-apps-sdk skill for the latter.
- This skill covers the protocol extension; host-side configuration lives in host skills such as anthropic-claude-code-extend.

## Related

- [Build an MCP App](./mcp-apps-build.md)
- [Extensions Overview](./extensions-overview.md)
- [Extension Client Matrix](./client-matrix.md)
