<!-- source: https://platform.claude.com/docs/en/api/admin/workspaces, https://platform.claude.com/docs/en/api/admin/workspaces/list, https://platform.claude.com/docs/en/api/admin/workspaces/retrieve, https://platform.claude.com/docs/en/api/admin/workspaces/create, https://platform.claude.com/docs/en/api/admin/workspaces/update, https://platform.claude.com/docs/en/api/admin/workspaces/archive, https://platform.claude.com/docs/en/api/admin/workspaces/members/create, https://platform.claude.com/docs/en/api/admin/workspaces/members/list, https://platform.claude.com/docs/en/api/admin/workspaces/members/retrieve, https://platform.claude.com/docs/en/api/admin/workspaces/members/update, https://platform.claude.com/docs/en/api/admin/workspaces/members/delete, https://platform.claude.com/docs/en/api/admin/workspaces/rate_limits/list, https://platform.claude.com/docs/en/api/admin/workspaces/service_accounts/list, https://platform.claude.com/docs/en/api/admin/workspaces/service_accounts/retrieve, https://platform.claude.com/docs/en/api/admin/workspaces/service_accounts/create, https://platform.claude.com/docs/en/api/admin/workspaces/service_accounts/update, https://platform.claude.com/docs/en/api/admin/workspaces/service_accounts/delete / last verified: 2026-08-07 -->

# Workspaces Admin API

Manage Workspaces, their Members, workspace-level rate-limit overrides, and Service Account memberships within Workspaces.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/workspaces` | List Workspaces |
| GET | `/v1/organizations/workspaces/{workspace_id}` | Get Workspace |
| POST | `/v1/organizations/workspaces` | Create Workspace |
| POST | `/v1/organizations/workspaces/{workspace_id}` | Update Workspace |
| POST | `/v1/organizations/workspaces/{workspace_id}/archive` | Archive Workspace |
| POST | `/v1/organizations/workspaces/{workspace_id}/members` | Create Workspace Member |
| GET | `/v1/organizations/workspaces/{workspace_id}/members` | List Workspace Members |
| GET | `/v1/organizations/workspaces/{workspace_id}/members/{user_id}` | Get Workspace Member |
| POST | `/v1/organizations/workspaces/{workspace_id}/members/{user_id}` | Update Workspace Member |
| DELETE | `/v1/organizations/workspaces/{workspace_id}/members/{user_id}` | Delete Workspace Member |
| GET | `/v1/organizations/workspaces/{workspace_id}/rate_limits` | List Workspace Rate Limits |
| GET | `/v1/organizations/workspaces/{workspace_id}/service_accounts` | List Service Account Workspace Members |
| GET | `/v1/organizations/workspaces/{workspace_id}/service_accounts/{service_account_id}` | Get Service Account Workspace Member |
| POST | `/v1/organizations/workspaces/{workspace_id}/service_accounts` | Create Service Account Workspace Member |
| POST | `/v1/organizations/workspaces/{workspace_id}/service_accounts/{service_account_id}` | Update Service Account Workspace Member |
| DELETE | `/v1/organizations/workspaces/{workspace_id}/service_accounts/{service_account_id}` | Delete Service Account Workspace Member |

```http
curl https://api.anthropic.com/v1/organizations/workspaces \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"name": "x"}'
```

## Options / Props

### Query Parameters (List Workspaces)

| Name | Type | Description |
|------|------|-------------|
| after_id / before_id | optional string | Pagination cursors |
| include_archived | optional boolean | Include archived Workspaces |
| limit | optional number | Default `20`, range `1`-`1000` |

### Body Parameters (Create Workspace)

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the Workspace |
| data_residency | optional object | `allowed_inference_geos` (`"global"`\|`"us"`\|`"unrestricted"`, default `"unrestricted"`), `default_inference_geo` (`"global"`\|`"us"`, default `"global"`), `workspace_geo` (`"us"`, default `"us"`, immutable after creation) |
| external_key_id | optional string | CMEK configuration ID. Requires CMEK enabled for org. Write-once once attached |
| tags | optional map[string] | User-defined key-value tags, keys may not begin with `anthropic` |

### Body Parameters (Update Workspace)

Same as Create minus `workspace_geo` (immutable); all fields optional (`name`, `data_residency.allowed_inference_geos`, `data_residency.default_inference_geo`, `external_key_id`, `tags`).

### Workspace object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the Workspace |
| archived_at | string | RFC 3339 datetime archived, or null |
| compartment_id | string | Encryption compartment identifier (for AWS CMEK key-policy conditions) |
| created_at | string | RFC 3339 datetime created |
| data_residency | object | `allowed_inference_geos`, `default_inference_geo`, `workspace_geo` |
| display_color | string | Hex color code in Console |
| external_key_id | string | CMEK configuration ID |
| name | string | Name of the Workspace |
| tags | map[string] | User-defined tags |
| type | `"workspace"` | Object type |

### Workspace Members

Path: `workspace_id`, and `user_id` for member-scoped operations.

Body Parameters (Create/Update Member):

| Name | Type | Description |
|------|------|-------------|
| user_id | string | ID of the User (Create only) |
| workspace_role | `"workspace_admin"` \| `"workspace_developer"` \| `"workspace_restricted_developer"` \| `"workspace_user"` | Role to assign. Cannot be `"workspace_billing"` on create/update |

WorkspaceMember object: `type` (`"workspace_member"`), `user_id`, `workspace_id`, `workspace_role` (adds `"workspace_billing"` as a possible read value).

Delete response: `type` (`"workspace_member_deleted"`), `user_id`, `workspace_id`.

### Workspace Rate Limits

Query Parameters (List): `group_type` (optional, `"batch"` \| `"files"` \| `"model_group"` \| `"skills"` \| `"token_count"` \| `"web_search"`), `page` (optional cursor).

Returns `data: array` of `{ group_type, limits: [{ org_limit, type, value }], models, rate_limit_id, type: "workspace_rate_limit", workspace_id }`, `next_page`. Only overridden groups/limiters are listed; non-overridden groups inherit org limits (see `rate-limits.md`).

### Service Account Workspace Members

Path: `workspace_id`, and `service_account_id` for member-scoped operations.

Body Parameters (Create/Update): `service_account_id` (Create only), `workspace_role` (`"workspace_admin"` \| `"workspace_developer"` \| `"workspace_restricted_developer"` \| `"workspace_user"`, service accounts cannot hold `"workspace_billing"`).

Returns `{ created_by_actor_id, implicit, service_account_id, type: "service_account_workspace_member", workspace_id, workspace_role }`.

Delete response: `{ service_account_id, type: "service_account_workspace_member_deleted", workspace_id }`.

## Notes

- Requires an Admin API key (`sk-ant-admin...`) for most operations, except Create/Update/Delete Service Account Workspace Member which require an OAuth bearer or Console session (Admin API keys not accepted).
- Archived workspaces return 400 for most sub-resource operations.
- Every service account has an implicit `workspace_user` membership in the default workspace; it cannot be removed, only superseded by an explicit membership.
- Deleting a service account's explicit default-workspace membership reverts it to the implicit `workspace_user` membership; removal is idempotent (returns 200 even if already removed).

## Related

- users.md
- service-accounts.md
- rate-limits.md
- spend-limits.md
