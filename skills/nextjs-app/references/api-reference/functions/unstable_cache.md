# unstable_cache

`unstable_cache` caches the results of expensive operations (e.g. database queries) and reuses them across requests.

## Signature / Usage

```jsx
import { getUser } from './data'
import { unstable_cache } from 'next/cache'

const getCachedUser = unstable_cache(async (id) => getUser(id), ['my-app-user'])

export default async function Component({ userID }) {
  const user = await getCachedUser(userID)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `fetchData` | `(...args) => Promise<T>` | Async function whose result is cached. |
| `keyParts` | `string[]` (optional) | Extra cache key identifiers; needed when the function closes over external variables not passed as arguments. |
| `options.tags` | `string[]` | Tags for cache invalidation (not used to uniquely identify the function). |
| `options.revalidate` | `number \| false` | Seconds until revalidation; omit or `false` to cache indefinitely (until `revalidateTag`/`revalidatePath`). |

## Notes

- **Superseded**: replaced by the `use cache` directive in Next.js 16 — prefer opting into Cache Components and `use cache` instead.
- Accessing uncached data sources like `headers()`/`cookies()` inside the cached function scope is not supported; read them outside and pass as arguments.
- Unsupported operations: the cached function cannot depend on the incoming request, so it cannot call `connection()`, enable or disable draft mode, call `revalidateTag()` / `updateTag()` / `revalidatePath()` during cache execution, or call a function that uses `use cache: private`. Do request-dependent work (cookies/headers) beforehand and pass values as arguments; do mutations and revalidation afterward in a Server Action or Route Handler.
- Persists results across requests and deployments via Next.js' built-in cache.
- Introduced in `v14.0.0`.

## Related

- [cacheTag](./cacheTag.md)
- [cacheLife](./cacheLife.md)
- [revalidateTag](./revalidateTag.md)
