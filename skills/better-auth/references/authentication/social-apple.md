# Apple

## Credentials

- `APPLE_CLIENT_ID` - Service ID (reverse domain format, e.g., `com.yourcompany.yourapp.si`)
- `APPLE_CLIENT_SECRET` - JWT generated from `.p8` key file
- `APPLE_APP_BUNDLE_IDENTIFIER` (optional) - App ID for native iOS implementations

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        apple: {
            clientId: process.env.APPLE_CLIENT_ID as string,
            clientSecret: process.env.APPLE_CLIENT_SECRET as string,
            appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
        },
    },
    trustedOrigins: ["https://appleid.apple.com"],
})
```

## クライアントサインイン

### Standard OAuth Flow

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "apple"
    })
}
```

### With ID Token

```typescript
await authClient.signIn.social({
    provider: "apple",
    idToken: {
        token: // Apple ID Token,
        nonce: // Nonce (optional),
        accessToken: // Access Token (optional)
    }
})
```

## リダイレクト URL

`https://yourdomain.com/api/auth/callback/apple`

Apple Developer Portal の Return URLs に追加する。

## プロバイダー固有の設定・注意点

- **Service ID Setup**: Use reverse domain format distinct from App ID (e.g., `.si` suffix for service identifier)
- **Client Secret Requirements**: Apple allows a maximum expiration of 6 months (180 days) for the client secret JWT
- **Native iOS Consideration**: When using ID Token authentication on native iOS, provide `appBundleIdentifier` to avoid JWT claim validation failures
- **Development Limitation**: Apple Sign In does not support `localhost` or non-HTTPS URLs; valid HTTPS/TLS certificates required
- **Scope**: The documentation does not specify explicit scope configuration examples for Apple OAuth, though standard OAuth scope handling through Better Auth's plugin system applies
