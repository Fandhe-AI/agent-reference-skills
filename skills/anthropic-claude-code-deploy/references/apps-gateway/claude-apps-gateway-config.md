<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-config.md / last verified: 2026-08-07 -->

# Claude apps gateway configuration

Full reference for `gateway.yaml`: five required sections (`listen`, `oidc`, `session`, `store`, `upstreams`) plus optional `admin`, `enforcement`, `models`, `managed`, `telemetry`, and HTTP-tuning blocks.

## Signature / Usage

```yaml
listen:
  host: 0.0.0.0
  port: 8080
  public_url: https://claude-gateway.internal.example.com

oidc:
  issuer: https://login.example.com
  client_id: 0oa1example2
  client_secret: ${OIDC_CLIENT_SECRET}
  allowed_email_domains: [example.com]

session:
  jwt_secret: ${GATEWAY_JWT_SECRET}
  ttl_hours: 1

store:
  postgres_url: ${GATEWAY_POSTGRES_URL}

upstreams:
  - provider: bedrock
    region: us-east-1
    auth: {}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `listen.public_url` | required behind proxy | Externally visible `https://` origin, used to build the IdP `redirect_uri`; never derived from `X-Forwarded-*` |
| `listen.trusted_proxies` | optional | CIDRs of fronting load balancers; enables trusted `X-Forwarded-For` client-IP resolution |
| `oidc.issuer` / `client_id` / `client_secret` | required | OIDC discovery base and OAuth client |
| `oidc.allowed_email_domains` / `allowed_groups` / `groups_claim` | optional | Restrict sign-in and map group claims (Entra emits `roles`, not `groups`) |
| `oidc.google_groups` | optional | Looks up Google Workspace groups via Admin SDK Directory API (Google id_tokens carry no groups claim) |
| `session.jwt_secret` | required | ≥32 bytes entropy; accepts an array for rotation (index 0 signs, all entries verify) |
| `store.postgres_url` | required | PostgreSQL 14+; gateway runs its own migrations at boot (needs `CREATE TABLE`) |
| `upstreams[]` | required, ordered list | `provider: anthropic \| bedrock \| anthropicAws \| vertex \| foundry`; first upstream that resolves the model is used; failover on `5xx/429/401/403/404`/timeout |
| `admin.write_keys` / `read_keys` / `admin_groups` | optional | Enables `/v1/organizations/spend_limits` admin API (see spend-limits page) |
| `models[]` | optional | Admin-curated model catalog; required for non-US Bedrock regions, provisioned-throughput ARNs, Foundry deployment names |
| `managed.policies[]` | optional | Role-based managed-settings/model-access policies matched on `groups` or `email_domain`; first match wins, merged onto `match: {}` catch-all |
| `telemetry.forward_to[]` | optional | OTLP/HTTP fan-out destinations; each opts into `metrics`/`logs`/`traces` independently (default: metrics only) |

## Notes

- Unknown top-level keys fail boot with a named error; every option is schema-validated at startup.
- Secrets are never written literally in YAML; use `${VAR}` (env, fails boot if undefined) or `${file:/path}` (trimmed file contents) expansion.
- `managed.policies[].cli` is validated against the CLI's settings schema at boot; `mcpServers` inside `cli` is rejected — per-group MCP distribution isn't supported.

## Related

- [claude-apps-gateway.md](./claude-apps-gateway.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-spend-limits.md](./claude-apps-gateway-spend-limits.md)
