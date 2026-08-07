# Invites and Users

Invite a user to an organization by email via the Administration API, and manage organization users and their roles.

## Signature / Usage

```python
invite = client.admin.organization.invites.create(
    email="user@example.com",
    role="reader",
)

print(invite.id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| email | string | Email address to invite |
| role | string | Organization role to assign (e.g. `reader`, `owner`) |

## Notes

- Requires an Admin API key.
- Full endpoint reference (Users, Invites subresources): [Administration API reference](https://developers.openai.com/api/reference/administration/overview).
- Org-level and project-level roles are separate; see RBAC for how they combine.

## Related

- [Admin API Keys](./admin-api-keys.md)
- [RBAC](./rbac.md)
