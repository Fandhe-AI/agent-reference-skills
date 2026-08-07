# Hugging Face

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        huggingface: {
            clientId: process.env.HUGGINGFACE_CLIENT_ID as string,
            clientSecret: process.env.HUGGINGFACE_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "huggingface"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `HUGGINGFACE_CLIENT_ID` — obtain from the [Hugging Face OAuth documentation](https://huggingface.co/docs/hub/oauth) |
| `clientSecret` | string | `HUGGINGFACE_CLIENT_SECRET` — obtain from the [Hugging Face OAuth documentation](https://huggingface.co/docs/hub/oauth) |

## Notes

- Redirect URL:
  - Local development: `http://localhost:3000/api/auth/callback/huggingface`
  - Production: use your application's actual URL
  - If using custom auth route base paths, adjust the callback URL accordingly
- **Required Scope**: ensure the OAuth application includes the "email" scope for proper functionality

## Related

- [Social Providers Common](./social-providers-common.md)
