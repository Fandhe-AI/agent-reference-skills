<!-- source: https://platform.claude.com/docs/en/api/admin/mcp_tunnels, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/list, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/retrieve, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/archive, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/reveal_token, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/rotate_token, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/create, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/list, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/retrieve, https://platform.claude.com/docs/en/api/admin/mcp_tunnels/tunnel_certificates/archive / last verified: 2026-08-07 -->

# MCP Tunnels Admin API (deprecated predecessor)

Org-scoped `/v1/organizations/tunnels` endpoints that predate the Claude API's `/v1/tunnels` surface documented in [Get Tunnel](./tunnels-retrieve.md), [List Tunnels](./tunnels-list.md), and related pages in this category. **Deprecated**, remains available during a migration window.

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
| anthropic-beta | array of `"mcp-tunnels-2026-05-19"` | Required beta header for this deprecated surface |

### Query Parameters (List Tunnels)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Include archived tunnels in the results |
| limit | optional number | Maximum number of tunnels to return in a single page |
| page | optional string | Opaque pagination cursor from a previous response's `next_page` |
| workspace_id | optional string | Filter to a `wrkspc_`-prefixed Workspace |

### Query Parameters (List Tunnel Certificates)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Include archived certificates in the results |
| limit | optional number | Maximum number of certificates to return |
| page | optional string | A tunnel has at most two active certificates, so this list is not paginated |

### Tunnel object

| Name | Type | Description |
|------|------|-------------|
| id | string | `tnl_...` ID |
| archived_at | string | RFC 3339 timestamp, or null if not archived |
| created_at | string | RFC 3339 timestamp |
| display_name | string | 1-255 chars, or null if unset |
| domain | string | Anthropic-assigned hostname; globally unique, never reused |
| type | `"tunnel"` | Object type |
| workspace_id | string | Owning Workspace, or null for the default Workspace. Immutable after creation |

### Reveal/Rotate Token

Body (Rotate only): `reason` (optional string, free-text audit note).

Returns: `{ id, tunnel_token, type: "tunnel_token" }`. `id` is a stable identifier for the current token value and changes on rotation; established connections are not severed by rotation.

### Tunnel Certificates

Body (Create): `ca_certificate_pem` (string, PEM-encoded, exactly one X.509 certificate, no private-key material). A tunnel holds at most two non-archived certificates.

TunnelCertificate object: `{ id, archived_at, created_at, expires_at, fingerprint (SHA-256 hex), tunnel_id, type: "tunnel_certificate" }`.

## Notes

- Superseded by `/v1/tunnels` on the Claude API (this category's `tunnels-*.md` pages). Migration deltas: path `/v1/organizations/tunnels` → `/v1/tunnels`; beta header `mcp-tunnels-2026-05-19` → `mcp-tunnels-2026-06-22`; WIF token scope `org:manage_tunnels` → `workspace:manage_tunnels`. Existing integrations continue to work with the old header/scope during the migration window; new integrations should target the new endpoint.
- The admin Tunnel object carries `workspace_id` (7 fields); the new `BetaTunnel` returned by `/v1/tunnels` does not include it (6 fields) — see [Get Tunnel](./tunnels-retrieve.md).
- There is no admin `Create Tunnel` endpoint under `/v1/organizations/tunnels`; tunnel creation is only available on the new `/v1/tunnels` surface (see [Create Tunnel](./tunnels-create.md)).
- Archiving a Tunnel is irreversible: it archives every non-archived certificate in the same operation, retires the hostname permanently (never re-allocated), and invalidates the tunnel token. Retrying against an already-archived tunnel returns the existing record unchanged.
- Archiving the last non-archived certificate is permitted but leaves the tunnel unable to serve MCP traffic until a new certificate is added.
- Overlapping resource-level coverage of this same deprecated surface exists in the `anthropic-admin-platform` skill (`references/endpoints-admin/mcp-tunnels.md`); this page frames the same endpoints from the migration/predecessor angle for readers of the `/v1/tunnels` pages in this category.

## Related

- [Get Tunnel](./tunnels-retrieve.md)
- [List Tunnels](./tunnels-list.md)
- [Create Tunnel Certificate](./tunnels-certificates-create.md)
