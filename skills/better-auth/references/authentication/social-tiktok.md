# TikTok

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        tiktok: {
            clientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
            clientKey: process.env.TIKTOK_CLIENT_KEY as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "tiktok"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientKey` | string | — | `TIKTOK_CLIENT_KEY`, OAuth application identifier, obtained from the [TikTok Developer Portal](https://developers.tiktok.com/apps) |
| `clientSecret` | string | — | `TIKTOK_CLIENT_SECRET`, OAuth application secret, obtained from the [TikTok Developer Portal](https://developers.tiktok.com/apps) |

## Notes

- TikTok uses `clientKey` instead of `clientId` for its OAuth application identifier
- Redirect URL must be HTTPS and configured in developer settings; update it if auth route base paths change
- **HTTPS requirement**: the TikTok API does not work with `localhost` — use public domains or tools like NGROK for local testing
- **Sandbox mode**: required for testing, enable via the TikTok Developer Portal
- **Default scope**: `user.info.profile`; for additional scopes see TikTok's Available Scopes documentation
- **Email limitation**: the TikTok API does not provide email addresses. Better Auth uses the user's stable `open_id` to create a non-routable `{open_id}@tiktok.placeholder.invalid` address (1.6 docs: the username served as the email field)
- **Production**: requires TikTok approval for requested scopes

## Related

- [Social Providers Common](./social-providers-common.md)
