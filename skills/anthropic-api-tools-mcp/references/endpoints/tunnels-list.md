<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/list / last verified: 2026-11-14 -->

# List Tunnels

Lists tunnels, ordered by creation time, newest first. Archived tunnels are excluded unless `include_archived` is set.

## Signature / Usage

```http
GET /v1/tunnels
```

```http
curl https://api.anthropic.com/v1/tunnels \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `include_archived` (query) | optional boolean | Include archived tunnels. Defaults to false. |
| `limit` (query) | optional number | Max results per page. Default 20, max 1000. |
| `page` (query) | optional string | Opaque pagination cursor from a previous response. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |
| `anthropic-workspace-id` (header) | optional string | Workspace ID (e.g. `wrkspc_...`) to act on; only needed for credentials that can act on more than one Workspace, and must match if the credential belongs to a specific Workspace. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `BetaTunnel` | List of tunnels, ordered by `created_at` descending. |
| `next_page` | string or null | Pagination cursor for the next page, or null if no more results. |

## Notes

- Source: https://platform.claude.com/docs/en/api/beta/tunnels/list (fetched 2026-11-14)
- Official example (2026-11-14) uses `anthropic-version: 2026-10-21` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the MCP tunnels reference page says all tunnel endpoints need a bearer token with the `workspace:manage_tunnels` scope obtained via Workload Identity Federation (Admin API keys not accepted), so use a WIF-exchanged token in practice.
- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [Create Tunnel](./tunnels-create.md)
- [Get Tunnel](./tunnels-retrieve.md)
