# Kick

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        kick: {
            clientId: process.env.KICK_CLIENT_ID as string,
            clientSecret: process.env.KICK_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "kick"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `KICK_CLIENT_ID` — obtain from the [Kick Developer Portal](https://kick.com/settings/developer) |
| `clientSecret` | string | `KICK_CLIENT_SECRET` — obtain from the [Kick Developer Portal](https://kick.com/settings/developer) |

## Notes

- Redirect URL:
  - Local Development: `http://localhost:3000/api/auth/callback/kick`
  - Production: update to match your application's URL
  - Adjust the path if you've customized your auth route base path
- For additional scopes or provider-specific options beyond the standard configuration, refer to the official Kick OAuth documentation or the Better Auth "Other Social Providers" guide for extended customization patterns

## Related

- [Social Providers Common](./social-providers-common.md)
- [Other Social Providers](./other-social-providers.md)
