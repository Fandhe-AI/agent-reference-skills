# samples

| Name | Description | Path |
|------|-------------|------|
| Authorization Server Setup (Keycloak) | Run a local Keycloak authorization server for testing an MCP server that requires OAuth tokens, and configure the server's OAuth settings. | [authorization-server-setup.md](./authorization-server-setup.md) |
| Build a Client (Python) | Stdio MCP client that lists a server's tools, passes them to Claude, and executes `call_tool` for tool-use blocks. | [build-client-python.md](./build-client-python.md) |
| Build a Client (TypeScript) | Stdio MCP client class that connects with `Client` / `StdioClientTransport`, lists tools and calls them for Claude tool-use blocks. | [build-client-typescript.md](./build-client-typescript.md) |
| Build a Server (Python) | Minimal stdio MCP weather server using the Python SDK's `MCPServer` and `@mcp.tool()`. | [build-server-python.md](./build-server-python.md) |
| Build a Server (TypeScript) | Minimal stdio MCP weather server using `McpServer`, `registerTool` and zod input schemas. | [build-server-typescript.md](./build-server-typescript.md) |
| Claude Desktop Local Server | Register a local stdio server (the reference Filesystem Server) in Claude Desktop's `claude_desktop_config.json`. | [claude-desktop-local-server.md](./claude-desktop-local-server.md) |
| server/discover Exchange | Client calls `server/discover` and receives supported protocol versions, capabilities and server info. | [discover-exchange.md](./discover-exchange.md) |
| Elicitation Requests | Form mode and URL mode `elicitation/create` requests and their results. | [elicitation-requests.md](./elicitation-requests.md) |
| Error Responses | JSON-RPC error objects for standard failures and the protocol-specific `-32020` to `-32022` codes. | [error-responses.md](./error-responses.md) |
| MCP App | Server registers a tool linked to a `ui://` resource that serves bundled HTML; the UI uses the `App` class to talk to the host. | [mcp-app.md](./mcp-app.md) |
| MRTR Input Required Flow | Server answers a request with `InputRequiredResult`; the client gathers input and retries with `inputResponses` and `requestState`. | [mrtr-input-required-flow.md](./mrtr-input-required-flow.md) |
| OAuth Client Credentials (TypeScript SDK) | Connect to a Streamable HTTP MCP server with the OAuth client credentials extension using a client secret. | [oauth-client-credentials-sdk.md](./oauth-client-credentials-sdk.md) |
| Publish to the MCP Registry with GitHub Actions | Workflow that publishes an npm package and then the server to the MCP Registry on version tags, using GitHub OIDC. | [registry-publish-github-actions.md](./registry-publish-github-actions.md) |
| Streamable HTTP Exchange | HTTP POST requests to the MCP endpoint with the required `MCP-Protocol-Version`, `Mcp-Method` and `Mcp-Name` headers. | [streamable-http-exchange.md](./streamable-http-exchange.md) |
| Structured Tool Output | Tool declares an `outputSchema` and returns `structuredContent` alongside serialized text content. | [structured-tool-output.md](./structured-tool-output.md) |
| subscriptions/listen | Client opens a long-lived notification stream, receives the acknowledgment, updates, and a graceful close. | [subscriptions-listen.md](./subscriptions-listen.md) |
| Tasks Extension | Client and server declare the `io.modelcontextprotocol/tasks` extension; the server then answers long-running requests with a task handle. | [tasks-extension.md](./tasks-extension.md) |
| tools/list and tools/call | Client lists tools, then invokes one with `tools/call`. | [tools-list-and-call.md](./tools-list-and-call.md) |
