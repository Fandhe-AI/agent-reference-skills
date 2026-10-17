---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#standard-request-headers
---

# Streamable HTTP Exchange

HTTP POST requests to the MCP endpoint with the required `MCP-Protocol-Version`, `Mcp-Method` and `Mcp-Name` headers.

`tools/call` request:

```http
POST /mcp HTTP/1.1
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_weather

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "Seattle, WA"
    },
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

`resources/read` request:

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
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

## Notes

- Reproduced from `basic/transports/streamable-http.mdx` (tag `2026-07-28`). `Accept` is added to match the MUST requirement in the Sending Messages section (omitted in the original examples).
- The `MCP-Protocol-Version` value MUST match `io.modelcontextprotocol/protocolVersion` in the body `_meta`; a mismatch is rejected with `400 Bad Request` and a `HeaderMismatch` error.
- `Mcp-Method` is required on all requests; `Mcp-Name` on `tools/call`, `resources/read` and `prompts/get`.
- Removed in 2026-07-28: `Mcp-Session-Id` and `Last-Event-ID` resumability.
