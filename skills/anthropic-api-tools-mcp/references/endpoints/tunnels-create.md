<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/create / last verified: 2026-08-07 -->

# Create Tunnel

Creates a tunnel. Creation allocates a fresh hostname and provisions the tunnel; it is not idempotent. The new tunnel rejects MCP traffic until at least one CA certificate is added.

## Signature / Usage

```http
POST /v1/tunnels
```

```http
curl https://api.anthropic.com/v1/tunnels \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{}'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `display_name` (body) | optional string | Human-readable name for the tunnel (1-255 characters). |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |

### Returns (`BetaTunnel`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the tunnel, prefixed with `tnl_`. |
| `archived_at` | string | RFC 3339 timestamp, or null if not archived. |
| `created_at` | string | RFC 3339 timestamp. |
| `display_name` | string | Human-readable name (1-255 characters). Null if unset. |
| `domain` | string | Anthropic-assigned hostname. MCP server URLs whose host is a subdomain of this value are routed through the tunnel. Globally unique, never reused even after archival. |
| `type` | `"tunnel"` | Object type. |

## Notes

- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [List Tunnels](./tunnels-list.md)
- [Create Tunnel Certificate](./tunnels-certificates-create.md)
