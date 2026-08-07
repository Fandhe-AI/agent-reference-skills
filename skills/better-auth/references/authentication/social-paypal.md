# PayPal

## Signature / Usage

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

Advanced configuration:

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

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "paypal"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `PAYPAL_CLIENT_ID`, obtained from the [PayPal Developer Portal](https://developer.paypal.com/dashboard) |
| `clientSecret` | string | — | `PAYPAL_CLIENT_SECRET`, obtained from the [PayPal Developer Portal](https://developer.paypal.com/dashboard) |
| `environment` | `'sandbox' \| 'live'` | `"sandbox"` | PayPal environment selection |
| `requestShippingAddress` | boolean | `false` | Request shipping address information |
| `scope` | string[] | Dashboard-configured | Additional permission scopes |
| `mapProfileToUser` | function | Default mapping | Custom profile-to-user transformation |
| `getUserInfo` | function | Default retrieval | Custom user information retrieval |
| `verifyIdToken` | function | Default verification | Custom ID token verification |

## Notes

- Configure the Return URL in the PayPal Developer Portal; it must exactly match your configured redirect URI
- Create the app in the PayPal Developer Portal, enable "Log in with PayPal" under "Other features," and set the Return URL
- **Environments**: PayPal provides Sandbox (testing) and Live (production) environments
- **Testing**: create sandbox test accounts in the Developer Dashboard; real accounts don't work in sandbox mode
- **Local testing**: the PayPal API requires a public domain; use NGROK or similar for HTTPS localhost testing
- **Permissions**: PayPal doesn't use traditional OAuth2 scopes — configure permissions directly in the Developer Dashboard rather than the authorization URL
- **Approval**: live applications require PayPal review before deployment, typically taking several weeks

## Related

- [Social Providers Common](./social-providers-common.md)
