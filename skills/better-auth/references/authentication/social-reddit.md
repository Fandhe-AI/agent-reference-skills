# Reddit

## Credentials

- `REDDIT_CLIENT_ID` - Available under the app name in Reddit Developer Portal
- `REDDIT_CLIENT_SECRET` - Generated when creating the app

### Getting Credentials

1. Navigate to the [Reddit Developer Portal](https://www.reddit.com/prefs/apps)
2. Select "Create App" or "Create Another App"
3. Choose "web app" as the application type
4. Set redirect URL to `http://localhost:3000/api/auth/callback/reddit` (local development) or your production domain (e.g., `https://example.com/api/auth/callback/reddit`)
5. Retrieve the client ID (displayed below app name) and client secret

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
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
        provider: "reddit"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/reddit`
- **Production**: `https://example.com/api/auth/callback/reddit`
- If you change the base path of the auth routes, make sure to update the redirect URL accordingly

## プロバイダー固有の設定・注意点

### Optional Configuration: Scopes and Duration

```typescript
export const auth = betterAuth({
    socialProviders: {
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
            duration: "permanent",
            scope: ["read", "submit"]
        },
    },
})
```

### Available Scopes

- `identity`: Access basic account information
- `read`: Access posts and comments
- `submit`: Submit posts and comments
- `subscribe`: Manage subreddit subscriptions
- `history`: Access voting history

For comprehensive scope options, consult the [Reddit OAuth2 documentation](https://www.reddit.com/dev/api/oauth).
