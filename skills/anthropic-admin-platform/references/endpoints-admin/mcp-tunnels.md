<!-- source: https://platform.claude.com/docs/en/api/admin/mcp_tunnels, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/list, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/retrieve, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/archive, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/reveal_token, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/rotate_token, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/create, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/list, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/retrieve, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/archive / last verified: 2026-08-07 -->

# MCP Tunnels Admin API (deprecated)

Manage MCP Tunnels (org-scoped, `/v1/organizations/tunnels`) and their CA certificates. **Deprecated** — superseded by the new Tunnels API on the Claude API surface.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/tunnels` | List Tunnels |
| GET | `/v1/organizations/tunnels/{tunnel_id}` | Get Tunnel |
| POST | `/v1/organizations/tunnels/{tunnel_id}/archive` | Archive Tunnel (irreversible) |
| POST | `/v1/organizations/tunnels/{tunnel_id}/reveal_token` | Reveal Tunnel Token |
| POST | `/v1/organizations/tunnels/{tunnel_id}/rotate_token` | Rotate Tunnel Token |
| POST | `/v1/organizations/tunnels/{tunnel_id}/certificates` | Create Tunnel Certificate |
| GET | `/v1/organizations/tunnels/{tunnel_id}/certificates` | List Tunnel Certificates |
| GET | `/v1/organizations/tunnels/{tunnel_id}/certificates/{certificate_id}` | Get Tunnel Certificate |
| POST | `/v1/organizations/tunnels/{tunnel_id}/certificates/{certificate_id}/archive` | Archive Tunnel Certificate |

```http
curl https://api.anthropic.com/v1/organizations/tunnels \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-05-19' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Header (required for all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | array of `"mcp-tunnels-2026-05-19"` | Required beta header |

### Query Parameters (List Tunnels)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Include archived tunnels |
| limit / page | optional | Pagination |
| workspace_id | optional string | Filter to a `wrkspc_`-prefixed Workspace |

### Tunnel object

| Name | Type | Description |
|------|------|-------------|
| id | string | `tnl_...` ID |
| archived_at | string | RFC 3339, or null |
| created_at | string | RFC 3339 |
| display_name | string | 1-255 chars, or null |
| domain | string | Anthropic-assigned hostname; globally unique, never reused |
| type | `"tunnel"` | Object type |
| workspace_id | string | Owning Workspace, or null for default. Immutable |

### Reveal/Rotate Token

Body (Rotate only): `reason` (optional string, audit note).

Returns: `{ id, tunnel_token, type: "tunnel_token" }`. `id` changes on rotation; established connections survive rotation until reconnect.

### Tunnel Certificates

Body (Create): `ca_certificate_pem` (string, exactly one X.509 cert, no private key). Max two non-archived certs per tunnel.

TunnelCertificate object: `{ id, archived_at, created_at, expires_at, fingerprint (SHA-256 hex), tunnel_id, type: "tunnel_certificate" }`.

## Notes

- All endpoints are deprecated in favor of `/v1/tunnels` on the Claude API (see the `anthropic-api-tools-mcp` skill or equivalent), which uses `anthropic-beta: mcp-tunnels-2026-06-22` and a WIF token carrying `workspace:manage_tunnels` scope (vs. `org:manage_tunnels` here). Existing integrations keep working with the `mcp-tunnels-2026-05-19` header during the migration window, but new integrations should target the new endpoint.
- Archiving a Tunnel is irreversible: it archives every non-archived certificate, retires the hostname permanently, and invalidates the token.
- Archiving the last non-archived certificate is allowed but leaves the tunnel unable to serve MCP traffic until a new certificate is added.

## Related

- workspaces.md
