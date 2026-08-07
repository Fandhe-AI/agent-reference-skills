<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/certificates/create / last verified: 2026-08-07 -->

# Create Tunnel Certificate

Registers a public CA certificate on a tunnel. Anthropic verifies the gateway's server certificate against this CA when it terminates the inner TLS session. A tunnel holds at most two non-archived certificates.

## Signature / Usage

```http
POST /v1/tunnels/{tunnel_id}/certificates
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/certificates \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "ca_certificate_pem": "ca_certificate_pem"
        }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `ca_certificate_pem` (body) | string | PEM-encoded X.509 CA certificate. Must contain exactly one certificate and no private-key material. Max 8KB. |
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
- A tunnel accepts at most two non-archived certificates at a time.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [List Tunnel Certificates](./tunnels-certificates-list.md)
- [Archive Tunnel Certificate](./tunnels-certificates-archive.md)
