---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization
---

# Understanding Authorization in MCP

Tutorial on securing access to sensitive resources and operations exposed by MCP servers using OAuth 2.1 conventions: when to use it, the step-by-step flow, common pitfalls, and related standards. The Keycloak implementation example is kept in this skill's samples area.

## Signature / Usage

Step 1, initial handshake: the server answers with `401 Unauthorized` and points to the Protected Resource Metadata (PRM) document via `resource_metadata` in `WWW-Authenticate`.

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="mcp",
  resource_metadata="https://your-server.com/.well-known/oauth-protected-resource"
```

Step 2, PRM discovery (typical JSON; see RFC 9728 Section 3.2 for a fuller example):

```json
{
  "resource": "https://your-server.com/mcp",
  "authorization_servers": ["https://auth.your-server.com"],
  "scopes_supported": ["mcp:tools", "mcp:resources"]
}
```

Step 3, authorization server discovery via OpenID Connect Discovery or OAuth 2.0 Authorization Server Metadata (RFC 8414):

```json
{
  "issuer": "https://auth.your-server.com",
  "authorization_endpoint": "https://auth.your-server.com/authorize",
  "token_endpoint": "https://auth.your-server.com/token",
  "registration_endpoint": "https://auth.your-server.com/register"
}
```

Step 4, client registration: pre-registered, or Dynamic Client Registration request to `registration_endpoint`:

```json
{
  "client_name": "My MCP Client",
  "redirect_uris": ["http://localhost:3000/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

Step 5, user authorization: the client opens a browser to `/authorize`, then exchanges the authorization code (OAuth 2.1 authorization code with PKCE) for tokens:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "refresh_token": "def502...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Step 6, authenticated requests:

```http
GET /mcp HTTP/1.1
Host: your-server.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

## Options / Props

When authorization is strongly recommended (it is **optional**):

- Server accesses user-specific data (emails, documents, databases)
- You need to audit who performed which actions
- Server grants access to APIs that require user consent
- Enterprise environments with strict access controls
- Rate limiting or usage tracking per user

Related standards:

| Standard | Role |
|----------|------|
| OAuth 2.1 | Core authorization framework |
| RFC 8414 | Authorization Server Metadata discovery |
| RFC 7591 | Dynamic Client Registration |
| RFC 9728 | Protected Resource Metadata |
| RFC 8707 | Resource Indicators |

## Notes

- Local servers: for MCP servers using the stdio transport, environment-based credentials or credentials from embedded third-party libraries can be used instead. OAuth flows are designed for HTTP-based transports where the MCP server is remotely hosted.
- If a client meets a server whose authorization server lacks DCR and the client is not pre-registered, the client developer must provide an affordance for the end-user to enter client information manually.
- The tutorial does not mention Client ID Metadata Documents; per the 2026-07-28 specification the registration priority (SHOULD) is pre-registration → CIMD (when the AS advertises `client_id_metadata_document_supported`) → DCR → prompting the user, so manual entry is the fallback only when CIMD is also unavailable (see [client-id-metadata-documents.md](../authorization/client-id-metadata-documents.md)).
- Common pitfalls (headline rules): do not implement token validation or authorization logic yourself; use short-lived access tokens; always validate tokens; store tokens in secure, encrypted storage; enforce HTTPS in production (plain HTTP only for `localhost` during development); least-privilege scopes with per-route/tool scope checks; do not log credentials (`Authorization` headers, tokens, codes, secrets); separate app vs. resource server credentials; return proper challenges (`WWW-Authenticate` with `Bearer`, `realm`, `resource_metadata`); DCR controls (unauthenticated DCR means anyone can register any client); pin to a single issuer/tenant unless multi-tenant; do not accept generic audiences (like `api`); return generic errors to clients and log detail with correlation IDs.
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Dynamic Client Registration (`deprecated.mdx` in the tag).
- Removed in 2026-07-28: protocol-level sessions and `Mcp-Session-Id`. The source's pitfall bullet "Session identifier hardening" still refers to `Mcp-Session-Id` (relevant to servers on 2025-11-25 and earlier); for 2026-07-28 see state-handle-hijacking.md.
- Distance line: this page states spec-level requirements. Concrete OAuth provider implementations are in better-auth (plugins/mcp, oauth-provider) and supabase (auth/oauth-server). Host-side configuration lives in the host skills.

## Related

- [security-best-practices.md](./security-best-practices.md)
- [token-passthrough.md](./token-passthrough.md)
- [scope-minimization.md](./scope-minimization.md)
- [state-handle-hijacking.md](./state-handle-hijacking.md)
