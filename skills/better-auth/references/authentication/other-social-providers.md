# Other Social Providers (Generic OAuth)

Better Auth supports any social provider that implements OAuth 2.0 or OpenID Connect (OIDC) through the Generic OAuth Plugin. You can use a built-in provider helper, install a community provider helper, or configure a provider manually.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "provider-id",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          discoveryUrl: "https://auth.example.com/.well-known/openid-configuration"
        }
      ]
    })
  ]
})
```

No client plugin is required; create the client with `createAuthClient()` and sign in with `authClient.signIn.social({ provider: "provider-id" })`.

### Provider Helpers

Provider helpers package provider-specific endpoints, scopes, and profile mapping as reusable `GenericOAuthConfig` factories.

#### Built-in Provider Helpers

Auth0 `auth0(options)`, Gumroad `gumroad(options)`, HubSpot `hubspot(options)`, Keycloak `keycloak(options)`, LINE `line(options)`, Microsoft Entra ID (Azure AD) `microsoftEntraId(options)`, Okta `okta(options)`, Patreon `patreon(options)`, Slack `slack(options)`, Yandex `yandex(options)`.

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth, slack } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        slack({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
      ],
    }),
  ],
})
```

```typescript
const response = await authClient.signIn.social({
  provider: "slack",
  callbackURL: "/dashboard",
})
```

Provider-specific fields: Auth0 requires `domain` (e.g. `dev-xxx.eu.auth0.com`); HubSpot accepts optional `scopes` (default `["oauth"]`); Keycloak requires `issuer` (e.g. `https://my-domain/realms/MyRealm`); LINE accepts an optional `providerId` (call `line()` with different provider IDs and credentials for country-specific channels); Microsoft Entra ID requires a concrete tenant GUID (use the built-in Microsoft social provider for `"common"`, `"organizations"`, `"consumers"`); Okta requires `issuer` (e.g. `https://dev-xxxxx.okta.com/oauth2/default`).

#### Community Provider Helpers

Provider authors and community maintainers can publish reusable helpers returning a typed `GenericOAuthConfig`. They are not official or verified by the Better Auth team; review their source before use.

| Provider | Package | Repository |
| --- | --- | --- |
| AgentID | `@agentmail/agentid-better-auth` | agentmail-to/agentid-better-auth |
| EVE Online | `@localisprimary/better-auth-eve-online` | localisprimary/better-auth-eve-online |
| ThunderID | `@thunderid/better-auth` | thunder-id/javascript-sdks (packages/better-auth) |

#### Create a Provider Helper

A helper accepts credentials and provider-specific options, then returns a `GenericOAuthConfig`.

```typescript
import type { BaseOAuthProviderOptions, GenericOAuthConfig } from "better-auth/plugins/generic-oauth";

export interface ExampleOptions extends BaseOAuthProviderOptions {}

export function example(options: ExampleOptions): GenericOAuthConfig<"example"> {
  return {
    providerId: "example",
    discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    tokenEndpointAuth: options.tokenEndpointAuth,
    scopes: options.scopes ?? ["openid", "email", "profile"],
    redirectURI: options.redirectURI,
  };
}
```

Users install the helper and pass it to `genericOAuth({ config: [example({ clientId, clientSecret })] })`.

### Configure a Provider Manually

For a provider without a helper, configure it manually (Instagram example):

```typescript
genericOAuth({
  config: [
    {
      providerId: "instagram",
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
      authorizationUrl: "https://api.instagram.com/oauth/authorize",
      tokenUrl: "https://api.instagram.com/oauth/access_token",
      scopes: ["user_profile", "user_media"],
    },
  ],
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `providerId` | string | Identifier used for `signIn.social({ provider })` |
| `clientId` | string | OAuth client ID |
| `clientSecret` | string | OAuth client secret |
| `discoveryUrl` | string | OpenID Connect discovery document URL |

All helpers accept the common `BaseOAuthProviderOptions`: `clientId`, `clientSecret`, `tokenEndpointAuth`, `scopes`, `redirectURI`, `pkce`, `disableImplicitSignUp`, `disableSignUp`, `overrideUserInfo`, `endSessionEndpoint`, `postLogoutRedirectURI`, `disableProviderLogout`.

### Manual Configuration Examples

| Provider | Env vars | Auth URL | Token URL | Scopes |
| --- | --- | --- | --- | --- |
| Instagram | `INSTAGRAM_CLIENT_ID`, `INSTAGRAM_CLIENT_SECRET` | `https://api.instagram.com/oauth/authorize` | `https://api.instagram.com/oauth/access_token` | `user_profile`, `user_media` |
| Coinbase | `COINBASE_CLIENT_ID`, `COINBASE_CLIENT_SECRET` | `https://www.coinbase.com/oauth/authorize` | `https://api.coinbase.com/oauth/token` | `wallet:user:read` |

## Notes

- Changed in 1.7: providers use the standard social flow. `authClient.signIn.oauth2({ providerId })` is replaced by `authClient.signIn.social({ provider })` and `genericOAuthClient()` is no longer needed.
- Both Instagram and Coinbase follow identical manual configuration and sign-in patterns.
- To share a provider helper with the community, see the contribution guidelines (reference contributing, "Social Provider Integrations").

## Related

- [Social Providers Common](./social-providers-common.md)
