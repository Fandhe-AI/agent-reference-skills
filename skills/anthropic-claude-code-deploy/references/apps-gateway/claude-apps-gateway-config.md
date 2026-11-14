<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-config.md / last verified: 2026-11-14 -->

# Claude apps gateway configuration

Full reference for `gateway.yaml`: five required sections (`listen`, `oidc`, `session`, `store`, `upstreams`) plus optional `login_notice`, `admin`, `enforcement`, `pricing`, `models` / `auto_include_builtin_models`, `managed`, `telemetry`, HTTP-tuning blocks (`access_control`, `limits`, `timeouts`, `rate_limits`), and `load_test_mode`.

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

Upstream blocks for the other providers (from the official reference):

```yaml
upstreams:
  - provider: anthropicAws
    region: us-east-1
    workspace_id: wrkspc_...
    auth:
      api_key: ${ANTHROPIC_AWS_API_KEY}   # sent as x-api-key
  - provider: vertex
    region: us-east5
    project_id: example-prod
    auth: {}                           # preferred: Application Default Credentials
  - provider: foundry
    resource: example-foundry              # https://example-foundry.services.ai.azure.com
    auth: { use_azure_ad: true }        # preferred: DefaultAzureCredential / Managed Identity
  - provider: mantle
    region: us-east-1
    models: [claude-opus-4-7, claude-haiku-4-5]   # required
    auth: {}                           # AWS default credential chain
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `listen.public_url` | required unless `host` is loopback | Externally visible `https://` origin, used to build the IdP `redirect_uri` and discovery metadata; never derived from `X-Forwarded-*`. Also required to enable telemetry |
| `listen.tls.cert` / `tls.key` | optional | PEM paths if the gateway terminates TLS itself |
| `listen.trusted_proxies` | optional | CIDRs or IPs of fronting load balancers; `X-Forwarded-For` is trusted only from these peers for per-IP rate limiting and audit |
| `oidc.issuer` / `client_id` / `client_secret` | required | OIDC discovery base and OAuth client; `client_secret` is not required with `token_endpoint_auth_method: private_key_jwt` |
| `oidc.allowed_email_domains` / `allowed_groups` / `groups_claim` | optional | Restrict sign-in and map group claims (Entra emits `roles`, not `groups`; accepts a flat key or RFC 6901 JSON Pointer) |
| `oidc.google_groups` | optional | Looks up Google Workspace groups via Admin SDK Directory API (`service_account_json_path`, `admin_email`) |
| `oidc.email_claim` / `scopes` / `scope_on_refresh` / `extra_auth_params` / `userinfo_fallback` / `use_pkce` / `clock_skew_seconds` | optional | IdP-specific tuning; `scope_on_refresh` needs v2.1.260+; `scopes` defaults to `[openid, profile, email, offline_access]` |
| `oidc.token_endpoint_auth_method` / `client_assertion` | optional | `client_secret_basic`, `client_secret_post`, or `private_key_jwt` (certificate client authentication with `private_key_pem` + `certificate_pem`; v2.1.284+) |
| `oidc.id_token_signed_response_alg` / `additional_authorized_parties` / `discovery_url` / `form_action_origins` / `ca_cert_pem` | optional | Signing algorithm (default `RS256`), extra `azp` values, discovery override, CSP `form-action` origins, IdP-only CA PEM contents |
| `oidc.use_proxy` | optional | Send IdP requests through `HTTPS_PROXY` / `HTTP_PROXY` (v2.1.227+); env `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` enables proxy-only egress (v2.1.277+) |
| `session.jwt_secret` | required | At least 32 bytes of entropy; accepts an array for rotation (index 0 signs, all entries verify) |
| `session.ttl_hours` | optional | Bearer token lifetime, default `1`; raise to `8` or `12` if the IdP cannot issue refresh tokens |
| `store.postgres_url` | required | `postgres://` or `postgresql://` URL with one host; the gateway runs its own migrations at boot (role needs create/alter rights) |
| `store.username` / `password` / `max_connections` / `connect_timeout_seconds` / `readiness_grace_seconds` | optional | `max_connections` default 5; `connect_timeout_seconds` 1-60 default 5 (v2.1.274+); `readiness_grace_seconds` 0-3600 default 0 (v2.1.282+) |
| `upstreams[]` | required, ordered list | `provider: anthropic \| bedrock \| mantle \| anthropicAws \| vertex \| foundry`; first upstream that resolves the model is used; failover on `5xx`/`429`/`401`/`403`/`404`/timeout (and `501`); repeated providers need a distinct `name:` |
| `upstreams[].groups` | optional | Only developers in these IdP groups reach that upstream (v2.1.314+); put open upstreams last; developer in no listed group when all upstreams have `groups` gets a `400` |
| `upstreams[].headers` | optional | Static headers on upstream requests (v2.1.277+); reserved names (`authorization`, `x-api-key`, `host`, `content-type`, `user-agent`, `anthropic-*`, `x-goog-*`, `x-amz-*`, `x-amzn-*`) fail boot |
| `upstreams[].forward_user_identity` | optional | Only on a `provider: anthropic` upstream whose `base_url` is a proxy you run (v2.1.233+); adds `x-claude-gateway-user-id`, `x-claude-gateway-user-email`, `x-litellm-end-user-id` |
| `upstreams[].guardrail` / `guardrail_trace` / `assume_role` | optional (`bedrock`) | Bedrock guardrail `{id, version, input_tagging}` (v2.1.281+; `input_tagging` v2.1.316+, `guardrail_trace` v2.1.314+); `assume_role` `{role_arn, external_id, session_name: email \| sub}` for cross-account access and per-developer AWS cost attribution (v2.1.281+; also on `mantle` from v2.1.318+) |
| `admin.write_keys` / `read_keys` / `admin_groups` / `blocked_message` / `group_limit_mode` | optional | Enables `/v1/organizations/spend_limits` admin API (see spend-limits page) |
| `enforcement.fail_closed_on_error` | optional | Spend enforcement fail-open (default) vs fail-closed; requires an `admin:` block |
| `pricing.multiplier` / `overrides` | optional | Contracted-rate metering (v2.1.227+); requires `admin:` or (v2.1.268+) a `managed:` block; rates also reach clients as `modelPricing` |
| `models[]` / `auto_include_builtin_models` | optional | Admin-curated model catalog served at `/v1/models`; required for non-US Bedrock regions, provisioned-throughput ARNs, Foundry deployment names; `upstream_model` keys must match upstream `name` |
| `managed.policies[]` | optional | Role-based policies matched on `groups` and/or `email_domain`; first match wins merged onto the `match: {}` catch-all; `policy_mode: layered` applies every match (v2.1.316+) |
| `managed.policies[].code` / `cli` / `desktop` | optional | Claude Code settings (`code` recommended, needs v2.1.296+; `cli` legacy; `settings` is an alias; do not mix); `desktop` block opts a policy in to Claude Desktop (`/user/bootstrap`, v2.1.203+) |
| `telemetry.forward_to[]` | optional | OTLP/HTTP fan-out destinations (`https://` only, loopback exception); each opts into `metrics`/`logs`/`traces` independently (default: metrics only) |
| `telemetry.resource_attributes` | optional | Fixed OpenTelemetry resource labels on session telemetry (v2.1.281+) |
| `login_notice` | optional | Text up to 500 characters shown at sign-in (v2.1.319+) |
| `access_control` / `limits` / `timeouts` / `rate_limits` | optional | `allow_cidrs` / `deny_cidrs`; `max_request_bytes` (32 MiB); `upstream_ttfb_ms` (120000); device-flow per-IP limits (30 / 600 and 10 / 600) |
| `load_test_mode` | optional | `{enabled, reply_tokens, reply_seconds}` canned replies without calling a provider (v2.1.282+); never on a developer-facing gateway |

## Notes

- Unknown top-level keys fail boot with a named error; every option is schema-validated at startup. A gateway older than the version noted for a key refuses to start when it finds that key, so upgrade every replica before adding it.
- Secrets are never written literally in YAML; use `${VAR}` (env, fails boot if undefined) or `${file:/path}` (trimmed file contents, must be the whole field value) expansion.
- Provider specifics: `bedrock` needs `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, and `bedrock:CountTokens` on inference-profile and foundation-model ARNs; `anthropicAws` (v2.1.198+) needs `region` and `workspace_id` and uses first-party model IDs with `api_key` or SigV4 (service name `aws-external-anthropic`); `mantle` (v2.1.283+) requires a `models` list and never receives a Bedrock `guardrail` (boot refuses the mix); `vertex` accepts `region: global`; `foundry` derives its endpoint from `resource` and needs `models` entries mapping canonical IDs to deployment names.
- `managed.policies[].cli` / `code` is validated against the CLI's settings schema at boot; `mcpServers` is rejected, use `managedMcpServers` (v2.1.259+, `http` and `sse` only). Settings that run commands or change endpoints (`hooks`, proxy/base-URL `env`, `apiKeyHelper`, `statusLine`, `OTEL_EXPORTER_OTLP_ENDPOINT`) trigger the client security approval dialog.
- `availableModels` is enforced server-side at `/v1/messages` (`400` for denied models); set `enforceAvailableModels: true` so the Default model resolves inside the list. With `auto_include_builtin_models: false`, add a `claude-fable-5` entry to allow the `fable` alias.
- `promptCacheTtl: 1h` / `subagentPromptCacheTtl: 1h` (v2.1.242+) in a policy request the 1-hour cache TTL; set only if every upstream accepts it. Terminal sessions use the 1M context window for Opus 4.7+, Sonnet 5+, and Fable models; `CLAUDE_CODE_AUTO_COMPACT_WINDOW` or `CLAUDE_CODE_DISABLE_1M_CONTEXT` in policy `env` override it.
- Client-side managed settings (`forceLoginMethod: "gateway"`, `forceLoginGatewayUrl`, `parentSettingsBehavior: "merge"`, optional `allowedProviders: ["gateway"]`, `gatewayInternalNetworks`) must come from a managed source on the machine, not from the gateway payload. A Windows registry policy or macOS plist replaces `managed-settings.json` rather than merging, so all keys must be in that mechanism.
- Telemetry: setting `telemetry.forward_to` with `listen.public_url` makes the gateway push `CLAUDE_CODE_ENABLE_TELEMETRY=1`, the three `OTEL_*_EXPORTER` selectors, `OTEL_EXPORTER_OTLP_ENDPOINT=<public_url>`, and `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`. A policy `env` that names a collector in `OTEL_EXPORTER_OTLP_ENDPOINT` skips the relay (v2.1.265+ on clients). After five consecutive failed deliveries the gateway pauses a destination in 30-second stretches; there is no buffering or retry.
- The gateway keeps no user directory, so there is no SCIM endpoint; group changes take effect on the next silent refresh (bounded by `session.ttl_hours`).
- Source: https://code.claude.com/docs/en/claude-apps-gateway-config.md, fetched 2026-11-14

## Related

- [claude-apps-gateway.md](./claude-apps-gateway.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
- [claude-apps-gateway-spend-limits.md](./claude-apps-gateway-spend-limits.md)
