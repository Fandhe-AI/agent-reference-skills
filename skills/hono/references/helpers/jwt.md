# JWT Helper

Sign, verify, and decode JSON Web Tokens (HS256 by default).

## Signature / Usage

```ts
import { sign, verify, decode } from 'hono/jwt'

// Sign
const token = await sign({ sub: 'user123', exp: Math.floor(Date.now() / 1000) + 300 }, 'secret')

// Verify (throws on invalid/expired token)
const payload = await verify(token, 'secret', 'HS256')

// Decode without verification
const { header, payload } = decode(token)
```

## Options / Props

### `sign(payload, secret, alg?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `payload` | `unknown` | Data to encode |
| `secret` | `string` | Signing key |
| `alg` | `string` (optional) | Algorithm; defaults to `'HS256'` |

Returns: `Promise<string>` — signed JWT.

### `verify(token, secret, alg, issuer?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | `string` | JWT to validate |
| `secret` | `string` | Verification key |
| `alg` | `string` | Algorithm used when signing |
| `issuer` | `string \| RegExp` (optional) | Expected `iss` claim |

Returns: `Promise<any>` — decoded payload if valid; throws otherwise.

Validates: `exp`, `nbf`, `iat`, `iss`.

### `decode(token)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | `string` | JWT to decode |

Returns: `{ header: any; payload: any }` — decoded without signature verification.

## Notes

- `decode` does **not** verify the signature; use only for inspection/debugging
- For route-level auth, prefer the `hono/jwt` middleware over calling `verify` manually

## Related

- [Cookie Helper](./cookie.md)
