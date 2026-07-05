# use cache

The `use cache` directive marks a route, React component, or function as cacheable. It can be placed at the top of a file (all exports cached), or inline at the top of a component/function (return value cached).

## Signature / Usage

```tsx
// File level
'use cache'

export default async function Page() {
  // ...
}

// Component level
export async function MyComponent() {
  'use cache'
  return <></>
}

// Function level
export async function getData() {
  'use cache'
  const data = await fetch('/api/data')
  return data
}
```

Requires enabling `cacheComponents` in `next.config.ts`:

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

## Cache key composition

A cache entry key is derived from: Build ID, a hash of the function's location/signature (Function ID), serializable arguments (including variables captured from outer scope), and (dev only) the HMR refresh hash.

## Serialization

- Arguments must be serializable using React Server Components serialization rules (primitives, plain objects, arrays, `Date`, `Map`, `Set`, typed arrays, `ArrayBuffer`; React elements only as pass-through).
- Return values additionally allow JSX elements (React Client Components serialization rules).
- Not supported: class instances, functions (except pass-through), `Symbol`, `WeakMap`, `WeakSet`, `URL`.
- Non-serializable values (e.g. `children`, Server Actions) can be passed through as long as they are not introspected inside the cached scope.

## Revalidation

Default profile: `stale` 5 min (client), `revalidate` 15 min (server), `expire` never. Customize with [`cacheLife`](../functions/cacheLife.md) and invalidate on demand with [`cacheTag`](../functions/cacheTag.md) / `updateTag` / [`revalidateTag`](../functions/revalidateTag.md).

```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function getData() {
  'use cache'
  cacheLife('hours')
  cacheTag('products')
  return fetch('/api/data')
}
```

## Notes

- When applied at file level, all exported functions in that file must be `async`.
- Cached functions/components cannot directly call `cookies()`, `headers()`, or read `searchParams`; read these outside the cached scope and pass values as arguments.
- `React.cache` has an isolated scope inside `use cache` boundaries — values set outside are not visible inside.
- When [Draft Mode](https://nextjs.org/docs/app/guides/draft-mode) is enabled, cached functions re-execute on every request and results are not saved; `draftMode().isEnabled` may be read inside the scope, but `enable()`/`disable()` throw.
- To prerender an entire route, add `use cache` to both `layout` and `page` files (each segment caches independently).
- If a build hangs ("Filling a cache during prerender timed out"), you are likely passing an uncached/runtime Promise (e.g. from `cookies()`) into a `use cache` scope — await it outside first.
- Not supported with static export deployment.
- This is a Cache Components feature, generally available as of v16.0.0 (introduced experimentally in v15.0.0).

## Related

- [use cache: private](./use-cache-private.md)
- [use cache: remote](./use-cache-remote.md)
