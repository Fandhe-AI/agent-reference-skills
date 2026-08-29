---
source: https://tanstack.com/router/latest/docs/api/router/catchBoundaryComponent
---

# CatchBoundary

Catches errors thrown by its children, renders an error component, and optionally calls an `onCatch` callback.

## Signature / Usage

```tsx
import { CatchBoundary } from '@tanstack/react-router'

function Component() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => console.error(error)}
    >
      <div>My Component</div>
    </CatchBoundary>
  )
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getResetKey` | `() => string` | Yes | Returns a key used to reset the boundary's state when it changes |
| `children` | `React.ReactNode` | Yes | Rendered when there is no error |
| `errorComponent` | `React.ReactNode` | No | Rendered on error; defaults to `ErrorComponent` |
| `onCatch` | `(error: any) => void` | No | Called with the caught error |

## Related

- [ErrorComponent](./error-component.md)
- [CatchNotFound](./catch-not-found.md)
