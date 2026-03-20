# Kick

## Credentials

- `KICK_CLIENT_ID`
- `KICK_CLIENT_SECRET`

Obtain from the [Kick Developer Portal](https://kick.com/settings/developer).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "kick"
    })
}
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/kick`
- **Production**: Update to match your application's URL
- Adjust the path if you've customized your auth route base path

## プロバイダー固有の設定・注意点

- For additional scopes or provider-specific options beyond the standard configuration, refer to the official Kick OAuth documentation or the Better Auth "Other Social Providers" guide for extended customization patterns
