# Figma

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        figma: {
            clientId: process.env.FIGMA_CLIENT_ID as string,
            clientSecret: process.env.FIGMA_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "figma"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `FIGMA_CLIENT_ID` — obtain from [Figma Developer Apps](https://www.figma.com/developers/apps) |
| `clientSecret` | string | `FIGMA_CLIENT_SECRET` — obtain from [Figma Developer Apps](https://www.figma.com/developers/apps) |

## Notes

- Getting credentials:
  1. Sign in to your Figma account
  2. Navigate to the [Developer Apps page](https://www.figma.com/developers/apps)
  3. Click "Create new app"
  4. Complete app details (name, description, etc.)
  5. Configure your redirect URI: `https://yourdomain.com/api/auth/callback/figma`
  6. Copy your Client ID and Client Secret
- Redirect URL: `https://yourdomain.com/api/auth/callback/figma`
- **Default scope**: `current_user:read`
- For additional scopes like `file_content:read`, consult the [Figma OAuth scopes documentation](https://developers.figma.com/docs/rest-api/scopes)
- Ensure your redirect URI matches your application's callback URL exactly
- Reference the [official Figma API documentation](https://www.figma.com/developers/api) for comprehensive OAuth details

## Related

- [Social Providers Common](./social-providers-common.md)
