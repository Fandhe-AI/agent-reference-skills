# Salesforce

## Signature / Usage

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

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "salesforce"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `SALESFORCE_CLIENT_ID`, labeled "Consumer Key" in Salesforce, obtained from your Salesforce Connected App |
| `clientSecret` | string | — | `SALESFORCE_CLIENT_SECRET`, labeled "Consumer Secret" in Salesforce, obtained from your Salesforce Connected App |
| `environment` | `'production' \| 'sandbox'` | `"production"` | Select `"sandbox"` for testing |
| `loginUrl` | string | — | Custom My Domain URL without the `https://` prefix |
| `redirectURI` | string | — | Override the auto-generated callback URI if needed |

## Notes

- Environment variables (add to `.env.local` for development or `.env` for production):
  ```
  SALESFORCE_CLIENT_ID=your_consumer_key_here
  SALESFORCE_CLIENT_SECRET=your_consumer_secret_here
  BETTER_AUTH_URL=http://localhost:3000
  ```
- The callback URL must match exactly between Salesforce and the Better Auth configuration
- PKCE is required and automatically handled by the provider
- Default scopes: `openid`, `email`, `profile`, and `id`
- Use HTTPS for production; HTTP is acceptable for local development

## Related

- [Social Providers Common](./social-providers-common.md)
