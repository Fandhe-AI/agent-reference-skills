# Roblox

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        roblox: {
            clientId: process.env.ROBLOX_CLIENT_ID as string,
            clientSecret: process.env.ROBLOX_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "roblox"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `ROBLOX_CLIENT_ID`, obtained from [Roblox Creator Hub](https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab) |
| `clientSecret` | string | — | `ROBLOX_CLIENT_SECRET`, obtained from [Roblox Creator Hub](https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab) |

## Notes

- Redirect URL — development: `http://localhost:3000/api/auth/callback/roblox`; production: update to your application's domain. Adjust if you've customized the auth route base path
- **Email limitation**: the Roblox API does not provide email addresses. As a workaround, the user's `email` field uses the `preferred_username` value instead, meaning it contains the user's Roblox username rather than an actual email address

## Related

- [Social Providers Common](./social-providers-common.md)
