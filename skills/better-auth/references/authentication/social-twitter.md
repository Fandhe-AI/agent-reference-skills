# Twitter (X)

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "twitter"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `TWITTER_CLIENT_ID`, obtained from the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) |
| `clientSecret` | string | — | `TWITTER_CLIENT_SECRET`, obtained from the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/twitter`; production: update to your production domain URL. Adjust it if you modify the base path of auth routes
- **Email scope**: Twitter API v2 now supports email address retrieval — ensure the `user.email` scope is requested when configuring your Twitter application to enable email functionality during authentication

## Related

- [Social Providers Common](./social-providers-common.md)
