<!-- source: https://platform.claude.com/docs/en/manage-claude/user-management / last verified: 2026-08-07 -->

# User management

Manage the people in your Claude Enterprise organization with the Admin API: list members and change roles, send and withdraw invites, manage groups, and read custom roles.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/users?limit=20" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
  -H "anthropic-version: 2023-06-01"
```

```json
{
  "data": [
    {
      "type": "user",
      "id": "user_01AbCdEfGhIjKlMnOpQrSt",
      "email": "jane@example.com",
      "name": "Jane Smith",
      "role": "user",
      "added_at": "2026-06-12T09:14:03Z"
    }
  ],
  "has_more": false,
  "first_id": "user_01AbCdEfGhIjKlMnOpQrSt",
  "last_id": "user_01AbCdEfGhIjKlMnOpQrSt"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET /v1/organizations/users` | endpoint | List members; filter by `email` |
| `POST /v1/organizations/users/{user_id}` | endpoint | Change a member's role to `user` or `managed` |
| `DELETE /v1/organizations/users/{user_id}` | endpoint | Remove a member |
| `POST /v1/organizations/invites` | endpoint | Create an invite (`role`: `user` or `managed`) |
| `GET /v1/organizations/invites` | endpoint | List invites |
| `DELETE /v1/organizations/invites/{invite_id}` | endpoint | Withdraw a `pending` invite |
| `GET/POST/DELETE /v1/organizations/rbac_groups` | endpoint | List/create/rename/delete groups (beta, requires `anthropic-beta: ce-user-management-2026-07-13`) |
| `GET/POST/DELETE /v1/organizations/rbac_groups/{group_id}/members` | endpoint | List/add/remove group members |
| `GET /v1/organizations/rbac_roles` | endpoint | List custom roles (read-only) |
| `GET /v1/organizations/rbac_roles/{role_id}/permissions` | endpoint | List a role's permissions |

## Notes

- Member/invite endpoints are in beta for Claude Enterprise; group and custom-role requests require the `anthropic-beta: ce-user-management-2026-07-13` header, member/invite requests do not
- Five organization roles on reads: `user`, `managed`, `owner`, `membership_admin`, `primary_owner`; the API can assign only `user` and `managed`
- Groups are enterprise-wide (owned by the parent organization together with all sub-organizations); `source_type: "scim"` groups are read-only through the API
- Pagination: members/invites use ID-based (`limit`, `before_id`/`after_id`, `first_id`/`last_id`, `has_more`); groups/custom-roles use an opaque cursor (`next_page`)
- Rate limit: 100 requests/minute per organization; invite creation has its own limit of 1,200/hour
- A pending invite on a finite seat-pool plan consumes a seat automatically from the lowest available tier

## Related

- [admin-api](./admin-api.md)
- [admin-api-keys](./admin-api-keys.md)
- [workspaces](./workspaces.md)
