# Generic OAuth

The Generic OAuth plugin provides flexible integration with any OAuth provider, supporting both OAuth 2.0 and OpenID Connect (OIDC) flows.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [{
                providerId: "provider-id",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                discoveryUrl: "https://auth.example.com/.well-known/openid-configuration"
            }]
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ]
})
```

### OAuth2 sign-in

```typescript
// Client
const { data, error } = await authClient.signIn.oauth2({
    providerId: "provider-id",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error-page",
    newUserCallbackURL: "/welcome",
    disableRedirect: false,
    scopes: ["my-scope"],
    requestSignUp: false
})

// Server
const data = await auth.api.signInWithOAuth2({
    body: {
        providerId: "provider-id",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error-page",
        newUserCallbackURL: "/welcome",
        disableRedirect: false,
        scopes: ["my-scope"],
        requestSignUp: false
    }
})
```

### OAuth account linking

```typescript
// Client
const { data, error } = await authClient.oauth2.link({
    providerId: "my-provider-id",
    callbackURL: "/successful-link"
})

// Server
const data = await auth.api.oAuth2LinkAccount({
    body: { providerId: "my-provider-id", callbackURL: "/successful-link" },
    headers: await headers()
})
```

### Callback handling

The plugin automatically mounts a route at `/oauth2/callback/:providerId`.

Default callback URL: `${baseURL}/api/auth/oauth2/callback/:providerId`

### Preconfigured providers

- **Auth0**: `auth0(options)` - requires `domain`
- **HubSpot**: `hubspot(options)`
- **Keycloak**: `keycloak(options)` - requires `issuer`
- **LINE**: `line(options)` - supports multiple regions via `providerId`
- **Microsoft Entra ID**: `microsoftEntraId(options)` - requires `tenantId`
- **Okta**: `okta(options)` - requires `issuer`
- **Slack**: `slack(options)`
- **Patreon**: `patreon(options)`

### Custom token exchange

```typescript
genericOAuth({
    config: [{
        providerId: "custom-provider",
        clientId: process.env.CUSTOM_CLIENT_ID,
        clientSecret: process.env.CUSTOM_CLIENT_SECRET,
        authorizationUrl: "https://provider.example.com/oauth/authorize",
        scopes: ["profile", "email"],
        getToken: async ({ code, redirectURI }) => {
            const response = await fetch(/* ... */)
            const data = await response.json()
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
                scopes: data.scope?.split(" ") ?? [],
                raw: data
            }
        },
        getUserInfo: async (tokens) => {
            const response = await fetch(/* ... */)
            const data = await response.json()
            return {
                id: tokens.raw?.user_id,
                name: data.display_name,
                email: data.email,
                image: data.avatar_url,
                emailVerified: data.email_verified
            }
        }
    }]
})
```

### Profile mapping

```typescript
mapProfileToUser: async (profile) => ({
    firstName: profile.given_name
})
```

## Options / Props

| Option | Type | Description |
|---|---|---|
| `providerId` | string | Unique identifier for the provider config |
| `discoveryUrl` | string | OIDC discovery endpoint URL |
| `issuer` | string | Expected issuer identifier for validation |
| `requireIssuerValidation` | boolean | Enforce presence of an issuer in the callback (default: `false`) |
| `authorizationUrl` | string | OAuth authorization endpoint |
| `tokenUrl` | string | Token exchange endpoint |
| `userInfoUrl` | string | User profile information endpoint |
| `clientId` | string | OAuth client ID |
| `clientSecret` | string | OAuth client secret |
| `scopes` | string[] | Requested OAuth scopes |
| `redirectURI` | string | Custom redirect URL |
| `responseType` | string | OAuth response type (default: `"code"`) |
| `prompt` | string | Controls the authentication experience |
| `pkce` | boolean | Enable PKCE security (default: `false`) |
| `accessType` | string | Use `"offline"` for a refresh token |
| `authentication` | string | Token authentication method: `'basic'` or `'post'` (default: `'post'`) |
| `overrideUserInfo` | boolean | Update user info on every sign-in (default: `false`) |
| `disableImplicitSignUp` | boolean | Require explicit sign-up intent |
| `disableSignUp` | boolean | Prevent new user sign-up |
| `getToken` | function | Custom token exchange handler |
| `getUserInfo` | function | Custom user info retrieval |
| `mapProfileToUser` | function | Custom profile mapping |

## Notes

- Prevents mix-up attacks with issuer validation based on RFC 9207
- Automatically mounts a route at `/oauth2/callback/:providerId`
- `getToken` is useful for providers with non-standard token endpoints
- The `raw` field holds the original token response from the provider

### Issuer validation

Based on RFC 9207, prevents mix-up attacks.

| Condition | `requireIssuerValidation` | Result |
|---|---|---|
| `iss` matches expected value | - | Success |
| `iss` mismatch | - | `issuer_mismatch` error |
| `iss` missing | `false` | Success |
| `iss` missing | `true` | `issuer_missing` error |

## Related

- [oauth-provider.md](./oauth-provider.md)
- [dub.md](./dub.md)
