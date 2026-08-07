<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/certificates/retrieve / last verified: 2026-08-07 -->

# Get Tunnel Certificate

Fetches a tunnel certificate by ID.

## Signature / Usage

```http
GET /v1/tunnels/{tunnel_id}/certificates/{certificate_id}
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/certificates/$CERTIFICATE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `certificate_id` (path) | string | Identifier of the certificate. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |

### Returns (`BetaTunnelCertificate`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier, prefixed with `tcrt_`. |
| `archived_at` | string | RFC 3339 timestamp, or null if not archived. |
| `created_at` | string | RFC 3339 timestamp. |
| `expires_at` | string | RFC 3339 timestamp of certificate expiry. |
| `fingerprint` | string | Lowercase hex SHA-256 fingerprint of the certificate's DER encoding. |
| `tunnel_id` | string | ID of the tunnel the certificate is registered against. |
| `type` | `"tunnel_certificate"` | Object type. |

## Notes

- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [List Tunnel Certificates](./tunnels-certificates-list.md)
- [Archive Tunnel Certificate](./tunnels-certificates-archive.md)
