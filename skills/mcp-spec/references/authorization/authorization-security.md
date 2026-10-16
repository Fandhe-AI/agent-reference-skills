---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations
---

# Authorization Security Considerations

Security requirements implementers **MUST** consider when building MCP clients and servers, in addition to OAuth 2.1 security best practices (OAuth 2.1 Section 7).

## Signature / Usage

PKCE support check against authorization server metadata (the field that must be present):

```json
{
  "code_challenge_methods_supported": ["S256"]
}
```

Clients **MUST** implement PKCE (OAuth 2.1 Section 7.5.2), **MUST** verify PKCE support before proceeding, and **MUST** use the `S256` code challenge method when technically capable. If `code_challenge_methods_supported` is absent from the authorization server metadata (OAuth 2.0 AS Metadata or OpenID Connect provider metadata), the AS does not support PKCE and clients **MUST** refuse to proceed. Authorization servers providing OpenID Connect Discovery 1.0 **MUST** include `code_challenge_methods_supported`.

## Options / Props

| Topic | Requirements |
| --- | --- |
| Token Audience Binding and Validation | Clients **MUST** include the `resource` parameter in authorization and token requests; servers **MUST** validate tokens were issued specifically for their use |
| Token Theft | Clients and servers **MUST** implement secure token storage (OAuth 2.1 Section 7.1); ASs **SHOULD** issue short-lived access tokens; for public clients ASs **MUST** rotate refresh tokens (OAuth 2.1 Section 4.3.1) |
| Communication Security | All authorization server endpoints **MUST** be served over HTTPS; all redirect URIs **MUST** be either `localhost` or use HTTPS |
| Authorization Code Protection | PKCE with `S256`; see above |
| Mix-Up Attacks | Mitigation is the `iss` validation specified in Authorization Response Validation (RFC9207) |
| Open Redirection | Clients **MUST** have redirect URIs registered with the AS; ASs **MUST** validate exact redirect URIs against pre-registered values; clients **SHOULD** use and verify `state` and discard mismatched results; ASs **MUST** take precautions against redirecting to untrusted URIs (OAuth 2.1 Section 7.12.2) and **SHOULD** only auto-redirect to trusted URIs |
| CIMD: Authorization Server Abuse Protection | ASs fetching metadata documents **SHOULD** consider SSRF risks |
| CIMD: Localhost Redirect URI Risks | CIMD cannot prevent `localhost` impersonation by itself; ASs **SHOULD** display additional warnings for `localhost`-only redirect URIs, **MAY** require additional attestation, and **MUST** clearly display the redirect URI hostname during authorization |
| CIMD: Trust Policies | ASs **MAY** implement domain-based trust policies (Sections 6.4 and 6.8 of the CIMD draft) |
| Confused Deputy Problem | MCP proxy servers using static client IDs **MUST** obtain user consent for each dynamically registered client before forwarding to third-party authorization servers |
| Access Token Privilege Restriction | MCP servers **MUST** validate access tokens before processing (OAuth 2.1 Section 5.2), **MUST** only accept tokens intended for themselves and reject those without them in the audience claim, and **MUST NOT** pass through the received token to upstream APIs |

## Notes

- Upstream API access: the token used at an upstream API is a separate token issued by the upstream authorization server; the MCP server acts as an OAuth client to it.
- The `resource` parameter requirement aligns with RFC 9728 Section 7.4.
- RFC 8707 Resource Indicators bind tokens to audiences when the Authorization Server supports the capability.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/security-considerations.mdx`.

## Related

- [Authorization Flow Steps](./authorization-flow.md)
- [Resource Parameter Implementation](./resource-parameter.md)
- [Client ID Metadata Documents](./client-id-metadata-documents.md)
- [Access Token Usage and Refresh Tokens](./access-token-usage.md)
