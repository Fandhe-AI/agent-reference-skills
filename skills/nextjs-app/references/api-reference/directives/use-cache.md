# use cache

The `use cache` directive marks a route, React component, or function as cacheable. It can be placed at the top of a file (all exports cached), or inline at the top of a component/function (return value cached).

## Signature / Usage

Cached functions and components must be async.

```tsx
// Function level
export async function getData() {
  'use cache'
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

// Component level
export async function MyComponent() {
  'use cache'
  return <></>
}
```

When used at file level (module), every exported function becomes a cached function and must also be async. `generateMetadata` and `generateStaticParams` must be async in such a file.

```tsx
// Module (file) level — also valid at the top of a page / layout (route segment)
'use cache'

export async function getMonthlyTotals(accountId: string) {
  return db.orders.aggregate({ where: { accountId }, _sum: { amount: true } })
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

## Cache output

A cached function produces the same output for the same inputs. The first call with a given set of inputs runs the function body and stores its output; every later call with the same inputs reuses that output, within a render pass and across requests, for as long as the entry lasts. Outputs are stored by a cache handler (in memory by default) and last until they revalidate. Nested cached functions get their own entries, keyed by their own inputs; if an inner entry is already filled, its body does not run again and its output becomes part of the outer entry.

With Cache Components, prerendering fills the entry and keeps rendering, so the output contributes to the route's static shell and can contribute to its prefetch. A cache life too short to store safely leaves a hole that resolves at request time instead (see the `cacheLife` prerendering thresholds).

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
- To prerender an entire route, add `use cache` to every segment file it renders: the `page`, the `layout`, and any parallel route slots (`default` / `page`). Each segment is a separate entry point and caches independently. A cached `layout` does not cache the `children` it renders, since slots pass through without affecting its entry.
- When a cache directive (`use cache`, `use cache: private`, `use cache: remote`) is at the top of a file, you can import its exported functions into a Client Component and call them directly; they run on the server and return the result, like a Server Function. Prefer calling cached functions on the server and passing results down as props.
- Self-hosted: cache entries persist across requests; control cache size with `cacheMaxMemorySize`. Serverless: entries typically do not persist across requests; build-time caching works normally.
- If a build hangs ("Filling a cache during prerender timed out"), you are likely passing an uncached/runtime Promise (e.g. from `cookies()`) into a `use cache` scope — await it outside first.
- Not supported with static export deployment.
- This is a Cache Components feature. Version history: `v16.0.0` stabilized `use cache` (enabled with Cache Components); `v15.0.0` introduced it experimentally.

## Related

- [use cache: private](./use-cache-private.md)
- [use cache: remote](./use-cache-remote.md)
