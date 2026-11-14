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
- Standards-first for new UI: declare the UI resource with `_meta.ui.resourceUri`, use the `ui/*` JSON-RPC bridge over `postMessage` (initialization, notifications, tool calls, messages, model-visible context), and keep tools useful without UI so the model can finish the workflow in clients that do not render components. The compatibility aliases remain for existing integrations; new UI uses the MCP Apps field/method column. For sidebar apps, file viewers, and richer forms see [extensions.md](./extensions.md).
- `window.openai` extension examples (use only where the standard has no equivalent): `requestCheckout` (Instant Checkout), `uploadFile` / `selectFiles` / `getFileDownloadUrl` (file handling), `requestModal` (host-controlled modals), `widgetState` / `setWidgetState` (widget-state persistence). Feature-detect, e.g. `if (openai?.requestModal) { await openai.requestModal({ template: "ui://widget/details.html" }); }`, and fall back otherwise.
- Feature-detect `window.openai` extensions and provide a fallback; do not branch on host/product name.
- Decoupled call flow: the model calls the data tool (e.g. `roll_dice`), receives its `structuredContent`, calls the render tool with that data, and the widget renders once with final, model-checked context. Search/fetch tools return IDs plus metadata with no widget template; only the render tool includes `_meta.ui.resourceUri`. Keep data tools reusable (complete `structuredContent`), keep render tools presentation-only, state the dependency in the render tool description (e.g. "Always call `roll_dice` first"), and let the UI call data tools directly for local interactions such as "Re-roll" without remounting. In the official dice example the widget uses `App` from `@modelcontextprotocol/ext-apps` (`app.ontoolinput`, `app.ontoolresult`, `app.callServerTool({ name, arguments })`, `await app.connect()`), and tools set `_meta["openai/toolInvocation/invoking"]` / `["openai/toolInvocation/invoked"]` status strings.
- Optional component library: `@openai/apps-sdk-ui` for buttons, cards, inputs, layout matching ChatGPT's container.
- Use `ui/update-model-context` to send UI-state info the model needs to know about (selection, staged edit) — the portable MCP Apps mechanism.
- `window.openai.widgetState` / `window.openai.setWidgetState(state)` provide ChatGPT-specific widget-scoped persistence; `setWidgetState` is synchronous, call after each meaningful UI-state change. Widget state is for one rendered instance, not a source of truth for business data.
- For images the model should see across turns, use the structured shape `{ modelContent, privateContent, imageIds }` in `setWidgetState`; only include file IDs from `uploadFile`, `selectFiles`, tool input, or tool result file references.
- Avoid `localStorage` for core state — the iframe is isolated and browser storage is not a reliable cross-device/session layer; store cross-session state on your server instead.
- Embed the component as an MCP resource with MIME type `text/html;profile=mcp-app` (use SDK constant `RESOURCE_MIME_TYPE`). Treat the resource URI as a cache key — publish a new URI on breaking HTML/JS/CSS changes and update every referencing tool.
- Content security policy: declare `connectDomains` (API requests), `resourceDomains` (scripts/styles/images/assets), and `frameDomains` (only for specific nested iframe origins, blocked by default otherwise). Keep allowlists narrow; plugin review checks the declared policy against behavior.
- Resource `_meta.ui` fields shown in the official example: `prefersBorder`, `domain`, and `csp` (`connectDomains`, `resourceDomains`; `frameDomains` for nested iframes). Associate the resource URI with only the tools that should render the component.
- Embedding an existing editor/admin interface: a server at `https://api.example.com/mcp` can declare `https://app.example.com` in `frameDomains` (same registrable domain); provide the required justification at submission and follow the plugin-guidelines iframe policy (restrictions on shared hosting, review requirements).
- Project scaffold (Node 18+ recommended): keep component code separate from server logic (`server/` and `web/` with `src/component.tsx` building to `dist/component.js`); `npm install react@^19 react-dom@^19` plus `-D typescript esbuild`; bundle with `esbuild src/component.tsx --bundle --format=esm --jsx=automatic --outfile=dist/component.js`, then inline the bundle in the resource HTML (`<div id="root"></div><script type="module">…</script>`). Render from `toolResult?.structuredContent` delivered by `ui/notifications/tool-result` and treat it as untrusted input. The Pizzaz gallery (List, Carousel, Map, Album, Video) in the examples page shows bundling assets, wiring host APIs, and state structure.
- Cross-session durable storage: keep latency low for interactive UI, protect private data with server-side authorization, plan for data residency/compliance, rate-limit retries and concurrent UI instances, and version stored objects for migration.
- Widget localization: host mirrors locale to `document.documentElement.lang`; use it to drive `react-intl` or similar.
- Source: https://developers.openai.com/plugins/build/chatgpt-ui (local .md twin copy, fetched 2026-11-14).
- Checkout UI (`window.openai.requestCheckout`) is covered separately. See [Checkout and monetization](./checkout-monetization.md).

## Related

- [MCP server](./mcp-server.md)
- [App quickstart](./app-quickstart.md)
- [Checkout and monetization](./checkout-monetization.md)
