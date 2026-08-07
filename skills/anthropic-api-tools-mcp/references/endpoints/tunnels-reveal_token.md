<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/reveal_token / last verified: 2026-08-07 -->

# Reveal Tunnel Token

Reveals a tunnel's connector token. The value is fetched live on each call; Anthropic does not store it. Repeated calls return the same value until the token is rotated. Exposed as POST so the token does not appear in intermediary access logs.

## Signature / Usage

```http
POST /v1/tunnels/{tunnel_id}/reveal_token
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/reveal_token \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |

### Returns (`BetaTunnelToken`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Stable identifier for the current token value. Changes when rotated. |
| `tunnel_token` | string | The connector token used to run the tunnel. Treat as a credential. |
| `type` | `"tunnel_token"` | Object type. |

## Notes

- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- `tunnel_token` is a credential; the endpoint is POST specifically to avoid appearing in intermediary access logs.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [Rotate Tunnel Token](./tunnels-rotate_token.md)
- [Get Tunnel](./tunnels-retrieve.md)
