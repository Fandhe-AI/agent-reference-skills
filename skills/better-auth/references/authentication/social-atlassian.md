# Atlassian

## Credentials

- `ATLASSIAN_CLIENT_ID`
- `ATLASSIAN_CLIENT_SECRET`

Obtain from the [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/).

## サーバー設定

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        atlassian: {
            clientId: process.env.ATLASSIAN_CLIENT_ID as string,
            clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
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
        provider: "atlassian"
    })
}
```

## リダイレクト URL

`https://yourdomain.com/api/auth/callback/atlassian`

Atlassian Developer Console でコールバック URL を設定する。auth ルートのベースパスを変更した場合は、リダイレクト URI も更新する。

## プロバイダー固有の設定・注意点

- **Default scopes**: `read:jira-user` and `offline_access`
- For additional scopes, consult the [Atlassian OAuth 2.0 (3LO) apps documentation](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/)
