<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-spend-limits.md / last verified: 2026-11-14 -->

# Claude apps gateway spend limits

Per-developer, per-group, or org-wide caps on gateway-forwarded spend by day/week/month, enforced live on every `/v1/messages` request via an Admin API compatible with Anthropic's public Admin API spend-limits endpoints.

## Signature / Usage

```bash
# Org-wide default: $500/month per developer
curl -sS https://claude-gateway.internal.example.com/v1/organizations/spend_limits \
  -H "x-api-key: $GATEWAY_ADMIN_WRITE_KEY" -H "Content-Type: application/json" \
  -d '{"scope": {"type": "organization"}, "amount": "50000", "period": "monthly"}'

# Tighter cap on a group: $100/day for "contractors"
curl -sS https://claude-gateway.internal.example.com/v1/organizations/spend_limits \
  -H "x-api-key: $GATEWAY_ADMIN_WRITE_KEY" -H "Content-Type: application/json" \
  -d '{"scope": {"type": "rbac_group", "rbac_group_id": "contractors"}, "amount": "10000", "period": "daily"}'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `scope.type` | `user` \| `rbac_group` \| `organization` | Target a developer by OIDC `sub`, an IdP group, or the org-wide default |
| `amount` | string (USD cents) or `null` | `null` = unlimited, `"0"` = zero cap (blocks every request) |
| `period` | `daily` \| `weekly` \| `monthly` | One cap per period per scope; blocked if over any |
| `GET /v1/organizations/spend_limits/effective` | endpoint | Resolved cap + period-to-date spend per principal |
| `GET /v1/organizations/spend_limits/audit` | endpoint | Admin mutation trail, newest-first |
| `admin.group_limit_mode` | config | `min` (default, most restrictive wins) or `max` |
| `enforcement.fail_closed_on_error` | config | Default `false` (fail open on Postgres outage); `true` returns `429 billing_error` with `spend limit unavailable`. Requires an `admin:` block |
| `admin.blocked_message` | config | Appended verbatim to the `429 billing_error` a blocked developer sees |
| `admin.pooled_conflict_rule` / `admin.pooled_priority_order` | config | `default_order` (largest limit first) or `priority_list` (up to 50 group names); v2.1.319+ on the gateway server |
| `pooled_budget` | request body field | `{"amount": "500000"}` added to the request that sets a group's monthly cap: one monthly limit the whole group spends against |
| `x-api-key` / `admin.write_keys` / `admin.read_keys` / `admin.admin_groups` | auth | API keys (`id` shows as `admin-key:<id>` in the audit log; write = full access, read = `GET` only) or a gateway bearer token whose `groups` claim includes an `admin_groups` entry (audits as `oidc:<sub>`) |
| `pricing.multiplier` / `pricing.overrides` | config | Contracted rates for the spend meter; `overrides` rows need v2.1.227+, `multiplier` above 1 (markup, up to 10) needs v2.1.271+ |

## Notes

- Effective cap resolves as: per-user override > most/least restrictive of group caps (per `group_limit_mode`) > org default > unlimited. Group/org caps are per-seat defaults, not a shared pool.
- Caps reset on UTC calendar boundaries (daily 00:00 UTC, weekly Monday, monthly the first). `/v1/messages/count_tokens` is exempt from spend checks (token counting is free).
- A developer over any cap gets `429` with `error.type: billing_error`, header `x-should-retry: false`, and a `retry-after` header; for a cap above `"0"` the message gives the UTC reset date (message wording changed in v2.1.319 and v2.1.225). The `/protocol` reference lists the exact headers and body on v2.1.227+.
- Rate order for the meter: matching `pricing.overrides` row, then list price for the upstream model ID, then list price for the mapped `models[].id` (v2.1.218+, for IDs such as Amazon Bedrock application-inference-profile ARNs or Microsoft Foundry deployment names), then the unknown-model tier of $5/$25 per million input/output tokens (never free). The result is multiplied by `pricing.multiplier`. Amounts are USD estimates, not an invoice.
- Claude Haiku 5.5 prompts over a token threshold are priced whole at the higher long-prompt rate on a gateway server v2.1.293+; an overriding `pricing.overrides` row applies at any prompt length. Client aborts are billed at a floor estimate of about four characters per output token.
- Postgres pre-check has a two-second timeout and fails open by default; `store.readiness_grace_seconds` keeps replicas ready through a short outage.
- Developer-side display: usage warnings at 75% and 95% (v2.1.225+ on both ends); a **Spend limit** bar in `/usage` and `rate_limits.spend_limit` in the status line input (developer v2.1.251+); dollar amounts (v2.1.284+ on both ends); spend under **Spend (UTC)** when no cap applies on a gateway with an `admin:` block (v2.1.319+ on both ends). Dollar amounts are fetched even with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` set (before v2.1.295 they were skipped).
- Admin API conventions mirror Anthropic's Admin API (`spl_` IDs, USD cents as strings, error envelope, `request-id` header). `/effective` accepts `user_ids[]`, `period[]`, `sort=spend_desc` (needs exactly one `period[]`), `q`, `limit` (1-1000, default 20), `page`; `q=` and `user_ids[]=` appear in proxy access logs. `/audit` pages by `after_id` (default limit 100). Only spend-limits endpoints are served.
- Retention: `spend` 13 months (`admin.spend_retention_months`), `admin_audit` 365 days (`admin.audit_retention_days`), `principal_emails` (PII: email/name/groups) 90 days since last activity (`admin.identity_retention_days`), `spend_limits` until deleted. For immediate erasure (offboarding, DSAR) run `DELETE FROM principal_emails WHERE principal = '<sub>'` against the gateway database.
- Source: https://code.claude.com/docs/en/claude-apps-gateway-spend-limits.md, fetched 2026-11-14

## Related

- [claude-apps-gateway.md](./claude-apps-gateway.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
