# JWK Middleware

Validates JWTs using JSON Web Keys (JWK). Fetches public keys from a JWKS endpoint or accepts them directly.

## Signature / Usage

```ts
import { jwk } from 'hono/jwk'

app.use('/auth/*', jwk({
  jwks_uri: 'https://backend/.well-known/jwks.json',
  alg: ['RS256'],
}))

// Retrieve payload in handler
app.get('/auth/page', (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload)
})
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `alg` | `AsymmetricAlgorithm[]` | Yes | Allowed asymmetric algorithms (`RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, `ES384`, `ES512`, `EdDSA`) |
| `keys` | `HonoJsonWebKey[] \| (c) => Promise<HonoJsonWebKey[]>` | No* | Public keys or function returning them |
| `jwks_uri` | `string \| (c) => Promise<string>` | No* | URI to fetch JWKs; supports dynamic resolution via Context |
| `allow_anon` | `boolean` | No | Permit unauthenticated requests (default: `false`) |
| `cookie` | `string` | No | Cookie key to extract token from instead of header |
| `headerName` | `string` | No | Header name for JWT (default: `Authorization`) |
| `verification` | `VerifyOptions` | No | Claim validation config (`iss`, `aud`, `exp`, `nbf`, `iat`) |

*Either `keys` or `jwks_uri` is required.

## Notes

- Symmetric algorithms are rejected; only asymmetric algorithms are allowed.
- Requires a `kid` header in the JWT matching one of the provided keys.
- Time-based claims (`nbf`, `exp`, `iat`) are validated by default.
- The `Authorization` header must include a scheme, e.g. `Bearer <token>`.
- Pass a second `RequestInit` argument to `jwk()` to configure the JWKS fetch request (e.g. custom headers).

## Related

- [JWT](./jwt.md)
- [Bearer Auth](./bearer-auth.md)
