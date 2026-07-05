# connection

`connection()` indicates that rendering should wait for an incoming user request before continuing — useful for producing per-request output (e.g. `Math.random()`, `new Date()`) without using Request-time APIs.

## Signature / Usage

```ts
import { connection } from 'next/server'

export default async function Page() {
  await connection() // prerendering stops here
  const rand = Math.random()
  return <span>{rand}</span>
}
```

```jsx
function connection(): Promise<void>
```

## Notes

- Accepts no parameters; returns a `void` Promise not meant to be consumed.
- Replaces `unstable_noStore` to better align with the future of Next.js.
- Only necessary when dynamic rendering is required and common Request-time APIs (`cookies`, `headers`) are not already used.
- Useful before synchronous database driver queries (e.g. `better-sqlite3`) to exclude them from prerendering.
- Stabilized in `v15.0.0` (introduced as RC in `v15.0.0-RC`).

## Related

- [unstable_noStore](./unstable_noStore.md)
- [cookies](./cookies.md)
- [headers](./headers.md)
