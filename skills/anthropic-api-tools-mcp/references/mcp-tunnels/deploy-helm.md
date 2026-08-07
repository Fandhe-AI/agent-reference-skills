<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-helm / last verified: 2026-08-07 -->

# Deploy MCP tunnels with Helm

Install the tunnel stack as a single Kubernetes Deployment using the Anthropic Helm chart, with or without programmatic access.

## Signature / Usage

```bash
helm install mcp-tunnel \
  oci://us-docker.pkg.dev/anthropic-public-registry/charts/mcp-tunnel \
  --version 2.0.2 \
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

- WIF federation rule subject must be `system:serviceaccount:<namespace>:<release>-setup`; audience defaults to `api.anthropic.com` (no scheme) — must match the rule byte-for-byte.
- With programmatic access, a daily CronJob (`<release>-cert-renew`) renews the server cert automatically (no-op unless within `serverCert.renewBefore`, default 30 days); renewal makes no API calls.
- Chart 2.0.0 moved `api.wif.tunnelId` to `tunnel.id`, and the WIF scope from `org:manage_tunnels` to `workspace:manage_tunnels` — update `values.yaml` before upgrading from 1.x.
- Always pass `--version` to `helm upgrade`; maintain a complete `values.yaml` rather than `--reuse-values` (deep-merge can silently retain deleted routes).
- This is a Claude API MCP-tunnel Kubernetes deployment guide, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [reference.md](./reference.md)
- [troubleshooting.md](./troubleshooting.md)
