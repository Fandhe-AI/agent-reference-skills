# LinkedIn

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "linkedin"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `LINKEDIN_CLIENT_ID` — obtain from the [LinkedIn Developer Portal](https://www.linkedin.com/developers/) |
| `clientSecret` | string | `LINKEDIN_CLIENT_SECRET` — obtain from the [LinkedIn Developer Portal](https://www.linkedin.com/developers/) |

## Notes

- Redirect URL:
  - Local development: `http://localhost:3000/api/auth/callback/linkedin`
  - Production: update to your application's actual URL
- **Required LinkedIn Product**: you must enable "Sign In with LinkedIn using OpenID Connect" in your LinkedIn Developer Portal under products
- Review the official [Sign In with LinkedIn using OpenID Connect documentation](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2) for implementation details

## Related

- [Social Providers Common](./social-providers-common.md)
