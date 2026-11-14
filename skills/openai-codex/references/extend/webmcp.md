# Site tools (WebMCP)

Site tools are ChatGPT's implementation of the proposed WebMCP standard: a website offers actions directly to an AI agent alongside its normal interface. In the built-in browser of the ChatGPT desktop app, ChatGPT Work and Codex can discover and use them.

## Signature / Usage

Register a tool from your page's JavaScript module (read-only example returning the page title):

```typescript
if (typeof document.modelContext?.registerTool === "function") {
  await document.modelContext.registerTool({
    name: "get_page_title",
    description: "Read the title of the current page.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async () => ({ title: document.title }),
  });
}
```

For tools with arguments, describe them in `inputSchema` and use them in `execute` to call the app's existing logic. You can also add WebMCP attributes to an HTML form instead of using JavaScript.

### Using site tools in the browser

- Open the site in the built-in browser and ask ChatGPT Work or Codex for help; the agent discovers relevant tools.
- Select **Site tools** in the address bar; **Available site tools** lists individual tools; **Recently used** opens **Sources** to review calls.
- Tools belong to the page that provides them; navigating away can make them unavailable. Without a suitable tool the agent may fall back to regular browser capabilities.
- Turn off with **Enable site tools** in **Settings > Browser > Permissions**.

### Docs example tools (ChatGPT Learn / OpenAI Developers)

| Tool | What it does |
|------|--------------|
| `search_openai_docs` | Searches OpenAI documentation. |
| `lookup_page` | Reads a documentation page by path or URL. |
| `lookup_context` | Reads the current docs route and selected text. |
| `navigate_to_page` | Opens a matching page on the current documentation site. |
| `generate_custom_guide` | Starts a custom build or learning guide and returns its status and link (generation is asynchronous). |

## Notes

- Requires a supported model and a page that provides tools; account or managed workspace browser policy can grant access, and browser settings and site permissions still apply.
- WebMCP vs MCP: MCP connects an app to a local or remote server whose tools work independently of an open page; WebMCP exposes a site's capabilities to an agent visiting the page, with no separate server to install. A site can support both (see plugins.md for plugins with an MCP server).
- Registration: the built-in browser discovers tools in the top-level page and in same-origin and cross-origin iframes; each frame must use a secure context; access is checked for the origin providing the tool; `exposedTo` can be omitted for agent discovery.
- Keep inputs narrow, describe side effects, return enough to verify the result, reuse existing authentication / authorization / validation, and preserve the normal UI for browsers without WebMCP.
- Security: tool definitions and results are untrusted; a tool's name or "read-only" claim isn't proof. Each invocation gets a safety review and is tied to its originating page and tool registration; normal website-access and confirmation policies still apply for consequential actions.
- Limitation: site tools currently run only in the desktop app's built-in browser.
- Codex can be asked to add WebMCP support to a web app or Site (describe what the agent should be able to do; reuse existing logic and permissions). Spec and API details: the WebMCP specification and Chrome's developer guide.
- Source: https://learn.chatgpt.com/docs/webmcp (retrieved 2026-11-14).

## Related

- [Browser](./browser.md)
- [Annotations extensibility](./annotations-extensibility.md)
- [Plugins](./plugins.md)
