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
    const JWKS = createLocalJWKSet({ keys: storedJWKS.data?.keys! })
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
    })
    return payload
}
```

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

Default: BASE_URL is used for issuer and audience. Default expiration is 15 minutes.

### Custom JWKS path

```typescript
// Server
jwt({ jwks: { jwksPath: "/.well-known/jwks.json" } })

// Client (must match the server)
jwtClient({ jwks: { jwksPath: "/.well-known/jwks.json" } })
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
| RSA256 | modulusLength (number) | 2048 |
| PS256 | modulusLength (number) | 2048 |
| ECDH-ES | crv: P-256, P-384, P-521 | P-256 |

## Notes

- The private key is encrypted with AES256 GCM by default. Keeping encryption enabled is recommended for security
- JWKS is cached indefinitely and only refreshed when the key ID (kid) differs
- When used with OAuth Provider mode, disable the `/token` endpoint and set `disableSettingJwtHeader: true`

### DB schema

jwks table:

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| publicKey | string | - | Public part of the Web Key |
| privateKey | string | - | Private part of the Web Key |
| createdAt | Date | - | Creation timestamp |
| expiresAt | Date | ? | Expiration date |

## Related

- [oauth-provider.md](./oauth-provider.md)
- [oidc-provider.md](./oidc-provider.md)
