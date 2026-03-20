# Facebook

## Credentials

- `FACEBOOK_CLIENT_ID` (App ID from Facebook Developer Portal, App Settings > Basic)
- `FACEBOOK_CLIENT_SECRET` (App Secret from Facebook Developer Portal, App Settings > Basic)

Security Note: Avoid exposing the `clientSecret` in client-side code (e.g., frontend apps) because it's sensitive information.

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/auth-client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "facebook"
    })
}
```

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

## リダイレクト URL

- **Development**: `http://localhost:3000/api/auth/callback/facebook`
- **Production**: Update to your application's domain

## プロバイダー固有の設定・注意点

### Scopes & Fields Configuration

```typescript
facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    scopes: ["email", "public_profile", "user_friends"],
    fields: ["user_friends"],
}
```

| Option | Purpose | Default |
|--------|---------|---------|
| `scopes` | Access basic account information (overwrites defaults) | `"email"`, `"public_profile"` |
| `fields` | Extend retrieved user profile fields | `"id"`, `"name"`, `"email"`, `"picture"` |

Reference the [Facebook Permissions Documentation](https://developers.facebook.com/docs/permissions) for the complete list of available permissions.
