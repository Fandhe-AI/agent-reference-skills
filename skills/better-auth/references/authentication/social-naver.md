# Naver

A South Korean authentication provider.

## Credentials

- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`

Obtain from the [Naver Developers portal](https://developers.naver.com/).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        naver: {
            clientId: process.env.NAVER_CLIENT_ID as string,
            clientSecret: process.env.NAVER_CLIENT_SECRET as string,
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
        provider: "naver"
    })
}
```

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/naver`
- **Production**: Update to your application's URL
- If you change the base path of the auth routes, you should update the redirect URL accordingly

## プロバイダー固有の設定・注意点

- Beyond the basic clientId and clientSecret configuration, specific scope requests and provider-specific options are not detailed in the documentation
