# Users

Endpoint for reading the authenticated user's profile information via OAuth.

## Signature / Usage

```http
GET /v1/me
Authorization: Bearer <oauth-access-token>
```

## Options / Props

### GET Current User

`GET /v1/me` — Returns information about the OAuth-authenticated user.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique user identifier |
| `handle` | String | User's display name |
| `img_url` | String | Profile image URL |
| `email` | String | User's email address |

**Authentication:** OAuth 2 required (not available with personal access tokens or plan access tokens)  
**Scope:** `current_user:read` | **Rate Limit:** Tier 3

## Notes

- This endpoint is only available when using OAuth 2 authentication
- Not supported with personal access tokens or plan access tokens

## Related

- [Authentication](./authentication.md)
- [OAuth Apps](./oauth-apps.md)
