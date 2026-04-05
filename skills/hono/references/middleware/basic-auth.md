# Basic Auth Middleware

Adds HTTP Basic Authentication to routes. Responds with `401` when credentials are invalid.

## Signature / Usage

```ts
import { basicAuth } from 'hono/basic-auth'

app.use('/auth/*', basicAuth({ username: 'hono', password: 'acoolproject' }))
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | Authenticating user's username |
| `password` | `string` | Yes | Password for the provided username |
| `realm` | `string` | No | Domain name for `WWW-Authenticate` header (default: `"Secure Area"`) |
| `hashFunction` | `Function` | No | Custom password hashing function for secure comparison |
| `verifyUser` | `(username, password, c) => boolean \| Promise<boolean>` | No | Custom verification logic (replaces username/password check) |
| `invalidUserMessage` | `string \| object \| MessageFunction` | No | Custom response body when authentication fails |
| `onAuthSuccess` | `(c, username) => void \| Promise<void>` | No | Callback invoked after successful authentication |

## Notes

- Multiple users: pass additional `{ username, password }` objects as extra arguments after the first config object.
- When using `verifyUser`, the `username` and `password` fields are not required.

## Related

- [Bearer Auth](./bearer-auth.md)
- [JWT](./jwt.md)
