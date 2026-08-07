# Other Social Providers (Generic OAuth)

Better Auth supports any OAuth2 or OpenID Connect provider through the Generic OAuth Plugin, with pre-configured helpers for popular services.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "provider-id",
          clientId: "test-client-id",
          clientSecret: "test-client-secret",
          discoveryUrl: "https://auth.example.com/.well-known/openid-configuration"
        }
      ]
    })
  ]
})
```

```typescript
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  plugins: [genericOAuthClient()]
})
```

### Pre-configured Providers

Example using Slack (also available: Auth0, Keycloak, Okta, Microsoft Entra ID):

```typescript
import { genericOAuth, slack } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        slack({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET
        })
      ]
    })
  ]
})
```

```typescript
const response = await authClient.signIn.oauth2({
  providerId: "slack",
  callbackURL: "/dashboard"
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `providerId` | string | Identifier used for `signIn.oauth2({ providerId })` |
| `clientId` | string | OAuth client ID |
| `clientSecret` | string | OAuth client secret |
| `discoveryUrl` | string | OpenID Connect discovery document URL |

### Manual Configuration Examples

| Provider | Env vars | Auth URL | Token URL | Scopes |
| --- | --- | --- | --- | --- |
| Instagram | `INSTAGRAM_CLIENT_ID`, `INSTAGRAM_CLIENT_SECRET` | `https://api.instagram.com/oauth/authorize` | `https://api.instagram.com/oauth/access_token` | `user_profile`, `user_media` |
| Coinbase | `COINBASE_CLIENT_ID`, `COINBASE_CLIENT_SECRET` | `https://www.coinbase.com/oauth/authorize` | `https://api.coinbase.com/oauth/token` | `wallet:user:read` |

## Notes

- Both Instagram and Coinbase follow identical manual configuration and sign-in patterns as the Slack example above

## Related

- [Social Providers Common](./social-providers-common.md)
