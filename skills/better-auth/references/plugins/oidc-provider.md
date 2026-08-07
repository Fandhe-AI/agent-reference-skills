# OIDC Provider

The OIDC Provider plugin lets you build and manage your own OpenID Connect provider, giving you full control over user authentication without depending on an external service.

**Status**: This plugin is expected to be replaced by the OAuth Provider plugin in the near future.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { oidcProvider } from "better-auth/plugins"

const auth = betterAuth({
    plugins: [
        oidcProvider({
            loginPage: "/sign-in",
        })
    ]
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { oidcClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        oidcClient()
    ]
})
```

### OAuth application registration

```typescript
// Client
const { data, error } = await authClient.oauth2.register({
    redirect_uris: ["https://client.example.com/callback"],
    token_endpoint_auth_method: "client_secret_basic",
    grant_types: ["authorization_code"],
    response_types: ["code"],
    client_name: "My App",
    client_uri: "https://client.example.com",
    logo_uri: "https://client.example.com/logo.png",
    scope: "profile email",
    contacts: ["admin@example.com"],
    tos_uri: "https://client.example.com/tos",
    policy_uri: "https://client.example.com/policy",
    metadata: {"key": "value"},
    software_id: "my-software",
    software_version: "1.0.0",
})

// Server
const data = await auth.api.registerOAuthApplication({
    body: { /* same parameters */ },
})
```

Registration parameters:

| Parameter | Type | Required | Description |
|---|---|---|---|
| `redirect_uris` | string[] | Yes | List of redirect URIs |
| `token_endpoint_auth_method` | `"none" \| "client_secret_basic" \| "client_secret_post"` | No | Token endpoint authentication method |
| `grant_types` | string[] | No | Supported grant types |
| `response_types` | `("code" \| "token")[]` | No | Supported response types |
| `client_name` | string | No | Application name |
| `scope` | string | No | Space-separated scopes |

### UserInfo endpoint

`GET /oauth2/userinfo`

```typescript
const response = await fetch('https://your-domain.com/api/auth/oauth2/userinfo', {
    headers: { 'Authorization': 'Bearer ACCESS_TOKEN' }
})
const userInfo = await response.json()
```

Returned claims:
- `openid` scope: `sub`
- `profile` scope: `name`, `picture`, `given_name`, `family_name`
- `email` scope: `email`, `email_verified`

### Consent endpoint

`POST /oauth2/consent`

```typescript
// Via URL parameter
const params = new URLSearchParams(window.location.search)
const consentCode = params.get('consent_code')
const res = await authClient.oauth2.consent({
    accept: true,
    consent_code: consentCode,
})

// Cookie-based
const res = await authClient.oauth2.consent({
    accept: true,
})
```

## Options / Props

```typescript
interface OIDCProviderOptions {
    allowDynamicClientRegistration?: boolean  // default: false
    metadata?: OIDCMetadata
    loginPage: string
    consentPage?: string
    trustedClients?: (Client & { skipConsent?: boolean })[]
    getAdditionalUserInfoClaim?: (user, scopes, client) => Record<string, any>
    useJWTPlugin?: boolean  // default: false
    schema?: AuthPluginSchema
}
```

### Trusted clients

```typescript
oidcProvider({
    loginPage: "/sign-in",
    trustedClients: [
        {
            clientId: "internal-dashboard",
            clientSecret: "secure-secret-here",
            name: "Internal Dashboard",
            type: "web",
            redirectUrls: ["https://dashboard.company.com/auth/callback"],
            disabled: false,
            skipConsent: true,
            metadata: { internal: true }
        },
    ]
})
```

### Custom claims

```typescript
oidcProvider({
    loginPage: "/sign-in",
    getAdditionalUserInfoClaim: async (user, scopes, client) => {
        const claims = {}
        if (scopes.includes("profile")) {
            claims.department = user.department
        }
        return claims
    }
})
```

### JWT plugin integration

```typescript
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    disabledPaths: ["/token"],
    plugins: [
        jwt(),
        oidcProvider({ useJWTPlugin: true, loginPage: "/sign-in" })
    ]
})
```

When `useJWTPlugin: false` (the default), the ID token is signed with HMAC-SHA256 using the application secret.

### DB schema (oauthApplication table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | DB ID |
| clientId | string | - | Unique OAuth client identifier |
| clientSecret | string | ? | Secret key (optional for public clients) |
| name | string | - | Client name |
| redirectUrls | string | - | Comma-separated redirect URLs |
| metadata | string | ? | Additional metadata |
| type | string | - | Client type (web, mobile, etc.) |
| disabled | boolean | ? | Disabled state |
| userId | string | FK? | Owning user ID |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | - | Update timestamp |

### DB schema (oauthAccessToken table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | DB ID |
| accessToken | string | - | Access token |
| refreshToken | string | - | Refresh token |
| accessTokenExpiresAt | Date | - | Access token expiration |
| refreshTokenExpiresAt | Date | - | Refresh token expiration |
| clientId | string | FK | OAuth client ID |
| userId | string | FK? | Associated user ID |
| scopes | string | - | Comma-separated scopes |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | - | Update timestamp |

### DB schema (oauthConsent table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| userId | string | FK | Consenting user |
| clientId | string | FK | OAuth client ID |
| scopes | string | - | Comma-separated consented scopes |
| consentGiven | boolean | - | Consent state |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | - | Update timestamp |

## Notes

- Client registration requires authentication by default. Set `allowDynamicClientRegistration: true` to allow public registration
- Trusted clients with `skipConsent: true` bypass the consent screen entirely
- For OIDC compliance, disable the `/token` endpoint and use `/oauth2/token` instead
- This plugin is under active development and may not be suitable for production use
- Migration to the OAuth Provider plugin is recommended

## Related

- [oauth-provider.md](./oauth-provider.md)
