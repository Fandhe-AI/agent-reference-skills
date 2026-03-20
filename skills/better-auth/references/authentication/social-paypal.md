# PayPal

## Credentials

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`

Obtain by creating an application in the [PayPal Developer Portal](https://developer.paypal.com/dashboard), configuring "Log in with PayPal" under "Other features," and setting your Return URL.

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        paypal: {
            clientId: process.env.PAYPAL_CLIENT_ID as string,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
            environment: "sandbox", // or "live" for production
        },
    },
})
```

### Advanced Configuration

```typescript
export const auth = betterAuth({
    socialProviders: {
        paypal: {
            clientId: process.env.PAYPAL_CLIENT_ID as string,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET as string,
            environment: "live",
            requestShippingAddress: true,
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
        provider: "paypal"
    })
}
```

## リダイレクト URL

Return URL を PayPal Developer Portal で設定する。

## プロバイダー固有の設定・注意点

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `environment` | `'sandbox' \| 'live'` | `"sandbox"` | PayPal environment selection |
| `requestShippingAddress` | `boolean` | `false` | Request shipping address information |
| `scope` | `string[]` | Dashboard-configured | Additional permission scopes |
| `mapProfileToUser` | `function` | Default mapping | Custom profile-to-user transformation |
| `getUserInfo` | `function` | Default retrieval | Custom user information retrieval |
| `verifyIdToken` | `function` | Default verification | Custom ID token verification |

### Important Notes

- **Environments**: PayPal provides Sandbox (testing) and Live (production) environments
- **Testing**: Create sandbox test accounts in the Developer Dashboard; real accounts don't work in sandbox mode
- **URL Matching**: The Return URL must exactly match your configured redirect URI
- **Local Testing**: PayPal API requires a public domain; use NGROK or similar for HTTPS localhost testing
- **Permissions**: PayPal doesn't use traditional OAuth2 scopes; configure permissions directly in the Developer Dashboard
- **Approval**: Live applications require PayPal review before deployment, typically taking several weeks
- **Scope Configuration**: Permissions set in Developer Dashboard rather than authorization URL
