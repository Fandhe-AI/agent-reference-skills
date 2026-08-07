# User Invitations

Email invitations to join your App Store Connect team, with assigned roles and app visibility.

## Signature / Usage

```bash
# List pending invitations
GET https://api.appstoreconnect.apple.com/v1/userInvitations

# Read a specific invitation
GET https://api.appstoreconnect.apple.com/v1/userInvitations/{id}

# Invite a user
POST https://api.appstoreconnect.apple.com/v1/userInvitations

# Cancel a pending invitation
DELETE https://api.appstoreconnect.apple.com/v1/userInvitations/{id}

# List apps visible to an invited user
GET https://api.appstoreconnect.apple.com/v1/userInvitations/{id}/visibleApps
GET https://api.appstoreconnect.apple.com/v1/userInvitations/{id}/relationships/visibleApps
```

## Options / Props

### `UserInvitation.Attributes`

| Field | Type | Description |
|-------|------|-------------|
| `email` | string (email) | Invitee's email address; need not be tied to an existing Apple Account |
| `firstName` | string | Invitee's first name |
| `lastName` | string | Invitee's last name |
| `roles` | `[UserRole]` | Assigned roles determining App Store Connect access |
| `expirationDate` | date-time | Expiration date of the pending invitation |
| `provisioningAllowed` | boolean | Whether the role grants provisioning access on the Apple Developer website |
| `allAppsVisible` | boolean | Whether the invited user has access to all apps on the team |

### Query Parameters — `GET /v1/userInvitations`

| Parameter | Description |
|-----------|-------------|
| `filter[roles]` | Filter by user role |
| `filter[email]` | Filter by email address |
| `filter[visibleApps]` | Filter by visible app IDs |
| `include` | `visibleApps` |
| `fields[userInvitations]` | Fields to return |
| `sort` | `email`, `-email`, `lastName`, `-lastName` |
| `limit` | Max per page (max: 200) |

## Notes

- Invitations are pending until the invitee accepts them; `DELETE` cancels a still-pending invitation.
- `allAppsVisible: true` overrides the `visibleApps` relationship, same as on `Users`.
- Once an invitation is accepted, the person becomes a `User` resource — invitations do not merge automatically into an existing `User` entry.

## Related

- [Users](../asc-api-core/users.md)
- [Sandbox Testers](./sandbox-testers.md)
