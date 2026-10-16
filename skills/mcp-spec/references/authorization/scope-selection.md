---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#scope-selection-strategy
---

# Scope Selection Strategy

How MCP servers advertise required scopes via `WWW-Authenticate` and how clients choose scopes during the initial authorization handshake.

## Signature / Usage

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

Server side:

- MCP servers **SHOULD** include a `scope` parameter in the `WWW-Authenticate` header (RFC 6750 Section 3) to indicate the scopes required for accessing the resource, following the principle of least privilege.
- The scopes in the challenge **MAY** match `scopes_supported`, be a subset or superset of it, or an alternative collection that is neither a strict subset nor superset.
- Servers **SHOULD** strive for consistency in how they construct scope sets but are not required to surface every dynamically issued scope through `scopes_supported`.

Client side:

- Clients **MUST NOT** assume any particular set relationship between the challenged scope set and `scopes_supported`.
- Clients **MUST** treat the scopes provided in the challenge as authoritative for the current operation; they are required to satisfy the current request.
- When re-authorizing, clients **SHOULD** include these scopes alongside any previously granted scopes to avoid losing permissions needed for other operations (step-up authorization).
- Clients **SHOULD** request only the scopes necessary for their intended operations. During the initial authorization handshake, the priority order is:
  1. Use the `scope` parameter from the initial `WWW-Authenticate` header in the 401 response, if provided.
  2. If `scope` is not available, use all scopes defined in `scopes_supported` from the Protected Resource Metadata document, omitting the `scope` parameter if `scopes_supported` is undefined.

## Notes

- `scopes_supported` is intended to represent the minimal set of scopes necessary for basic functionality, with additional scopes requested incrementally through the step-up authorization flow.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/index.mdx` section "Scope Selection Strategy".

## Related

- [Authorization Error Handling and Scope Challenge](./authorization-errors.md)
- [Authorization Flow Steps](./authorization-flow.md)
- [Authorization Overview](./authorization-overview.md)
