<!-- source: https://platform.claude.com/docs/en/api/beta/organization/spend_limits, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/list, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/set, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/delete, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/retrieve, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/effective/list, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/increase_requests/approve, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/increase_requests/deny, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/increase_requests/list, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/increase_requests/retrieve / last verified: 2026-10-16 -->

# Spend Limits Admin API

List and set spend limits (per-user overrides for Claude Enterprise; organization / workspace monthly limits for Claude Console, early access), list effective limits per member, and manage member-submitted spend limit increase requests.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/spend_limits` | List Spend Limits (beta header `spend-limit-reads-2026-09-26` required; Claude Enterprise only) |
| POST | `/v1/organizations/spend_limits` | Set Spend Limit (upsert) |
| GET | `/v1/organizations/spend_limits/{spend_limit_id}` | Get Spend Limit |
| DELETE | `/v1/organizations/spend_limits/{spend_limit_id}` | Delete Spend Limit |
| GET | `/v1/organizations/spend_limits/effective` | List Effective Spend Limits |
| GET | `/v1/organizations/spend_limit_increase_requests` | List Spend Limit Increase Requests |
| GET | `/v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}` | Get Spend Limit Increase Request |
| POST | `/v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}/approve` | Approve Increase Request |
| POST | `/v1/organizations/spend_limit_increase_requests/{spend_limit_increase_request_id}/deny` | Deny Increase Request |

```http
curl https://api.anthropic.com/v1/organizations/spend_limits \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"amount": "50000", "scope": {"type": "user", "user_id": "user_id"}, "period": "monthly"}'
```

## Options / Props

### Query Parameters (List Spend Limits)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | Default `20`, range `1`-`1000` |
| page | optional string | Opaque cursor from `next_page` |
| scope_type | optional array (max 100) of `"organization"` \| `"organization_service"` \| `"rbac_group"` \| `"seat_tier"` \| `"user"` \| `"workspace"` | Return only limits with these scope types; omit for all |

Returns `{ data: SpendLimit[], next_page }`; results are ordered by scope type `organization`, `seat_tier`, `rbac_group`, `organization_service`, `user` (fixed order within a type, not creation order).

### Body Parameters (Set Spend Limit)

| Name | Type | Description |
|------|------|-------------|
| amount | string or null | Non-negative integer decimal string, minor currency units. `null` sets an explicit no-limit override for this scope and period only |
| scope | `User { type: "user", user_id }` \| `Organization { type: "organization" }` \| `Workspace { type: "workspace", workspace_id }` | Claude Enterprise sets `user` limits (seat-tier/group/org defaults are configured in claude.ai); Claude Console sets `organization` and `workspace` limits (monthly, always carry an amount; early access preview, contact the Anthropic account team). Any other combination returns 400 |
| period | optional `"daily"` \| `"monthly"` \| `"weekly"` | Upsert keyed on (scope, period). Schema enum; the guide states only `monthly` is currently supported (treat as open set) |

### Query Parameters (List Effective)

| Name | Type | Description |
|------|------|-------------|
| limit / page | optional | Pagination, paginates by member |
| period | optional array of string | Filter |
| user_ids | optional array of string | Filter |

### SpendLimit object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID |
| amount | string or null | Minor-unit decimal string; `null` = no numeric cap at this scope |
| created_at / updated_at | string | RFC 3339 |
| currency | string | ISO 4217 code of the billing currency |
| is_enabled | boolean | Read-only. `false` when extra usage is switched off for the organization (`organization` limit); always `true` for other limits |
| period | `"daily"` \| `"monthly"` \| `"weekly"` | Period. Schema enum; the guide states only `monthly` is currently supported (treat as open set) |
| scope | discriminated union | `User { type, user_id }`, `SeatTier { seat_tier, type }`, `RbacGroup { rbac_group_id, type }`, `OrganizationService { service, type }`, `Organization { type }`, `Workspace { type, workspace_id }`, `UsageTier { type: "usage_tier" }` (read-only monthly cap Anthropic sets for a Console organization from its usage tier) |
| type | `"spend_limit"` | Object type |

### SpendSummary object (effective limits, per member/period)

| Name | Type | Description |
|------|------|-------------|
| actor | `{ deleted, email_address, name, type: "user_actor", user_id }` | `name`/`email_address` null if unavailable/deleted |
| amount / currency / period | — | Effective limit values |
| period_to_date_spend | string | Spend so far this period |
| scope | `{ type: "user", user_id }` | The member |
| source | discriminated union (same shapes as SpendLimit.scope) | Where the limit was inherited from |
| spend_limit_id | string | Underlying SpendLimit ID |

### Spend Limit Increase Requests

Query Parameters (List Increase Requests):

| Name | Type | Description |
|------|------|-------------|
| actor_ids | optional array | Filter by actor |
| limit / page | optional | Pagination |
| status | optional array of `"approved"` \| `"denied"` \| `"pending"` | Filter by status |

Body Parameters (Approve):

| Name | Type | Description |
|------|------|-------------|
| amount | string | Required |
| period | optional | Defaults to the blocked period |
| suppress_notification | optional boolean | Skip the requester email |

Body Parameters (Deny):

| Name | Type | Description |
|------|------|-------------|
| suppress_notification | optional boolean | Skip the requester email |

SpendLimitIncreaseRequest object:

| Name | Type | Description |
|------|------|-------------|
| id | string | ID |
| actor | object | Requester |
| created_at | string | Creation time |
| period | string | Period |
| resolved_at | string | Resolution time |
| resolved_by | `UserActor` \| `ScopedAPIKeyActor` | Resolver |
| spend_summary | object | Spend summary |
| status | `"approved"` \| `"denied"` \| `"pending"` | Status |
| type | `"spend_limit_increase_request"` | Object type |
| spend_limit | object | Approve response only |

## Notes

- Requires an Admin API key (`sk-ant-admin...`) — Claude Enterprise seat-tier / group / org defaults are set via claude.ai instead.
- List Spend Limits is supported for Claude Enterprise organizations only (not Claude Console) and requires `anthropic-beta: spend-limit-reads-2026-09-26`.
- Delete only removes per-user override rows; seat-tier/group/org-level rows cannot be deleted via this endpoint (falls back to inherited limit).
- Deny is idempotent when already `denied`; denying an already-`approved` request returns 400.
- Anthropic emails the requester on approve/deny unless `suppress_notification` is set.

## Related

- [workspaces.md](./workspaces.md)
- [rate-limits.md](./rate-limits.md)
- [usage-report.md](./usage-report.md)
