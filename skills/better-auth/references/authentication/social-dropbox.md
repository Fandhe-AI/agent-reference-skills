# Dropbox

## Credentials

- `DROPBOX_CLIENT_ID`
- `DROPBOX_CLIENT_SECRET`

Obtain from the [Dropbox Developer Portal](https://www.dropbox.com/developers).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        dropbox: {
            clientId: process.env.DROPBOX_CLIENT_ID as string,
            clientSecret: process.env.DROPBOX_CLIENT_SECRET as string,
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
        provider: "dropbox"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/dropbox`
- **Production**: Adjust to your application's domain

## プロバイダー固有の設定・注意点

- **OAuth Flow**: The provider supports "Implicit Grant & PKCE" flow configuration in the Dropbox App Console
- Consult the [official Dropbox OAuth documentation](https://developers.dropbox.com/oauth-guide) for deeper implementation details
