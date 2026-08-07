# Dropbox

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        dropbox: {
            clientId: process.env.DROPBOX_CLIENT_ID as string,
            clientSecret: process.env.DROPBOX_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "dropbox"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `DROPBOX_CLIENT_ID` — obtain from the [Dropbox Developer Portal](https://www.dropbox.com/developers) |
| `clientSecret` | string | `DROPBOX_CLIENT_SECRET` — obtain from the [Dropbox Developer Portal](https://www.dropbox.com/developers) |

## Notes

- Redirect URL:
  - Development: `http://localhost:3000/api/auth/callback/dropbox`
  - Production: adjust to your application's domain
- **OAuth Flow**: The provider supports "Implicit Grant & PKCE" flow configuration in the Dropbox App Console
- Consult the [official Dropbox OAuth documentation](https://developers.dropbox.com/oauth-guide) for deeper implementation details

## Related

- [Social Providers Common](./social-providers-common.md)
