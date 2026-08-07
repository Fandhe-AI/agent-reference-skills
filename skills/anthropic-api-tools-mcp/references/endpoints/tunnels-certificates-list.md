<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/certificates/list / last verified: 2026-08-07 -->

# List Tunnel Certificates

Lists the certificates registered on a tunnel. Archived certificates are excluded unless `include_archived` is set.

## Signature / Usage

```http
GET /v1/tunnels/{tunnel_id}/certificates
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/certificates \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `include_archived` (query) | optional boolean | Include archived certificates. Defaults to false. |
| `limit` (query) | optional number | Max results per page. Default 20, max 1000. |
| `page` (query) | optional string | Opaque pagination cursor from a previous response. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `BetaTunnelCertificate` | Certificates, ordered by `created_at` descending. |
| `next_page` | string | Pagination cursor for the next page, or null if no more results. |

## Notes

- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [Create Tunnel Certificate](./tunnels-certificates-create.md)
- [Get Tunnel Certificate](./tunnels-certificates-retrieve.md)
