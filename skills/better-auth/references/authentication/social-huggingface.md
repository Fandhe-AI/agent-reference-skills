# Hugging Face

## Credentials

- `HUGGINGFACE_CLIENT_ID`
- `HUGGINGFACE_CLIENT_SECRET`

Obtain from the [Hugging Face OAuth documentation](https://huggingface.co/docs/hub/oauth).

## サーバー設定

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

## クライアントサインイン

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "huggingface"
    })
}
```

## リダイレクト URL

- **Local development**: `http://localhost:3000/api/auth/callback/huggingface`
- **Production**: Use your application's actual URL
- If using custom auth route base paths, adjust the callback URL accordingly

## プロバイダー固有の設定・注意点

- **Required Scope**: Ensure the OAuth application includes the "email" scope for proper functionality
