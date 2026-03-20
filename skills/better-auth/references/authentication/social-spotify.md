# Spotify

## Credentials

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

Obtain from the Spotify Developer Portal.

### Environment Configuration

Set your base URL in `.env`:

```
BETTER_AUTH_URL=http://127.0.0.1:3000
```

**Important Note**: Spotify no longer supports `localhost` as a redirect URI. You must use `127.0.0.1` for local development.

Set the redirect URL in Spotify Dashboard to: `http://127.0.0.1:3000/api/auth/callback/spotify`

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "spotify"
    })
}
```

## リダイレクト URL

- **Development**: `http://127.0.0.1:3000/api/auth/callback/spotify` (NOT `localhost`)
- **Production**: Use HTTPS redirect URLs matching your application domain

## プロバイダー固有の設定・注意点

- Spotify no longer supports `localhost` as a redirect URI; use `127.0.0.1` instead
- Ensure browser access uses matching loopback IP (not `localhost:3000`)
- Update redirect URLs if changing auth route base paths
