<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-deploy.md / last verified: 2026-08-07 -->

# Claude apps gateway deployment and operations

Operational guide: identity-provider registration, container image build, Kubernetes/Cloud Run deployment, health probes, JWT secret rotation, upgrades, and the security/threat model.

## Signature / Usage

```bash
# Container command
claude gateway --config /etc/claude/gateway.yaml

# Health probes
curl https://claude-gateway.internal.example.com/healthz   # liveness
curl https://claude-gateway.internal.example.com/readyz    # readiness (verifies store reachable)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `CLAUDE_GATEWAY_LOG_LEVEL` | env | `info` (default) / `warn` / `error`; doesn't affect always-emitted audit events |
| `CLAUDE_GATEWAY_ALLOW_LOOPBACK` | env | Relaxes the SSRF guard's loopback block for local dev against a loopback IdP/collector |
| `GET /healthz` | endpoint | Liveness probe |
| `GET /readyz` | endpoint | Readiness probe; fails if Postgres unreachable |
| `GET /protocol` | endpoint | Describes accepted paths/request shapes for the running version |

## Notes

- Deploy on the private network only; a trusted gateway can push settings that run commands on developer machines.
- Image requirements: glibc-based `claude` binary (verify against release's GPG-signed `manifest.json`), writable `CLAUDE_CONFIG_DIR`, container command `claude gateway --config /etc/claude/gateway.yaml`.
- Prefer platform workload identity over static keys (IRSA on EKS, Workload Identity on GKE, managed identity on AKS) via `auth: {}` in the upstream block.
- Replicas are stateless; a rolling restart is safe anytime. Migrations are append-only, so rollback to an older binary is safe unless the config adopted a newer-only key.
- JWT secret rotation: prepend new secret to the array, roll, wait `ttl_hours` + margin, then drop the old secret. There is no per-session revocation otherwise.
- Threat model: developers hold short-lived JWTs, not raw upstream keys; outbound requests go through an SSRF guard; a compromised gateway host and a malicious OIDC provider are explicitly out of scope (customer's infra to secure).

## Related

- [claude-apps-gateway.md](./claude-apps-gateway.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-on-aws.md](./claude-apps-gateway-on-aws.md)
- [claude-apps-gateway-on-gcp.md](./claude-apps-gateway-on-gcp.md)
