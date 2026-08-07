# Facebook

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        facebook: {
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/auth-client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "facebook"
    })
}
```

### Facebook Login for Business

When using Business apps, add the `configId` alongside credentials:

```typescript
facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    configId: "your-config-id"
}
```

Must be "User access token" type; "System-user access token" is unsupported.

### ID Token Sign-In

```typescript
const data = await authClient.signIn.social({
    provider: "facebook",
    idToken: {
        ...(platform === 'ios' ?
            { token: idToken }
            : { token: accessToken, accessToken: accessToken }),
    },
})
```

### Scopes & Fields Configuration

```typescript
facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    scopes: ["email", "public_profile", "user_friends"],
    fields: ["user_friends"],
}
```

## Options / Props

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| `clientId` | string | `FACEBOOK_CLIENT_ID` — App ID from Facebook Developer Portal, App Settings > Basic | — |
| `clientSecret` | string | `FACEBOOK_CLIENT_SECRET` — App Secret from Facebook Developer Portal, App Settings > Basic | — |
| `configId` | string | Config ID for Facebook Login for Business apps | — |
| `scopes` | string[] | Access basic account information (overwrites defaults) | `"email"`, `"public_profile"` |
| `fields` | string[] | Extend retrieved user profile fields | `"id"`, `"name"`, `"email"`, `"picture"` |

## Notes

- Security: avoid exposing `clientSecret` in client-side code (e.g., frontend apps) because it's sensitive information
- Redirect URL:
  - Development: `http://localhost:3000/api/auth/callback/facebook`
  - Production: update to your application's domain
- Reference the [Facebook Permissions Documentation](https://developers.facebook.com/docs/permissions) for the complete list of available permissions

## Related

- [Social Providers Common](./social-providers-common.md)
