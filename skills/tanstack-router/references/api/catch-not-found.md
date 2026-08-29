---
source: https://tanstack.com/router/latest/docs/api/router/catchNotFoundComponent
---

# CatchNotFound

Catches not-found errors thrown by its children, renders a fallback component, and optionally calls an `onCatch` callback.

## Signature / Usage

```tsx
import { CatchNotFound } from '@tanstack/react-router'

function Component() {
  return (
    <CatchNotFound
      fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
    >
      <ComponentThatMightThrowANotFoundError />
    </CatchNotFound>
  )
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Content rendered when no error occurs |
| `fallback` | `(error: NotFoundError) => React.ReactElement` | No | UI rendered when a not-found error is caught |
| `onCatch` | `(error: any) => void` | No | Called with the caught error |

## Notes

- Resets when the pathname changes, allowing recovery from a previous not-found state on navigation.

## Related

- [notFound](./not-found.md)
- [CatchBoundary](./catch-boundary.md)
