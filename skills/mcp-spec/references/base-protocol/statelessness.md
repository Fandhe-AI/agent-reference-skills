---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#statelessness
---

# Statelessness

MCP is a stateless protocol: all the information needed to process a request is contained in the request itself. A server processes each request independently; no state should be inferred from previous requests, even those on the same connection or stream.

## Signature / Usage

Every request supplies version, identity, and capabilities in `_meta` (no prior handshake):

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    },
    "_meta": {
      "traceparent": "00-0af7651916cd43dd8448eb211c80319c-00f067aa0ba902b7-01"
    }
  }
}
```

(The `_meta` required fields `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` are described in the `_meta` page.)

## Notes

- Servers **MUST NOT** rely on prior requests over the same connection to establish context (e.g., capabilities, protocol version, client identity). Every request supplies this metadata in its `_meta` field.
- Servers **SHOULD** be prepared to handle requests associated with multiple tasks, threads, or conversations.
- Servers **SHOULD NOT** require that a client reuse the same connection or process to perform related operations.
- Clients **SHOULD NOT** use an individual task, thread, or conversation as the lifetime boundary for the stdio process.
- State that needs to span multiple requests (e.g., long-running tasks, application-level handles) **MUST** be referenced by an explicit identifier the client passes on each request.
- An open connection, such as a STDIO process, is not a conversation or session: clients may interleave unrelated requests on the same transport, and a server must not treat connection or process identity as a proxy for conversation or session continuity.
- Long-lived requests like `subscriptions/listen` remain request/response; the response is just an open stream of notifications. Their state is scoped to the request itself, not to the connection underneath.
- Removed in 2026-07-28: the `initialize` / `notifications/initialized` handshake, protocol-level sessions and the `Mcp-Session-Id` header (Streamable HTTP), and `ping`.

## Related

- [_meta](./meta-field.md)
- [Protocol Version Negotiation](./protocol-version-negotiation.md)
- [Backward Compatibility with Initialization-Based Versions](./backward-compatibility.md)
