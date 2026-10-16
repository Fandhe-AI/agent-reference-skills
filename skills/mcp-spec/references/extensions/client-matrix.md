---
source: https://modelcontextprotocol.io/extensions/client-matrix
---

# Extension Client Matrix

Community-maintained matrix of which MCP clients implement which official extensions. Extensions are always opt-in: a client only uses an extension if both client and server declare support in the `extensions` field of their capabilities.

## Signature / Usage

Declare support in the `extensions` field of the `io.modelcontextprotocol/clientCapabilities` sent in each request's `_meta`, and read the server's `extensions` from its `server/discover` response:

```json
{
  "_meta": {
    "io.modelcontextprotocol/clientCapabilities": {
      "extensions": {
        "io.modelcontextprotocol/oauth-client-credentials": {}
      }
    }
  }
}
```

## Extension identifiers

| Extension | Identifier | Description |
| --- | --- | --- |
| MCP Apps | `io.modelcontextprotocol/ui` | Interactive HTML interfaces rendered inline in the conversation |
| OAuth Client Credentials | `io.modelcontextprotocol/oauth-client-credentials` | Machine-to-machine auth without interactive user login |
| Enterprise-Managed Authorization | `io.modelcontextprotocol/enterprise-managed-authorization` | Centralized access control via enterprise IdP |

## Support matrix

| Client | MCP Apps | OAuth Client Credentials | Enterprise Auth |
| --- | :---: | :---: | :---: |
| Claude (web) | yes | - | - |
| Claude Desktop | yes | - | - |
| VS Code GitHub Copilot | yes | - | - |
| Microsoft 365 Copilot | yes | - | - |
| Goose | yes | - | - |
| Postman | yes | - | - |
| MCPJam | yes | - | - |
| ChatGPT | yes | - | - |
| Cursor | yes | - | - |
| Archestra.AI | yes | - | yes |
| PostHog Code | yes | - | - |

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`). The list is community-maintained; "yes" corresponds to a check mark in the source table.
- Auth extension support is tracked separately from the core MCP authorization features (DCR, CIMD); check each extension's specification and the ext-auth repository for the latest status.
- Steps to add extension support to a client: review the extension specification (ext-auth / ext-apps repositories), declare support in `_meta`, implement the extension's protocol requirements, then submit a PR to update the matrix.

## Related

- [Extensions Overview](./extensions-overview.md)
- [MCP Apps](./mcp-apps.md)
- [OAuth Client Credentials](./oauth-client-credentials.md)
- [Enterprise-Managed Authorization](./enterprise-managed-authorization.md)
