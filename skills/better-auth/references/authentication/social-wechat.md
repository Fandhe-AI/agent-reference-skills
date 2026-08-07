# WeChat

## Signature / Usage

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

Optional configuration:

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

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "wechat"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `WECHAT_CLIENT_ID` (App ID), obtained by registering a website application on the [WeChat Open Platform](https://open.weixin.qq.com/) |
| `clientSecret` | string | — | `WECHAT_CLIENT_SECRET`, obtained by registering a website application on the [WeChat Open Platform](https://open.weixin.qq.com/) |
| `lang` | `"cn" \| "en"` | — | Login UI language |
| `scope` | string[] | `[]` | Use `"snsapi_login"` for web QR code login |

## Notes

- You must also set the authorization callback domain to your Better Auth domain in the WeChat Open Platform
- Redirect URL domain must match the domain configured in the WeChat Open Platform
- **Platform type**: Website Application
- **Capability**: enables WeChat QR code login for web applications

## Related

- [Social Providers Common](./social-providers-common.md)
