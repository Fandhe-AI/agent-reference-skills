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
  "authorization_endpoint": "https://auth.yourcompany.com/oauth2/v1/authorize",
  "token_endpoint": "https://auth.yourcompany.com/oauth2/v1/token",
  "client_id_metadata_document_supported": true,
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "registration_endpoint": "https://auth.yourcompany.com/oauth2/v1/register",
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["files:read", "files:write"]
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
    securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
  },
  async ({ title }) => ({ content: [{ type: "text", text: `Created doc: ${title}` }], structuredContent: {} })
);
```

## Options / Props

| Field / concept | Description |
|------------------|-------------|
| `resource` | Canonical HTTPS identifier for your MCP server; echoed as `resource` query param during OAuth |
| `authorization_servers` | Issuer base URLs pointing to your identity provider |
| `client_id_metadata_document_supported` | Set `true` to let ChatGPT use CIMD for client registration |
| `token_endpoint_auth_methods_supported` | `none` (public client) and/or `private_key_jwt` (signed assertion) for CIMD; other clients commonly use `client_secret_post`/`client_secret_basic` |
| `registration_endpoint` | Present when supporting DCR |
| `securitySchemes: [{ type: "noauth" }]` | Tool callable anonymously |
| `securitySchemes: [{ type: "oauth2", scopes: [...] }]` | Tool requires an OAuth 2.0 access token with given scopes |
| `_meta["mcp/www_authenticate"]` | Set on tool error result to trigger ChatGPT's tool-level OAuth linking UI; must include `error` and `error_description` |

## Notes

- Redirect URL ChatGPT uses: `https://chatgpt.com/connector/oauth/{callback_id}`; legacy `https://chatgpt.com/connector_platform_oauth_redirect` still works for already-published apps.
- ChatGPT performs authorization-code + PKCE (`S256`); include `S256` in `code_challenge_methods_supported`.
- CIMD (Client ID Metadata Documents) is the preferred client-registration method over DCR; ChatGPT's CIMD document serves its JWKS at `/oauth/jwks.json` and signs `private_key_jwt` requests server-side.
- ChatGPT does **not** support machine-to-machine grants (client credentials, service accounts, JWT bearer) and cannot present custom API keys or customer-provided mTLS certs.
- mTLS: ChatGPT presents an OpenAI-managed client certificate; validate the chain against the published OpenAI Root CA and Connectors mTLS intermediate CA, and check leaf SAN `dnsName` is `mtls.prod.connectors.openai.com`. Use mTLS to authenticate ChatGPT as the client; still use OAuth 2.1 for end-user auth.
- Your server must independently verify every token — signature, issuer, audience (`aud`/`resource`), expiry, scopes. ChatGPT attaches the token as `Authorization: Bearer <token>` but performs no verification for you.
- On verification failure, return `401` with a `WWW-Authenticate` challenge pointing back to your protected-resource metadata.
- Triggering the tool-level OAuth UI requires **both** `securitySchemes` metadata **and** a runtime `_meta["mcp/www_authenticate"]` error — declare per-tool, not server-wide, so tools can evolve independently.
- Reauthorization can carry `id_token_hint` (the prior OIDC ID token) to let users grant more scopes without a fresh login; optional to support.

## Related

- [MCP server](./mcp-server.md)
- [Add UI to your MCP server](./chatgpt-ui.md)
