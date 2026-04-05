# JWT Middleware

Validates JSON Web Tokens from the `Authorization` header. Stores the decoded payload in context via `c.get('jwtPayload')`.

## Signature / Usage

```ts
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'

type Env = { Variables: JwtVariables }

const app = new Hono<Env>()
app.use('/api/*', jwt({ secret: 'it-is-very-secret' }))
app.get('/api/page', (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload)
})
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secret` | `string` | Yes | Secret key for token verification |
| `alg` | `string` | No | Signing algorithm (default: `HS256`). Supported: `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, `ES384`, `ES512`, `EdDSA` |
| `cookie` | `string` | No | Cookie key to retrieve the JWT from instead of the header |
| `headerName` | `string` | No | Custom header name (default: `Authorization`) |
| `verifyOptions.iss` | `string \| RegExp` | No | Expected issuer |
| `verifyOptions.nbf` | `boolean` | No | Verify "not before" claim (default: `true`) |
| `verifyOptions.iat` | `boolean` | No | Verify "issued at" claim (default: `true`) |
| `verifyOptions.exp` | `boolean` | No | Verify expiration time (default: `true`) |

## Notes

- The `Authorization` header must include a scheme, e.g. `Bearer <token>`.
- For dynamic secrets (e.g. from `c.env`), wrap the middleware in a custom handler function.

## Related

- [Bearer Auth](./bearer-auth.md)
- [JWK](./jwk.md)
