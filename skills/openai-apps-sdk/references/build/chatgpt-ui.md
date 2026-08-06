# Add UI to your MCP server

Optional custom UI for tools that need inspection, comparison, editing, confirmation, or navigation of structured information. Components run in an iframe inside ChatGPT, communicate through the MCP Apps bridge (JSON-RPC over `postMessage`), and follow the open MCP Apps standard so the same UI runs across compatible hosts.

## Signature / Usage

```json
{ "_meta": { "ui": { "resourceUri": "ui://widget/dice.html" } } }
```

```ts
server.registerResource("dice-widget", TEMPLATE_URI, {}, async () => ({
  contents: [{ uri: TEMPLATE_URI, mimeType: "text/html;profile=mcp-app", text: widgetHtml }],
}));

server.registerTool(
  "render_dice_widget",
  {
    title: "Render dice widget",
    description: "Render the dice widget from roll data. First call roll_dice, then pass its sides and value to this tool.",
    inputSchema: { sides: z.number().int().min(2), value: z.number().int().min(1) },
    outputSchema: { sides: z.number().int().min(2), value: z.number().int().min(1) },
    _meta: { ui: { resourceUri: TEMPLATE_URI } },
  },
  async ({ sides, value }) => ({ structuredContent: { sides, value }, content: [] })
);
```

## Options / Props

| Goal | MCP Apps standard | ChatGPT compatibility alias |
|------|--------------------|------------------------------|
| Link a tool to a UI resource | `_meta.ui.resourceUri` | `_meta["openai/outputTemplate"]` |
| Receive tool input | `ui/initialize` + `ui/notifications/tool-input` | `window.openai.toolInput` |
| Receive tool results | `ui/notifications/tool-result` | `window.openai.toolOutput` |
| Call a tool from the UI | `tools/call` | `window.openai.callTool` |
| Send a follow-up message | `ui/message` | `window.openai.sendFollowUpMessage` |

Presentation choices: inline card (focused result/confirmation), inline carousel (scan/choose among rich options), fullscreen (rich tasks needing room, e.g. maps/editors), picture-in-picture (ongoing activity that stays visible, e.g. a live session or video).

State ownership:

| State type | Owner | Lifetime | Examples |
|------------|-------|----------|----------|
| Business data (authoritative) | MCP server or external service | Long-lived | Tasks, tickets, documents |
| UI state (ephemeral) | UI instance | Active UI instance | Selected row, expanded panel, sort order |
| Cross-session state (durable) | Storage you control | Cross-session/conversation | Saved filters, view mode, workspace |

## Notes

- **Decoupled pattern**: separate data tools (fetch/compute/mutate, return only `structuredContent`, no `_meta.ui.resourceUri`) from render tools (take final data, own the template). Attaching a widget template to every tool call causes excessive iframe re-renders.
- Feature-detect `window.openai` extensions and provide a fallback; do not branch on host/product name.
- Optional component library: `@openai/apps-sdk-ui` for buttons, cards, inputs, layout matching ChatGPT's container.
- Use `ui/update-model-context` to send UI-state info the model needs to know about (selection, staged edit) — the portable MCP Apps mechanism.
- `window.openai.widgetState` / `window.openai.setWidgetState(state)` provide ChatGPT-specific widget-scoped persistence; `setWidgetState` is synchronous, call after each meaningful UI-state change. Widget state is for one rendered instance, not a source of truth for business data.
- For images the model should see across turns, use the structured shape `{ modelContent, privateContent, imageIds }` in `setWidgetState`; only include file IDs from `uploadFile`, `selectFiles`, tool input, or tool result file references.
- Avoid `localStorage` for core state — the iframe is isolated and browser storage is not a reliable cross-device/session layer; store cross-session state on your server instead.
- Embed the component as an MCP resource with MIME type `text/html;profile=mcp-app` (use SDK constant `RESOURCE_MIME_TYPE`). Treat the resource URI as a cache key — publish a new URI on breaking HTML/JS/CSS changes and update every referencing tool.
- Content security policy: declare `connectDomains` (API requests), `resourceDomains` (scripts/styles/images/assets), and `frameDomains` (only for specific nested iframe origins, blocked by default otherwise). Keep allowlists narrow; plugin review checks the declared policy against behavior.
- Widget localization: host mirrors locale to `document.documentElement.lang`; use it to drive `react-intl` or similar.
- Checkout UI (`window.openai.requestCheckout`) is covered separately. See [Checkout and monetization](./checkout-monetization.md).

## Related

- [MCP server](./mcp-server.md)
- [App quickstart](./app-quickstart.md)
- [Checkout and monetization](./checkout-monetization.md)
