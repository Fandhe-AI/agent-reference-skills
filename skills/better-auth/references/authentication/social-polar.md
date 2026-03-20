# Polar

A provider for OAuth 2.0 social authentication.

## Credentials

- `POLAR_CLIENT_ID`
- `POLAR_CLIENT_SECRET`

Obtain from [Polar User Settings](https://polar.sh/dashboard/account/developer).

### Getting Credentials

1. Navigate to your Polar User Settings OAuth section
2. Create a new OAuth Client
3. Configure the following fields:
   - **Application Name**: Display name during authorization
   - **Client Type**: Select appropriate type for your application
   - **Redirect URIs**: `http://localhost:3000/api/auth/callback/polar` (development) or `https://yourdomain.com/api/auth/callback/polar` (production)
   - **Scopes**: openid, profile, email (defaults)
   - **Homepage URL**: Your application's main URL
4. Optionally add: Logo, Terms of Service URL, Privacy Policy URL

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        polar: {
            clientId: process.env.POLAR_CLIENT_ID as string,
            clientSecret: process.env.POLAR_CLIENT_SECRET as string,
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
        provider: "polar"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/polar`
- **Production**: `https://yourdomain.com/api/auth/callback/polar`

## プロバイダー固有の設定・注意点

- Update redirect URIs if changing the base path of auth routes
- Keep Client Secret secure (never expose in client code)
- Default scopes include openid, profile, and email permissions
