# GitLab

## Signature / Usage

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

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "gitlab"
    })
}
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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `GITLAB_CLIENT_ID` |
| `clientSecret` | string | — | `GITLAB_CLIENT_SECRET` |
| `issuer` | string (optional) | `https://gitlab.com` | `GITLAB_ISSUER` — URL for self-hosted GitLab instances |

## Notes

- Redirect URL:
  - Local development: `http://localhost:3000/api/auth/callback/gitlab`
  - Production: adjust to your application's URL
- The `issuer` parameter enables flexibility for organizations using self-hosted GitLab instances separate from the public GitLab.com service

## Related

- [Social Providers Common](./social-providers-common.md)
