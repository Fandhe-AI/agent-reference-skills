# Reddit

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "reddit"
    })
}
```

Optional scope and duration configuration:

```typescript
export const auth = betterAuth({
    socialProviders: {
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
            duration: "permanent",
            scope: ["read", "submit"]
        },
    },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `REDDIT_CLIENT_ID`, shown under the app name in the Reddit Developer Portal |
| `clientSecret` | string | — | `REDDIT_CLIENT_SECRET`, generated when creating the app |
| `duration` | string | — | e.g. `"permanent"`, to request a refresh token |
| `scope` | string[] | — | See available scopes below |

Available scopes:

| Scope | Description |
| --- | --- |
| `identity` | Access basic account information |
| `read` | Access posts and comments |
| `submit` | Submit posts and comments |
| `subscribe` | Manage subreddit subscriptions |
| `history` | Access voting history |

## Notes

- Getting credentials: navigate to the [Reddit Developer Portal](https://www.reddit.com/prefs/apps), select "Create App" or "Create Another App", choose "web app" as the application type, set the redirect URL to `http://localhost:3000/api/auth/callback/reddit` (local) or your production domain (e.g. `https://example.com/api/auth/callback/reddit`), then retrieve the client ID and client secret
- Redirect URL — local development: `http://localhost:3000/api/auth/callback/reddit`; production: `https://example.com/api/auth/callback/reddit`. If you change the base path of the auth routes, update the redirect URL accordingly
- For comprehensive scope options, consult the [Reddit OAuth2 documentation](https://www.reddit.com/dev/api/oauth)

## Related

- [Social Providers Common](./social-providers-common.md)
