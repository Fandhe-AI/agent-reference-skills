# samples

| Name | Description | Path |
|------|-------------|------|
| Checkout API: Widget Purchase Flow | Trigger the ChatGPT native payment sheet from a widget with `window.openai.requestCheckout`, backed by an MCP tool that completes the checkout session server-side. | [checkout-flow.md](./checkout-flow.md) |
| Tool Accepting an Uploaded File | Declare a tool input that accepts a ChatGPT-uploaded or selected file by referencing the four required `OpenAIFile` schema properties and flagging the parameter via `_meta["openai/fileParams"]`. | [file-input-tool.md](./file-input-tool.md) |
| MCP Events Webhook | Advertise `events` on an MCP server, define and subscribe to an event, verify the callback, send signed webhook deliveries with Node.js, and unsubscribe. | [mcp-events-webhook.md](./mcp-events-webhook.md) |
| Minimal MCP Server with Tool + UI Resource | A working Node MCP server exposing two tools (`add_todo`, `complete_todo`) that share one `ui://` widget resource, servable over Streamable HTTP for ChatGPT to connect to. | [minimal-mcp-server.md](./minimal-mcp-server.md) |
| OAuth-Protected Tools with securitySchemes | Declare per-tool auth requirements with `securitySchemes` and let ChatGPT drive the OAuth 2.1 + PKCE flow via protected-resource / authorization-server metadata discovery. | [oauth-auth-flow.md](./oauth-auth-flow.md) |
| Profile Tool | Declare a read-only `get_profile` tool marked with `_meta["openai/profile"]: true` and a profile `outputSchema`, returning the profile for the current credentials. | [profile-tool.md](./profile-tool.md) |
| Tool Annotations for Approval Framing | Use MCP tool `annotations` (`readOnlyHint`, `destructiveHint`, `openWorldHint`, `idempotentHint`) so ChatGPT can decide whether a tool call needs explicit user confirmation. | [read-only-annotations.md](./read-only-annotations.md) |
| Decoupled Data Tool and Render Tool Sharing a UI Resource | Split a tool into a data tool (returns chainable `structuredContent`, no template) and a render tool (owns the `ui://` widget template) so re-rolls call the data tool directly without remounting the widget. | [tool-with-ui-resource.md](./tool-with-ui-resource.md) |
| Persisting Widget State with window.openai | Read and persist per-widget UI state (e.g. a selected list item) across renders using `window.openai.widgetState` and `window.openai.setWidgetState`. | [window-openai-state.md](./window-openai-state.md) |
