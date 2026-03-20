# Roblox

## Credentials

- `ROBLOX_CLIENT_ID`
- `ROBLOX_CLIENT_SECRET`

Obtain from [Roblox Creator Hub](https://create.roblox.com/dashboard/credentials?activeTab=OAuthTab).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "roblox"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/roblox`
- **Production**: Update to your application's domain
- Adjust if you've customized the auth route base path

## プロバイダー固有の設定・注意点

- **Email Limitation**: The Roblox API does not provide email addresses. As a workaround, the user's `email` field uses the `preferred_username` value instead. This means the email field will contain the user's Roblox username rather than an actual email address.
