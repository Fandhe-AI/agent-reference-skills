# OAuth Apps

OAuth 2 flow for obtaining access tokens on behalf of users. Recommended method for production applications.

## Signature / Usage

### Step 1: Authorization Request

```http
GET https://www.figma.com/oauth
  ?client_id=<client_id>
  &redirect_uri=<redirect_uri>
  &scope=<scope>
  &state=<random_state>
  &response_type=code
  &code_challenge=<code_challenge>   # optional, PKCE only
```

### Step 2: Token Exchange

```http
POST https://api.figma.com/v1/oauth/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64(client_id:client_secret)>

redirect_uri=<redirect_uri>&code=<auth_code>&grant_type=authorization_code
```

### Step 3: Token Refresh

```http
POST https://api.figma.com/v1/oauth/refresh
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64(client_id:client_secret)>

refresh_token=<refresh_token>
```

## Options / Props

### Authorization request parameters

| Name | Required | Description |
|------|----------|-------------|
| `client_id` | Yes | OAuth app identifier |
| `redirect_uri` | Yes | Callback URL (must match registered URL) |
| `scope` | Yes | Space or comma-separated list of scopes |
| `state` | Yes | Randomly generated value for CSRF protection |
| `response_type` | Yes | Must be `code` |
| `code_challenge` | No | Required for PKCE flow (S256 method only) |

### Token exchange response

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | String | Bearer token for API requests |
| `refresh_token` | String | Token used to obtain new access tokens |
| `expires_in` | Number | Seconds until access token expiry |
| `user_id_string` | String | Figma user ID of the authenticated user |

## Notes

- Authorization codes expire **30 seconds** after being issued
- Use `code_verifier` in token exchange body when using PKCE
- Government instances use `https://api.figma-gov.com/v1/oauth/token` and `.../oauth/refresh`
- Token refresh response contains `access_token`, `token_type`, and `expires_in`

## Related

- [Authentication](./authentication.md)
- [Scopes](./scopes.md)
- [Personal Access Tokens](./personal-access-tokens.md)
