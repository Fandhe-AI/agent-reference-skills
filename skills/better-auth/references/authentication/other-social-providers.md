# Other Social Providers (Generic OAuth)

Better Auth supports any OAuth2 or OpenID Connect provider through the Generic OAuth Plugin, with pre-configured helpers for popular services.

## Installation

### Server Configuration

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

### Client Setup

```typescript
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  plugins: [genericOAuthClient()]
})
```

## Pre-configured Providers

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

### Sign In

```typescript
const response = await authClient.signIn.oauth2({
  providerId: "slack",
  callbackURL: "/dashboard"
})
```

## Manual Configuration Examples

### Instagram

- Environment variables: `INSTAGRAM_CLIENT_ID`, `INSTAGRAM_CLIENT_SECRET`
- Auth URL: `https://api.instagram.com/oauth/authorize`
- Token URL: `https://api.instagram.com/oauth/access_token`
- Scopes: `user_profile`, `user_media`

### Coinbase

- Environment variables: `COINBASE_CLIENT_ID`, `COINBASE_CLIENT_SECRET`
- Auth URL: `https://www.coinbase.com/oauth/authorize`
- Token URL: `https://api.coinbase.com/oauth/token`
- Scopes: `wallet:user:read`

Both manual providers follow identical configuration and sign-in patterns as the Slack example above.
