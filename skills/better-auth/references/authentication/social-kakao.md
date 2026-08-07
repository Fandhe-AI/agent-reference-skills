# Kakao

A social authentication provider for East Asian users, particularly popular in South Korea.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        kakao: {
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "kakao"
    })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `KAKAO_CLIENT_ID` — obtain from the [Kakao Developer Portal](https://developers.kakao.com) |
| `clientSecret` | string | `KAKAO_CLIENT_SECRET` — obtain from the [Kakao Developer Portal](https://developers.kakao.com) |

## Notes

- Redirect URL, configured in the Kakao Developer Portal:
  - Local development: `http://localhost:3000/api/auth/callback/kakao`
  - Production: update to your application's actual domain
- **Default Scopes**: `account_email`, `profile_image`, `profile_nickname`
- **Email Access Requirement**: retrieving `account_email` requires your application to be a "Biz App" — an app that has completed business verification through Kakao. Standard apps may not access verified email addresses without completing this process. For scope details, consult the [Kakao Login scopes documentation](https://developers.kakao.com/docs/latest/kakaologin/utilize#scope-user).

## Related

- [Social Providers Common](./social-providers-common.md)
