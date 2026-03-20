# TikTok

## Credentials

- `TIKTOK_CLIENT_KEY` - OAuth application identifier
- `TIKTOK_CLIENT_SECRET` - OAuth application secret

Obtain from the [TikTok Developer Portal](https://developers.tiktok.com/apps) by creating an application.

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        tiktok: {
            clientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
            clientKey: process.env.TIKTOK_CLIENT_KEY as string,
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
        provider: "tiktok"
    })
}
```

## リダイレクト URL

Must be HTTPS and configured in developer settings. Update if auth route base paths change.

## プロバイダー固有の設定・注意点

- **HTTPS Requirement**: The TikTok API does not work with localhost. Use public domains or tools like NGROK for local testing
- **Sandbox Mode**: Required for testing -- enable via TikTok Developer Portal
- **Default Scope**: `user.info.profile` (required because TikTok doesn't provide emails; username serves as the email field)
- **Production**: Requires TikTok approval for requested scopes
