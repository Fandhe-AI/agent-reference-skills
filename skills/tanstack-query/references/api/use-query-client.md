---
source: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient
---

# useQueryClient

Provides access to the current `QueryClient` instance within the application, enabling programmatic access to the query cache and client operations.

## Signature / Usage

```tsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryClient` | `QueryClient` (optional) | Custom QueryClient instance. If omitted, retrieves the client from the nearest context provider |

## Returns

The current `QueryClient` instance available in the component's context.

## Notes

- Must be used within a component tree wrapped with a `QueryClientProvider` to access the default client instance
- Passing a custom `queryClient` argument overrides the contextual client

## Related

- [QueryClientProvider](./query-client-provider.md)
- [QueryClient](./query-client.md)
