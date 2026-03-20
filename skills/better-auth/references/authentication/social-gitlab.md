# GitLab

## Credentials

- `GITLAB_CLIENT_ID`
- `GITLAB_CLIENT_SECRET`
- `GITLAB_ISSUER` (Optional) - URL for self-hosted GitLab instances; defaults to `"https://gitlab.com"`

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        gitlab: {
            clientId: process.env.GITLAB_CLIENT_ID as string,
            clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
            issuer: process.env.GITLAB_ISSUER as string,
        },
    },
})
```

### Self-Hosted GitLab Configuration

```typescript
export const auth = betterAuth({
    socialProviders: {
        gitlab: {
            clientId: process.env.GITLAB_CLIENT_ID as string,
            clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
            issuer: "https://gitlab.company.com",
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
        provider: "gitlab"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/gitlab`
- **Production**: Adjust to your application's URL

## プロバイダー固有の設定・注意点

- The `issuer` parameter enables flexibility for organizations using self-hosted GitLab instances separate from the public GitLab.com service
