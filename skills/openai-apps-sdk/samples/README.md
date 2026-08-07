# samples

| Name | Description | Path |
| --- | --- | --- |
| Minimal MCP Server with Tool + UI Resource | Working Node MCP server exposing tools that share one `ui://` widget resource over Streamable HTTP | [minimal-mcp-server.md](./minimal-mcp-server.md) |
| Decoupled Data Tool and Render Tool Sharing a UI Resource | Split a data tool and a render tool so re-rolls call the data tool directly without remounting the widget | [tool-with-ui-resource.md](./tool-with-ui-resource.md) |
| Persisting Widget State with window.openai | Read and persist per-widget UI state across renders with `window.openai.widgetState` / `setWidgetState` | [window-openai-state.md](./window-openai-state.md) |
| OAuth-Protected Tools with securitySchemes | Declare per-tool auth requirements and drive OAuth 2.1 + PKCE via protected-resource metadata discovery | [oauth-auth-flow.md](./oauth-auth-flow.md) |
| Tool Accepting an Uploaded File | Declare a tool input that accepts a ChatGPT-uploaded/selected file via the `OpenAIFile` schema | [file-input-tool.md](./file-input-tool.md) |
| Checkout API: Widget Purchase Flow | Trigger the ChatGPT native payment sheet with `window.openai.requestCheckout` and complete it server-side | [checkout-flow.md](./checkout-flow.md) |
| Tool Annotations for Approval Framing | Use `readOnlyHint` / `destructiveHint` / `openWorldHint` so ChatGPT frames approval prompts correctly | [read-only-annotations.md](./read-only-annotations.md) |
