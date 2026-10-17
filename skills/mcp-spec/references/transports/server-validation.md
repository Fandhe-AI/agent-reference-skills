---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#server-validation
---

# Server Validation

Servers that process the request body MUST reject requests whose mirrored HTTP header values do not match the body, with `400 Bad Request` and JSON-RPC error `-32020` (`HeaderMismatch`).

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32020,
    "message": "Header mismatch: Mcp-Name header value 'foo' does not match body value 'bar'"
  }
}
```

## Options / Props

| Code | Name | Description |
| --- | --- | --- |
| `-32020` | `HeaderMismatch` | The HTTP headers do not match the corresponding values in the request body, or required headers are missing/malformed. |

Validation failure conditions:

- A required standard header (`MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`) is missing.
- A header value does not match the corresponding request body value (for `Mcp-Name` and `Mcp-Param-{Name}`, servers **MUST** decode Base64 sentinel values before comparing).
- A header value contains invalid characters.

## Notes

- Purpose: prevents vulnerabilities when different network components rely on different sources of truth (e.g. a load balancer routing on the header while the server executes on the body).
- When validating integer parameter values, servers **SHOULD** compare numerically rather than as strings (`42.0` equals `42`).
- Rejection **MUST** use HTTP `400 Bad Request` and **MUST** include a JSON-RPC error response with the code above. The code is allocated from the sub-range reserved for protocol-defined errors.
- Intermediaries **MUST** return an appropriate HTTP error status (e.g. `400`) for validation failures but are not required to return a JSON-RPC error response.
- Intermediaries enforcing policy on mirrored headers (e.g. routing or rate-limiting by tenant) **SHOULD** verify that `MCP-Protocol-Version` indicates a version that requires header-body validation; if older or absent, they **SHOULD** reject the request rather than trust unvalidated headers.

## Related

- [Streamable HTTP](./streamable-http.md)
- [Request Metadata Headers](./http-request-headers.md)
- [Custom Headers from Tool Parameters](./custom-headers.md)
