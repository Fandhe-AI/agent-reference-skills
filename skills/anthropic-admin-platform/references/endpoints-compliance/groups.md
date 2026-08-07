<!-- source: https://platform.claude.com/docs/en/api/compliance/groups/list, https://platform.claude.com/docs/en/api/compliance/groups/retrieve, https://platform.claude.com/docs/en/api/compliance/groups/members/list / last verified: 2026-08-07 -->

# Groups Compliance API

Read-only directory access to RBAC groups and their members across the Claude Enterprise tenant.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/groups` | List Compliance Groups |
| GET | `/v1/compliance/groups/{group_id}` | Get a single Compliance Group |
| GET | `/v1/compliance/groups/{group_id}/members` | List members of a group |

```bash
curl https://api.anthropic.com/v1/compliance/groups \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | query, number | Max results (default 500, max 1000) |
| `name_prefix` | query, string | Filter groups by name prefix (list only) |
| `page` | query, string | Opaque pagination token from `next_page` |
| `group_id` | path, string | Tagged ID, e.g. `rbac_group_abc123` |
| `x-api-key` | header, string | API key |
| **Returns (group)** `id` / `name` / `description` | string | Group identity |
| `roles[]` | array\<string\> | Role IDs assigned to this group |
| `source_type` | string | `"direct"` or `"scim"` |
| `created_at` / `updated_at` | string (ISO 8601) | Timestamps |
| **Returns (members)** `data[].user_id` | string | Member user ID |
| `data[].email` | string | Member email |
| `data[].created_at` / `updated_at` | string (ISO 8601) | Membership timestamps |
| `has_more` / `next_page` | boolean / string | Pagination |

## Notes

- Requires `read:compliance_user_data` scope (group membership is user data), while group/role metadata itself is `read:compliance_org_data` — see `read:compliance_user_data` requirement in Set up the Compliance API.

## Related

- organizations.md — organization-level roles and permissions
