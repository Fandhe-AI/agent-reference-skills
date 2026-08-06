# reference

| Name | Description | Path |
|------|-------------|------|
| `window.openai` component bridge | Compatibility/extension global for widget iframes: capabilities, `useOpenAiGlobal`, close/display mode/modal | [window-openai-bridge.md](./window-openai-bridge.md) |
| File APIs | Upload/select/download file helpers and file-input schema convention for tool descriptors | [file-apis.md](./file-apis.md) |
| Host-backed navigation | Sandbox iframe navigation mirrored into ChatGPT UI via standard routers | [host-backed-navigation.md](./host-backed-navigation.md) |
| Tool descriptor `_meta` fields | `_meta.ui.resourceUri`, `openai/outputTemplate`, `openai/fileParams`, `toolInvocation` status text, etc. | [tool-descriptor-meta.md](./tool-descriptor-meta.md) |
| Annotations | `readOnlyHint` / `destructiveHint` / `openWorldHint` / `idempotentHint` tool descriptor annotations | [tool-annotations.md](./tool-annotations.md) |
| Component resource `_meta` fields | `_meta.ui.prefersBorder` / `_meta.ui.csp` / `_meta.ui.domain` and widget CSP metadata on `registerResource` | [component-resource-meta.md](./component-resource-meta.md) |
| Tool results | `structuredContent` / `content` / `_meta` result fields, `openai/widgetSessionId`, error `mcp/www_authenticate` | [tool-results.md](./tool-results.md) |
| `_meta` fields the client provides | `openai/locale`, `openai/userAgent`, `openai/userLocation`, `openai/subject`, `openai/session`, `openai/organization` | [client-provided-meta.md](./client-provided-meta.md) |
