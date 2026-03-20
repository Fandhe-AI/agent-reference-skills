# Kakao

A social authentication provider for East Asian users, particularly popular in South Korea.

## Credentials

- `KAKAO_CLIENT_ID`
- `KAKAO_CLIENT_SECRET`

Obtain from the [Kakao Developer Portal](https://developers.kakao.com).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        kakao: {
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
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
        provider: "kakao"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/kakao`
- **Production**: Update to your application's actual domain

Kakao Developer Portal で設定する。

## プロバイダー固有の設定・注意点

### Default Scopes

- `account_email`
- `profile_image`
- `profile_nickname`

### Email Access Requirement

Retrieving `account_email` requires your application to be a "Biz App" -- an app that has completed business verification through Kakao. For scope details, consult the [Kakao Login scopes documentation](https://developers.kakao.com/docs/latest/kakaologin/utilize#scope-user).

This restriction means standard apps may not access verified email addresses without completing Kakao's business verification process.
