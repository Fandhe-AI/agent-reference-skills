# Authentication

OAuth 2.1 flow for plugin MCP servers that expose customer-specific data or write actions, conforming to the MCP authorization spec. Applies across both ChatGPT and Codex.

## Signature / Usage

Protected resource metadata (hosted on your MCP server, e.g. `GET https://your-mcp.example.com/.well-known/oauth-protected-resource`):

```json
{
  "resource": "https://your-mcp.example.com",
  "authorization_servers": ["https://auth.yourcompany.com"],
  "scopes_supported": ["files:read", "files:write"],
  "resource_documentation": "https://yourcompany.com/docs/mcp"
}
```

401 challenge:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

Authorization server metadata (`.well-known/oauth-authorization-server` or `.well-known/openid-configuration`):

```json
{
  "issuer": "https://auth.yourcompany.com",
  "authorization_response_iss_parameter_supported": true,
  "authorization_endpoint": "https://auth.yourcompany.com/oauth2/v1/authorize",
  "token_endpoint": "https://auth.yourcompany.com/oauth2/v1/token",
  "client_id_metadata_document_supported": true,
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "registration_endpoint": "https://auth.yourcompany.com/oauth2/v1/register",
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["files:read", "files:write"]
}
```

ChatGPT's production CIMD document during the SEP-3149 transition (plural list plus legacy singular preference):

```json
{
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "token_endpoint_auth_method": "private_key_jwt"
}
```

Per-tool auth policy (TypeScript SDK):

```ts
server.registerTool(
  "create_doc",
  {
    title: "Create Document",
    description: "Make a new doc in your account.",
    inputSchema: { title: z.string() },
    outputSchema: {},
    _meta: {
      securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
    },
  },
  async ({ title }) => ({ content: [{ type: "text", text: `Created doc: ${title}` }], structuredContent: {} })
);
```

Profile tool for multi-account (read-only, empty input, `_meta["openai/profile"]: true`, `outputSchema` = profile schema):

```json
{
  "name": "get_profile",
  "description": "Return the profile represented by this request's authenticated credentials. The opaque id is unique within this app and remains unchanged across token refresh, reconnection, and display-metadata changes.",
  "inputSchema": {
    "type": "object",
    "properties": {},
    "additionalProperties": false
  },
  "outputSchema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "minLength": 1,
        "pattern": "\\S",
        "description": "Opaque profile identifier, unique within this app and unchanged across token refresh, reconnection, and display-metadata changes. Never reassigned to another profile."
      },
      "name": {
        "type": "string",
        "description": "Display name for the authenticated profile."
      },
      "email": {
        "type": "string",
        "description": "Email address for display; not used as the profile identity."
      },
      "nickname": {
        "type": "string",
        "description": "A useful label that helps users distinguish connected profiles."
      }
    },
    "required": ["id"],
    "additionalProperties": false
  },
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "openWorldHint": false
  },
  "securitySchemes": [
    {
      "type": "oauth2",
      "scopes": []
    }
  ],
  "_meta": {
    "openai/profile": true
  }
}
```

Profile tool result (profile in `structuredContent`, plus the same JSON serialized in a text content item):

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"prf_8d7e4b19\",\"name\":\"Alex Chen\",\"email\":\"alex@example.com\",\"nickname\":\"Alex — Moonwaffle work\"}"
    }
  ],
  "structuredContent": {
    "id": "prf_8d7e4b19",
    "name": "Alex Chen",
    "email": "alex@example.com",
    "nickname": "Alex — Moonwaffle work"
  },
  "isError": false
}
```

## Options / Props

| Field / concept | Description |
|------------------|-------------|
| `resource` | Canonical HTTPS identifier for your MCP server; echoed as `resource` query param during OAuth |
| `authorization_servers` | Issuer base URLs pointing to your identity provider |
| `resource_documentation`, `resource_policy_uri`, `resource_tos_uri` | Optional RFC 9728 extras that help clients and admins understand your setup |
| `issuer` | Canonical authorization server identifier; use this exact value in the protected resource metadata `authorization_servers` list |
| `authorization_response_iss_parameter_supported` | Set `true` only when the authorization server returns `iss` in every authorization response, including error responses (RFC 9207) |
| `client_id_metadata_document_supported` | Set `true` to let ChatGPT use CIMD for client registration. ChatGPT prioritizes CIMD when available, but the plugin builder can choose DCR when both are available |
| `token_endpoint_auth_methods_supported` | Methods your token endpoint accepts; applies to CIMD, DCR, and predefined OAuth clients. For CIMD ChatGPT supports `none` (public client) and `private_key_jwt` (signed assertion); other clients commonly use `none`, `client_secret_post`, or `client_secret_basic`. In ChatGPT's CIMD document the plural field lists methods ChatGPT can use (no preference order) and the legacy singular `token_endpoint_auth_method` is the preference |
| `registration_endpoint` | Present when supporting DCR; ChatGPT can register dynamically when the plugin builder chooses DCR or CIMD is not available |
| `scopes_supported` (protected resource metadata) | Optional; helps ChatGPT explain the permissions it will ask the user for. Advertised OIDC scopes (`openid`, `email`, `profile`) are requested by default |
| `code_challenge_methods_supported` | Must include `S256`; servers whose metadata omits it or does not advertise `S256` are unsupported |
| `securitySchemes: [{ type: "noauth" }]` (in `_meta` in the official TS SDK examples) | Tool callable anonymously |
| `securitySchemes: [{ type: "oauth2", scopes: [...] }]` | Tool requires an OAuth 2.0 access token with given scopes; include the scopes you will request so the consent screen is accurate |
| `securitySchemes: [{ type: "noauth" }, { type: "oauth2", scopes: [...] }]` | Optional auth: starts anonymous, linking unlocks privileged behavior. Omitting the array means the tool inherits the server's advertised default |
| `_meta["mcp/www_authenticate"]` | Set on tool error result to trigger ChatGPT's tool-level OAuth linking UI; must include `error` and `error_description` |
| `_meta["openai/profile"]` | `true` on the profile tool; absent or false means not a profile source; strings, numbers, and null are invalid |

Client ID (CIMD) URLs and redirect URIs by callback mode:

| Mode | `client_id` (CIMD document URL) | Redirect URI |
|------|---------------------------------|--------------|
| Authorization server meets RFC 9207 issuer identification (also MCP servers published before callback-ID redirects) | `https://chatgpt.com/oauth/client.json` | `https://chatgpt.com/connector_platform_oauth_redirect` |
| Otherwise | `https://chatgpt.com/oauth/{callback_id}/client.json` | `https://chatgpt.com/connector/oauth/{callback_id}` |

Profile response schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (non-empty, non-whitespace) | yes | Opaque profile ID, unique within the app, stable across token refresh / reconnection / scope upgrades / display changes; never reassigned |
| `name` | string | no | Display name |
| `email` | string | no | For display only; not the profile identity |
| `nickname` | string | no | Label that helps users distinguish connected profiles |

## Notes

- Redirect URL: copy the exact production redirect URI shown in the MCP server's management page into your authorization server's allowlist. If the authorization server meets the issuer identification requirements (RFC 9207), ChatGPT uses the stable `https://chatgpt.com/connector_platform_oauth_redirect`; otherwise it uses the callback-ID-specific `https://chatgpt.com/connector/oauth/{callback_id}`. MCP servers published before callback-ID-specific redirects also keep using the stable URI.
- Issuer identification: set `authorization_response_iss_parameter_supported: true`, use the same exact issuer in metadata `issuer` and protected resource `authorization_servers`, and return `iss` in every successful and error authorization response. Clients compare by exact string (no normalization of trailing slashes, paths, ports, or casing). ChatGPT and Codex record the selected `issuer` before redirecting and reject a missing or mismatched `iss`.
- ChatGPT performs authorization-code + PKCE (`S256`); include `S256` in `code_challenge_methods_supported`.
- CIMD (Client ID Metadata Documents) is the preferred client-registration method over DCR when the authorization server supports it and the plugin builder chooses it; ChatGPT's CIMD document serves its JWKS at `/oauth/jwks.json` and signs `private_key_jwt` requests server-side. DCR runs once per MCP server connection and the registered client is reused.
- SEP-3149 transition: ChatGPT selects a method from the intersection of the methods your token endpoint accepts and the methods in its CIMD document; when the legacy singular preference is in the intersection it uses it. Servers reading the plural field should accept any method in the intersection unless local policy disallows it, and must reject methods outside it. The `client_id` URL stays stable and does not use query parameters to select a method.
- Keep the registered OAuth client and any client secret valid while the connection is in use; expiry, deletion, or replacement can yield `invalid_client` for users and reviewers. Access and refresh tokens can still expire or rotate normally.
- ChatGPT does **not** support machine-to-machine grants (client credentials, service accounts, JWT bearer) and cannot present custom API keys or customer-provided mTLS certs.
- mTLS: ChatGPT presents an OpenAI-managed client certificate; validate the chain against the published OpenAI Root CA and Connectors mTLS intermediate CA, and check leaf SAN `dnsName` is `mtls.prod.connectors.openai.com`. Use mTLS to authenticate ChatGPT as the client; still use OAuth 2.1 for end-user auth.
- Your server must independently verify every token — signature, issuer, audience (`aud`/`resource`), expiry and not-before (`exp`/`nbf`), scopes. ChatGPT attaches the token as `Authorization: Bearer <token>` but performs no verification for you.
- On verification failure, return `401` with a `WWW-Authenticate` challenge pointing back to your protected-resource metadata.
- Triggering the tool-level OAuth UI requires **both** `securitySchemes` metadata **and** a runtime `_meta["mcp/www_authenticate"]` error — declare per-tool, not server-wide, so tools can evolve independently.
- Reauthorization can carry `id_token_hint` (the prior OIDC ID token) to let users grant more scopes without a fresh login; optional to support.
- Multi-account: users can connect more than one account to the same plugin (for example personal and work) without a profile tool; the model selects the relevant account per tool call. A profile tool improves labels, reconnection recognition, and duplicate detection. If you declare a profile tool, return a valid identity: an invalid response can prevent account connection.
- Profile tool rules: authenticated, read-only, empty argument object, returns exactly one profile for the request's credentials (name may be `get_profile`, `whoami`, or other). No caller-supplied user ID / email / account selector. On auth failure return the auth error, not a placeholder ID. Return the profile in `structuredContent` and also as JSON text in a content item; use a single JSON object with fields at the top level.
- Profile ID stability: non-empty string (serialize numeric IDs as strings); same across token refresh, reconnect, scope upgrades, and email/name changes; distinct for distinct profiles; never reassigned after deletion; do not generate per login / token / session / tool call; do not encode names or emails. For Google OIDC use the stable `sub`, not the email claim. A passing schema check does not prove uniqueness or correct credential scoping.
- Per-tool `securitySchemes` placement: the official TypeScript SDK examples put it under `_meta` (`_meta: { securitySchemes: [...] }`); the profile-tool declaration shows it at the descriptor top level. Declare per tool even when the whole server shares one policy. Whatever you signal to the client, the server must still verify the token, scopes, and audience on every invocation.
- OIDC scopes: if the provider advertises OIDC scopes (for example `openid`, `email`, `profile`) in `scopes_supported` of its `.well-known/oauth-authorization-server` or `.well-known/openid-configuration` document, ChatGPT requests them by default. Some identity providers do not enable advertised OIDC scopes by default; enable every advertised scope for the OAuth client (CIMD, manually created, or DCR).
- Workspace domain restrictions: ChatGPT Enterprise workspaces can verify email-domain ownership, and ChatGPT can use the verified email domain to stop a corporate identity from linking the plugin in a personal or outside workspace. To support it, publish OpenID Connect discovery metadata, advertise and enable the `openid` and `email` scopes, and advertise a UserInfo Endpoint returning the `email` claim and `email_verified: true` (ID-token claims are optional; the UserInfo Endpoint is required). The workspace must also verify its domain; your server only supplies the identity.
- `resource` echo: ChatGPT appends `resource=https%3A%2F%2Fyour-mcp.example.com` to both authorization and token requests. Configure the authorization server to copy it into the access token (commonly the `aud` claim) and reject tokens missing the expected audience or scopes, relying on the `WWW-Authenticate` challenge to prompt re-authorization.
- OAuth flow order: (1) ChatGPT queries protected resource metadata; (2) it identifies as the client (CIMD: skips registration and sends the CIMD document URL as `client_id`; DCR: calls `registration_endpoint` once per connection and reuses the client; the MCP server's management page shows the exact client metadata document and redirect URI for the callback mode); (3) on first tool use it launches authorization code + PKCE; (4) it exchanges the code and sends `Authorization: Bearer <token>`; (5) your server verifies the token on each request.
- CIMD `private_key_jwt`: ChatGPT publishes a public JWKS URL in its CIMD metadata and signs token requests server-side with a managed private key and `kid`; verify the client assertion against that JWKS. `none` suits PKCE-based exchange without client authentication (no per-client secret stored). DCR can create many registered clients across many connections, so CIMD is usually easier to administer at scale.
- Client identification: besides mTLS you can allowlist ChatGPT's published egress IP ranges (https://developers.openai.com/api/docs/guides/ip-addresses). mTLS validation: leaf present and chained to the OpenAI Connectors mTLS intermediate CA, valid for client authentication, SAN `dnsName` is `mtls.prod.connectors.openai.com`; do not pin a leaf fingerprint (OpenAI may rotate the leaf under the published CA chain). CA PEMs: https://developers.openai.com/plugins/mtls/openai-root-ca.pem and https://developers.openai.com/plugins/mtls/openai-connectors-mtls-ca.pem.
- Token verification in practice: fetch signing keys from the authorization server (usually JWKS) and verify signature and `iss`; deny expired / not-yet-valid tokens (`exp` / `nbf`); confirm `aud` (or `resource` claim) and required scopes; run server-specific policy checks (replay considerations included), then attach the resolved identity or return `401` + `WWW-Authenticate`. The Python and TypeScript MCP SDKs include helpers (https://github.com/modelcontextprotocol/python-sdk, https://github.com/modelcontextprotocol/typescript-sdk).
- Identity providers: prefer an established provider over implementing auth yourself, and one that supports CIMD (`none` / `private_key_jwt`), DCR when needed, and `resource` echo. Official pointers: Auth0 (MCP authorization guide in `openai/openai-mcpkit`, `python-authenticated-mcp-server-scaffold`) and Stytch (connected apps MCP guide).
- Testing and rollout: start with a development tenant issuing short-lived tokens; gate access to trusted testers before broad rollout (linking can be required for specific tools or the whole server); plan for revocation, refresh, and scope changes (treat missing or stale tokens as unauthenticated with a helpful error); debug each OAuth step with MCP Inspector Auth settings.
- Reauthorization `id_token_hint`: to benefit, issue an ID token in the original OAuth flow and honor `id_token_hint`; a tool-level challenge that prompts reauthorization can reuse it. Reauthorization still works without it.
- Multi-account: connected accounts are managed from the plugin's settings page; each tool call uses the selected account's credentials and permissions. OpenAI discovers the designated profile tool at runtime, calls it with the connection's credentials, and validates the response. Without a profile tool, labels, recognition, and duplicate detection may be less reliable.
- Profile identity sourcing: use an existing immutable opaque provider ID when it identifies the full profile; otherwise assign an opaque ID once, persist its association with the profile, and retrieve it on future requests. Keep internal relationships in your service. Preserve existing profile IDs when updating the integration. Include `name` / `email` / `nickname` when available, omit unavailable optional values (do not invent them or add unrelated personal data), and put human-readable context in `nickname`, not the ID. Already have a profile tool: keep its name, add the metadata declaration, and return the standard shape (adapt via the server or a small wrapper tool). The declaration does not implement authentication; use your integration's actual OAuth scopes if profile access requires them.
- Profile identity checks (fictional Moonwaffle example, `prf_8d7e4b19` work profile / `prf_42a9c6e0` personal profile): same ID on repeated calls, after token refresh / reconnect / scope upgrade, and after an email or display-label change; distinct ID for the other profile; a missing or blank persisted ID returns an error result with no invented identity or fallback to another profile. See `../../samples/profile-tool.md` for the handler.
- Source: https://developers.openai.com/plugins/build/auth (local .md twin copy, fetched 2026-11-14).

## Related

- [MCP server](./mcp-server.md)
- [Add UI to your MCP server](./chatgpt-ui.md)
- [Tool descriptor _meta](../reference/tool-descriptor-meta.md)
