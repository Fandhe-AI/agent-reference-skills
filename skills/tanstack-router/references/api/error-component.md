---
source: https://tanstack.com/router/latest/docs/api/router/errorComponentComponent
---

# ErrorComponent

Renders an error notice and optional details about the thrown value, for use as a route's `errorComponent`.

## Signature / Usage

```tsx
import { ErrorComponent, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  errorComponent: ({ error, reset }) => <ErrorComponent error={error} reset={reset} />,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `error` | `unknown` (React / Vue); `Error` (Solid) | The caught error. Solid normalizes non-`Error` values, including SSR loader errors, into an `Error` with the original value in `cause` |
| `info` | `{ componentStack: string }` | React component stack trace info (optional) |
| `reset` | `() => void` | Function to programmatically reset the error state |

## Notes

- Details are displayed when the thrown value has a nonempty `message`; values without a message still display the error notice.
- The error message is shown behind a "Show Error" toggle; visible by default in development.
- `error` is `unknown` in React, so a custom error component must narrow it, e.g. `error instanceof Error ? error.message : String(error)`.

## Related

- [CatchBoundary](./catch-boundary.md)
