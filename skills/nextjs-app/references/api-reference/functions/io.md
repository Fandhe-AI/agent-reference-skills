# io

`io` marks a synchronous read (e.g. `new Date()`, `Math.random()`, a sync DB driver) as request-time data when Cache Components is enabled, excluding it from the static shell without blocking prefetches.

## Signature / Usage

```tsx
import { Suspense } from 'react'
import { io } from 'next/cache'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CurrentTime />
    </Suspense>
  )
}

async function CurrentTime() {
  await io()
  return <p>{new Date().toISOString()}</p>
}
```

```ts
function io(): Promise<void>
```

## Notes

- Requires [Cache Components](../config/caching.md) to have any effect; during a request, inside `"use cache"` scopes, in the browser, and in apps without Cache Components, `io()` resolves immediately.
- In Client Components, pair with React's `use` hook: `use(io())`.
- Not needed when the component already uses a Request-time API (`cookies()`, `headers()`) or awaits a `fetch`/DB query inside `<Suspense>` — those are themselves the suspension point.
- Differs from `connection()`: `connection()` stays suspended until a real user request reaches the server (blocking prefetches); `io()` suspends like any async function, so code after it can still be wrapped in `"use cache"` and prefetched/cached on the client. Prefer `io()` over `connection()`.
- Added in `v16.3.0`.

## Related

- [connection](./connection.md)
- [use cache](../directives/use-cache.md)
- [generateStaticParams](./generateStaticParams.md)
