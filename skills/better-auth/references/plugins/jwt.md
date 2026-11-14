# JWT

The JWT plugin enables authenticating users with JWT tokens for services that cannot use sessions. It provides an endpoint to obtain a JWT token and a JWKS endpoint for token verification.

Not a replacement for sessions — use it for services that require JWT tokens.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        jwt(),
    ]
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        jwtClient()
    ]
})
```

### Get token (client)

```typescript
const { data, error } = await authClient.token()
if (data) {
    const jwtToken = data.token
}
```

### HTTP endpoint

`GET /api/auth/token`

Response: `{ "token": "ey..." }`

### Via session header

```typescript
await authClient.getSession({
    fetchOptions: {
        onSuccess: (ctx) => {
            const jwt = ctx.response.headers.get("set-auth-jwt")
        }
    }
})
```

### JWKS endpoint

`GET /api/auth/jwks`

```json
{
    "keys": [{
        "crv": "Ed25519",
        "x": "bDHiLTt7u-VIU7rfmcltcFhaHKLVvWFy-_csKZARUEU",
        "kty": "OKP",
        "kid": "c5c7995d-0037-4553-8aee-b5b620b89b23"
    }]
}
```

### Token verification (remote JWKS, using Jose)

```typescript
import { jwtVerify, createRemoteJWKSet } from 'jose'

async function validateToken(token: string) {
    const JWKS = createRemoteJWKSet(
        new URL('http://localhost:3000/api/auth/jwks')
    )
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
    })
    return payload
}
```

### Token verification (local JWKS)

```typescript
import { jwtVerify, createLocalJWKSet } from 'jose'

async function validateToken(token: string) {
    const storedJWKS = { keys: [{ /* JWKS from /api/auth/jwks */ }] }
    const JWKS = createLocalJWKSet(storedJWKS)
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
    })
    return payload
}
```

### Session cookie cache

Set `sessionCookieCache` to `true` to sign JWT session cookie cache values with the plugin's locally managed keys. This requires `session.cookieCache.strategy` to be `"jwt"`.

```typescript
jwt({
    sessionCookieCache: true
})
```

The `/token` endpoint and `set-auth-jwt` header produce JWKS-verifiable JWTs for external services and are separate from Better Auth's primary `session_token` cookie. With `session.cookieCache.strategy = "jwt"`, the `session_data` cookie still uses HS256 with your Better Auth secret by default; `sessionCookieCache: true` makes that cookie-cache JWT verifiable with the plugin's JWKS too.

### Algorithm selection

```typescript
jwt({
    jwks: {
        keyPairConfig: {
            alg: "EdDSA",
            crv: "Ed25519"
        }
    }
})
```

### Private key encryption

```typescript
jwt({
    jwks: {
        disablePrivateKeyEncryption: true  // default: false (AES256 GCM)
    }
})
```

### Key rotation

```typescript
jwt({
    jwks: {
        rotationInterval: 60 * 60 * 24 * 30,  // 30 days (seconds)
        gracePeriod: 60 * 60 * 24 * 30         // 30 days (seconds)
    }
})
```

### Modifying the JWT payload

```typescript
jwt({
    jwt: {
        definePayload: ({ user }) => ({
            id: user.id,
            email: user.email,
            role: user.role
        })
    }
})
```

### Issuer, Audience, Subject, Expiration

```typescript
jwt({
    jwt: {
        issuer: "https://example.com",
        audience: "https://example.com",
        expirationTime: "1h",
        getSubject: (session) => session.user.email  // default: user id
    }
})
```

Default: BASE_URL is used for issuer and audience. Default expiration is 15 minutes. Without a configured `baseURL`, direct `auth.api` calls have no issuer or audience to use and the plugin logs a warning; set `baseURL`, or set `issuer` and `audience` here.

### Custom JWKS path

```typescript
// Server
jwt({ jwks: { jwksPath: "/.well-known/jwks.json" } })

// Client (must match the server)
jwtClient({ jwks: { jwksPath: "/.well-known/jwks.json" } })
```

### OAuth Provider Mode

When you use the OAuth Provider or MCP plugin, disable both ways the JWT plugin hands session JWTs to the browser: the `/token` endpoint and the `set-auth-jwt` header. OAuth clients get tokens from `/oauth2/token` and claims from `/oauth2/userinfo`, so they need neither.

Session JWTs are signed with the same keys as OAuth access tokens, and by default carry the auth server's URL as both `iss` and `aud`. A resource server that checks only signature, issuer, and audience can therefore accept a signed-in user's session JWT as an access token, without any client, consent, or scope. Disabling both paths removes that token from the browser. Resource servers should also reject tokens that are not OAuth access tokens (see the OAuth Provider resource-server docs, "Protect your API").

```typescript
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

betterAuth({
  disabledPaths: [
    "/token",
  ],
  plugins: [jwt({
    disableSettingJwtHeader: true,
  })]
})
```

### Remote JWKS URL

```typescript
jwt({
    jwks: {
        remoteUrl: "https://example.com/.well-known/jwks.json",
        keyPairConfig: { alg: 'ES256' },
    }
})
```

### Custom signing

```typescript
jwt({
    jwks: {
        remoteUrl: "https://example.com/.well-known/jwks.json",
        keyPairConfig: { alg: 'EdDSA' },
    },
    jwt: {
        sign: async (jwtPayload) => {
            return await new SignJWT(jwtPayload)
                .setProtectedHeader({ alg: "EdDSA", kid: process.env.currentKid, typ: "JWT" })
                .sign(process.env.clientPrivateKey)
        },
    },
})
```

### Custom adapter

```typescript
jwt({
    adapter: {
        getJwks: async (ctx) => await yourCustomStorage.getAllKeys(),
        createJwk: async (ctx, webKey) => await yourCustomStorage.createKey(webKey)
    }
})
```

## Options / Props

| Algorithm | Curve/options | Default |
|---|---|---|
| EdDSA | crv: Ed25519, Ed448 | Ed25519 |
| ES256 | N/A | - |
| ES512 | N/A | - |
| RS256 | modulusLength (number) | 2048 |
| PS256 | modulusLength (number) | 2048 |
| ECDH-ES | crv: P-256, P-384, P-521 | P-256 |

## Notes

- The private key is encrypted with AES256 GCM by default. Keeping encryption enabled is recommended for security
- JWKS is cached indefinitely and only refreshed when the key ID (kid) differs
- When used with the OAuth Provider or MCP plugin, disable the `/token` endpoint (`disabledPaths: ["/token"]`) and set `disableSettingJwtHeader: true`; otherwise a session JWT can be accepted by a resource server as an access token (see OAuth Provider Mode)
- Source: https://www.better-auth.com/docs/plugins/jwt (better-auth v1.7.23 docs)

### DB schema

jwks table:

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| publicKey | string | - | Public part of the Web Key |
| privateKey | string | - | Private part of the Web Key |
| alg | string | ? | The JWS algorithm this web key signs with |
| crv | string | ? | The elliptic curve this web key was generated on |
| createdAt | Date | - | Creation timestamp |
| expiresAt | Date | ? | Expiration date |
- Local verification calls `createLocalJWKSet(storedJWKS)` with the JWKS object itself; the official sample read `storedJWKS.data?.keys`, which does not exist on a plain JWKS (Adapted from the official docs)
- The RSA algorithm identifier is `RS256` (JOSE); `RSA256` is not a valid `alg` value (Adapted from the official docs)

## Related

- [oauth-provider.md](./oauth-provider.md)
- [oidc-provider.md](./oidc-provider.md)
