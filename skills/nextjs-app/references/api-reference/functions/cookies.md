# cookies

`cookies` is an async function to read incoming request cookies in Server Components, and read/write outgoing cookies in Server Functions or Route Handlers.

## Signature / Usage

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## Options / Props

### Methods

| Method | Return Type | Description |
| --- | --- | --- |
| `get('name')` | Object | Returns an object with the name and value for a cookie. |
| `getAll()` | Array of objects | Returns a list of all cookies with a matching name (or all if unspecified). |
| `has('name')` | Boolean | Returns whether the cookie exists. |
| `set(name, value, options)` | — | Sets an outgoing request cookie (Server Function / Route Handler only). |
| `delete(name)` | — | Deletes the cookie. |
| `toString()` | String | String representation of the cookies. |

### `set` options

| Option | Type | Description |
| --- | --- | --- |
| `name` | String | Cookie name. |
| `value` | String | Cookie value. |
| `expires` | Date | Exact expiration date. |
| `maxAge` | Number | Lifespan in seconds. |
| `domain` | String | Domain where the cookie is available. |
| `path` | String, default `'/'` | Scope path. |
| `secure` | Boolean | HTTPS only. |
| `httpOnly` | Boolean | No client-side JS access. |
| `sameSite` | Boolean, `'lax'`, `'strict'`, `'none'` | Cross-site behavior. |
| `priority` | `'low'`, `'medium'`, `'high'` | Cookie priority. |
| `partitioned` | Boolean | Whether the cookie is partitioned (CHIPS). |

## Notes

- Asynchronous — must use `async/await` or React's `use()`. (Synchronous access still works in v15 for backwards compatibility with v14 but is deprecated.)
- A Request-time API — using it in a layout/page opts the route into dynamic rendering.
- `.set`/`.delete` can only be called in a Server Function or Route Handler (not during Server Component rendering), since HTTP disallows setting cookies after streaming starts.
- `.delete` requires the same domain (exact match for wildcard subdomains) and protocol as `.set`.
- To refresh cached data after mutating cookies, call `revalidatePath` or `revalidateTag`.
- Became async in `v15.0.0-RC` (codemod available); introduced in `v13.0.0`.

## Related

- [headers](./headers.md)
- [revalidatePath](./revalidatePath.md)
- [revalidateTag](./revalidateTag.md)
