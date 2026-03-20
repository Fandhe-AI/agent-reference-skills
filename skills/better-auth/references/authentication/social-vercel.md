# Vercel

## Credentials

- `VERCEL_CLIENT_ID`
- `VERCEL_CLIENT_SECRET`

Obtain by creating a Vercel App in the [Vercel Dashboard](https://vercel.com/dashboard).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId: process.env.VERCEL_CLIENT_ID as string,
            clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
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
        provider: "vercel"
    })
}
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/vercel`
- **Production**: Set to your application's URL
- Adjust the redirect path if you've customized your auth route base path

## プロバイダー固有の設定・注意点

### Available Scopes

Vercel supports these OpenID Connect scopes:
- `openid` (default)
- `email`
- `profile`
- `offline_access`

Scopes are configured at the Vercel App level. Optional scope parameter can request a subset:

```typescript
vercel: {
    clientId: process.env.VERCEL_CLIENT_ID as string,
    clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
    scope: ["openid", "email", "profile"],
}
```

### Security Note

Vercel requires PKCE (Proof Key for Code Exchange) for enhanced security -- this is automatically handled by Better Auth.
