<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/reference / last verified: 2026-08-07 -->

# MCP tunnels reference

Proxy configuration fields, the Tunnels REST API, certificate requirements, and the `setup` component's subcommands and flags.

## Signature / Usage

```yaml
# /etc/mcp-gateway/config.yaml
listen_addr: ":8080"
log_level: info
tunnel_domain: abcd1234.tunnel.anthropic.com
tls:
  cert_file: /data/tls.crt
  key_file: /data/tls.key
routes:
  docs: http://docs-mcp.internal:8080
```

## Options / Props

| Proxy config field | Default |
| --- | --- |
| `listen_addr` | Required |
| `log_level` | `info` |
| `shutdown_timeout` | `30s` |
| `tunnel_domain` | Required when `routes` keys are bare subdomains |
| `tls.cert_file` / `tls.key_file` | Required |
| `routes` (flat `map[string]string`, values `scheme://host:port`, no path) | Required |
| `upstream.allowed_ips` | RFC1918 private ranges |
| `upstream.disable_ip_validation` | `false` |
| `upstream.tls.ca_file` / `include_system_cas` | None / `false` |

| Tunnels API | Detail |
| --- | --- |
| Base path | `/v1/tunnels` |
| Auth | Bearer token with `workspace:manage_tunnels` scope via WIF (Admin API keys not accepted) |
| Headers | `Authorization`, `anthropic-version: 2023-06-01`, `anthropic-beta: mcp-tunnels-2026-06-22` |

| `setup init` flag | Default |
| --- | --- |
| `--api-url` | Required |
| `--tunnel-id` | None (creates a tunnel) |
| `--output` (`dir:/path` or `k8s-secret:NAME`) | `k8s-secret:mcp-tunnel` in-cluster |
| `--cert-duration` | `2160h` (90 days) |
| `--token-version` | None |

## Notes

- Server certificate SAN must include `<route>.<tunnel-domain>` (wildcard `*.<tunnel-domain>` covers all routes); signed directly by a registered CA (no intermediates); RSA ≥2048-bit or ECDSA ≥P-256 with SHA-256+.
- CA certificate: PEM, ≤8 kB, `BasicConstraints CA:TRUE` (critical), `SubjectKeyIdentifier` present, `KeyUsage` includes `keyCertSign`; a tunnel holds up to 2 active CAs.
- The old Admin API surface (`/v1/organizations/tunnels`, beta `mcp-tunnels-2026-05-19`, scope `org:manage_tunnels`) still works during a migration window but is deprecated in favor of `/v1/tunnels`; it remains documented in the Admin API reference at `/api/beta/organization/mcp_tunnels` with a deprecation notice. To migrate, update the path to `/v1/tunnels`, the beta header to `mcp-tunnels-2026-06-22`, and the WIF token scope to `workspace:manage_tunnels`.
- For `https://` upstream routes, set at least one of `upstream.tls.ca_file` or `upstream.tls.include_system_cas`; otherwise the proxy has no trust anchor for the upstream certificate.
- `setup init` authenticates through Workload Identity Federation. It reads `ANTHROPIC_FEDERATION_RULE_ID`, `ANTHROPIC_ORGANIZATION_ID`, `ANTHROPIC_WORKSPACE_ID` (optional), and exactly one of `ANTHROPIC_IDENTITY_TOKEN_FILE` or `ANTHROPIC_IDENTITY_TOKEN`. It derives the service account from the federation rule, so `ANTHROPIC_SERVICE_ACCOUNT_ID` is not required separately. `--api-url` and `--tunnel-id` are also read from the env vars `API_URL` and `TUNNEL_ID`; a tunnel ID already stored in the output is reused on re-runs.
- `setup renew-cert` makes no API calls — it re-signs locally with the already-stored CA; `--renew-before=720h` makes it a safe no-op cron job.
- This is a Claude API MCP-tunnel reference, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [concepts.md](./concepts.md)
- [security.md](./security.md)
