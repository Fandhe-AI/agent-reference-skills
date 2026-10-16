---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
---

# Authorization Overview

Transport-level authorization for HTTP-based MCP transports, built on an OAuth 2.1 profile. Authorization is **OPTIONAL**.

## Signature / Usage

Unauthenticated request, 401 challenge, and the first discovery step (from the specification examples):

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

Protocol requirements:

- Authorization is **OPTIONAL** for MCP implementations.
- Implementations using an HTTP-based transport **SHOULD** conform to this specification.
- Implementations using an STDIO transport **SHOULD NOT** follow this specification, and instead retrieve credentials from the environment.
- Implementations using alternative transports **MUST** follow established security best practices for their protocol.

Roles:

- A protected _MCP server_ acts as an OAuth 2.1 resource server.
- An _MCP client_ acts as an OAuth 2.1 client, making protected resource requests on behalf of a resource owner.
- The _authorization server_ interacts with the user (if necessary) and issues access tokens for use at the MCP server. Its implementation details are beyond the scope of the specification; it may be hosted with the resource server or be a separate entity.

Overview requirements:

1. Authorization servers **MUST** implement OAuth 2.1 with appropriate security measures for both confidential and public clients.
2. Authorization servers and MCP clients **SHOULD** support OAuth Client ID Metadata Documents (draft-ietf-oauth-client-id-metadata-document-00).
3. Authorization servers and MCP clients **MAY** support the OAuth 2.0 Dynamic Client Registration Protocol (RFC7591). Dynamic Client Registration is deprecated and retained for backwards compatibility with authorization servers that do not support Client ID Metadata Documents.
4. MCP servers **MUST** implement OAuth 2.0 Protected Resource Metadata (RFC9728). MCP clients **MUST** use it for authorization server discovery.
5. MCP authorization servers **MUST** provide at least one of: OAuth 2.0 Authorization Server Metadata (RFC8414) or OpenID Connect Discovery 1.0. MCP clients **MUST** support both discovery mechanisms.

Before initiating the authorization flow, MCP clients **MUST** obtain a client ID through one of three registration mechanisms: Client ID Metadata Documents, pre-registration, or Dynamic Client Registration.

## Notes

- Standards the mechanism is based on (a selected subset of their features): OAuth 2.1 IETF DRAFT (draft-ietf-oauth-v2-1-13), RFC6750 (Bearer Token Usage), RFC8414 (Authorization Server Metadata), RFC7591 (Dynamic Client Registration), RFC8707 (Resource Indicators), RFC9728 (Protected Resource Metadata), RFC9207 (Authorization Server Issuer Identification), OAuth Client ID Metadata Documents (draft-ietf-oauth-client-id-metadata-document-00), OpenID Connect Discovery 1.0, OpenID Connect Dynamic Client Registration 1.0.
- Authorization extensions are optional, additive, composable, and may be versioned independently; the list is maintained in the `modelcontextprotocol/ext-auth` repository.
- Deprecated in 2026-07-28 (earliest removal: first revision released on or after 2027-07-28): Dynamic Client Registration. Migration path: Client ID Metadata Documents.
- This skill covers the specification requirements. Concrete OAuth provider implementations (the MCP plugin and oauth-provider in better-auth, the OAuth server in supabase) live in the better-auth and supabase skills.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/index.mdx`.

## Related

- [Authorization Server Discovery](./authorization-server-discovery.md)
- [Client ID Metadata Documents](./client-id-metadata-documents.md)
- [Pre-registration and Dynamic Client Registration](./client-registration-fallbacks.md)
- [Scope Selection Strategy](./scope-selection.md)
- [Authorization Flow Steps](./authorization-flow.md)
- [Authorization Security Considerations](./authorization-security.md)
