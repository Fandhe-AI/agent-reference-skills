# Apple

## Signature / Usage

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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `APPLE_CLIENT_ID` — Service ID (reverse domain format, e.g., `com.yourcompany.yourapp.si`) |
| `clientSecret` | string | `APPLE_CLIENT_SECRET` — JWT generated from `.p8` key file |
| `appBundleIdentifier` | string (optional) | `APPLE_APP_BUNDLE_IDENTIFIER` — App ID for native iOS implementations |

## Notes

- Redirect URL: `https://yourdomain.com/api/auth/callback/apple` — add it to the Return URLs in Apple Developer Portal
- **Service ID Setup**: Use reverse domain format distinct from App ID (e.g., `.si` suffix for service identifier)
- **Client Secret Requirements**: Apple allows a maximum expiration of 6 months (180 days) for the client secret JWT
- **Native iOS Consideration**: When using ID Token authentication on native iOS, provide `appBundleIdentifier` to avoid JWT claim validation failures
- **Development Limitation**: Apple Sign In does not support `localhost` or non-HTTPS URLs; valid HTTPS/TLS certificates required
- **Scope**: The documentation does not specify explicit scope configuration examples for Apple OAuth, though standard OAuth scope handling through Better Auth's plugin system applies

## Related

- [Social Providers Common](./social-providers-common.md)
