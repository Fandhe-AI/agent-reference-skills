# Naver

A South Korean authentication provider.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        naver: {
            clientId: process.env.NAVER_CLIENT_ID as string,
            clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "naver"
    })
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `NAVER_CLIENT_ID`, obtained from the [Naver Developers portal](https://developers.naver.com/) |
| `clientSecret` | string | — | `NAVER_CLIENT_SECRET`, obtained from the [Naver Developers portal](https://developers.naver.com/) |

## Notes

- Redirect URL — development: `http://localhost:3000/api/auth/callback/naver`; production: update to your application's URL
- If you change the base path of the auth routes, update the redirect URL accordingly
- Beyond the basic `clientId`/`clientSecret` configuration, specific scope requests and provider-specific options are not detailed in the official documentation

## Related

- [Social Providers Common](./social-providers-common.md)
