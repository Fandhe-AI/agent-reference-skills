# Slack

## Signature / Usage

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

```typescript
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({ provider: "slack" });
};
```

By default, Slack uses the OpenID Connect scopes `openid`, `profile`, `email`. Request extra permissions:

```typescript
const signInWithSlack = async () => {
  await authClient.signIn.social({
    provider: "slack",
    scopes: ["channels:read", "chat:write"],
  });
};
```

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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `SLACK_CLIENT_ID`, retrieved from "Basic Information" in your Slack app |
| `clientSecret` | string | — | `SLACK_CLIENT_SECRET`, retrieved from "Basic Information" in your Slack app |
| `team` | string | — | Restrict sign-in to a single Slack workspace ID |

## Notes

- Setup: at [Your Apps on Slack API](https://api.slack.com/apps), create a new app "From scratch", name it and choose a development workspace, navigate to "OAuth & Permissions", register redirect URLs, then retrieve Client ID and Client Secret from "Basic Information"
- Redirect URL — development: `http://localhost:3000/api/auth/callback/slack`; production: `https://yourdomain.com/api/auth/callback/slack`
- Production environments require HTTPS; use [ngrok](https://ngrok.com/) for local HTTPS tunneling
- After successful sign-in, the access token is stored securely on the server for making subsequent API requests to Slack endpoints; request appropriate scopes if accessing additional Slack APIs beyond basic profile data

## Related

- [Social Providers Common](./social-providers-common.md)
