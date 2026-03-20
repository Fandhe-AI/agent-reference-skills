# LinkedIn

## Credentials

- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`

Obtain from the [LinkedIn Developer Portal](https://www.linkedin.com/developers/).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
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
        provider: "linkedin"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/linkedin`
- **Production**: Update to your application's actual URL

## プロバイダー固有の設定・注意点

- **Required LinkedIn Product**: You must enable "Sign In with LinkedIn using OpenID Connect" in your LinkedIn Developer Portal under products
- Review the official [Sign In with LinkedIn using OpenID Connect documentation](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2) for implementation details
