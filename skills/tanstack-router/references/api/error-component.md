---
source: https://tanstack.com/router/latest/docs/api/router/errorComponentComponent
---

# ErrorComponent

Renders an error message, and optionally the error's message, for use as a route's `errorComponent`.

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
| `error` | `TError` (defaults `Error`) | The error thrown by the component's children |
| `info` | `{ componentStack: string }` | React component stack trace info (optional) |
| `reset` | `() => void` | Function to programmatically reset the error state |

## Notes

- The error's message is shown behind a "Show Error" toggle; visible by default in development.

## Related

- [CatchBoundary](./catch-boundary.md)
