# headers

`headers` is an async function to read HTTP incoming request headers from a Server Component. Returns a read-only Web `Headers` object.

## Signature / Usage

```tsx
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
}
```

## Options / Props

| Method | Description |
| --- | --- |
| `entries()` | Iterator over all key/value pairs. |
| `forEach()` | Executes a function once per key/value pair. |
| `get()` | Returns the value(s) of a header by name. |
| `has()` | Returns whether a header exists. |
| `keys()` | Iterator over all keys. |
| `values()` | Iterator over all values. |

## Notes

- Asynchronous — must use `async/await` or React's `use()`. (Synchronous access still works in v15 for backwards compatibility with v14 but is deprecated.)
- Read-only — cannot `set` or `delete` outgoing request headers.
- A Request-time API; using it opts the route into dynamic rendering.
- Became async in `v15.0.0-RC` (codemod available); introduced in `v13.0.0`.

## Related

- [cookies](./cookies.md)
- [NextRequest](./NextRequest.md)
