---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration#dynamic-client-registration
---

# Pre-registration and Dynamic Client Registration

The non-CIMD client registration mechanisms: static pre-registration, deprecated Dynamic Client Registration (RFC7591), and the authorization server binding rule.

## Signature / Usage

Pre-registration: MCP clients **SHOULD** support an option for static client credentials, either by:

1. Hardcoding a client ID (and, if applicable, client credentials) specifically for the MCP client to use with that authorization server, or
2. Presenting a UI that lets users enter these details after registering an OAuth client themselves (e.g., through a configuration interface hosted by the server).

Dynamic Client Registration (DCR): MCP clients and authorization servers **MAY** support RFC7591 to let clients obtain client IDs without user interaction. In the authorization flow this is the `POST /register` step that returns client credentials, available when the AS metadata contains `registration_endpoint`.

Minimal registration request body (illustrative; the source page has no DCR example, so this uses only `application_type` and `redirect_uris` named in the source, with a placeholder redirect URI):

```http
POST /register
Content-Type: application/json

{
  "application_type": "native",
  "redirect_uris": ["http://localhost:3000/callback"]
}
```

## Options / Props

`application_type` during DCR (OpenID Connect Dynamic Client Registration 1.0):

| Client kind | Requirement |
| --- | --- |
| Any | MCP clients **MUST** specify an appropriate `application_type`. Omitting it defaults to `"web"` under OIDC, which can conflict with native-style redirect URIs; non-OIDC servers safely ignore it |
| Native applications (desktop, mobile, CLI tools, locally-hosted web apps accessed via `localhost`) | **SHOULD** use `application_type: "native"` |
| Web applications (remote browser-based apps served from a non-local host) | **SHOULD** use `application_type: "web"` |

Clients **MUST** be prepared to handle registration failures due to redirect URI constraints when authorization servers implement OIDC. On rejection, clients **SHOULD** surface a meaningful error to the user or developer and **MAY** retry with an adjusted `application_type` or conforming redirect URIs.

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision released on or after 2027-07-28): Dynamic Client Registration. New implementations should use Client ID Metadata Documents; DCR remains for backwards compatibility with authorization servers that do not support them.
- Authorization Server Binding: clients that use pre-registered credentials, or persist credentials obtained via DCR, **MUST** associate them with the specific authorization server that issued them, keyed by its `issuer` identifier. When the authorization server changes (detected via updated protected resource metadata), clients **MUST NOT** reuse credentials from a different authorization server and **MUST** re-register with the new one.
- Pre-registered credentials are inherently AS-specific. If the AS indicated by protected resource metadata no longer matches, clients **SHOULD** surface an error rather than silently attempting to use mismatched credentials.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/client-registration.mdx`; deprecation row from `docs/specification/2026-07-28/deprecated.mdx`.

## Related

- [Client ID Metadata Documents](./client-id-metadata-documents.md)
- [Authorization Server Discovery](./authorization-server-discovery.md)
- [Authorization Security Considerations](./authorization-security.md)
