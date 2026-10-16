---
source: https://modelcontextprotocol.io/extensions/auth/oauth-client-credentials
---

# OAuth Client Credentials

The `io.modelcontextprotocol/oauth-client-credentials` extension adds the OAuth 2.0 client credentials flow (RFC 6749 section 4.4) to MCP, letting automated systems connect to MCP servers without interactive user authorization.

## Signature / Usage

Client declares support in per-request capabilities:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "...",
  "params": {
    // Other fields...
    "_meta": {
      // Other fields...
      "io.modelcontextprotocol/clientCapabilities": {
        "extensions": {
          "io.modelcontextprotocol/oauth-client-credentials": {},
        },
      },
    },
  },
}
```

The token is passed in the `Authorization` header of HTTP requests to the MCP server:

```
Authorization: Bearer <access_token>
```

Server optionally (recommended for discoverability) advertises the extension in `server/discover`:

```jsonc
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    // Other fields...
    "capabilities": {
      "extensions": {
        "io.modelcontextprotocol/oauth-client-credentials": {},
      },
    },
  },
}
```

## Options / Props

Two credential formats are supported:

| Format | Grant | Description |
| --- | --- | --- |
| JWT Bearer Assertion (recommended) | `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`, `assertion=<signed JWT>` | RFC 7523. Client signs a token with its private key; the authorization server validates with the registered public key. |
| Client secret | `grant_type=client_credentials`, `client_id` + `client_secret` | Standard client credentials flow at the token endpoint. |

Typical JWT assertion claims: `iss` (client ID), `sub` (client ID), `aud` (authorization server token endpoint URL), `exp`, `iat`.

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`). The normative specification is in the ext-auth repository (not reproduced here).
- Use for background services, CI/CD pipelines, server-to-server integrations, and daemons. If a human user should explicitly authorize access, use the standard MCP authorization flow.
- Client secrets are long-lived credentials: store them in a secrets manager (never in source code or checked-in env files), rotate regularly and after suspected compromise, scope to minimum permissions, and prefer JWT assertions (short-lived, no transmission of the signing key).
- Client steps: declare support, obtain an access token via the client credentials grant before connecting, include the Bearer token, and implement refresh since these tokens typically have shorter lifetimes.
- Server steps: validate the JWT signature and claims on each request (usually via a JWKS endpoint), check scopes, and optionally advertise the extension.
- The official SDKs provide built-in providers (e.g., `ClientCredentialsProvider`, `PrivateKeyJwtProvider` in `@modelcontextprotocol/client`; `ClientCredentialsOAuthProvider` / `PrivateKeyJWTOAuthProvider` in the Python `mcp` package) that handle token acquisition and refresh. SDK protocol-version support is not stated in the source.
- Extensions are opt-in and never active by default; see the client matrix for client support.

## Related

- [Authorization Extensions](./auth-extensions.md)
- [Enterprise-Managed Authorization](./enterprise-managed-authorization.md)
- [Extension Client Matrix](./client-matrix.md)
