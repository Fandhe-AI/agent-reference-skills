# server-features

| Name | Description | Path |
|------|-------------|------|
| Caching (CacheableResult) | Cacheable results carry two hints, `ttlMs` and `cacheScope`, letting clients reuse responses and avoid unnecessary re-fetching. Caching is complementary to change notifications. | [caching.md](./caching.md) |
| Completion | Servers offer autocompletion suggestions for the arguments of prompts and resource templates via `completion/complete`, similar to IDE code completion. | [completion.md](./completion.md) |
| server/discover | `server/discover` lets a client query a server's supported protocol versions, capabilities, and identity before sending any other requests. Servers **MUST** implement it. | [discover.md](./discover.md) |
| Logging (Deprecated) | Servers send structured log messages as `notifications/message`; clients control verbosity per request via `_meta`. Deprecated as of protocol version 2026-07-28. | [logging.md](./logging.md) |
| Pagination | List operations that may return large result sets use opaque cursor-based pagination rather than numbered pages. | [pagination.md](./pagination.md) |
| Prompts | Servers expose prompt templates to clients via `prompts/list` and `prompts/get`. Prompts are user-controlled: exposed so the user can explicitly select them (for example as slash commands). | [prompts.md](./prompts.md) |
| Resource List Changed and Subscriptions | Servers notify clients when the resource list changes and when specific watched resources are updated. Per-resource updates are requested via `subscriptions/listen`. | [resource-change-notifications.md](./resource-change-notifications.md) |
| Resource Templates | Resource templates let servers expose parameterized resources using URI templates (RFC 6570) via `resources/templates/list`. Arguments may be auto-completed through the completion API. | [resource-templates.md](./resource-templates.md) |
| Resources | Servers expose data that provides context to language models (files, database schemas, application-specific information), each uniquely identified by a URI. Resources are application-driven. | [resources.md](./resources.md) |
| Server Features Overview | Servers provide the fundamental building blocks for adding context to language models via MCP: Prompts, Resources, and Tools. | [server-overview.md](./server-overview.md) |
| Tool Definition (Tool data type) | A tool definition: `name`, optional `title`, `description`, optional `icons`, `inputSchema`, optional `outputSchema`, and optional `annotations`. | [tool-definition.md](./tool-definition.md) |
| Stateful Tools and Tool Error Handling | Tools report errors through two mechanisms (protocol errors and tool execution errors). Because MCP has no protocol-level session, stateful tools use explicit handles. | [tool-errors-and-state.md](./tool-errors-and-state.md) |
| Tool Result and Input Required Results | A `tools/call` result carries structured or unstructured content, or an `InputRequiredResult` when the server needs more input (multi round-trip requests). | [tool-result.md](./tool-result.md) |
| Tools | Servers expose tools that language models can invoke (querying databases, calling APIs, computing). Each tool is identified by a unique name and carries schema metadata. Tools are model-controlled. | [tools.md](./tools.md) |
