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

### Restrict sign-in to Google Workspace (`hd`)

Set `hd` on the Google provider to require a verified Google Workspace hosted-domain claim. Google also receives this value as an account-selection hint, but Better Auth enforces the returned ID token / profile claim after Google signs the response. Set `hd: "*"` to allow any Workspace hosted domain; tokens with no `hd` claim are rejected whenever `hd` is configured.

```typescript
google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    hd: "company.com",
}
```

A custom `getUserInfo` callback replaces Google's built-in callback-path `hd` check: validate the claim from a trusted provider response and return `null` when it is missing or does not match. Direct ID-token sign-in follows the provider's ID-token verification path, and Google One Tap enforces the configured `hd` separately. To restrict per call, forward `additionalParams: { hd: "example.com" }` on `signIn.social` (resolved per request).

### Cross-platform sign-in (Web, iOS, Android)

Pass an array to `clientId` to accept ID tokens from several platform Client IDs. The array only expands ID token audience verification; the authorization code flow uses the first entry with the single `clientSecret` and `redirectURI`.

```typescript
google: {
    clientId: [
        process.env.GOOGLE_WEB_CLIENT_ID as string,
        process.env.GOOGLE_IOS_CLIENT_ID as string,
        process.env.GOOGLE_ANDROID_CLIENT_ID as string,
    ],
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
}
```

### Disable incremental authorization

By default Better Auth sends `include_granted_scopes=true` to Google's authorization endpoint so new access tokens cover scopes from prior grants. Set `includeGrantedScopes: false` if each OAuth flow should request only its own scopes. Call-time `additionalParams.include_granted_scopes` can still override this provider default for a single flow.

```typescript
google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    includeGrantedScopes: false,
}
```

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
