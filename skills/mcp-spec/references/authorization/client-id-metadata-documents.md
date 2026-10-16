---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration#client-id-metadata-documents
---

# Client ID Metadata Documents (CIMD)

Client registration where the `client_id` is an HTTPS URL pointing at a JSON document of client metadata; suited to the common case where client and server have no prior relationship.

## Signature / Usage

Example metadata document:

```json
{
  "client_id": "https://app.example.com/oauth/client-metadata.json",
  "client_name": "Example MCP Client",
  "client_uri": "https://app.example.com",
  "logo_uri": "https://app.example.com/logo.png",
  "redirect_uris": [
    "http://127.0.0.1:3000/callback",
    "http://localhost:3000/callback"
  ],
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

Authorization servers advertise support in their OAuth Authorization Server metadata:

```json
{
  "client_id_metadata_document_supported": true
}
```

MCP clients **SHOULD** check for this capability and **MAY** fall back to Dynamic Client Registration or pre-registration if unavailable.

## Options / Props

Client registration priority order for clients supporting all options (**SHOULD**):

| # | Mechanism |
| --- | --- |
| 1 | Pre-registered client information for the server, if available |
| 2 | Client ID Metadata Documents, if the AS indicates support via `client_id_metadata_document_supported` |
| 3 | Dynamic Client Registration, if the AS supports it via `registration_endpoint` |
| 4 | Prompt the user to enter the client information |

Requirements for MCP clients:

- **MUST** host their metadata document at an HTTPS URL following RFC requirements.
- The `client_id` URL **MUST** use the "https" scheme and contain a path component, e.g. `https://example.com/client.json`.
- The document **MUST** include at least `client_id`, `client_name`, `redirect_uris`.
- **MUST** ensure the `client_id` value in the metadata matches the document URL exactly.
- **MAY** use `private_key_jwt` for client authentication (e.g., token endpoint requests) with JWKS configuration per Section 6.2 of the Client ID Metadata Document draft.

Requirements for authorization servers:

- **SHOULD** fetch metadata documents when encountering URL-formatted `client_id`s.
- **MUST** validate that the fetched document's `client_id` matches the URL exactly.
- **SHOULD** cache metadata respecting HTTP cache headers.
- **MUST** validate redirect URIs in an authorization request against those in the metadata document.
- **MUST** validate the document is valid JSON and contains required fields.
- **SHOULD** follow Section 6 of the Client ID Metadata Document draft and the Client ID Metadata Document Security section of the specification.

## Notes

- MCP clients and authorization servers **SHOULD** support CIMD (draft-ietf-oauth-client-id-metadata-document-00). Implementations supporting it **MUST** follow that draft.
- Flow (from the source diagram): the client sends an authorization request with `client_id=<metadata URL>`; the AS detects the URL-formatted `client_id`, fetches the document, validates (1. `client_id` matches URL, 2. `redirect_uri` in the allowed list, 3. document structure valid, 4. optionally domain allowed via trust policy), shows a consent page with `client_name`, then proceeds to code and token exchange. On failure it returns `error=invalid_client` or `invalid_request`. Metadata is cached respecting HTTP cache headers.
- CIMD-based client IDs are portable across authorization servers, since they are self-hosted HTTPS URLs resolved by the authorization server on demand; no re-registration is needed when the authorization server changes.
- CIMD is the migration path from Dynamic Client Registration, which is deprecated in 2026-07-28.
- This skill states the specification requirements only. Concrete OAuth provider implementations (the MCP plugin and oauth-provider in better-auth, the OAuth server in supabase) live in the better-auth and supabase skills.
- Source: tag `2026-07-28` raw, `docs/specification/2026-07-28/basic/authorization/client-registration.mdx`.

## Related

- [Pre-registration and Dynamic Client Registration](./client-registration-fallbacks.md)
- [Authorization Security Considerations](./authorization-security.md)
- [Authorization Overview](./authorization-overview.md)
