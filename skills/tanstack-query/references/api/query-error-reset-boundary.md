---
source: https://tanstack.com/query/latest/docs/framework/react/reference/QueryErrorResetBoundary
---

# QueryErrorResetBoundary

When using suspense or `throwOnError` in queries, this component lets queries know that you want to try again when re-rendering after an error occurred.

## Signature / Usage

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
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
    )}
  </QueryErrorResetBoundary>
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `({ reset: () => void }) => ReactNode` | Render function receiving an object containing a `reset` function that clears query errors |

## Notes

- Works in tandem with `react-error-boundary` for comprehensive error handling
- Essential when combining suspense or error-throwing query strategies
- The `reset` function should be passed to the Error Boundary's `onReset` prop

## Related

- [useQueryErrorResetBoundary](./use-query-error-reset-boundary.md)
