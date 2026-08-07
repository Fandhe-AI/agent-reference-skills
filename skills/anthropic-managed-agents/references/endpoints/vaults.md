<!-- source: https://platform.claude.com/docs/en/api/beta/vaults/create, /list, /retrieve, /update, /delete, /archive, /credentials/create, /credentials/list, /credentials/retrieve, /credentials/update, /credentials/delete, /credentials/archive, /credentials/mcp_oauth_validate / last verified: 2026-08-07 -->

# Vaults API

A `vault` is a named container for `credentials` (MCP OAuth tokens, static bearer tokens, environment-variable secrets) that sessions can draw on via `vault_ids` at create time. Sensitive fields (`secret_value`, tokens, client secrets) are write-only and never returned in responses.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/vaults` | Create a vault |
| GET | `/v1/vaults` | List vaults (paginated, `include_archived`) |
| GET | `/v1/vaults/{vault_id}` | Retrieve a vault |
| POST | `/v1/vaults/{vault_id}` | Update a vault (display_name, metadata) |
| DELETE | `/v1/vaults/{vault_id}` | Permanently delete a vault |
| POST | `/v1/vaults/{vault_id}/archive` | Archive a vault |
| POST | `/v1/vaults/{vault_id}/credentials` | Create a credential (`mcp_oauth`, `static_bearer`, or `environment_variable`) |
| GET | `/v1/vaults/{vault_id}/credentials` | List credentials in a vault |
| GET | `/v1/vaults/{vault_id}/credentials/{credential_id}` | Retrieve a credential |
| POST | `/v1/vaults/{vault_id}/credentials/{credential_id}` | Update a credential |
| DELETE | `/v1/vaults/{vault_id}/credentials/{credential_id}` | Permanently delete a credential |
| POST | `/v1/vaults/{vault_id}/credentials/{credential_id}/archive` | Archive a credential |
| POST | `/v1/vaults/{vault_id}/credentials/{credential_id}/mcp_oauth_validate` | Live-probe a credential against its MCP server |

```bash
curl https://api.anthropic.com/v1/vaults/$VAULT_ID/credentials \
  -H 'Content-Type: application/json' \
  -H 'anthropic-version: 2023-06-01' \
  -H 'anthropic-beta: managed-agents-2026-04-01' \
  -H "X-Api-Key: $ANTHROPIC_API_KEY" \
  -d '{
        "auth": {"token": "bearer_exampletoken", "mcp_server_url": "https://example-server.modelcontextprotocol.io/sse", "type": "static_bearer"},
        "display_name": "Example credential"
      }'
```

## Options / Props

### Create/Update Vault body

| Name | Type | Description |
|------|------|-------------|
| `display_name` | string (create: required, 1-255 chars) | |
| `metadata` | optional map[string] (≤16 pairs) | Update: patch semantics (`null` deletes a key) |

Vault (response): `{id, display_name, metadata, archived_at, created_at, updated_at, type:"vault"}`. Delete returns `{id, type:"vault_deleted"}`. List query: `include_archived?`, `limit` (default 20, max 100), `page`.

### Credential — `auth` union (create/update body, discriminated by `type`)

| Type | Create fields | Update fields | Immutable |
|------|--------------|----------------|-----------|
| `mcp_oauth` | `access_token`, `mcp_server_url`, `expires_at?`, `refresh?:{client_id, refresh_token, token_endpoint, token_endpoint_auth, resource?, scope?}` | `access_token?`, `expires_at?`, `refresh?:{refresh_token?, scope?, token_endpoint_auth?}` | `mcp_server_url` |
| `static_bearer` | `token`, `mcp_server_url` | `token?` | `mcp_server_url` |
| `environment_variable` | `secret_name`, `secret_value`, `networking`, `injection_location?:{body?, header?}` | `secret_value?`, `networking?` (full replacement), `injection_location?` | `secret_name` |

- `token_endpoint_auth`: `{type:"none"}` \| `{type:"client_secret_basic", client_secret}` \| `{type:"client_secret_post", client_secret}`
- `networking` (for `environment_variable`): `{type:"unrestricted"}` (substituted on any host the session's Environment network policy permits) \| `{type:"limited", allowed_hosts}` (bare hostname / IPv4 / `*.`-wildcard, ≤16 entries; no URLs/ports/paths/IPv6)
- Top-level: `display_name?` (≤255 chars), `metadata?` (patch semantics)

### Credential (response, `BetaManagedAgentsCredential`)

| Name | Type | Description |
|------|------|-------------|
| `id` (`vcrd_...`), `type:"vault_credential"` | string | |
| `auth` | Response variant of the union above — secret values (`access_token`, `token`, `secret_value`, `client_secret`, `refresh_token`) are **never returned**; only non-sensitive fields (`mcp_server_url`, `expires_at`, `secret_name`, `injection_location`, `networking`, endpoint-auth `type`) come back |
| `vault_id`, `display_name?`, `metadata`, `archived_at`, `created_at`, `updated_at` | | |

Delete returns `{id, type:"vault_credential_deleted"}`. List query: `include_archived?`, `limit` (default 20, max 100), `page`.

### Validate Credential (`POST .../mcp_oauth_validate`)

No body. Live-probes the credential against its configured MCP server (`initialize`/`tools/list`) and, if a refresh token is configured, attempts a token refresh.

| Name | Type | Description |
|------|------|-------------|
| `status` | `"valid"\|"invalid"\|"unknown"` | Overall verdict |
| `has_refresh_token` | boolean | |
| `mcp_probe` | `{method, http_response:{status_code, content_type, body, body_truncated}}` | The failing probe step; `body` is truncated/scrubbed of sensitive values |
| `refresh` | `{status:"succeeded"\|"failed"\|"connect_error"\|"no_refresh_token", http_response}` | Refresh-token exchange outcome |
| `credential_id`, `vault_id`, `validated_at`, `type:"vault_credential_validation"` | | |

## Notes

- All vault/credential endpoints use `anthropic-beta: managed-agents-2026-04-01` (same as sessions/environments — distinct from memory-stores' `agent-memory-2026-07-22`).
- Secrets are write-only: create/update accept them, but no read path (retrieve, list, or even update's response) ever echoes back `secret_value`, `access_token`, `token`, `refresh_token`, or `client_secret`.
- `mcp_oauth_validate` is applicable only to `mcp_oauth`-type credentials.

## Related

- [sessions.md](./sessions.md) — `vault_ids` on session create makes the vault's credentials available to the agent during the session
