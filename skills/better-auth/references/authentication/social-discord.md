# Discord

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "discord"
    })
}
```

### Bot Permissions

If utilizing the `bot` scope, specify permissions via bitwise values or specific permission codes:

```typescript
discord: {
    clientId: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    permissions: 2048 | 16384, // Send Messages + Embed Links
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `DISCORD_CLIENT_ID` — obtain from the [Discord Developer Portal](https://discord.com/developers/applications) |
| `clientSecret` | string | `DISCORD_CLIENT_SECRET` — obtain from the [Discord Developer Portal](https://discord.com/developers/applications) |
| `permissions` | number | Bitwise permission value; only applied when the `bot` scope is included in the OAuth2 scopes |

## Notes

- Redirect URL:
  - Development: `http://localhost:3000/api/auth/callback/discord`
  - Production: update to match your application's domain
  - Custom base paths: adjust the redirect URL if you modify the auth route base path
- Consult [Discord's permissions documentation](https://discord.com/developers/docs/topics/permissions) for permission bit details
- For the complete list of supported options across all social providers, refer to the [Provider Options documentation](/docs/concepts/oauth#provider-options)

## Related

- [Social Providers Common](./social-providers-common.md)
