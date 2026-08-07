<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-reference / last verified: 2026-08-07 -->

# WIF reference

Environment variables, validation rules, profile configuration, OAuth scopes, and error reference for Workload Identity Federation.

## Signature / Usage

```json configs/production.json
{
  "version": "1.0",
  "authentication": {
    "type": "oidc_federation",
    "federation_rule_id": "fdrl_...",
    "service_account_id": "svac_...",
    "identity_token": { "source": "file", "path": "/var/run/secrets/anthropic.com/token" }
  },
  "organization_id": "00000000-0000-0000-0000-000000000000",
  "workspace_id": "wrkspc_...",
  "base_url": "https://api.anthropic.com"
}
```

## Options / Props

| Env variable | Required | Description |
|--------------|----------|--------------|
| `ANTHROPIC_FEDERATION_RULE_ID` | Yes | `fdrl_...` rule to evaluate |
| `ANTHROPIC_ORGANIZATION_ID` | Yes | Org UUID |
| `ANTHROPIC_IDENTITY_TOKEN_FILE` / `ANTHROPIC_IDENTITY_TOKEN` | One of | Path to, or literal value of, the IdP JWT |
| `ANTHROPIC_SERVICE_ACCOUNT_ID` | Yes | `svac_...` target service account |
| `ANTHROPIC_WORKSPACE_ID` | Conditional | `wrkspc_...` or `default`; required when rule covers >1 workspace |
| `ANTHROPIC_PROFILE` | No | Named profile; takes precedence over federation env vars |

| OAuth scope | Grants |
|-------------|--------|
| `workspace:developer` | All non-admin Claude API endpoints in the rule's workspace (Messages, Models, Managed Agents, Files, Skills) |
| `workspace:inference` | Messages, Models, OpenAI-compatible chat endpoint only |
| `workspace:manage_tunnels` | MCP tunnels API |
| `org:admin` | Full Admin API access, with OAuth-caller carve-outs (see wif-admin-api.md) |

## Notes

- Claude API WIF reference; distinct from OpenAI's separate WIF environment variables and error reference in `openai-platform-ops`.
- Permission boundary: effective permissions are the intersection of the rule's `oauth_scope` and the target service account's `organization_role` (`developer` or `admin`) — a rule granting `org:admin` must target a service account with `organization_role: admin`, and a `workspace:developer` rule caps an `admin`-role service account down to workspace-only Claude API access.
- Token exchange (`POST /v1/oauth/token`) request fields: `grant_type` (fixed `urn:ietf:params:oauth:grant-type:jwt-bearer`), `assertion`, `federation_rule_id`, `organization_id`, `service_account_id`, `workspace_id` (conditional). Response follows RFC 6749 §5.1: `access_token` (`sk-ant-oat01-...`), `token_type` (`Bearer`), `expires_in`, `scope`.
- Credential precedence: constructor args → `ANTHROPIC_API_KEY`/`ANTHROPIC_AUTH_TOKEN` → `ANTHROPIC_PROFILE` → federation env vars → active profile. An empty-string env var still occupies its precedence slot — unset, don't blank.
- Config dir resolution: `$ANTHROPIC_CONFIG_DIR` → `~/.config/anthropic` (Linux/macOS) → `%APPDATA%\Anthropic` (Windows). Active profile: `$ANTHROPIC_PROFILE` → `<config_dir>/active_config` → `default`. Claude Code and the Claude Agent SDK honor the same resolution order.
- Validation: names match `^[a-z0-9-]+$` (1–255 chars); `token_lifetime_seconds` 60–86400 (default 3600); issuer/JWKS URLs must be `https`, port 443, public DNS host resolving to public IPs (not required in `explicit_url`/`inline` modes, where `issuer_url` is only string-compared).
- JWT verification: max size 16 KiB; only asymmetric algorithms accepted (ES256/384/512, RS256/384/512, PS256/384/512) — HMAC and `none` rejected; `kid` required; `sub`/`iat`/`exp` required; max lifetime 1 hour by default (configurable per issuer); 30-second clock skew leeway.
- Rule matching: `subject_prefix` (exact or trailing-`*` prefix, case-sensitive), `audience` (exact match, array-aware), `claims` (map of exact string values), `condition` (CEL expression over `claims`). At least one of `subject_prefix`/`claims`/`condition` required.
- `400 invalid_grant` errors are intentionally opaque (cause logged server-side only); use the Console's authentication history page or decode-and-compare claims to debug (see troubleshooting steps in the source).
- JWKS source modes: `discovery` (default, fetches `.well-known/openid-configuration`), `explicit_url` (direct JWKS fetch), `inline` (you supply the JWK array; no outbound request, no automatic key refresh — you must update on rotation).

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-admin-api.md](./wif-admin-api.md)
