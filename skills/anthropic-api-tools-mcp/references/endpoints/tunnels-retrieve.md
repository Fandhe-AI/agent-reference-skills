<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/retrieve / last verified: 2026-11-14 -->

# Get Tunnel

Fetches a tunnel by ID.

## Signature / Usage

```http
GET /v1/tunnels/{tunnel_id}
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID \
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
| `archived_at` | string | RFC 3339 timestamp, or null if not archived. |
| `created_at` | string | RFC 3339 timestamp. |
| `display_name` | string | Human-readable name. Null if unset. |
| `domain` | string | Anthropic-assigned hostname routed through the tunnel. |
| `type` | `"tunnel"` | Object type. |

## Notes

- Source: https://platform.claude.com/docs/en/api/beta/tunnels/retrieve (fetched 2026-11-14)
- Official example (2026-11-14) uses `anthropic-version: 2026-10-21` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the MCP tunnels reference page says all tunnel endpoints need a bearer token with the `workspace:manage_tunnels` scope obtained via Workload Identity Federation (Admin API keys not accepted), so use a WIF-exchanged token in practice.
- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [List Tunnels](./tunnels-list.md)
- [Archive Tunnel](./tunnels-archive.md)
