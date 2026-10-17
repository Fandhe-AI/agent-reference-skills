---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
---

# Streamable HTTP

A single HTTP MCP endpoint accepting POST; each JSON-RPC request or notification is its own POST, answered with one JSON object or a request-scoped SSE stream.

## Signature / Usage

```http
POST /mcp HTTP/1.1
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_weather

{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_weather","arguments":{"location":"Seattle, WA"},"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}}}}
```

- The server **MUST** provide a single HTTP endpoint path (the **MCP endpoint**) that supports POST, e.g. `https://example.com/mcp`.
- Long-lived change notifications are delivered on the response stream of a `subscriptions/listen` request. Server-to-client interactions (sampling, elicitation, roots) are embedded in results as input requests per MRTR (SEP-2322).

## Options / Props

Sending messages (client requirements):

| Rule | Requirement |
| --- | --- |
| Method | Client **MUST** use HTTP POST; every JSON-RPC message is a new POST to the MCP endpoint |
| `Accept` | **MUST** list both `application/json` and `text/event-stream` |
| Metadata headers | **MUST** include the request metadata headers on each POST |
| Body | **MUST** be a single JSON-RPC request or notification; client **MUST NOT** send JSON-RPC responses |
| Notification accepted | Server **MUST** return `202 Accepted` with no body |
| Notification rejected | Server **MUST** return an HTTP error status (e.g. `400`); body **MAY** be a JSON-RPC error response with no `id` |
| Request response | Server **MUST** return `Content-Type: application/json` or `text/event-stream`; client **MUST** support both |

## Notes

- Security: servers **MUST** validate the `Origin` header on all incoming connections to prevent DNS rebinding; if present and invalid, respond `403 Forbidden` (body **MAY** be a JSON-RPC error response with no `id`). Locally running servers **SHOULD** bind only to localhost (127.0.0.1), not 0.0.0.0. Servers **SHOULD** implement authentication for all connections.
- This revision defines no client-to-server notifications over Streamable HTTP; `notifications/cancelled` is used only on stdio. Header requirements for notification POSTs are not defined by this revision.
- SSE response stream: the server **MAY** send notifications (e.g. `notifications/progress`, `notifications/message`) before the final response, and they **MUST** relate to the originating request. It **MUST NOT** send independent JSON-RPC requests on the stream. The final response **SHOULD** terminate the stream.
- `subscriptions/listen`: the response is an SSE stream that stays open and delivers only the notifications the client opted in to (e.g. `notifications/tools/list_changed`, `notifications/resources/updated`). Request-scoped notifications are not delivered on the listen stream.
- Servers **SHOULD** include `X-Accel-Buffering: no` when initiating an SSE stream so reverse proxies (e.g. nginx) do not buffer. For long-lived streams, servers are encouraged to emit SSE comment lines (e.g. `:\r\n`) as keep-alive; clients must ignore them.
- Cancellation: closing the SSE response stream **MUST** be treated by the server as cancellation. The server **SHOULD** stop work as soon as practical and **MUST NOT** send further messages for it.
- Message flow diagrams (from the spec): simple response (`200 application/json`), streaming response (SSE progress notifications then response), notification (`202 Accepted`), MRTR (`InputRequiredResult` then retry with `inputResponses`), and `subscriptions/listen` (first event `notifications/subscriptions/acknowledged`).
- Removed in 2026-07-28: the HTTP GET stream endpoint (replaced by `subscriptions/listen`); protocol-level sessions and the `Mcp-Session-Id` header (SEP-2567); resumable SSE streams via `Last-Event-ID`; servers sending JSON-RPC requests on SSE streams (replaced by `InputRequiredResult` / MRTR).
- Introduced in protocol version 2025-03-26 as a replacement for the HTTP+SSE transport from 2024-11-05.
- Transport requirements only; HTTP server frameworks are covered in the hono and fastify skills.

## Related

- [Request Metadata Headers](./http-request-headers.md)
- [Custom Headers from Tool Parameters](./custom-headers.md)
- [Server Validation](./server-validation.md)
- [Transport Backward Compatibility](./transport-backward-compatibility.md)
- [Transports Overview](./transports-overview.md)
