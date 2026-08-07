<!-- source: https://platform.claude.com/docs/en/api/admin/rbac_groups, https://platform.claude.com/docs/en/api/admin/rbac_groups/create, https://platform.claude.com/docs/en/api/admin/rbac_groups/list, https://platform.claude.com/docs/en/api/admin/rbac_groups/retrieve, https://platform.claude.com/docs/en/api/admin/rbac_groups/update, https://platform.claude.com/docs/en/api/admin/rbac_groups/delete, https://platform.claude.com/docs/en/api/admin/rbac_groups/members/create, https://platform.claude.com/docs/en/api/admin/rbac_groups/members/list, https://platform.claude.com/docs/en/api/admin/rbac_groups/members/delete / last verified: 2026-08-07 -->

# RBAC Groups Admin API

Manage RBAC Groups and their membership. Beta, Claude Enterprise only. See also `rbac-roles.md` for the roles/permissions attached to groups.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/rbac_groups` | Create RBAC Group |
| GET | `/v1/organizations/rbac_groups` | List RBAC Groups |
| GET | `/v1/organizations/rbac_groups/{group_id}` | Get RBAC Group |
| POST | `/v1/organizations/rbac_groups/{group_id}` | Update RBAC Group |
| DELETE | `/v1/organizations/rbac_groups/{group_id}` | Delete RBAC Group |
| POST | `/v1/organizations/rbac_groups/{group_id}/members` | Add RBAC Group Member |
| GET | `/v1/organizations/rbac_groups/{group_id}/members` | List RBAC Group Members |
| DELETE | `/v1/organizations/rbac_groups/{group_id}/members/{user_id}` | Remove RBAC Group Member |

```http
curl https://api.anthropic.com/v1/organizations/rbac_groups \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"name": "Engineering"}'
```

## Options / Props

### Header (required)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | `ce-user-management-2026-07-13` | Required for all RBAC Groups endpoints |

### Body Parameters

| Name | Type | Description |
|------|------|-------------|
| name | string (Create) / optional string (Update) | Group name, not uniqueness-enforced |
| user_id | string (Add Member) | ID of the User to add |

### Query Parameters (List / List Members)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | Default `20`, range `1`-`1000` |
| page | optional string | `next_page` token |

### RbacGroup object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the RBAC Group |
| created_at / updated_at | string | RFC 3339 timestamps |
| name | string | Group name |
| roles | array of string | RBAC Role IDs attached (read-only here, managed in admin settings). Null = temporarily unavailable, retry |
| source_type | `"direct"` \| `"scim"` | Created directly vs. IdP-provisioned |
| type | `"rbac_group"` | Object type |

### RbacGroupMember object

| Name | Type | Description |
|------|------|-------------|
| created_at | string | When the User was added |
| email | string | User's email |
| group_id | string | ID of the RBAC Group |
| type | `"rbac_group_member"` | Object type |
| user_id | string | ID of the User |

### Delete responses

| Name | Type | Description |
|------|------|-------------|
| id / type | `"rbac_group_deleted"` | Delete RBAC Group |
| group_id, user_id / type | `"rbac_group_member_deleted"` | Remove RBAC Group Member |

## Notes

- Requires the `ce-user-management-2026-07-13` beta header; available only to Claude Enterprise organizations.
- Groups with `source_type: "scim"` (IdP-provisioned) cannot be renamed, deleted, or have membership modified via this API.

## Related

- [rbac-roles.md](./rbac-roles.md)
- [users.md](./users.md)
- [invites.md](./invites.md)
