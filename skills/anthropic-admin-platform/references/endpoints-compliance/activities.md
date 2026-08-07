<!-- source: https://platform.claude.com/docs/en/api/compliance/activities/list, https://platform.claude.com/docs/en/manage-claude/compliance-api, https://platform.claude.com/docs/en/manage-claude/compliance-api-access / last verified: 2026-08-07 -->

# Activities Compliance API

Organization-wide Activity Feed: a paginated, filterable stream of compliance events (chat/project/file/artifact/admin actions, auth events, etc.) for the authenticated tenant.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/activities` | List compliance activities for the tenant (parent org or standalone org), filterable by type, actor, org, and time range |

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/activities?limit=10&order=desc&organization_ids=org_12345" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `activity_types[]` | array\<string\> | Filter by activity type (400+ types, e.g. `admin_api_key_created`, `claude_chat_created`, `org_user_invite_sent`). Cannot combine with `exclude_activity_types[]` |
| `exclude_activity_types[]` | array\<string\> | Exclude activity types. Cannot combine with `activity_types[]` |
| `actor_ids[]` | array\<string\> | Filter by actor (`user_...` IDs only). Enumerate via `GET /v1/compliance/organizations/{org_uuid}/users` |
| `user_ids[]` | array\<string\> | Alias for `actor_ids[]`; merged if both provided |
| `organization_ids[]` | array\<string\> | Filter by org ID (`org_...` or UUID). Enumerate via `GET /v1/compliance/organizations` |
| `created_at.gt` / `gte` / `lt` / `lte` | string (RFC 3339) | Filter by creation timestamp |
| `after_id` / `before_id` | string | Pagination cursors (`last_id`/`first_id` from previous response) |
| `limit` | number | Max results (default 100, max 5000) |
| `order` | `"desc"` \| `"asc"` | Sort by `created_at`; `desc` (default) newest-first, `asc` for incremental sync |
| `x-api-key` | header, string | API key |
| **Response** `data[]` | array\<Activity\> | Each record's `type` field identifies the activity and which extra fields are present |
| `data[].id` | string | Unique activity ID, e.g. `activity_abcd1234` |
| `data[].type` | string | Activity type |
| `data[].created_at` | string | Timestamp |
| `data[].organization_id` / `organization_uuid` | string | Associated organization (UUID null for non-org-tied activities) |
| `data[].actor` | object | Discriminated union: `UserActor`, `APIActor`, `UnauthenticatedUserActor`, `AnthropicActor`, `SystemActor`, `AdminAPIKeyActor`, `ServiceAccountActor`, `ScimDirectorySyncActor`, `FederatedIdentityActor` |
| `has_more` / `first_id` / `last_id` | boolean / string | Pagination metadata |

## Notes

- Any key with the `read:compliance_activities` scope can call this endpoint — both Compliance Access Keys and Admin API keys carrying that scope work (Admin API keys are Activity-Feed-only).
- Base URL for all Compliance API calls is `https://api.anthropic.com`; auth header is `x-api-key` (Bearer-style `Authorization: Bearer $KEY` also accepted per examples in this section).
- Rate limit: 600 requests/minute per parent organization (per organization for standalone Claude Console orgs).
- To audit a leaked key, filter `activity_types[]=compliance_api_accessed` and inspect `actor.api_key_id`.

## Related

- [apps-chats.md](./apps-chats.md), [apps-projects.md](./apps-projects.md), [code.md](./code.md), [groups.md](./groups.md), [organizations.md](./organizations.md) — Compliance Access Key required for these; Activity Feed accepts Admin API keys too
