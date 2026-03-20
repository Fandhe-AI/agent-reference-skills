# Slack

## Credentials

- `SLACK_CLIENT_ID`
- `SLACK_CLIENT_SECRET`

### Setup Instructions

Follow these steps at [Your Apps on Slack API](https://api.slack.com/apps):

1. Create a new app by selecting "From scratch"
2. Name your app and choose a development workspace
3. Navigate to "OAuth & Permissions"
4. Register your redirect URLs:
   - Development: `http://localhost:3000/api/auth/callback/slack`
   - Production: `https://yourdomain.com/api/auth/callback/slack`
5. Retrieve Client ID and Client Secret from "Basic Information"

Production environments require HTTPS. Use [ngrok](https://ngrok.com/) for local HTTPS tunneling.

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        slack: {
            clientId: process.env.SLACK_CLIENT_ID as string,
            clientSecret: process.env.SLACK_CLIENT_SECRET as string,
        },
    },
})
```

## クライアントサインイン

### Basic Sign-In

```typescript
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({ provider: "slack" });
};
```

### Request Additional Scopes

By default, Slack uses OpenID Connect scopes: `openid`, `profile`, `email`. Request extra permissions:

```typescript
const signInWithSlack = async () => {
  await authClient.signIn.social({
    provider: "slack",
    scopes: ["channels:read", "chat:write"],
  });
};
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/slack`
- **Production**: `https://yourdomain.com/api/auth/callback/slack`

## プロバイダー固有の設定・注意点

### Workspace-Specific Sign-In

Restrict authentication to a single Slack workspace:

```typescript
socialProviders: {
    slack: {
        clientId: process.env.SLACK_CLIENT_ID as string,
        clientSecret: process.env.SLACK_CLIENT_SECRET as string,
        team: "T1234567890",
    },
}
```

### Post-Authentication

After successful sign-in, access user information through the session. The access token is stored securely on the server for making subsequent API requests to Slack endpoints. Request appropriate scopes if accessing additional Slack APIs beyond basic profile data.
