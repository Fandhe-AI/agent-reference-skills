<!-- source: https://platform.claude.com/docs/en/api/admin/users, https://platform.claude.com/docs/en/api/admin/users/list, https://platform.claude.com/docs/en/api/admin/users/retrieve, https://platform.claude.com/docs/en/api/admin/users/update, https://platform.claude.com/docs/en/api/admin/users/delete / last verified: 2026-08-07 -->

# Users Admin API

Manage the Users in an organization.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/users` | List Users |
| GET | `/v1/organizations/users/{user_id}` | Get User |
| POST | `/v1/organizations/users/{user_id}` | Update User (role) |
| DELETE | `/v1/organizations/users/{user_id}` | Remove User |

```http
curl https://api.anthropic.com/v1/organizations/users \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Query Parameters (List Users)

| Name | Type | Description |
|------|------|-------------|
| after_id | optional string | Cursor for pagination, returns page immediately after this object |
| before_id | optional string | Cursor for pagination, returns page immediately before this object |
| email | optional string | Filter by user email |
| limit | optional number | Items per page. Default `20`, range `1`-`1000` |

### Path Parameters

| Name | Type | Description |
|------|------|-------------|
| user_id | string | ID of the User |

### Body Parameters (Update User)

| Name | Type | Description |
|------|------|-------------|
| role | `"billing"` \| `"claude_code_user"` \| `"developer"` \| `"managed"` \| `"user"` | New role. Console/API orgs accept `user`, `developer`, `billing`, `claude_code_user` (`admin` not assignable via API). Claude Enterprise (beta) orgs accept `user`, `managed` |

### User object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the User |
| added_at | string | RFC 3339 datetime the User joined the Organization |
| email | string | Email of the User |
| name | string | Name of the User |
| role | `"admin"` \| `"billing"` \| `"claude_code_user"` \| `"developer"` \| `"managed"` \| `"membership_admin"` \| `"owner"` \| `"primary_owner"` \| `"user"` | Organization role |
| type | `"user"` | Object type, always `"user"` |

### Delete response

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the User |
| type | `"user_deleted"` | Deleted object type, always `"user_deleted"` |

## Notes

- Requires an Admin API key (`sk-ant-admin...`), not a regular API key.
- List Users availability for Claude Enterprise organizations is in beta.

## Related

- invites.md
- workspaces.md
- rbac-groups.md
