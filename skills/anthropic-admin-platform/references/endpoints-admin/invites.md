<!-- source: https://platform.claude.com/docs/en/api/admin/invites, https://platform.claude.com/docs/en/api/admin/invites/create, https://platform.claude.com/docs/en/api/admin/invites/list, https://platform.claude.com/docs/en/api/admin/invites/retrieve, https://platform.claude.com/docs/en/api/admin/invites/delete / last verified: 2026-08-07 -->

# Invites Admin API

Invite new Users to an organization.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/invites` | Create Invite |
| GET | `/v1/organizations/invites` | List Invites |
| GET | `/v1/organizations/invites/{invite_id}` | Get Invite |
| DELETE | `/v1/organizations/invites/{invite_id}` | Delete Invite |

```http
curl https://api.anthropic.com/v1/organizations/invites \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{
          "email": "user@emaildomain.com",
          "role": "user"
        }'
```

## Options / Props

### Body Parameters (Create Invite)

| Name | Type | Description |
|------|------|-------------|
| email | string | Email of the User |
| role | `"billing"` \| `"claude_code_user"` \| `"developer"` \| `"managed"` \| `"user"` | Role for the invited User. Console/API orgs accept `user`, `developer`, `billing`, `claude_code_user` (`admin` not assignable via API). Claude Enterprise (beta) orgs accept `user`, `managed` |
| rbac_group_ids | optional array of string | RBAC group IDs to assign on acceptance. Non-empty only for Claude Enterprise orgs with RBAC groups (beta); requires `write:rbac_groups` scope |

### Query Parameters (List Invites)

| Name | Type | Description |
|------|------|-------------|
| after_id | optional string | Cursor, page after this object |
| before_id | optional string | Cursor, page before this object |
| limit | optional number | Items per page. Default `20`, range `1`-`1000` |

### Path Parameters

| Name | Type | Description |
|------|------|-------------|
| invite_id | string | ID of the Invite |

### Invite object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the Invite |
| accepted_at | string | RFC 3339 datetime the Invite was accepted, or null |
| email | string | Email of the invited User |
| expires_at | string | RFC 3339 datetime the Invite expires |
| invited_at | string | RFC 3339 datetime the Invite was created |
| rbac_group_ids | array of string | RBAC group IDs recorded on the Invite (beta), `[]` when none |
| role | `"admin"` \| `"billing"` \| `"claude_code_user"` \| `"developer"` \| `"managed"` \| `"membership_admin"` \| `"owner"` \| `"primary_owner"` \| `"user"` | Organization role |
| status | `"accepted"` \| `"deleted"` \| `"expired"` \| `"pending"` | Status of the Invite |
| type | `"invite"` | Object type, always `"invite"` |

### Delete response

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the Invite |
| type | `"invite_deleted"` | Deleted object type, always `"invite_deleted"` |

## Notes

- Requires an Admin API key (`sk-ant-admin...`), not a regular API key.
- On plans with a finite seat pool, the invite consumes a seat from the lowest tier with availability; there is no seat-tier parameter. No free seat returns a 400 error rather than purchasing a seat.
- List/Create/Get/Delete Invites availability for Claude Enterprise organizations is in beta.

## Related

- [users.md](./users.md)
- [rbac-groups.md](./rbac-groups.md)
