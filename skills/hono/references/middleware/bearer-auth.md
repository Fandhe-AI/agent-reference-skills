# Bearer Auth Middleware

Validates Bearer tokens in the `Authorization` header. Responds with `401` for missing/invalid tokens and `400` for malformed headers.

## Signature / Usage

```ts
import { bearerAuth } from 'hono/bearer-auth'

app.use('/api/*', bearerAuth({ token: 'honoiscool' }))
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | `string \| string[]` | Yes* | Expected bearer token(s) to validate |
| `verifyToken` | `(token, c) => boolean \| Promise<boolean>` | Yes* | Custom async verification function (replaces `token`) |
| `realm` | `string` | No | Domain name in `WWW-Authenticate` challenge (default: `""`) |
| `prefix` | `string` | No | Authorization header schema identifier (default: `"Bearer"`) |
| `headerName` | `string` | No | Custom header name to check (default: `"Authorization"`) |
| `hashFunction` | `Function` | No | Hashing function for secure token comparison |
| `noAuthenticationHeader` | `object` | No | Custom error response when header is missing |
| `invalidAuthenticationHeader` | `object` | No | Custom error response for malformed headers |
| `invalidToken` | `object` | No | Custom error response for failed token validation |

*Either `token` or `verifyToken` is required.

## Notes

- Token must match the regex `/[A-Za-z0-9._~+/-]+=*/`; tokens failing this pattern trigger a `400` error.
- Base64-encoded JWTs are supported but JWT format is not required.

## Related

- [Basic Auth](./basic-auth.md)
- [JWT](./jwt.md)
