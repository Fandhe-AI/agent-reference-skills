# WeChat

## Credentials

- `WECHAT_CLIENT_ID` (App ID)
- `WECHAT_CLIENT_SECRET`

Obtain by registering a website application on the [WeChat Open Platform](https://open.weixin.qq.com/). You must also set the authorization callback domain to your Better Auth domain.

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        wechat: {
            clientId: process.env.WECHAT_CLIENT_ID,
            clientSecret: process.env.WECHAT_CLIENT_SECRET,
        },
    },
})
```

### Optional Configuration

```typescript
export const auth = betterAuth({
    socialProviders: {
        wechat: {
            clientId: process.env.WECHAT_CLIENT_ID,
            clientSecret: process.env.WECHAT_CLIENT_SECRET,
            lang: "cn", // or "en" for English UI
            scope: [], // "snsapi_login" for web QR code login
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
        provider: "wechat"
    })
}
```

## リダイレクト URL

The redirect URL domain must match the domain configured in the WeChat Open Platform.

## プロバイダー固有の設定・注意点

- **Platform Type**: Website Application
- **Capability**: Enables WeChat QR code login for web applications
- **Critical Requirement**: The redirect URL domain must match the domain configured in the WeChat Open Platform
- **Language Support**: Customize the login UI language via the `lang` parameter (`"cn"` or `"en"`)
- **Scope Options**: Use `snsapi_login` scope specifically for web QR code login flows
