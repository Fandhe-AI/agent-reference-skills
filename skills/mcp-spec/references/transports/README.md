# transports

| Name | Description | Path |
|------|-------------|------|
| Custom Headers from Tool Parameters (x-mcp-header) | Servers MAY mark tool parameters with an `x-mcp-header` extension property in the tool's `inputSchema`; clients MUST then mirror the values into `Mcp-Param-{name}` HTTP headers. | [custom-headers.md](./custom-headers.md) |
| Request Metadata Headers (MCP-Protocol-Version / Mcp-Method / Mcp-Name) | Streamable HTTP mirrors selected JSON-RPC body fields into HTTP headers so intermediaries (load balancers, gateways, observability tooling) can route and inspect requests without parsing the body. | [http-request-headers.md](./http-request-headers.md) |
| Server Validation | Servers that process the request body MUST reject requests whose mirrored HTTP header values do not match the body, with `400 Bad Request` and JSON-RPC error `-32020` (`HeaderMismatch`). | [server-validation.md](./server-validation.md) |
| stdio | The client launches the MCP server as a subprocess; newline-delimited JSON-RPC messages flow over the subprocess's standard streams. | [stdio.md](./stdio.md) |
| Streamable HTTP | A single HTTP MCP endpoint accepting POST; each JSON-RPC request or notification is its own POST, answered with one JSON object or a request-scoped SSE stream. | [streamable-http.md](./streamable-http.md) |
| Transport Backward Compatibility (HTTP+SSE) | How Streamable HTTP clients and servers interoperate with `initialize`-based legacy versions, earlier Streamable HTTP revisions, and the deprecated 2024-11-05 HTTP+SSE transport. | [transport-backward-compatibility.md](./transport-backward-compatibility.md) |
| Transports Overview | Defines what a transport must provide to carry MCP messages, the standard bindings (stdio, Streamable HTTP), and the requirements for custom transports. Protocol semantics are identical on every transport. | [transports-overview.md](./transports-overview.md) |
