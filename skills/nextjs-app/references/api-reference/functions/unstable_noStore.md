# unstable_noStore

`unstable_noStore` declaratively opts a component out of prerendering/caching.

## Signature / Usage

```jsx
import { unstable_noStore as noStore } from 'next/cache'

export default async function ServerComponent() {
  noStore()
  const result = await db.query(...)
}
```

## Notes

- **Legacy**: no longer recommended — use `connection()` instead (as of v15). Still supported for backward compatibility.
- Equivalent to `cache: 'no-store'` on `fetch`.
- More granular than `export const dynamic = 'force-dynamic'` (per-component rather than per-route).
- Using it inside `unstable_cache` does not opt out of static generation — the outer cache configuration determines caching behavior.
- Introduced in `v14.0.0`; deprecated for `connection` in `v15.0.0`.

## Related

- [connection](./connection.md)
- [unstable_cache](./unstable_cache.md)
