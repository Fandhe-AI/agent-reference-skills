---
source: https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider
---

# QueryClientProvider

Wraps and distributes a `QueryClient` instance throughout the application, enabling query management capabilities.

## Signature / Usage

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `client` | `QueryClient` | Required. The QueryClient instance to be provided to child components |

## Notes

- Must wrap the application, or the relevant portion, where query management functionality is needed
- Establishes the context necessary for all React Query hooks to operate within the component tree
- Only one `QueryClientProvider` is typically needed per application

## Related

- [useQueryClient](./use-query-client.md)
- [QueryClient](./query-client.md)
