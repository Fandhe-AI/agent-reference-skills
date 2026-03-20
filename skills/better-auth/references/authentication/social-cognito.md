# Cognito (Amazon Cognito)

## Credentials

- `COGNITO_CLIENT_ID`
- `COGNITO_CLIENT_SECRET`
- `COGNITO_DOMAIN`
- `COGNITO_REGION`
- `COGNITO_USERPOOL_ID`

## サーバー設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    cognito: {
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      domain: process.env.COGNITO_DOMAIN as string,
      region: process.env.COGNITO_REGION as string,
      userPoolId: process.env.COGNITO_USERPOOL_ID as string,
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
    provider: "cognito"
  })
}
```

## リダイレクト URL

`http://localhost:3000/api/auth/callback/cognito` (ローカル開発)

## プロバイダー固有の設定・注意点

### Setup Prerequisites

User Pool is required for Cognito authentication. Callback URL must match exactly.

Configuration steps:
1. Create User Pool in AWS Cognito Console
2. Configure App client (note Client ID and Secret)
3. Set Cognito Hosted UI domain
4. Enable OAuth flows: "Authorization code grant"
5. Enable OAuth scopes: "openid", "profile", "email"
6. Add callback URL (e.g., `http://localhost:3000/api/auth/callback/cognito`)

### Scopes

**Common Cognito scopes**:
- `openid`: Required for OpenID Connect
- `profile`: Basic profile information access
- `email`: User email access
- `phone`: Phone number access
- `aws.cognito.signin.user.admin`: Cognito-specific APIs

### Custom Options

- `scope`: Additional OAuth2 scopes (array format)
- `getUserInfo`: Custom function retrieving user information from Cognito UserInfo endpoint

Scopes must be configured in the Cognito App Client settings before use.
