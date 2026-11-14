<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-helm / last verified: 2026-11-14 -->

# Deploy MCP tunnels with Helm

Install the tunnel stack as a single Kubernetes Deployment using the Anthropic Helm chart, with or without programmatic access.

## Signature / Usage

```bash
helm install mcp-tunnel \
  oci://us-docker.pkg.dev/anthropic-public-registry/charts/mcp-tunnel \
  --version 2.1.0 \
  --namespace mcp-tunnel --create-namespace \
  -f values.yaml
```

```yaml
# values.yaml (programmatic access excerpt)
api:
  wif:
    federationRuleId: "fdrl_..."
    organizationId: "00000000-0000-0000-0000-000000000000"
tunnel:
  id: ""            # empty = setup hook creates a tunnel
  tokenVersion: "1"
gateway:
  config:
    routes:
      docs: http://docs-mcp.internal:8080
```

## Options / Props

| Values key | Purpose |
| --- | --- |
| `api.wif.federationRuleId` / `organizationId` / `workspaceId` | WIF identifiers for the setup component |
| `tunnel.id` / `tunnel.tokenVersion` | Attach to existing tunnel / trigger token rotation |
| `gateway.config.routes` | Subdomain → upstream URL map |
| `gateway.config.upstream.allowed_ips` | SSRF allowlist override |
| `setup.enabled` | `true` = programmatic (default), `false` = manual (external Secrets) |
| `external.tunnelTokenSecretName` / `serverCertSecretName` | Manual mode Secret names (keys `tunnel-token`, `tls.crt`/`tls.key` fixed) |
| `networkPolicy.ingress.enabled` (default true) / `egress.enabled` | Restrict pod traffic |

## Notes

- Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-helm (fetched 2026-11-14)
- Chart version in the official examples is now `2.1.0` (was `2.0.2`). Always pass `--version` to `helm upgrade`.
- Audience mismatch: the chart default `api.wif.audience` is `api.anthropic.com` (no scheme) but the Console federation-rule form suggests `https://api.anthropic.com`; they must match byte-for-byte (change the rule or set `api.wif.audience`). Non-default workspace: add the rule's service account to that workspace and set `api.wif.workspaceId`.
- Token rotation with programmatic access: increment `tunnel.tokenVersion` and run `helm upgrade ... --set setup.force=true` (setup re-runs on upgrades only when forced). Manual: Rotate token in Console, update the `mcp-tunnel-token` Secret, `kubectl -n mcp-tunnel rollout restart deploy/mcp-tunnel`; the old token is invalid immediately, so update promptly.
- Manual mode (`setup.enabled: false`): no API calls, no cert-renew CronJob; `gateway.config.tunnel_domain` is required (injected from the Secret as `-tunnel-domain` when setup is enabled); create Secrets `mcp-tunnel-token` (key `tunnel-token`) and `mcp-tunnel-cert` (keys `tls.crt`, `tls.key`); renew by re-signing with the existing CA and re-applying the Secret (proxy hot-reloads).
- Cert-renew CronJob schedule `serverCert.cronSchedule` (default `0 0 * * *` UTC), uses a separate ServiceAccount that needs no federation rule. The `mcp-tunnel` Secret holds the tunnel token and TLS private keys: protect it.
- Optional: `networkPolicy.egress.mcpServers` / `cloudflaredEgressCIDRs` for egress; bring your own OIDC token via `setup.extraVolumes` / `extraVolumeMounts` + `api.wif.tokenFile` (sets `ANTHROPIC_IDENTITY_TOKEN_FILE`). The chart always sets `listen_addr`, `tls.cert_file`, `tls.key_file` (setting them in `gateway.config` has no effect). For in-cluster Service CIDRs outside private ranges, add `gateway.config.upstream.allowed_ips`.

- WIF federation rule subject must be `system:serviceaccount:<namespace>:<release>-setup`; audience defaults to `api.anthropic.com` (no scheme) — must match the rule byte-for-byte.
- With programmatic access, a daily CronJob (`<release>-cert-renew`) renews the server cert automatically (no-op unless within `serverCert.renewBefore`, default 30 days); renewal makes no API calls.
- Chart 2.0.0 moved `api.wif.tunnelId` to `tunnel.id`, and the WIF scope from `org:manage_tunnels` to `workspace:manage_tunnels` — update `values.yaml` before upgrading from 1.x.
- Always pass `--version` to `helm upgrade`; maintain a complete `values.yaml` rather than `--reuse-values` (deep-merge can silently retain deleted routes).
- This is a Claude API MCP-tunnel Kubernetes deployment guide, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [reference.md](./reference.md)
- [troubleshooting.md](./troubleshooting.md)
