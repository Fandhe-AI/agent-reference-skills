# Discord

## Credentials

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`

Obtain from the [Discord Developer Portal](https://discord.com/developers/applications).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "discord"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/discord`
- **Production**: Update to match your application's domain
- **Custom base paths**: Adjust the redirect URL if you modify the auth route base path

## プロバイダー固有の設定・注意点

### Bot Permissions

If utilizing the `bot` scope, specify permissions via bitwise values or specific permission codes:

```typescript
discord: {
    clientId: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    permissions: 2048 | 16384, // Send Messages + Embed Links
}
```

The `permissions` parameter only works when the `bot` scope is included in your OAuth2 scopes. Consult [Discord's permissions documentation](https://discord.com/developers/docs/topics/permissions) for additional details.

For the complete list of supported options across all social providers, refer to the [Provider Options documentation](/docs/concepts/oauth#provider-options).
