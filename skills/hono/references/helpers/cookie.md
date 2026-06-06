# Cookie Helper

Read, write, and delete HTTP cookies with optional cookie prefixes.

## Signature / Usage

```ts
import {
  getCookie, setCookie, deleteCookie,
  getSignedCookie, setSignedCookie,
  generateCookie, generateSignedCookie,
} from 'hono/cookie'

app.get('/', (c) => {
  const all = getCookie(c)                          // all cookies
  const value = getCookie(c, 'name')                // single cookie
  const secure = getCookie(c, 'name', 'secure')     // with prefix

  setCookie(c, 'session', 'abc123', {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 3600,
    sameSite: 'Lax',
  })

  const deleted = deleteCookie(c, 'session', { path: '/' })
})
```

## Options / Props

### `getCookie(c, name?, prefix?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `c` | `Context` | Hono context |
| `name` | `string` (optional) | Cookie name; omit to get all cookies |
| `prefix` | `'secure' \| 'host'` (optional) | Cookie prefix for security attributes |

Returns: `string` (single cookie) or `Record<string, string>` (all cookies).

### `setCookie(c, name, value, options?)`

| Option | Type | Description |
|--------|------|-------------|
| `domain` | `string` | Cookie domain |
| `expires` | `Date` | Expiry date |
| `httpOnly` | `boolean` | HTTP-only flag |
| `maxAge` | `number` | Max age in seconds (must be ≤ 400 days) |
| `path` | `string` | Cookie path |
| `secure` | `boolean` | Secure flag |
| `sameSite` | `'Strict' \| 'Lax' \| 'None'` | SameSite policy |
| `priority` | `'Low' \| 'Medium' \| 'High'` | Cookie priority |
| `prefix` | `'secure' \| 'host'` | Cookie prefix |
| `partitioned` | `boolean` | Partitioned (CHIPS) attribute |

### `deleteCookie(c, name, options?)`

Options: `path`, `secure`, `domain`. Returns the deleted cookie value.

### `getSignedCookie(c, secret, name?, prefix?)` / `setSignedCookie(c, name, value, secret, options?)`

Signed cookies use HMAC SHA-256. `getSignedCookie` returns `false` if the signature was tampered with.

```ts
await setSignedCookie(c, 'user', 'alice', 'mysecret', { httpOnly: true })
const user = await getSignedCookie(c, 'mysecret', 'user')
// returns false if tampered
```

### `generateCookie(name, value, options?)` / `generateSignedCookie(name, value, secret, options?)`

Generate cookie strings without setting them in response headers. Useful for constructing `Set-Cookie` headers manually.

```ts
const cookieStr = generateCookie('session', 'abc123', { httpOnly: true })
const signedStr = await generateSignedCookie('session', 'abc123', 'secret')
```

## Notes

- `maxAge` values greater than 400 days will throw an error per RFC best practices
- `sameSite` and `priority` options are validated against their allowed values; invalid values throw a `TypeError`
- Cookie prefix rules: `__Secure-` requires `secure: true`; `__Host-` requires `secure: true`, `path: '/'`, and no `domain`

## Related

- [JWT Helper](./jwt.md)
