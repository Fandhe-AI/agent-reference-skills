---
source: https://tanstack.com/query/latest/docs/reference/MutationCache
---

# MutationCache

The `MutationCache` serves as the storage mechanism for mutations. Direct interaction is typically unnecessary; developers should use the `QueryClient` instead.

## Signature / Usage

```tsx
import { MutationCache } from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    console.log(error)
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onError` | function (optional) | Executes when any mutation encounters an error. Receives error details, variables, and mutation context. Supports async operations |
| `onSuccess` | function (optional) | Triggers upon successful mutation completion. Receives data, variables, and mutation metadata. Supports Promise return values |
| `onSettled` | function (optional) | Fires after mutation resolution (success or failure). Provides both data and error states along with contextual information |
| `onMutate` | function (optional) | Executes before mutation execution begins. Does not permit returning results, distinguishing it from mutation-level callbacks |

## Methods

| Name | Description |
|------|-------------|
| `getAll()` | Retrieves all cached mutations, returning an array of `Mutation` instances. Rarely needed except for advanced scenarios |
| `subscribe(callback)` | Registers a listener for cache updates including state changes and mutation additions/removals. Returns an unsubscribe function |
| `clear()` | Completely empties the cache for a fresh start |

## Notes

- Global callbacks will always be called regardless of mutation-specific configurations, whereas `defaultOptions` can be overridden at the individual mutation level

## Related

- [QueryClient](./query-client.md)
- [QueryCache](./query-cache.md)
