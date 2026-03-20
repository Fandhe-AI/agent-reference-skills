# Salesforce

## Credentials

- `SALESFORCE_CLIENT_ID` (labeled as "Consumer Key" in Salesforce)
- `SALESFORCE_CLIENT_SECRET` (labeled as "Consumer Secret" in Salesforce)

Obtain from your Salesforce Connected App.

### Environment Variables

Add to `.env.local` (development) or `.env` (production):

```
SALESFORCE_CLIENT_ID=your_consumer_key_here
SALESFORCE_CLIENT_SECRET=your_consumer_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        salesforce: {
            clientId: process.env.SALESFORCE_CLIENT_ID as string,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET as string,
            environment: "production",
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
        provider: "salesforce"
    })
}
```

## リダイレクト URL

Callback URL must match exactly between Salesforce and Better Auth configuration.

## プロバイダー固有の設定・注意点

### Configuration Options

- `environment`: Select `"production"` (default) or `"sandbox"` for testing
- `loginUrl`: Custom My Domain URL without `https://` prefix
- `redirectURI`: Override auto-generated callback URI if needed

### Key Notes

- PKCE is required and automatically handled by the provider
- Default scopes: `openid`, `email`, `profile`, and `id`
- Use HTTPS for production; HTTP acceptable for local development
