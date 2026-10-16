---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#extension-negotiation
---

# Extension Negotiation

Clients and servers can negotiate support for optional extensions beyond the core protocol. Extensions are advertised in the `extensions` field of capabilities, a map of extension identifiers to per-extension settings objects.

## Signature / Usage

Client advertising the MCP Apps extension (`io.modelcontextprotocol/ui`):

```json
{
  "capabilities": {
    "roots": {},
    "extensions": {
      "io.modelcontextprotocol/ui": {
        "mimeTypes": ["text/html;profile=mcp-app"]
      }
    }
  }
}
```

Tasks extension (`io.modelcontextprotocol/tasks`):

```json
{
  "capabilities": {
    "tools": {},
    "extensions": {
      "io.modelcontextprotocol/tasks": {}
    }
  }
}
```

## Notes

- Extension identifiers **MUST** follow the `_meta` key naming rules, with a mandatory prefix.
- Each extension specifies the schema of its settings object; an empty object indicates support with no additional settings.
- If one party supports an extension but the other does not, the supporting party **MUST** either revert to core protocol behavior or reject the request with an appropriate error. Extensions **SHOULD** document their expected fallback behavior.

## Related

- [_meta](./meta-field.md)
- [Protocol Version Negotiation](./protocol-version-negotiation.md)
