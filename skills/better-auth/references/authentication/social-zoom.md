# Zoom

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  socialProviders: {
    zoom: {
      clientId: process.env.ZOOM_CLIENT_ID as string,
      clientSecret: process.env.ZOOM_CLIENT_SECRET as string,
    },
  },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "zoom"
  })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `ZOOM_CLIENT_ID`, retrieved from "App Credentials" in the Zoom app |
| `clientSecret` | string | — | `ZOOM_CLIENT_SECRET`, retrieved from "App Credentials" in the Zoom app |

## Notes

- Setup: visit [Zoom Marketplace](https://marketplace.zoom.us), hover on `Develop` and select `Build App`, select `General App` and click `Create`, choose `User-managed` under "Select how the app is managed," then copy `Client ID` and `Client Secret` from "App Credentials"
- Set the OAuth Redirect URL in the Zoom app settings under "OAuth Information" > "OAuth Redirect URL" — development: `http://localhost:3000/api/auth/callback/zoom`; production: update to your application's actual URL. Adjust the path if you've customized your auth route base path
- Minimum required scope: `user:read:user` (View a user). Add any additional scopes your application needs through the Zoom app dashboard

## Related

- [Social Providers Common](./social-providers-common.md)
