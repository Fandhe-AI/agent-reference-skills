# Google

## Credentials

- `GOOGLE_CLIENT_ID` - OAuth client ID from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - OAuth client secret from Google Cloud Console

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
})
```

**Critical Note**: Setting `baseURL` is mandatory to avoid redirect URI mismatches. Configure via environment variable: `BETTER_AUTH_URL=https://your-domain.com`

## クライアントサインイン

### Basic sign-in

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  })
}
```

### ID token-based sign-in (no redirection)

```typescript
const data = await authClient.signIn.social({
    provider: "google",
    idToken: {
        token: // Google ID Token,
        accessToken: // Google Access Token
    }
})
```

## リダイレクト URL

Google Cloud Console で設定する。

## プロバイダー固有の設定・注意点

### Always prompt account selection

```typescript
google: {
    prompt: "select_account",
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
}
```

### Obtain refresh tokens reliably

```typescript
google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    accessType: "offline",
    prompt: "select_account consent",
}
```

### Additional Scopes Configuration

Request additional scopes after initial signup:

```typescript
const requestGoogleDriveAccess = async () => {
  await authClient.linkSocial({
    provider: "google",
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });
}
```

**Requirement**: Better Auth version 1.2.7 or later prevents "Social account already linked" errors when requesting additional scopes.
