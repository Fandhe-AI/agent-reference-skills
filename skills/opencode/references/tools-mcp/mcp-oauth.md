---
source: https://opencode.ai/docs/mcp-servers/#oauth
---

# MCP servers: OAuth

OAuth is enabled for remote servers unless `oauth` is `false`. OpenCode discovers the authorization server, signs in with PKCE, and refreshes tokens. Credentials are stored outside project configuration.

## Signature / Usage

Most servers need only the URL:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "sentry": {
        "type": "remote",
        "url": "https://mcp.sentry.dev/mcp",
      },
    },
  },
}
```

If the server needs authentication, run `/mcps`, select it, and complete authorization in the browser. The CLI can start the same flow:

```sh
opencode mcp auth sentry
```

### Browser on another machine

When OpenCode runs over SSH, in a container, or on a remote server, the browser cannot reach OpenCode after you sign in and shows a page that does not load. Copy that page's URL from the address bar and paste it into the sign-in prompt:

```text
http://127.0.0.1:52817/callback?code=...&state=...
```

The prompt appears in `/mcps`, in `opencode mcp auth`, and in the desktop and web app's sign-in dialog while OpenCode waits for the browser.

### Client registration

OpenCode identifies itself to the authorization server with the first method that applies:

| Method | Used when |
| --- | --- |
| Pre-registered client | `oauth.client_id` is configured. |
| [Client ID Metadata Document](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#client-id-metadata-documents) (CIMD) | The authorization server supports CIMD and public clients, and `oauth.redirect_uri` is not set. |
| [Dynamic client registration](https://datatracker.ietf.org/doc/html/rfc7591) (DCR) | Neither of the above applies. OpenCode registers a client and reuses it on later sign-ins. |

An authorization server opts into CIMD through its metadata:

```json
{
  "issuer": "https://auth.example.com",
  "client_id_metadata_document_supported": true,
  "token_endpoint_auth_methods_supported": ["none"]
}
```

With CIMD, OpenCode sends its metadata document URL as the `client_id` and skips registration:

```text
https://opencode.ai/oauth/opencode/client.json
```

The document allows these loopback redirects without a port:

- `http://127.0.0.1/callback`
- `http://localhost/callback`
- `http://127.0.0.1/mcp/oauth/callback` for older clients

Authorization servers accept any loopback port for these redirects, as [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3) requires, so `callback_port` works with CIMD. A custom `redirect_uri` does not, so OpenCode falls back to DCR.

If the authorization server supports neither CIMD nor DCR, configure a pre-registered client.

### Pre-registered clients

When a provider gives you client credentials, use V2's snake_case OAuth fields:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "company-tools": {
        "type": "remote",
        "url": "https://mcp.example.com/mcp",
        "oauth": {
          "client_id": "{env:MCP_CLIENT_ID}",
          "client_secret": "{env:MCP_CLIENT_SECRET}",
          "scope": "tools:read tools:execute",
          "callback_port": 19876,
          "redirect_uri": "http://127.0.0.1:19876/callback",
        },
      },
    },
  },
}
```

Remove stored OAuth credentials when you need to sign in again or switch accounts:

```sh
opencode mcp logout sentry
```

## Options / Props

| Field | Description |
| --- | --- |
| `client_id` | Pre-registered client ID. Takes priority over CIMD and DCR. |
| `client_secret` | Secret for a confidential client, sent in the token request body. Omit it for public clients. |
| `scope` | Space-delimited scopes to request. Defaults to the scope the server names when it rejects an unauthenticated request. |
| `callback_port` | Local callback port from `1` through `65535`. Defaults to the `redirect_uri` port, then an available ephemeral port. |
| `redirect_uri` | Pre-registered loopback URI whose path and port reach the local callback listener. Setting it disables CIMD. |
| `auth_server_metadata_url` | URL of the authorization server's OAuth or OpenID Connect metadata document. Set it when the MCP server does not publish protected resource metadata that names its authorization server. |

## Notes

- Use `{env:...}` for `client_secret`; do not commit secrets.
- The authorization flow is defined by the MCP specification (`mcp-spec`).

## Related

- [mcp-remote.md](./mcp-remote.md)
- [mcp-overview.md](./mcp-overview.md)
