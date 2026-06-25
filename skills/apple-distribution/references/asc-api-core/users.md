# Users

List and manage team members in App Store Connect, including their roles and app visibility.

## Signature / Usage

```bash
# List all users on your team
GET https://api.appstoreconnect.apple.com/v1/users

# Read a specific user
GET https://api.appstoreconnect.apple.com/v1/users/{id}

# Modify a user (roles, app visibility)
PATCH https://api.appstoreconnect.apple.com/v1/users/{id}

# Remove a user from the team
DELETE https://api.appstoreconnect.apple.com/v1/users/{id}

# List apps visible to a user
GET https://api.appstoreconnect.apple.com/v1/users/{id}/visibleApps

# Grant app access to a user
POST https://api.appstoreconnect.apple.com/v1/users/{id}/relationships/visibleApps
```

## Options / Props

### `PATCH /v1/users/{id}` Request Body (`UserUpdateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"users"` | Resource type |
| `data.id` | string | User ID |
| `data.attributes.roles` | `[UserRole]` | Updated list of user roles |
| `data.attributes.allAppsVisible` | boolean | Grant visibility to all apps |
| `data.attributes.provisioningAllowed` | boolean | Allow provisioning access |

### `UserRole` Values (partial)

| Role | Description |
|------|-------------|
| `ADMIN` | Full administrative access |
| `FINANCE` | Financial reports access |
| `TECHNICAL` | Technical team member |
| `SALES` | Sales reports access |
| `MARKETING` | App metadata editing |
| `ACCOUNT_HOLDER` | Team account holder |
| `DEVELOPER` | Developer access |
| `APP_MANAGER` | App management |
| `CUSTOMER_SUPPORT` | Customer support access |

### Query Parameters — `GET /v1/users`

| Parameter | Description |
|-----------|-------------|
| `filter[roles]` | Filter by user role |
| `filter[username]` | Filter by username (email) |
| `filter[visibleApps]` | Filter by visible app IDs |
| `include` | `visibleApps` |
| `fields[users]` | Fields to return |
| `limit` | Max per page (max: 200) |

### App Visibility Management

| Operation | Endpoint | Description |
|-----------|----------|-------------|
| List visible apps | `GET /v1/users/{id}/visibleApps` | Get apps this user can see |
| Add app access | `POST /v1/users/{id}/relationships/visibleApps` | Grant access to specific apps |
| Replace app list | `PATCH /v1/users/{id}/relationships/visibleApps` | Replace entire visible app list |
| Remove app access | `DELETE /v1/users/{id}/relationships/visibleApps` | Revoke access to specific apps |

## Notes

- Individual API keys cannot modify user accounts via this resource
- `allAppsVisible: true` overrides the `visibleApps` relationship list
- User `DELETE` removes the user from the team entirely

## Related

- [Apps](./apps.md)
- [Pagination](./pagination.md)
