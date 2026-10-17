---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#request-metadata
---

# Request Metadata Headers (MCP-Protocol-Version / Mcp-Method / Mcp-Name)

Streamable HTTP mirrors selected JSON-RPC body fields into HTTP headers so intermediaries (load balancers, gateways, observability tooling) can route and inspect requests without parsing the body.

## Signature / Usage

```http
POST /mcp HTTP/1.1
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: resources/read
Mcp-Name: file:///projects/myapp/config.json

{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "resources/read",
  "params": {
    "uri": "file:///projects/myapp/config.json",
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": { "name": "ExampleClient", "version": "1.0.0" },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

## Options / Props

Standard request headers (**REQUIRED** for compliance):

| Header Name | Source Field | Required For |
| --- | --- | --- |
| `Mcp-Method` | `method` | All requests |
| `Mcp-Name` | `params.name` or `params.uri` | `tools/call`, `resources/read`, `prompts/get` requests |

## Notes

- `Accept` in the example is added to match the MUST requirement in the Sending Messages section (omitted in the original example).
- `MCP-Protocol-Version`: every POST to the MCP endpoint **MUST** include it (e.g. `MCP-Protocol-Version: 2026-07-28`). The value **MUST** match `_meta` `io.modelcontextprotocol/protocolVersion` in the body; otherwise the server **MUST** reject with `400 Bad Request` and a `HeaderMismatch` JSON-RPC error.
- Unsupported version (unknown, or known but not supported): server **MUST** respond `400 Bad Request` with an `UnsupportedProtocolVersionError` listing its supported versions.
- Unimplemented RPC method: server **MUST** respond `404 Not Found` with JSON-RPC error `-32601` (`Method not found`); the JSON-RPC body distinguishes this from a `404` returned by a legacy HTTP+SSE server.
- A server supporting clients older than `2025-06-18` (no `MCP-Protocol-Version` header) **MAY** treat a request without the header as `2025-03-26`; a server not supporting such clients **MUST** reject it per Server Validation.
- If the `Mcp-Name` source value cannot be safely represented as a plain ASCII header value, clients **MUST** encode it with the Base64 sentinel format `Mcp-Name: =?base64?{Base64EncodedValue}?=` (see Custom Headers page, Value Encoding).
- Case sensitivity: header names (RFC 9110 "field names") are case-insensitive and **MUST** be compared case-insensitively; header values (such as method names) are case-sensitive.

## Related

- [Streamable HTTP](./streamable-http.md)
- [Custom Headers from Tool Parameters](./custom-headers.md)
- [Server Validation](./server-validation.md)
