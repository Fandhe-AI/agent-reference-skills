<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/rotate_token / last verified: 2026-11-14 -->

# Rotate Tunnel Token

Rotates a tunnel's connector token. Rotation invalidates the current token for new connections and returns a fresh value; established connections are not severed. A connector restarted after rotation must use the new value.

## Signature / Usage

```http
POST /v1/tunnels/{tunnel_id}/rotate_token
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/rotate_token \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
    -d '{}'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `reason` (body) | optional string or null | Free-text reason for the rotation, recorded for audit (max 1024 characters). |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |
| `anthropic-workspace-id` (header) | optional string | Workspace ID (e.g. `wrkspc_...`) to act on; only needed for credentials that can act on more than one Workspace, and must match if the credential belongs to a specific Workspace. |

### Returns (`BetaTunnelToken`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Stable identifier for the current token value. Changes when rotated. |
| `tunnel_token` | string | The new connector token. Treat as a credential. |
| `type` | `"tunnel_token"` | Object type. |

## Notes

- Source: https://platform.claude.com/docs/en/api/beta/tunnels/rotate_token (fetched 2026-11-14)
- Official example (2026-11-14) uses `anthropic-version: 2026-10-21` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the MCP tunnels reference page says all tunnel endpoints need a bearer token with the `workspace:manage_tunnels` scope obtained via Workload Identity Federation (Admin API keys not accepted), so use a WIF-exchanged token in practice.
- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Established connections survive rotation; only new connections require the rotated token, so restart connectors after rotating.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [Reveal Tunnel Token](./tunnels-reveal_token.md)
- [Get Tunnel](./tunnels-retrieve.md)
