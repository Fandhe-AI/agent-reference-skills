# Cognito (Amazon Cognito)

## Signature / Usage

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
      identityProvider: "Google", // optional: skip the hosted UI picker
    },
  },
})
```

Override the preselected identity provider per call (for example a "Sign in with Okta" button that bypasses the Cognito picker) through `additionalParams`:

```typescript
await authClient.signIn.social({
  provider: "cognito",
  additionalParams: { identity_provider: "Okta" },
})
```

```typescript
import { createAuthClient } from "better-auth/client"

const authClient = createAuthClient()

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "cognito"
  })
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `clientId` | string | `COGNITO_CLIENT_ID` |
| `clientSecret` | string | `COGNITO_CLIENT_SECRET` |
| `domain` | string | `COGNITO_DOMAIN` — Cognito Hosted UI domain |
| `region` | string | `COGNITO_REGION` |
| `userPoolId` | string | `COGNITO_USERPOOL_ID` |
| `scope` | string[] | Additional OAuth2 scopes |
| `getUserInfo` | function | Custom function retrieving user information from the Cognito UserInfo endpoint |
| `identityProvider` | string | Preselect a Cognito-configured identity provider to skip the hosted-UI picker: `"COGNITO"`, a SAML/OIDC provider name on the User Pool, or `"Google"`, `"Facebook"`, `"LoginWithAmazon"`, `"SignInWithApple"`. Per-call `additionalParams.identity_provider` takes precedence |
| `refreshAccessToken` | function | Custom function to refresh tokens; receives the stored refresh token |

## Notes

- Redirect URL: `http://localhost:3000/api/auth/callback/cognito` (local development)
- **Setup Prerequisites**: A User Pool is required for Cognito authentication. The callback URL must match exactly.
  1. Create User Pool in AWS Cognito Console
  2. Configure App client (note Client ID and Secret)
  3. Set Cognito Hosted UI domain
  4. Enable OAuth flows: "Authorization code grant"
  5. Enable OAuth scopes: `openid`, `profile`, `email`
  6. Add callback URL (e.g., `http://localhost:3000/api/auth/callback/cognito`)
- **Common Cognito scopes**: `openid` (required for OpenID Connect), `profile` (basic profile information access), `email` (user email access), `phone` (phone number access), `aws.cognito.signin.user.admin` (Cognito-specific APIs)
- Scopes must be configured in the Cognito App Client settings before use
- Refresh tokens: Cognito returns a refresh token after a successful authorization code grant; later refresh-token grants return new access and ID tokens. Cognito only returns a new refresh token when refresh token rotation is enabled in the app client; otherwise the original refresh token remains valid and Better Auth keeps using it. `auth.api.getAccessToken` refreshes an expired access token automatically when the account has a refresh token and a known `accessTokenExpiresAt` (returns the access and ID tokens); use the `/refresh-token` endpoint if you need the refresh token in the response.

## Related

- [Social Providers Common](./social-providers-common.md)
