# layout / template / loading / error File Convention Structure

Combine the special files of a route segment: a persistent `layout`, a remounting `template`, a Suspense-driven `loading` fallback, and an `error` boundary.

```
app/dashboard/
  layout.tsx    # Persists across navigations within /dashboard
  template.tsx  # Remounts on every navigation (resets child state)
  loading.tsx   # Shown while page.tsx and nested segments suspend
  error.tsx     # Catches errors thrown by loading/page/nested layouts
  page.tsx
```

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

```tsx
// app/dashboard/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading...</p>
}
```

```tsx
// app/dashboard/error.tsx
'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Notes

- Nesting order at the same segment level: `layout` > `template` > `error` > `loading` > `page` (loading wraps page/nested layouts in a `<Suspense>` boundary; error wraps loading/page/nested layouts in an error boundary).
- `loading.tsx` does not cover a `layout.tsx` in the same folder that reads uncached/runtime data (`cookies()`, `headers()`, uncached `fetch`) — that layout blocks navigation instead; move such fetches into `page.tsx` or wrap them in their own `<Suspense>`.
- `error.tsx` must be a Client Component (`'use client'`); use `app/global-error.tsx` (with its own `<html>`/`<body>`) to catch errors thrown by the root layout.
- Unlike `layout.tsx`, `template.tsx` remounts on every navigation to that segment, resetting any Client Component state and re-running `useEffect`.
