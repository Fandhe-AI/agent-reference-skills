<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/archive / last verified: 2026-11-14 -->

# Archive Tunnel

Archives a tunnel. Archival is irreversible: every non-archived certificate on the tunnel is archived in the same operation, the hostname is retired and never re-allocated, and the tunnel token is invalidated. Retrying against an already-archived tunnel returns the existing record unchanged.

## Signature / Usage

```http
POST /v1/tunnels/{tunnel_id}/archive
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/archive \
    -X POST \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |
| `anthropic-workspace-id` (header) | optional string | Workspace ID (e.g. `wrkspc_...`) to act on; only needed for credentials that can act on more than one Workspace, and must match if the credential belongs to a specific Workspace. |

### Returns (`BetaTunnel`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier, prefixed with `tnl_`. |
| `archived_at` | string | RFC 3339 timestamp of archival. |
| `created_at` | string | RFC 3339 timestamp. |
| `display_name` | string | Human-readable name. Null if unset. |
| `domain` | string | Anthropic-assigned hostname. Retired, never reused. |
| `type` | `"tunnel"` | Object type. |

## Notes

- Source: https://platform.claude.com/docs/en/api/beta/tunnels/archive (fetched 2026-11-14)
- Official example (2026-11-14) uses `anthropic-version: 2026-10-21` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the MCP tunnels reference page says all tunnel endpoints need a bearer token with the `workspace:manage_tunnels` scope obtained via Workload Identity Federation (Admin API keys not accepted), so use a WIF-exchanged token in practice.
- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Irreversible: archives all non-archived certificates on the tunnel and invalidates its token.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [Get Tunnel](./tunnels-retrieve.md)
- [Archive Tunnel Certificate](./tunnels-certificates-archive.md)
