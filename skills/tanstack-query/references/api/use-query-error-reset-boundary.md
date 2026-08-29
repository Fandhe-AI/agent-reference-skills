---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryErrorResetBoundary
---

# useQueryErrorResetBoundary

Resets query errors within the nearest `QueryErrorResetBoundary` component. If no boundary is established, it performs a global reset.

## Signature / Usage

```tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

## Returns

`{ reset: () => void }` — an object containing a `reset` function that clears query errors.

## Notes

- Integrates with `react-error-boundary` patterns
- Requires wrapping components with a `QueryErrorResetBoundary` for scoped error management

## Related

- [QueryErrorResetBoundary](./query-error-reset-boundary.md)
