# catchError

`catchError` creates a component that wraps its children in an error boundary — a programmatic alternative to the `error.js` file convention, usable anywhere in the component tree.

## Signature / Usage

```tsx
'use client'

import { catchError, type ErrorInfo } from 'next/error'

function ErrorFallback(
  props: { title: string },
  { error, retry }: ErrorInfo
) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{error.message}</p>
      <button onClick={() => retry()}>Try again</button>
    </div>
  )
}

export default catchError(ErrorFallback)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| fallback | `(props, errorInfo: ErrorInfo) => ReactNode` | Renders the error UI. Must be a Client Component. `props` excludes `children`. |

### `ErrorInfo`

| Property | Type | Description |
| --- | --- | --- |
| `error` | `Error` | The caught error instance. |
| `retry` | `() => void` | Re-fetches and re-renders the boundary's children inside a Transition; replaces fallback on success. Preferred over `reset()` in most cases. |
| `reset` | `() => void` | Resets error state and re-renders without re-fetching (won't recover Server Component errors). |

## Notes

- Renamed from `unstable_catchError` and became stable in `v16.3.0`.
- Can only be called from Client Components.
- Handles `redirect()`/`notFound()` internally so they aren't accidentally caught.
- Error state automatically clears on client navigation to a different route.
- Do not wrap `error.js` default exports with this — `error.js` already renders inside a built-in error boundary.

## Related

- [error.js](../file-conventions/error.md)
- [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)
