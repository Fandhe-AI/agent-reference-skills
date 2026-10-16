<!-- source: https://platform.claude.com/docs/en/managed-agents/vaults / last verified: 2026-10-17 -->

# Authenticate with vaults

Vaults and credentials are workspace-scoped authentication primitives: register per-user credentials once and reference them by ID at session creation, instead of running your own secret store or transmitting tokens on every call.

## Signature / Usage

```python
vault = client.beta.vaults.create(display_name="Alice", metadata={"external_user_id": "usr_abc123"})
credential = client.beta.vaults.credentials.create(
    vault_id=vault.id,
    display_name="Linear API key",
    auth={"type": "static_bearer", "mcp_server_url": "https://mcp.linear.app/mcp", "token": "lin_api_..."},
)
session = client.beta.sessions.create(agent=agent.id, environment_id=environment.id, vault_ids=[vault.id])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `auth.type: "mcp_oauth"` | credential | OAuth 2.0 MCP credential; optional `refresh` block lets Anthropic refresh the access token automatically. `refresh.token_endpoint_auth.type` says how the refresh call authenticates: `none` (public client), `client_secret_basic` (HTTP Basic with the client secret), or `client_secret_post` (client secret in the POST body) |
| `auth.type: "static_bearer"` | credential | Fixed bearer token (API key/PAT) for an MCP server, keyed by `mcp_server_url` |
| `auth.type: "environment_variable"` | credential | Keyed by `secret_name`; stored as an opaque sandbox placeholder, substituted with the real secret only at egress (agent never sees the value); scoped by `networking.allowed_hosts` and `injection_location` (`header`/`body`) |
| `injection_location` | object | On `environment_variable` credentials, a sibling of `networking` with Boolean `header` and `body`: which parts of an outbound request the secret is substituted into (independent of `allowed_hosts`, which scopes hosts). On create, an object you provide defaults omitted fields to `false` (`{"header": true}` = header-only); omitting the object enables both. On update, fields merge individually. At least one location must stay enabled and explicit `null` returns 400; the response returns both fields resolved |
| Constraints | limits | Max 20 credentials/vault; `mcp_server_url`/`secret_name` unique per vault (409 on duplicate); structural fields immutable after creation (archive + recreate to change) |

## Notes

- `environment_variable` credentials are not yet supported with self-hosted sandboxes, and substitution is outbound-only (a client that exchanges the secret for a session token receives that token unredacted in the sandbox).
- `networking.allowed_hosts` on a credential controls which hosts get the secret substituted, not which hosts are reachable — the destination must also be allowed at the environment level.
- MCP credential matching: normalized `mcp_server_url` comparison against the agent's declared `mcp_servers[].url`; no match falls back to unauthenticated connection; first vault with a match wins when multiple `vault_ids` are passed.
- Credentials are re-resolved periodically so rotation/archival/deletion propagates to running sessions without restart; subscribe to `vault.archived`/`vault.deleted`/`vault_credential.*` webhooks for lifecycle notifications. A `vault_credential.refresh_failed` event fires when an `mcp_oauth` credential cannot be refreshed (invalid refresh token, or irrecoverable error from the OAuth server).
- Diagnose an OAuth refresh failure with `POST /v1/vaults/{vault_id}/credentials/{credential_id}/mcp_oauth_validate` (SDK: `client.beta.vaults.credentials.mcp_oauth_validate(...)`; CLI: `ant beta:vaults:credentials mcp-oauth-validate`). Top-level `status`: `valid` (no action), `invalid` (grant gone or the OAuth server rejected the refresh with a 4xx; prompt the end user to re-authorize), `unknown` (transient error: 5xx, 429, or network failure; wait and retry). The response is a `vault_credential_validation` object (`credential_id`, `vault_id`, `validated_at`, `has_refresh_token`, `status`); `mcp_probe` includes the failed MCP handshake step and `refresh` the outcome of the attempted refresh.
- Credentials created in the Console enable header injection only; a client that sends the secret in the request body gets the literal placeholder unless body injection is enabled (update with `{"injection_location": {"body": true}}`). A placeholder in a disabled location is neither substituted nor stripped.
- CLI: `ant apply vaults/service_accounts.yaml` creates the vault from a YAML file, prints its ID, and records it in `claude-lock.json`.
- Archiving a vault/credential purges secret payloads but retains records for audit; deleting is a hard delete.

## Related

- [MCP connector](../sessions/mcp-connector.md)
- [Start a session](../sessions/sessions.md)
