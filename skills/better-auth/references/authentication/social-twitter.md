# Twitter (X)

## Credentials

- `TWITTER_CLIENT_ID`
- `TWITTER_CLIENT_SECRET`

Obtain from the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "twitter"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/twitter`
- **Production**: Update to your production domain URL
- Adjust the redirect URL if you modify the base path of auth routes

## プロバイダー固有の設定・注意点

- **Email Scope**: Twitter API v2 now supports email address retrieval. Ensure the `user.email` scope is requested when configuring your Twitter application to enable email functionality during authentication.
