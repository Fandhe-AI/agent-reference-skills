<!-- source: https://platform.claude.com/docs/en/api/beta/tunnels/certificates/archive / last verified: 2026-11-14 -->

# Archive Tunnel Certificate

Archives a tunnel certificate, removing it from the set Anthropic trusts for the tunnel. The certificate record is retained. Archiving the last non-archived certificate is permitted; the tunnel rejects MCP traffic until a new certificate is added.

## Signature / Usage

```http
POST /v1/tunnels/{tunnel_id}/certificates/{certificate_id}/archive
```

```http
curl https://api.anthropic.com/v1/tunnels/$TUNNEL_ID/certificates/$CERTIFICATE_ID/archive \
    -X POST \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: mcp-tunnels-2026-06-22' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tunnel_id` (path) | string | Identifier of the tunnel. |
| `certificate_id` (path) | string | Identifier of the certificate. |
| `anthropic-beta` (header) | optional array of AnthropicBeta | Requires `mcp-tunnels-2026-06-22` for this endpoint. |
| `anthropic-workspace-id` (header) | optional string | Workspace ID (e.g. `wrkspc_...`) to act on; only needed for credentials that can act on more than one Workspace, and must match if the credential belongs to a specific Workspace. |

### Returns (`BetaTunnelCertificate`)

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier, prefixed with `tcrt_`. |
| `archived_at` | string | RFC 3339 timestamp of archival. |
| `created_at` | string | RFC 3339 timestamp. |
| `expires_at` | string or null | RFC 3339 timestamp of certificate expiry, or null if it does not expire. |
| `fingerprint` | string | Lowercase hex SHA-256 fingerprint of the certificate's DER encoding. |
| `tunnel_id` | string | ID of the tunnel the certificate is registered against. |
| `type` | `"tunnel_certificate"` | Object type. |

## Notes

- Source: https://platform.claude.com/docs/en/api/beta/tunnels/certificates/archive (fetched 2026-11-14)
- Official example (2026-11-14) uses `anthropic-version: 2026-10-21` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the MCP tunnels reference page says all tunnel endpoints need a bearer token with the `workspace:manage_tunnels` scope obtained via Workload Identity Federation (Admin API keys not accepted), so use a WIF-exchanged token in practice.
- Beta / research preview: requires the `anthropic-beta: mcp-tunnels-2026-06-22` header and may change without a deprecation period.
- Archiving the tunnel's last non-archived certificate is allowed but leaves the tunnel rejecting MCP traffic until a replacement is registered.
- Supersedes the Admin API endpoints at `/v1/organizations/tunnels`, which remain available during a migration window.

## Related

- [List Tunnel Certificates](./tunnels-certificates-list.md)
- [Archive Tunnel](./tunnels-archive.md)
