# OAuth Provider

The OAuth 2.1 Provider plugin turns a Better Auth server into an OAuth 2.1-compliant authorization provider. It offers OIDC compatibility, dynamic client registration, JWT/JWKS integration, and MCP support.

Supported grant types: `authorization_code` (PKCE S256 required), `refresh_token` (offline_access scope), `client_credentials` (M2M)

## Signature / Usage

### Installation

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { oauthProvider } from "@better-auth/oauth-provider"

const auth = betterAuth({
    disabledPaths: ["/token"],
    plugins: [
        jwt(),
        oauthProvider({
            loginPage: "/sign-in",
            consentPage: "/consent",
        })
    ],
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Well-Known endpoints

OpenID Configuration (`/.well-known/openid-configuration/route.ts`):

```typescript
import { oauthProviderOpenIdConfigMetadata } from "@better-auth/oauth-provider"
import { auth } from "@/lib/auth"
export const GET = oauthProviderOpenIdConfigMetadata(auth)
```

OAuth Authorization Server (`/.well-known/oauth-authorization-server/[issuer-path]/route.ts`):

```typescript
import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider"
import { auth } from "@/lib/auth"
export const GET = oauthProviderAuthServerMetadata(auth)
```

### Client side

```typescript
import { createAuthClient } from "better-auth/client"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"

export const authClient = createAuthClient({
    plugins: [oauthProviderClient()],
})
```

### Resource server client

```typescript
import { auth } from "@/lib/auth"
import { createAuthClient } from "better-auth/client"
import { oauthProviderResourceClient } from "@better-auth/oauth-provider/resource-client"

export const serverClient = createAuthClient({
    plugins: [oauthProviderResourceClient(auth)],
})
```

### OAuth client management

- `authClient.oauth2.getClient({ query: { client_id } })` - get a client
- `authClient.oauth2.publicClient({ query: { client_id } })` - get public client info
- `authClient.oauth2.getClients()` - list clients
- `authClient.oauth2.createClient({ redirect_uris: [...] })` - create a client
- `auth.api.adminCreateOAuthClient(...)` - create a client as admin
- `authClient.oauth2.updateClient({ client_id, update })` - update
- `authClient.oauth2.client.rotateSecret({ client_id })` - rotate secret
- `authClient.oauth2.deleteClient({ client_id })` - delete

### Consent management

- `authClient.oauth2.consent({ accept, scope })` - accept/reject consent
- `authClient.oauth2.getConsent({ query: { id } })` - get consent
- `authClient.oauth2.getConsents()` - list consents
- `authClient.oauth2.deleteConsent({ id })` - revoke consent

### Dynamic client registration

```typescript
oauthProvider({
    allowDynamicClientRegistration: true,
    allowUnauthenticatedClientRegistration: true,
})

const client = await authClient.oauth2.register({
    client_name: "My Client",
    redirect_uris: ["https://client.example.com/callback"],
})
```

### Token verification

```typescript
import { verifyAccessToken } from "better-auth/oauth2"

const payload = await verifyAccessToken(accessToken, {
    verifyOptions: {
        issuer: "https://auth.example.com",
        audience: "https://api.example.com",
    },
    scopes: ["read:post"],
})
```

### MCP integration

```typescript
import { mcpHandler } from "@better-auth/oauth-provider"

const handler = mcpHandler({
    jwksUrl: "https://auth.example.com/api/auth/jwks",
    verifyOptions: { issuer: "https://auth.example.com", audience: "https://api.example.com" },
}, (req, jwt) => {
    return createMcpHandler(/* ... */)(req)
})
```

## Options / Props

### Redirect screens

```typescript
oauthProvider({
    loginPage: "/sign-in",
    consentPage: "/consent",
    signUp: { page: "/sign-up", shouldRedirect: async ({ headers }) => { ... } },
    selectAccount: { page: "/select-account", shouldRedirect: async ({ headers }) => { ... } },
    postLogin: { page: "/select-organization", shouldRedirect: async ({ session, scopes, headers }) => { ... } },
})
```

### Expiration

```typescript
oauthProvider({
    accessTokenExpiresIn: "1h",
    m2mAccessTokenExpiresIn: "1h",
    idTokenExpiresIn: "10h",
    refreshTokenExpiresIn: "30d",
    codeExpiresIn: "10m",
    scopeExpirations: { "write:payments": "5m" },
})
```

### Scopes and claims

```typescript
oauthProvider({
    scopes: ["openid", "profile", "offline_access", "read:post"],
    customIdTokenClaims: ({ user, scopes, metadata }) => ({ locale: "en-GB" }),
    customAccessTokenClaims: ({ user, scopes, referenceId }) => ({ ... }),
    customUserInfoClaims: ({ user, scopes, jwt }) => ({ ... }),
})
```

### Storage

```typescript
oauthProvider({
    storeClientSecret: "hashed", // "encrypted" | "plain"
    storeTokens: "hashed",
})
```

### Rate limiting

```typescript
oauthProvider({
    rateLimit: {
        token: { window: 60, max: 20 },
        authorize: { window: 60, max: 30 },
        introspect: { window: 60, max: 100 },
        revoke: { window: 60, max: 30 },
        register: { window: 60, max: 5 },
        userinfo: { window: 60, max: 60 },
    },
})
```

### Pairwise Subject Identifiers

```typescript
oauthProvider({ pairwiseSecret: "your-256-bit-secret" })
```

Provides a unique, unlinkable `sub` per client (correlation prevention).

### DB schema (oauthClient)

Key fields: `id`, `clientId`, `clientSecret?`, `disabled?`, `skipConsent?`, `enableEndSession?`, `subjectType?`, `scopes?`, `userId?`, `referenceId?`, `redirectUris`, `tokenEndpointAuthMethod?`, `grantTypes?`, `responseTypes?`, `public?`, `requirePKCE?`, `metadata?`

### DB schema (oauthRefreshToken)

`id`, `token`, `clientId`, `sessionId?`, `userId`, `referenceId?`, `scopes`, `revoked?`, `authTime?`, `createdAt`, `expiresAt`

### DB schema (oauthAccessToken)

`id`, `token`, `clientId`, `sessionId?`, `refreshId?`, `userId?`, `referenceId?`, `scopes`, `createdAt`, `expiresAt`

### DB schema (oauthConsent)

`id`, `userId`, `clientId`, `referenceId?`, `scopes`, `createdAt`, `updatedAt`

## Notes

- PKCE is required by default (OAuth 2.1). It can only be disabled for legacy confidential clients
- Client secrets are hashed by default and shown only once
- Refresh tokens are rotated on every refresh request
- `disableJwtPlugin: true` switches to opaque-access-token-only mode
- A migration guide from the OIDC Provider plugin is available (including schema changes)

## Related

- [mcp.md](./mcp.md)
- [oidc-provider.md](./oidc-provider.md)
- [jwt.md](./jwt.md)
