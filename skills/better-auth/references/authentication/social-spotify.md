# Spotify

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "spotify"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `SPOTIFY_CLIENT_ID`, obtained from the Spotify Developer Portal |
| `clientSecret` | string | — | `SPOTIFY_CLIENT_SECRET`, obtained from the Spotify Developer Portal |

## Notes

- Set the base URL in `.env`: `BETTER_AUTH_URL=http://127.0.0.1:3000`
- **Important**: Spotify no longer supports `localhost` as a redirect URI — you must use `127.0.0.1` for local development, and browser access must use the matching loopback IP (not `localhost:3000`)
- Set the redirect URL in the Spotify Dashboard to `http://127.0.0.1:3000/api/auth/callback/spotify`
- Redirect URL — development: `http://127.0.0.1:3000/api/auth/callback/spotify` (NOT `localhost`); production: use HTTPS redirect URLs matching your application domain
- Update redirect URLs if changing auth route base paths

## Related

- [Social Providers Common](./social-providers-common.md)
