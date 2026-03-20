# Paybin

An OAuth 2.0 social authentication provider.

## Credentials

- `PAYBIN_CLIENT_ID`
- `PAYBIN_CLIENT_SECRET`

Obtain from your Paybin Portfolio application's Developer Settings or OAuth Applications section.

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        paybin: {
            clientId: process.env.PAYBIN_CLIENT_ID as string,
            clientSecret: process.env.PAYBIN_CLIENT_SECRET as string,
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
        provider: "paybin"
    })
}
```

## リダイレクト URL

- **Local Development**: `http://localhost:3000/api/auth/callback/paybin`
- **Production**: `https://yourdomain.com/api/auth/callback/paybin`

## プロバイダー固有の設定・注意点

### Default Scopes

`openid`, `email`, `profile`

### Custom Scopes Example

```typescript
export const auth = betterAuth({
    socialProviders: {
        paybin: {
            clientId: process.env.PAYBIN_CLIENT_ID as string,
            clientSecret: process.env.PAYBIN_CLIENT_SECRET as string,
            scope: ["openid", "email", "profile", "transactions"],
        },
    },
})
```

### User Profile Mapping

Paybin follows OpenID Connect standards and automatically extracts:
- **id** from `sub` claim
- **name** from `name`, `preferred_username`, or `email` (priority order)
- **email** from `email` claim
- **image** from `picture` claim
- **emailVerified** from `email_verified` claim
