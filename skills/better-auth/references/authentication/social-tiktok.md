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
- **Default scope**: `user.info.profile` (required because TikTok doesn't provide emails; the username serves as the email field)
- **Production**: requires TikTok approval for requested scopes

## Related

- [Social Providers Common](./social-providers-common.md)
