---
source: https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture
---

# Architecture Overview (concepts)

Learning-guide overview of MCP scope, participants, layers (data and transport), primitives, notifications, and a worked discover / tools / subscription exchange.

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "weather_current",
    "arguments": { "location": "San Francisco", "units": "imperial" },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": { "elicitation": {} }
    }
  }
}
```

Discovery request and response (step 1 of the walkthrough):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": { "elicitation": {} }
    }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": { "tools": { "listChanged": true }, "resources": {} },
    "_meta": { "io.modelcontextprotocol/serverInfo": { "name": "example-server", "version": "1.0.0" } },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

### Scope

The Model Context Protocol includes: the MCP Specification; MCP SDKs; MCP Development Tools (including the MCP Inspector); MCP Reference Server Implementations. MCP focuses solely on the protocol for context exchange; it does not dictate how AI applications use LLMs or manage the provided context.

### Participants

- **MCP Host**: the AI application that coordinates and manages one or multiple MCP clients
- **MCP Client**: a component that maintains a connection to an MCP server and obtains context for the host
- **MCP Server**: a program that provides context to MCP clients

The host creates one MCP client per MCP server; each client maintains a dedicated connection. Local servers using STDIO typically serve a single client; remote servers using Streamable HTTP typically serve many clients. "MCP server" refers to the program serving context data regardless of where it runs.

### Layers

| Layer | Contents |
|-------|----------|
| Data layer | JSON-RPC 2.0 based protocol: discovery (`server/discover`), server features (tools, resources, prompts), client features (elicitation; sampling is deprecated as of `2026-07-28`), utility features (notifications, progress tracking) |
| Transport layer | Connection establishment, message framing, authorization. Two mechanisms: **stdio** (standard I/O between local processes) and **Streamable HTTP** (HTTP POST for client-to-server messages, optional SSE for streaming; supports bearer tokens, API keys, custom headers; MCP recommends OAuth) |

### Primitives

Server primitives: **Tools** (executable functions), **Resources** (data sources providing context), **Prompts** (reusable interaction templates). Each has methods for discovery (`*/list`), retrieval (`*/get`), and in some cases execution (`tools/call`).

Client primitive: **Elicitation** (`elicitation/create`), delivered through the Multi Round-Trip Requests pattern.

Deprecated as of `2026-07-28`: **Sampling** (`sampling/createMessage`, also delivered through MRTR) and **Logging**.

Optional extensions build on the core protocol, for example the Tasks extension.

### Statelessness and discovery

MCP is a stateless protocol. Every request carries the protocol version and relevant capabilities in `_meta`; clients should also identify themselves there. Servers advertise supported versions and capabilities through the mandatory `server/discover` request, which clients may send before any other request. Calling it is optional; the response is typically cacheable. Unsupported versions are rejected with `UnsupportedProtocolVersionError` listing supported versions.

### Notifications

Change notifications are opt-in: the client opens a long-lived `subscriptions/listen` stream naming the notification types it wants.

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "subscriptions/listen",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "example-client", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": { "elicitation": {} }
    },
    "notifications": { "toolsListChanged": true }
  }
}
```

The server acknowledges with `notifications/subscriptions/acknowledged` (carrying `io.modelcontextprotocol/subscriptionId`, the JSON-RPC ID of the listen request), then delivers `notifications/tools/list_changed` on that stream. Notifications are best effort; clients should also rely on polling.

## Notes

- This skill covers the protocol itself; host-side configuration (for example `.mcp.json`, `mcp_servers`) lives in the anthropic-claude-code-extend, anthropic-api-tools-mcp, anthropic-agent-sdk, anthropic-managed-agents, openai-agents, openai-apps-sdk, windows-ai and hermes-agent skills.
- Python pseudo-code in the source (`client.server_capabilities.tools`, `client.listen(...)`) is illustrative; the source does not state SDK protocol-version support.
- `tools/list` accepts an optional `cursor` for pagination; tool objects carry `name`, `title`, `description`, `inputSchema`.

## Related

- [Understanding MCP Servers](./concepts-server.md)
- [Understanding MCP Clients](./concepts-client.md)
- [Architecture](./architecture.md)
- [Versioning (concepts)](./concepts-versioning.md)
