# Twitch

## Credentials

- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`

Obtain from the [Twitch Developer Portal](https://dev.twitch.tv/console/apps).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "twitch"
    })
}
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/twitch`
- **Production**: Use your application's production URL
- Update the redirect URL if you change your auth routes' base path

## プロバイダー固有の設定・注意点

- **Email Requirement**: Twitch users who do not have an email address will not be able to sign in. Ensure your implementation handles this limitation by requiring verified email addresses during the authentication flow.
