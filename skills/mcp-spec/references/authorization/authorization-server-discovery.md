---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery
---

# Authorization Server Discovery

How MCP servers advertise their authorization servers (Protected Resource Metadata, RFC9728) and how clients discover authorization server metadata (RFC 8414 / OpenID Connect Discovery).

## Signature / Usage

Protected Resource Metadata discovery: servers **MUST** implement one of these mechanisms, and clients **MUST** support both.

```http
WWW-Authenticate: Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"
```

1. **WWW-Authenticate Header**: include the resource metadata URL under `resource_metadata` in `401 Unauthorized` responses (RFC9728 Section 5.1).
2. **Well-Known URI** (RFC9728), either:
   - At the path of the MCP endpoint: `https://example.com/public/mcp` hosts metadata at `https://example.com/.well-known/oauth-protected-resource/public/mcp`
   - At the root: `https://example.com/.well-known/oauth-protected-resource`

Clients use the URL from parsed `WWW-Authenticate` headers when present; otherwise they **MUST** fall back to the well-known URIs in the order listed above.

Authorization server metadata discovery, issuer with path components (`https://auth.example.com/tenant1`), clients **MUST** try in order:

1. `https://auth.example.com/.well-known/oauth-authorization-server/tenant1`
2. `https://auth.example.com/.well-known/openid-configuration/tenant1`
3. `https://auth.example.com/tenant1/.well-known/openid-configuration`

Issuer without path components (`https://auth.example.com`):

1. `https://auth.example.com/.well-known/oauth-authorization-server`
2. `https://auth.example.com/.well-known/openid-configuration`

## Options / Props

| Requirement | Detail |
| --- | --- |
| `authorization_servers` | The Protected Resource Metadata document **MUST** include this field with at least one authorization server |
| Server selection | Responsibility of the MCP client (RFC9728 Section 7.6) when multiple servers are listed |
| Per-AS state | Each listed server is an independent OAuth 2.0 authorization server; clients **MUST** maintain separate registration state (client credentials, tokens) per authorization server and **MUST NOT** assume credentials valid for one are accepted by another |
| Metadata validation | The `issuer` value in the retrieved document **MUST** be identical to the issuer identifier used to construct the well-known URL (RFC8414 Section 3.3 / OIDC Discovery Section 4.3); otherwise the client **MUST NOT** use the metadata |

## Notes

- MCP uses the default `oauth-authorization-server` well-known URI suffix of RFC 8414 Section 3.1 and defines no application-specific suffix.
- Example of rejection: a document fetched from `https://attacker.example/.well-known/oauth-authorization-server` containing `"issuer": "https://honest.example"` **MUST** be rejected.
- Clients **MUST** be able to parse `WWW-Authenticate` headers and respond appropriately to `HTTP 401 Unauthorized`.
- Servers can also include a `scope` parameter in the challenge; see Scope Selection Strategy.
- If neither the header nor the sub-path or root well-known metadata is found, the source diagram shows the client aborting or using pre-configured values.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/authorization-server-discovery.mdx`.

## Related

- [Authorization Overview](./authorization-overview.md)
- [Scope Selection Strategy](./scope-selection.md)
- [Pre-registration and Dynamic Client Registration](./client-registration-fallbacks.md)
- [Authorization Flow Steps](./authorization-flow.md)
