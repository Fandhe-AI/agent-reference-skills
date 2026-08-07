<!-- source: https://code.claude.com/docs/en/claude-apps-gateway-spend-limits.md / last verified: 2026-08-07 -->

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
| `enforcement.fail_closed_on_error` | config | Default `false` (fail open on Postgres outage); `true` blocks everyone during an outage |

## Notes

- Effective cap resolves as: per-user override > most/least restrictive of group caps (per `group_limit_mode`) > org default > unlimited. Group/org caps are per-seat defaults, not a shared pool.
- `/v1/messages/count_tokens` is exempt from spend checks (token counting is free).
- Pricing uses the same USD-list-price table the CLI uses for its own cost display; an unrecognized model ID is priced at the unknown-model tier ($5/$25 per million input/output tokens) rather than zero, so it can't bypass a cap.
- `spend` counters retain 13 months by default, `admin_audit` 365 days, `principal_emails` (PII: email/name/groups) only 90 days since last activity — delete a departed developer's row directly for immediate erasure (DSAR).

## Related

- [claude-apps-gateway.md](./claude-apps-gateway.md)
- [claude-apps-gateway-config.md](./claude-apps-gateway-config.md)
- [claude-apps-gateway-deploy.md](./claude-apps-gateway-deploy.md)
