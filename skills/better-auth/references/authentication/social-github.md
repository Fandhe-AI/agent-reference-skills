# GitHub

## Credentials

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
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
        provider: "github"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/github`
- **Production**: Your application's production URL

GitHub Developer Portal で設定する。

## プロバイダー固有の設定・注意点

### Email Scope Requirement

You MUST include the `user:email` scope in your GitHub app. This is essential for proper functionality.

### GitHub App vs OAuth App Setup

For **GitHub Apps**, enable email reading:
1. Navigate to *Permissions and Events* > *Account Permissions* > *Email Addresses*
2. Select "Read-Only"
3. Save changes

If you encounter an "email_not_found" error, verify you've configured email permissions for GitHub Apps.

### Token Behavior

GitHub does not issue refresh tokens. Access tokens remain valid indefinitely unless the user revokes them, the app revokes them, or they go unused for a year.
