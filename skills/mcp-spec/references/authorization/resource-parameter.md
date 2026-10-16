---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#resource-parameter-implementation
---

# Resource Parameter Implementation

MCP clients implement Resource Indicators for OAuth 2.0 (RFC 8707) to name the target MCP server for the token.

## Signature / Usage

Authorization request fragment for a server at `https://mcp.example.com`:

```
&resource=https%3A%2F%2Fmcp.example.com
```

The `resource` parameter:

1. **MUST** be included in both authorization requests and token requests.
2. **MUST** identify the MCP server that the client intends to use the token with.
3. **MUST** use the canonical URI of the MCP server as defined in RFC 8707 Section 2.

MCP clients **MUST** send this parameter regardless of whether authorization servers support it.

## Options / Props

Canonical Server URI:

| Kind | Examples |
| --- | --- |
| Valid | `https://mcp.example.com/mcp`, `https://mcp.example.com`, `https://mcp.example.com:8443`, `https://mcp.example.com/server/mcp` (when path component is necessary to identify individual MCP server) |
| Invalid | `mcp.example.com` (missing scheme), `https://mcp.example.com#fragment` (contains fragment) |

## Notes

- The canonical URI is the resource identifier per RFC 8707 Section 2 and aligns with the `resource` parameter in RFC 9728.
- Clients **SHOULD** provide the most specific URI they can for the MCP server they intend to access. The canonical form uses lowercase scheme and host, but implementations **SHOULD** accept uppercase scheme and host for robustness.
- Both `https://mcp.example.com/` and `https://mcp.example.com` are technically valid absolute URIs; implementations **SHOULD** consistently use the form without the trailing slash unless the trailing slash is semantically significant.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/index.mdx` section "Resource Parameter Implementation".

## Related

- [Access Token Usage and Refresh Tokens](./access-token-usage.md)
- [Authorization Flow Steps](./authorization-flow.md)
- [Authorization Security Considerations](./authorization-security.md)
