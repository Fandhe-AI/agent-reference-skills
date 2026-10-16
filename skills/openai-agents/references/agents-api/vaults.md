# Vaults

A vault stores credentials outside the agent's instructions and configuration. Attach it to a session with `vault_ids` so the session can use those credentials.

## Signature / Usage

```python
import os

vault = client.beta.agents.vaults.create(
    name="GitHub credentials", metadata={"external_user_id": "user_123"}
)

# Save the vault ID, then add the token.
vault_id = vault.id
mcp_url = "https://api.githubcopilot.com/mcp/"
access_token = os.environ["GITHUB_TOKEN"]

credential = client.beta.agents.vaults.credentials.create(
    vault_id,
    name="GitHub access token",
    auth={
        "type": "static_bearer",
        "mcp_server_url": mcp_url,
        "token": access_token,
    },
)

session = client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "tools": [
            {
                "type": "mcp",
                "server_label": "github",
                "transport": {"type": "http", "server_url": mcp_url},
                "allowed_tools": ["search_issues", "issue_read"],
                "required": True,
                "connection_origin": "service",
            }
        ],
    },
    environment={"type": "none"},
    input="Find open bugs reported in the last week.",
    vault_ids=[vault_id],
)
```

Sandbox API-request session settings:

```json
{
  "vault_ids": ["vault_123"],
  "environment": {
    "type": "openai_hosted",
    "network": {
      "access": "restricted",
      "allowed_domains": ["api.github.com"]
    }
  }
}
```

## Options / Props

| Request | Credential type | How the session uses it |
|---------|-----------------|-------------------------|
| MCP connection from OpenAI | `static_bearer` or `mcp_oauth` | OpenAI authenticates to the configured MCP server |
| API request from an OpenAI-hosted sandbox | `environment_variable` | Code reads an env var holding a placeholder; a network proxy replaces it with the secret for approved hosts |

| Environment credential field | Value (GitHub example) |
|------------------------------|------------------------|
| `name` | `GitHub API token` |
| `auth.type` | `environment_variable` |
| `auth.secret_name` | `GITHUB_TOKEN` |
| `auth.secret_value` | The real token (from a secret env var in your application) |
| `auth.networking.type` | `limited` |
| `auth.networking.allowed_hosts` | `["api.github.com"]` |

OAuth grant: `auth.type: "mcp_oauth"` with `mcp_server_url`, `access_token`, `expires_at` (RFC 3339), and optional `refresh` (`token_endpoint`, `client_id`, `refresh_token`, `token_endpoint_auth`: `none`, `client_secret_basic`, or `client_secret_post`).

## Notes

- Permissions for a restricted application key: `api.vaults.read` (list/retrieve) and `api.vaults.write` (create/update/delete). Retrieving a vault or credential does not return secret values.
- A credential matches the MCP server URL; if several attached credentials match, set the MCP tool's `credential_id`.
- Environment credentials require an `openai_hosted` environment; they are not supplied to self-hosted environments or application-run function tools. Use exact host names in `allowed_hosts` (no scheme, path, port, wildcard); the proxy supplies secrets only to HTTPS on port 443 or 8443. `allowed_domains` (sandbox network) and `allowed_hosts` (proxy secret injection) are separate; with restricted access include every credential host in `allowed_domains`; do not set `network.access` to `disabled`. Each environment credential needs a unique `secret_name`, not also defined in `environment.env`.
- The placeholder is passed unchanged in the HTTPS request header; it cannot supply the real secret for local computation such as signing. Keep such credentials in your application behind a function tool.
- OAuth: your application handles the provider's authorization flow; include `refresh` to let the Agents API refresh the token. If an expired token cannot be refreshed, supply a replacement; expiry does not delete the credential or vault.
- Rotate: update a credential to replace its secret without changing its ID, type, or (for MCP) server URL. Supplying a new access token without `expires_at` clears the stored expiry; explicit `null` also clears it. Environment credentials rotate via `POST /v1/vaults/{vault_id}/credentials/{credential_id}` and need a new session; changing `secret_name` or `networking` requires a new credential.
- Deleting credentials does not revoke tokens at providers or stop a running session. Deleting a vault removes all its credentials.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/vaults (fetched 2026-10).

## Related

- [MCP Connections](./mcp-connections.md)
- [Sandbox Security](./sandbox-security.md)
- [Functions](./functions.md)
