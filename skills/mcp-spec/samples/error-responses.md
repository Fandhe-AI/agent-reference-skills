---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#errors
---

# Error Responses

JSON-RPC error objects for standard failures and the protocol-specific `-32020` to `-32022` codes.

Unknown tool (`InvalidParamsError`):

```json
{
  "code": -32602,
  "message": "Unknown tool: invalid_tool_name"
}
```

Invalid tool arguments (`InvalidParamsError`):

```json
{
  "code": -32602,
  "message": "Invalid arguments for tool calculate: Missing required property 'expression'"
}
```

Parse error:

```json
{
  "code": -32700,
  "message": "Parse error: Invalid JSON"
}
```

Method not found:

```json
{
  "code": -32601,
  "message": "Prompts not supported",
  "data": {
    "reason": "Server does not support the prompts capability"
  }
}
```

Internal error:

```json
{
  "code": -32603,
  "message": "Internal error"
}
```

Unsupported protocol version:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32022,
    "message": "Unsupported protocol version",
    "data": {
      "supported": [
        "2026-07-28",
        "2025-11-25"
      ],
      "requested": "1900-01-01"
    }
  }
}
```

Missing required client capability:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32021,
    "message": "Server requires the elicitation capability for this request",
    "data": {
      "requiredCapabilities": {
        "elicitation": {}
      }
    }
  }
}
```

Header mismatch:

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

## Notes

- Reproduced from `schema/2026-07-28/examples/` (tag `2026-07-28`); the first five examples are bare error objects, the last three include the JSON-RPC envelope.
- Changed in 2026-07-28: resource not found uses `-32602` instead of `-32002`.
- `-32020` to `-32099` are reserved for MCP-defined codes: `HeaderMismatch` `-32020`, `MissingRequiredClientCapability` `-32021`, `UnsupportedProtocolVersion` `-32022`.
