---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#_meta
---

# _meta

The `_meta` property/parameter lets clients and servers attach additional metadata to their interactions. Certain key names are reserved by MCP for protocol-level metadata; implementations **MUST NOT** make assumptions about values at these keys.

## Signature / Usage

Non-normative example of trace context in `_meta`:

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

## Options / Props

Reserved keys:

| Key | Description | Defined in |
| --- | --- | --- |
| `progressToken` | Opts the request into progress notifications | Progress |
| `io.modelcontextprotocol/protocolVersion` | Protocol version for a request | Per-request protocol fields |
| `io.modelcontextprotocol/clientInfo` | Client name and version | Per-request protocol fields |
| `io.modelcontextprotocol/clientCapabilities` | Client capabilities relevant to a request | Per-request protocol fields |
| `io.modelcontextprotocol/logLevel` | Minimum log level the server should emit for a request | Logging |
| `io.modelcontextprotocol/subscriptionId` | Correlates a notification with its originating subscription | Subscriptions |
| `traceparent`, `tracestate`, `baggage` | OpenTelemetry trace context propagation | OpenTelemetry trace context |

Per-request protocol fields (client requests):

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `io.modelcontextprotocol/protocolVersion` | `string` | Yes | Protocol version for this request (e.g., `"2026-07-28"`) |
| `io.modelcontextprotocol/clientInfo` | `Implementation` | No | Client name and version |
| `io.modelcontextprotocol/clientCapabilities` | `ClientCapabilities` | Yes | Client capabilities relevant to this request |
| `io.modelcontextprotocol/logLevel` | `LoggingLevel` | No | Minimum log level the server should emit for this request |

Per-response protocol field (result `_meta`):

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `io.modelcontextprotocol/serverInfo` | `Implementation` | No | Server name and version |

## Notes

- Key name format: an optional **prefix** and a **name**. A prefix, if specified, **MUST** be a series of labels separated by dots (`.`), followed by a slash (`/`). Labels **MUST** start with a letter and end with a letter or digit; interior characters can be letters, digits, or hyphens. Implementations **SHOULD** use reverse DNS notation (e.g., `com.example/`).
- Any prefix where the second label is `modelcontextprotocol` or `mcp` is reserved for MCP use (e.g. `io.modelcontextprotocol/`, `dev.mcp/`, `org.modelcontextprotocol.api/`, `com.mcp.tools/`); `com.example.mcp/` is NOT reserved.
- Name: unless empty, **MUST** begin and end with an alphanumeric character (`[a-z0-9A-Z]`); **MAY** contain hyphens, underscores, dots, and alphanumerics in between.
- Official extensions define additional `_meta` keys under the `io.modelcontextprotocol/` prefix; third-party extensions use their own vendor prefix. Keys are specified in the extension's documentation.
- A request missing any required field is malformed; the server **MUST** reject it with JSON-RPC error `-32602` (Invalid params). On HTTP, the response status **MUST** be `400 Bad Request`.
- Clients **SHOULD** include `io.modelcontextprotocol/clientInfo` on every request unless specifically configured not to.
- A server **MUST NOT** rely on capabilities the client has not declared. If a request requires an undeclared capability, the server **MUST** return `MissingRequiredClientCapabilityError` (`-32021`) whose `data.requiredCapabilities` lists the missing capabilities; on HTTP the status **MUST** be `400 Bad Request`.
- Servers **SHOULD** include `io.modelcontextprotocol/serverInfo` in every result's `_meta`, unless specifically configured not to.
- `clientInfo` and `serverInfo` are self-reported and unverified; they are for display, logging, and debugging. Implementations **SHOULD NOT** use them to change behavior or rely on them for security decisions.
- On notifications delivered via a `subscriptions/listen` stream, the server **MUST** include `io.modelcontextprotocol/subscriptionId` in `_meta`.
- OpenTelemetry: as an exception to the prefix requirement, `traceparent`, `tracestate`, and `baggage` are reserved for trace context propagation; values **MUST** follow W3C Trace Context and W3C Baggage formats. The exception exists to maintain compatibility with existing implementations and the OpenTelemetry semantic conventions for MCP.
- Replaced in 2026-07-28: per-connection `initialize` negotiation of version and capabilities is replaced by these per-request `_meta` fields. Removed in 2026-07-28: `logging/setLevel` (log level now set per request via `io.modelcontextprotocol/logLevel`; servers MUST NOT emit `notifications/message` for requests that did not include this field).

## Related

- [Statelessness](./statelessness.md)
- [Protocol Version Negotiation](./protocol-version-negotiation.md)
