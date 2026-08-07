# Twitch

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        twitch: {
            clientId: process.env.TWITCH_CLIENT_ID as string,
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "twitch"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `TWITCH_CLIENT_ID`, obtained from the [Twitch Developer Portal](https://dev.twitch.tv/console/apps) |
| `clientSecret` | string | — | `TWITCH_CLIENT_SECRET`, obtained from the [Twitch Developer Portal](https://dev.twitch.tv/console/apps) |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/twitch`; production: use your application's production URL. Update it if you change your auth routes' base path
- **Email requirement**: Twitch users without an email address cannot sign in — ensure your implementation handles this limitation by requiring verified email addresses during the authentication flow

## Related

- [Social Providers Common](./social-providers-common.md)
