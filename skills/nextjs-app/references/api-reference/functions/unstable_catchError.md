# unstable_catchError

`unstable_catchError` creates a component that wraps its children in an error boundary — a programmatic alternative to the `error.js` file convention, usable anywhere in the component tree.

## Signature / Usage

```tsx
'use client'

import { unstable_catchError, type ErrorInfo } from 'next/error'

function ErrorFallback(
  props: { title: string },
  { error, unstable_retry }: ErrorInfo
) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{error.message}</p>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  )
}

export default unstable_catchError(ErrorFallback)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| fallback | `(props, errorInfo: ErrorInfo) => ReactNode` | Renders the error UI. Must be a Client Component. `props` excludes `children`. |

### `ErrorInfo`

| Property | Type | Description |
| --- | --- | --- |
| `error` | `Error` | The caught error instance. |
| `unstable_retry` | `() => void` | Re-fetches and re-renders the boundary's children; replaces fallback on success. |
| `reset` | `() => void` | Resets error state and re-renders without re-fetching (won't recover Server Component errors). |

## Notes

- **Experimental**: `unstable_` prefix — API may change.
- Can only be called from Client Components.
- Handles `redirect()`/`notFound()` internally so they aren't accidentally caught.
- Error state automatically clears on client navigation to a different route.
- Prefer `unstable_retry()` over `reset()` in most cases.
- Do not wrap `error.js` default exports with this — `error.js` already renders inside a built-in error boundary.
- Introduced in `v16.2.0`.

## Related

- [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)
