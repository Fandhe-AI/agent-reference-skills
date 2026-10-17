---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/tools#error-handling
---

# Stateful Tools and Tool Error Handling

Tools report errors through two mechanisms (protocol errors and tool execution errors). Because MCP has no protocol-level session, stateful tools use explicit handles.

## Signature / Usage

Protocol error (standard JSON-RPC):

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "error": {
    "code": -32602,
    "message": "Unknown tool: invalid_tool_name"
  }
}
```

Tool execution error (`isError: true` in the result):

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "resultType": "complete",
    "content": [
      {
        "type": "text",
        "text": "Invalid departure date: must be in the future. Current date is 08/08/2025."
      }
    ],
    "isError": true
  }
}
```

Stateful handle pattern (non-normative):

```jsonc
// → tools/call
{ "name": "create_basket", "arguments": {} }

// ← result
{
  "content": [{ "type": "text", "text": "Created basket bsk_a1b2c3" }],
  "structuredContent": { "basket_id": "bsk_a1b2c3" }
}

// → tools/call
{
  "name": "add_item",
  "arguments": { "basket_id": "bsk_a1b2c3", "sku": "..." }
}
```

## Notes

- Protocol errors indicate issues with the request structure that models are less likely to fix: unknown tool, malformed requests (failing the CallToolRequest schema), server errors. Clients **MAY** provide them to language models.
- Tool execution errors carry actionable feedback for self-correction: API failures, input validation errors, business logic errors. Clients **SHOULD** provide them to language models.
- Stateful tools (non-normative guidance): the protocol has no concept of a state handle; a handle is an ordinary string in a tool result and an argument to later calls. Servers needing state (shopping cart, browser context, database transaction) return an explicit handle from a creation tool and accept it on subsequent calls. The model carries the handle forward.
- Handle design: for authenticated servers, a handle is a name, not a capability, so validate authorization against it on every call; for unauthenticated servers, generate with sufficient entropy (e.g. UUIDv4) and a bounded lifetime. Prefer opaque identifiers. State retention policy should be stated in the creation tool's description. Calls against an expired or unknown handle should return a tool execution error so the model can recover.
- Security: servers **MUST** validate all tool inputs, implement proper access controls, rate limit tool invocations, and sanitize tool outputs. Clients **SHOULD** prompt for user confirmation on sensitive operations, show tool inputs to the user before calling the server, validate tool results before passing to the LLM, follow the `$ref` resolution requirements when validating against `inputSchema` / `outputSchema`, implement timeouts, and log tool usage for audit.
- Removed in 2026-07-28: protocol-level sessions (`Mcp-Session-Id`), which is why per-connection state is replaced by explicit handles.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/tools.mdx`, Stateful Tools, Error Handling, Security Considerations).

## Related

- [Tools](./tools.md)
- [Tool Result and Input Required Results](./tool-result.md)
