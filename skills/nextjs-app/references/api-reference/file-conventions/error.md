# error.js

An `error` file allows you to handle unexpected runtime errors and display fallback UI. It wraps a route segment and its nested children in a React Error Boundary.

## Signature / Usage

```tsx filename="app/dashboard/error.tsx"
'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `error` | `Error & { digest?: string }` | The thrown Error instance forwarded to the Client Component. In production the message is sanitized for Server Component errors (matched via `digest`). |
| `error.digest` | `string` | Automatically generated hash to match the error against server-side logs. |
| `unstable_retry` | `() => void` | Re-fetches and re-renders the error boundary's children to attempt recovery (added `v16.2.0`). |
| `reset` | `() => void` | Clears error state and re-renders children without re-fetching; prefer `unstable_retry()` in most cases. |

## Notes

- `error.js` wraps `loading.js`, `not-found.js`, `page.js`, and nested `layout.js` in the same segment, but does **not** wrap the `layout.js`/`template.js` above it in the same segment.
- To handle errors in the root layout, use `global-error.jsx` at the app root; it must define its own `<html>` and `<body>` tags and does not support `metadata`/`generateMetadata` (use React's `<title>` instead).
- Throwing inside `error.js` bubbles the error up to the parent error boundary.
- Version history: `v16.2.0` added `unstable_retry`; `v15.2.0` also displays `global-error` in development; `v13.1.0` introduced `global-error`; `v13.0.0` introduced `error`.

## Related

- [Error Handling](../../getting-started/error-handling.md)
- [unstable_catchError](../functions/catch-error.md)
