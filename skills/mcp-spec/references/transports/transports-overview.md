---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
---

# Transports Overview

Defines what a transport must provide to carry MCP messages, the standard bindings (stdio, Streamable HTTP), and the requirements for custom transports. Protocol semantics are identical on every transport.

## Signature / Usage

A transport is a **binding**: it defines how messages are framed and delivered, how request metadata is carried, and how cancellation and termination are signaled. Every request carries its protocol version and client capabilities in the body:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "location": "Seattle, WA" },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

## Notes

- JSON-RPC messages **MUST** be UTF-8 encoded.
- A binding **MUST** deliver client-sent requests and notifications to the server, and server-sent responses and notifications to the client. No other direction exists: servers do not initiate JSON-RPC requests and clients do not send JSON-RPC responses.
- A binding **MAY** mirror selected body fields into envelope metadata (Streamable HTTP mirrors them into HTTP headers). The body remains the source of truth; bindings that mirror metadata define how mismatches are rejected.
- Cancellation: on stdio the client sends `notifications/cancelled`; on Streamable HTTP it closes the request's response stream.
- Custom transports **MAY** be implemented. They **MUST** preserve the JSON-RPC message format, the message patterns, and the per-request metadata model, and **SHOULD** document connection establishment, message framing, and cancellation. Custom transports over a reliable bidirectional byte stream (e.g. Unix domain sockets, TCP) **SHOULD** reuse the stdio framing.
- Backward compatibility: earlier revisions used a connection-scoped session with an `initialize` handshake and server-initiated requests. Detection and fallback are described in the versioning page; each binding page describes its transport-specific detection mechanics.
- Replaced in 2026-07-28: connection-scoped sessions and server-initiated JSON-RPC requests (see MRTR in the patterns category).

## Related

- [stdio](./stdio.md)
- [Streamable HTTP](./streamable-http.md)
- [Transport Backward Compatibility](./transport-backward-compatibility.md)
